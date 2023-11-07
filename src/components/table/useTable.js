import {
    getCoreRowModel,
    useReactTable,
} from '@tanstack/react-table'
import isArray from 'lodash/isArray';
import { useState } from 'react';
import { useClickAway } from "@uidotdev/usehooks";

function useTable({ columns, data, slugProps }) {
    const [columnVisibility, setColumnVisibility] = useState(columns.reduce((acc, cur) => ({ ...acc, [cur.id]: true}), {}));
    const [columnSizing, setColumnSizing] = useState(columns.reduce((acc, cur) => ({ ...acc, [cur.id]: 150}), {}));
    const [isDropDownsShow, setIsDropDownsShow] = useState(false);
    const dropDownsRef = useClickAway(() => setIsDropDownsShow(false));
    
    const columnDef = isArray(columns) ?
        (
            columns.map(item => ({
                id: item.id,
                accessorKey: item.slug,
                header: item.name,
                cell: ({ column, row, getValue }) => {
                    const slug = column.columnDef.accessorKey;
                    const value = getValue();

                    return (typeof slugProps[slug] === "function") ? (
                        slugProps[slug](value ? value : row.original)
                    ) : (
                        value
                    )
                }
            }))
        ) : (
            []
        );

    const table = useReactTable({
        data,
        columns: columnDef,
        getCoreRowModel: getCoreRowModel(),
        state: {
            columnVisibility,
            columnSizing
        },
        onColumnVisibilityChange: setColumnVisibility,
        columnResizeMode: "onChange",
        onColumnSizingChange: setColumnSizing
    });

    const handleOpenDropDowns = () => setIsDropDownsShow(true);

    return {
        table,
        isDropDownsShow,
        handleOpenDropDowns,
        dropDownsRef
    };
}

export default useTable;