import React from "react";
import styles from './Devices.module.scss';
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official';
import HighchartsExporting from 'highcharts/modules/exporting';
import bellcurve from "highcharts/modules/histogram-bellcurve";
import { NavLink } from "react-router-dom";
import { ReactComponent as Settings } from "../../../../assets/images/settings.svg";
import Breadcrumb from '../../../../components/breadCrumb/BreadCrumb';


// init the module
bellcurve(Highcharts);
if (typeof Highcharts === 'object') {
    HighchartsExporting(Highcharts)
}



function Devices(props) {
    const optionsTraffic = {
        chart: {
            type: 'gauge',
            plotBackgroundColor: null,
            plotBackgroundImage: null,
            plotBorderWidth: 0,
            plotShadow: false,
            height: '80%'
        },

        credits: {
            enabled: false
        },
        exporting: {
            enabled: false
        },
        title: {
            text: ''
        },

        pane: {
            startAngle: -90,
            endAngle: 89.9,
            background: null,
            center: ['50%', '75%'],
            size: '110%'
        },

        // the value axis
        yAxis: {
            min: 0,
            max: 200,
            tickPixelInterval: 72,
            tickPosition: 'inside',
            tickColor: Highcharts.defaultOptions.chart.backgroundColor || '#FFFFFF',
            tickLength: 10,
            tickWidth: 2,
            minorTickInterval: null,
            labels: {
                distance: 20,
                style: {
                    fontSize: '14px'
                }
            },
            lineWidth: 0,
            plotBands: [{
                from: 0,
                to: 120,
                color: '#55BF3B', // green
                thickness: 10
            }, {
                from: 120,
                to: 160,
                color: '#DDDF0D', // yellow
                thickness: 10
            }, {
                from: 160,
                to: 200,
                color: '#DF5353', // red
                thickness: 10
            }]
        },

        series: [{
            name: 'Power',
            data: [80],
            tooltip: {
                valueSuffix: ' kW'
            },
            dataLabels: {
                format: '{y} kW',
                borderWidth: 0,
                color: (
                    Highcharts.defaultOptions.title &&
                    Highcharts.defaultOptions.title.style &&
                    Highcharts.defaultOptions.title.style.color
                ) || '#333333',
                style: {
                    fontSize: '14px'
                }
            },
            dial: {
                radius: '60%',
                backgroundColor: 'gray',
                baseWidth: 8,
                baseLength: '0%',
                rearLength: '0%'
            },
            pivot: {
                backgroundColor: 'gray',
                radius: 6
            }

        }]
    };

    var devices = [
        { id: 1, name: "INV-1", status: 0 },
        { id: 1, name: "INV-2", status: 1 },
        { id: 1, name: "INV-3", status: 1 },
        { id: 1, name: "INV-4", status: 1 },
        { id: 1, name: "INV-1", status: 0 },
        { id: 1, name: "INV-2", status: 1 },
        { id: 1, name: "INV-3", status: 1 },
        { id: 1, name: "INV-4", status: 1 },
        { id: 1, name: "INV-1", status: 0 },
        { id: 1, name: "INV-2", status: 1 },
        { id: 1, name: "INV-3", status: 1 },
        { id: 1, name: "INV-4", status: 1 }
    ];
    var items = null;
    items = devices.map((item, index) => {
        return (
            <div className="col-md-3" key={index}>
                <div className={styles.item_device + " " + (item.status === 0 ? styles.off : "")}>
                    <div className={styles.item_title}>{item.name}</div>
                    <div className={styles.item_body}>
                        <div className="row">
                            <div className="col-md-8">
                                <div className="item_chart">
                                    <HighchartsReact
                                        highcharts={Highcharts}
                                        options={optionsTraffic}
                                        allowChartUpdate={true}
                                        immutable={true}
                                    />
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className={styles.action}>
                                    {item.status === 1 ?
                                        <div className={styles.running}>Running</div>
                                        :
                                        <div className={styles.stop}>Stop</div>
                                    }


                                    <div className={styles.setup}>
                                        <NavLink to={"/scada/devices/setup/1212"} className={(navData) => `nav-link m-0 border-0 ${navData.isActive ? styles.active : ""}`} end>
                                            <Settings width={14} height={14} /> Setup
                                        </NavLink>
                                    </div>
                                    <div className={styles.dc}>
                                        <NavLink to={"/scada/devices/dc-combiner/1212"} className={(navData) => `nav-link m-0 border-0 ${navData.isActive ? styles.active : ""}`} end>
                                            <svg width="14" height="9" viewBox="0 0 14 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <rect width="4" height="4" fill="#383434" />
                                                <rect x="5" width="4" height="4" fill="#383434" />
                                                <rect x="10" width="4" height="4" fill="#383434" />
                                                <rect y="5" width="4" height="4" fill="#383434" />
                                                <rect x="5" y="5" width="4" height="4" fill="#383434" />
                                                <rect x="10" y="5" width="4" height="4" fill="#383434" />
                                            </svg>
                                            DC
                                        </NavLink>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-12">
                                <div className={styles.data_point}>
                                    <div className="row">
                                        <div className="col-md-5">
                                            <div className={styles.item_point}>
                                                <table className={styles.tabled}>
                                                    <tbody>
                                                        <tr>
                                                            <td>P</td>
                                                            <td><span className={styles.none}>125.3</span></td>
                                                            <td>kW</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Q</td>
                                                            <td><span className={styles.none}>0.01</span></td>
                                                            <td>kVAr</td>
                                                        </tr>
                                                        <tr>
                                                            <td>PF</td>
                                                            <td><span className="value">1</span></td>
                                                            <td>-</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                        <div className="col-md-2"></div>
                                        <div className="col-md-5">
                                            <div className={styles.item_point}>
                                                <table className={styles.tabled}>
                                                    <tbody>
                                                        <tr>
                                                            <td>Ia</td>
                                                            <td><span className={styles.none}>100</span></td>
                                                            <td>A</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Ib</td>
                                                            <td><span className={styles.none}>100</span></td>
                                                            <td>A</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Ic</td>
                                                            <td><span className="value">100</span></td>
                                                            <td>A</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    })

    return (
        <div className={styles.devices}>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12">
                        <Breadcrumb
                            routes={[
                                {
                                    path: "/scada/overview",
                                    name: "SCADA"
                                },
                                {
                                    path: "/scada/devices",
                                    name: "Devices"
                                }
                            ]}
                        />
                    </div>
                    {items}
                </div>
            </div>
        </div>
    );
}

export default Devices;