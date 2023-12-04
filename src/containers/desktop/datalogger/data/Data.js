import { Outlet } from "react-router-dom";
import Breadcrumb from "../../../../components/breadCrumb/BreadCrumb";
import NavTabs from "../../../../components/navTabs/NavTabs";
import styles from './Data.module.scss';

function Data() {
    return (
        <div className="main">
            <Breadcrumb
                routes={[
                    {
                        path: "/datalogger",
                        name: "Dashboard"
                    },
                    {
                        path: "/datalogger/data",
                        name: "Data"
                    }
                ]}
            />

            <div className={styles.data}>
                <NavTabs
                    routes={[
                        {
                            path: "/datalogger/data",
                            name: "Data Logs"
                        },
                        {
                            path: "/datalogger/data/logging-rate",
                            name: "Logging Rate"
                        },
                        {
                            path: "/datalogger/data/sync-history",
                            name: "Sync History"
                        }
                    ]}
                    className={styles["nav-tabs"]}
                />

                <div className={styles.outlet}>
                    <Outlet />
                </div>
            </div>
        </div>
    );
}

export default Data;