import { useMemo } from "react";

// Create an array of certain length and set the elements within it from start value to end value.
const range = (start, end) => {
    const length = end - start + 1;
    return Array.from({ length }, (_, idx) => idx + start);
};

function usePagination({ controls, siblingCount = 1 }) {
    const { getPageCount, getState } = controls
    const { pagination: { pageIndex } } = getState();

    const totalPageNumbers = siblingCount + 5; // Determined as siblingCount + firstPage + lastPage + currentPage + 2*DOTS
    const totalPageCount = getPageCount();
    const firstPageIndex = 0;
    const lastPageIndex = getPageCount() - 1;
    
    const paginationRange = useMemo(() => {
        // Case 1: If the number of pages is less than the page numbers we want to show in our paginationComponent, we return the range [1..totalPageCount]
        if (totalPageNumbers >= totalPageCount) return range(firstPageIndex, lastPageIndex);
        
        // Calculate left and right sibling index and make sure they are within range first page and last page
        const leftSiblingIndex = Math.max(pageIndex - siblingCount, firstPageIndex);
        const rightSiblingIndex = Math.min(pageIndex + siblingCount, lastPageIndex);
    
        // We do not show dots just when there is just one page number to be inserted between the extremes of sibling and the page limits i.e 1 and totalPageCount. Hence we are using leftSiblingIndex > 2 and rightSiblingIndex < totalPageCount - 2
        const shouldShowLeftDots = leftSiblingIndex > firstPageIndex + 1;
        const shouldShowRightDots = rightSiblingIndex < lastPageIndex - 1;
    
        // Case 2: No left dots to show, but rights dots to be shown
        if (!shouldShowLeftDots && shouldShowRightDots) {
            const leftItemCount = 3 + 2 * siblingCount;
            const leftRange = range(firstPageIndex, leftItemCount - 1);
            return [...leftRange, -2, lastPageIndex];
        }
    
        // Case 3: No right dots to show, but left dots to be shown
        if (shouldShowLeftDots && !shouldShowRightDots) {
            const rightItemCount = 3 + 2 * siblingCount;
            const rightRange = range(lastPageIndex - rightItemCount, lastPageIndex);
            return [firstPageIndex, -1, ...rightRange];
        }
         
        // Case 4: Both left and right dots to be shown
        if (shouldShowLeftDots && shouldShowRightDots) {
            const middleRange = range(leftSiblingIndex, rightSiblingIndex);
            return [firstPageIndex, -1, ...middleRange, -2, lastPageIndex];
        }
    }, [totalPageCount, pageIndex]);
    
    return paginationRange;
}

export default usePagination;