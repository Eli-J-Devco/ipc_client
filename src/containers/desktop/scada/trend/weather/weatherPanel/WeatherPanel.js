import { ReactComponent as Temperature } from "../../../../../../assets/images/temperature-2.svg";
import { ReactComponent as WindDirection } from "../../../../../../assets/images/compass.svg";
import { ReactComponent as Humidity } from "../../../../../../assets/images/humidity-2.svg";
import { ReactComponent as WindSpeed } from "../../../../../../assets/images/wind.svg";
import { ReactComponent as Sun } from "../../../../../../assets/images/sun.svg";
import styles from "./WeatherPanel.module.scss";

function WeatherPanel() {
    return (
        <div className={styles["weather-panel"]}>
            <div className="row gy-5 w-100 align-items-center">
                <div className="col-6 col-sm-4 col-lg-2 col-xxl-6">
                    <div className={styles["weather-item"]}>
                        <div className={styles.icon} >
                            <Temperature />
                        </div>
                        
                        <div>
                            <p className={styles.value}>35.5°</p>
                            <p className={styles.label}>Ambient Temp</p>
                        </div>
                    </div>
                </div>

                <div className="col-6 col-sm-4 col-lg-2 col-xxl-6">
                    <div className={styles["weather-item"]}>
                        <div className={styles.icon} >
                            <Temperature />
                        </div>

                        <div>
                            <p className={styles.value}>35.5°</p>
                            <p className={styles.label}>PV Temp</p>
                        </div>
                    </div>
                </div>

                <div className="col-6 col-sm-4 col-lg-2 col-xxl-6">
                    <div className={styles["weather-item"]}>
                        <div className={styles.icon} >
                            <WindDirection />
                        </div>

                        <div>
                            <p className={styles.value}>332.5°</p>
                            <p className={styles.label}>Wind Direction</p>
                        </div>
                    </div>
                </div>
                
                <div className="col-6 col-sm-4 col-lg-2 col-xxl-6">
                    <div className={styles["weather-item"]}>
                        <div className={styles.icon} >
                            <Humidity />
                        </div>

                        <div>
                            <p className={styles.value}>75%</p>
                            <p className={styles.label}>Humidity</p>
                        </div>
                    </div>
                </div>

                <div className="col-6 col-sm-4 col-lg-2 col-xxl-6">
                    <div className={styles["weather-item"]}>
                        <div className={styles.icon} >
                            <WindSpeed />
                        </div>

                        <div>
                            <p className={styles.value}>3.5 m/s</p>
                            <p className={styles.label}>Wind Speed</p>
                        </div>
                    </div>
                </div>

                <div className="col-6 col-sm-4 col-lg-2 col-xxl-6">
                    <div className={styles["weather-item"]}>
                        <div className={styles.icon} >
                            <Sun />
                        </div>

                        <div>
                            <p className={styles.value}>190.5 W/m<sup>2</sup></p>
                            <p className={styles.label}>Irradiance</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default WeatherPanel;