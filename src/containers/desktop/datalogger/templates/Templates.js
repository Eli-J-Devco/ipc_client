import { Outlet } from "react-router-dom";
import Breadcrumb from "../../../../components/breadCrumb/BreadCrumb";

function Templates() {
    return (
        <div className="main">
            <Breadcrumb
                routes={[
                    {
                        path: "/datalogger",
                        name: "Dashboard"
                    },
                    {
                        path: "/datalogger/templates",
                        name: "Templates"
                    }
                ]}
            />

            <Outlet />
        </div>
    );
}

export default Templates;