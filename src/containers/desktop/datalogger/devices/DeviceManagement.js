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
    const [offset, setOffset] = useState(0);
    const [limit, setLimit] = useState(Constants.DEFAULT_PAGE_SIZE);
    const [total, setTotal] = useState(0);

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
                setAllDevices,
                offset,
                setOffset,
                limit,
                setLimit,
                total,
                setTotal,
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
        setAllDevices,
        offset,
        limit,
        total,
        setTotal,
        setOffset,
    } = useDeviceManagement();
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const output = document.getElementById("progress");

    useEffect(() => {
        setTimeout(() => {
            if (total < offset) {
                setOffset(offset - limit > 0 ? offset - limit : 0);
                return;
            }
            setAllDevices([]);
        }, 100);
    }, [offset, limit, total]);

    useEffect(() => {
        if (allDevices.length > 0) return;

        output.innerHTML = "<div><img src='/loading.gif' /></div>";
        setTimeout(async () => {
            try {
                const { data } = await axiosPrivate.post(Constants.API_URL.DEVICES.LIST + `?page=${offset}&limit=${limit}`);
                let devices = data?.data.map((d) => {
                    d["status"] = "";
                    return d;
                });
                setAllDevices(_.cloneDeep(devices));
                setTotal(data?.total);
            } catch (error) {
                loginService.handleMissingInfo(error, "Failed to get devices") && navigate("/", { replace: true });
            } finally {
                output.innerHTML = "";
            }
        }, 500);
    }, [allDevices]);


    useEffect(() => {
        setTimeout(async () => {
            try {
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
            }
        }, 300);
    }, []);

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