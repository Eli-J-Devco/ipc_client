import Table from "../../../../../../components/table/Table";
import useDataLogsTable from "./useDataLogsTable";

function DataLogsTable({ uploadChannelId }) {
    const { 
        dataLogs, 
        total,
        limit, setLimit, 
        offset, setOffset,
        columns
     } = useDataLogsTable({ uploadChannelId });
     
    return (
        <Table
            maxHeight="calc(100vh - 300px)"
            columns={columns}
            data={dataLogs}
            control={true}
            pagination={{
                enable: true,
                total,
                limit,
                setLimit,
                offset,
                setOffset,
            }}
        />
    );
}

export default DataLogsTable;