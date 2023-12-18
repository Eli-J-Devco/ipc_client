import { useEffect, useRef, useState } from "react";

function useComponent() {
    const [isExpand, setIsExpand] = useState(true);
    
    const [isBasicExpand, setIsBasicExpand] = useState(true);
    const [basicVoltageList, setBasicVoltageList] = useState(Array.from({ length: 3 }, (item, index) => ({ id: index, text: `MPPT ${index + 1}`, selected: false })));
    const [basicCurrentList, setBasicCurrentList] = useState(Array.from({ length: 3 }, (item, index) => ({ id: index, text: `MPPT ${index + 1}`, selected: false })));
    const [basicCheckedAll, setBasicCheckedAll] = useState(false);
    const basicCheckedAlllRef = useRef(null);

    const [isAdvancedExpand, setIsAdvancedExpand] = useState(true);
    const [advancedCurrentList, setAdvancedCurrentList] = useState(Array.from({ length: 3 }, (item, index) => ({ id: index, text: `String ${index + 1}`, selected: false })));
    const [advancedCheckedAll, setAdvancedCheckedAll] = useState(false);
    const advancedCheckedAlllRef = useRef(null);

    const [calculations, setCalculations] = useState([
        { id: 1, text: "Estimated Energy", selected: false },
        { id: 2, text: "Estimated Power", selected: false },
        { id: 3, text: "Estimated Power (DC)", selected: false }
    ]);

    useEffect(() => {
        if (basicVoltageList.every(item => item.selected) && basicCurrentList.every(item => item.selected)) {
            setBasicCheckedAll(true);
            basicCheckedAlllRef.current.indeterminate = false;
        } else {
            setBasicCheckedAll(false);
            basicCheckedAlllRef.current.indeterminate = basicVoltageList.some(item => item.selected) || basicCurrentList.some(item => item.selected);
        }
    }, [basicVoltageList, basicCurrentList]);

    useEffect(() => {
        if (advancedCurrentList.every(item => item.selected)) {
            setAdvancedCheckedAll(true);
            advancedCheckedAlllRef.current.indeterminate = false;
        } else {
            setAdvancedCheckedAll(false);
            advancedCheckedAlllRef.current.indeterminate = advancedCurrentList.some(item => item.selected);
        }
    }, [advancedCurrentList]);

    const handleOnExpand = () => setIsExpand(!isExpand);
    const handleOnBasicExpand = () => setIsBasicExpand(!isBasicExpand);
    const handleBasicCheckAll = () => {
        setBasicCheckedAll(!basicCheckedAll);
        setBasicVoltageList(basicVoltageList.map(item => ({
            ...item,
            selected: !basicCheckedAll
        })));
        setBasicCurrentList(basicCurrentList.map(item => ({
            ...item,
            selected: !basicCheckedAll
        })));
    }
    const handleOnAdvancedExpand = () => setIsAdvancedExpand(!isAdvancedExpand);
    const handleAdvancedCheckAll = () => {
        setAdvancedCheckedAll(!advancedCheckedAll);
        setAdvancedCurrentList(advancedCurrentList.map(item => ({
            ...item,
            selected: !advancedCheckedAll
        })));
    }

    return {
        isExpand, handleOnExpand,
        isBasicExpand, handleOnBasicExpand, basicVoltageList, setBasicVoltageList, basicCurrentList, setBasicCurrentList, basicCheckedAll, handleBasicCheckAll, basicCheckedAlllRef,
        isAdvancedExpand, handleOnAdvancedExpand, advancedCurrentList, setAdvancedCurrentList, advancedCheckedAll, handleAdvancedCheckAll, advancedCheckedAlllRef,
        calculations, setCalculations
    };
}

export default useComponent;