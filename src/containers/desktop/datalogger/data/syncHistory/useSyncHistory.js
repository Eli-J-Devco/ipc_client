import { useState } from "react";
import Constants from "../../../../../utils/Constants";

function useSyncHistory() {
    const [total, setTotal] = useState(70);
    const [limit, setLimit] = useState(Constants.DEFAULT_PAGE_SIZE);
    const [offset, setOffset] = useState(0);
    const [columns, ] = useState([
        {
            id: 1,
            slug: "id",
            name: "No."
        }, {
            id: 2,
            slug: "name",
            name: "Name"
        }, {
            id: 3,
            slug: "modbus_port",
            name: "Modbus Port"
        }, {
            id: 4,
            slug: "modbus_device",
            name: "Modbus Device"
        }, {
            id: 5,
            slug: "ensure_dir",
            name: "ensureDir"
        }, {
            id: 6,
            slug: "source",
            name: "Source"
        }, {
            id: 7,
            slug: "FileName",
            name: "FileName"
        }, {
            id: 8,
            slug: "Synced",
            name: "Synced"
        }, {
            id: 9,
            slug: "deleted_file",
            name: "Deleted File"
        }, {
            id: 10,
            slug: "CreateTime",
            name: "Create Time"
        }, {
            id: 11,
            slug: "Updatetime",
            name: "Update Time"
        }, {
            id: 12,
            slug: "data",
            name: "Data"
        }, {
            id: 13,
            slug: "protocol",
            name: "Protocol"
        }, {
            id: 14,
            slug: "error",
            name: "Error"
        }, {
            id: 15,
            slug: "action",
            name: <div className="text-center">Actions</div>,
            width: 150
        }
    ]);
    const [history, ] = useState(Array.from({length: 20}, (_, index) => ({
        id: index + 1,
        name: (index + 1).toString().padStart(3, "0"),
        modbus_port: 1,
        modbus_device: 10,
        ensure_dir: "/MB-100/2023/08/141",
        source: "C:/Data/MB-100/2023/08/14/MB-100.20230814145435.log",
        FileName: "MB-100.20230814145435.log",
        Synced: "True",
        deleted_file: "True",
        CreateTime: "2023-08-14 14:54:36",
        Updatetime: "2023-08-15 09:30:37",
        data: "'2023-08-14 07:54:35',0,0,0,60,666",
        protocol: "FTP",
        error: "No",
    })));
    const [date, setDate] = useState(new Date());

    const handleOnDateChange = date => setDate(date);

    return {
        columns,
        history,
        total,
        setLimit,
        setOffset,
        date,
        handleOnDateChange
    };
}

export default useSyncHistory;