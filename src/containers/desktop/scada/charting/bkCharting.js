import styles from './Charting.module.scss';
import Breadcrumb from "../../../../components/breadCrumb/BreadCrumb";
function Charting() {
    return (
        <div className={styles.charting}>
            <Breadcrumb
                routes={[
                    {
                        path: "/scada/overview",
                        name: "SCADA"
                    },
                    {
                        path: "/scada/charting",
                        name: "Charting"
                    }
                ]}
            />

            
            <div className={styles.charting_body}>
               Charting
            </div>
        </div>
    );
}

export default Charting;