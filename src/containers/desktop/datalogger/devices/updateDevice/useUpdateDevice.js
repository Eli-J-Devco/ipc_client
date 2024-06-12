import { useEffect, useState } from "react";
import { useDeviceManagement } from "../DeviceManagement";
import * as yup from "yup";
import useAxiosPrivate from "../../../../../hooks/useAxiosPrivate";
import { useNavigate } from "react-router-dom";
import Constants from "../../../../../utils/Constants";
import LibToast from "../../../../../utils/LibToast";
import { loginService } from "../../../../../services/loginService";

export default function useUpdateDevice() {
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const { device, setAllDevices, offset, limit, setTotal } =
    useDeviceManagement();
  const [mode, setMode] = useState(device?.mode || 0);
  const [enablePowerOff, setEnablePowerOff] = useState(
    device?.enable_poweroff || false
  );
  const [inverterShutdown, setInverterShutdown] = useState(
    device?.inverter_shutdown ? new Date(device?.inverter_shutdown) : new Date()
  );
  const [updating, setUpdating] = useState(false);

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
            .matches(/^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/, "Invalid IP Address"),
        }
      : {}),
    ...(device?.device_type
      ? device?.device_type.search("Inverter") !== -1 && {
          rated_power: yup.number().required("Please fill this field"),
          rated_power_custom: yup.number().required("Please fill this field"),
          min_watt_in_percent: yup
            .number()
            .required("Please fill this field")
            .min(0, "Must between 0% and 100%")
            .max(100, "Must between 0% and 100%"),
          DC_voltage: yup.number().required("Please fill this field"),
          DC_current: yup.number().required("Please fill this field"),
          efficiency: yup
            .number()
            .required("Please fill this field")
            .min(0, "Must greater than or equal to 0")
            .max(100, "Must less than or equal to 100"),
        }
      : {}),
  });

  const handleUpdateDevice = (values) => {
    if (updating) return;
    setUpdating(true);
    const body = {
      ...values,
      ...(device?.device_type && device?.device_type.indexOf("Inverter") !== -1
        ? {
            mode: mode,
            enable_poweroff: enablePowerOff,
            inverter_shutdown: inverterShutdown.getDate(),
          }
        : {}),
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

  return {
    device,
    schema,
    mode,
    setMode,
    enablePowerOff,
    setEnablePowerOff,
    inverterShutdown,
    setInverterShutdown,
    handleUpdateDevice,
  };
}
