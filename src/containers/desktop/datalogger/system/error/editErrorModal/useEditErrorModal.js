import { useState, useEffect } from "react";
import * as yup from 'yup';
import Constants from "../../../../../../utils/Constants";
import useAxiosPrivate from "../../../../../../hooks/useAxiosPrivate.js";


function useEditAlarmModal({ close }) {
    const [deviceGroups, setDeviceGroups] = useState([]);
    const [templates, setTemplates] = useState([]);
    const [points, setPoints] = useState([]);
    const [errorLevels, setErrorLevels] = useState([]);
    const [errorTypes, setErrorTypes] = useState([]);
    const [errorComparisons, setErrorComparisons] = useState([]);
    const [error, setError] = useState({
        enable: true
    })
    const axiosPrivate = useAxiosPrivate();

    useEffect(() => {
        async function fetchData() {
            try {
                const { data } = await axiosPrivate.post(
                    Constants.API_URL.DEVICES.CONFIG.GROUP
                );
                setDeviceGroups(data)
            } catch (e) {
                console.error(e);
            }
        }
        fetchData()
        
    }, [])

    useEffect(() => {
        async function fetchData() {
            try {
                const { data } = await axiosPrivate.post(
                    Constants.API_URL.TEMPLATE.GET
                );
                setTemplates(data)
            } catch (e) {
                console.error(e);
            }
        }
        fetchData()
        
    }, [])

    useEffect(() => {
        async function fetchData() {
            try {
                if (error.id_template) {
                    const { data } = await axiosPrivate.post(
                        `${Constants.API_URL.POINT.LIST}?id_template=${error.id_template}`
                    );
                    setPoints(data)
                }
            } catch (e) {
                console.error(e);
            }
        }
        fetchData()
    }, [error])

    useEffect(() => {
        async function fetchData() {
            try {
                const { data } = await axiosPrivate.post(
                    Constants.API_URL.ERROR.LEVEL.LIST
                );
                setErrorLevels(data)
            } catch (e) {
                console.error(e);
            }
        }
        fetchData()
    }, [])

    useEffect(() => {
        async function fetchData() {
            try {
                const { data } = await axiosPrivate.post(
                    Constants.API_URL.ERROR.TYPE.LIST
                );
                setErrorTypes(data)
            } catch (e) {
                console.error(e);
            }
        }
        fetchData()
    }, [])

    useEffect(() => {
        async function fetchData() {
            try {
                const { data } = await axiosPrivate.post(
                    Constants.API_URL.ERROR.COMPARISON.LIST
                );
                setErrorComparisons(data)
            } catch (e) {
                console.error(e);
            }
        }
        fetchData()
    }, [])


    const validationSchema = yup.object({
        name: yup.string().required('Required')
    });

    const handleSubmitForm = async (values) => {
        const payload = {
            ...error,
            name: values.name,
            message: values.message,
            id_device_group: values.device_group.value,
            point: values.point.value,
            id_error_level: values.error_level.value,
            id_error_type: values.error_type.value,
            error_code: values.error_code,
            id_error_comparison: values.comparison.value,
            value: values.comparison_number
        }

        try {
            const { data } = await axiosPrivate.post(
                Constants.API_URL.ERROR.ADD,
                payload
            );
            setError({
                enable: true
            })
            close()
        } catch (e) {
            console.error(e);
        }
    }

    return {
        deviceGroups,
        templates,
        points,
        errorLevels,
        errorTypes,
        errorComparisons,
        error, setError,
        validationSchema,
        handleSubmitForm
    };
}

export default useEditAlarmModal;