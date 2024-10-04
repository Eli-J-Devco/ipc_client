import { useEffect, useMemo, useState } from "react";
import { FormInputEnum } from "../../../../../components/formInput/FormInput";
import { useDeviceManagement } from "../DeviceManagement";
import * as yup from "yup";
import {
  createSchema,
  defaultSchema,
  normalDeviceSchema,
  tcpSchema,
} from "../DeviceValidation";
import DeviceUtils from "../DeviceUtils";
import { isEmpty } from "lodash";
import useAxiosPrivate from "../../../../../hooks/useAxiosPrivate";
import { loginService } from "../../../../../services/loginService";
import LibToast from "../../../../../utils/LibToast";
import Constants from "../../../../../utils/Constants";
import { useNavigate } from "react-router-dom";
import Libs from "../../../../../utils/Libs";

export default function useAddDevice(closeAddDevice) {
  //Context provider
  const {
    deviceConfig,
    deviceTypeComponents,
    serviceUtils,
    offset,
    limit,
    setTotal,
    setAllDevices,
  } = useDeviceManagement();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  //State
  const [additionInformation, setAdditionInformation] = useState({});
  const [generalInformation, setGeneralInformation] = useState({
    name: "",
    device_type_group: null,
    device_type: null,
    device_group: null,
    template: null,
  });
  const [isOpenAddMultipleDevice, setIsOpenAddMultipleDevice] = useState(0);
  const [additionInformationFields, setAdditionInformationFields] = useState(
    []
  );
  const [communicationInformation, setCommunicationInformation] = useState({
    communication: {
      label: deviceConfig?.communication[0]?.name,
      value: deviceConfig?.communication[0]?.id,
    },
    rtu_bus_address: "",
    tcp_gateway_port: "",
    tcp_gateway_ip: "",
  });
  const [addMultipleDeviceInformation, setAddMultipleDeviceInformation] =
    useState({
      inc_mode: null,
      num_of_devices: 1,
    });
  const [addingComponents, setAddingComponents] = useState([]);
  const [haveComponents, setHaveComponents] = useState({});

  const schemas = useMemo(() => {
    const additionSchemas = !isEmpty(
      generalInformation?.device_type_group?.addition
    )
      ? generalInformation.device_type_group.addition
          .filter((item) => item.is_initial === "true")
          .map((item) => ({ ...item.schema, name: item.name }))
          .reduce(createSchema, {})
      : {};
    return yup.object().shape({
      ...defaultSchema,
      ...normalDeviceSchema,
      ...(communicationInformation.communication.label.search(/COM\w*/g) === -1
        ? tcpSchema
        : {}),
      ...additionSchemas,
    });
  }, [
    communicationInformation?.communication?.label,
    generalInformation?.device_type_group,
  ]);

  useEffect(() => {
    if (isEmpty(generalInformation?.device_type_group?.addition)) return;

    setAdditionInformationFields(
      generalInformation.device_type_group.addition
        .filter((item) => item.is_initial === "true")
        .map((item) => ({
          ...item,
          component: FormInputEnum[item.form_enum.toLowerCase()],
        })) || []
    );
    setAdditionInformation(
      generalInformation.device_type_group.addition
        .filter((item) => item.is_initial === "true")
        .reduce((acc, item) => {
          acc[item.name] = item.default || "";
          return acc;
        }, {}) || {}
    );
  }, [generalInformation?.device_type_group]);

  const updateAddingComponent = (deviceType = null, id_template = null) => {
    const id_device_type =
      deviceType?.value ||
      deviceType?.id_device_type ||
      generalInformation?.device_type?.value;
    let haveComponents = deviceTypeComponents?.find((item) => {
      if (item.device_type.id === id_device_type && item.component.length > 0) {
        return true;
      }
      return false;
    });
    const newAddingComponents = [];
    const plugPointCount = {
      0: 0,
      1: 0,
      2: 0,
      3: 0,
    };

    setTimeout(async () => {
      if (!isEmpty(haveComponents)) {
        const requiredComponents = haveComponents.component.filter(
          (item) => item.type === 1 && item.require
        );
        for (const item of requiredComponents) {
          const addition =
            typeof item.addition === "string" &&
            (await serviceUtils.getAdditionCount(item.addition, {
              id_template,
            }));
          const quantity = item.quantity || addition.count || 0;
          const components = [];
          for (let i = 0; i < quantity; i++) {
            let tempId = Math.random().toString(36).slice(2, 9);
            components.push({
              ...item.components[0],
              value: item.components[0].id,
              label: item.components[0].name,
              plug_point: item.plug_point,
              id: tempId,
              rowId: tempId,
            });
            plugPointCount[item.plug_point]++;
          }
          newAddingComponents.push({
            ...item,
            quantity: quantity,
            components: components,
          });
        }
      }
      setAddingComponents(newAddingComponents);
      setHaveComponents(haveComponents);
      newAddingComponents.forEach(async (item) => {
        if (item.components) {
          for (let i = 0; i < item.components.length; i++) {
            await DeviceUtils.fetchImage(
              item.components[i].image,
              item.components[i].plug_point,
              item.components[i].id
            );
          }
        }
      });
      Object.keys(plugPointCount).forEach((key) => {
        if (plugPointCount[key] > 1) {
          DeviceUtils.addExtension(key);
        }
      });
    }, 100);
  };

  const onSubmit = (data) => {
    if (isOpenAddMultipleDevice === 1) {
      setIsOpenAddMultipleDevice(2);
      return;
    }

    let newData = {
      ...Object.keys(generalInformation).reduce((acc, key) => {
        if (key === "name") {
          acc[key] = generalInformation[key];
        } else if (generalInformation[key] !== null) {
          acc[`id_${key}`] = generalInformation[key].value;
        }
        return acc;
      }, {}),
      ...communicationInformation,
      id_communication: communicationInformation.communication.value,
      ...Object.keys(additionInformation).reduce((acc, key) => {
        if (typeof additionInformation[key] === "object") {
          acc[key] = additionInformation[key].value;
        } else {
          acc[key] = additionInformation[key];
        }
        return acc;
      }, {}),
      ...(communicationInformation?.communication?.label.search(/COM\w*/g) !==
        -1 && {
        tcp_gateway_ip: "",
        tcp_gateway_port: null,
      }),
      components: !isEmpty(addingComponents)
        ? addingComponents
            .map((item) => {
              const components = item.components.map((i) => ({
                id: null,
                name: i.component_name,
                id_device_type: i.value,
                group: item.group,
                plug_point: i.plug_point,
                quantity: item.quantity,
                addition: item.addition,
                id_connection_type: i.connection.id,
              }));
              return components;
            })
            .flat()
        : [],
      ...data,
    };
    console.log(newData);
    Libs.progress(true);
    setTimeout(async () => {
      try {
        const response = await axiosPrivate.post(
          Constants.API_URL.DEVICES.ADD + `?page=${offset}&limit=${limit}`,
          newData,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        setAllDevices(
          response.data?.data.map((d) => {
            d["state"] = 2;
            return d;
          })
        );
        setTotal(response.data?.total);
        LibToast.toast(
          "New devices are being added. It would take a few minutes.",
          "info"
        );
        if (isOpenAddMultipleDevice === 2) {
          setIsOpenAddMultipleDevice(0);
        }
        closeAddDevice();
      } catch (error) {
        loginService.handleMissingInfo(error, "Failed to add device") &&
          navigate("/", { replace: true });
      } finally {
        Libs.progress(false);
      }
    }, 500);
  };

  const onAddMultiple = (data) => {
    onSubmit({
      ...data,
      inc_mode: data?.inc_mode?.value || 1,
    });
  };

  return {
    additionInformation,
    setAdditionInformation,
    generalInformation,
    setGeneralInformation,
    isOpenAddMultipleDevice,
    setIsOpenAddMultipleDevice,
    additionInformationFields,
    setAdditionInformationFields,
    communicationInformation,
    setCommunicationInformation,
    schemas,
    addingComponents,
    haveComponents,
    setAddingComponents,
    updateAddingComponent,
    addMultipleDeviceInformation,
    setAddMultipleDeviceInformation,
    onSubmit,
    onAddMultiple,
  };
}
