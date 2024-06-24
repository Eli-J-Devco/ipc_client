import { Outlet } from "react-router-dom";
import React, { useEffect, useRef, useState } from "react";
import Breadcrumb from "../../../../components/breadCrumb/BreadCrumb";
import styles from "./Overview.module.scss";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import highchartsGantt from "highcharts/modules/gantt";
import HighchartsExporting from "highcharts/modules/exporting";
import bellcurve from "highcharts/modules/histogram-bellcurve";
import highchartsMore from "highcharts/highcharts-more.js";
import solidGauge from "highcharts/modules/solid-gauge.js";
import accessibility from "highcharts/modules/accessibility.js";
import Traffic from "./traffic/Traffic";
import DiskIO from "./diskIO/DiskIO";
import useMQTT from "../../../../hooks/useMQTT";
import _ from "lodash";
import moment from "moment/moment";
import { ReactComponent as RefreshIcon } from "../../../../assets/images/alternate-sync.svg";
import Button from "../../../../components/button/Button";
import Modal from "../../../../components/modal/Modal";
import useProjectSetup from "../../../../hooks/useProjectSetup";
import LibToast from "../../../../utils/LibToast";

// init the module
highchartsGantt(Highcharts);
bellcurve(Highcharts);
if (typeof Highcharts === "object") {
  HighchartsExporting(Highcharts);
}

highchartsMore(Highcharts);
solidGauge(Highcharts);
accessibility(Highcharts);

function Overview() {
  const chartRef = useRef();
  const { projectSetup } = useProjectSetup();
  const { cpuData, publishMessage } = useMQTT();
  const [traffic, setTraffic] = useState(1);
  const [options] = useState({
    chart: {
      type: "line",
      height: 300,
    },
    exporting: {
      enabled: false,
    },

    credits: {
      enabled: false,
    },
    title: {
      text: "",
      align: "left",
    },

    yAxis: {
      title: {
        text: "%",
      },
    },
    xAxis: {
      type: "datetime",
      labels: {
        format: "{value:%H:%M:%S}",
      },
    },

    legend: {
      enabled: false,
    },
    tooltip: { shared: true },
    series: [
      {
        name: "Percent",
        data: [],
      },
    ],
  });

  const solidgaugeOptions = {
    chart: {
      type: "solidgauge",
      height: 150,
    },

    title: null,
    pane: {
      center: ["50%", "50%"],
      size: "100%",
      startAngle: 0,
      endAngle: 360,
      background: {
        backgroundColor:
          Highcharts.defaultOptions.legend.backgroundColor || "#EEE",
        innerRadius: "80%",
        outerRadius: "100%",
        shape: "arc",
      },
    },

    exporting: {
      enabled: false,
    },

    tooltip: {
      enabled: false,
    },

    credits: {
      enabled: false,
    },

    xAxis: {
      enabled: false,
    },

    yAxis: {
      min: 0,
      max: 100,
      gridLineColor: "transparent",
      stops: [
        [0.1, "#55BF3B"], // green
        [0.5, "#DDDF0D"], // yellow
        [0.9, "#DF5353"], // red
      ],
      lineWidth: 0,
      tickWidth: 0,
      minorTickInterval: null,
      tickAmount: 0,
      title: {
        y: -70,
        text: "Speed",
        enabled: false,
      },
      labels: {
        y: 16,
        enabled: false,
      },
    },

    series: [
      {
        name: "Speed",
        data: [],
        dataLabels: {
          format:
            '<div style="text-align:center">' +
            '<span style="font-size:14px">{y} %</span>' +
            "</div>",
        },
        tooltip: {
          valueSuffix: " %",
        },
      },
    ],

    plotOptions: {
      solidgauge: {
        innerRadius: "80%",
        radius: "100%",
        dataLabels: {
          enabled: true,
          y: -10,
          borderWidth: 0,
          useHTML: true,
        },
      },
    },
  };

  const [isSetup, setIsSetup] = useState(true);
  const [curInformationCPU, setCurInformationCPU] = useState({});
  const [totalCPU, setTotalCPU] = useState(0);
  const [CPU, setCPU] = useState(solidgaugeOptions);
  const [RAM, setRAM] = useState(solidgaugeOptions);
  const [DISK, setDISK] = useState(solidgaugeOptions);
  const [SWAP, setSWAP] = useState(solidgaugeOptions);
  const [RAMInfo, setRAMInfo] = useState({
    Used: "",
    Total: "",
  });
  const [DISKInfo, setDISKInfo] = useState({
    Used: "",
    TotalSize: "",
  });
  const [SWAPInfo, setSWAPInfo] = useState({
    Used: "",
    Total: "",
  });
  const [timeOfRunning, setTimeOfRunning] = useState("");
  const [isReboot, setIsReboot] = useState(false);
  const [isOpenRebootCFModal, setIsOpenRebootCFModal] = useState(false);

  useEffect(() => {
    if (!_.isEmpty(cpuData) && !_.isEqual(cpuData, curInformationCPU)) {
      if (isReboot) {
        setIsReboot(false);
        LibToast.toast("Reboot server successfully", "info");
        setIsOpenRebootCFModal(false);
      }

      var output = document.getElementById("progress");
      if (isSetup) output.innerHTML = "<div><img src='/loading.gif' /></div>";

      let CPUPercentage = !_.isEmpty(cpuData.CPUInfo.TotalCPUUsage)
        ? cpuData.CPUInfo.TotalCPUUsage.replace("%", "")
        : 0;
      let time = Math.floor(cpuData.Time / 1000) * 1000;

      const chart = chartRef.current.chart;
      const point = [new Date(time).getTime(), parseFloat(CPUPercentage)];
      const series = chart.series[0],
        shift = series.data.length > 20; // shift if the series is longer than 20
      chart.series[0].addPoint(point, true, shift);

      // RAM
      let ramInfo =
        !_.isEmpty(cpuData.MemoryInformation) && cpuData.MemoryInformation;
      let RAMPercentage = !_.isEmpty(ramInfo.Percentage)
        ? ramInfo.Percentage.replace("%", "")
        : "";

      let RAMseries = [
        {
          name: "Speed",
          data: [parseFloat(RAMPercentage)],
          dataLabels: {
            format:
              '<div style="text-align:center">' +
              '<span style="font-size:14px">{y} %</span>' +
              "</div>",
          },
          tooltip: {
            valueSuffix: " %",
          },
        },
      ];
      let RAMSolidgaugeOptions = _.cloneDeep(RAM);
      RAMSolidgaugeOptions.series = RAMseries;

      //SWAP
      let swapInfo =
        !_.isEmpty(cpuData.MemoryInformation.SWAP) &&
        cpuData.MemoryInformation.SWAP;
      let SWAPPercentage = !_.isEmpty(swapInfo.Percentage)
        ? swapInfo.Percentage.replace("%", "")
        : 0;

      let SWAPseries = [
        {
          name: "Speed",
          data: [parseFloat(SWAPPercentage)],
          dataLabels: {
            format:
              '<div style="text-align:center">' +
              '<span style="font-size:14px">{y} %</span>' +
              "</div>",
          },
          tooltip: {
            valueSuffix: " %",
          },
        },
      ];
      let SWAPSolidgaugeOptions = _.cloneDeep(SWAP);
      SWAPSolidgaugeOptions.series = SWAPseries;

      //CPU
      let totalCpu = !_.isEmpty(cpuData.CPUInfo)
        ? cpuData.CPUInfo.Totalcores
        : 0;
      let CPUseries = [
        {
          name: "Speed",
          data: [parseFloat(CPUPercentage)],
          dataLabels: {
            format:
              '<div style="text-align:center">' +
              '<span style="font-size:14px">{y} %</span>' +
              "</div>",
          },
          tooltip: {
            valueSuffix: " %",
          },
        },
      ];
      let CPUSolidgaugeOptions = _.cloneDeep(CPU);
      CPUSolidgaugeOptions.series = CPUseries;

      //Disk
      let diskInfo =
        !_.isEmpty(cpuData.DiskInformation) && cpuData.DiskInformation;
      let DiskPercentage = !_.isEmpty(diskInfo.Percentage)
        ? diskInfo.Percentage.replace("%", "")
        : 0;
      let DISKseries = [
        {
          name: "Speed",
          data: [parseFloat(DiskPercentage)],
          dataLabels: {
            format:
              '<div style="text-align:center">' +
              '<span style="font-size:14px">{y} %</span>' +
              "</div>",
          },
          tooltip: {
            valueSuffix: " %",
          },
        },
      ];
      let DISKSolidgaugeOptions = _.cloneDeep(DISK);
      DISKSolidgaugeOptions.series = DISKseries;

      let runningTime = "";
      if (
        !_.isEmpty(cpuData.BootTime) &&
        !_.isEmpty(cpuData.BootTime.BootTime)
      ) {
        let bootTime = moment(cpuData.BootTime.BootTime);
        let diffDays = parseInt(moment().diff(bootTime, "days"));
        let diffHours = parseInt(moment().diff(bootTime, "hours"));
        let diffMinutes = parseInt(moment().diff(bootTime, "minutes"));
        let diffSeconds = parseInt(moment().diff(bootTime, "seconds"));
        if (diffSeconds <= 5) {
          runningTime = "less than a minute";
        }
        if (diffMinutes > 0) {
          runningTime =
            diffMinutes === 1 ? `a minute` : `${diffMinutes} minutes`;
        }
        if (diffHours > 0) {
          runningTime = diffHours === 1 ? `an hour` : `${diffHours} hours`;
        }
        if (diffDays > 0) {
          runningTime = diffDays === 1 ? `a day` : `${diffDays} days`;
        }
      }
      setTimeout(() => {
        setCurInformationCPU(cpuData);
        if (!_.isEqual(RAM, RAMSolidgaugeOptions)) setRAM(RAMSolidgaugeOptions);
        if (!_.isEqual(RAMInfo, ramInfo)) setRAMInfo(ramInfo);
        if (!_.isEqual(SWAP, SWAPSolidgaugeOptions))
          setSWAP(SWAPSolidgaugeOptions);
        if (!_.isEqual(SWAPInfo, swapInfo)) setSWAPInfo(swapInfo);
        if (!_.isEqual(DISK, DISKSolidgaugeOptions))
          setDISK(DISKSolidgaugeOptions);
        if (!_.isEqual(DISKInfo, diskInfo)) setDISKInfo(diskInfo);
        if (!_.isEqual(CPU, CPUSolidgaugeOptions)) setCPU(CPUSolidgaugeOptions);
        if (!_.isEqual(totalCPU, totalCpu)) setTotalCPU(totalCpu);
        if (!_.isEqual(timeOfRunning, runningTime))
          setTimeOfRunning(runningTime);

        if (isSetup) {
          setIsSetup(false);
          output.innerHTML = "";
        }
      }, 2000);
    }
  }, [cpuData]);

  useEffect(() => {
    if (isReboot) {
      publishMessage(`${projectSetup.serial_number}/System`, {
        cmd: "reboot",
      });
    }
  }, [isReboot]);

  return (
    <div className="main">
      <div className={styles.overview}>
        {isOpenRebootCFModal && (
          <Modal
            isOpen={isOpenRebootCFModal}
            title="Reboot confirmation"
            footer={
              !isReboot && (
                <div className="d-flex w-100 flex-row justify-content-center">
                  <Button
                    className="me-1"
                    variant="white"
                    onClick={() => setIsOpenRebootCFModal(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    className="ms-1"
                    variant="dark"
                    onClick={() => setIsReboot(true)}
                  >
                    Reboot
                  </Button>
                </div>
              )
            }
            onClose={() => {
              !isReboot && setIsOpenRebootCFModal(false);
            }}
          >
            <div>
              <p
                style={{
                  fontSize: "18px",
                }}
              >
                {isReboot
                  ? "The system is rebooting. Please wait a moment."
                  : "Do you want to reboot the system?"}
              </p>
            </div>
          </Modal>
        )}
        <Breadcrumb
          routes={[
            {
              path: "/datalogger",
              name: "Dashboard",
            },
            {
              path: "/datalogger/overview",
              name: "Overview",
            },
          ]}
        />

        {!_.isEmpty(CPU) &&
          !_.isEmpty(RAM) &&
          !_.isEmpty(DISK) &&
          !_.isEmpty(SWAP) && (
            <div className={styles.outlet}>
              {<Outlet />}

              <div className={styles.system_info}>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                >
                  <rect width="18" height="18" fill="url(#system)" />
                  <defs>
                    <pattern
                      id="system"
                      patternContentUnits="objectBoundingBox"
                      width="1"
                      height="1"
                    >
                      <use
                        xlinkHref="#image0_470_1716"
                        transform="scale(0.015625)"
                      />
                    </pattern>
                    <image
                      id="image0_470_1716"
                      width="64"
                      height="64"
                      xlinkHref="data:image/png;base64,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"
                    />
                  </defs>
                </svg>
                <span>{`System: ${
                  !_.isEmpty(curInformationCPU.SystemInformation)
                    ? `${curInformationCPU.SystemInformation.System} ${curInformationCPU.SystemInformation.Version}`
                    : ""
                }`}</span>
                <span className={styles.uptime}>
                  Time of running: {!_.isEmpty(timeOfRunning) && timeOfRunning}
                </span>
                {!_.isEmpty(cpuData) && (
                  <Button
                    className="ms-5"
                    variant="dark"
                    onClick={() => setIsOpenRebootCFModal(!isOpenRebootCFModal)}
                  >
                    <Button.Image className="p-0" image={<RefreshIcon />} />
                    <Button.Text text="Reboot server" />
                  </Button>
                )}
              </div>

              <div className={styles.status}>
                <h2>Status</h2>
                <div className={styles.body_group}>
                  <div className="container-fluid">
                    <div className="row">
                      <div className="col-md-3">
                        <div className={styles.item}>
                          <p>CPU usage</p>
                          <div className="item-round">
                            <div className="chart_cpu">
                              <HighchartsReact
                                highcharts={Highcharts}
                                options={CPU}
                              />
                            </div>
                          </div>
                          <p>{totalCPU ? `${totalCPU} Core(s)` : ""}</p>
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className={styles.item}>
                          <p>RAM usage</p>
                          <div className="item-round">
                            <div className="chart_cpu">
                              <HighchartsReact
                                highcharts={Highcharts}
                                options={RAM}
                              />
                            </div>
                          </div>
                          <p>
                            {!_.isEmpty(RAMInfo.Used) &&
                            !_.isEmpty(RAMInfo.Total)
                              ? `${RAMInfo.Used} / ${RAMInfo.Total}`
                              : ""}
                          </p>
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className={styles.item}>
                          <p>Disk space</p>
                          <div className="item-round">
                            <div className="chart_cpu">
                              <HighchartsReact
                                highcharts={Highcharts}
                                options={DISK}
                              />
                            </div>
                          </div>
                          <p>
                            {!_.isEmpty(DISKInfo.Used) &&
                            !_.isEmpty(DISKInfo.TotalSize)
                              ? `${DISKInfo.Used} / ${DISKInfo.TotalSize}`
                              : ""}
                          </p>
                        </div>
                      </div>

                      <div className="col-md-3">
                        <div className={styles.item}>
                          <p>Swap usage</p>
                          <div className="item-round">
                            <div className="chart_cpu">
                              <HighchartsReact
                                highcharts={Highcharts}
                                options={SWAP}
                              />
                            </div>
                          </div>
                          <p>
                            {!_.isEmpty(SWAPInfo.Used) &&
                            !_.isEmpty(SWAPInfo.Total)
                              ? `${SWAPInfo.Used} / ${SWAPInfo.Total}`
                              : ""}
                          </p>
                        </div>
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
                          ref={chartRef}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className={styles.item_group}>
                      <div className={styles.title}>
                        <span
                          onClick={() => setTraffic(1)}
                          className={
                            styles.traffic +
                            " " +
                            (traffic === 1 ? styles.active : "")
                          }
                        >
                          Traffic
                        </span>{" "}
                        <span
                          onClick={() => setTraffic(2)}
                          className={
                            styles.disk_io +
                            " " +
                            (traffic === 2 ? styles.active : "")
                          }
                        >
                          Disk IO
                        </span>
                      </div>
                      <div className={styles.group_cpu_traffic}>
                        {traffic === 1 ? <Traffic /> : <DiskIO />}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
      </div>
    </div>
  );
}

export default Overview;
