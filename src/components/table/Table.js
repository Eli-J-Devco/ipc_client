import {
    flexRender,
    getCoreRowModel,
    useReactTable,
} from '@tanstack/react-table'
import isArray from 'lodash/isArray';
import styles from './Table.module.scss';

function Table({ columns, data, variant, className, maxHeight, ...slugProps }) {
    // slugProps: pass component that wrapping value by prop that have the same name with slug value
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
        getCoreRowModel: getCoreRowModel()
    });

    return (
        <div className={`${styles["table-wrapper"]} ${className ? className : ""}`} style={{ maxHeight }}>
            <table className={`${styles.table} ${variant ? styles[variant] : ""}`}>
                <thead>
                    <tr className={styles["header-row"]}>
                        {
                            table.getFlatHeaders().map(header => (
                                <th key={header.id} className={variant ? styles[variant] : ""}>
                                    {header.column.columnDef.header}
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
                                        <td key={cell.id}>
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
    );
}

export default Table;