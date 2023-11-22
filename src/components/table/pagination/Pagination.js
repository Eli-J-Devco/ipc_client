import ReactPagination from 'react-bootstrap/Pagination';
import styles from "./Pagination.module.scss";
import usePagination from './usePagination';

function Pagination({ controls }) {
    const paginationRange = usePagination({ controls });

    return (
        <ReactPagination
            size="sm"
            className={styles.pagination}
        >
            <ReactPagination.Prev
                linkClassName={styles.control}
                onClick={controls.previousPage}
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
                        onClick={() => controls.setPageIndex(pageIndex)}
                    >
                        {pageIndex + 1}
                    </ReactPagination.Item>
                )
                )
            }

            <ReactPagination.Next
                linkClassName={styles.control}
                onClick={controls.nextPage}
                disabled={!controls.getCanNextPage()}
            />
        </ReactPagination>
    );
}

export default Pagination;