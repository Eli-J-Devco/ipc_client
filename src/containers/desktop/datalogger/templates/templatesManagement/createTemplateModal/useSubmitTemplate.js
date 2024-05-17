import { useNavigate } from "react-router-dom";
import * as yup from 'yup';
import useAxiosPrivate from "../../../../../../hooks/useAxiosPrivate";
import Constants from "../../../../../../utils/Constants";
import LibToast from "../../../../../../utils/LibToast";
import { useTranslation } from "react-i18next";
import { loginService } from "../../../../../../services/loginService";

function useSubmitTemplate(close, closeGroup) {
    const axiosPrivate = useAxiosPrivate();
    const output = document.getElementById("progress");

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


    const initialCreateGroup = {
        name: "",
        type: null
    }

    const validationCreateGroup = yup.object().shape({
        name: yup.string().required("Name is required"),
        type: yup.object().shape({
            value: yup.string().required("Type is required"),
            label: yup.string().required("Type is required")
        }).required("Type is required")
    });

    const navigate = useNavigate();
    const { t } = useTranslation();
    const handleOnSubmit = values => {
        output.innerHTML = "<div><img src='/loading.gif' alt='loading' /></div>";
        setTimeout(async () => {
            try {
                const response = await axiosPrivate.post(Constants.API_URL.TEMPLATE.ADD, {
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
                loginService.handleMissingInfo(error, "Failed to create new template") && navigate("/", { replace: true });
            } finally {
                output.innerHTML = "";
            }
        }, 300);
    };

    const handleCreateGroup = values => {
        output.innerHTML = "<div><img src='/loading.gif' alt='loading' /></div>";
        setTimeout(async () => {
            try {
                const response = await axiosPrivate.post(Constants.API_URL.DEVICE_GROUP.CREATE, {
                    name: values.name,
                    id_device_type: values.type.value,
                    type: Constants.TEMPLATE_TYPE.CUSTOM
                });
                if (response?.status === 200) {
                    LibToast.toast(`Group ${values.name} ${t("toastMessage.info.create")}`, "info");
                    closeGroup();
                }
            } catch (error) {
                loginService.handleMissingInfo(error, "Failed to create new group") && navigate("/", { replace: true });
            } finally {
                output.innerHTML = "";
            }
        }, 300);
    }

    return {
        handleOnSubmit,
        handleCreateGroup,
        initialValues,
        validationSchema,
        initialCreateGroup,
        validationCreateGroup
    };
}

export default useSubmitTemplate;