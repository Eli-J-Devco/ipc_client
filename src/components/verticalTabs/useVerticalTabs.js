import { useState } from "react";
import isArray from "lodash/isArray";

function useVerticalTabs({ tabs, onClick }) {
    const [selected, setSelected] = useState(isArray(tabs) && tabs.length > 0 ? tabs[0].id : null);

    const handleOnClick = tab => {
        setSelected(tab.id);
        (typeof onClick === "function") && onClick(tab);
    };

    return {
        selected,
        handleOnClick
    };
}

export default useVerticalTabs;