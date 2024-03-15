/********************************************************
 * Copyright 2020-2021 NEXT WAVE ENERGY MONITORING INC.
 * All rights reserved.
 *
 *********************************************************/
import { Outlet } from "react-router-dom";
import Breadcrumb from "../../../../components/breadCrumb/BreadCrumb";
import NavTabs from '../../../../components/navTabs/NavTabs';
import styles from './Networking.module.scss';

function Networking() {
    return (
        <div className="main">
            <Breadcrumb
                routes={[
                    {
                        path: "/datalogger",
                        name: "Dashboard"
                    },
                    {
                        path: "/datalogger/networking",
                        name: "Networking"
                    }
                ]}
            />

            <div className={styles.template} >
                <div className={styles.body}>
                    <NavTabs
                        routes={[
                            {
                                path: "/datalogger/networking",
                                name: "Ethernet-1"
                            },
                            {
                                path: "/datalogger/networking/ethernet-2",
                                name: "Ethernet-2"
                            },
                            {
                                path: "/datalogger/networking/network-access",
                                name: "Network Access"
                            },
                            {
                                path: "/datalogger/networking/remote-acesss",
                                name: "Remote Access"
                            },
                            {
                                path: "/datalogger/networking/static-routes",
                                name: "Static Routes"
                            }
                        ]}
                    />

                    <div className={styles.outlet}>
                        <Outlet />
                    </div>
                </div>
            </div>


        </div>
    );
}

export default Networking;