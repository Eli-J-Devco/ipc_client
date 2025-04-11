import {
    getCoreRowModel,
    useReactTable,
  } from "@tanstack/react-table";
  import isArray from "lodash/isArray";
  import { useEffect, useMemo, useState } from "react";
  import Constants from "../../utils/Constants";
  
  function useTableNW({
    columns,
    data,
    pagination,
    slugProps,
  }) {
    const [pageCount, setPageCount] = useState(-1);
    const {
      total,
      limit,
      setLimit,
      currentPageIndex,
      setCurrentPageIndex,
    } = pagination || {};
  
    const columnDef = useMemo(
      () =>
        isArray(columns)
          ? columns.map((item) => ({
              id: item.id,
              accessorKey: item.slug,
              header: item.name,
              size: item.width,
              cell: ({ column, row, getValue }) => {
                const slug = column.columnDef.accessorKey;
                const value = getValue();
                return typeof slugProps[slug] === "function"
                  ? slugProps[slug](row.original, row.index)
                  : value;
              },
            }))
          : columns?.columnDefs || columns || []
    ,[columns, slugProps]);

    const table = useReactTable({
      data,
      columns: columnDef,
      getCoreRowModel: getCoreRowModel(),
      manualPagination: true,
      pageCount,
    });
  
    // pagination
    const { pageIndex, pageSize } = table.getState().pagination;
  
    useEffect(() => {
        var maxPageSize = total;
      
        if (pageSize !== limit && setLimit) {
            maxPageSize = Math.min(
            maxPageSize,
            limit ? limit : Constants.DEFAULT_PAGE_SIZE
            );
            table.setPageSize(maxPageSize);
            setLimit(maxPageSize);
            return;
        }

        maxPageSize = Math.min(maxPageSize, pageSize);
        if (!limit && setLimit) setLimit(maxPageSize);
        if (maxPageSize !== pageSize) table.setPageSize(maxPageSize);
        setPageCount(Math.ceil(total / maxPageSize)); 
    }, [total, limit, pageSize, setLimit, table]);
  
    useEffect(() => {
        if (setCurrentPageIndex) {
            if (!isNaN(pageIndex)) {
                setCurrentPageIndex(pageIndex + 1);
            }
        }
    }, [
      pageIndex,
      pageSize,
      table,
    ]);

    useEffect(() => {
        table.setPageIndex(0)
        setLimit(Constants.DEFAULT_PAGE_SIZE)
        if (total === 0) {
            setPageCount(0)
        }
    }, [total])
  
    const handleOnChangePageSize = (e) => {
      const pageSize = Number(e.value);
      table.setPageSize(pageSize);
      table.setPageIndex(0);
      setCurrentPageIndex(1)
      if (setLimit) setLimit(pageSize);
      if (total) setPageCount(Math.ceil(total / pageSize));
    };


    return {
      table,
      handleOnChangePageSize,
    };
  }
  
  export default useTableNW;
  