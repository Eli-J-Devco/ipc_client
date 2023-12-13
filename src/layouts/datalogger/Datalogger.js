import React from "react";
import { Outlet } from 'react-router-dom';
import Header from "./header/Header";
// import Footer from "./footer/Footer";
import LeftMenu from "./leftMenu/LeftMenu";
import styles from "./Datalogger.module.scss";
import useResizableSideBar from "./useResizableSidebar";

function Datalogger() {
    const { sidebarWidth, startResizing } = useResizableSideBar();
    
    return (
        <div className={styles.datalogger}>
            <Header />
            <div className={styles.container}>
                <div className={styles.sidebar} style={{ width: sidebarWidth }}>
                    <LeftMenu/>
                    <div
                        className={styles.resizer}
                        onMouseDown={startResizing}
                    />
                </div>
                <Outlet />
            </div>
            {/* <Footer /> */}
        </div>
    );
}

export default Datalogger;