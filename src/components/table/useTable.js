import {
    getCoreRowModel,
    useReactTable,
} from '@tanstack/react-table'
import isArray from 'lodash/isArray';
import { useEffect, useMemo, useState } from 'react';
import { useClickAway } from "@uidotdev/usehooks";
import Constants from '../../utils/Constants';

function useTable({ columns, data, total, setLimit, setOffset, slugProps }) {
    const [columnVisibility, setColumnVisibility] = useState(columns.reduce((acc, cur) => ({ ...acc, [cur.id]: true}), {}));
    const [columnSizing, setColumnSizing] = useState(columns.reduce((acc, cur) => ({ ...acc, [cur.id]: cur.width ? cur.width : 100}), {}));
    const [columnOrder, setColumnOrder] = useState(columns.map(column => column.id.toString()));
    const [isDropDownsShow, setIsDropDownsShow] = useState(false);
    const dropDownsRef = useClickAway(() => setIsDropDownsShow(false));
    const [pageCount, setPageCount] = useState(-1);
    
    const columnDef = useMemo(
        () => isArray(columns) ?
            columns.map(item => ({
                id: item.id,
                accessorKey: item.slug,
                header: item.name,
                cell: ({ column, row, getValue }) => {
                    const slug = column.columnDef.accessorKey;
                    const value = getValue();
                    return (typeof slugProps[slug] === "function") ? slugProps[slug](row.original, row.index) : value
                }
            }))
            : []
        , []
    );

    const table = useReactTable({
        data,
        columns: columnDef,
        getCoreRowModel: getCoreRowModel(),
        state: {
            columnVisibility,
            columnSizing,
            columnOrder
        },
        onColumnVisibilityChange: setColumnVisibility,
        columnResizeMode: "onChange",
        onColumnSizingChange: setColumnSizing,
        onColumnOrderChange: setColumnOrder,
        manualPagination: true,
        pageCount
    });

    const handleOpenDropDowns = () => setIsDropDownsShow(true);

    // pagination
    const { pageIndex, pageSize } = table.getState().pagination;

    useEffect(() => {
        table.setPageSize(Constants.DEFAULT_PAGE_SIZE);
        if (setLimit) setLimit(Constants.DEFAULT_PAGE_SIZE);
    }, []);

    useEffect(() => {
        if (total) setPageCount(() => Math.ceil(total / pageSize));
    }, [total]);

    useEffect(() => {
        if (setOffset) setOffset(pageIndex * pageSize);
    }, [pageIndex, pageSize]);

    const handleOnChangePageSize = e => {
        const pageSize = Number(e.target.value);
        table.setPageSize(pageSize);
        table.setPageIndex(0);
        if (setLimit) setLimit(pageSize);
        if (total) setPageCount(Math.ceil(total / pageSize));
    }

    return {
        table,
        isDropDownsShow,
        handleOpenDropDowns,
        dropDownsRef,
        handleOnChangePageSize
    };
}

export default useTable;