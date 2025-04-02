import { useState, useEffect } from "react";
import Constants from "../../../../utils/Constants";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate.js";
import { ReactComponent as NoAlarmIcon } from "../../../../assets/images/greencheck.svg";

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
            id: 3,
            slug: "closed",
            name: "Closed"
        }, {
            id: 4,
            slug: "create_date",
            name: "Create Date"
        }, {
            id: 5,
            slug: "device.name",
            name: "Device"
        }, {
            id: 6,
            slug: "error.value",
            name: "Value"
        }, {
            id: 7,
            slug: "error.error_level.name",
            name: "Error Level"
        }, {
            id: 8,
            slug: "error.error_type.name",
            name: "Error Type"
        }, {
            id: 9,
            slug: "error.message",
            name: "Message"
        }, {
            id: 10,
            slug: "action",
            name: <div className="text-center">Actions</div>
        }
    ]);
    const [alarmList, setAlarmList] = useState();
    const [isExpand, setIsExpand] = useState(false);

    const axiosPrivate = useAxiosPrivate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await axiosPrivate.post(
                    Constants.API_URL.ALARM.LIST
                )
                setAlarmList(data)
            } catch (e) {
                console.log(e)
            }
        }
        fetchData()
    }, [])
    const handleOnExpand = () => setIsExpand(!isExpand);

    return {
        columns,
        alarmList,
        total,
        limit,
        setLimit,
        offset,
        setOffset,
        isExpand,
        handleOnExpand
    };
}

export default useAlarms;