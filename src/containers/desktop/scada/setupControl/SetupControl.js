import { Outlet } from "react-router-dom";
import NavTabs from "../../../../components/navTabs/NavTabs";
import styles from './SetupControl.module.scss';

function Trend() {
    return (
        <div className={styles.trend}>
            <NavTabs
                routes={[
                    {
                        path: "/scada/setup-control",
                        name: "Basic"
                    },
                    {
                        path: "/scada/setup-control/export-limitation-control",
                        name: "Export Limitation Control"
                    },
                    {
                        path: "/scada/setup-control/schedule-control",
                        name: "Schedule Control"
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