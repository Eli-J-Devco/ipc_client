import { useState } from "react";

function useComponent() {
    const [isExpand, setIsExpand] = useState(true);
    const [productionMeterList, setProductionMeterList] = useState(Array.from({ length: 2 }, (item, index) => ({ id: index, text: `Meter ${index + 1}`, selected: false })));

    const handleOnExpand = () => setIsExpand(!isExpand);

    return {
        isExpand,
        handleOnExpand,
        productionMeterList,
        setProductionMeterList
    };
}

export default useComponent;