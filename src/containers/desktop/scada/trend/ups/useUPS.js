import { useState } from "react";

function useUPS() {
    const [tempBlockList, setTempBlockList] = useState(Array.from({ length: 7 }, (item, index) => ({ id: index, text: `BLOCK${index + 1}`, value: Math.floor(Math.random() * (45 - 42 + 1) + 42), unit: "°C" })));
    const [batteryBlockList, setBatteryBlockList] = useState(Array.from({ length: 7 }, (item, index) => ({ id: index, text: `BLOCK${index + 1}`, value: 100, unit: "%" })));
    
    return {
        tempBlockList,
        batteryBlockList
    };
}

export default useUPS;