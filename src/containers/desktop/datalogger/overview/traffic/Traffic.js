import styles from './Traffic.module.scss';
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official';
import highchartsGantt from "highcharts/modules/gantt";
import HighchartsExporting from 'highcharts/modules/exporting';
import bellcurve from "highcharts/modules/histogram-bellcurve";
import highchartsMore from "highcharts/highcharts-more.js";
import solidGauge from "highcharts/modules/solid-gauge.js";
import accessibility from 'highcharts/modules/accessibility.js';



// init the module
highchartsGantt(Highcharts);
bellcurve(Highcharts);
if (typeof Highcharts === 'object') {
    HighchartsExporting(Highcharts)
}

highchartsMore(Highcharts);
solidGauge(Highcharts);
accessibility(Highcharts);

function Traffic() {
    const optionsTraffic = {
        chart: {
            type: 'areaspline',
            height: 300
        },
        title: {
            text: '',
            align: 'left',
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
            categories: [
                '10:01:01', '10:01:02', '10:01:03', '10:01:04', '10:01:05', '10:01:06', '10:01:07', '10:01:08', '10:01:09', '10:01:10',
                '10:01:11', '10:01:12', '10:01:13', '10:01:14', '10:01:15', '10:01:16', '10:01:17', '10:01:18', '10:01:19', '10:01:20',
            ],
            tickInterval: 2,
            title: { text: "Power", enabled: false },
            tickWidth: 1,
            alignTicks: true,
            gridLineWidth: 1,
            crosshair: true,
        },
        yAxis: {
            title: {
                text: 'KB/s'
            }
        },
        tooltip: {
            shared: true,
            headerFormat: '<b>{point.x}</b><br>'
        },
        credits: {
            enabled: false
        },

        plotOptions: {
            areaspline: {
                color: '#32CD32',
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
            name: 'Upstream',
            data:
                [
                    38000,
                    37300,
                    37892,
                    38564,
                    36770,
                    36026,
                    34978,
                    35657,
                    35620,
                    35971,
                    36409,
                    36435,
                    34643,
                    34956,
                    33199,
                    31136,
                    30835,
                    31611,
                    30666,
                    30319
                ]
        }, {
            name: 'Downstream',
            data:
                [
                    22534,
                    23599,
                    24533,
                    25195,
                    25896,
                    27635,
                    29173,
                    32646,
                    35686,
                    37709,
                    39143,
                    36829,
                    35031,
                    36202,
                    35140,
                    33718,
                    37773,
                    42556,
                    43820,
                    46445
                ]
        }],
    }

    return (
        <div className={styles.group_cpu_traffic}>
            <div className="row">
                <div className="col-md-3">
                    <p><span className={styles.ico_up}></span>Upstream</p>
                    <p>2387.36 KB</p>
                </div>
                <div className="col-md-3">
                    <p><span className={styles.ico_down}></span>Downstream</p>
                    <p>658.05 KB</p>
                </div>

                <div className="col-md-3">
                    <p>Total sent</p>
                    <p>30.62 GB</p>
                </div>

                <div className="col-md-3">
                    <p>Total received</p>
                    <p>24.39 GB</p>
                </div>
            </div>
            <div className={styles.chart_traffic}>
                <HighchartsReact
                    highcharts={Highcharts}
                    options={optionsTraffic}
                    allowChartUpdate={true}
                    immutable={true}
                />
            </div>

        </div>
    );
}

export default Traffic;