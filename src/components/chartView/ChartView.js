import React from "react";
import styles from './ChartView.module.scss';
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official';
import highchartsGantt from "highcharts/modules/gantt";
import HighchartsExporting from 'highcharts/modules/exporting';
import bellcurve from "highcharts/modules/histogram-bellcurve";
import highchartsMore from "highcharts/highcharts-more.js";
import solidGauge from "highcharts/modules/solid-gauge.js";
import accessibility from 'highcharts/modules/accessibility.js';
import { ReactComponent as ArrowDown } from "../../assets/images/arrow_down.svg";
import { ReactComponent as DownloadYellow } from "../../assets/images/download_yellow.svg";
import { ReactComponent as Sort } from "../../assets/images/sort.svg";
import DatePickerButton from '../../components/datePickerButton/DatePickerButton';
import { useClickAway } from "@uidotdev/usehooks";
import Button from "../button/Button";
import FormInput from "../formInput/FormInput";

// init the module
highchartsGantt(Highcharts);
bellcurve(Highcharts);
if (typeof Highcharts === 'object') {
    HighchartsExporting(Highcharts)
}

highchartsMore(Highcharts);
solidGauge(Highcharts);
accessibility(Highcharts);


function ChartView({ dataDate, dataTime, options, datePickerEnabled = true, downloadEnabled = true, chartTypeEnabled, sortEnabled, legendEnabled, additionalEnabled, filterPosition = "left" }) {
    const [showDate, setShowDate] = React.useState(false);
    const [showTime, setShowTime] = React.useState(false);
    const [showLegend, setShowLegend] = React.useState(true);
    const [showAdditional, setShowAdditional] = React.useState(false);
    const refDate = useClickAway(() => setShowDate(false));
    const refTime = useClickAway(() => setShowTime(false));

    const handleClickDate = () => setShowDate(true);

    const handleOnClickDate = (e) => {

    }

    const handleClickTime = () => setShowTime(true);

    const handleOnClickTime = (e) => {

    }

    const handleOnLegendChange = () => setShowLegend(!showLegend);
    const handleOnAdditionalChange = () => setShowAdditional(!showAdditional);

    return (
        <div className={styles.chart_view}>
            <div className={styles.box_charting}>
                <div className={styles.charting_filter}>
                    <div
                        className="d-flex align-items-center gap-2 flex-wrap"
                        style={{ order: filterPosition === "right" ? 2 : 1 }}
                    >
                        {dataDate &&
                            <div className={styles.filter_date}>
                                <div onClick={handleClickDate} className={styles.filter_active}>3 Days
                                    <span className={styles.arrow_down + (showDate ? ` ${styles.on}` : "")} ><ArrowDown /></span>
                                </div>
                                <div ref={refDate} className={styles.filter_date_dropdown + (showDate ? ` ${styles.on}` : "")}>
                                    {
                                        dataDate.map((item, index) => (
                                            <div
                                                key={index}
                                                className={styles.date_item + (item.active === 1 ? " " + styles.active : "")}
                                                onClick={() => handleOnClickDate(item)}
                                            >
                                                {item.name}
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        }

                        {dataTime &&
                            <div className={styles.filter_date}>
                                <div onClick={handleClickTime} className={styles.filter_active}>15 Minutes
                                    <span className={styles.arrow_down + (showTime ? ` ${styles.on}` : "")} ><ArrowDown /></span>
                                </div>
                                <div ref={refTime} className={styles.filter_date_dropdown + (showTime ? ` ${styles.on}` : "")}>
                                    {
                                        dataTime.map((item, index) => (
                                            <div
                                                key={index}
                                                className={styles.date_item + (item.active === 1 ? " " + styles.active : "")}
                                                onClick={() => handleOnClickTime(item)}
                                            >
                                                {item.name}
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        }

                        {
                            datePickerEnabled &&
                            <div className={styles.date_picker}>
                                <DatePickerButton
                                    prevDate="Aug 18, 2023"
                                    nextDate="Aug 20, 2023"
                                />
                            </div>
                        }
                    </div>

                    <div
                        className="d-flex align-items-center gap-2 flex-wrap"
                        style={{ order: filterPosition === "right" ? 1 : 2 }}
                    >
                        {downloadEnabled &&
                            <div className={styles.download}>
                                <DownloadYellow />
                            </div>
                        }

                        {chartTypeEnabled &&
                            <Button
                                variant="white"
                                className={styles.btn_chart}
                            >
                                <Button.Text text={"Chart Type"} />
                            </Button>
                        }

                        {sortEnabled &&
                            <Button
                                variant="white"
                                className={styles.btn_chart}
                            >
                                <Button.Image image={<Sort />} />
                                <Button.Text
                                    text={"Name - Ascending"}
                                    className="mx-2"
                                />
                                <Button.Image image={<ArrowDown />} />
                            </Button>
                        }

                        {legendEnabled &&
                            <FormInput.Check
                                label={"Legend"}
                                name="legend"
                                type="switch"
                                checked={showLegend}
                                onChange={handleOnLegendChange}
                            />
                        }

                        {additionalEnabled &&
                            <FormInput.Check
                                label={"Show Additional Data"}
                                name="additional-data"
                                type="switch"
                                checked={showAdditional}
                                onChange={handleOnAdditionalChange}
                            />
                        }
                    </div>
                </div>

                {options && <div className={styles.charting}>
                    <HighchartsReact
                        highcharts={Highcharts}
                        options={options}
                        allowChartUpdate={true}
                        immutable={true}
                    />
                </div>}

            </div>
        </div>
    );
}

export default ChartView;