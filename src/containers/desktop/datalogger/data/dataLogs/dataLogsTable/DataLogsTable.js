import TableNW from "../../../../../../components/tableNW/TableNW";
import useDataLogsTable from "./useDataLogsTable";

function DataLogsTable({ uploadChannelId }) {
    const { 
        dataLogs, 
        total,
        limit, setLimit, 
        currentPageIndex, setCurrentPageIndex,
        columns
     } = useDataLogsTable({ uploadChannelId });
     
    return (
        <TableNW
            maxHeight="calc(100vh - 300px)"
            columns={columns}
            data={dataLogs}
            control={true}
            pagination={{
                enable: true,
                total,
                limit,
                setLimit,
                currentPageIndex,
                setCurrentPageIndex
            }}
        />
    );
}

export default DataLogsTable;