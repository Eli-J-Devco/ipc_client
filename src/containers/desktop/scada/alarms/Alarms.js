import styles from './Alarms.module.scss';
import Breadcrumb from "../../../../components/breadCrumb/BreadCrumb";
import Button from "../../../../components/button/Button";
import Table from "../../../../components/table/Table";
import useAlarms from "./useAlarms";
import { ReactComponent as EditIcon } from "../../../../assets/images/edit.svg";
import { ReactComponent as RedWarningIcon } from "../../../../assets/images/warning-red.svg";
import Filter from "./filter/Filter";

function Alarms() {
    const { columns, alarmList, total, setLimit, setOffset, isExpand, handleOnExpand } = useAlarms();

    return (
        <div className={styles.alarms}>
            <Breadcrumb
                routes={[
                    {
                        path: "/scada/overview",
                        name: "SCADA"
                    },
                    {
                        path: "/scada/alarms",
                        name: "Alarms"
                    }
                ]}
            />

            <Filter
                isExpand={isExpand}
                onExpand={handleOnExpand}
            />

            <div className={styles.alarms_body}>
                <Table
                    control={true}
                    columns={columns}
                    data={alarmList}
                    pagination={{
                        enable: true,
                        total: total,
                        setLimit: setLimit,
                        setOffset: setOffset
                    }}
                    maxHeight={isExpand ? "calc(100vh - 650px)" : "calc(100vh - 250px)"}
                    action={item => (
                        <div className="d-flex flex-wrap justify-content-center">
                            <Button.Image
                                image={<EditIcon />}
                            />
                        </div>
                    )}
                    alert={item => <RedWarningIcon />}
                />
            </div>
        </div>
    );
}

export default Alarms;