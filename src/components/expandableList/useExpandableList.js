import { useEffect, useRef, useState } from "react";

function useExpandableList({ list, onChange }) {
    const [isExpand, setIsExpand] = useState(true);
    const [checkedAll, setCheckedAll] = useState(false);
    const checkedAllRef = useRef(null);

    useEffect(() => {
        if (list.every(item => item.selected)) {
            setCheckedAll(true);
            checkedAllRef.current.indeterminate = false;
        } else {
            setCheckedAll(false);
            checkedAllRef.current.indeterminate = list.some(item => item.selected);
        }
    }, [list]);
    
    const handleOnExpand = () => setIsExpand(!isExpand);
    const handleCheckAll = () => {
        setCheckedAll(!checkedAll);
        onChange(list.map(item => ({
            ...item,
            selected: !checkedAll
        })));
    }
    const handleOnChange = (item, index) => {
        const newList = [...list];
        newList[index] = {
            ...item,
            selected: !item.selected
        };
        onChange(newList);
    };

    return {
        isExpand,
        handleOnExpand,
        handleOnChange,
        checkedAll,
        handleCheckAll,
        checkedAllRef
    };
}

export default useExpandableList;