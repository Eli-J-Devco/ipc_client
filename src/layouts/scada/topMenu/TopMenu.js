import React from 'react';
import styles from './TopMenu.module.scss';
import { NavLink } from "react-router-dom";
import { ReactComponent as Overview } from "../../../assets/images/overview_scada.svg";
import { ReactComponent as Devices } from "../../../assets/images/devices.svg";
import { ReactComponent as Alarms } from "../../../assets/images/alarms.svg";
import { ReactComponent as Trend } from "../../../assets/images/trend.svg";
import { ReactComponent as Charting } from "../../../assets/images/charting.svg";
import { ReactComponent as Report } from "../../../assets/images/report.svg";
import { ReactComponent as Settings } from "../../../assets/images/settings.svg";


export default function TopMenu() {
    return (
        <div className={styles.top_menu}>
            <ul>
                <li>
                    <NavLink to="overview" className={(navData) => navData.isActive ? styles.active : ""}>
                        <Overview />
                        <span>Overview</span>
                    </NavLink>
                </li>
            
                <li>
                    <NavLink to="devices" className={(navData) => navData.isActive ? styles.active : ""}>
                        <Devices />
                        <span>Devices</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="alarms" className={(navData) => navData.isActive ? styles.active : ""}>
                        <Alarms />
                        <span>Alarms</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="trend" className={(navData) => navData.isActive ? styles.active : ""}>
                        <Trend />
                        <span>Trend</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="charting" className={(navData) => navData.isActive ? styles.active : ""}>
                        <Charting />
                        <span>Charting</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="report" className={(navData) => navData.isActive ? styles.active : ""}>
                        <Report />

                        <span>Report</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="setup-control" className={(navData) => navData.isActive ? styles.active : ""}>
                        <Settings />
                        <span>Setup - Control</span>
                    </NavLink>
                </li>
            </ul>
        </div>
    );
};