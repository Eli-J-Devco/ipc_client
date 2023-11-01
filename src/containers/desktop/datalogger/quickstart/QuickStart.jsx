import React from 'react';
import { NavLink } from "react-router-dom";
import styles from './QuickStart.module.scss';
import SiteInformation from './siteInformation/SiteInformation';
import EthernetOne from './ethernetOne/EthernetOne';
import EthernetTwo from './ethernetTwo/EthernetTwo';
import Firmware from './firmware/Firmware';
import Rs485One from './rs485One/Rs485One';
import Rs485Two from './rs485Two/Rs485Two';
import UploadChannels from './uploadChannels/UploadChannels';
import LoggingRate from './loggingRate/LoggingRate';
import Done from './done/Done';
import RemoteAccess from './remoteAccess/RemoteAccess';

export default function QuickStart() {
    var { tab } = this.state;
    var htmlTab = null;
    switch (tab) {
        case 1:
            htmlTab = <SiteInformation />
            break;
        case 2:
            htmlTab = <EthernetOne />
            break;
        case 3:
            htmlTab = <EthernetTwo />
            break;
        case 4:
            htmlTab = <Firmware />
            break;
        case 5:
            htmlTab = <Rs485One />
            break;
        case 6:
            htmlTab = <Rs485Two />
            break;
        case 7:
            htmlTab = <LoggingRate />
            break;
        case 8:
            htmlTab = <UploadChannels />
            break;
        case 9:
            htmlTab = <RemoteAccess />
            break;
        case 10:
            htmlTab = <Done />
            break;
    }
    return (
        <div className="main">
            <div className="crumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <NavLink to="/datalogger">
                            Daskboard
                        </NavLink>
                    </li>
                    <li className="breadcrumb-item active">Quick Start</li>
                </ol>
            </div>
            <div className={styles.quick_start}>
                <div className={styles.tab_title}>
                    <ul>
                        <li><span onClick={this.onClickChangeTab.bind(this, 1)} className={tab === 1 ? styles.active : ""}>Site information</span></li>
                        <li><span onClick={this.onClickChangeTab.bind(this, 2)} className={tab === 2 ? styles.active : ""}>Ethernet-1</span></li>
                        <li><span onClick={this.onClickChangeTab.bind(this, 3)} className={tab === 3 ? styles.active : ""}>Ethernet-2</span></li>
                        <li><span onClick={this.onClickChangeTab.bind(this, 4)} className={tab === 4 ? styles.active : ""}>Firmware</span></li>
                        <li><span onClick={this.onClickChangeTab.bind(this, 5)} className={tab === 5 ? styles.active : ""}>RS485-1</span></li>
                        <li><span onClick={this.onClickChangeTab.bind(this, 6)} className={tab === 6 ? styles.active : ""}>RS485-2</span></li>
                        <li><span onClick={this.onClickChangeTab.bind(this, 7)} className={tab === 7 ? styles.active : ""}>Logging Rate</span></li>
                        <li><span onClick={this.onClickChangeTab.bind(this, 8)} className={tab === 8 ? styles.active : ""}>Upload Channels</span></li>
                        <li><span onClick={this.onClickChangeTab.bind(this, 9)} className={tab === 9 ? styles.active : ""}>Remote Access</span></li>
                        <li><span onClick={this.onClickChangeTab.bind(this, 10)} className={tab === 10 ? styles.active : ""}>Done</span></li>
                    </ul>
                </div>
                <div className={styles.tab_content}>
                    {htmlTab}
                </div>
            </div>
        </div>
    );
};