import { ReactComponent as Temperature } from "../../../../../assets/images/temperature-2.svg";
import { ReactComponent as Humidity } from "../../../../../assets/images/humidity-2.svg";
import { ReactComponent as Battery } from "../../../../../assets/images/battery.svg";
import { ReactComponent as UPSImage } from "../../../../../assets/images/ups.svg";
import styles from "./UPS.module.scss";
import useUPS from "./useUPS";

function UPS() {
    const { tempBlockList, batteryBlockList } = useUPS();

    return (
        <div className={styles.ups}>
            <div className="d-flex gap-5 justify-content-center align-items-center flex-wrap">
                <div className="d-flex flex-column align-items-center gap-3">
                    <div className="d-flex align-items-stretch">
                        <div className={styles.icon}>
                            <Temperature style={{ width: 20, height: 20 }} />
                        </div>
                        <p className={styles.label}>TEMPERATURE</p>
                    </div>

                    <div className={styles["block-list"]}>
                        {
                            tempBlockList.map(item => (
                                <div key={item.id}>
                                    <p className={styles["block-text"]}>{item.text}</p>
                                    <p className={styles["block-value"]}>{item.value}</p>
                                    <p className={styles["block-unit"]}>{item.unit}</p>
                                </div>
                            ))
                        }
                    </div>

                    <div className={styles["block-list"]}>
                        {
                            tempBlockList.map(item => (
                                <div key={item.id}>
                                    <p className={styles["block-text"]}>{item.text}</p>
                                    <p className={styles["block-value"]}>{item.value}</p>
                                    <p className={styles["block-unit"]}>{item.unit}</p>
                                </div>
                            ))
                        }
                    </div>

                    <div className={styles["block-list"]}>
                        {
                            tempBlockList.map(item => (
                                <div key={item.id}>
                                    <p className={styles["block-text"]}>{item.text}</p>
                                    <p className={styles["block-value"]}>{item.value}</p>
                                    <p className={styles["block-unit"]}>{item.unit}</p>
                                </div>
                            ))
                        }
                    </div>
                </div>

                <div className="d-flex flex-column align-items-center gap-3">
                    <div className="d-flex align-items-stretch">
                        <div className={styles.icon}>
                            <Humidity style={{ width: 20, height: 20 }} />
                        </div>
                        <p className={styles.label}>BATTERY LEVEL</p>
                    </div>

                    <div className={styles["block-list"]}>
                        {
                            batteryBlockList.map(item => (
                                <div key={item.id}>
                                    <p className={styles["block-text"]}>
                                        <span>{item.text}</span>
                                        <Battery className="ms-5" />
                                    </p>
                                    <p className={styles["block-value"]}>{item.value}</p>
                                    <p className={`${styles["block-unit"]} ${styles.green}`}>{item.unit}</p>
                                </div>
                            ))
                        }
                    </div>

                    <div className={styles["block-list"]}>
                        {
                            batteryBlockList.map(item => (
                                <div key={item.id}>
                                    <p className={styles["block-text"]}>
                                        <span>{item.text}</span>
                                        <Battery className="ms-5" />
                                    </p>
                                    <p className={styles["block-value"]}>{item.value}</p>
                                    <p className={`${styles["block-unit"]} ${styles.green}`}>{item.unit}</p>
                                </div>
                            ))
                        }
                    </div>

                    <div className={styles["block-list"]}>
                        {
                            batteryBlockList.map(item => (
                                <div key={item.id}>
                                    <p className={styles["block-text"]}>
                                        <span>{item.text}</span>
                                        <Battery className="ms-5" />
                                    </p>
                                    <p className={styles["block-value"]}>{item.value}</p>
                                    <p className={`${styles["block-unit"]} ${styles.green}`}>{item.unit}</p>
                                </div>
                            ))
                        }
                    </div>
                </div>

                <UPSImage />
            </div>
        </div>
    );
}

export default UPS;