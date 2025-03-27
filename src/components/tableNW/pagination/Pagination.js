import ReactPagination from 'react-bootstrap/Pagination';
import styles from "./Pagination.module.scss";
import usePagination from './usePagination';


function Pagination({ controls, variant, id }) {
    const paginationRange = usePagination({ controls });
    const headerId=id ? `table-header-${id}` : "table-header"
    return (
        <ReactPagination
            size="sm"
            className={`${styles.pagination} ${variant ? styles[variant] : ""}`}
        >
            <ReactPagination.Prev
                linkClassName={styles.control}
                onClick={() => {
                    controls.previousPage()
                    document.getElementById(headerId).scrollIntoView({
                        behavior: 'smooth',
                        block: "nearest",
                    });
                }}
                disabled={!controls.getCanPreviousPage()}
            />

            {
                paginationRange.map(pageIndex => pageIndex < 0 ? (
                    <ReactPagination.Ellipsis
                        key={pageIndex}
                        linkClassName={styles.ellipsis}
                    />
                ) : (
                    <ReactPagination.Item
                        key={pageIndex}
                        active={controls.getState().pagination.pageIndex === pageIndex}
                        linkClassName={styles.item}
                        onClick={() => {
                            controls.setPageIndex(pageIndex)
                            document.getElementById(headerId).scrollIntoView({
                                behavior: 'smooth',
                                block: "nearest",
                            });
                        }}
                    >
                        {pageIndex + 1}
                    </ReactPagination.Item>
                )
                )
            }

            <ReactPagination.Next
                linkClassName={styles.control}
                onClick={() => {
                    controls.nextPage()
                    document.getElementById(headerId).scrollIntoView({
                        behavior: 'smooth',
                        block: "nearest",
                    });
                }}
                disabled={!controls.getCanNextPage()}
            />
        </ReactPagination>
    );
}

export default Pagination;