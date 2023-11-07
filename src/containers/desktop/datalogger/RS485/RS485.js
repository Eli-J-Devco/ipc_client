import { Outlet } from "react-router-dom";
import Breadcrumb from "../../../../components/breadCrumb/BreadCrumb";
import NavTabs from "../../../../components/navTabs/NavTabs";
import styles from './RS485.module.scss';

function RS485() {
    return (
        <div className="main">
            <Breadcrumb
                routes={[
                    {
                        path: "/datalogger",
                        name: "Dashboard"
                    },
                    {
                        path: "/datalogger/rs485",
                        name: "RS485"
                    }
                ]}
            />

            <div className={styles.rs485}>
                <NavTabs
                    routes={[
                        {
                            path: "/datalogger/rs485/1",
                            name: "RS485-1"
                        },
                        {
                            path: "/datalogger/rs485/2",
                            name: "RS485-2"
                        },
                        {
                            path: "/datalogger/rs485/options",
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

export default RS485;