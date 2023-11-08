// import { Component } from 'react';
// import { withTranslation } from 'react-i18next';
// import QuickStartJsx from './QuickStart.jsx';

// class QuickStart extends Component {

//     constructor(props, context) {
//         super(props, context);
//         this.jsxTemplate = QuickStartJsx;
//         this.state = {
//             tab: 2
//         };
//     }


//     onClickChangeTab = (index) => {
//         this.setState({
//             tab: index
//         });
//     }

//     render() {
//         return this.jsxTemplate.call(this)
//     }
// }


// const HighOrderComponentTranslated = withTranslation('common')(QuickStart)
// export default HighOrderComponentTranslated;
import { Outlet } from "react-router-dom";
import Breadcrumb from "../../../../components/breadCrumb/BreadCrumb";
import NavTabs from '../../../../components/navTabs/NavTabs';
import styles from './QuickStart.module.scss';

function QuickStart() {
    return (
        <div className="main">
            <Breadcrumb
                routes={[
                    {
                        path: "/datalogger/quickstart",
                        name: "Quick Start"
                    }
                ]}
            />

            <div className={styles.template} >
                <div className={styles.body}>
                    <NavTabs
                        routes={[
                            {
                                path: `/datalogger/quickstart`,
                                name: "Site Information"
                            },
                            {
                                path: `/datalogger/quickstart/ethernet-1`,
                                name: "Ethernet 1"
                            },
                            {
                                path: `/datalogger/quickstart/ethernet-2`,
                                name: "Ethernet 2"
                            },
                            {
                                path: `/datalogger/quickstart/firmware`,
                                name: "Firmware"
                            },
                            {
                                path: `/datalogger/quickstart/rs485-1`,
                                name: "RS485 1"
                            },
                            {
                                path: `/datalogger/quickstart/rs485-2`,
                                name: "RS485 2"
                            },
                            {
                                path: `/datalogger/quickstart/logging-rate`,
                                name: "Logging Rate"
                            },
                            {
                                path: `/datalogger/quickstart/upload-channels`,
                                name: "Upload Channels"
                            },
                            {
                                path: `/datalogger/quickstart/remote-access`,
                                name: "Remote Access"
                            },
                            {
                                path: `/datalogger/quickstart/done`,
                                name: "Done"
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

export default QuickStart;