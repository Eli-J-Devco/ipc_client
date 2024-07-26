import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import useAxiosPrivate from "../../../../../../hooks/useAxiosPrivate";
import Constants from "../../../../../../utils/Constants";
import LibToast from "../../../../../../utils/LibToast";
import { useTranslation } from "react-i18next";
import { loginService } from "../../../../../../services/loginService";
import { useTemplates } from "../../useTemplates";
import { useEffect, useState } from "react";

function useSubmitTemplate(close, duplicate) {
  const axiosPrivate = useAxiosPrivate();
  const output = document.getElementById("progress");

  const [isAddNewGroup, setIsAddNewGroup] = useState(false);
  const [groups, setGroups] = useState(null);
  const {
    setTemplateGroups,
    setTemplateGroupsByDeviceGroup,
    deviceGroups,
    deviceTypes,
    setDeviceTypes,
  } = useTemplates();

  const [initialValues, setInitialValues] = useState({
    name: duplicate ? `Copy of ${duplicate.name}` : "",
    group: null,
  });

  useEffect(() => {
    if (!deviceGroups) return;
    if (!duplicate) return;

    if (duplicate && initialValues.group && initialValues.name) return;

    var name = `Copy of ${duplicate.name}`;
    var group = null;
    deviceGroups.forEach((type) => {
      if (!type.options) return;

      if (group) return;

      type.options.forEach((g) => {
        if (group) return;

        if (g.value === duplicate.id_device_group) {
          group = g;
        }
      });
    });

    if (!group) return;

    setInitialValues({
      name,
      group,
    });
  }, [deviceGroups, duplicate, initialValues]);

  const validationSchema = yup.object().shape({
    name: yup.string().required("Name is required"),
    group: yup
      .object()
      .shape({
        value: yup.string().required("Group is required"),
        label: yup.string().required("Group is required"),
      })
      .required("Group is required"),
  });

  const initialCreateGroup = {
    name: "",
    type: null,
  };

  const validationCreateGroup = yup.object().shape({
    name: yup.string().required("Name is required"),
    type: yup
      .object()
      .shape({
        value: yup.string().required("Type is required"),
        label: yup.string().required("Type is required"),
      })
      .required("Type is required"),
  });

  const navigate = useNavigate();
  const { t } = useTranslation();
  const handleOnSubmit = (values) => {
    output.innerHTML = "<div><img src='/loading.gif' alt='loading' /></div>";
    if (duplicate) {
      values = { ...values, id: duplicate.id };
    }

    setTimeout(async () => {
      try {
        const response = await axiosPrivate.post(
          Constants.API_URL.TEMPLATE.ADD,
          {
            name: values.name,
            status: true,
            id_device_group: values.group.value,
            type: 1,
            ...(duplicate && { id: duplicate.id }),
          }
        );
        if (response?.status === 200) {
          LibToast.toast(
            `Template ${values.name} ${t("toastMessage.info.create")}`,
            "info"
          );
          setTemplateGroups(
            setTemplateGroupsByDeviceGroup(response?.data?.data)
          );
          close();
          navigate(`/datalogger/templates/${response.data?.id}/points`);
        }
      } catch (error) {
        loginService.handleMissingInfo(
          error,
          "Failed to create new template"
        ) && navigate("/", { replace: true });
      } finally {
        output.innerHTML = "";
      }
    }, 300);
  };

  const handleCreateGroup = (values) => {
    output.innerHTML = "<div><img src='/loading.gif' alt='loading' /></div>";
    setTimeout(async () => {
      try {
        const response = await axiosPrivate.post(
          Constants.API_URL.DEVICES.CONFIG.ADD_GROUP,
          {
            name: values.name,
            id_device_type: values.type.value,
          }
        );
        if (response?.status === 200) {
          LibToast.toast(
            `Group ${values.name} ${t("toastMessage.info.create")}`,
            "info"
          );
          onRefresh();
        }
      } catch (error) {
        loginService.handleMissingInfo(error, "Failed to create new group") &&
          navigate("/", { replace: true });
      } finally {
        output.innerHTML = "";
      }
    }, 300);
  };

  const onRefresh = () => {
    setDeviceTypes([]);
    setIsAddNewGroup(false);
  };

  useEffect(() => {
    if (groups) return;

    if (deviceGroups && deviceGroups.length > 0) {
      setGroups(deviceGroups);
    }
  }, [deviceGroups, groups, setGroups]);

  const onClose = () => {
    close();
    setInitialValues({
      name: "",
      group: null,
    });
  };

  return {
    handleOnSubmit,
    handleCreateGroup,
    initialValues,
    validationSchema,
    initialCreateGroup,
    validationCreateGroup,
    onRefresh,
    isAddNewGroup,
    setIsAddNewGroup,
    deviceTypes,
    groups,
    onClose,
  };
}

export default useSubmitTemplate;
