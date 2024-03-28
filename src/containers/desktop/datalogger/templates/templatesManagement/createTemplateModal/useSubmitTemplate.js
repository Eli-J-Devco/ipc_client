import { useNavigate } from "react-router-dom";
import * as yup from 'yup';
import useAxiosPrivate from "../../../../../../hooks/useAxiosPrivate";
import Constants from "../../../../../../utils/Constants";
import LibToast from "../../../../../../utils/LibToast";
import { useTranslation } from "react-i18next";
import { loginService } from "../../../../../../services/loginService";

function useSubmitTemplate(close) {
    const axiosPrivate = useAxiosPrivate();

    const initialValues = {
        name: "",
        group: null
    };

    const validationSchema = yup.object().shape({
        name: yup.string().required("Name is required"),
        group: yup.object().shape({
            value: yup.string().required("Group is required"),
            label: yup.string().required("Group is required")
        }).required("Group is required")
    });

    const navigate = useNavigate();
    const { t } = useTranslation();
    const handleOnSubmit = values => {
        setTimeout(async () => {
            try {
                const response = await axiosPrivate.post(Constants.API_URL.TEMPLATE.CREATE, {
                    name: values.name,
                    status: true,
                    id_device_group: values.group.value,
                    type: 1
                });
                if (response?.status === 200) {
                    LibToast.toast(`Template ${values.name} ${t("toastMessage.info.create")}`, "info");
                    close();
                    navigate(`/datalogger/templates/${response.data?.id}/points`);
                }
            } catch (error) {
                let msg = loginService.handleMissingInfo(error);
                if (typeof msg === "string") {
                    LibToast.toast(msg, "error");
                }
                else {
                    if (msg)
                        LibToast.toast(t('toastMessage.error.create'), "error");
                    else
                        navigate("/")
                }
            }
        }, 300);
    };

    return {
        handleOnSubmit,
        initialValues,
        validationSchema
    };
}

export default useSubmitTemplate;