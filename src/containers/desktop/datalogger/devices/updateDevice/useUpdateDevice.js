import { useEffect, useState } from "react";
import { useDeviceManagement } from "../DeviceManagement";
import * as yup from "yup";
import useAxiosPrivate from "../../../../../hooks/useAxiosPrivate";
import { useNavigate } from "react-router-dom";
import Constants from "../../../../../utils/Constants";
import LibToast from "../../../../../utils/LibToast";
import { loginService } from "../../../../../services/loginService";
import _ from "lodash";

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
      : new Date().setDate(new Date().getDate() + 1)
  );
  const [updating, setUpdating] = useState(false);
  const [haveComponents, setHaveComponents] = useState(false);
  const [deviceConfigDropdown, setDeviceConfigDropdown] = useState([]);
  const [addingComponents, setAddingComponents] = useState([]);
  const [columns] = useState([
    {
      id: 1,
      slug: "id",
      name: "No.",
      width: 5,
    },
    {
      id: 2,
      slug: "name",
      name: "Device Name",
    },
    {
      id: 3,
      slug: "device_type",
      name: "Device Type",
    },
    {
      id: 4,
      slug: "device_group",
      name: "Device Group",
    },
    {
      id: 5,
      slug: "template",
      name: "Template",
    },
  ]);
  const schema = yup.object().shape({
    name: yup.string().required("Please fill this field"),
    rtu_bus_address: yup
      .number()
      .required("Please fill this field")
      .min(1, "RTU bus address must be greater than 0")
      .max(255, "RTU bus address must be less than 256"),
    ...(device?.driver_type
      ? device?.driver_type.search(/RS485/g) === -1 && {
          tcp_gateway_port: yup
            .number()
            .required("Please fill this field")
            .min(502, "TCP gateway port must be greater than 501")
            .max(65535, "TCP gateway port must be less than 65536"),
          tcp_gateway_ip: yup
            .string()
            .required("Please fill this field")
            .matches(Constants.REGEX_PATTERN.IP_ADDRESS, "Invalid IP Address"),
        }
      : {}),
    ...(device?.device_type
      ? device?.device_type?.name.indexOf("Inverter") !== -1 && {
          rated_power: yup
            .number()
            .required("Please fill this field")
            .min(0, "Must greater than or equal to 0"),
          rated_power_custom: yup
            .number()
            .required("Please fill this field")
            .min(0, "Must greater than or equal to 0")
            .max(
              yup.ref("rated_power"),
              "Must less than or equal to rated power"
            ),
          min_watt_in_percent: yup
            .number()
            .required("Please fill this field")
            .min(0, "Must between 0% and 20%")
            .max(20, "Must between 0% and 20%"),
          DC_voltage: yup
            .number()
            .required("Please fill this field")
            .min(0, "Must greater than or equal to 0"),
          DC_current: yup
            .number()
            .required("Please fill this field")
            .min(0, "Must greater than or equal to 0"),
          efficiency: yup
            .number()
            .required("Please fill this field")
            .min(0, "Must greater than or equal to 0")
            .max(100, "Must less than or equal to 100"),
        }
      : {}),
  });
  const initialValues = {
    ...device,
    device_type: device?.device_type?.name,
    template: device?.template?.name,
  };
  const handleUpdateDevice = (values) => {
    if (updating) return;
    setUpdating(true);
    const body = {
      ...values,
      ...(device?.device_type &&
      device?.device_type?.name.indexOf("Inverter") !== -1
        ? {
            mode: mode,
            enable_poweroff: enablePowerOff,
            inverter_shutdown: inverterShutdown.getDate(),
          }
        : {}),
      components: addingComponents.map((item) => {
        return {
          id:
            typeof item.device?.value?.id === "number"
              ? item.device?.value?.id
              : null,
          name: item.device?.label,
          id_device_group: item.device_group?.value,
          id_template: item.template?.value?.id_template,
          id_device_type: item.device_type?.value,
        };
      }),
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

    setHaveComponents(
      deviceTypeComponents?.find((item) => {
        if (
          item.device_type.id === device?.id_device_type &&
          item.component.length > 0
        ) {
          return true;
        }
        return false;
      })
    );

    setTimeout(async () => {
      try {
        const response = await axiosPrivate.post(
          Constants.API_URL.DEVICES.COMPONENT.DEFAULT +
            `?device_id=${device?.id}`
        );
        setAddingComponents(
          response.data.map((item) => ({
            device: {
              value: {
                id: item?.id,
              },
              label: item?.name,
            },
            device_group: {
              value: item?.device_group?.id,
              label: item?.device_group?.name,
              id_device_type: item?.device_type?.id,
            },
            template: item?.device_type?.type === 0 && {
              value: {
                id_template: item?.template_library?.id,
                id_device_group: item?.device_group?.id,
              },
              label: item?.template_library?.name,
            },
            device_type: {
              value: item?.device_type?.id,
              label: item?.device_type?.name,
              type: item?.device_type?.type,
            },
          }))
        );
      } catch (error) {
        loginService.handleMissingInfo(
          error,
          "Failed to get device components"
        ) && navigate("/", { replace: true });
      }
    }, 300);
  }, [device]);

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
    device,
    deviceConfigDropdown,
    addingComponents,
    setAddingComponents,
    columns,
  };
}
