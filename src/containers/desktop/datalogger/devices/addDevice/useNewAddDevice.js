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

export default function useNewAddDevice() {
  //Context provider
  const { deviceConfig, deviceTypeComponents, serviceUtils } =
    useDeviceManagement();
  //State
  const [additionInformation, setAdditionInformation] = useState({});
  const [generalInformation, setGeneralInformation] = useState({});
  const [modbusDevice, setModbusDevice] = useState({});
  const [isOpenAddMultipleDevice, setIsOpenAddMultipleDevice] = useState(false);
  const [additionInformationFields, setAdditionInformationFields] = useState(
    []
  );
  const [communicationInformation, setCommunicationInformation] = useState({
    communication: {
      label: deviceConfig.communication[0]?.name || "",
      value: deviceConfig.communication[0]?.id || "",
    },
    rtu_bus_address: 1,
    tcp_gateway_port: 502,
    tcp_gateway_ip: "1.1.1.1",
  });
  const [addingComponents, setAddingComponents] = useState([]);
  const [haveComponents, setHaveComponents] = useState({});

  const schemas = useMemo(() => {
    const additionSchemas = !isEmpty(
      generalInformation?.device_type_group?.addition
    )
      ? generalInformation.device_type_group.addition
          .filter((item) => item.is_initial)
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
        .filter((item) => item.is_initial)
        .map((item) => ({
          ...item,
          component: FormInputEnum[item.form_enum.toLowerCase()],
        })) || []
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
            components.push({
              ...item.components[0],
              value: item.components[0].id,
              label: item.components[0].name,
              plug_point: item.plug_point,
              id: Math.random().toString(36).slice(2, 9),
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
    console.log(data);
  };
  return {
    additionInformation,
    setAdditionInformation,
    generalInformation,
    setGeneralInformation,
    modbusDevice,
    setModbusDevice,
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
    onSubmit,
  };
}
