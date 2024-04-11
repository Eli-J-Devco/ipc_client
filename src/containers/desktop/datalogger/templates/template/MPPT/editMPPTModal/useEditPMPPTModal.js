import { useState } from "react";
import * as yup from "yup";
import useAxiosPrivate from "../../../../../../../hooks/useAxiosPrivate";
import Constants from "../../../../../../../utils/Constants";
import { useTemplate } from "../../useTemplate";
import LibToast from "../../../../../../../utils/LibToast";
import { loginService } from "../../../../../../../services/loginService";
import { useNavigate } from "react-router-dom";
import { RowAdapter } from "../../../../../../../utils/TemplateHelper";

function useEditMPPTModal(data, close, setPoint, setCurrentData) {
  const axiosPrivate = useAxiosPrivate();
  const { id } = useTemplate();
  const navigate = useNavigate();

  const [modbusConfig, setModbusConfig] = useState(1);
  const [modbusRegisterType, setModbusRegisterType] = useState(1);
  const [selectedUnit, setSelectedUnit] = useState({
    value: data?.type_units?.id,
    label: data?.type_units?.namekey,
  });
  const [selectedDataType, setSelectedDataType] = useState({
    value: data?.type_datatype?.id,
    label: data?.type_datatype?.namekey,
  });
  const [selectedByteOrder, setSelectedByteOrder] = useState({
    value: data?.type_byteorder?.id,
    label: data?.type_byteorder?.namekey,
  });
  const [selectedPointListType, setSelectedPointListType] = useState({
    value: data?.type_point_list?.id,
    label: data?.type_point_list?.namekey,
  });
  const [selectedControlGroup, setSelectedControlGroup] = useState({
    value: data?.type_control?.id,
    label: data?.type_control?.namekey,
  });

  const validationSchema = yup.object({
    // index: yup.string().required('Required'),
    name: yup.string().required("Required"),
    register: yup.string().required("Required"),
  });

  const initialValues = {
    ...data,
    index: `pt${data?.index}`,
    unit: { value: data?.type_units?.id, label: data?.type_units?.namekey },
    class: data?.type_class?.namekey,
    data_type: {
      value: data?.type_datatype?.id,
      label: data?.type_datatype?.namekey,
    },
    byte_order: {
      value: data?.type_byteorder?.id,
      label: data?.type_byteorder?.namekey,
    },
    type_point_list: {
      value: data?.type_point_list?.id,
      label: data?.type_point_list?.namekey,
    },
    type_control: {
      value: data?.type_control?.id,
      label: data?.type_control?.namekey,
    },
    register: data?.register || 40000,
    slope: data?.slope || 0,
    offset: data?.offset || 0,
    invalidvalueenabled: data?.invalidvalueenabled,
    slopeenabled: data?.slopeenabled,
    offsetenabled: data?.offsetenabled,
    multregenabled: data?.multregenabled,
    nameedit: data?.nameedit,
    unitsedit: data?.unitsedit,
    control_enabled: data?.control_enabled,
  };

  const onSubmit = (values) => {
    if (!modbusConfig) {
      LibToast.toast("Please select a point type", "error");
      return;
    }
    if (!modbusRegisterType) {
      LibToast.toast("Please select a register type", "error");
      return;
    }

    let point = {
      ...values,
      id_template: id,
      index: parseInt(values.index.replace("pt", "")),
      unit: selectedUnit.label,
      id_pointclass_type: modbusRegisterType.id,
      id_type_units: selectedUnit.value,
      id_type_datatype: selectedDataType.value,
      id_type_byteorder: selectedByteOrder.value,
      id_pointtype: modbusConfig.id,
      id_point_list_type: selectedPointListType.value,
      id_control_group: selectedControlGroup.value,
      data_type: selectedDataType.label,
      byte_order: selectedByteOrder.label,
      class: modbusRegisterType?.namekey,
      type_point: modbusConfig,
      type_class: modbusRegisterType,
      type_units: selectedUnit.value
        ? { id: selectedUnit.value, namekey: selectedUnit.label }
        : null,
      type_datatype: selectedDataType.value
        ? { id: selectedDataType.value, namekey: selectedDataType.label }
        : null,
      type_byteorder: selectedByteOrder.value
        ? { id: selectedByteOrder.value, namekey: selectedByteOrder.label }
        : null,
      type_point_list: selectedPointListType.value
        ? {
            id: selectedPointListType.value,
            namekey: selectedPointListType.label,
          }
        : null,
      type_control: selectedControlGroup.value
        ? {
            id: selectedControlGroup.value,
            namekey: selectedControlGroup.label,
          }
        : null,
    };
    var output = document.getElementById("progress");
    output.innerHTML = "<div><img src='/loading.gif' /></div>";
    setTimeout(async () => {
      try {
        const response = await axiosPrivate.post(
          Constants.API_URL.TEMPLATE.POINT.UPDATE,
          {
            ...point,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response?.status === 200) {
          setPoint({
            ...new RowAdapter({ ...response.data }).getRow(),
          });
          setCurrentData({
            ...new RowAdapter({ ...response.data }).getRow(),
          });

          // close();
          LibToast.toast("Point updated successfully", "info");
        }
      } catch (error) {
        console.error("Failed to update point", error);
        let msg = loginService.handleMissingInfo(error);
        if (typeof msg === "string") {
          LibToast.toast(msg, "error");
        } else if (!msg) {
          LibToast.toast("Failed to update point", "error");
        } else {
          navigate("/");
        }
      }
    }, 500);
  };
  return {
    initialValues,
    modbusConfig,
    setModbusConfig,
    modbusRegisterType,
    setModbusRegisterType,
    validationSchema,
    selectedUnit,
    setSelectedUnit,
    selectedDataType,
    setSelectedDataType,
    selectedByteOrder,
    setSelectedByteOrder,
    selectedPointListType,
    setSelectedPointListType,
    selectedControlGroup,
    setSelectedControlGroup,
    onSubmit,
  };
}

export default useEditMPPTModal;
