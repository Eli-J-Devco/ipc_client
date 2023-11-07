import useHeader from "./useHeader";
import styles from './Header.module.scss';

function Header({ variant, item, table, resizable, draggable }) {
    const { dropRef, dragRef } = useHeader({ draggable, table, item });

    return (
        <th
            ref={dropRef}
            className={`${styles.header} ${variant ? styles[variant] : ""} ${item.column.getIsResizing() ? styles["is-resizing"] : ""}`}
            style={{ width: item.getSize() }}
        >
            <span
                ref={dragRef}
                className={draggable ? styles.draggable : ""}
            >
                {item.column.columnDef.header}
            </span>
            
            {
                resizable &&
                <div
                    className={`${styles.resizer} ${item.column.getIsResizing() ? styles["is-resizing"] : ""}`}
                    onMouseDown={item.getResizeHandler()}
                    onTouchStart={item.getResizeHandler()}
                />
            }
        </th>
    );
}

export default Header;