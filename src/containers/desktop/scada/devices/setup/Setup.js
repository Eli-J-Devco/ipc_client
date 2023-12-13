import React, { useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import styles from './Setup.module.scss';
import Breadcrumb from '../../../../../components/breadCrumb/BreadCrumb';
import { ReactComponent as EnergyIcon } from "../../../../../assets/images/energy.svg";
import { ReactComponent as PowerIcon } from "../../../../../assets/images/power.svg";
import Table from "../../../../../components/table/Table";
import ChartView from '../../../../../components/chartView/ChartView';


function Setup(props) {

    const data = [
        { id: 1, numerical_order: 1, issue: 'DC soft starting fault', opened: '08/21/2023 13:40 PM', open_period: '4 hours', error_level: 'COMM' },
        { id: 2, numerical_order: 2, issue: 'DC soft starting fault', opened: '08/21/2023 13:40 PM', open_period: '4 hours', error_level: 'COMM' },
        { id: 3, numerical_order: 3, issue: 'DC soft starting fault', opened: '08/21/2023 13:40 PM', open_period: '4 hours', error_level: 'COMM' },
        { id: 4, numerical_order: 4, issue: 'DC soft starting fault', opened: '08/21/2023 13:40 PM', open_period: '4 hours', error_level: 'COMM' },
        { id: 5, numerical_order: 5, issue: 'DC soft starting fault', opened: '08/21/2023 13:40 PM', open_period: '4 hours', error_level: 'COMM' },
        { id: 6, numerical_order: 6, issue: 'DC soft starting fault', opened: '08/21/2023 13:40 PM', open_period: '4 hours', error_level: 'COMM' },
        { id: 7, numerical_order: 7, issue: 'DC soft starting fault', opened: '08/21/2023 13:40 PM', open_period: '4 hours', error_level: 'COMM' },
        { id: 8, numerical_order: 8, issue: 'DC soft starting fault', opened: '08/21/2023 13:40 PM', open_period: '4 hours', error_level: 'COMM' },
        { id: 9, numerical_order: 9, issue: 'DC soft starting fault', opened: '08/21/2023 13:40 PM', open_period: '4 hours', error_level: 'COMM' },
        { id: 10, numerical_order: 10, issue: 'DC soft starting fault', opened: '08/21/2023 13:40 PM', open_period: '4 hours', error_level: 'COMM' }
    ]
    const columns = [
        { id: 1, slug: "numerical_order", name: "No.", width: 50 },
        { id: 2, slug: "issue", name: "Issue", width: 300 },
        { id: 3, slug: "opened", name: "Opened", width: 200 },
        { id: 4, slug: "open_period", name: "Open Period", width: 100 },
        { id: 5, slug: "error_level", name: "Error Level", width: 200 },
    ]

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

    const refHeight = useRef(null);
    useEffect(() => {
        if (refHeight.current.clientHeight > 0 && options) { options.chart.height = refHeight.current.clientHeight - 60; }
    });

    return (
        <div className={styles.setup}>
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
                                },
                                {
                                    path: "/scada/devices/setup/123",
                                    name: "INV 01"
                                },
                                {
                                    path: "",
                                    name: "Setup"
                                }
                            ]}
                        />
                    </div>
                </div>
            </div>





            <div className={styles.setup_body}>
                <div className={styles.dc_com}>
                    <NavLink to={"/scada/devices/dc-combiner/1212"} className={(navData) => `nav-link m-0 border-0 ${navData.isActive ? styles.active : ""}`} end>
                        <svg width="14" height="9" viewBox="0 0 14 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect width="4" height="4" fill="#383434" />
                            <rect x="5" width="4" height="4" fill="#383434" />
                            <rect x="10" width="4" height="4" fill="#383434" />
                            <rect y="5" width="4" height="4" fill="#383434" />
                            <rect x="5" y="5" width="4" height="4" fill="#383434" />
                            <rect x="10" y="5" width="4" height="4" fill="#383434" />
                        </svg>
                        DC Combiner
                    </NavLink>
                </div>

                <div className={styles.height_row + " container-fluid"}>
                    <div className={styles.height_row + " row"}>
                        <div className="col-md-6">
                            <div className="row">
                                <div className="col-md-6">
                                    <div className={styles.item_power}>
                                        <div className="row">
                                            <div className="col-md-7">
                                                <p>Power Now</p>
                                                <p><strong className={styles.color_power}>110.8 kW</strong></p>
                                                <p>Installed Power <strong>365.5 kWp</strong></p>
                                            </div>
                                            <div className="col-md-5 text-end">
                                                <div className={styles.power_icon}>
                                                    <PowerIcon />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div className={styles.item_power}>
                                        <div className="row">
                                            <div className="col-md-7">
                                                <p>Today's Production</p>
                                                <p><strong className={styles.color_power}>1.57 MWh</strong></p>
                                                <p>Total Production <strong>1.47 GWh</strong></p>
                                            </div>
                                            <div className="col-md-5 text-end">
                                                <div className={styles.power_icon}>
                                                    <EnergyIcon />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>

                            <div className={styles.box_output}>
                                <div className={styles.title}>
                                    OUTPUT INVERTER 01
                                </div>
                                <div className={styles.box_output_content}>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className={styles.item}>
                                                <div className={styles.name}>Uab</div>
                                                <div className={styles.value}>593</div>
                                                <div className={styles.unit}>V</div>
                                            </div>

                                            <div className={styles.item}>
                                                <div className={styles.name}>Ubc</div>
                                                <div className={styles.value}>592</div>
                                                <div className={styles.unit}>V</div>
                                            </div>

                                            <div className={styles.item}>
                                                <div className={styles.name}>Uca</div>
                                                <div className={styles.value}>590</div>
                                                <div className={styles.unit}>V</div>
                                            </div>

                                            <div className={styles.item}>
                                                <div className={styles.name}>P</div>
                                                <div className={styles.value}>0.73</div>
                                                <div className={styles.unit}>MW</div>
                                            </div>

                                            <div className={styles.item}>
                                                <div className={styles.name}>Q</div>
                                                <div className={styles.value}>0.01</div>
                                                <div className={styles.unit}>MVAr</div>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className={styles.item}>
                                                <div className={styles.name}>Ia</div>
                                                <div className={styles.value}>100</div>
                                                <div className={styles.unit}>A</div>
                                            </div>

                                            <div className={styles.item}>
                                                <div className={styles.name}>Ib</div>
                                                <div className={styles.value}>100</div>
                                                <div className={styles.unit}>A</div>
                                            </div>

                                            <div className={styles.item}>
                                                <div className={styles.name}>Ic</div>
                                                <div className={styles.value}>100</div>
                                                <div className={styles.unit}>A</div>
                                            </div>

                                            <div className={styles.item}>
                                                <div className={styles.name}>PE</div>
                                                <div className={styles.value}>1</div>
                                                <div className={styles.unit}>-</div>
                                            </div>

                                            <div className={styles.item}>
                                                <div className={styles.name}>F</div>
                                                <div className={styles.value}>50.1</div>
                                                <div className={styles.unit}>Hz</div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
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
                        <div className="col-md-6">
                            <div className={styles.height_row + " row"}>
                                <div className="col-md-12">
                                    <div className={styles.box1}>
                                        <div className={styles.main_box}>
                                            <div className={styles.height_row + " row"}>
                                                <div className="col-md-4">
                                                    <div className={styles.string_main}>
                                                        <div className={styles.string_title}>
                                                            MPPT INFORMATION
                                                        </div>
                                                        <div className={styles.string_info}>
                                                            <div className={styles.item + " " + styles.none}>
                                                                <div className={styles.name}></div>
                                                                <div className={styles.value}>Voltage(V)</div>
                                                                <div className={styles.unit}>Current(A)</div>
                                                            </div>

                                                            <div className={styles.item}>
                                                                <div className={styles.name}>MPPT1</div>
                                                                <div className={styles.value}>600</div>
                                                                <div className={styles.unit}>18.8</div>
                                                            </div>
                                                            <div className={styles.item}>
                                                                <div className={styles.name}>MPPT2</div>
                                                                <div className={styles.value}>600</div>
                                                                <div className={styles.unit}>18.8</div>
                                                            </div>
                                                            <div className={styles.item}>
                                                                <div className={styles.name}>MPPT3</div>
                                                                <div className={styles.value}>600</div>
                                                                <div className={styles.unit}>18.8</div>
                                                            </div>
                                                            <div className={styles.item}>
                                                                <div className={styles.name}>MPPT4</div>
                                                                <div className={styles.value}>600</div>
                                                                <div className={styles.unit}>18.8</div>
                                                            </div>
                                                            <div className={styles.item}>
                                                                <div className={styles.name}>MPPT5</div>
                                                                <div className={styles.value}>600</div>
                                                                <div className={styles.unit}>18.8</div>
                                                            </div>
                                                            <div className={styles.item}>
                                                                <div className={styles.name}>MPPT6</div>
                                                                <div className={styles.value}>600</div>
                                                                <div className={styles.unit}>18.8</div>
                                                            </div>
                                                            <div className={styles.item}>
                                                                <div className={styles.name}>MPPT7</div>
                                                                <div className={styles.value}>600</div>
                                                                <div className={styles.unit}>18.8</div>
                                                            </div>
                                                            <div className={styles.item}>
                                                                <div className={styles.name}>MPPT8</div>
                                                                <div className={styles.value}>600</div>
                                                                <div className={styles.unit}>18.8</div>
                                                            </div>
                                                            <div className={styles.item}>
                                                                <div className={styles.name}>MPPT9</div>
                                                                <div className={styles.value}>600</div>
                                                                <div className={styles.unit}>18.8</div>
                                                            </div>
                                                            <div className={styles.item}>
                                                                <div className={styles.name}>MPPT9</div>
                                                                <div className={styles.value}>600</div>
                                                                <div className={styles.unit}>18.8</div>
                                                            </div>
                                                            <div className={styles.item}>
                                                                <div className={styles.name}>MPPT9</div>
                                                                <div className={styles.value}>600</div>
                                                                <div className={styles.unit}>18.8</div>
                                                            </div>
                                                            <div className={styles.item}>
                                                                <div className={styles.name}>MPPT9</div>
                                                                <div className={styles.value}>600</div>
                                                                <div className={styles.unit}>18.8</div>
                                                            </div>
                                                            <div className={styles.item}>
                                                                <div className={styles.name}>MPPT9</div>
                                                                <div className={styles.value}>600</div>
                                                                <div className={styles.unit}>18.8</div>
                                                            </div>
                                                            <div className={styles.item}>
                                                                <div className={styles.name}>MPPT9</div>
                                                                <div className={styles.value}>600</div>
                                                                <div className={styles.unit}>18.8</div>
                                                            </div>
                                                            <div className={styles.item}>
                                                                <div className={styles.name}>MPPT9</div>
                                                                <div className={styles.value}>600</div>
                                                                <div className={styles.unit}>18.8</div>
                                                            </div>
                                                        </div>
                                                    </div>


                                                </div>
                                                <div className="col-md-8">
                                                    <div className={styles.item_status}>
                                                        <div className={styles.height_row + " row"}>
                                                            <div className="col-md-4 text-center">
                                                                <div className={styles.running + " " + styles.active}>Running</div>
                                                            </div>
                                                            <div className="col-md-4 text-center">
                                                                <div className={styles.stop}>Stop</div>
                                                            </div>
                                                            <div className="col-md-4 text-center">
                                                                <div className={styles.fault}>Fault</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className={styles.item_control}>
                                                        <div className={styles.control_title}>
                                                            Control
                                                        </div>
                                                        <div className={styles.control_body}>
                                                            <div className="row">
                                                                <div className="col-md-4">
                                                                    <table className={styles.tabled}>
                                                                        <tbody>
                                                                            <tr>
                                                                                <td></td>
                                                                                <td><p>SETPOINT</p></td>
                                                                                <td></td>
                                                                            </tr>

                                                                            <tr>
                                                                                <td>P</td>
                                                                                <td><span className={styles.none}>125.3</span></td>
                                                                                <td>kW</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>Q</td>
                                                                                <td><span className={styles.none}>0.5</span></td>
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

                                                                <div className="col-md-4">

                                                                    <table className={styles.tabled}>
                                                                        <tbody>
                                                                            <tr>
                                                                                <td></td>
                                                                                <td><p>REAL-TIME</p></td>
                                                                                <td></td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td></td>
                                                                                <td><span className={styles.none}>100</span></td>
                                                                                <td>kW</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td></td>
                                                                                <td><span>100</span></td>
                                                                                <td>kVAr</td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>
                                                                </div>

                                                                <div className="col-md-4 text-center">

                                                                    <table className={styles.tabled}>
                                                                        <tbody>
                                                                            <tr>
                                                                                <td></td>
                                                                                <td><p>MODE</p></td>
                                                                                <td></td>
                                                                            </tr>

                                                                            <tr>
                                                                                <td></td>
                                                                                <td><div className={styles.auto_mode}>Auto</div></td>
                                                                                <td></td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td></td>
                                                                                <td><div className={styles.manual_mode}>Manual</div></td>
                                                                                <td></td>
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

                                    <div className={styles.box2}>
                                        <div className={styles.main_box}>
                                            <div className={styles.height_row + " row"}>
                                                <div className="col-md-4">
                                                    <div className={styles.string_main}>
                                                        <div className={styles.string_title}>
                                                            STRING INFORMATION
                                                        </div>
                                                        <div className={styles.string_info}>
                                                            <div className={styles.item + " " + styles.none}>
                                                                <div className={styles.name}></div>
                                                                <div className={styles.value}></div>
                                                                <div className={styles.unit}>Current(A)</div>
                                                            </div>

                                                            <div className={styles.item}>
                                                                <div className={styles.name}>String 1</div>
                                                                <div className={styles.value}></div>
                                                                <div className={styles.unit}>18.8</div>
                                                            </div>
                                                            <div className={styles.item}>
                                                                <div className={styles.name}>String 2</div>
                                                                <div className={styles.value}></div>
                                                                <div className={styles.unit}>18.8</div>
                                                            </div>
                                                            <div className={styles.item}>
                                                                <div className={styles.name}>String 3</div>
                                                                <div className={styles.value}></div>
                                                                <div className={styles.unit}>18.8</div>
                                                            </div>
                                                            <div className={styles.item}>
                                                                <div className={styles.name}>String 4</div>
                                                                <div className={styles.value}></div>
                                                                <div className={styles.unit}>18.8</div>
                                                            </div>
                                                            <div className={styles.item}>
                                                                <div className={styles.name}>String 5</div>
                                                                <div className={styles.value}></div>
                                                                <div className={styles.unit}>18.8</div>
                                                            </div>
                                                            <div className={styles.item}>
                                                                <div className={styles.name}>String 6</div>
                                                                <div className={styles.value}></div>
                                                                <div className={styles.unit}>18.8</div>
                                                            </div>
                                                            <div className={styles.item}>
                                                                <div className={styles.name}>String 7</div>
                                                                <div className={styles.value}></div>
                                                                <div className={styles.unit}>18.8</div>
                                                            </div>
                                                            <div className={styles.item}>
                                                                <div className={styles.name}>String 8</div>
                                                                <div className={styles.value}></div>
                                                                <div className={styles.unit}>18.8</div>
                                                            </div>
                                                            <div className={styles.item}>
                                                                <div className={styles.name}>String 9</div>
                                                                <div className={styles.value}></div>
                                                                <div className={styles.unit}>18.8</div>
                                                            </div>
                                                            <div className={styles.item}>
                                                                <div className={styles.name}>String 9</div>
                                                                <div className={styles.value}></div>
                                                                <div className={styles.unit}>18.8</div>
                                                            </div>
                                                            <div className={styles.item}>
                                                                <div className={styles.name}>String 9</div>
                                                                <div className={styles.value}></div>
                                                                <div className={styles.unit}>18.8</div>
                                                            </div>
                                                            <div className={styles.item}>
                                                                <div className={styles.name}>String 9</div>
                                                                <div className={styles.value}></div>
                                                                <div className={styles.unit}>18.8</div>
                                                            </div>
                                                            <div className={styles.item}>
                                                                <div className={styles.name}>String 9</div>
                                                                <div className={styles.value}></div>
                                                                <div className={styles.unit}>18.8</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-8">
                                                    <div className={styles.alerts}>
                                                        <div className={styles.alert_title}>
                                                            Alarms
                                                        </div>

                                                        <div className={styles.alarms_list}>
                                                            <Table columns={columns} data={data}
                                                                maxHeight="100%"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

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

export default Setup;