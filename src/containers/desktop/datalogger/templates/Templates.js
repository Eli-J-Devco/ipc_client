import { Outlet } from "react-router-dom";
import Breadcrumb from "../../../../components/breadCrumb/BreadCrumb";
import TemplatesProvider from "./useTemplates";

function Templates() {
    return (
        <TemplatesProvider>
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
        </TemplatesProvider>
    );
}

export default Templates;