import { Outlet } from "react-router-dom";
import React, { useState } from 'react';
import Breadcrumb from "../../../../components/breadCrumb/BreadCrumb";
import styles from './Overview.module.scss';
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official';
import highchartsGantt from "highcharts/modules/gantt";
import HighchartsExporting from 'highcharts/modules/exporting';
import bellcurve from "highcharts/modules/histogram-bellcurve";
import highchartsMore from "highcharts/highcharts-more.js";
import solidGauge from "highcharts/modules/solid-gauge.js";
import accessibility from 'highcharts/modules/accessibility.js';
import Traffic from './traffic/Traffic';
import DiskIO from './diskIO/DiskIO';



// init the module
highchartsGantt(Highcharts);
bellcurve(Highcharts);
if (typeof Highcharts === 'object') {
    HighchartsExporting(Highcharts)
}

highchartsMore(Highcharts);
solidGauge(Highcharts);
accessibility(Highcharts);

function Overview() {
    const [traffic, setTraffic] = useState(1);
    const options = {
        chart: {
            type: 'line',
            height: 300
        },
        exporting: {
            enabled: false
        },

        credits: {
            enabled: false
        },
        title: {
            text: '',
            align: 'left'
        },

        yAxis: {
            title: {
                text: '%'
            }
        },

        xAxis: {
            categories: ['02:00', '02:15', '02:30', '02:45', '03:00', '03:15', '03:30', '03:45', '04:00', '04:15', '04:30', '04:45']
        },

        legend: {
            enabled: false
        },

        plotOptions: {
            series: {
                label: {
                    connectorAllowed: false
                }
            }
        },

        tooltip: {
            crosshairs: true,
            shared: true
        },

        series: [{
            name: 'Percent',
            data: [10, 20, 60, 46, 50, 55, 80, 30, 35, 39, 20, 22]
        }],

        responsive: {
            rules: [{
                condition: {
                    maxWidth: 500
                },
                chartOptions: {
                    legend: {
                        layout: 'horizontal',
                        align: 'center',
                        verticalAlign: 'bottom'
                    }
                }
            }]
        }
    }

    const solidgaugeOptions = {
        chart: {
            type: 'solidgauge',
            height: 150
        },

        title: null,
        pane: {
            center: ['50%', '50%'],
            size: '100%',
            startAngle: 0,
            endAngle: 360,
            background: {
                backgroundColor: Highcharts.defaultOptions.legend.backgroundColor || '#EEE',
                innerRadius: '80%',
                outerRadius: '100%',
                shape: 'arc'
            }
        },


        exporting: {
            enabled: false
        },

        tooltip: {
            enabled: false
        },

        credits: {
            enabled: false
        },

        xAxis: {
            enabled: false
        },

        yAxis: {
            min: 0,
            max: 100,
            gridLineColor: 'transparent',
            stops: [
                [0.1, '#55BF3B'], // green
                [0.5, '#DDDF0D'], // yellow
                [0.9, '#DF5353'] // red
            ],
            lineWidth: 0,
            tickWidth: 0,
            minorTickInterval: null,
            tickAmount: 0,
            title: {
                y: -70,
                text: 'Speed',
                enabled: false
            },
            labels: {
                y: 16,
                enabled: false
            }
        },


        series: [{
            name: 'Speed',
            data: [50],
            dataLabels: {
                format:
                    '<div style="text-align:center">' +
                    '<span style="font-size:14px">{y} %</span>' +
                    '</div>'
            },
            tooltip: {
                valueSuffix: ' %'
            }
        }],

        plotOptions: {
            solidgauge: {
                innerRadius: '80%',
                radius: '100%',
                dataLabels: {
                    enabled: true,
                    y: -10,
                    borderWidth: 0,
                    useHTML: true
                }
            }
        },
    };

    return (
        <div className="main">
            <div className={styles.overview}>
                <Breadcrumb
                    routes={[
                        {
                            path: "/datalogger",
                            name: "Dashboard"
                        },
                        {
                            path: "/datalogger/overview",
                            name: "Overview"
                        }
                    ]}
                />



                <div className={styles.outlet}>
                    {<Outlet />}

                    <div className={styles.system_info}>
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                            <rect width="18" height="18" fill="url(#system)" />
                            <defs>
                                <pattern id="system" patternContentUnits="objectBoundingBox" width="1" height="1">
                                    <use xlinkHref="#image0_470_1716" transform="scale(0.015625)" />
                                </pattern>
                                <image id="image0_470_1716" width="64" height="64" xlinkHref="data:image/png;base64,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" />
                            </defs>
                        </svg>
                        <span>System: Ubuntu 22.04.2 LTS x86_64(Py3.7.8)</span>
                        <span className={styles.uptime}>Time of running 0 Day(s)</span>
                    </div>

                    <div className={styles.status}>
                        <h2>Status</h2>
                        <div className={styles.body_group}>
                            <div className="container-fluid">
                                <div className="row">
                                    <div className={styles.col_md_2}>
                                        <div className={styles.item}>
                                            <p>Load status</p>
                                            <div className="item-round">
                                                <div className="chart_cpu">
                                                    <HighchartsReact
                                                        highcharts={Highcharts}
                                                        options={solidgaugeOptions}
                                                    />
                                                </div>
                                            </div>
                                            <p>Running smoothly</p>
                                        </div>
                                    </div>

                                    <div className={styles.col_md_2}>
                                        <div className={styles.item}>
                                            <p>CPU usage</p>
                                            <div className="item-round">
                                                <div className="chart_cpu">
                                                    <HighchartsReact
                                                        highcharts={Highcharts}
                                                        options={solidgaugeOptions}
                                                    />
                                                </div>
                                            </div>
                                            <p>8 Core(s)</p>
                                        </div>
                                    </div>
                                    <div className={styles.col_md_2}>
                                        <div className={styles.item}>
                                            <p>RAM usage</p>
                                            <div className="item-round">
                                                <div className="chart_cpu">
                                                    <HighchartsReact
                                                        highcharts={Highcharts}
                                                        options={solidgaugeOptions}
                                                    />
                                                </div>
                                            </div>
                                            <p>10064 / 20432(MB)</p>
                                        </div>
                                    </div>
                                    <div className={styles.col_md_2}>
                                        <div className={styles.item}>
                                            <p>Disk space</p>
                                            <div className="item-round">
                                                <div className="chart_cpu">
                                                    <HighchartsReact
                                                        highcharts={Highcharts}
                                                        options={solidgaugeOptions}
                                                    />
                                                </div>
                                            </div>
                                            <p>31.07G / 116.12G</p>
                                        </div>
                                    </div>


                                    <div className={styles.col_md_2}>
                                        <div className={styles.item}>
                                            <p>Swap usage</p>
                                            <div className="item-round">
                                                <div className="chart_cpu">
                                                    <HighchartsReact
                                                        highcharts={Highcharts}
                                                        options={solidgaugeOptions}
                                                    />
                                                </div>
                                            </div>
                                            <p>31.07G / 116.12G</p>
                                        </div>
                                    </div>

                                    <div className={styles.col_md_2}></div>
                                </div>

                                <div className="row">
                                    <div className="col-md-12">

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className={styles.group_cpu}>
                        <div className="row">
                            <div className="col-md-6">
                                <div className={styles.item_group}>
                                    <div className={styles.title}>CPU utilization (%)</div>
                                    <div className={styles.group_cpu_usage}>
                                        <HighchartsReact
                                            highcharts={Highcharts}
                                            options={options}
                                            allowChartUpdate={true}
                                            immutable={true}
                                        />
                                    </div>
                                </div>

                            </div>

                            <div className="col-md-6">
                                <div className={styles.item_group}>
                                    <div className={styles.title}><span onClick={() => setTraffic(1)} className={styles.traffic + " " + (traffic === 1 ? styles.active : "")}>Traffic</span> <span onClick={() => setTraffic(2)} className={styles.disk_io + " " + (traffic === 2 ? styles.active : "")}>Disk IO</span></div>
                                    <div className={styles.group_cpu_traffic}>
                                        {traffic === 1 ? <Traffic /> : <DiskIO />}
                                    </div>
                                </div>

                            </div>

                        </div>
                    </div>


                </div>
            </div>
        </div>
    );
}

export default Overview;