import { Outlet } from "react-router-dom";
import Breadcrumb from "../../../../components/breadCrumb/BreadCrumb";
import NavTabs from "../../../../components/navTabs/NavTabs";
import styles from './System.module.scss';

function System() {
    return (
        <div className="main">
            <Breadcrumb
                routes={[
                    {
                        path: "/datalogger",
                        name: "Dashboard"
                    },
                    {
                        path: "/datalogger/system",
                        name: "System"
                    }
                ]}
            />

            <div className={styles.system}>
                <NavTabs
                    routes={[
                        {
                            path: "/datalogger/system",
                            name: "Site Information"
                        },
                        {
                            path: "/datalogger/system/datetime",
                            name: "Date & Time"
                        },
                        {
                            path: "/datalogger/system/backup-restore",
                            name: "Backup & Restore"
                        },
                        {
                            path: "/datalogger/system/firmware",
                            name: "Firmware"
                        },
                        {
                            path: "/datalogger/system/auto-update",
                            name: "Auto Update"
                        },
                        {
                            path: "/datalogger/system/reboot-shutdown",
                            name: "Reboot & Shutdown"
                        },
                        {
                            path: "/datalogger/system/synchronized",
                            name: "Synchronized Config Device"
                        },
                        {
                            path: "/datalogger/system/alarm",
                            name: "Alarm"
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

export default System;