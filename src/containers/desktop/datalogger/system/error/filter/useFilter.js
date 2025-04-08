import { useState, useEffect } from "react";
import Constants from "../../../../../utils/Constants";
import useAxiosPrivate from "../../../../../hooks/useAxiosPrivate.js";
import LibToast from "../../../../../utils/LibToast";
import { useTranslation } from "react-i18next";


function useFilter() {
    const axiosPrivate = useAxiosPrivate()

    useEffect(() => {
        const fetchData = async () => {

        }

        fetchData()
    }, [])
    return {
    }
}

export default useFilter;