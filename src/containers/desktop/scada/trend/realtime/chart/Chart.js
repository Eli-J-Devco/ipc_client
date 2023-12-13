import ChartView from "../../../../../../components/chartView/ChartView";
import useChart from "./useChart";
import styles from "./Chart.module.scss";
import Button from "../../../../../../components/button/Button";

function Chart({ index }) {
    const { options } = useChart(index);

    return (
        <div className={styles["chart-wrapper"]}>
            <div className={styles.header}>
                <span>
                    <strong>Device: </strong>
                    inv001
                </span>
                
                <Button
                    variant="yellow"
                    className="float-end"
                >
                    <Button.Text
                        text="Select"
                    />
                </Button>
            </div>
            
            <div className={styles.chart}>
                <ChartView
                    options={options}
                    datePickerEnabled={false}
                    downloadEnabled={false}
                />
            </div>
        </div>
    );
}

export default Chart;