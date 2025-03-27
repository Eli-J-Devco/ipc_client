import { useState, useEffect } from "react";
import Constants from "../../../../../../utils/Constants";
import useAxiosPrivate from "../../../../../../hooks/useAxiosPrivate.js";

function useDataLogsTable({ uploadChannelId }) {
    const [total, setTotal] = useState(100);
    const [limit, setLimit] = useState(5);
    const [currentPageIndex, setCurrentPageIndex] = useState(1);
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
                var output = document.getElementById("progress");
                output.innerHTML = "<div><img src='/loading.gif' /></div>";
                const { data } = await axiosPrivate.post(
                    `${Constants.API_URL.SYNC_DATA.GET}${uploadChannelId}${
                        props?.isPagination ? 
                        `?page=${currentPageIndex}&limit=${limit}` : ""
                    }`
                )
                setTotal(data.total)
                setDataLogs(
                    data.data.map(item => {
                        var date = new Date(item.id+"Z")
                        var dateString =  date.getFullYear() + "-" +
                            ("0" + (date.getMonth()+1)).slice(-2) + "-" +
                            ("0" + date.getDate()).slice(-2) + " " +
                            ("0" + date.getHours()).slice(-2) + ":" +
                            ("0" + date.getMinutes()).slice(-2) + ":" +
                            ("0" + date.getSeconds()).slice(-2);
                        return { ...item, id: dateString}
                    })
                )

            } catch (e) {
                console.error(e);
            } finally {
                output.innerHTML = ""
            }
        }
        fetchData({ isPagination: true })
    }, [currentPageIndex, limit])

    return {
        dataLogs,
        setDataLogs,
        total,
        setTotal,
        limit,
        setLimit,
        currentPageIndex,
        setCurrentPageIndex,
        columns
    };
}

export default useDataLogsTable;
