import { flexRender } from '@tanstack/react-table';
import styles from './Table.module.scss';
import useTable from './useTable';
import { ReactComponent as ColumnsIcon } from '../../assets/images/table-columns-solid.svg';
import Button from '../button/Button';
import DropDowns from './dropDowns/DropDowns';
import Header from './headers/Header';
import Pagination from './pagination/Pagination';
import Constants from '../../utils/Constants';

/**
 * Table props
* @property {boolean}    control                 - enable control
 * @property {string}    variant                 - style base on specific variant
 * @property {string}    className               - custom class
 * @property {string}    maxHeight               - set maxHeight inline style for table (exclude control bar) for each specific case
 * @property {object[]}  columns                 - table columns definition
 * @property {number}    columns[].id            - column id
 * @property {string}    columns[].slug          - column slug
 * @property {string}    columns[].name          - oclumn name
 * @property {string}    columns[].width         - column width: optional, default value: 100px
 * @property {array}     data                    - fetching data
 * @property {boolean}   visible                 - enable hide/unhide columns
 * @property {boolean}   resizable               - enable resize columns
 * @property {boolean}   draggable               - enable reorder columns
 * @property {object}    pagination              - pagination
 * @property {boolean}   pagination.enable       - enable pagination
 * @property {string}    pagination.total        - total records without limit and offset
 * @property {string}    pagination.setLimit     - get limit from table component
 * @property {string}    pagination.setOffset    - get offset from table component
 * @property {component} slugProps               - component that wrapping cell's value. when pass component in, prop's name is column's slug value
 */
function Table({ control, variant, className, maxHeight, columns, data, visible, resizable, draggable, pagination, ...slugProps }) {
    const { table, isDropDownsShow, handleOpenDropDowns, dropDownsRef, handleOnChangePageSize } = useTable({ columns, data, total: pagination?.total, setLimit: pagination?.setLimit, setOffset: pagination?.setOffset, slugProps });

    return (
        <div>
            <div className={`${styles["table-wrapper"]} ${className ? className : ""}`} style={{ maxHeight }}>
                <table className={`${styles.table} ${variant ? styles[variant] : ""}`} style={{ minWidth: table.getTotalSize() }}>
                    <thead>
                        <tr className={styles["header-row"]}>
                            {
                                table.getFlatHeaders().map(header => (
                                    <Header
                                        key={header.id}
                                        variant={variant}
                                        item={header}
                                        table={table}
                                        resizable={resizable}
                                        draggable={draggable}
                                    />
                                ))
                            }
                        </tr>
                    </thead>

                    <tbody>
                        {
                            table.getRowModel().rows.map(row => (
                                <tr key={row.id} className={`${styles["body-row"]} ${variant ? styles[variant] : ""}`}>
                                    {
                                        row.getVisibleCells().map(cell => (
                                            <td
                                                key={cell.id}
                                                style={{ width: cell.column.getSize() }}
                                            >
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </td>
                                        ))
                                    }
                                </tr>
                            ))
                        }
                    </tbody>
                    
                    <tfoot>
                        <tr className={styles["footer-row"]}>
                            {
                                table.getAllColumns().map(column => (
                                    <td
                                        key={column.id}
                                        className={styles.item}
                                    >
                                    </td>
                                ))
                            }
                        </tr>
                    </tfoot>
                </table>
            </div>

            {control && 
            <div className={styles.control}>
                <div className={styles.side}>
                    {
                        visible &&
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
                    }
                </div>

                <div className={styles.center}>
                    {
                        pagination?.enable && table.getPageCount() > 0 &&
                            <>
                                <select
                                    className={`${styles["page-count"]} ${variant ? styles[variant] : ""}`}
                                    value={table.getState().pagination.pageSize}
                                    onChange={handleOnChangePageSize}
                                >
                                    {
                                        Constants.PAGE_SIZES.map(pageSize => (
                                            <option key={pageSize} value={pageSize}>
                                                {pageSize} items/page
                                            </option>
                                        ))
                                    }
                                </select>
                            
                                <Pagination controls={table} variant={variant} />
                            </>
                    }
                </div>

                <div className={styles.side}>
                </div>
            </div>
            }
            
        </div>
    );
}

export default Table;