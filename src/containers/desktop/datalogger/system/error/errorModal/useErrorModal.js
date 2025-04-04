import { useState, useEffect } from "react";
import { isEmpty, template } from "lodash";
import * as yup from 'yup';
import Constants from "../../../../../../utils/Constants.js";
import useAxiosPrivate from "../../../../../../hooks/useAxiosPrivate.js";
import LibToast from "../../../../../../utils/LibToast";
import { useTranslation } from "react-i18next";


function useErrorModal({ close, data, setData, dataList, setDataList }) {
    const { t } = useTranslation();
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
                if (formSubmit.template?.value) {
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
        message: yup.string().required('Required'),
        device_group: yup.object().required("Required"),
        template: yup.object().required("Required"),
        point: yup.object().required("Required"),
        error_level: yup.object().required("Required"),
        error_type: yup.object().required("Required"),
        error_code: yup.string().required("Required"),
        comparison: yup.object().required("Required"),
        value: yup.number().required("Required"),
    });

    const handleSubmitForm = async (values) => {
        const payload = {
            name: formSubmit.name,
            message: formSubmit.message,
            id_device_group: formSubmit.device_group?.value,
            id_error_level: formSubmit.error_level?.value,
            id_error_type: formSubmit.error_type?.value,
            error_code: formSubmit.error_code,
            id_error_comparison: formSubmit.comparison?.value,
            value: formSubmit.value,
            id_template: formSubmit.template.value,
            point: formSubmit.point.value,
            enable: formSubmit.enable
        }
        console.log("payload", payload)
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
                LibToast.toast(t("toastMessage.info.add"), "info");
            } else {
                const response = await axiosPrivate.post(
                    `${Constants.API_URL.ERROR.UPDATE}?error_id=${data.id}`,
                    payload
                );
                setDataList(dataList.map(item => {
                    if (item.id === data.id) {
                        return response.data;
                    } else {
                        return item;
                    }
                }))
                setFormSubmit({
                    enable: true
                })
                LibToast.toast(t("toastMessage.info.update"), "info");
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