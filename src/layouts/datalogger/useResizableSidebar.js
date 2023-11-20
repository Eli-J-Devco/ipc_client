import { useCallback, useEffect, useState } from "react";

function useResizableSideBar() {
    const [isResizing, setIsResizing] = useState(false);
    const [sidebarWidth, setSidebarWidth] = useState(240);

    const startResizing = useCallback(e => setIsResizing(true), []);
    const stopResizing = useCallback(e => setIsResizing(false), []);
    const resize = useCallback(e => { if (isResizing) { setSidebarWidth(e.clientX); } }, [isResizing]);

    useEffect(() => {
        window.addEventListener("mousemove", resize);
        window.addEventListener("mouseup", stopResizing);

        return () => {
            window.removeEventListener("mousemove", resize);
            window.removeEventListener("mouseup", stopResizing);
        };
    }, [resize, stopResizing]);
    
    return {
        sidebarWidth,
        startResizing
    };
}

export default useResizableSideBar;