import { useState } from "react";

function useButtonGroup({ buttons }) {
    const [active, setActive] = useState(buttons ? buttons[0].text : "");

    const handleOnClick = item => {
        setActive(item.text);
        if(item && item.onClick) item.onClick();
    }
    return {
        active,
        handleOnClick
    };
}

export default useButtonGroup;