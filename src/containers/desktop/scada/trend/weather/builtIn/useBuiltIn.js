import { useState } from "react";

function useComponent() {
    const [isExpand, setIsExpand] = useState(true);
    const [basicList, setBasicList] = useState([
        { id: 1, text: "Irradiance", selected: false },
        { id: 2, text: "Wind Speed", selected: false },
        { id: 3, text: "Wind Direction", selected: true },
        { id: 4, text: "Ambient Temp", selected: false },
        { id: 5, text: "PV Temp", selected: false },
        { id: 6, text: "Humidity", selected: false }
    ]);

    const [advancedList, setAdvancedList] = useState([
        { id: 1, text: "Irradiance", selected: false },
        { id: 2, text: "Wind Speed", selected: false },
        { id: 3, text: "Wind Direction", selected: true },
        { id: 4, text: "Ambient Temp", selected: false },
        { id: 5, text: "PV Temp", selected: false },
        { id: 6, text: "Humidity", selected: false }
    ]);

    const [calculations, setCalculations] = useState([
        { id: 1, text: "Sensor", selected: false },
        { id: 2, text: "GHI", selected: false },
        { id: 3, text: "DNI", selected: false },
        { id: 4, text: "Model", selected: false },
        { id: 5, text: "ModelGHI", selected: false },
        { id: 6, text: "ModelAnnualGHI", selected: false }
    ]);

    const handleOnExpand = () => setIsExpand(!isExpand);

    return {
        isExpand,
        handleOnExpand,
        basicList,
        setBasicList,
        advancedList,
        setAdvancedList,
        calculations,
        setCalculations
    };
}

export default useComponent;