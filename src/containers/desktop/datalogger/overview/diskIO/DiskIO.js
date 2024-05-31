import styles from './DiskIO.module.scss';
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official';
import highchartsGantt from "highcharts/modules/gantt";
import HighchartsExporting from 'highcharts/modules/exporting';
import bellcurve from "highcharts/modules/histogram-bellcurve";
import highchartsMore from "highcharts/highcharts-more.js";
import solidGauge from "highcharts/modules/solid-gauge.js";
import accessibility from 'highcharts/modules/accessibility.js';
import { useEffect, useRef, useState } from 'react';
import useMQTT from '../../../../../hooks/useMQTT';
import _ from 'lodash';



// init the module
highchartsGantt(Highcharts);
bellcurve(Highcharts);
if (typeof Highcharts === 'object') {
    HighchartsExporting(Highcharts)
}

highchartsMore(Highcharts);
solidGauge(Highcharts);
accessibility(Highcharts);

function DiskIO() {
    const { cpuData } = useMQTT();
    const [curItem, setCurItem] = useState({});
    const [DiskIO, setDiskIO] = useState({
        ReadBytes: "",
        SpeedRead: "",
        SpeedWrite: "",
        WriteBytes: ""
    });

    const [optionsDiskIO] = useState({
        chart: {
            type: 'areaspline',
            height: 300,
        },
        title: {
            text: '',
            align: 'left',
            enabled: false
        },
        exporting: {
            enabled: false
        },

        credits: {
            enabled: false
        },

        legend: {
            layout: 'vertical',
            enabled: false,
            align: 'left',
            verticalAlign: 'top',
            x: 120,
            y: 70,
            floating: true,
            borderWidth: 1,
            backgroundColor: Highcharts.defaultOptions.legend.backgroundColor || '#FFFFFF'
        },
        xAxis: {
            type: 'datetime',
            labels: {
                format: '{value:%H:%M:%S}'
            },
        },
        yAxis: {
            title: {
                text: 'KB/s'
            }
        },
        tooltip: {
            shared: true,
        },
        credits: {
            enabled: false
        },
        colors: ['#32CD32', '#52a9ff'],
        plotOptions: {
            areaspline: {

                fillColor: {
                    linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
                    stops: [
                        [0, '#32CD32'],
                        [1, '#32CD3200']
                    ]
                },
                threshold: null,
                marker: {
                    lineWidth: 1,
                    lineColor: null,
                    fillColor: 'white'
                }
            }
        },

        series: [{
            name: 'Read',
            data: []
        }, {
            name: 'Write',
            data: []
        }],
    });

    const chartRef = useRef(null);

    useEffect(() => {
        if (_.isEmpty(cpuData) || _.isEmpty(cpuData.DiskIO) || _.isEqual(cpuData, curItem)) return;
        let DiskIO = {}
        DiskIO.ReadBytes = !_.isEmpty(cpuData.DiskIO.ReadBytes) ? cpuData.DiskIO.ReadBytes : "";
        DiskIO.SpeedRead = !_.isEmpty(cpuData.DiskIO.SpeedRead) ? cpuData.DiskIO.SpeedRead : "";
        DiskIO.SpeedWrite = !_.isEmpty(cpuData.DiskIO.SpeedWrite) ? cpuData.DiskIO.SpeedWrite : "";
        DiskIO.WriteBytes = !_.isEmpty(cpuData.DiskIO.WriteBytes) ? cpuData.DiskIO.WriteBytes : "";

        let SpeedReadPercentage = !_.isEmpty(cpuData.DiskIO.SpeedRead) ? cpuData.DiskIO.SpeedRead.split(" ") : 0;
        let SpeedWritePercentage = !_.isEmpty(cpuData.DiskIO.SpeedWrite) ? cpuData.DiskIO.SpeedWrite.split(" ") : 0;
        let time = Math.floor(cpuData.Time / 1000) * 1000;

        const chart = chartRef.current.chart;
        const pointSpeedRead = [new Date(time).getTime(), parseFloat(SpeedReadPercentage[0])];
        const pointSpeedWrite = [new Date(time).getTime(), parseFloat(SpeedWritePercentage[0])];
        const seriesSpeedRead = chart.series[0],
            shiftSpeedRead = seriesSpeedRead.data.length > 20; // shift if the series is longer than 20
        const seriesSpeedWrite = chart.series[1],
            shiftSpeedWrite = seriesSpeedWrite.data.length > 20; // shift if the series is longer than 20

        chart.series[0].addPoint(pointSpeedRead, false, shiftSpeedRead);
        chart.series[1].addPoint(pointSpeedWrite, true, shiftSpeedWrite);
        setCurItem(cpuData);
        setDiskIO(DiskIO);
    }, [cpuData]);

    return (
        <div className={styles.group_disk_io}>
            <div className="row">
                <div className="col-md-3">
                    <p><span className={styles.ico_up}></span>Read</p>
                    <p>{DiskIO.SpeedRead}</p>
                </div>
                <div className="col-md-3">
                    <p><span className={styles.ico_down}></span>Write</p>
                    <p>{DiskIO.SpeedWrite}</p>
                </div>

                <div className="col-md-3">
                    <p>ReadBytes</p>
                    <p>{DiskIO.ReadBytes}</p>
                </div>

                <div className="col-md-3">
                    <p>IO WriteBytes</p>
                    <p>{DiskIO.WriteBytes}</p>
                </div>
            </div>
            <div className={styles.chart_disk_io}>
                <HighchartsReact
                    highcharts={Highcharts}
                    options={optionsDiskIO}
                    allowChartUpdate={true}
                    immutable={true}
                    ref={chartRef}
                />
            </div>

        </div>
    );
}

export default DiskIO;