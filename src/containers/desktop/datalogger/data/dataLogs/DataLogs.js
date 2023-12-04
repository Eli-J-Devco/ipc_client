import styles from "./DataLogs.module.scss";

function DataLogs() {
    return (
        <div className={styles["data-logs"]} >
            <div className={styles.section} >
                <div className={styles.title}>
                    Data Logs Awaiting Upload on Channel 1
                </div>

                <div className={styles.body}>
                    No logs found; all uploaded.
                </div>
            </div>

            <div className={styles.section} >
                <div className={styles.title}>
                    Data Logs Awaiting Upload on Channel 2
                </div>

                <div className={styles.body}>
                    No logs found; channel disabled.
                </div>
            </div>

            <div className={styles.section} >
                <div className={styles.title}>
                    Data Logs Awaiting Upload on Channel 3
                </div>

                <div className={styles.body}>
                    No logs found; channel disabled.
                </div>
            </div>

            <div className={styles.section} >
                <div className={styles.title}>
                    Data Logs Awaiting Upload on Channel 4
                </div>

                <div className={styles.body}>
                    No logs found; channel disabled.
                </div>
            </div>
        </div>
    );
}

export default DataLogs;