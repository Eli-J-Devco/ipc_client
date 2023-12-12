/********************************************************
* Copyright 2020-2021 NEXT WAVE ENERGY MONITORING INC.
* All rights reserved.
* 
*********************************************************/
import React from 'react';
import styles from './Overview.module.scss'
import Button from "../../../../components/button/Button";
import { ReactComponent as PVArray } from "../../../../assets/images/pv_array.svg";
import { ReactComponent as Line } from "../../../../assets/images/line.svg";
import { ReactComponent as RedLine } from "../../../../assets/images/red_line.svg";
import { ReactComponent as PVInverter } from "../../../../assets/images/pv_inverter.svg";
import { ReactComponent as ProductionMeter } from "../../../../assets/images/production_meter.svg";
import { ReactComponent as Consumption } from "../../../../assets/images/consumption.svg";
import { ReactComponent as PowerGrid } from "../../../../assets/images/power_grid.svg";
import { ReactComponent as TreePlaned } from "../../../../assets/images/tree_planted.svg";
import { ReactComponent as Temperature } from "../../../../assets/images/temperature.svg";
import { ReactComponent as Co2Avoided } from "../../../../assets/images/co2_avoided.svg";
import { ReactComponent as Humidity } from "../../../../assets/images/humidity.svg";
import { ReactComponent as Danger } from "../../../../assets/images/danger.svg";
import { ReactComponent as Power } from "../../../../assets/images/power.svg";
import { ReactComponent as SolarPanel } from "../../../../assets/images/solar_panel.svg";
import { ReactComponent as ArrowDown } from "../../../../assets/images/arrow_down.svg";
import { ReactComponent as DownloadYellow } from "../../../../assets/images/download_yellow.svg";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts/highcharts.js";
import highchartsMore from "highcharts/highcharts-more.js"
import HighchartsExporting from 'highcharts/modules/exporting';
import bellcurve from "highcharts/modules/histogram-bellcurve";
import solidGauge from "highcharts/modules/solid-gauge.js";
import Table from '../../../../components/table/Table';
import ButtonGroup from '../../../../components/buttonGroup/ButtonGroup';
import DatePickerButton from '../../../../components/datePickerButton/DatePickerButton';
import useOverview from './useOverview';
import Modal from '../../../../components/modal/Modal';


highchartsMore(Highcharts);
solidGauge(Highcharts);

bellcurve(Highcharts);
if (typeof Highcharts === 'object') {
  HighchartsExporting(Highcharts)
}

export default function Overview() {
  const { isSelectTime, openSelectTime, isSingleLineDatagram, openSingleLineDatagram, closeSingleLineDatagram } = useOverview();

  const dataFilter = [
    { id: "today", text: 'Today'},
    { id: "3_day", text: '3 Days' },
    { id: "this_week", text: 'This Week' },
    { id: "last_week", text: 'Last Week' },
    { id: "this_month", text: 'This Month' },
    { id: "last_month", text: 'Last Month' },
    { id: "12_month", text: '12 Months' },
    { id: "year", text: 'Year to Date' },
    { id: "lifetime", text: 'Lifetime' },
    { id: "custom", text: 'Custom' }
  ];

  const itemFilters = dataFilter.map((item, index) => {
    return <div key={index} >{item.text}</div>
  })
  
  

  const data = [
    {alert: "", component: "AE500NX INV1", value: '145.6 kW', last_updated: '2023-12-12 00:12:12 AM'},
    {alert: "", component: "AE500NX INV1", value: '145.6 kW', last_updated: 'now'},
    {alert: "", component: "AE500NX INV1", value: '145.6 kW', last_updated: 'now'},
    {alert: "", component: "AE500NX INV1", value: '145.6 kW', last_updated: 'now'},
    {alert: "", component: "AE500NX INV1", value: '145.6 kW', last_updated: 'now'},
    {alert: "", component: "AE500NX INV1", value: '145.6 kW', last_updated: 'now'},
    {alert: "", component: "AE500NX INV1", value: '145.6 kW', last_updated: 'now'},
    {alert: "", component: "AE500NX INV1", value: '145.6 kW', last_updated: 'now'},
    ]

  const columns = [
    {id: 1, slug: "alert", name: "", width: 50},
    {id: 2, slug: "component", name: "Component", width: 150},
    {id: 3, slug: "value", name: "Value", width: 50},
    {id: 4, slug: "last_updated", name: "Last Updated", width: 100}
  ]

  const blue = 235.5;
  const red = 0;

  var chartOptionPVProduction = {

    chart: {
      type: 'gauge',
      plotBackgroundColor: null,
      plotBackgroundImage: null,
      plotBorderWidth: 0,
      plotShadow: false,
      height: '50%'
    },

    credits: { enabled: false },
    exporting: {
      enabled: false,
      buttons: {
        contextButton: {
          symbolStroke: "#383434",
        },
      }
    },

    title: {
      text: null
    },

    pane: {
      startAngle: -90,
      endAngle: 89.9,
      background: null,
      center: ['50%', '70%'],
      size: '110%'
    },

    // the value axis
    yAxis: {
      min: 0,
      max: 200,
      tickPixelInterval: 72,
      tickPosition: 'inside',
      tickColor: '#FFFFFF',
      tickLength: 20,
      tickWidth: 2,
      minorTickInterval: null,
      labels: {
        distance: 15,
        style: {
          fontSize: '14px'
        }
      },
      plotBands: [{
        from: 0,
        to: 120,
        color: '#55BF3B', // red
        thickness: 20
      }, {
        from: 120,
        to: 165,
        color: '#DDDF0D', // yellow
        thickness: 20
      }, {
        from: 165,
        to: 200,
        color: '#DF5353', // green
        thickness: 20
      }]
    },

    series: [{
      name: 'Node meter',
      data: [0],
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
        radius: '80%',
        backgroundColor: 'gray',
        baseWidth: 12,
        baseLength: '0%',
        rearLength: '0%'
      },
      pivot: {
        backgroundColor: 'gray',
        radius: 6
      }

    }]

  }

  const chartParams = {
    "id_site": null,
    "id_filter": "3_day",
    "text_filter": "3 Days",
    "show_filter": false,
    "current_time": "12/12/2023 08:41",
    "end_date": "12/11/2023 17:41:49",
    "start_date": "12/09/2023 17:41:49",
    "max_date": "12/12/2023",
    "data_send_time": 3,
    "disabled": true,
    "start_max_date": "12/09/2023 17:41:49"
}
  const dataCategories = [
    [
        "00:00 09. Dec"
    ],
    [
        "01:00 09. Dec"
    ],
    [
        "02:00 09. Dec"
    ],
    [
        "03:00 09. Dec"
    ],
    [
        "04:00 09. Dec"
    ],
    [
        "05:00 09. Dec"
    ],
    [
        "06:00 09. Dec"
    ],
    [
        "07:00 09. Dec"
    ],
    [
        "08:00 09. Dec"
    ],
    [
        "09:00 09. Dec"
    ],
    [
        "10:00 09. Dec"
    ],
    [
        "11:00 09. Dec"
    ],
    [
        "12:00 09. Dec"
    ],
    [
        "13:00 09. Dec"
    ],
    [
        "14:00 09. Dec"
    ],
    [
        "15:00 09. Dec"
    ],
    [
        "16:00 09. Dec"
    ],
    [
        "17:00 09. Dec"
    ],
    [
        "18:00 09. Dec"
    ],
    [
        "19:00 09. Dec"
    ],
    [
        "20:00 09. Dec"
    ],
    [
        "21:00 09. Dec"
    ],
    [
        "22:00 09. Dec"
    ],
    [
        "23:00 09. Dec"
    ],
    [
        "00:00 10. Dec"
    ],
    [
        "01:00 10. Dec"
    ],
    [
        "02:00 10. Dec"
    ],
    [
        "03:00 10. Dec"
    ],
    [
        "04:00 10. Dec"
    ],
    [
        "05:00 10. Dec"
    ],
    [
        "06:00 10. Dec"
    ],
    [
        "07:00 10. Dec"
    ],
    [
        "08:00 10. Dec"
    ],
    [
        "09:00 10. Dec"
    ],
    [
        "10:00 10. Dec"
    ],
    [
        "11:00 10. Dec"
    ],
    [
        "12:00 10. Dec"
    ],
    [
        "13:00 10. Dec"
    ],
    [
        "14:00 10. Dec"
    ],
    [
        "15:00 10. Dec"
    ],
    [
        "16:00 10. Dec"
    ],
    [
        "17:00 10. Dec"
    ],
    [
        "18:00 10. Dec"
    ],
    [
        "19:00 10. Dec"
    ],
    [
        "20:00 10. Dec"
    ],
    [
        "21:00 10. Dec"
    ],
    [
        "22:00 10. Dec"
    ],
    [
        "23:00 10. Dec"
    ],
    [
        "00:00 11. Dec"
    ],
    [
        "01:00 11. Dec"
    ],
    [
        "02:00 11. Dec"
    ],
    [
        "03:00 11. Dec"
    ],
    [
        "04:00 11. Dec"
    ],
    [
        "05:00 11. Dec"
    ],
    [
        "06:00 11. Dec"
    ],
    [
        "07:00 11. Dec"
    ],
    [
        "08:00 11. Dec"
    ],
    [
        "09:00 11. Dec"
    ],
    [
        "10:00 11. Dec"
    ],
    [
        "11:00 11. Dec"
    ],
    [
        "12:00 11. Dec"
    ],
    [
        "13:00 11. Dec"
    ],
    [
        "14:00 11. Dec"
    ],
    [
        "15:00 11. Dec"
    ],
    [
        "16:00 11. Dec"
    ],
    [
        "17:00 11. Dec"
    ],
    [
        "18:00 11. Dec"
    ],
    [
        "19:00 11. Dec"
    ],
    [
        "20:00 11. Dec"
    ],
    [
        "21:00 11. Dec"
    ],
    [
        "22:00 11. Dec"
    ],
    [
        "23:00 11. Dec"
    ],
    [
        "00:00 09. Dec"
    ],
    [
        "01:00 09. Dec"
    ],
    [
        "02:00 09. Dec"
    ],
    [
        "03:00 09. Dec"
    ],
    [
        "04:00 09. Dec"
    ],
    [
        "05:00 09. Dec"
    ],
    [
        "06:00 09. Dec"
    ],
    [
        "07:00 09. Dec"
    ],
    [
        "08:00 09. Dec"
    ],
    [
        "09:00 09. Dec"
    ],
    [
        "10:00 09. Dec"
    ],
    [
        "11:00 09. Dec"
    ],
    [
        "12:00 09. Dec"
    ],
    [
        "13:00 09. Dec"
    ],
    [
        "14:00 09. Dec"
    ],
    [
        "15:00 09. Dec"
    ],
    [
        "16:00 09. Dec"
    ],
    [
        "17:00 09. Dec"
    ],
    [
        "18:00 09. Dec"
    ],
    [
        "19:00 09. Dec"
    ],
    [
        "20:00 09. Dec"
    ],
    [
        "21:00 09. Dec"
    ],
    [
        "22:00 09. Dec"
    ],
    [
        "23:00 09. Dec"
    ],
    [
        "00:00 10. Dec"
    ],
    [
        "01:00 10. Dec"
    ],
    [
        "02:00 10. Dec"
    ],
    [
        "03:00 10. Dec"
    ],
    [
        "04:00 10. Dec"
    ],
    [
        "05:00 10. Dec"
    ],
    [
        "06:00 10. Dec"
    ],
    [
        "07:00 10. Dec"
    ],
    [
        "08:00 10. Dec"
    ],
    [
        "09:00 10. Dec"
    ],
    [
        "10:00 10. Dec"
    ],
    [
        "11:00 10. Dec"
    ],
    [
        "12:00 10. Dec"
    ],
    [
        "13:00 10. Dec"
    ],
    [
        "14:00 10. Dec"
    ],
    [
        "15:00 10. Dec"
    ],
    [
        "16:00 10. Dec"
    ],
    [
        "17:00 10. Dec"
    ],
    [
        "18:00 10. Dec"
    ],
    [
        "19:00 10. Dec"
    ],
    [
        "20:00 10. Dec"
    ],
    [
        "21:00 10. Dec"
    ],
    [
        "22:00 10. Dec"
    ],
    [
        "23:00 10. Dec"
    ],
    [
        "00:00 11. Dec"
    ],
    [
        "01:00 11. Dec"
    ],
    [
        "02:00 11. Dec"
    ],
    [
        "03:00 11. Dec"
    ],
    [
        "04:00 11. Dec"
    ],
    [
        "05:00 11. Dec"
    ],
    [
        "06:00 11. Dec"
    ],
    [
        "07:00 11. Dec"
    ],
    [
        "08:00 11. Dec"
    ],
    [
        "09:00 11. Dec"
    ],
    [
        "10:00 11. Dec"
    ],
    [
        "11:00 11. Dec"
    ],
    [
        "12:00 11. Dec"
    ],
    [
        "13:00 11. Dec"
    ],
    [
        "14:00 11. Dec"
    ],
    [
        "15:00 11. Dec"
    ],
    [
        "16:00 11. Dec"
    ],
    [
        "17:00 11. Dec"
    ],
    [
        "18:00 11. Dec"
    ],
    [
        "19:00 11. Dec"
    ],
    [
        "20:00 11. Dec"
    ],
    [
        "21:00 11. Dec"
    ],
    [
        "22:00 11. Dec"
    ],
    [
        "23:00 11. Dec"
    ],
    [
        "00:00 09. Dec"
    ],
    [
        "01:00 09. Dec"
    ],
    [
        "02:00 09. Dec"
    ],
    [
        "03:00 09. Dec"
    ],
    [
        "04:00 09. Dec"
    ],
    [
        "05:00 09. Dec"
    ],
    [
        "06:00 09. Dec"
    ],
    [
        "07:00 09. Dec"
    ],
    [
        "08:00 09. Dec"
    ],
    [
        "09:00 09. Dec"
    ],
    [
        "10:00 09. Dec"
    ],
    [
        "11:00 09. Dec"
    ],
    [
        "12:00 09. Dec"
    ],
    [
        "13:00 09. Dec"
    ],
    [
        "14:00 09. Dec"
    ],
    [
        "15:00 09. Dec"
    ],
    [
        "16:00 09. Dec"
    ],
    [
        "17:00 09. Dec"
    ],
    [
        "18:00 09. Dec"
    ],
    [
        "19:00 09. Dec"
    ],
    [
        "20:00 09. Dec"
    ],
    [
        "21:00 09. Dec"
    ],
    [
        "22:00 09. Dec"
    ],
    [
        "23:00 09. Dec"
    ],
    [
        "00:00 10. Dec"
    ],
    [
        "01:00 10. Dec"
    ],
    [
        "02:00 10. Dec"
    ],
    [
        "03:00 10. Dec"
    ],
    [
        "04:00 10. Dec"
    ],
    [
        "05:00 10. Dec"
    ],
    [
        "06:00 10. Dec"
    ],
    [
        "07:00 10. Dec"
    ],
    [
        "08:00 10. Dec"
    ],
    [
        "09:00 10. Dec"
    ],
    [
        "10:00 10. Dec"
    ],
    [
        "11:00 10. Dec"
    ],
    [
        "12:00 10. Dec"
    ],
    [
        "13:00 10. Dec"
    ],
    [
        "14:00 10. Dec"
    ],
    [
        "15:00 10. Dec"
    ],
    [
        "16:00 10. Dec"
    ],
    [
        "17:00 10. Dec"
    ],
    [
        "18:00 10. Dec"
    ],
    [
        "19:00 10. Dec"
    ],
    [
        "20:00 10. Dec"
    ],
    [
        "21:00 10. Dec"
    ],
    [
        "22:00 10. Dec"
    ],
    [
        "23:00 10. Dec"
    ],
    [
        "00:00 11. Dec"
    ],
    [
        "01:00 11. Dec"
    ],
    [
        "02:00 11. Dec"
    ],
    [
        "03:00 11. Dec"
    ],
    [
        "04:00 11. Dec"
    ],
    [
        "05:00 11. Dec"
    ],
    [
        "06:00 11. Dec"
    ],
    [
        "07:00 11. Dec"
    ],
    [
        "08:00 11. Dec"
    ],
    [
        "09:00 11. Dec"
    ],
    [
        "10:00 11. Dec"
    ],
    [
        "11:00 11. Dec"
    ],
    [
        "12:00 11. Dec"
    ],
    [
        "13:00 11. Dec"
    ],
    [
        "14:00 11. Dec"
    ],
    [
        "15:00 11. Dec"
    ],
    [
        "16:00 11. Dec"
    ],
    [
        "17:00 11. Dec"
    ],
    [
        "18:00 11. Dec"
    ],
    [
        "19:00 11. Dec"
    ],
    [
        "20:00 11. Dec"
    ],
    [
        "21:00 11. Dec"
    ],
    [
        "22:00 11. Dec"
    ],
    [
        "23:00 11. Dec"
    ]
]
  const series = [
    {
        "name": "Power ",
        "data": [
            [
                "12/09/2023 00:00",
                0
            ],
            [
                "12/09/2023 01:00",
                0
            ],
            [
                "12/09/2023 02:00",
                0
            ],
            [
                "12/09/2023 03:00",
                0
            ],
            [
                "12/09/2023 04:00",
                0
            ],
            [
                "12/09/2023 05:00",
                0
            ],
            [
                "12/09/2023 06:00",
                0.6
            ],
            [
                "12/09/2023 07:00",
                26.8
            ],
            [
                "12/09/2023 08:00",
                129.4
            ],
            [
                "12/09/2023 09:00",
                239.1
            ],
            [
                "12/09/2023 10:00",
                301.8
            ],
            [
                "12/09/2023 11:00",
                297.8
            ],
            [
                "12/09/2023 12:00",
                291.7
            ],
            [
                "12/09/2023 13:00",
                224.7
            ],
            [
                "12/09/2023 14:00",
                143.7
            ],
            [
                "12/09/2023 15:00",
                63
            ],
            [
                "12/09/2023 16:00",
                7.1
            ],
            [
                "12/09/2023 17:00",
                0
            ],
            [
                "12/09/2023 18:00",
                0
            ],
            [
                "12/09/2023 19:00",
                0
            ],
            [
                "12/09/2023 20:00",
                0
            ],
            [
                "12/09/2023 21:00",
                0
            ],
            [
                "12/09/2023 22:00",
                0
            ],
            [
                "12/09/2023 23:00",
                0
            ],
            [
                "12/10/2023 00:00",
                0
            ],
            [
                "12/10/2023 01:00",
                0
            ],
            [
                "12/10/2023 02:00",
                0
            ],
            [
                "12/10/2023 03:00",
                0
            ],
            [
                "12/10/2023 04:00",
                0
            ],
            [
                "12/10/2023 05:00",
                0
            ],
            [
                "12/10/2023 06:00",
                0.5
            ],
            [
                "12/10/2023 07:00",
                25
            ],
            [
                "12/10/2023 08:00",
                114.9
            ],
            [
                "12/10/2023 09:00",
                216.3
            ],
            [
                "12/10/2023 10:00",
                276.1
            ],
            [
                "12/10/2023 11:00",
                296.9
            ],
            [
                "12/10/2023 12:00",
                282.1
            ],
            [
                "12/10/2023 13:00",
                241.1
            ],
            [
                "12/10/2023 14:00",
                151.8
            ],
            [
                "12/10/2023 15:00",
                67.2
            ],
            [
                "12/10/2023 16:00",
                10.4
            ],
            [
                "12/10/2023 17:00",
                0
            ],
            [
                "12/10/2023 18:00",
                0
            ],
            [
                "12/10/2023 19:00",
                0
            ],
            [
                "12/10/2023 20:00",
                0
            ],
            [
                "12/10/2023 21:00",
                0
            ],
            [
                "12/10/2023 22:00",
                0
            ],
            [
                "12/10/2023 23:00",
                0
            ],
            [
                "12/11/2023 00:00",
                0
            ],
            [
                "12/11/2023 01:00",
                0
            ],
            [
                "12/11/2023 02:00",
                0
            ],
            [
                "12/11/2023 03:00",
                0
            ],
            [
                "12/11/2023 04:00",
                0
            ],
            [
                "12/11/2023 05:00",
                0
            ],
            [
                "12/11/2023 06:00",
                0.1
            ],
            [
                "12/11/2023 07:00",
                21.6
            ],
            [
                "12/11/2023 08:00",
                83.4
            ],
            [
                "12/11/2023 09:00",
                175.5
            ],
            [
                "12/11/2023 10:00",
                235.1
            ],
            [
                "12/11/2023 11:00",
                298.2
            ],
            [
                "12/11/2023 12:00",
                271.1
            ],
            [
                "12/11/2023 13:00",
                197.3
            ],
            [
                "12/11/2023 14:00",
                139.7
            ],
            [
                "12/11/2023 15:00",
                64.2
            ],
            [
                "12/11/2023 16:00",
                11.3
            ],
            [
                "12/11/2023 17:00",
                0
            ],
            [
                "12/11/2023 18:00",
                null
            ],
            [
                "12/11/2023 19:00",
                null
            ],
            [
                "12/11/2023 20:00",
                null
            ],
            [
                "12/11/2023 21:00",
                null
            ],
            [
                "12/11/2023 22:00",
                null
            ],
            [
                "12/11/2023 23:00",
                null
            ]
        ],
        "type": "column",
        "yAxis": 0,
        "tooltip": {
            "valueSuffix": " kW"
        },
        "zIndex": 2
    },
    {
        "name": "Expected Power",
        "data": [
            [
                "12/09/2023 00:00",
                0
            ],
            [
                "12/09/2023 01:00",
                0
            ],
            [
                "12/09/2023 02:00",
                0
            ],
            [
                "12/09/2023 03:00",
                0
            ],
            [
                "12/09/2023 04:00",
                0
            ],
            [
                "12/09/2023 05:00",
                0
            ],
            [
                "12/09/2023 06:00",
                1.7
            ],
            [
                "12/09/2023 07:00",
                59.1
            ],
            [
                "12/09/2023 08:00",
                201.8
            ],
            [
                "12/09/2023 09:00",
                305.8
            ],
            [
                "12/09/2023 10:00",
                366.3
            ],
            [
                "12/09/2023 11:00",
                376.4
            ],
            [
                "12/09/2023 12:00",
                375.8
            ],
            [
                "12/09/2023 13:00",
                308.4
            ],
            [
                "12/09/2023 14:00",
                227
            ],
            [
                "12/09/2023 15:00",
                140.5
            ],
            [
                "12/09/2023 16:00",
                10.3
            ],
            [
                "12/09/2023 17:00",
                0
            ],
            [
                "12/09/2023 18:00",
                0
            ],
            [
                "12/09/2023 19:00",
                0
            ],
            [
                "12/09/2023 20:00",
                0
            ],
            [
                "12/09/2023 21:00",
                0
            ],
            [
                "12/09/2023 22:00",
                0
            ],
            [
                "12/09/2023 23:00",
                0
            ],
            [
                "12/10/2023 00:00",
                0
            ],
            [
                "12/10/2023 01:00",
                0
            ],
            [
                "12/10/2023 02:00",
                0
            ],
            [
                "12/10/2023 03:00",
                0
            ],
            [
                "12/10/2023 04:00",
                0
            ],
            [
                "12/10/2023 05:00",
                0
            ],
            [
                "12/10/2023 06:00",
                1.6
            ],
            [
                "12/10/2023 07:00",
                60.3
            ],
            [
                "12/10/2023 08:00",
                206.9
            ],
            [
                "12/10/2023 09:00",
                304.7
            ],
            [
                "12/10/2023 10:00",
                373.6
            ],
            [
                "12/10/2023 11:00",
                395.7
            ],
            [
                "12/10/2023 12:00",
                383.5
            ],
            [
                "12/10/2023 13:00",
                340.6
            ],
            [
                "12/10/2023 14:00",
                248.6
            ],
            [
                "12/10/2023 15:00",
                152.6
            ],
            [
                "12/10/2023 16:00",
                17.3
            ],
            [
                "12/10/2023 17:00",
                0
            ],
            [
                "12/10/2023 18:00",
                0
            ],
            [
                "12/10/2023 19:00",
                0
            ],
            [
                "12/10/2023 20:00",
                0
            ],
            [
                "12/10/2023 21:00",
                0
            ],
            [
                "12/10/2023 22:00",
                0
            ],
            [
                "12/10/2023 23:00",
                0
            ],
            [
                "12/11/2023 00:00",
                0
            ],
            [
                "12/11/2023 01:00",
                0
            ],
            [
                "12/11/2023 02:00",
                0
            ],
            [
                "12/11/2023 03:00",
                0
            ],
            [
                "12/11/2023 04:00",
                0
            ],
            [
                "12/11/2023 05:00",
                0
            ],
            [
                "12/11/2023 06:00",
                0.6
            ],
            [
                "12/11/2023 07:00",
                43.2
            ],
            [
                "12/11/2023 08:00",
                144.3
            ],
            [
                "12/11/2023 09:00",
                258.3
            ],
            [
                "12/11/2023 10:00",
                328.3
            ],
            [
                "12/11/2023 11:00",
                409.5
            ],
            [
                "12/11/2023 12:00",
                376.4
            ],
            [
                "12/11/2023 13:00",
                316.7
            ],
            [
                "12/11/2023 14:00",
                247.2
            ],
            [
                "12/11/2023 15:00",
                161.6
            ],
            [
                "12/11/2023 16:00",
                19.1
            ],
            [
                "12/11/2023 17:00",
                0
            ],
            [
                "12/11/2023 18:00",
                null
            ],
            [
                "12/11/2023 19:00",
                null
            ],
            [
                "12/11/2023 20:00",
                null
            ],
            [
                "12/11/2023 21:00",
                null
            ],
            [
                "12/11/2023 22:00",
                null
            ],
            [
                "12/11/2023 23:00",
                null
            ]
        ],
        "type": "area",
        "yAxis": 0,
        "lineWidth": 3,
        "tooltip": {
            "valueSuffix": " kW"
        },
        "marker": {
            "radius": 1.5
        },
        "zIndex": 1,
        "opacity": 0.75
    },
    {
        "name": " Irradiance",
        "data": [
            [
                "12/09/2023 00:00",
                0
            ],
            [
                "12/09/2023 01:00",
                0
            ],
            [
                "12/09/2023 02:00",
                0
            ],
            [
                "12/09/2023 03:00",
                0
            ],
            [
                "12/09/2023 04:00",
                0
            ],
            [
                "12/09/2023 05:00",
                0
            ],
            [
                "12/09/2023 06:00",
                2
            ],
            [
                "12/09/2023 07:00",
                74.9
            ],
            [
                "12/09/2023 08:00",
                282
            ],
            [
                "12/09/2023 09:00",
                466.4
            ],
            [
                "12/09/2023 10:00",
                603.3
            ],
            [
                "12/09/2023 11:00",
                597.7
            ],
            [
                "12/09/2023 12:00",
                607.8
            ],
            [
                "12/09/2023 13:00",
                476.2
            ],
            [
                "12/09/2023 14:00",
                332.6
            ],
            [
                "12/09/2023 15:00",
                199.6
            ],
            [
                "12/09/2023 16:00",
                13.6
            ],
            [
                "12/09/2023 17:00",
                0
            ],
            [
                "12/09/2023 18:00",
                0
            ],
            [
                "12/09/2023 19:00",
                0
            ],
            [
                "12/09/2023 20:00",
                0
            ],
            [
                "12/09/2023 21:00",
                0
            ],
            [
                "12/09/2023 22:00",
                0
            ],
            [
                "12/09/2023 23:00",
                0
            ],
            [
                "12/10/2023 00:00",
                0
            ],
            [
                "12/10/2023 01:00",
                0
            ],
            [
                "12/10/2023 02:00",
                0
            ],
            [
                "12/10/2023 03:00",
                0
            ],
            [
                "12/10/2023 04:00",
                0
            ],
            [
                "12/10/2023 05:00",
                0
            ],
            [
                "12/10/2023 06:00",
                1.8
            ],
            [
                "12/10/2023 07:00",
                74.7
            ],
            [
                "12/10/2023 08:00",
                283
            ],
            [
                "12/10/2023 09:00",
                464
            ],
            [
                "12/10/2023 10:00",
                606.5
            ],
            [
                "12/10/2023 11:00",
                672.6
            ],
            [
                "12/10/2023 12:00",
                659.4
            ],
            [
                "12/10/2023 13:00",
                574.3
            ],
            [
                "12/10/2023 14:00",
                386.1
            ],
            [
                "12/10/2023 15:00",
                220.8
            ],
            [
                "12/10/2023 16:00",
                22.7
            ],
            [
                "12/10/2023 17:00",
                0
            ],
            [
                "12/10/2023 18:00",
                0
            ],
            [
                "12/10/2023 19:00",
                0
            ],
            [
                "12/10/2023 20:00",
                0
            ],
            [
                "12/10/2023 21:00",
                0
            ],
            [
                "12/10/2023 22:00",
                0
            ],
            [
                "12/10/2023 23:00",
                0
            ],
            [
                "12/11/2023 00:00",
                0
            ],
            [
                "12/11/2023 01:00",
                0
            ],
            [
                "12/11/2023 02:00",
                0
            ],
            [
                "12/11/2023 03:00",
                0
            ],
            [
                "12/11/2023 04:00",
                0
            ],
            [
                "12/11/2023 05:00",
                0
            ],
            [
                "12/11/2023 06:00",
                0.7
            ],
            [
                "12/11/2023 07:00",
                52.2
            ],
            [
                "12/11/2023 08:00",
                188.7
            ],
            [
                "12/11/2023 09:00",
                376
            ],
            [
                "12/11/2023 10:00",
                513.2
            ],
            [
                "12/11/2023 11:00",
                672.7
            ],
            [
                "12/11/2023 12:00",
                629.4
            ],
            [
                "12/11/2023 13:00",
                496.8
            ],
            [
                "12/11/2023 14:00",
                360.8
            ],
            [
                "12/11/2023 15:00",
                232.1
            ],
            [
                "12/11/2023 16:00",
                24.6
            ],
            [
                "12/11/2023 17:00",
                0
            ],
            [
                "12/11/2023 18:00",
                null
            ],
            [
                "12/11/2023 19:00",
                null
            ],
            [
                "12/11/2023 20:00",
                null
            ],
            [
                "12/11/2023 21:00",
                null
            ],
            [
                "12/11/2023 22:00",
                null
            ],
            [
                "12/11/2023 23:00",
                null
            ]
        ],
        "type": "spline",
        "yAxis": 1,
        "lineWidth": 3,
        "tooltip": {
            "valueSuffix": " W/m²"
        },
        "id": "s1",
        "marker": {
            "radius": 1.5
        },
        "zIndex": 3
    }
]

  const chartOption = {
    chart: {
      zoomType: 'xy',
      type: 'column',
      height: 400
    },

    title: {
      text: null
    },

    responsive: {
      rules: [{
        condition: {
          callback: function () {
            return this.fullscreen.isOpen;
          }
        },
        chartOptions: { chart: { height: 1080 } }
      }]
    },
    legend: {
      layout: 'horizontal',
      align: 'center',
      verticalAlign: 'bottom',
      borderWidth: 0,
      showInLegend: false
    },
    colors: ['#acacac', '#efebdd', '#ffda00', '#e68600', '#00b767', '#ffc300'],
    xAxis: [
      {
        title: { text: "Power", enabled: false },
        lineColor: '#acacac',
        tickWidth: 1,
        tickPositions: null,
        alignTicks: true,
        gridLineWidth: 1,
        tickmarkPlacement: 'on',
        tickInterval: 12,
        categories: dataCategories,
        crosshair: true,
        labels: {
          formatter: function() {
            var label = this.axis.defaultLabelFormatter.call(this);
            
            if(1 < 4) {
              let hour = label.slice(0,5)
              label = label.slice(5, label.length)
              return `<span>${hour}</span><br> <span>${label}</span>`;
            } else {
              return label;
            }             
          }
        }
      },

      {
        title: { text: 'Data', enabled: false },
        lineColor: '#acacac',
        tickInterval: 1,
        opposite: true,
        visible: false,
      },

    ],
    
    yAxis: [{
      min: 0,
      title: {
        text: chartParams.id_filter == 'today' || chartParams.id_filter == '3_day' || (chartParams.id_filter == 'custom') ? 'kW' : "kWh",
        enabled: true
      },
      lineColor: '#acacac',
      lineWidth: 1,
      gridLineWidth: 1,
      labels: {
        enabled: true
      },
    }, {
      title: { text: 'Watts/meter²', enabled: true },
      lineWidth: 1,
      lineColor: '#acacac',
      gridLineWidth: 1,
      min: 0,
      opposite: true,
      labels: {
        enabled: true
      },
    }
    ],

    plotOptions: {
      series: {
        turboThreshold: 5000
      },
      column: {
        stacking: 'normal'
      },
    },

    tooltip: {
      shared: true,
      // crosshairs: true
    },

    navigation: {
      buttonOptions: {
          enabled: true
      }
    },
    series: series
  }

  return (
    <div className={styles.main_overview}>
        {isSingleLineDatagram ? <Modal
          isOpen={true}
          close={closeSingleLineDatagram}
          title="Single Line Datagram"
          fullscreen={true}
        > 
          <div>
          <iframe src='https://jumpshare.com/s/v8T481sjUrPtW9FtLyDC' title='1' width="100%" height="800px"className='container-single-line-diagram' frameborder="0" ></iframe>

          </div>
        </Modal> : ""}

      <div className='row'>
        <div className='col-md-4'>
          <div className={styles.energy_flow}>
            <div className={styles.header_energy_flow}>
                  <div className={styles.title}>Energy Flow</div>
                  <div>
                    <Button className='me-2'>
                        <Button.Text text="Site Map" />
                    </Button>
                    <Button onClick={() => openSingleLineDatagram()}>
                        <Button.Text text="Single line datagram" />
                    </Button>
                  </div>
            </div>
            <div className={styles.body_energy_flow}>
              <div className={styles.left}>
                <div className={styles.pv_array}>
                  <PVArray />
                  <div className='text-center'>PV array</div>
                </div>
                <div className={styles.line}>
                  <div className='text-center' style={{color: blue > 0 ? '#0C76BC' : '#DC3545'}}>235.5 kW</div>
                  <Line />
                </div>
                <div>
                  <PVInverter />
                  <div className='text-center'>PV inverter</div>
                </div>
                <div className={styles.line}>
                  <div className='text-center' style={{color: blue > 0 ? '#0C76BC' : '#DC3545'}}>235.5 kW</div>
                  <Line />
                </div>
                <div>
                  <ProductionMeter />
                  <div className={styles.meter}>Production Meter</div>
                </div>
                <div>
                  <div className={styles.line_45degree}>
                    <div className='text-center' style={{color: blue > 0 ? '#0C76BC' : '#DC3545'}}>235.5 kW</div>
                    {blue === 0 ? <RedLine /> : <Line />  }
                  </div>
                  
                  <div className={styles.line_45}>
                    <div className='text-center' style={{color: red > 0 ? '#0C76BC' : '#DC3545'}}>{red} kW</div>
                    {red === 0 ? <RedLine /> : <Line />  }
                  </div>
                </div>
              </div>
              <div className={styles.right}>
                <div className={styles.power_grid}>
                  <PowerGrid />
                  <div >Power Grid</div>
                </div>
                <div className={styles.consumption}>
                  <Consumption />
                  <div className='consumption_title'>Consumption</div>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.current_pv_production}>
            <div className={styles.pv_production}>
              <div className={styles.header}>Current PV Production</div>             
              <div className={styles.charting_pv_production} >
                <HighchartsReact highcharts={Highcharts} allowChartUpdate={true} immutable={false} options={chartOptionPVProduction} />
              </div>
              <div className={styles.footer}>PV Size: 1.143.6 kW (AC) / 1,560 kW (DC)</div>
            </div>
          </div>

          <div className={styles.detail_overview}>
            <div className='row ms-2'>
              <div className='col-md-7 mt-4'>
                <div className={styles.group}>
                    <TreePlaned />
                    <div className={styles.detail}>
                      <div className={styles.value}>303,885</div>
                      <div>Equivalent Trees Planted</div>
                    </div>
                </div>
              </div>
              <div className='col-md-5 mt-4'>
                <div className={styles.group}>
                    <Temperature />
                    <div className={styles.detail}>
                      <div className={styles.value}>35.5°</div>
                      <div>Temperature</div>
                    </div>
                </div>
              </div>
            </div>

            <div className='row ms-2'>
              <div className='col-md-7 mt-4'>
                <div className={styles.group}>
                    <Co2Avoided />
                    <div className={styles.detail}>
                      <div className={styles.value}>10,181,454,024</div>
                      <div>Tons of CO2 Avoided</div>
                    </div>
                </div>
              </div>
              <div className='col-md-5 mt-4'>
                <div className={styles.group}>
                    <Humidity />
                    <div className={styles.detail}>
                      <div className={styles.value}>75%</div>
                      <div>Humidity</div>
                    </div>
                </div>
              </div>
            </div>
          </div>

        </div>
 
        <div className='col-md-8'>
          <div className={styles.device}>
            <div className='row'>
              <div className='col-md-8'>
                <Table columns={columns} data={data} maxHeight={277} className={styles.table_device} variant={"grey"} footer={true}
                alert={item => (
                  <div className="d-flex flex-wrap justify-content-center">
                    <Danger />
                  </div>
                )}
                
                />
              </div>
              <div className='col-md-4'>
                  <div className={styles.energy_today}>
                      <div className={styles.group}>
                          <div>Energy Today</div>
                          <div className={styles.value}>331.9 kWh</div>
                          <div>Installed Power <span>365.5 kWp</span></div>
                      </div>
                      <div className='me-3'><Power /></div>
                  </div>
                  <div className={styles.energy_today}>
                      <div className={styles.group}>
                          <div>Today's Production</div>
                          <div className={styles.value}>227.98 kWh</div>
                          <div>Energy Lifetime <span>730.909 kWp</span></div>
                      </div>
                      <div className='me-3'><SolarPanel /></div>
                  </div>
              </div>
            </div>
          </div>
          
          <div className={styles.charting}>
              <div className={styles.time_export}>
                  <div className={styles.time}>
                    <div className={styles.view} onClick={() => openSelectTime()}>3 Days<span><ArrowDown /></span>
                    </div>
                    <div className={styles.filter_dropdown} style={{display: isSelectTime ? "block" : "none"}}>
                      {isSelectTime ? itemFilters : ""}
                    </div>

                    <ButtonGroup className="mx-2"
                        buttons={[
                            {
                                text: "1 Minute"
                            },
                            {
                                text: "5 Minutes"
                            },
                            {
                                text: "1 Hour"
                            },
                            {
                                text: "1 Day"
                            },
                            {
                                text: "7 Days"
                            },
                            {
                                text: "1 Month"
                            },
                            {
                                text: "1 Year"
                            },
                        ]}
                    />
                      <DatePickerButton
                          prevDate="Aug 18, 2023"
                          nextDate="Aug 20, 2023"
                      />
                  </div>
                  <div className={styles.export}>
                    <DownloadYellow />
                  </div>
              </div>
              <div className={styles.charting_power}>
                <HighchartsReact highcharts={Highcharts} allowChartUpdate={true} immutable={true} options={chartOption} />
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};