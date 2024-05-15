import { Outlet, useNavigate } from "react-router-dom";
import Breadcrumb from "../../../../components/breadCrumb/BreadCrumb";
import { createContext, useContext, useEffect, useState } from "react";
import { loginService } from "../../../../services/loginService";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import Constants from "../../../../utils/Constants";
import _ from "lodash";


const DeviceManagementContext = createContext();

export function useDeviceManagement() {
    return useContext(DeviceManagementContext);
}

export const DeviceManagementProvider = ({ children }) => {
    const [routes, setRoutes] = useState([
        {
            path: "/datalogger",
            name: "Dashboard"
        },
        {
            path: "/datalogger/devices",
            name: "Devices"
        }
    ]);
    const [allDevices, setAllDevices] = useState([]);
    const [device, setDevice] = useState(null);
    const [deviceConfig, setDeviceConfig] = useState({
        device_types: [],
        device_groups: [],
        template: [],
        communication: [],
    });
    return (
        <DeviceManagementContext.Provider
            value={{
                routes,
                setRoutes,
                device,
                setDevice,
                deviceConfig,
                setDeviceConfig,
                allDevices,
                setAllDevices
            }}
        >
            {children}
        </DeviceManagementContext.Provider>
    );
}

export function Device() {
    const {
        routes,
        setDeviceConfig,
        allDevices,
        setAllDevices
    } = useDeviceManagement();
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const output = document.getElementById("progress");

    useEffect(() => {
        if (allDevices.length) return;

        output.innerHTML = "<div><img src='/loading.gif' /></div>";
        setTimeout(async () => {
            try {
                const { data } = await axiosPrivate.post(Constants.API_URL.DEVICES.LIST);
                let devices = data.map((d) => {
                    d["status"] = "";
                    return d;
                });
                setAllDevices(_.cloneDeep(devices));

                var device_type = await axiosPrivate.post(Constants.API_URL.DEVICES.CONFIG.TYPE);
                var device_group = await axiosPrivate.post(Constants.API_URL.DEVICES.CONFIG.GROUP);
                var template = await axiosPrivate.post(Constants.API_URL.TEMPLATE.LIST, {});
                var communication = await axiosPrivate.post(Constants.API_URL.RS485.GET, {});

                setDeviceConfig({
                    device_types: device_type.data,
                    device_groups: device_group.data,
                    template: template.data,
                    communication: communication.data,
                });
            } catch (error) {
                loginService.handleMissingInfo(error, "Failed to get device configuration") && navigate("/", { replace: true });
            } finally {
                output.innerHTML = "";
            }
        }, 500);
    }, [allDevices]);

    return (
        <div className="main">
            <Breadcrumb
                routes={routes}
            />
            <Outlet />
        </div>
    )
}

export function DeviceManagement() {
    return (
        <DeviceManagementProvider>
            <Device />
        </DeviceManagementProvider>
    )
}