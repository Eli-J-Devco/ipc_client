import { useState } from "react";
import * as yup from 'yup';

function useEditPointModal(data) {
    const [modbusConfig, setModbusConfig] = useState(1);
    const [modbusRegisterType, setModbusRegisterType] = useState(1);
    const [selectedUnit, setSelectedUnit] = useState({ value: data?.type_units?.id, label: data?.type_units?.unit });

    const validationSchema = yup.object({
        id: yup.string().required('Required'),
        name: yup.string().required('Required'),
        unit: yup.object().required('Required')
    });

    const initialValues = {
        ...data,
        index: `pt${data?.index}`,
        unit: { value: data?.type_units?.id, label: data?.type_units?.unit },
        unit_name: data?.type_units?.unit,
        class: data?.type_class?.type_class,
        data_type: { value: data?.type_datatype?.data_type, label: data?.type_datatype?.data_type },
        byte_order: { value: data?.type_byteorder?.byte_order, label: data?.type_byteorder?.byte_order },
        register: data?.register,
        slope: data?.slope,
        offset: data?.offset,
        check_invalid: data?.invalidvalueenabled,
        check_slope: data?.slopeenabled,
        check_offset: data?.offsetenabled,
        check_multreg: data?.multregenabled,
        check_name: data?.nameedit,
        check_unit: data?.unitsedit,
    };

    return {
        initialValues,
        validationSchema,
        modbusConfig,
        setModbusConfig,
        modbusRegisterType,
        setModbusRegisterType,
        selectedUnit,
        setSelectedUnit
    };
}

export default useEditPointModal;