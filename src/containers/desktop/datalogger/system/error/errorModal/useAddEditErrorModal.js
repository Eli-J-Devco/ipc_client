import { useState, useEffect } from "react";
import { isEmpty, template } from "lodash";
import * as yup from 'yup';
import Constants from "../../../../../../utils/Constants.js";
import useAxiosPrivate from "../../../../../../hooks/useAxiosPrivate.js";
import LibToast from "../../../../../../utils/LibToast.js";
import { useTranslation } from "react-i18next";


function useAddEditErrorModal({ 
    close, 
    data, 
    setData, 
    dataList, 
    setDataList,
    formSubmit, setFormSubmit,
}) {
    const { t } = useTranslation();
    const axiosPrivate = useAxiosPrivate();

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
        try {
            var output = document.getElementById("progress");
            output.innerHTML = "<div><img src='/loading.gif' /></div>";
            if (isEmpty(data)) {
                const { data } = await axiosPrivate.post(
                    Constants.API_URL.ERROR.ADD,
                    payload
                );
                setDataList([...dataList, data])
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
                LibToast.toast(t("toastMessage.info.update"), "info");
            }
        } catch (e) {
            if (isEmpty(data)) {
                LibToast.toast(t("toastMessage.error.add"), "error");
            } else {
                LibToast.toast(t("toastMessage.error.update"), "error");
            }
            console.error(e);
        } finally {
            close()
            setFormSubmit({
                enable: true
            })
            output.innerHTML = ""
        }
    }
    
    return {
        validationSchema,
        handleSubmitForm,
    };
}

export default useAddEditErrorModal;
