import { flexRender } from "@tanstack/react-table";
import styles from "./Table.module.scss";
import useTable from "./useTable";
import { ReactComponent as ColumnsIcon } from "../../assets/images/table-columns-solid.svg";
import Button from "../button/Button";
import DropDowns from "./dropDowns/DropDowns";
import Header from "./headers/Header";
import Pagination from "./pagination/Pagination";
import Constants from "../../utils/Constants";

/**
 * Table component
 * @param {boolean}   control                 - enable control
 * @param {string}    variant                 - style base on specific variant
 * @param {string}    className               - custom class
 * @param {string}    maxHeight               - set maxHeight inline style for table (exclude control bar) for each specific case
 * ===============================================
 * @param {object[]}  columns                 - table columns definition
 * @param {number}    columns[].id            - column id
 * @param {string}    columns[].slug          - column slug
 * @param {string}    columns[].name          - oclumn name
 * @param {string}    columns[].width         - column width: optional, default value: 100px
 * Or
 * @param {object}    columns                 - table columns definition
 * @param {object[]}  columns.columnDefs      - table columns definition, define by user with createColumnHelper
 * ===============================================
 * @param {array}     data                    - fetching data
 * @param {boolean}   visible                 - enable hide/unhide columns
 * @param {boolean}   resizable               - enable resize columns
 * @param {boolean}   draggable               - enable reorder columns
 * @param {object}    pagination              - pagination
 * @param {boolean}   pagination.enable       - enable pagination
 * @param {string}    pagination.total        - total records without limit and offset
 * @param {string}    pagination.setLimit     - get limit from table component
 * @param {string}    pagination.setOffset    - get offset from table component
 * @param {object}    selectRow               - select row
 * @param {boolean}   selectRow.enable        - enable select row on click
 * @param {object}    selectRow.rowSelection   - selected row
 * @param {function}  selectRow.setRowSelection  - set selected row
 * @param {string}    emptyString             - empty string when cell's value is null
 * @param {component} slugProps               - component that wrapping cell's value. when pass component in, prop's name is column's slug value
 */
function Table({
  control,
  variant,
  className,
  maxHeight,
  columns,
  data,
  visible,
  resizable,
  draggable,
  pagination,
  selectRow,
  emptyString,
  ...slugProps
}) {
  const {
    table,
    isDropDownsShow,
    handleOpenDropDowns,
    dropDownsRef,
    handleOnChangePageSize,
  } = useTable({
    columns,
    data,
    statusFilter: pagination?.statusFilter,
    total: pagination?.total,
    offset: pagination?.offset,
    setLimit: pagination?.setLimit,
    setOffset: pagination?.setOffset,
    rowSelection: selectRow?.rowSelection,
    setRowSelection: selectRow?.setRowSelection,
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
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup?.id} className={styles["header-row"]}>
                {headerGroup.headers.map((header) => {
                  return (
                    <Header
                      key={header.id}
                      variant={variant}
                      item={header}
                      table={table}
                      resizable={resizable}
                      draggable={draggable}
                    />
                  );
                })}
              </tr>
            ))}
          </thead>

          <tbody>
            {data?.length > 0 ? (
              table.getRowModel().rows.map((row) => {
                let isSelected = false;
                if (
                  selectRow?.enable &&
                  row?.original?.id === selectRow?.rowSelection?.id
                ) {
                  isSelected = true;
                }
                return (
                  <tr
                    key={row.id}
                    onClick={() => {
                      if (selectRow?.enable) {
                        row.toggleSelected(true);
                        setTimeout(() => {
                          selectRow?.setRowSelection(row.original);
                        }, 100);
                      }
                    }}
                    className={`${styles["body-row"]} ${
                      variant ? styles[variant] : ""
                    }`}
                    style={{ backgroundColor: isSelected ? "#F2F2F2" : "" }}
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
            {visible && (
              <div className="position-relative">
                <Button.Image
                  image={<ColumnsIcon />}
                  onClick={handleOpenDropDowns}
                />

                <DropDowns
                  isShow={isDropDownsShow}
                  data={table}
                  refProp={dropDownsRef}
                />
              </div>
            )}
          </div>

          <div className={styles.center}>
            {pagination?.enable && table.getPageCount() > 0 && (
              <>
                <select
                  className={`${styles["page-count"]} ${
                    variant ? styles[variant] : ""
                  }`}
                  value={table.getState().pagination.pageSize}
                  onChange={handleOnChangePageSize}
                >
                  {Constants.PAGE_SIZES.map((pageSize) => (
                    <option key={pageSize} value={pageSize}>
                      {pageSize} items/page
                    </option>
                  ))}
                </select>

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

export default Table;
