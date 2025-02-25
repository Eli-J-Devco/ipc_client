import { useState, useEffect } from "react";
import Constants from "../../../../../utils/Constants";
import useAxiosPrivate from "../../../../../hooks/useAxiosPrivate.js";

function useDataLogs() { 
    const [data, setData] = useState()
    
    const axiosPrivate = useAxiosPrivate();

    useEffect(() => {
        async function fetchData() {
            try {
                const { data } = await axiosPrivate.post(
                    Constants.API_URL.UPLOAD_CHANNEL.GET
                );
                setData(data)
            } catch (e) {
                console.error(e);
            }
        }
        fetchData()
        
    }, [])
    return {
        data
    }
}

export default useDataLogs;
