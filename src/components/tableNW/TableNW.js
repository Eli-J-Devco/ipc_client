import { flexRender } from "@tanstack/react-table";
import styles from "./TableNW.module.scss";
import useTableNW from "./useTableNW";
import Pagination from "./pagination/Pagination";
import Constants from "../../utils/Constants";
import FormInput from "../formInput/FormInput";


function TableNW({
  control,
  variant,
  className,
  maxHeight,
  columns,
  data,
  resizable,
  draggable,
  pagination,
  selectRow,
  emptyString,
  ...slugProps
}) {
  const {
    table,
    handleOnChangePageSize,
  } = useTableNW({
    columns,
    data,
    pagination,
    slugProps,
  });
  return (
    <div>
      <div
        className={`${styles["table-wrapper"]} ${className ? className : ""}`}
        style={{ maxHeight }}
      >
        <table
          className={`${styles.table} ${variant ? styles[variant] : ""}`}
          style={{ minWidth: table.getTotalSize() ? table.getTotalSize() : 0 }}
        >
          <thead id="table-header">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup?.id} className={styles["header-row"]}>
                {headerGroup.headers.map((header) => (
                    <th
                        key={header.id}
                        colSpan={header.colSpan}
                        className={`${styles.header} ${variant ? styles[variant] : ""}`}
                        style={{ width: header.getSize() ? header.getSize() : "100px",  position: "relative", zIndex: 0, }}
                    >
                        {flexRender(header.column.columnDef.header, header.getContext())}
                    </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody>
            {data?.length > 0 ? (
              table.getRowModel().rows.map((row) => {
                return (
                  <tr
                    key={row.id}
                    className={`${styles["body-row"]} ${
                      variant ? styles[variant] : ""
                    }`}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td
                        key={cell.id}
                        style={{
                          width: cell.column.getSize()
                            ? cell.column.getSize()
                            : "100px",
                        }}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    ))}
                  </tr>
                );
              })
            ) : (
              <tr>
                <td
                  colSpan={table.getFlatHeaders().length}
                  className={styles["empty-data"]}
                >
                  {emptyString ? emptyString : "Data is empty!"}
                </td>
              </tr>
            )}
          </tbody>

          <tfoot>
            <tr className={styles["footer-row"]}>
              {table.getAllColumns().map((column) => (
                <td key={column.id} className={styles.item}></td>
              ))}
            </tr>
          </tfoot>
        </table>
      </div>
      {control && (
        <div className={styles.control}>
            <div className={styles.side}>
            </div>
            <div className={styles.center}>
            {pagination?.enable && table.getPageCount() > 0 && (
                <>
                    <span
                        className={`${styles["page-count"]} ${variant ? styles[variant] : ""}`}
                    >
                        <FormInput.Select
                            option={[
                                ...Constants.PAGE_SIZES.filter(
                                size => (size <= pagination.total)
                                ).map((pageSize) => ({
                                value: pageSize,
                                label: pageSize,
                                }))
                            ]}
                            value={{
                                label: table.getState().pagination.pageSize,
                                value: table.getState().pagination.pageSize,
                            }}
                            onChange={handleOnChangePageSize}
                        />
                        <div className="px-2">
                        of {pagination?.total} items
                        </div>
                    </span>
                    <Pagination controls={table} variant={variant} />
                </>
            )}
            </div>

            <div className={styles.side}></div>
        </div>
      )}
    </div>
  );
}

export default TableNW;
