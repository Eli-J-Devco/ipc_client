import Breadcrumb from "../../../../components/breadCrumb/BreadCrumb";
import Button from "../../../../components/button/Button";
import Table from "../../../../components/table/Table";
import useAlarms from "./useAlarms";
import { ReactComponent as EditIcon } from "../../../../assets/images/edit.svg";
import { ReactComponent as RedWarningIcon } from "../../../../assets/images/warning-red.svg";
import Filter from "./filter/Filter";

function Alarms() {
    const { columns, alarmList, total, limit, offset, setLimit, setOffset, isExpand, handleOnExpand } = useAlarms();

    return (
        <div className="main">
            <Breadcrumb
                routes={[
                    {
                        path: "/datalogger",
                        name: "Dashboard"
                    },
                    {
                        path: "/datalogger/alarms",
                        name: "Alarms"
                    }
                ]}
            />

            <Filter
                isExpand={isExpand}
                onExpand={handleOnExpand}
            />

            <Table
                columns={columns}
                data={alarmList}
                control
                pagination={{
                    enable: true,
                    total,
                    offset,
                    limit,
                    setLimit,
                    setOffset,
                }}
                maxHeight={isExpand ? "calc(100vh - 630px)" : "calc(100vh - 230px)"}
                action={item => (
                    <div className="d-flex flex-wrap justify-content-center">
                        <Button.Image
                            image={<EditIcon />}
                        />
                    </div>
                )}
                alert={item => <RedWarningIcon/>}
            />
        </div>
    );
}

export default Alarms;