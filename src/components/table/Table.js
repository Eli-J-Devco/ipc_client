import { flexRender } from '@tanstack/react-table';
import styles from './Table.module.scss';
import useTable from './useTable';
import { ReactComponent as ColumnsIcon } from '../../assets/images/table-columns-solid.svg';
import Button from '../button/Button';
import DropDowns from './dropDowns/DropDowns';

function Table({ variant, className, maxHeight, columns, data, visible, resizable, ...slugProps }) {
    // slugProps: pass component that wrapping value by prop that have the same name with slug value
    const { table, isDropDownsShow, handleOpenDropDowns, dropDownsRef } = useTable({ columns, data, slugProps });

    return (
        <div>
            <div className={`d-flex justify-content-end align-items-center ${styles.control}`}>
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

            <div className={`${styles["table-wrapper"]} ${className ? className : ""}`} style={{ maxHeight }}>
                <table className={`${styles.table} ${variant ? styles[variant] : ""}`} style={{ width: table.getTotalSize() }}>
                    <thead>
                        <tr className={styles["header-row"]}>
                            {
                                table.getFlatHeaders().map(header => (
                                    <th
                                        key={header.id}
                                        className={`${variant ? styles[variant] : ""} ${header.column.getIsResizing() ? styles["is-resizing"] : ""}`}
                                        style={{ width: header.getSize() }}
                                    >
                                        {header.column.columnDef.header}
                                        
                                        {
                                            resizable &&
                                            <div
                                                className={`${styles.resizer} ${header.column.getIsResizing() ? styles["is-resizing"] : ""}`}
                                                onMouseDown={header.getResizeHandler()}
                                                onTouchStart={header.getResizeHandler()}
                                            />
                                        }
                                    </th>

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
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    );
}

export default Table;