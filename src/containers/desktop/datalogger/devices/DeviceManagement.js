import { Outlet } from "react-router-dom";
import Breadcrumb from "../../../../components/breadCrumb/BreadCrumb";

export function DeviceManagement() {
    return (
        <div className="main">
            <Breadcrumb
                routes={[
                    {
                        path: "/datalogger",
                        name: "Dashboard"
                    },
                    {
                        path: "/datalogger/devices",
                        name: "Devices"
                    }
                ]}
            />
            <Outlet />
        </div>
    );
}