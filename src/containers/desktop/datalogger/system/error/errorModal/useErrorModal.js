import { useState, useEffect } from "react";
import { isEmpty } from "lodash";
import * as yup from 'yup';
import Constants from "../../../../../../utils/Constants.js";
import useAxiosPrivate from "../../../../../../hooks/useAxiosPrivate.js";


function useErrorModal({ close, data, setData, dataList, setDataList }) {
    const [deviceGroups, setDeviceGroups] = useState([]);
    const [templates, setTemplates] = useState([]);
    const [points, setPoints] = useState([]);
    const [errorLevels, setErrorLevels] = useState([]);
    const [errorTypes, setErrorTypes] = useState([]);
    const [errorComparisons, setErrorComparisons] = useState([]);
    const [formSubmit, setFormSubmit] = useState({
        enable: true
    });
    const axiosPrivate = useAxiosPrivate();

    useEffect(() => {
        async function fetchData() {
            try {
                const { data } = await axiosPrivate.post(
                    Constants.API_URL.DEVICES.CONFIG.GROUP
                );
                setDeviceGroups(data)
            } catch (e) {
                console.log(e);
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
                console.log(e);
            }
        }
        fetchData()
        
    }, [])

    useEffect(() => {
        async function fetchData() {
            try {
                if (formSubmit.template) {
                    const response = await axiosPrivate.post(
                        `${Constants.API_URL.POINT.LIST}?id_template=${formSubmit.template.value}`
                    );
                    setPoints(response.data)
                }
            } catch (e) {
                console.log(e);
            }
        }
        fetchData()
    }, [formSubmit])

    useEffect(() => {
        async function fetchData() {
            try {
                const { data } = await axiosPrivate.post(
                    Constants.API_URL.ERROR.LEVEL.LIST
                );
                setErrorLevels(data)
            } catch (e) {
                console.log(e);
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
                console.log(e);
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
                console.log(e);
            }
        }
        fetchData()
    }, [])


    const validationSchema = yup.object({
        name: yup.string().required('Required'),
        message: yup.string().required('Required')
    });

    const handleSubmitForm = async (values) => {
        const payload = {
            name: values.name,
            message: values.message,
            id_device_group: values.device_group?.value,
            id_error_level: values.error_level?.value,
            id_error_type: values.error_type?.value,
            error_code: values.error_code,
            id_error_comparison: values.comparison?.value,
            value: values.comparison_number,
            id_template: formSubmit.template.value,
            point: formSubmit.point.value,
            enable: formSubmit.enable
        }
        try {
            var output = document.getElementById("progress");
            output.innerHTML = "<div><img src='/loading.gif' /></div>";
            if (isEmpty(data)) {
                const { data } = await axiosPrivate.post(
                    Constants.API_URL.ERROR.ADD,
                    payload
                );
                setDataList([...dataList, data])
                setFormSubmit({
                    enable: true
                })
            } else {
                console.log(`${Constants.API_URL.ERROR.UPDATE}?error_id=${data.id}`)
                const response = await axiosPrivate.post(
                    `${Constants.API_URL.ERROR.UPDATE}?error_id=${data.id}`,
                    payload
                );
                console.log(response.data)
                setDataList(dataList.map(item => {
                    if (item.id === data.id) {
                        return response.data;
                    } else {
                        return item;
                    }
                }))
            }
        } catch (e) {
            console.error(e);
        } finally {
            close()
            output.innerHTML = ""
        }
    }

    return {
        deviceGroups,
        templates,
        points,
        errorLevels,
        errorTypes,
        errorComparisons,
        validationSchema,
        formSubmit, setFormSubmit,
        handleSubmitForm
    };
}

export default useErrorModal;