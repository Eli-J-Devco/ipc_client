import { useEffect, useState } from "react";
import { useDeviceManagement } from "../DeviceManagement";
import * as yup from "yup";
import useAxiosPrivate from "../../../../../hooks/useAxiosPrivate";
import { useNavigate } from "react-router-dom";
import Constants from "../../../../../utils/Constants";
import LibToast from "../../../../../utils/LibToast";
import { loginService } from "../../../../../services/loginService";
import _ from "lodash";
import { inverterSchema, tcpSchema } from "../DeviceValidation";
import DeviceUtils from "../DeviceUtils";
import Libs from "../../../../../utils/Libs";

export default function useUpdateDevice() {
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const {
    device,
    setAllDevices,
    offset,
    limit,
    setTotal,
    deviceTypeComponents,
    deviceConfig,
  } = useDeviceManagement();
  const [mode, setMode] = useState(device?.mode || 0);
  const [enablePowerOff, setEnablePowerOff] = useState(
    device?.enable_poweroff || false
  );
  const [inverterShutdown, setInverterShutdown] = useState(
    device?.inverter_shutdown
      ? new Date(device?.inverter_shutdown)
      : new Date(new Date().setDate(new Date().getDate() + 1))
  );
  const [updating, setUpdating] = useState(false);
  const [haveComponents, setHaveComponents] = useState({});
  const [deviceConfigDropdown, setDeviceConfigDropdown] = useState([]);
  const [addingComponents, setAddingComponents] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const schema = yup.object().shape({
    name: yup.string().required("Please fill this field"),
    rtu_bus_address: yup
      .number()
      .required("Please fill this field")
      .min(1, "RTU bus address must be greater than 0")
      .max(255, "RTU bus address must be less than 256"),
    ...(device?.driver_type
      ? device?.driver_type.search(/RS485/g) === -1 && tcpSchema
      : {}),
    ...(device?.device_type
      ? device?.device_type?.name.indexOf("Inverter") !== -1 && inverterSchema
      : {}),
  });
  const initialValues = {
    ...device,
    device_type: device?.device_type?.name,
    template: device?.template?.name,
  };
  const handleUpdateDevice = (values) => {
    if (
      _.isEqual(
        {
          ...initialValues,
          ...values,
          ...(device?.device_type &&
          device?.device_type?.name.indexOf("Inverter") !== -1
            ? {
                mode: mode,
                enable_poweroff: enablePowerOff,
                inverter_shutdown: enablePowerOff
                  ? inverterShutdown.toISOString().split("T")[0]
                  : null,
              }
            : {}),
        },
        {
          ...initialValues,
          ...(device?.device_type &&
          device?.device_type?.name.indexOf("Inverter") !== -1
            ? {
                mode: device?.mode,
                enable_poweroff: device?.enable_poweroff,
                inverter_shutdown: device?.inverter_shutdown
                  ? new Date(device?.inverter_shutdown)
                  : new Date(new Date().setDate(new Date().getDate() + 1)),
              }
            : {}),
        }
      )
    ) {
      LibToast.toast("Nothing to update", "info");
      return;
    }
    if (updating) return;
    setUpdating(true);
    const requireInitial = [
      "name",
      "rtu_bus_address",
      "tcp_gateway_ip",
      "tcp_gateway_port",
    ];
    const changeKeys = [];
    for (const key in values) {
      if (values[key] !== initialValues[key]) {
        changeKeys.push(key);
      }
    }
    const update_type = requireInitial.some(
      (item) => changeKeys.indexOf(item) !== -1
    )
      ? 0
      : 1;
    const body = {
      ...values,
      ...(device?.device_type &&
      device?.device_type?.name.indexOf("Inverter") !== -1
        ? {
            mode: mode,
            enable_poweroff: enablePowerOff,
            inverter_shutdown: enablePowerOff
              ? inverterShutdown.toISOString().split("T")[0]
              : null,
          }
        : {}),
      components: !_.isEmpty(addingComponents)
        ? addingComponents
            .map((item) => {
              const components = item.components.map((i) => ({
                id: i.id,
                name: i.component_name,
                id_device_type: i.value,
                group: item.group,
                plug_point: i.plug_point,
                quantity: item.quantity,
                addition: item.addition,
                id_connection_type: i?.connection?.id,
              }));
              return components;
            })
            .flat()
        : [],
      update_type,
    };

    var output = document.getElementById("progress");
    output.innerHTML = "<div><img src='/loading.gif' /></div>";
    setTimeout(async () => {
      try {
        const response = await axiosPrivate.post(
          Constants.API_URL.DEVICES.UPDATE + `?page=${offset}&limit=${limit}`,
          body
        );
        setAllDevices(response.data?.data);
        setTotal(response.data?.total);
        LibToast.toast("Device updated successfully", "info");
      } catch (error) {
        loginService.handleMissingInfo(error, "Failed to update device") &&
          navigate("/", { replace: true });
      } finally {
        output.innerHTML = "";
        setUpdating(false);
      }
    }, 300);
  };

  useEffect(() => {
    if (!device?.id_device_type) return;

    if (!deviceTypeComponents) return;
    const components = _.cloneDeep(deviceTypeComponents)?.find((item) => {
      if (
        item.device_type.group === device?.device_type.group &&
        item.component.length > 0
      ) {
        return true;
      }
      return false;
    });

    if (_.isEmpty(components)) return;
    Libs.progress(true);
    setTimeout(async () => {
      try {
        components.component = components.component.filter(
          (item) =>
            typeof item.sub_type !== "number" ||
            item.sub_type === device.inverter_type ||
            item.sub_type === device.meter_type
        );
        // for (const component of components.component) {
        //   if (typeof component.addition === "number") {
        //     const addition = await serviceUtils.getAdditionCount(
        //       component.addition,
        //       { id_template: device.template.id }
        //     );
        //     component.quantity = addition.count;
        //     component.addition = addition.addition;
        //   }
        // }
        var isHaveAddition = components.component.some((item) => item.addition);
        const response = await axiosPrivate.post(
          Constants.API_URL.DEVICES.COMPONENT.DEFAULT +
            `?device_id=${device?.id}`
        );
        const addingComponents = [];
        for (let item of response.data) {
          const components = item.components;
          for (let component of components) {
            component.component_name = component.name;
            component.label = component.device_type_name;
            component.value = component.id_device_type;
          }
          addingComponents.push(item);
        }
        setAddingComponents(addingComponents);
        setHaveComponents({ ...components, isHaveAddition });
      } catch (error) {
        loginService.handleMissingInfo(
          error,
          "Failed to get device components"
        ) && navigate("/", { replace: true });
      } finally {
        Libs.progress(false);
      }
    }, 300);
  }, [device]);

  useEffect(() => {
    if (_.isEmpty(haveComponents)) return;

    if (_.isEmpty(addingComponents)) return;

    if (isFetching) return;
    DeviceUtils.clearDemoImage();
    setIsFetching(true);
    setTimeout(async () => {
      await DeviceUtils.fetchImage(haveComponents.device_type.image);
      const posCount = {
        0: 0,
        1: 0,
        2: 0,
        3: 0,
        4: 0,
      };
      const requiredComponents = addingComponents.filter(
        (item) => item.require
      );
      for (let i = 0; i < requiredComponents.length; i++) {
        const item = requiredComponents[i];
        for (let j = 0; j < item.components.length; j++) {
          const component = item.components[j];
          if (!component.image) continue;
          if (!component.component_name) continue;

          await DeviceUtils.fetchImage(
            component.image,
            component.plug_point,
            component.id
          );
          posCount[component.plug_point]++;
        }
      }
      const optionalComponents = addingComponents.filter(
        (item) => !item.require
      );
      for (let i = 0; i < optionalComponents.length; i++) {
        const item = optionalComponents[i];
        for (let j = 0; j < item.components.length; j++) {
          const component = item.components[j];
          if (!component.image) continue;
          if (!component.component_name) continue;
          if (
            haveComponents.device_type.plug_point_count &&
            typeof haveComponents.device_type.plug_point_count[
              component.plug_point
            ] === "number" &&
            posCount[component.plug_point] + 1 >
              haveComponents.device_type.plug_point_count[component.plug_point]
          ) {
            await DeviceUtils.expandContainer(
              component.image,
              component.plug_point,
              component.id
            );
          } else {
            await DeviceUtils.fetchImage(
              component.image,
              component.plug_point,
              component.id
            );
          }
          posCount[component.plug_point]++;
        }
      }
      if (!haveComponents.device_type.plug_point_count) {
        Object.keys(posCount).forEach((key) => {
          if (posCount[key] > 1) {
            DeviceUtils.addExtension(key);
          }
        });
      } else {
        Object.keys(posCount).forEach((key) => {
          if (
            haveComponents.device_type.plug_point_count[key] > 1 ||
            (!haveComponents.device_type.plug_point_count[key] &&
              posCount[key] > 1)
          ) {
            DeviceUtils.addExtension(key);
          }
        });
      }
      setIsFetching(false);
    }, 300);
  }, [addingComponents, haveComponents]);

  useEffect(() => {
    if (_.isEmpty(deviceConfig) || !_.isEmpty(deviceConfigDropdown)) return;

    const { device_groups, template } = deviceConfig;
    setDeviceConfigDropdown({
      deviceGroup: [
        {
          label: "Custom",
          options:
            device_groups &&
            device_groups
              .filter((item) => item.type === 1)
              ?.map((item) => {
                return {
                  value: item.id,
                  label: item.name,
                  id_device_type: item.id_device_type,
                };
              }),
        },
        {
          label: "Built-in",
          options:
            device_groups &&
            device_groups
              .filter((item) => item.type === 0)
              ?.map((item) => {
                return {
                  value: item.id,
                  label: item.name,
                  id_device_type: item.id_device_type,
                };
              }),
        },
      ],
      template: [
        {
          label: "Custom",
          options:
            template &&
            template
              .filter((item) => item.type === 1)
              ?.map((item) => {
                return {
                  value: {
                    id_template: item.id,
                    id_device_group: item.id_device_group,
                  },
                  label: item.name,
                };
              }),
        },
        {
          label: "Built-in",
          options:
            template &&
            template
              .filter((item) => item.type === 0)
              ?.map((item) => {
                return {
                  value: {
                    id_template: item.id,
                    id_device_group: item.id_device_group,
                  },
                  label: item.name,
                };
              }),
        },
      ].flat(),
    });
  }, [deviceConfig]);

  useEffect(() => {
    setMode(device?.mode || 0);
    setEnablePowerOff(device?.enable_poweroff || false);
    setInverterShutdown(
      device?.inverter_shutdown
        ? new Date(device?.inverter_shutdown)
        : new Date(new Date().setDate(new Date().getDate() + 1))
    );
  }, [device]);

  return {
    initialValues,
    schema,
    mode,
    setMode,
    enablePowerOff,
    setEnablePowerOff,
    inverterShutdown,
    setInverterShutdown,
    handleUpdateDevice,
    haveComponents,
    addingComponents,
    setAddingComponents,
    device,
  };
}
