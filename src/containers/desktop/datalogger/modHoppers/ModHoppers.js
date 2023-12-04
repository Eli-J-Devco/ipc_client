import { Outlet } from "react-router-dom";
import Breadcrumb from "../../../../components/breadCrumb/BreadCrumb";
import NavTabs from "../../../../components/navTabs/NavTabs";
import styles from './ModHoppers.module.scss';

function ModHoppers() {
    return (
        <div className="main">
            <Breadcrumb
                routes={[
                    {
                        path: "/datalogger",
                        name: "Dashboard"
                    },
                    {
                        path: "/datalogger/modhoppers",
                        name: "ModHoppers"
                    }
                ]}
            />

            <div className={styles.modhoppers}>
                <NavTabs
                    routes={[
                        {
                            path: "/datalogger/modhoppers",
                            name: "ModHoppers-1"
                        },
                        {
                            path: "/datalogger/modhoppers/2",
                            name: "ModHoppers-2"
                        },
                        {
                            path: "/datalogger/modhoppers/group-options",
                            name: "Options"
                        }
                    ]}
                />

                <div className={styles.outlet}>
                    <Outlet />
                </div>
            </div>
        </div>
    );
}

export default ModHoppers;