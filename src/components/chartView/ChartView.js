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
import DatePickerButton from '../../components/datePickerButton/DatePickerButton';

// init the module
highchartsGantt(Highcharts);
bellcurve(Highcharts);
if (typeof Highcharts === 'object') {
    HighchartsExporting(Highcharts)
}

highchartsMore(Highcharts);
solidGauge(Highcharts);
accessibility(Highcharts);


function ChartView({ dataDate, dataTime, options }) {
    const [showDate, setShowDate] = React.useState(0);
    const [showTime, setShowTime] = React.useState(0);


    
    /**
    * On click outsite box date
    * @author long.pham 2023-12-12
    * @return null
    */
    const useOutsideClickDate = (callback) => {
        const ref = React.useRef();
        React.useEffect(() => {
            const handleClickDate = (event) => {
                if (ref.current && !ref.current.contains(event.target)) {
                    callback();
                }
            };

            document.addEventListener('click', handleClickDate);

            return () => {
                document.removeEventListener('click', handleClickDate);
            };
        }, [ref]);

        return ref;
    };

    const handleClickOutsideDate = () => {
        setShowDate(0);
    };

    const ref = useOutsideClickDate(handleClickOutsideDate);

    const handleClickDate = () => {
        setShowDate(1);
    };

    const handleOnClickDate = (e) => {

    }

    /**
    * On click outsite box time
    * @author long.pham 2023-12-12
    * @return null
    */

    const useOutsideClickTime = (callback) => {
        const refTime = React.useRef();
        React.useEffect(() => {
            const handleClickTime = (event) => {
                if (refTime.current && !refTime.current.contains(event.target)) {
                    callback();
                }
            };

            document.addEventListener('click', handleClickTime);

            return () => {
                document.removeEventListener('click', handleClickTime);
            };
        }, [refTime]);

        return refTime;
    };

    const handleClickOutsideTime = () => {
        setShowTime(0);
    };

    const refTime = useOutsideClickTime(handleClickOutsideTime);

    const handleClickTime = () => {
        setShowTime(1);
    };

    const handleOnClickTime = (e) => {

    }


    

    return (
        <div className={styles.chart_view}>
            <div className={styles.box_charting}>
                <div className={styles.charting_filter}>
                    {dataDate &&
                        <div className={styles.filter_date}>
                            <div ref={ref} onClick={handleClickDate} className={styles.filter_active}>3 Days
                                <span className={styles.arrow_down + (showDate === 1 ? ` ${styles.on}` : "")} ><ArrowDown /></span>
                            </div>
                            <div className={styles.filter_date_dropdown + (showDate === 1 ? ` ${styles.on}` : "")}>
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

                    {dataTime && <div className={styles.filter_date}>
                        <div ref={refTime} onClick={handleClickTime} className={styles.filter_active}>15 Minutes
                            <span className={styles.arrow_down + (showTime === 1 ? ` ${styles.on}` : "")} ><ArrowDown /></span>
                        </div>
                        <div className={styles.filter_date_dropdown + (showTime === 1 ? ` ${styles.on}` : "")}>
                            {
                                dataDate.map((item, index) => (
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
                    <div className={styles.date_picker}>
                        <DatePickerButton
                            prevDate="Aug 18, 2023"
                            nextDate="Aug 20, 2023"
                        />
                    </div>


                    <div className={styles.download}>
                        <DownloadYellow />
                    </div>
                </div>

                {options && <div className={styles.charting}>
                    <HighchartsReact
                        highcharts={Highcharts}
                        options={options}
                        allowChartUpdate={false}
                        immutable={true}
                    />
                </div>}

            </div>
        </div>
    );
}

export default ChartView;