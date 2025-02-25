import styles from "./DataLogs.module.scss";
import DataLogsTable from "./dataLogsTable/DataLogsTable";
import useDataLogs from "./useDataLogs";

function DataLogs() {
    const { data } = useDataLogs()
    return (
        <div className={styles["data-logs"]} >
            <div className={styles.section} >
                {data && data.map(item => {
                    return (
                    <div key={item.id}>
                        <div className={styles.title}>
                            Data Logs Awaiting Upload on {item.name}
                        </div>
                        {item.enable ? 
                            <div className={styles.body}>
                                <DataLogsTable uploadChannelId={item.id} />
                            </div> 
                            :
                            <div className={styles.body}>
                                No logs found; channel disabled.
                            </div>
                        }
                    </div>
                    )
                })}
                
            </div>
        </div>
    );
}

export default DataLogs;
