import ChartView from "../../../../../components/chartView/ChartView";
import BuiltIn from "./builtIn/BuiltIn";
import Components from "./components/Components";
import useMeter from "./useMeter";
import styles from "./Meter.module.scss";

function Meter() {
    const { options } = useMeter();
    
    return (
        <div className={styles.meter}>
            <div className={styles.components} >
                <div className="row g-3">
                    <div className="col-12 col-md-4 col-lg-3 col-xxl-2">
                        <Components />
                    </div>

                    <div className="col-12 col-md-8 col-lg-9 col-xxl-10">
                        <BuiltIn />
                    </div>
                </div>
            </div>

            <div className={styles.chart}>
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
                    filterPosition="right"
                    chartTypeEnabled
                    sortEnabled
                    legendEnabled
                    additionalEnabled
                />
            </div>
        </div>
    );
}

export default Meter;