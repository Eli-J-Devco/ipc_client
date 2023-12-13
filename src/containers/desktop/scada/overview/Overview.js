/********************************************************
* Copyright 2020-2021 NEXT WAVE ENERGY MONITORING INC.
* All rights reserved.
* 
*********************************************************/
import React, { useEffect, useRef } from 'react';
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
import { ReactComponent as PowerOverview } from "../../../../assets/images/power_overview.svg";
import { ReactComponent as SolarPanel } from "../../../../assets/images/solar_panel.svg";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts/highcharts.js";
import highchartsMore from "highcharts/highcharts-more.js"
import HighchartsExporting from 'highcharts/modules/exporting';
import bellcurve from "highcharts/modules/histogram-bellcurve";
import solidGauge from "highcharts/modules/solid-gauge.js";
import Table from '../../../../components/table/Table';
import useOverview from './useOverview';
import Modal from '../../../../components/modal/Modal';
import ChartView from '../../../../components/chartView/ChartView';


highchartsMore(Highcharts);
solidGauge(Highcharts);

bellcurve(Highcharts);
if (typeof Highcharts === 'object') {
  HighchartsExporting(Highcharts)
}

export default function Overview() {
  const { isSelectTime, openSelectTime, isSingleLineDatagram, openSingleLineDatagram, closeSingleLineDatagram } = useOverview();

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
      height: '235px'
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
        color: '#55BF3B', // green
        thickness: 20
      }, {
        from: 120,
        to: 165,
        color: '#DDDF0D', // yellow
        thickness: 20
      }, {
        from: 165,
        to: 200,
        color: '#DF5353', // red
        thickness: 20
      }]
    },

    series: [{
      name: 'Node meter',
      data: [100],
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

  const refHeight = useRef(null);
    useEffect(() => {
        if (refHeight.current.clientHeight > 0 && options) { options.chart.height = refHeight.current.clientHeight - 60; }
    });

const options = {
    chart: {
        "zoomType": "xy",
        "type": "column",
        height: null
    },
    title: {
        text: '',
        align: 'left',
        enabled: false
    },

    legend: {
        "layout": "horizontal",
        "align": "center",
        "verticalAlign": "bottom",
        "borderWidth": 0,
        "showInLegend": false
    },

    "colors": [
        "#acacac",
        "#ffda00"
    ],
    xAxis: [
        {
            "title": {
                "text": "Power",
                "enabled": false
            },
            "tickWidth": 1,
            "alignTicks": true,
            "gridLineWidth": 1,
            tickmarkPlacement: "on",
            "tickInterval": 48,
            "categories": [
                [
                    "00:00 09. Dec"
                ],
                [
                    "00:15 09. Dec"
                ],
                [
                    "00:30 09. Dec"
                ],
                [
                    "00:45 09. Dec"
                ],
                [
                    "01:00 09. Dec"
                ],
                [
                    "01:15 09. Dec"
                ],
                [
                    "01:30 09. Dec"
                ],
                [
                    "01:45 09. Dec"
                ],
                [
                    "02:00 09. Dec"
                ],
                [
                    "02:15 09. Dec"
                ],
                [
                    "02:30 09. Dec"
                ],
                [
                    "02:45 09. Dec"
                ],
                [
                    "03:00 09. Dec"
                ],
                [
                    "03:15 09. Dec"
                ],
                [
                    "03:30 09. Dec"
                ],
                [
                    "03:45 09. Dec"
                ],
                [
                    "04:00 09. Dec"
                ],
                [
                    "04:15 09. Dec"
                ],
                [
                    "04:30 09. Dec"
                ],
                [
                    "04:45 09. Dec"
                ],
                [
                    "05:00 09. Dec"
                ],
                [
                    "05:15 09. Dec"
                ],
                [
                    "05:30 09. Dec"
                ],
                [
                    "05:45 09. Dec"
                ],
                [
                    "06:00 09. Dec"
                ],
                [
                    "06:15 09. Dec"
                ],
                [
                    "06:30 09. Dec"
                ],
                [
                    "06:45 09. Dec"
                ],
                [
                    "07:00 09. Dec"
                ],
                [
                    "07:15 09. Dec"
                ],
                [
                    "07:30 09. Dec"
                ],
                [
                    "07:45 09. Dec"
                ],
                [
                    "08:00 09. Dec"
                ],
                [
                    "08:15 09. Dec"
                ],
                [
                    "08:30 09. Dec"
                ],
                [
                    "08:45 09. Dec"
                ],
                [
                    "09:00 09. Dec"
                ],
                [
                    "09:15 09. Dec"
                ],
                [
                    "09:30 09. Dec"
                ],
                [
                    "09:45 09. Dec"
                ],
                [
                    "10:00 09. Dec"
                ],
                [
                    "10:15 09. Dec"
                ],
                [
                    "10:30 09. Dec"
                ],
                [
                    "10:45 09. Dec"
                ],
                [
                    "11:00 09. Dec"
                ],
                [
                    "11:15 09. Dec"
                ],
                [
                    "11:30 09. Dec"
                ],
                [
                    "11:45 09. Dec"
                ],
                [
                    "12:00 09. Dec"
                ],
                [
                    "12:15 09. Dec"
                ],
                [
                    "12:30 09. Dec"
                ],
                [
                    "12:45 09. Dec"
                ],
                [
                    "13:00 09. Dec"
                ],
                [
                    "13:15 09. Dec"
                ],
                [
                    "13:30 09. Dec"
                ],
                [
                    "13:45 09. Dec"
                ],
                [
                    "14:00 09. Dec"
                ],
                [
                    "14:15 09. Dec"
                ],
                [
                    "14:30 09. Dec"
                ],
                [
                    "14:45 09. Dec"
                ],
                [
                    "15:00 09. Dec"
                ],
                [
                    "15:15 09. Dec"
                ],
                [
                    "15:30 09. Dec"
                ],
                [
                    "15:45 09. Dec"
                ],
                [
                    "16:00 09. Dec"
                ],
                [
                    "16:15 09. Dec"
                ],
                [
                    "16:30 09. Dec"
                ],
                [
                    "16:45 09. Dec"
                ],
                [
                    "17:00 09. Dec"
                ],
                [
                    "17:15 09. Dec"
                ],
                [
                    "17:30 09. Dec"
                ],
                [
                    "17:45 09. Dec"
                ],
                [
                    "18:00 09. Dec"
                ],
                [
                    "18:15 09. Dec"
                ],
                [
                    "18:30 09. Dec"
                ],
                [
                    "18:45 09. Dec"
                ],
                [
                    "19:00 09. Dec"
                ],
                [
                    "19:15 09. Dec"
                ],
                [
                    "19:30 09. Dec"
                ],
                [
                    "19:45 09. Dec"
                ],
                [
                    "20:00 09. Dec"
                ],
                [
                    "20:15 09. Dec"
                ],
                [
                    "20:30 09. Dec"
                ],
                [
                    "20:45 09. Dec"
                ],
                [
                    "21:00 09. Dec"
                ],
                [
                    "21:15 09. Dec"
                ],
                [
                    "21:30 09. Dec"
                ],
                [
                    "21:45 09. Dec"
                ],
                [
                    "22:00 09. Dec"
                ],
                [
                    "22:15 09. Dec"
                ],
                [
                    "22:30 09. Dec"
                ],
                [
                    "22:45 09. Dec"
                ],
                [
                    "23:00 09. Dec"
                ],
                [
                    "23:15 09. Dec"
                ],
                [
                    "23:30 09. Dec"
                ],
                [
                    "23:45 09. Dec"
                ],
                [
                    "00:00 10. Dec"
                ],
                [
                    "00:15 10. Dec"
                ],
                [
                    "00:30 10. Dec"
                ],
                [
                    "00:45 10. Dec"
                ],
                [
                    "01:00 10. Dec"
                ],
                [
                    "01:15 10. Dec"
                ],
                [
                    "01:30 10. Dec"
                ],
                [
                    "01:45 10. Dec"
                ],
                [
                    "02:00 10. Dec"
                ],
                [
                    "02:15 10. Dec"
                ],
                [
                    "02:30 10. Dec"
                ],
                [
                    "02:45 10. Dec"
                ],
                [
                    "03:00 10. Dec"
                ],
                [
                    "03:15 10. Dec"
                ],
                [
                    "03:30 10. Dec"
                ],
                [
                    "03:45 10. Dec"
                ],
                [
                    "04:00 10. Dec"
                ],
                [
                    "04:15 10. Dec"
                ],
                [
                    "04:30 10. Dec"
                ],
                [
                    "04:45 10. Dec"
                ],
                [
                    "05:00 10. Dec"
                ],
                [
                    "05:15 10. Dec"
                ],
                [
                    "05:30 10. Dec"
                ],
                [
                    "05:45 10. Dec"
                ],
                [
                    "06:00 10. Dec"
                ],
                [
                    "06:15 10. Dec"
                ],
                [
                    "06:30 10. Dec"
                ],
                [
                    "06:45 10. Dec"
                ],
                [
                    "07:00 10. Dec"
                ],
                [
                    "07:15 10. Dec"
                ],
                [
                    "07:30 10. Dec"
                ],
                [
                    "07:45 10. Dec"
                ],
                [
                    "08:00 10. Dec"
                ],
                [
                    "08:15 10. Dec"
                ],
                [
                    "08:30 10. Dec"
                ],
                [
                    "08:45 10. Dec"
                ],
                [
                    "09:00 10. Dec"
                ],
                [
                    "09:15 10. Dec"
                ],
                [
                    "09:30 10. Dec"
                ],
                [
                    "09:45 10. Dec"
                ],
                [
                    "10:00 10. Dec"
                ],
                [
                    "10:15 10. Dec"
                ],
                [
                    "10:30 10. Dec"
                ],
                [
                    "10:45 10. Dec"
                ],
                [
                    "11:00 10. Dec"
                ],
                [
                    "11:15 10. Dec"
                ],
                [
                    "11:30 10. Dec"
                ],
                [
                    "11:45 10. Dec"
                ],
                [
                    "12:00 10. Dec"
                ],
                [
                    "12:15 10. Dec"
                ],
                [
                    "12:30 10. Dec"
                ],
                [
                    "12:45 10. Dec"
                ],
                [
                    "13:00 10. Dec"
                ],
                [
                    "13:15 10. Dec"
                ],
                [
                    "13:30 10. Dec"
                ],
                [
                    "13:45 10. Dec"
                ],
                [
                    "14:00 10. Dec"
                ],
                [
                    "14:15 10. Dec"
                ],
                [
                    "14:30 10. Dec"
                ],
                [
                    "14:45 10. Dec"
                ],
                [
                    "15:00 10. Dec"
                ],
                [
                    "15:15 10. Dec"
                ],
                [
                    "15:30 10. Dec"
                ],
                [
                    "15:45 10. Dec"
                ],
                [
                    "16:00 10. Dec"
                ],
                [
                    "16:15 10. Dec"
                ],
                [
                    "16:30 10. Dec"
                ],
                [
                    "16:45 10. Dec"
                ],
                [
                    "17:00 10. Dec"
                ],
                [
                    "17:15 10. Dec"
                ],
                [
                    "17:30 10. Dec"
                ],
                [
                    "17:45 10. Dec"
                ],
                [
                    "18:00 10. Dec"
                ],
                [
                    "18:15 10. Dec"
                ],
                [
                    "18:30 10. Dec"
                ],
                [
                    "18:45 10. Dec"
                ],
                [
                    "19:00 10. Dec"
                ],
                [
                    "19:15 10. Dec"
                ],
                [
                    "19:30 10. Dec"
                ],
                [
                    "19:45 10. Dec"
                ],
                [
                    "20:00 10. Dec"
                ],
                [
                    "20:15 10. Dec"
                ],
                [
                    "20:30 10. Dec"
                ],
                [
                    "20:45 10. Dec"
                ],
                [
                    "21:00 10. Dec"
                ],
                [
                    "21:15 10. Dec"
                ],
                [
                    "21:30 10. Dec"
                ],
                [
                    "21:45 10. Dec"
                ],
                [
                    "22:00 10. Dec"
                ],
                [
                    "22:15 10. Dec"
                ],
                [
                    "22:30 10. Dec"
                ],
                [
                    "22:45 10. Dec"
                ],
                [
                    "23:00 10. Dec"
                ],
                [
                    "23:15 10. Dec"
                ],
                [
                    "23:30 10. Dec"
                ],
                [
                    "23:45 10. Dec"
                ],
                [
                    "00:00 11. Dec"
                ],
                [
                    "00:15 11. Dec"
                ],
                [
                    "00:30 11. Dec"
                ],
                [
                    "00:45 11. Dec"
                ],
                [
                    "01:00 11. Dec"
                ],
                [
                    "01:15 11. Dec"
                ],
                [
                    "01:30 11. Dec"
                ],
                [
                    "01:45 11. Dec"
                ],
                [
                    "02:00 11. Dec"
                ],
                [
                    "02:15 11. Dec"
                ],
                [
                    "02:30 11. Dec"
                ],
                [
                    "02:45 11. Dec"
                ],
                [
                    "03:00 11. Dec"
                ],
                [
                    "03:15 11. Dec"
                ],
                [
                    "03:30 11. Dec"
                ],
                [
                    "03:45 11. Dec"
                ],
                [
                    "04:00 11. Dec"
                ],
                [
                    "04:15 11. Dec"
                ],
                [
                    "04:30 11. Dec"
                ],
                [
                    "04:45 11. Dec"
                ],
                [
                    "05:00 11. Dec"
                ],
                [
                    "05:15 11. Dec"
                ],
                [
                    "05:30 11. Dec"
                ],
                [
                    "05:45 11. Dec"
                ],
                [
                    "06:00 11. Dec"
                ],
                [
                    "06:15 11. Dec"
                ],
                [
                    "06:30 11. Dec"
                ],
                [
                    "06:45 11. Dec"
                ],
                [
                    "07:00 11. Dec"
                ],
                [
                    "07:15 11. Dec"
                ],
                [
                    "07:30 11. Dec"
                ],
                [
                    "07:45 11. Dec"
                ],
                [
                    "08:00 11. Dec"
                ],
                [
                    "08:15 11. Dec"
                ],
                [
                    "08:30 11. Dec"
                ],
                [
                    "08:45 11. Dec"
                ],
                [
                    "09:00 11. Dec"
                ],
                [
                    "09:15 11. Dec"
                ],
                [
                    "09:30 11. Dec"
                ],
                [
                    "09:45 11. Dec"
                ],
                [
                    "10:00 11. Dec"
                ],
                [
                    "10:15 11. Dec"
                ],
                [
                    "10:30 11. Dec"
                ],
                [
                    "10:45 11. Dec"
                ],
                [
                    "11:00 11. Dec"
                ],
                [
                    "11:15 11. Dec"
                ],
                [
                    "11:30 11. Dec"
                ],
                [
                    "11:45 11. Dec"
                ],
                [
                    "12:00 11. Dec"
                ],
                [
                    "12:15 11. Dec"
                ],
                [
                    "12:30 11. Dec"
                ],
                [
                    "12:45 11. Dec"
                ],
                [
                    "13:00 11. Dec"
                ],
                [
                    "13:15 11. Dec"
                ],
                [
                    "13:30 11. Dec"
                ],
                [
                    "13:45 11. Dec"
                ],
                [
                    "14:00 11. Dec"
                ],
                [
                    "14:15 11. Dec"
                ],
                [
                    "14:30 11. Dec"
                ],
                [
                    "14:45 11. Dec"
                ],
                [
                    "15:00 11. Dec"
                ],
                [
                    "15:15 11. Dec"
                ],
                [
                    "15:30 11. Dec"
                ],
                [
                    "15:45 11. Dec"
                ],
                [
                    "16:00 11. Dec"
                ],
                [
                    "16:15 11. Dec"
                ],
                [
                    "16:30 11. Dec"
                ],
                [
                    "16:45 11. Dec"
                ],
                [
                    "17:00 11. Dec"
                ],
                [
                    "17:15 11. Dec"
                ],
                [
                    "17:30 11. Dec"
                ],
                [
                    "17:45 11. Dec"
                ],
                [
                    "18:00 11. Dec"
                ],
                [
                    "18:15 11. Dec"
                ],
                [
                    "18:30 11. Dec"
                ],
                [
                    "18:45 11. Dec"
                ],
                [
                    "19:00 11. Dec"
                ],
                [
                    "19:15 11. Dec"
                ],
                [
                    "19:30 11. Dec"
                ],
                [
                    "19:45 11. Dec"
                ],
                [
                    "20:00 11. Dec"
                ],
                [
                    "20:15 11. Dec"
                ],
                [
                    "20:30 11. Dec"
                ],
                [
                    "20:45 11. Dec"
                ],
                [
                    "21:00 11. Dec"
                ],
                [
                    "21:15 11. Dec"
                ],
                [
                    "21:30 11. Dec"
                ],
                [
                    "21:45 11. Dec"
                ],
                [
                    "22:00 11. Dec"
                ],
                [
                    "22:15 11. Dec"
                ],
                [
                    "22:30 11. Dec"
                ],
                [
                    "22:45 11. Dec"
                ],
                [
                    "23:00 11. Dec"
                ],
                [
                    "23:15 11. Dec"
                ],
                [
                    "23:30 11. Dec"
                ],
                [
                    "23:45 11. Dec"
                ],
                [
                    "00:00 09. Dec"
                ],
                [
                    "00:15 09. Dec"
                ],
                [
                    "00:30 09. Dec"
                ],
                [
                    "00:45 09. Dec"
                ],
                [
                    "01:00 09. Dec"
                ],
                [
                    "01:15 09. Dec"
                ],
                [
                    "01:30 09. Dec"
                ],
                [
                    "01:45 09. Dec"
                ],
                [
                    "02:00 09. Dec"
                ],
                [
                    "02:15 09. Dec"
                ],
                [
                    "02:30 09. Dec"
                ],
                [
                    "02:45 09. Dec"
                ],
                [
                    "03:00 09. Dec"
                ],
                [
                    "03:15 09. Dec"
                ],
                [
                    "03:30 09. Dec"
                ],
                [
                    "03:45 09. Dec"
                ],
                [
                    "04:00 09. Dec"
                ],
                [
                    "04:15 09. Dec"
                ],
                [
                    "04:30 09. Dec"
                ],
                [
                    "04:45 09. Dec"
                ],
                [
                    "05:00 09. Dec"
                ],
                [
                    "05:15 09. Dec"
                ],
                [
                    "05:30 09. Dec"
                ],
                [
                    "05:45 09. Dec"
                ],
                [
                    "06:00 09. Dec"
                ],
                [
                    "06:15 09. Dec"
                ],
                [
                    "06:30 09. Dec"
                ],
                [
                    "06:45 09. Dec"
                ],
                [
                    "07:00 09. Dec"
                ],
                [
                    "07:15 09. Dec"
                ],
                [
                    "07:30 09. Dec"
                ],
                [
                    "07:45 09. Dec"
                ],
                [
                    "08:00 09. Dec"
                ],
                [
                    "08:15 09. Dec"
                ],
                [
                    "08:30 09. Dec"
                ],
                [
                    "08:45 09. Dec"
                ],
                [
                    "09:00 09. Dec"
                ],
                [
                    "09:15 09. Dec"
                ],
                [
                    "09:30 09. Dec"
                ],
                [
                    "09:45 09. Dec"
                ],
                [
                    "10:00 09. Dec"
                ],
                [
                    "10:15 09. Dec"
                ],
                [
                    "10:30 09. Dec"
                ],
                [
                    "10:45 09. Dec"
                ],
                [
                    "11:00 09. Dec"
                ],
                [
                    "11:15 09. Dec"
                ],
                [
                    "11:30 09. Dec"
                ],
                [
                    "11:45 09. Dec"
                ],
                [
                    "12:00 09. Dec"
                ],
                [
                    "12:15 09. Dec"
                ],
                [
                    "12:30 09. Dec"
                ],
                [
                    "12:45 09. Dec"
                ],
                [
                    "13:00 09. Dec"
                ],
                [
                    "13:15 09. Dec"
                ],
                [
                    "13:30 09. Dec"
                ],
                [
                    "13:45 09. Dec"
                ],
                [
                    "14:00 09. Dec"
                ],
                [
                    "14:15 09. Dec"
                ],
                [
                    "14:30 09. Dec"
                ],
                [
                    "14:45 09. Dec"
                ],
                [
                    "15:00 09. Dec"
                ],
                [
                    "15:15 09. Dec"
                ],
                [
                    "15:30 09. Dec"
                ],
                [
                    "15:45 09. Dec"
                ],
                [
                    "16:00 09. Dec"
                ],
                [
                    "16:15 09. Dec"
                ],
                [
                    "16:30 09. Dec"
                ],
                [
                    "16:45 09. Dec"
                ],
                [
                    "17:00 09. Dec"
                ],
                [
                    "17:15 09. Dec"
                ],
                [
                    "17:30 09. Dec"
                ],
                [
                    "17:45 09. Dec"
                ],
                [
                    "18:00 09. Dec"
                ],
                [
                    "18:15 09. Dec"
                ],
                [
                    "18:30 09. Dec"
                ],
                [
                    "18:45 09. Dec"
                ],
                [
                    "19:00 09. Dec"
                ],
                [
                    "19:15 09. Dec"
                ],
                [
                    "19:30 09. Dec"
                ],
                [
                    "19:45 09. Dec"
                ],
                [
                    "20:00 09. Dec"
                ],
                [
                    "20:15 09. Dec"
                ],
                [
                    "20:30 09. Dec"
                ],
                [
                    "20:45 09. Dec"
                ],
                [
                    "21:00 09. Dec"
                ],
                [
                    "21:15 09. Dec"
                ],
                [
                    "21:30 09. Dec"
                ],
                [
                    "21:45 09. Dec"
                ],
                [
                    "22:00 09. Dec"
                ],
                [
                    "22:15 09. Dec"
                ],
                [
                    "22:30 09. Dec"
                ],
                [
                    "22:45 09. Dec"
                ],
                [
                    "23:00 09. Dec"
                ],
                [
                    "23:15 09. Dec"
                ],
                [
                    "23:30 09. Dec"
                ],
                [
                    "23:45 09. Dec"
                ],
                [
                    "00:00 10. Dec"
                ],
                [
                    "00:15 10. Dec"
                ],
                [
                    "00:30 10. Dec"
                ],
                [
                    "00:45 10. Dec"
                ],
                [
                    "01:00 10. Dec"
                ],
                [
                    "01:15 10. Dec"
                ],
                [
                    "01:30 10. Dec"
                ],
                [
                    "01:45 10. Dec"
                ],
                [
                    "02:00 10. Dec"
                ],
                [
                    "02:15 10. Dec"
                ],
                [
                    "02:30 10. Dec"
                ],
                [
                    "02:45 10. Dec"
                ],
                [
                    "03:00 10. Dec"
                ],
                [
                    "03:15 10. Dec"
                ],
                [
                    "03:30 10. Dec"
                ],
                [
                    "03:45 10. Dec"
                ],
                [
                    "04:00 10. Dec"
                ],
                [
                    "04:15 10. Dec"
                ],
                [
                    "04:30 10. Dec"
                ],
                [
                    "04:45 10. Dec"
                ],
                [
                    "05:00 10. Dec"
                ],
                [
                    "05:15 10. Dec"
                ],
                [
                    "05:30 10. Dec"
                ],
                [
                    "05:45 10. Dec"
                ],
                [
                    "06:00 10. Dec"
                ],
                [
                    "06:15 10. Dec"
                ],
                [
                    "06:30 10. Dec"
                ],
                [
                    "06:45 10. Dec"
                ],
                [
                    "07:00 10. Dec"
                ],
                [
                    "07:15 10. Dec"
                ],
                [
                    "07:30 10. Dec"
                ],
                [
                    "07:45 10. Dec"
                ],
                [
                    "08:00 10. Dec"
                ],
                [
                    "08:15 10. Dec"
                ],
                [
                    "08:30 10. Dec"
                ],
                [
                    "08:45 10. Dec"
                ],
                [
                    "09:00 10. Dec"
                ],
                [
                    "09:15 10. Dec"
                ],
                [
                    "09:30 10. Dec"
                ],
                [
                    "09:45 10. Dec"
                ],
                [
                    "10:00 10. Dec"
                ],
                [
                    "10:15 10. Dec"
                ],
                [
                    "10:30 10. Dec"
                ],
                [
                    "10:45 10. Dec"
                ],
                [
                    "11:00 10. Dec"
                ],
                [
                    "11:15 10. Dec"
                ],
                [
                    "11:30 10. Dec"
                ],
                [
                    "11:45 10. Dec"
                ],
                [
                    "12:00 10. Dec"
                ],
                [
                    "12:15 10. Dec"
                ],
                [
                    "12:30 10. Dec"
                ],
                [
                    "12:45 10. Dec"
                ],
                [
                    "13:00 10. Dec"
                ],
                [
                    "13:15 10. Dec"
                ],
                [
                    "13:30 10. Dec"
                ],
                [
                    "13:45 10. Dec"
                ],
                [
                    "14:00 10. Dec"
                ],
                [
                    "14:15 10. Dec"
                ],
                [
                    "14:30 10. Dec"
                ],
                [
                    "14:45 10. Dec"
                ],
                [
                    "15:00 10. Dec"
                ],
                [
                    "15:15 10. Dec"
                ],
                [
                    "15:30 10. Dec"
                ],
                [
                    "15:45 10. Dec"
                ],
                [
                    "16:00 10. Dec"
                ],
                [
                    "16:15 10. Dec"
                ],
                [
                    "16:30 10. Dec"
                ],
                [
                    "16:45 10. Dec"
                ],
                [
                    "17:00 10. Dec"
                ],
                [
                    "17:15 10. Dec"
                ],
                [
                    "17:30 10. Dec"
                ],
                [
                    "17:45 10. Dec"
                ],
                [
                    "18:00 10. Dec"
                ],
                [
                    "18:15 10. Dec"
                ],
                [
                    "18:30 10. Dec"
                ],
                [
                    "18:45 10. Dec"
                ],
                [
                    "19:00 10. Dec"
                ],
                [
                    "19:15 10. Dec"
                ],
                [
                    "19:30 10. Dec"
                ],
                [
                    "19:45 10. Dec"
                ],
                [
                    "20:00 10. Dec"
                ],
                [
                    "20:15 10. Dec"
                ],
                [
                    "20:30 10. Dec"
                ],
                [
                    "20:45 10. Dec"
                ],
                [
                    "21:00 10. Dec"
                ],
                [
                    "21:15 10. Dec"
                ],
                [
                    "21:30 10. Dec"
                ],
                [
                    "21:45 10. Dec"
                ],
                [
                    "22:00 10. Dec"
                ],
                [
                    "22:15 10. Dec"
                ],
                [
                    "22:30 10. Dec"
                ],
                [
                    "22:45 10. Dec"
                ],
                [
                    "23:00 10. Dec"
                ],
                [
                    "23:15 10. Dec"
                ],
                [
                    "23:30 10. Dec"
                ],
                [
                    "23:45 10. Dec"
                ],
                [
                    "00:00 11. Dec"
                ],
                [
                    "00:15 11. Dec"
                ],
                [
                    "00:30 11. Dec"
                ],
                [
                    "00:45 11. Dec"
                ],
                [
                    "01:00 11. Dec"
                ],
                [
                    "01:15 11. Dec"
                ],
                [
                    "01:30 11. Dec"
                ],
                [
                    "01:45 11. Dec"
                ],
                [
                    "02:00 11. Dec"
                ],
                [
                    "02:15 11. Dec"
                ],
                [
                    "02:30 11. Dec"
                ],
                [
                    "02:45 11. Dec"
                ],
                [
                    "03:00 11. Dec"
                ],
                [
                    "03:15 11. Dec"
                ],
                [
                    "03:30 11. Dec"
                ],
                [
                    "03:45 11. Dec"
                ],
                [
                    "04:00 11. Dec"
                ],
                [
                    "04:15 11. Dec"
                ],
                [
                    "04:30 11. Dec"
                ],
                [
                    "04:45 11. Dec"
                ],
                [
                    "05:00 11. Dec"
                ],
                [
                    "05:15 11. Dec"
                ],
                [
                    "05:30 11. Dec"
                ],
                [
                    "05:45 11. Dec"
                ],
                [
                    "06:00 11. Dec"
                ],
                [
                    "06:15 11. Dec"
                ],
                [
                    "06:30 11. Dec"
                ],
                [
                    "06:45 11. Dec"
                ],
                [
                    "07:00 11. Dec"
                ],
                [
                    "07:15 11. Dec"
                ],
                [
                    "07:30 11. Dec"
                ],
                [
                    "07:45 11. Dec"
                ],
                [
                    "08:00 11. Dec"
                ],
                [
                    "08:15 11. Dec"
                ],
                [
                    "08:30 11. Dec"
                ],
                [
                    "08:45 11. Dec"
                ],
                [
                    "09:00 11. Dec"
                ],
                [
                    "09:15 11. Dec"
                ],
                [
                    "09:30 11. Dec"
                ],
                [
                    "09:45 11. Dec"
                ],
                [
                    "10:00 11. Dec"
                ],
                [
                    "10:15 11. Dec"
                ],
                [
                    "10:30 11. Dec"
                ],
                [
                    "10:45 11. Dec"
                ],
                [
                    "11:00 11. Dec"
                ],
                [
                    "11:15 11. Dec"
                ],
                [
                    "11:30 11. Dec"
                ],
                [
                    "11:45 11. Dec"
                ],
                [
                    "12:00 11. Dec"
                ],
                [
                    "12:15 11. Dec"
                ],
                [
                    "12:30 11. Dec"
                ],
                [
                    "12:45 11. Dec"
                ],
                [
                    "13:00 11. Dec"
                ],
                [
                    "13:15 11. Dec"
                ],
                [
                    "13:30 11. Dec"
                ],
                [
                    "13:45 11. Dec"
                ],
                [
                    "14:00 11. Dec"
                ],
                [
                    "14:15 11. Dec"
                ],
                [
                    "14:30 11. Dec"
                ],
                [
                    "14:45 11. Dec"
                ],
                [
                    "15:00 11. Dec"
                ],
                [
                    "15:15 11. Dec"
                ],
                [
                    "15:30 11. Dec"
                ],
                [
                    "15:45 11. Dec"
                ],
                [
                    "16:00 11. Dec"
                ],
                [
                    "16:15 11. Dec"
                ],
                [
                    "16:30 11. Dec"
                ],
                [
                    "16:45 11. Dec"
                ],
                [
                    "17:00 11. Dec"
                ],
                [
                    "17:15 11. Dec"
                ],
                [
                    "17:30 11. Dec"
                ],
                [
                    "17:45 11. Dec"
                ],
                [
                    "18:00 11. Dec"
                ],
                [
                    "18:15 11. Dec"
                ],
                [
                    "18:30 11. Dec"
                ],
                [
                    "18:45 11. Dec"
                ],
                [
                    "19:00 11. Dec"
                ],
                [
                    "19:15 11. Dec"
                ],
                [
                    "19:30 11. Dec"
                ],
                [
                    "19:45 11. Dec"
                ],
                [
                    "20:00 11. Dec"
                ],
                [
                    "20:15 11. Dec"
                ],
                [
                    "20:30 11. Dec"
                ],
                [
                    "20:45 11. Dec"
                ],
                [
                    "21:00 11. Dec"
                ],
                [
                    "21:15 11. Dec"
                ],
                [
                    "21:30 11. Dec"
                ],
                [
                    "21:45 11. Dec"
                ],
                [
                    "22:00 11. Dec"
                ],
                [
                    "22:15 11. Dec"
                ],
                [
                    "22:30 11. Dec"
                ],
                [
                    "22:45 11. Dec"
                ],
                [
                    "23:00 11. Dec"
                ],
                [
                    "23:15 11. Dec"
                ],
                [
                    "23:30 11. Dec"
                ],
                [
                    "23:45 11. Dec"
                ],
                [
                    "00:00 09. Dec"
                ],
                [
                    "00:15 09. Dec"
                ],
                [
                    "00:30 09. Dec"
                ],
                [
                    "00:45 09. Dec"
                ],
                [
                    "01:00 09. Dec"
                ],
                [
                    "01:15 09. Dec"
                ],
                [
                    "01:30 09. Dec"
                ],
                [
                    "01:45 09. Dec"
                ],
                [
                    "02:00 09. Dec"
                ],
                [
                    "02:15 09. Dec"
                ],
                [
                    "02:30 09. Dec"
                ],
                [
                    "02:45 09. Dec"
                ],
                [
                    "03:00 09. Dec"
                ],
                [
                    "03:15 09. Dec"
                ],
                [
                    "03:30 09. Dec"
                ],
                [
                    "03:45 09. Dec"
                ],
                [
                    "04:00 09. Dec"
                ],
                [
                    "04:15 09. Dec"
                ],
                [
                    "04:30 09. Dec"
                ],
                [
                    "04:45 09. Dec"
                ],
                [
                    "05:00 09. Dec"
                ],
                [
                    "05:15 09. Dec"
                ],
                [
                    "05:30 09. Dec"
                ],
                [
                    "05:45 09. Dec"
                ],
                [
                    "06:00 09. Dec"
                ],
                [
                    "06:15 09. Dec"
                ],
                [
                    "06:30 09. Dec"
                ],
                [
                    "06:45 09. Dec"
                ],
                [
                    "07:00 09. Dec"
                ],
                [
                    "07:15 09. Dec"
                ],
                [
                    "07:30 09. Dec"
                ],
                [
                    "07:45 09. Dec"
                ],
                [
                    "08:00 09. Dec"
                ],
                [
                    "08:15 09. Dec"
                ],
                [
                    "08:30 09. Dec"
                ],
                [
                    "08:45 09. Dec"
                ],
                [
                    "09:00 09. Dec"
                ],
                [
                    "09:15 09. Dec"
                ],
                [
                    "09:30 09. Dec"
                ],
                [
                    "09:45 09. Dec"
                ],
                [
                    "10:00 09. Dec"
                ],
                [
                    "10:15 09. Dec"
                ],
                [
                    "10:30 09. Dec"
                ],
                [
                    "10:45 09. Dec"
                ],
                [
                    "11:00 09. Dec"
                ],
                [
                    "11:15 09. Dec"
                ],
                [
                    "11:30 09. Dec"
                ],
                [
                    "11:45 09. Dec"
                ],
                [
                    "12:00 09. Dec"
                ],
                [
                    "12:15 09. Dec"
                ],
                [
                    "12:30 09. Dec"
                ],
                [
                    "12:45 09. Dec"
                ],
                [
                    "13:00 09. Dec"
                ],
                [
                    "13:15 09. Dec"
                ],
                [
                    "13:30 09. Dec"
                ],
                [
                    "13:45 09. Dec"
                ],
                [
                    "14:00 09. Dec"
                ],
                [
                    "14:15 09. Dec"
                ],
                [
                    "14:30 09. Dec"
                ],
                [
                    "14:45 09. Dec"
                ],
                [
                    "15:00 09. Dec"
                ],
                [
                    "15:15 09. Dec"
                ],
                [
                    "15:30 09. Dec"
                ],
                [
                    "15:45 09. Dec"
                ],
                [
                    "16:00 09. Dec"
                ],
                [
                    "16:15 09. Dec"
                ],
                [
                    "16:30 09. Dec"
                ],
                [
                    "16:45 09. Dec"
                ],
                [
                    "17:00 09. Dec"
                ],
                [
                    "17:15 09. Dec"
                ],
                [
                    "17:30 09. Dec"
                ],
                [
                    "17:45 09. Dec"
                ],
                [
                    "18:00 09. Dec"
                ],
                [
                    "18:15 09. Dec"
                ],
                [
                    "18:30 09. Dec"
                ],
                [
                    "18:45 09. Dec"
                ],
                [
                    "19:00 09. Dec"
                ],
                [
                    "19:15 09. Dec"
                ],
                [
                    "19:30 09. Dec"
                ],
                [
                    "19:45 09. Dec"
                ],
                [
                    "20:00 09. Dec"
                ],
                [
                    "20:15 09. Dec"
                ],
                [
                    "20:30 09. Dec"
                ],
                [
                    "20:45 09. Dec"
                ],
                [
                    "21:00 09. Dec"
                ],
                [
                    "21:15 09. Dec"
                ],
                [
                    "21:30 09. Dec"
                ],
                [
                    "21:45 09. Dec"
                ],
                [
                    "22:00 09. Dec"
                ],
                [
                    "22:15 09. Dec"
                ],
                [
                    "22:30 09. Dec"
                ],
                [
                    "22:45 09. Dec"
                ],
                [
                    "23:00 09. Dec"
                ],
                [
                    "23:15 09. Dec"
                ],
                [
                    "23:30 09. Dec"
                ],
                [
                    "23:45 09. Dec"
                ],
                [
                    "00:00 10. Dec"
                ],
                [
                    "00:15 10. Dec"
                ],
                [
                    "00:30 10. Dec"
                ],
                [
                    "00:45 10. Dec"
                ],
                [
                    "01:00 10. Dec"
                ],
                [
                    "01:15 10. Dec"
                ],
                [
                    "01:30 10. Dec"
                ],
                [
                    "01:45 10. Dec"
                ],
                [
                    "02:00 10. Dec"
                ],
                [
                    "02:15 10. Dec"
                ],
                [
                    "02:30 10. Dec"
                ],
                [
                    "02:45 10. Dec"
                ],
                [
                    "03:00 10. Dec"
                ],
                [
                    "03:15 10. Dec"
                ],
                [
                    "03:30 10. Dec"
                ],
                [
                    "03:45 10. Dec"
                ],
                [
                    "04:00 10. Dec"
                ],
                [
                    "04:15 10. Dec"
                ],
                [
                    "04:30 10. Dec"
                ],
                [
                    "04:45 10. Dec"
                ],
                [
                    "05:00 10. Dec"
                ],
                [
                    "05:15 10. Dec"
                ],
                [
                    "05:30 10. Dec"
                ],
                [
                    "05:45 10. Dec"
                ],
                [
                    "06:00 10. Dec"
                ],
                [
                    "06:15 10. Dec"
                ],
                [
                    "06:30 10. Dec"
                ],
                [
                    "06:45 10. Dec"
                ],
                [
                    "07:00 10. Dec"
                ],
                [
                    "07:15 10. Dec"
                ],
                [
                    "07:30 10. Dec"
                ],
                [
                    "07:45 10. Dec"
                ],
                [
                    "08:00 10. Dec"
                ],
                [
                    "08:15 10. Dec"
                ],
                [
                    "08:30 10. Dec"
                ],
                [
                    "08:45 10. Dec"
                ],
                [
                    "09:00 10. Dec"
                ],
                [
                    "09:15 10. Dec"
                ],
                [
                    "09:30 10. Dec"
                ],
                [
                    "09:45 10. Dec"
                ],
                [
                    "10:00 10. Dec"
                ],
                [
                    "10:15 10. Dec"
                ],
                [
                    "10:30 10. Dec"
                ],
                [
                    "10:45 10. Dec"
                ],
                [
                    "11:00 10. Dec"
                ],
                [
                    "11:15 10. Dec"
                ],
                [
                    "11:30 10. Dec"
                ],
                [
                    "11:45 10. Dec"
                ],
                [
                    "12:00 10. Dec"
                ],
                [
                    "12:15 10. Dec"
                ],
                [
                    "12:30 10. Dec"
                ],
                [
                    "12:45 10. Dec"
                ],
                [
                    "13:00 10. Dec"
                ],
                [
                    "13:15 10. Dec"
                ],
                [
                    "13:30 10. Dec"
                ],
                [
                    "13:45 10. Dec"
                ],
                [
                    "14:00 10. Dec"
                ],
                [
                    "14:15 10. Dec"
                ],
                [
                    "14:30 10. Dec"
                ],
                [
                    "14:45 10. Dec"
                ],
                [
                    "15:00 10. Dec"
                ],
                [
                    "15:15 10. Dec"
                ],
                [
                    "15:30 10. Dec"
                ],
                [
                    "15:45 10. Dec"
                ],
                [
                    "16:00 10. Dec"
                ],
                [
                    "16:15 10. Dec"
                ],
                [
                    "16:30 10. Dec"
                ],
                [
                    "16:45 10. Dec"
                ],
                [
                    "17:00 10. Dec"
                ],
                [
                    "17:15 10. Dec"
                ],
                [
                    "17:30 10. Dec"
                ],
                [
                    "17:45 10. Dec"
                ],
                [
                    "18:00 10. Dec"
                ],
                [
                    "18:15 10. Dec"
                ],
                [
                    "18:30 10. Dec"
                ],
                [
                    "18:45 10. Dec"
                ],
                [
                    "19:00 10. Dec"
                ],
                [
                    "19:15 10. Dec"
                ],
                [
                    "19:30 10. Dec"
                ],
                [
                    "19:45 10. Dec"
                ],
                [
                    "20:00 10. Dec"
                ],
                [
                    "20:15 10. Dec"
                ],
                [
                    "20:30 10. Dec"
                ],
                [
                    "20:45 10. Dec"
                ],
                [
                    "21:00 10. Dec"
                ],
                [
                    "21:15 10. Dec"
                ],
                [
                    "21:30 10. Dec"
                ],
                [
                    "21:45 10. Dec"
                ],
                [
                    "22:00 10. Dec"
                ],
                [
                    "22:15 10. Dec"
                ],
                [
                    "22:30 10. Dec"
                ],
                [
                    "22:45 10. Dec"
                ],
                [
                    "23:00 10. Dec"
                ],
                [
                    "23:15 10. Dec"
                ],
                [
                    "23:30 10. Dec"
                ],
                [
                    "23:45 10. Dec"
                ],
                [
                    "00:00 11. Dec"
                ],
                [
                    "00:15 11. Dec"
                ],
                [
                    "00:30 11. Dec"
                ],
                [
                    "00:45 11. Dec"
                ],
                [
                    "01:00 11. Dec"
                ],
                [
                    "01:15 11. Dec"
                ],
                [
                    "01:30 11. Dec"
                ],
                [
                    "01:45 11. Dec"
                ],
                [
                    "02:00 11. Dec"
                ],
                [
                    "02:15 11. Dec"
                ],
                [
                    "02:30 11. Dec"
                ],
                [
                    "02:45 11. Dec"
                ],
                [
                    "03:00 11. Dec"
                ],
                [
                    "03:15 11. Dec"
                ],
                [
                    "03:30 11. Dec"
                ],
                [
                    "03:45 11. Dec"
                ],
                [
                    "04:00 11. Dec"
                ],
                [
                    "04:15 11. Dec"
                ],
                [
                    "04:30 11. Dec"
                ],
                [
                    "04:45 11. Dec"
                ],
                [
                    "05:00 11. Dec"
                ],
                [
                    "05:15 11. Dec"
                ],
                [
                    "05:30 11. Dec"
                ],
                [
                    "05:45 11. Dec"
                ],
                [
                    "06:00 11. Dec"
                ],
                [
                    "06:15 11. Dec"
                ],
                [
                    "06:30 11. Dec"
                ],
                [
                    "06:45 11. Dec"
                ],
                [
                    "07:00 11. Dec"
                ],
                [
                    "07:15 11. Dec"
                ],
                [
                    "07:30 11. Dec"
                ],
                [
                    "07:45 11. Dec"
                ],
                [
                    "08:00 11. Dec"
                ],
                [
                    "08:15 11. Dec"
                ],
                [
                    "08:30 11. Dec"
                ],
                [
                    "08:45 11. Dec"
                ],
                [
                    "09:00 11. Dec"
                ],
                [
                    "09:15 11. Dec"
                ],
                [
                    "09:30 11. Dec"
                ],
                [
                    "09:45 11. Dec"
                ],
                [
                    "10:00 11. Dec"
                ],
                [
                    "10:15 11. Dec"
                ],
                [
                    "10:30 11. Dec"
                ],
                [
                    "10:45 11. Dec"
                ],
                [
                    "11:00 11. Dec"
                ],
                [
                    "11:15 11. Dec"
                ],
                [
                    "11:30 11. Dec"
                ],
                [
                    "11:45 11. Dec"
                ],
                [
                    "12:00 11. Dec"
                ],
                [
                    "12:15 11. Dec"
                ],
                [
                    "12:30 11. Dec"
                ],
                [
                    "12:45 11. Dec"
                ],
                [
                    "13:00 11. Dec"
                ],
                [
                    "13:15 11. Dec"
                ],
                [
                    "13:30 11. Dec"
                ],
                [
                    "13:45 11. Dec"
                ],
                [
                    "14:00 11. Dec"
                ],
                [
                    "14:15 11. Dec"
                ],
                [
                    "14:30 11. Dec"
                ],
                [
                    "14:45 11. Dec"
                ],
                [
                    "15:00 11. Dec"
                ],
                [
                    "15:15 11. Dec"
                ],
                [
                    "15:30 11. Dec"
                ],
                [
                    "15:45 11. Dec"
                ],
                [
                    "16:00 11. Dec"
                ],
                [
                    "16:15 11. Dec"
                ],
                [
                    "16:30 11. Dec"
                ],
                [
                    "16:45 11. Dec"
                ],
                [
                    "17:00 11. Dec"
                ],
                [
                    "17:15 11. Dec"
                ],
                [
                    "17:30 11. Dec"
                ],
                [
                    "17:45 11. Dec"
                ],
                [
                    "18:00 11. Dec"
                ],
                [
                    "18:15 11. Dec"
                ],
                [
                    "18:30 11. Dec"
                ],
                [
                    "18:45 11. Dec"
                ],
                [
                    "19:00 11. Dec"
                ],
                [
                    "19:15 11. Dec"
                ],
                [
                    "19:30 11. Dec"
                ],
                [
                    "19:45 11. Dec"
                ],
                [
                    "20:00 11. Dec"
                ],
                [
                    "20:15 11. Dec"
                ],
                [
                    "20:30 11. Dec"
                ],
                [
                    "20:45 11. Dec"
                ],
                [
                    "21:00 11. Dec"
                ],
                [
                    "21:15 11. Dec"
                ],
                [
                    "21:30 11. Dec"
                ],
                [
                    "21:45 11. Dec"
                ],
                [
                    "22:00 11. Dec"
                ],
                [
                    "22:15 11. Dec"
                ],
                [
                    "22:30 11. Dec"
                ],
                [
                    "22:45 11. Dec"
                ],
                [
                    "23:00 11. Dec"
                ],
                [
                    "23:15 11. Dec"
                ],
                [
                    "23:30 11. Dec"
                ],
                [
                    "23:45 11. Dec"
                ]
            ],
            "crosshair": true,
            labels: {
                formatter: function () {
                    var label = this.axis.defaultLabelFormatter.call(this);
                    var data_send_time = 3;
                    if (data_send_time < 4) {
                        let hour = label.slice(0, 5)
                        label = label.slice(5, label.length)
                        return `<span>${hour}</span><br> <span>${label}</span>`;
                    } else {
                        return label;
                    }
                }
            },
            "index": 0,
            "isX": true
        },
        {
            "title": {
                "text": "Data",
                "enabled": false
            },
            "tickInterval": 1,
            "opposite": true,
            "visible": false,
            "index": 1,
            "isX": true
        }
    ],

    yAxis: [
        {
            "min": 0,
            "title": {
                "text": "kW",
                "enabled": true
            },
            "lineWidth": 1,
            "gridLineWidth": 1,
            "labels": {
                "enabled": true
            },
            "index": 0
        },
        {
            "title": {
                "text": "Watts/meter²",
                "enabled": true
            },
            "lineWidth": 1,
            "gridLineWidth": 1,
            "min": 0,
            "opposite": true,
            "labels": {
                "enabled": true
            },
            "index": 1
        }
    ],
    plotOptions: {
        series: {
            "turboThreshold": 5000
        },
        column: {
            "stacking": "normal"
        }
    },


    credits: {
        enabled: false
    },
    exporting: {
        enabled: false
    },

    tooltip: {
        "shared": true
    },
    navigation: {
        "buttonOptions": {
            "enabled": true
        }
    },

    "series": [
        {
            "name": "Power ",
            "data": [
                [
                    "12/06/2023 00:00",
                    0
                ],
                [
                    "12/06/2023 00:15",
                    0
                ],
                [
                    "12/06/2023 00:30",
                    0
                ],
                [
                    "12/06/2023 00:45",
                    0
                ],
                [
                    "12/06/2023 01:00",
                    0
                ],
                [
                    "12/06/2023 01:15",
                    0
                ],
                [
                    "12/06/2023 01:30",
                    0
                ],
                [
                    "12/06/2023 01:45",
                    0
                ],
                [
                    "12/06/2023 02:00",
                    0
                ],
                [
                    "12/06/2023 02:15",
                    0
                ],
                [
                    "12/06/2023 02:30",
                    0
                ],
                [
                    "12/06/2023 02:45",
                    0
                ],
                [
                    "12/06/2023 03:00",
                    0
                ],
                [
                    "12/06/2023 03:15",
                    0
                ],
                [
                    "12/06/2023 03:30",
                    0
                ],
                [
                    "12/06/2023 03:45",
                    0
                ],
                [
                    "12/06/2023 04:00",
                    0
                ],
                [
                    "12/06/2023 04:15",
                    0
                ],
                [
                    "12/06/2023 04:30",
                    0
                ],
                [
                    "12/06/2023 04:45",
                    0
                ],
                [
                    "12/06/2023 05:00",
                    0
                ],
                [
                    "12/06/2023 05:15",
                    0
                ],
                [
                    "12/06/2023 05:30",
                    0
                ],
                [
                    "12/06/2023 05:45",
                    0
                ],
                [
                    "12/06/2023 06:00",
                    0
                ],
                [
                    "12/06/2023 06:15",
                    0
                ],
                [
                    "12/06/2023 06:30",
                    0.2
                ],
                [
                    "12/06/2023 06:45",
                    3
                ],
                [
                    "12/06/2023 07:00",
                    9.2
                ],
                [
                    "12/06/2023 07:15",
                    21.3
                ],
                [
                    "12/06/2023 07:30",
                    35.4
                ],
                [
                    "12/06/2023 07:45",
                    52.1
                ],
                [
                    "12/06/2023 08:00",
                    81
                ],
                [
                    "12/06/2023 08:15",
                    117.3
                ],
                [
                    "12/06/2023 08:30",
                    149.8
                ],
                [
                    "12/06/2023 08:45",
                    178.1
                ],
                [
                    "12/06/2023 09:00",
                    204.6
                ],
                [
                    "12/06/2023 09:15",
                    228.4
                ],
                [
                    "12/06/2023 09:30",
                    245
                ],
                [
                    "12/06/2023 09:45",
                    265.7
                ],
                [
                    "12/06/2023 10:00",
                    280.9
                ],
                [
                    "12/06/2023 10:15",
                    292.5
                ],
                [
                    "12/06/2023 10:30",
                    302.5
                ],
                [
                    "12/06/2023 10:45",
                    311.5
                ],
                [
                    "12/06/2023 11:00",
                    318.4
                ],
                [
                    "12/06/2023 11:15",
                    320.5
                ],
                [
                    "12/06/2023 11:30",
                    323.5
                ],
                [
                    "12/06/2023 11:45",
                    322.9
                ],
                [
                    "12/06/2023 12:00",
                    321.2
                ],
                [
                    "12/06/2023 12:15",
                    318.4
                ],
                [
                    "12/06/2023 12:30",
                    316.3
                ],
                [
                    "12/06/2023 12:45",
                    307.3
                ],
                [
                    "12/06/2023 13:00",
                    295.2
                ],
                [
                    "12/06/2023 13:15",
                    281
                ],
                [
                    "12/06/2023 13:30",
                    262.1
                ],
                [
                    "12/06/2023 13:45",
                    242.9
                ],
                [
                    "12/06/2023 14:00",
                    218.3
                ],
                [
                    "12/06/2023 14:15",
                    203.3
                ],
                [
                    "12/06/2023 14:30",
                    179.2
                ],
                [
                    "12/06/2023 14:45",
                    150.8
                ],
                [
                    "12/06/2023 15:00",
                    112.5
                ],
                [
                    "12/06/2023 15:15",
                    75.5
                ],
                [
                    "12/06/2023 15:30",
                    53.1
                ],
                [
                    "12/06/2023 15:45",
                    35.8
                ],
                [
                    "12/06/2023 16:00",
                    20.1
                ],
                [
                    "12/06/2023 16:15",
                    8.7
                ],
                [
                    "12/06/2023 16:30",
                    2.8
                ],
                [
                    "12/06/2023 16:45",
                    0.1
                ],
                [
                    "12/06/2023 17:00",
                    0
                ],
                [
                    "12/06/2023 17:15",
                    0
                ],
                [
                    "12/06/2023 17:30",
                    0
                ],
                [
                    "12/06/2023 17:45",
                    0
                ],
                [
                    "12/06/2023 18:00",
                    0
                ],
                [
                    "12/06/2023 18:15",
                    0
                ],
                [
                    "12/06/2023 18:30",
                    0
                ],
                [
                    "12/06/2023 18:45",
                    0
                ],
                [
                    "12/06/2023 19:00",
                    0
                ],
                [
                    "12/06/2023 19:15",
                    0
                ],
                [
                    "12/06/2023 19:30",
                    0
                ],
                [
                    "12/06/2023 19:45",
                    0
                ],
                [
                    "12/06/2023 20:00",
                    0
                ],
                [
                    "12/06/2023 20:15",
                    0
                ],
                [
                    "12/06/2023 20:30",
                    0
                ],
                [
                    "12/06/2023 20:45",
                    0
                ],
                [
                    "12/06/2023 21:00",
                    0
                ],
                [
                    "12/06/2023 21:15",
                    0
                ],
                [
                    "12/06/2023 21:30",
                    0
                ],
                [
                    "12/06/2023 21:45",
                    0
                ],
                [
                    "12/06/2023 22:00",
                    0
                ],
                [
                    "12/06/2023 22:15",
                    0
                ],
                [
                    "12/06/2023 22:30",
                    0
                ],
                [
                    "12/06/2023 22:45",
                    0
                ],
                [
                    "12/06/2023 23:00",
                    0
                ],
                [
                    "12/06/2023 23:15",
                    0
                ],
                [
                    "12/06/2023 23:30",
                    0
                ],
                [
                    "12/06/2023 23:45",
                    0
                ],
                [
                    "12/07/2023 00:00",
                    0
                ],
                [
                    "12/07/2023 00:15",
                    0
                ],
                [
                    "12/07/2023 00:30",
                    0
                ],
                [
                    "12/07/2023 00:45",
                    0
                ],
                [
                    "12/07/2023 01:00",
                    0
                ],
                [
                    "12/07/2023 01:15",
                    0
                ],
                [
                    "12/07/2023 01:30",
                    0
                ],
                [
                    "12/07/2023 01:45",
                    0
                ],
                [
                    "12/07/2023 02:00",
                    0
                ],
                [
                    "12/07/2023 02:15",
                    0
                ],
                [
                    "12/07/2023 02:30",
                    0
                ],
                [
                    "12/07/2023 02:45",
                    0
                ],
                [
                    "12/07/2023 03:00",
                    0
                ],
                [
                    "12/07/2023 03:15",
                    0
                ],
                [
                    "12/07/2023 03:30",
                    0
                ],
                [
                    "12/07/2023 03:45",
                    0
                ],
                [
                    "12/07/2023 04:00",
                    0
                ],
                [
                    "12/07/2023 04:15",
                    0
                ],
                [
                    "12/07/2023 04:30",
                    0
                ],
                [
                    "12/07/2023 04:45",
                    0
                ],
                [
                    "12/07/2023 05:00",
                    0
                ],
                [
                    "12/07/2023 05:15",
                    0
                ],
                [
                    "12/07/2023 05:30",
                    0
                ],
                [
                    "12/07/2023 05:45",
                    0
                ],
                [
                    "12/07/2023 06:00",
                    0
                ],
                [
                    "12/07/2023 06:15",
                    0
                ],
                [
                    "12/07/2023 06:30",
                    0
                ],
                [
                    "12/07/2023 06:45",
                    2
                ],
                [
                    "12/07/2023 07:00",
                    8.8
                ],
                [
                    "12/07/2023 07:15",
                    15.4
                ],
                [
                    "12/07/2023 07:30",
                    25.8
                ],
                [
                    "12/07/2023 07:45",
                    38.5
                ],
                [
                    "12/07/2023 08:00",
                    52.3
                ],
                [
                    "12/07/2023 08:15",
                    59.9
                ],
                [
                    "12/07/2023 08:30",
                    120.5
                ],
                [
                    "12/07/2023 08:45",
                    134.3
                ],
                [
                    "12/07/2023 09:00",
                    202.8
                ],
                [
                    "12/07/2023 09:15",
                    192.5
                ],
                [
                    "12/07/2023 09:30",
                    129.5
                ],
                [
                    "12/07/2023 09:45",
                    239.4
                ],
                [
                    "12/07/2023 10:00",
                    173.4
                ],
                [
                    "12/07/2023 10:15",
                    119
                ],
                [
                    "12/07/2023 10:30",
                    115.3
                ],
                [
                    "12/07/2023 10:45",
                    179.4
                ],
                [
                    "12/07/2023 11:00",
                    318
                ],
                [
                    "12/07/2023 11:15",
                    86.3
                ],
                [
                    "12/07/2023 11:30",
                    260.5
                ],
                [
                    "12/07/2023 11:45",
                    150.4
                ],
                [
                    "12/07/2023 12:00",
                    259.3
                ],
                [
                    "12/07/2023 12:15",
                    260.1
                ],
                [
                    "12/07/2023 12:30",
                    301
                ],
                [
                    "12/07/2023 12:45",
                    320.3
                ],
                [
                    "12/07/2023 13:00",
                    304.2
                ],
                [
                    "12/07/2023 13:15",
                    289.6
                ],
                [
                    "12/07/2023 13:30",
                    253.1
                ],
                [
                    "12/07/2023 13:45",
                    159
                ],
                [
                    "12/07/2023 14:00",
                    200.4
                ],
                [
                    "12/07/2023 14:15",
                    225.8
                ],
                [
                    "12/07/2023 14:30",
                    190.9
                ],
                [
                    "12/07/2023 14:45",
                    118.6
                ],
                [
                    "12/07/2023 15:00",
                    87.7
                ],
                [
                    "12/07/2023 15:15",
                    80.1
                ],
                [
                    "12/07/2023 15:30",
                    50.6
                ],
                [
                    "12/07/2023 15:45",
                    34.7
                ],
                [
                    "12/07/2023 16:00",
                    20.2
                ],
                [
                    "12/07/2023 16:15",
                    10.1
                ],
                [
                    "12/07/2023 16:30",
                    3.3
                ],
                [
                    "12/07/2023 16:45",
                    0.1
                ],
                [
                    "12/07/2023 17:00",
                    0
                ],
                [
                    "12/07/2023 17:15",
                    0
                ],
                [
                    "12/07/2023 17:30",
                    0
                ],
                [
                    "12/07/2023 17:45",
                    0
                ],
                [
                    "12/07/2023 18:00",
                    0
                ],
                [
                    "12/07/2023 18:15",
                    0
                ],
                [
                    "12/07/2023 18:30",
                    0
                ],
                [
                    "12/07/2023 18:45",
                    0
                ],
                [
                    "12/07/2023 19:00",
                    0
                ],
                [
                    "12/07/2023 19:15",
                    0
                ],
                [
                    "12/07/2023 19:30",
                    0
                ],
                [
                    "12/07/2023 19:45",
                    0
                ],
                [
                    "12/07/2023 20:00",
                    0
                ],
                [
                    "12/07/2023 20:15",
                    0
                ],
                [
                    "12/07/2023 20:30",
                    0
                ],
                [
                    "12/07/2023 20:45",
                    0
                ],
                [
                    "12/07/2023 21:00",
                    0
                ],
                [
                    "12/07/2023 21:15",
                    0
                ],
                [
                    "12/07/2023 21:30",
                    0
                ],
                [
                    "12/07/2023 21:45",
                    0
                ],
                [
                    "12/07/2023 22:00",
                    0
                ],
                [
                    "12/07/2023 22:15",
                    0
                ],
                [
                    "12/07/2023 22:30",
                    0
                ],
                [
                    "12/07/2023 22:45",
                    0
                ],
                [
                    "12/07/2023 23:00",
                    0
                ],
                [
                    "12/07/2023 23:15",
                    0
                ],
                [
                    "12/07/2023 23:30",
                    0
                ],
                [
                    "12/07/2023 23:45",
                    0
                ],
                [
                    "12/08/2023 00:00",
                    0
                ],
                [
                    "12/08/2023 00:15",
                    0
                ],
                [
                    "12/08/2023 00:30",
                    0
                ],
                [
                    "12/08/2023 00:45",
                    0
                ],
                [
                    "12/08/2023 01:00",
                    0
                ],
                [
                    "12/08/2023 01:15",
                    0
                ],
                [
                    "12/08/2023 01:30",
                    0
                ],
                [
                    "12/08/2023 01:45",
                    0
                ],
                [
                    "12/08/2023 02:00",
                    0
                ],
                [
                    "12/08/2023 02:15",
                    0
                ],
                [
                    "12/08/2023 02:30",
                    0
                ],
                [
                    "12/08/2023 02:45",
                    0
                ],
                [
                    "12/08/2023 03:00",
                    0
                ],
                [
                    "12/08/2023 03:15",
                    0
                ],
                [
                    "12/08/2023 03:30",
                    0
                ],
                [
                    "12/08/2023 03:45",
                    0
                ],
                [
                    "12/08/2023 04:00",
                    0
                ],
                [
                    "12/08/2023 04:15",
                    0
                ],
                [
                    "12/08/2023 04:30",
                    0
                ],
                [
                    "12/08/2023 04:45",
                    0
                ],
                [
                    "12/08/2023 05:00",
                    0
                ],
                [
                    "12/08/2023 05:15",
                    0
                ],
                [
                    "12/08/2023 05:30",
                    0
                ],
                [
                    "12/08/2023 05:45",
                    0
                ],
                [
                    "12/08/2023 06:00",
                    0
                ],
                [
                    "12/08/2023 06:15",
                    0
                ],
                [
                    "12/08/2023 06:30",
                    0
                ],
                [
                    "12/08/2023 06:45",
                    2.6
                ],
                [
                    "12/08/2023 07:00",
                    9.4
                ],
                [
                    "12/08/2023 07:15",
                    20.7
                ],
                [
                    "12/08/2023 07:30",
                    35.2
                ],
                [
                    "12/08/2023 07:45",
                    52.1
                ],
                [
                    "12/08/2023 08:00",
                    78.6
                ],
                [
                    "12/08/2023 08:15",
                    113.7
                ],
                [
                    "12/08/2023 08:30",
                    149
                ],
                [
                    "12/08/2023 08:45",
                    180.6
                ],
                [
                    "12/08/2023 09:00",
                    192.2
                ],
                [
                    "12/08/2023 09:15",
                    231.9
                ],
                [
                    "12/08/2023 09:30",
                    250.3
                ],
                [
                    "12/08/2023 09:45",
                    271.1
                ],
                [
                    "12/08/2023 10:00",
                    284.6
                ],
                [
                    "12/08/2023 10:15",
                    298.5
                ],
                [
                    "12/08/2023 10:30",
                    308.6
                ],
                [
                    "12/08/2023 10:45",
                    321.4
                ],
                [
                    "12/08/2023 11:00",
                    181.3
                ],
                [
                    "12/08/2023 11:15",
                    166.2
                ],
                [
                    "12/08/2023 11:30",
                    257.8
                ],
                [
                    "12/08/2023 11:45",
                    390
                ],
                [
                    "12/08/2023 12:00",
                    330
                ],
                [
                    "12/08/2023 12:15",
                    314.6
                ],
                [
                    "12/08/2023 12:30",
                    318.5
                ],
                [
                    "12/08/2023 12:45",
                    308.5
                ],
                [
                    "12/08/2023 13:00",
                    291.3
                ],
                [
                    "12/08/2023 13:15",
                    282.6
                ],
                [
                    "12/08/2023 13:30",
                    245.7
                ],
                [
                    "12/08/2023 13:45",
                    243.8
                ],
                [
                    "12/08/2023 14:00",
                    226.4
                ],
                [
                    "12/08/2023 14:15",
                    205.3
                ],
                [
                    "12/08/2023 14:30",
                    179.8
                ],
                [
                    "12/08/2023 14:45",
                    152
                ],
                [
                    "12/08/2023 15:00",
                    114.1
                ],
                [
                    "12/08/2023 15:15",
                    77.7
                ],
                [
                    "12/08/2023 15:30",
                    54
                ],
                [
                    "12/08/2023 15:45",
                    37.2
                ],
                [
                    "12/08/2023 16:00",
                    21.4
                ],
                [
                    "12/08/2023 16:15",
                    9.6
                ],
                [
                    "12/08/2023 16:30",
                    3.1
                ],
                [
                    "12/08/2023 16:45",
                    0.2
                ],
                [
                    "12/08/2023 17:00",
                    0
                ],
                [
                    "12/08/2023 17:15",
                    0
                ],
                [
                    "12/08/2023 17:30",
                    0
                ],
                [
                    "12/08/2023 17:45",
                    0
                ],
                [
                    "12/08/2023 18:00",
                    0
                ],
                [
                    "12/08/2023 18:15",
                    0
                ],
                [
                    "12/08/2023 18:30",
                    0
                ],
                [
                    "12/08/2023 18:45",
                    0
                ],
                [
                    "12/08/2023 19:00",
                    0
                ],
                [
                    "12/08/2023 19:15",
                    0
                ],
                [
                    "12/08/2023 19:30",
                    0
                ],
                [
                    "12/08/2023 19:45",
                    0
                ],
                [
                    "12/08/2023 20:00",
                    0
                ],
                [
                    "12/08/2023 20:15",
                    0
                ],
                [
                    "12/08/2023 20:30",
                    0
                ],
                [
                    "12/08/2023 20:45",
                    0
                ],
                [
                    "12/08/2023 21:00",
                    0
                ],
                [
                    "12/08/2023 21:15",
                    0
                ],
                [
                    "12/08/2023 21:30",
                    0
                ],
                [
                    "12/08/2023 21:45",
                    0
                ],
                [
                    "12/08/2023 22:00",
                    0
                ],
                [
                    "12/08/2023 22:15",
                    0
                ],
                [
                    "12/08/2023 22:30",
                    0
                ],
                [
                    "12/08/2023 22:45",
                    0
                ],
                [
                    "12/08/2023 23:00",
                    0
                ],
                [
                    "12/08/2023 23:15",
                    0
                ],
                [
                    "12/08/2023 23:30",
                    0
                ],
                [
                    "12/08/2023 23:45",
                    0
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
            "name": " Irradiance",
            "data": [
                [
                    "12/06/2023 00:00",
                    0
                ],
                [
                    "12/06/2023 00:15",
                    0
                ],
                [
                    "12/06/2023 00:30",
                    0
                ],
                [
                    "12/06/2023 00:45",
                    0
                ],
                [
                    "12/06/2023 01:00",
                    0
                ],
                [
                    "12/06/2023 01:15",
                    0
                ],
                [
                    "12/06/2023 01:30",
                    0
                ],
                [
                    "12/06/2023 01:45",
                    0
                ],
                [
                    "12/06/2023 02:00",
                    0
                ],
                [
                    "12/06/2023 02:15",
                    0
                ],
                [
                    "12/06/2023 02:30",
                    0
                ],
                [
                    "12/06/2023 02:45",
                    0
                ],
                [
                    "12/06/2023 03:00",
                    0
                ],
                [
                    "12/06/2023 03:15",
                    0
                ],
                [
                    "12/06/2023 03:30",
                    0
                ],
                [
                    "12/06/2023 03:45",
                    0
                ],
                [
                    "12/06/2023 04:00",
                    0
                ],
                [
                    "12/06/2023 04:15",
                    0
                ],
                [
                    "12/06/2023 04:30",
                    0
                ],
                [
                    "12/06/2023 04:45",
                    0
                ],
                [
                    "12/06/2023 05:00",
                    0
                ],
                [
                    "12/06/2023 05:15",
                    0
                ],
                [
                    "12/06/2023 05:30",
                    0
                ],
                [
                    "12/06/2023 05:45",
                    0
                ],
                [
                    "12/06/2023 06:00",
                    0
                ],
                [
                    "12/06/2023 06:15",
                    0
                ],
                [
                    "12/06/2023 06:30",
                    1.4
                ],
                [
                    "12/06/2023 06:45",
                    8.7
                ],
                [
                    "12/06/2023 07:00",
                    20.1
                ],
                [
                    "12/06/2023 07:15",
                    45.4
                ],
                [
                    "12/06/2023 07:30",
                    108.3
                ],
                [
                    "12/06/2023 07:45",
                    155.5
                ],
                [
                    "12/06/2023 08:00",
                    206
                ],
                [
                    "12/06/2023 08:15",
                    257.9
                ],
                [
                    "12/06/2023 08:30",
                    309.3
                ],
                [
                    "12/06/2023 08:45",
                    356.8
                ],
                [
                    "12/06/2023 09:00",
                    399.9
                ],
                [
                    "12/06/2023 09:15",
                    443.3
                ],
                [
                    "12/06/2023 09:30",
                    476.6
                ],
                [
                    "12/06/2023 09:45",
                    516.4
                ],
                [
                    "12/06/2023 10:00",
                    551.7
                ],
                [
                    "12/06/2023 10:15",
                    582
                ],
                [
                    "12/06/2023 10:30",
                    607.7
                ],
                [
                    "12/06/2023 10:45",
                    627.6
                ],
                [
                    "12/06/2023 11:00",
                    647.9
                ],
                [
                    "12/06/2023 11:15",
                    658.8
                ],
                [
                    "12/06/2023 11:30",
                    669.7
                ],
                [
                    "12/06/2023 11:45",
                    671.7
                ],
                [
                    "12/06/2023 12:00",
                    672.2
                ],
                [
                    "12/06/2023 12:15",
                    664.1
                ],
                [
                    "12/06/2023 12:30",
                    654.2
                ],
                [
                    "12/06/2023 12:45",
                    641.5
                ],
                [
                    "12/06/2023 13:00",
                    621.1
                ],
                [
                    "12/06/2023 13:15",
                    597.8
                ],
                [
                    "12/06/2023 13:30",
                    565.9
                ],
                [
                    "12/06/2023 13:45",
                    533.9
                ],
                [
                    "12/06/2023 14:00",
                    498.5
                ],
                [
                    "12/06/2023 14:15",
                    460.2
                ],
                [
                    "12/06/2023 14:30",
                    419.2
                ],
                [
                    "12/06/2023 14:45",
                    369.2
                ],
                [
                    "12/06/2023 15:00",
                    318.4
                ],
                [
                    "12/06/2023 15:15",
                    262.4
                ],
                [
                    "12/06/2023 15:30",
                    212.8
                ],
                [
                    "12/06/2023 15:45",
                    80.7
                ],
                [
                    "12/06/2023 16:00",
                    28.6
                ],
                [
                    "12/06/2023 16:15",
                    19.2
                ],
                [
                    "12/06/2023 16:30",
                    9.4
                ],
                [
                    "12/06/2023 16:45",
                    2.1
                ],
                [
                    "12/06/2023 17:00",
                    0
                ],
                [
                    "12/06/2023 17:15",
                    0
                ],
                [
                    "12/06/2023 17:30",
                    0
                ],
                [
                    "12/06/2023 17:45",
                    0
                ],
                [
                    "12/06/2023 18:00",
                    0
                ],
                [
                    "12/06/2023 18:15",
                    0
                ],
                [
                    "12/06/2023 18:30",
                    0
                ],
                [
                    "12/06/2023 18:45",
                    0
                ],
                [
                    "12/06/2023 19:00",
                    0
                ],
                [
                    "12/06/2023 19:15",
                    0
                ],
                [
                    "12/06/2023 19:30",
                    0
                ],
                [
                    "12/06/2023 19:45",
                    0
                ],
                [
                    "12/06/2023 20:00",
                    0
                ],
                [
                    "12/06/2023 20:15",
                    0
                ],
                [
                    "12/06/2023 20:30",
                    0
                ],
                [
                    "12/06/2023 20:45",
                    0
                ],
                [
                    "12/06/2023 21:00",
                    0
                ],
                [
                    "12/06/2023 21:15",
                    0
                ],
                [
                    "12/06/2023 21:30",
                    0
                ],
                [
                    "12/06/2023 21:45",
                    0
                ],
                [
                    "12/06/2023 22:00",
                    0
                ],
                [
                    "12/06/2023 22:15",
                    0
                ],
                [
                    "12/06/2023 22:30",
                    0
                ],
                [
                    "12/06/2023 22:45",
                    0
                ],
                [
                    "12/06/2023 23:00",
                    0
                ],
                [
                    "12/06/2023 23:15",
                    0
                ],
                [
                    "12/06/2023 23:30",
                    0
                ],
                [
                    "12/06/2023 23:45",
                    0
                ],
                [
                    "12/07/2023 00:00",
                    0
                ],
                [
                    "12/07/2023 00:15",
                    0
                ],
                [
                    "12/07/2023 00:30",
                    0
                ],
                [
                    "12/07/2023 00:45",
                    0
                ],
                [
                    "12/07/2023 01:00",
                    0
                ],
                [
                    "12/07/2023 01:15",
                    0
                ],
                [
                    "12/07/2023 01:30",
                    0
                ],
                [
                    "12/07/2023 01:45",
                    0
                ],
                [
                    "12/07/2023 02:00",
                    0
                ],
                [
                    "12/07/2023 02:15",
                    0
                ],
                [
                    "12/07/2023 02:30",
                    0
                ],
                [
                    "12/07/2023 02:45",
                    0
                ],
                [
                    "12/07/2023 03:00",
                    0
                ],
                [
                    "12/07/2023 03:15",
                    0
                ],
                [
                    "12/07/2023 03:30",
                    0
                ],
                [
                    "12/07/2023 03:45",
                    0
                ],
                [
                    "12/07/2023 04:00",
                    0
                ],
                [
                    "12/07/2023 04:15",
                    0
                ],
                [
                    "12/07/2023 04:30",
                    0
                ],
                [
                    "12/07/2023 04:45",
                    0
                ],
                [
                    "12/07/2023 05:00",
                    0
                ],
                [
                    "12/07/2023 05:15",
                    0
                ],
                [
                    "12/07/2023 05:30",
                    0
                ],
                [
                    "12/07/2023 05:45",
                    0
                ],
                [
                    "12/07/2023 06:00",
                    0
                ],
                [
                    "12/07/2023 06:15",
                    0
                ],
                [
                    "12/07/2023 06:30",
                    0.8
                ],
                [
                    "12/07/2023 06:45",
                    7.3
                ],
                [
                    "12/07/2023 07:00",
                    22.1
                ],
                [
                    "12/07/2023 07:15",
                    34.5
                ],
                [
                    "12/07/2023 07:30",
                    53.1
                ],
                [
                    "12/07/2023 07:45",
                    79.1
                ],
                [
                    "12/07/2023 08:00",
                    116.5
                ],
                [
                    "12/07/2023 08:15",
                    120.5
                ],
                [
                    "12/07/2023 08:30",
                    273.3
                ],
                [
                    "12/07/2023 08:45",
                    283.4
                ],
                [
                    "12/07/2023 09:00",
                    384.5
                ],
                [
                    "12/07/2023 09:15",
                    373.6
                ],
                [
                    "12/07/2023 09:30",
                    234.2
                ],
                [
                    "12/07/2023 09:45",
                    480.1
                ],
                [
                    "12/07/2023 10:00",
                    342.4
                ],
                [
                    "12/07/2023 10:15",
                    219.6
                ],
                [
                    "12/07/2023 10:30",
                    242.5
                ],
                [
                    "12/07/2023 10:45",
                    393.8
                ],
                [
                    "12/07/2023 11:00",
                    689.2
                ],
                [
                    "12/07/2023 11:15",
                    211.7
                ],
                [
                    "12/07/2023 11:30",
                    547.7
                ],
                [
                    "12/07/2023 11:45",
                    355.9
                ],
                [
                    "12/07/2023 12:00",
                    555.9
                ],
                [
                    "12/07/2023 12:15",
                    553.1
                ],
                [
                    "12/07/2023 12:30",
                    586
                ],
                [
                    "12/07/2023 12:45",
                    669.6
                ],
                [
                    "12/07/2023 13:00",
                    633.8
                ],
                [
                    "12/07/2023 13:15",
                    476.1
                ],
                [
                    "12/07/2023 13:30",
                    573
                ],
                [
                    "12/07/2023 13:45",
                    480
                ],
                [
                    "12/07/2023 14:00",
                    415.1
                ],
                [
                    "12/07/2023 14:15",
                    397.6
                ],
                [
                    "12/07/2023 14:30",
                    438.4
                ],
                [
                    "12/07/2023 14:45",
                    284.3
                ],
                [
                    "12/07/2023 15:00",
                    224.5
                ],
                [
                    "12/07/2023 15:15",
                    250.8
                ],
                [
                    "12/07/2023 15:30",
                    178.5
                ],
                [
                    "12/07/2023 15:45",
                    73.4
                ],
                [
                    "12/07/2023 16:00",
                    34.9
                ],
                [
                    "12/07/2023 16:15",
                    22.6
                ],
                [
                    "12/07/2023 16:30",
                    10.8
                ],
                [
                    "12/07/2023 16:45",
                    2.2
                ],
                [
                    "12/07/2023 17:00",
                    0
                ],
                [
                    "12/07/2023 17:15",
                    0
                ],
                [
                    "12/07/2023 17:30",
                    0
                ],
                [
                    "12/07/2023 17:45",
                    0
                ],
                [
                    "12/07/2023 18:00",
                    0
                ],
                [
                    "12/07/2023 18:15",
                    0
                ],
                [
                    "12/07/2023 18:30",
                    0
                ],
                [
                    "12/07/2023 18:45",
                    0
                ],
                [
                    "12/07/2023 19:00",
                    0
                ],
                [
                    "12/07/2023 19:15",
                    0
                ],
                [
                    "12/07/2023 19:30",
                    0
                ],
                [
                    "12/07/2023 19:45",
                    0
                ],
                [
                    "12/07/2023 20:00",
                    0
                ],
                [
                    "12/07/2023 20:15",
                    0
                ],
                [
                    "12/07/2023 20:30",
                    0
                ],
                [
                    "12/07/2023 20:45",
                    0
                ],
                [
                    "12/07/2023 21:00",
                    0
                ],
                [
                    "12/07/2023 21:15",
                    0
                ],
                [
                    "12/07/2023 21:30",
                    0
                ],
                [
                    "12/07/2023 21:45",
                    0
                ],
                [
                    "12/07/2023 22:00",
                    0
                ],
                [
                    "12/07/2023 22:15",
                    0
                ],
                [
                    "12/07/2023 22:30",
                    0
                ],
                [
                    "12/07/2023 22:45",
                    0
                ],
                [
                    "12/07/2023 23:00",
                    0
                ],
                [
                    "12/07/2023 23:15",
                    0
                ],
                [
                    "12/07/2023 23:30",
                    0
                ],
                [
                    "12/07/2023 23:45",
                    0
                ],
                [
                    "12/08/2023 00:00",
                    0
                ],
                [
                    "12/08/2023 00:15",
                    0
                ],
                [
                    "12/08/2023 00:30",
                    0
                ],
                [
                    "12/08/2023 00:45",
                    0
                ],
                [
                    "12/08/2023 01:00",
                    0
                ],
                [
                    "12/08/2023 01:15",
                    0
                ],
                [
                    "12/08/2023 01:30",
                    0
                ],
                [
                    "12/08/2023 01:45",
                    0
                ],
                [
                    "12/08/2023 02:00",
                    0
                ],
                [
                    "12/08/2023 02:15",
                    0
                ],
                [
                    "12/08/2023 02:30",
                    0
                ],
                [
                    "12/08/2023 02:45",
                    0
                ],
                [
                    "12/08/2023 03:00",
                    0
                ],
                [
                    "12/08/2023 03:15",
                    0
                ],
                [
                    "12/08/2023 03:30",
                    0
                ],
                [
                    "12/08/2023 03:45",
                    0
                ],
                [
                    "12/08/2023 04:00",
                    0
                ],
                [
                    "12/08/2023 04:15",
                    0
                ],
                [
                    "12/08/2023 04:30",
                    0
                ],
                [
                    "12/08/2023 04:45",
                    0
                ],
                [
                    "12/08/2023 05:00",
                    0
                ],
                [
                    "12/08/2023 05:15",
                    0
                ],
                [
                    "12/08/2023 05:30",
                    0
                ],
                [
                    "12/08/2023 05:45",
                    0
                ],
                [
                    "12/08/2023 06:00",
                    0
                ],
                [
                    "12/08/2023 06:15",
                    0
                ],
                [
                    "12/08/2023 06:30",
                    1
                ],
                [
                    "12/08/2023 06:45",
                    7.7
                ],
                [
                    "12/08/2023 07:00",
                    20.6
                ],
                [
                    "12/08/2023 07:15",
                    41.6
                ],
                [
                    "12/08/2023 07:30",
                    101.5
                ],
                [
                    "12/08/2023 07:45",
                    145.6
                ],
                [
                    "12/08/2023 08:00",
                    197.6
                ],
                [
                    "12/08/2023 08:15",
                    250.6
                ],
                [
                    "12/08/2023 08:30",
                    306.6
                ],
                [
                    "12/08/2023 08:45",
                    358.5
                ],
                [
                    "12/08/2023 09:00",
                    367.5
                ],
                [
                    "12/08/2023 09:15",
                    438.8
                ],
                [
                    "12/08/2023 09:30",
                    475.6
                ],
                [
                    "12/08/2023 09:45",
                    519.2
                ],
                [
                    "12/08/2023 10:00",
                    552.3
                ],
                [
                    "12/08/2023 10:15",
                    584.6
                ],
                [
                    "12/08/2023 10:30",
                    612
                ],
                [
                    "12/08/2023 10:45",
                    639.8
                ],
                [
                    "12/08/2023 11:00",
                    444.6
                ],
                [
                    "12/08/2023 11:15",
                    409
                ],
                [
                    "12/08/2023 11:30",
                    389.1
                ],
                [
                    "12/08/2023 11:45",
                    757.4
                ],
                [
                    "12/08/2023 12:00",
                    690
                ],
                [
                    "12/08/2023 12:15",
                    651.3
                ],
                [
                    "12/08/2023 12:30",
                    660.3
                ],
                [
                    "12/08/2023 12:45",
                    645.5
                ],
                [
                    "12/08/2023 13:00",
                    623.8
                ],
                [
                    "12/08/2023 13:15",
                    596.2
                ],
                [
                    "12/08/2023 13:30",
                    531
                ],
                [
                    "12/08/2023 13:45",
                    525.1
                ],
                [
                    "12/08/2023 14:00",
                    498.8
                ],
                [
                    "12/08/2023 14:15",
                    463.8
                ],
                [
                    "12/08/2023 14:30",
                    421
                ],
                [
                    "12/08/2023 14:45",
                    372.9
                ],
                [
                    "12/08/2023 15:00",
                    316.8
                ],
                [
                    "12/08/2023 15:15",
                    266.7
                ],
                [
                    "12/08/2023 15:30",
                    212.8
                ],
                [
                    "12/08/2023 15:45",
                    83.5
                ],
                [
                    "12/08/2023 16:00",
                    29.5
                ],
                [
                    "12/08/2023 16:15",
                    20.9
                ],
                [
                    "12/08/2023 16:30",
                    10.3
                ],
                [
                    "12/08/2023 16:45",
                    2.2
                ],
                [
                    "12/08/2023 17:00",
                    0
                ],
                [
                    "12/08/2023 17:15",
                    0
                ],
                [
                    "12/08/2023 17:30",
                    0
                ],
                [
                    "12/08/2023 17:45",
                    0
                ],
                [
                    "12/08/2023 18:00",
                    0
                ],
                [
                    "12/08/2023 18:15",
                    0
                ],
                [
                    "12/08/2023 18:30",
                    0
                ],
                [
                    "12/08/2023 18:45",
                    0
                ],
                [
                    "12/08/2023 19:00",
                    0
                ],
                [
                    "12/08/2023 19:15",
                    0
                ],
                [
                    "12/08/2023 19:30",
                    0
                ],
                [
                    "12/08/2023 19:45",
                    0
                ],
                [
                    "12/08/2023 20:00",
                    0
                ],
                [
                    "12/08/2023 20:15",
                    0
                ],
                [
                    "12/08/2023 20:30",
                    0
                ],
                [
                    "12/08/2023 20:45",
                    0
                ],
                [
                    "12/08/2023 21:00",
                    0
                ],
                [
                    "12/08/2023 21:15",
                    0
                ],
                [
                    "12/08/2023 21:30",
                    0
                ],
                [
                    "12/08/2023 21:45",
                    0
                ],
                [
                    "12/08/2023 22:00",
                    0
                ],
                [
                    "12/08/2023 22:15",
                    0
                ],
                [
                    "12/08/2023 22:30",
                    0
                ],
                [
                    "12/08/2023 22:45",
                    0
                ],
                [
                    "12/08/2023 23:00",
                    0
                ],
                [
                    "12/08/2023 23:15",
                    0
                ],
                [
                    "12/08/2023 23:30",
                    0
                ],
                [
                    "12/08/2023 23:45",
                    0
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
        <div className={`col-md-4 ${styles.left_tab}`}>
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
                <div className='col-md-7 my-2'>
                    <div className={styles.group}>
                        <div className={styles.icons}>
                            <TreePlaned />
                        </div>
                        <div className={styles.detail}>
                        <div className={styles.value}>303,885</div>
                        <div>Equivalent Trees Planted</div>
                        </div>
                    </div>
                </div>
                <div className='col-md-5 my-2'>
                    <div className={styles.group}>
                        <div className={styles.icons}>
                            <Temperature />
                        </div>
                        <div className={styles.detail}>
                        <div className={styles.value}>35.5°</div>
                        <div>Temperature</div>
                        </div>
                    </div>
                </div>
                </div>

                <div className='row ms-2'>
                <div className='col-md-7 my-2'>
                    <div className={styles.group}>
                        <div className={styles.icons}>
                            <Co2Avoided />
                        </div>
                        <div className={styles.detail}>
                        <div className={styles.value}>10,181,454,024</div>
                        <div>Tons of CO2 Avoided</div>
                        </div>
                    </div>
                </div>
                <div className='col-md-5 my-2'>
                    <div className={styles.group}>
                        <div className={styles.icons}>
                            <Humidity />
                        </div>
                        <div className={styles.detail}>
                        <div className={styles.value}>75%</div>
                        <div>Humidity</div>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        </div>
 
        <div className={`col-md-8 ${styles.right_tab}`}>
          <div className={styles.device}>
            <div className='row'>
              <div className='col-md-8'>
                <Table columns={columns} data={data} maxHeight={265} className={styles.table_device} variant={"grey"} footer={true}
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
                      <div className='me-3'><PowerOverview /></div>
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
              <div ref={refHeight} className={styles.main_charting}>
                    <ChartView
                        dataDate={[
                            { id: 1, name: "3 Days", active: 0 },
                            { id: 2, name: "Today", active: 1 },
                            { id: 3, name: "This Week", active: 0 },
                            { id: 4, name: "Last Week", active: 0 },
                            { id: 5, name: "This Month", active: 0 },
                            { id: 6, name: "Last Month", active: 0 },
                            { id: 7, name: "12 Months", active: 0 },
                            { id: 8, name: "Year to Date", active: 0 },
                            { id: 8, name: "Lifetime", active: 0 },
                            { id: 8, name: "Custom", active: 0 }
                        ]}
                        dataTime={[
                            { id: 1, name: "Minute", active: 0 },
                            { id: 2, name: "5 Minutes", active: 1 },
                            { id: 3, name: "15 Minutes", active: 0 },
                            { id: 4, name: "1 Hour", active: 0 },
                            { id: 5, name: "1 Day", active: 0 },
                            { id: 6, name: "7 Days", active: 0 },
                            { id: 7, name: "1 Month", active: 0 },
                            { id: 8, name: "1 Year", active: 0 },
                        ]}

                        options={options}
                    />
                </div>
          </div>
        </div>
      </div>
    </div>
  );
};