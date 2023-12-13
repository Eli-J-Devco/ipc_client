import { Outlet } from "react-router-dom";
import NavTabs from "../../../../components/navTabs/NavTabs";
import styles from './Trend.module.scss';

function Trend() {
    return (
        <div className={styles.trend}>
            <NavTabs
                routes={[
                    {
                        path: "/scada/trend",
                        name: "Realtime Trend"
                    },
                    {
                        path: "/scada/trend/historical",
                        name: "Historical Trend"
                    },
                    {
                        path: "/scada/trend/weather",
                        name: "Weather"
                    },
                    {
                        path: "/scada/trend/ups",
                        name: "UPS"
                    },
                    {
                        path: "/scada/trend/meter",
                        name: "Meter"
                    }
                ]}
                className={styles.tabs}
            />

            <div className={styles.outlet}>
                <Outlet />
            </div>
        </div>
    );
}

export default Trend;