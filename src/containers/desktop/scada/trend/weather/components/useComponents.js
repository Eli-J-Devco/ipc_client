import { useState } from "react";

function useComponent() {
    const [isExpand, setIsExpand] = useState(true);
    const [weatherStationList, setWeatherStationList] = useState(Array.from({ length: 2 }, (item, index) => ({ id: index, text: `WS ${index + 1}`, selected: false })));

    const handleOnExpand = () => setIsExpand(!isExpand);

    return {
        isExpand,
        handleOnExpand,
        weatherStationList,
        setWeatherStationList
    };
}

export default useComponent;