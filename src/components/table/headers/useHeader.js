import { useDrag, useDrop } from 'react-dnd';

const reorderColumn = (draggedColumnId, targetColumnId, columnOrder) => {
    columnOrder.splice(
        columnOrder.indexOf(targetColumnId),
        0,
        columnOrder.splice(columnOrder.indexOf(draggedColumnId), 1)[0]
    );

    return [...columnOrder];
}
  
function useHeader({ draggable, table, item }) {
    const [, dropRef] = useDrop(() => ({
        accept: 'column',
        drop: draggedColumn => {
            const newColumnOrder = reorderColumn(draggedColumn.id, item.id, table.getState().columnOrder);
            table.setColumnOrder(newColumnOrder);
        },
        canDrop: () => (draggable ? true : false)
    }));
    
    const [, dragRef, ] = useDrag(() => ({
        type: 'column',
        item: { id: item.id },
        canDrag: draggable ? true : false
    }));

    return ({
        dropRef,
        dragRef
    });
}

export default useHeader;