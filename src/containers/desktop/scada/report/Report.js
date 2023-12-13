import styles from './Report.module.scss';
import Breadcrumb from "../../../../components/breadCrumb/BreadCrumb";
function Report() {
    return (
        <div className={styles.report}>
            <Breadcrumb
                routes={[
                    {
                        path: "/scada/overview",
                        name: "SCADA"
                    },
                    {
                        path: "/scada/report",
                        name: "Report"
                    }
                ]}
            />

            
            <div className={styles.report_body}>
               Report
            </div>
        </div>
    );
}

export default Report;