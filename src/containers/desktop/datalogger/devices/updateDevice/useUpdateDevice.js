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
    const {
        device,
        setAllDevices
    } = useDeviceManagement();
    const [mode, setMode] = useState(device?.mode || 0);
    const [enablePowerOff, setEnablePowerOff] = useState(device?.enable_poweroff || false);
    const [inverterShutdown, setInverterShutdown] = useState(device?.inverter_shutdown ? new Date(device?.inverter_shutdown) : new Date());
    const [updating, setUpdating] = useState(false);

    const schema = yup.object().shape({
        name: yup.string().required("Please fill this field"),
        rtu_bus_address: yup.number().required("Please fill this field").min(502, "RTU bus address must be greater than 501").max(65535, "RTU bus address must be less than 65536"),
        tcp_gateway_port: yup.number().required("Please fill this field").min(1, "TCP gateway port must be greater than 0").max(65535, "TCP gateway port must be less than 65536"),
        tcp_gateway_ip: yup.string().required("Please fill this field").matches(/^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/, "Invalid IP Address"),
        rated_power: yup.number().required("Please fill this field"),
        rated_power_custom: yup.number().required("Please fill this field"),
        min_watt_in_percent: yup.number().required("Please fill this field").min(0, "Must between 0% and 100%").max(100, "Must between 0% and 100%"),
        DC_voltage: yup.number().required("Please fill this field"),
        DC_current: yup.number().required("Please fill this field"),
        effciency: yup.number().required("Please fill this field").min(0, "Must between 0 and 1").max(1, "Must between 0 and 1"),
    });

    const handleUpdateDevice = (values) => {
        if (updating) return;
        setUpdating(true);
        const body = {
            ...values,
            mode,
            ...(
                device?.device_type.indexOf("Inverter") !== -1 ? {
                    enable_poweroff: enablePowerOff,
                    inverter_shutdown: inverterShutdown.getDate()
                } : {})
        };

        var output = document.getElementById("progress");
        output.innerHTML = "<div><img src='/loading.gif' /></div>";
        setTimeout(async () => {
            try {
                const response = await axiosPrivate.post(Constants.API_URL.DEVICES.UPDATE, body);
                setAllDevices(response.data);
                LibToast.toast("Device updated successfully", "info");
            } catch (error) {
                loginService.handleMissingInfo(error, "Failed to update device") && navigate("/", { replace: true });
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
        handleUpdateDevice
    };
}