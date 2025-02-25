import { useState, useEffect } from "react";
import Constants from "../../../../../../utils/Constants";
import useAxiosPrivate from "../../../../../../hooks/useAxiosPrivate.js";

function useDataLogsTable({ uploadChannelId }) {
    const [total, setTotal] = useState(100);
    const [limit, setLimit] = useState(5);
    const [offset, setOffset] = useState(0);
    const [dataLogs, setDataLogs] = useState();

    const axiosPrivate = useAxiosPrivate();
    const columns = [
        {
            id: 1,
            slug: "id",
            name: "ID",
        }, {
            id: 2,
            slug: "filename",
            name: "File Name"
        }, {
            id: 3,
            slug: "device.name",
            name: "Device Name"
        }, 
    ];

    useEffect(() => {
        async function fetchData(props) {
            try {
                const page = (offset/limit) + 1
                const { data } = await axiosPrivate.post(
                    `${Constants.API_URL.SYNC_DATA.GET}${uploadChannelId}${
                        props?.isPagination ? 
                        `?page=${page}&limit=${limit}` : ""
                    }`
                )
                setTotal(data.total)
                setDataLogs(data.data);
            } catch (e) {
                console.error(e);
            }
        }
        fetchData({ isPagination: true })
    }, [limit, offset, total])

    return {
        dataLogs,
        setDataLogs,
        total,
        setTotal,
        limit,
        setLimit,
        offset,
        setOffset,
        columns
    };
}

export default useDataLogsTable;
