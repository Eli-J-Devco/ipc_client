import {
    getCoreRowModel,
    getExpandedRowModel,
    useReactTable,
} from '@tanstack/react-table'
import isArray from 'lodash/isArray';
import { useEffect, useMemo, useState } from 'react';
import { useClickAway } from "@uidotdev/usehooks";
import Constants from '../../utils/Constants';

function useTable({
    columns,
    data,
    statusFilter,
    total,
    offset,
    setLimit,
    setOffset,
    rowSelection,
    setRowSelection,
    slugProps
}) {
    // const columnsDefault = isArray(columns) ? columns : columns?.columnDefs || columns || [];
    // const [columnVisibility, setColumnVisibility] = useState(columnsDefault.reduce((acc, cur) => ({ ...acc, [cur.id]: true }), {}));
    // const [columnSizing, setColumnSizing] = useState(columnsDefault.reduce((acc, cur) => ({ ...acc, [cur.id]: cur.width ? cur.width : 100 }), {}));
    // const [columnOrder, setColumnOrder] = useState(columnsDefault.map(column => column.id.toString()));
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
            : columns?.columnDefs || columns || []
        , []
    );

    const table = useReactTable({
        data,
        columns: columnDef,
        getCoreRowModel: getCoreRowModel(),
        getExpandedRowModel: getExpandedRowModel(),
        state: {
            // columnVisibility,
            // columnSizing,
            // columnOrder,
            rowSelection: rowSelection || {}
        },
        getSubRows: (row) => row.subRows,
        // onColumnVisibilityChange: setColumnVisibility,
        // columnResizeMode: "onChange",
        // onColumnSizingChange: setColumnSizing,
        // onColumnOrderChange: setColumnOrder,
        onRowSelectionChange: setRowSelection || (() => { }),
        enableColumnResizing: true,
        enableRowSelection: true,
        enableMultiRowSelection: true,
        enableSubRowSelection: true,
        manualPagination: true,
        pageCount
    });

    const handleOpenDropDowns = () => setIsDropDownsShow(true);

    // pagination
    const { pageIndex, pageSize } = table.getState().pagination;

    useEffect(() => {
        setTimeout(() => {
            table.setPageSize(Constants.DEFAULT_PAGE_SIZE);
            table.setPageIndex(0);
            if (setLimit) setLimit(Constants.DEFAULT_PAGE_SIZE);
        }, 100);
    }, []);

    useEffect(() => {
        table.setPageIndex(offset / pageSize);
    }, [offset, pageSize, table]);

    useEffect(() => {
        total && setTimeout(() => {
            setPageCount(Math.ceil(total / pageSize));
        }, 100);
    }, [total, pageSize]);

    useEffect(() => {
        if (setOffset) setOffset(pageIndex * pageSize);
    }, [pageIndex, pageSize]);

    useEffect(() => {
        if (statusFilter !== undefined) {
            table.setPageIndex(0);
            if (setOffset) setOffset(0);
        }
    }, [statusFilter]);

    const handleOnChangePageSize = e => {
        const pageSize = Number(e.target.value);
        table.setPageSize(pageSize);
        table.setPageIndex(0);
        setOffset(0);
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