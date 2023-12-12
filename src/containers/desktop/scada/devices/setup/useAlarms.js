import { useState } from "react";
import Constants from "../../../../../utils/Constants";
import { ReactComponent as NoAlarmIcon } from "../../../../../assets/images/greencheck.svg";

function useAlarms() {
    const [total, setTotal] = useState(100);
    const [limit, setLimit] = useState(Constants.DEFAULT_PAGE_SIZE);
    const [offset, setOffset] = useState(0);
    const [columns, ] = useState([
        {
            id: 1,
            slug: "alert",
            name: <NoAlarmIcon />,
        }, {
            id: 2,
            slug: "opened",
            name: "Opened"
        }, {
            id: 4,
            slug: "open_period",
            name: "Open Period"
        }, {
            id: 7,
            slug: "error_level",
            name: "Error Level"
        }, {
            id: 8,
            slug: "error_type",
            name: "Error Type"
        }, {
            id: 9,
            slug: "issue",
            name: "Issue"
        }
    ]);
    const [alarmList, ] = useState(Array.from({length: 20}, () => ({
        id: "1",
        opened: "08/21/2023 13:40 PM",
        closed: "NaN",
        open_period: "NaN",
        device: "Inverter 01",
        value: "1",
        error_level: "ERROR",
        error_type: "DC soft starting fault",
        issue: "DC soft starting fault"
    })));
    const [isExpand, setIsExpand] = useState(true);

    const handleOnExpand = () => setIsExpand(!isExpand);

    return {
        columns,
        alarmList,
        total,
        setLimit,
        setOffset,
        isExpand,
        handleOnExpand
    };
}

export default useAlarms;