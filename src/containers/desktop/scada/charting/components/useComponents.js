import { useState } from "react";

function useComponent() {
    const [isExpand, setIsExpand] = useState(true);
    const [inverterList, setInverterList] = useState(Array.from({ length: 5 }, (item, index) => ({ id: index, text: `Inverter ${index + 1}`, selected: false })));
    const [weatherStationList, setWeatherStationList] = useState(Array.from({ length: 2 }, (item, index) => ({ id: index, text: `WS ${index + 1}`, selected: false })));
    const [productionMeterList, setProductionMeterList] = useState(Array.from({ length: 2 }, (item, index) => ({ id: index, text: `Meter ${index + 1}`, selected: false })));


    const handleOnExpand = () => setIsExpand(!isExpand);

    return {
        isExpand,
        handleOnExpand,
        inverterList,
        setInverterList,
        weatherStationList,
        setWeatherStationList,
        productionMeterList,
        setProductionMeterList
    };
}

export default useComponent;