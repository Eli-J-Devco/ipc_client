import styles from "./Traffic.module.scss";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import highchartsGantt from "highcharts/modules/gantt";
import HighchartsExporting from "highcharts/modules/exporting";
import bellcurve from "highcharts/modules/histogram-bellcurve";
import highchartsMore from "highcharts/highcharts-more.js";
import solidGauge from "highcharts/modules/solid-gauge.js";
import accessibility from "highcharts/modules/accessibility.js";
import { useEffect, useRef, useState } from "react";
import useMQTT from "../../../../../hooks/useMQTT";
import _ from "lodash";

// init the module
highchartsGantt(Highcharts);
bellcurve(Highcharts);
if (typeof Highcharts === "object") {
  HighchartsExporting(Highcharts);
}

highchartsMore(Highcharts);
solidGauge(Highcharts);
accessibility(Highcharts);

function Traffic() {
  const chartRef = useRef(null);
  const [curItem, setCurItem] = useState({});
  const [networkInfo, setNetworkInfo] = useState({
    Downstream: "",
    Upstream: "",
    TotalSent: "",
    TotalReceived: "",
  });
  const [optionsTraffic] = useState({
    chart: {
      type: "areaspline",
      height: 300,
    },
    title: {
      text: "",
      align: "left",
      enabled: false,
    },
    exporting: {
      enabled: false,
    },

    credits: {
      enabled: false,
    },

    legend: {
      layout: "vertical",
      enabled: false,
      align: "left",
      verticalAlign: "top",
      x: 120,
      y: 70,
      floating: true,
      borderWidth: 1,
      backgroundColor:
        Highcharts.defaultOptions.legend.backgroundColor || "#FFFFFF",
    },
    xAxis: {
      type: "datetime",
      labels: {
        format: "{value:%H:%M:%S}",
      },
    },
    yAxis: {
      title: {
        text: "KB/s",
      },
    },
    tooltip: {
      shared: true,
    },
    credits: {
      enabled: false,
    },
    colors: ["#32CD32", "#52a9ff"],
    plotOptions: {
      areaspline: {
        fillColor: {
          linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
          stops: [
            [0, "#32CD32"],
            [1, "#32CD3200"],
          ],
        },
        threshold: null,
        marker: {
          lineWidth: 1,
          lineColor: null,
          fillColor: "white",
        },
      },
    },

    series: [
      {
        name: "Upstream",
        data: [],
      },
      {
        name: "Downstream",
        data: [],
      },
    ],
  });
  const { cpuData } = useMQTT();

  useEffect(() => {
    if (
      _.isEmpty(cpuData) ||
      _.isEmpty(cpuData.NetworkSpeed) ||
      _.isEqual(cpuData, curItem)
    )
      return;

    setCurItem(cpuData);
    let networkInfo = {};
    networkInfo.Downstream = !_.isEmpty(cpuData.NetworkSpeed.Downstream)
      ? cpuData.NetworkSpeed.Downstream
      : "";
    networkInfo.Upstream = !_.isEmpty(cpuData.NetworkSpeed.Upstream)
      ? cpuData.NetworkSpeed.Upstream
      : "";
    networkInfo.TotalSent = !_.isEmpty(cpuData.NetworkSpeed.TotalSent)
      ? cpuData.NetworkSpeed.TotalSent
      : "";
    networkInfo.TotalReceived = !_.isEmpty(cpuData.NetworkSpeed.TotalReceived)
      ? cpuData.NetworkSpeed.TotalReceived
      : "";

    let UpstreamPercentage = !_.isEmpty(cpuData.NetworkSpeed.Upstream)
      ? cpuData.NetworkSpeed.Upstream.split(" ")
      : 0;
    let DownstreamPercentage = !_.isEmpty(cpuData.NetworkSpeed.Downstream)
      ? cpuData.NetworkSpeed.Downstream.split(" ")
      : 0;
    let time = Math.floor(cpuData.Time / 1000) * 1000;
    const chart = chartRef.current.chart;
    const pointUpstream = [
      new Date(time).getTime(),
      parseFloat(UpstreamPercentage[0]),
    ];
    const pointDownstream = [
      new Date(time).getTime(),
      parseFloat(DownstreamPercentage[0]),
    ];
    const seriesUpstream = chart.series[0],
      shiftUpstream = seriesUpstream.data.length > 20; // shift if the series is longer than 20
    const seriesDownstream = chart.series[1],
      shiftDownstream = seriesDownstream.data.length > 20; // shift if the series is longer than 20

    chartRef.current.chart.series[0].addPoint(
      pointUpstream,
      false,
      shiftUpstream
    );
    chartRef.current.chart.series[1].addPoint(
      pointDownstream,
      true,
      shiftDownstream
    );
    setNetworkInfo(networkInfo);
  }, [cpuData]);

  return (
    <div className={styles.group_cpu_traffic}>
      <div className="row">
        <div className="col-md-3">
          <p>
            <span className={styles.ico_up}></span>Upstream
          </p>
          <p>{networkInfo.Upstream}</p>
        </div>
        <div className="col-md-3">
          <p>
            <span className={styles.ico_down}></span>Downstream
          </p>
          <p>{networkInfo.Downstream}</p>
        </div>

        <div className="col-md-3">
          <p>Total sent</p>
          <p>{networkInfo.TotalSent}</p>
        </div>

        <div className="col-md-3">
          <p>Total received</p>
          <p>{networkInfo.TotalReceived}</p>
        </div>
      </div>
      <div className={styles.chart_traffic}>
        <HighchartsReact
          highcharts={Highcharts}
          options={optionsTraffic}
          allowChartUpdate={true}
          immutable={true}
          ref={chartRef}
        />
      </div>
    </div>
  );
}

export default Traffic;
