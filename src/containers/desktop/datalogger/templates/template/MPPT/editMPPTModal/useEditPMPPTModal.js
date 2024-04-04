import { useState } from "react";
import * as yup from 'yup';

function useEditMPPTModal(data, close, setPoint) {
    const [modbusConfig, setModbusConfig] = useState(1);
    const [modbusRegisterType, setModbusRegisterType] = useState(1);
    const [selectedUnit, setSelectedUnit] = useState({ value: data?.type_units?.id, label: data?.type_units?.unit });
    const [selectedDataType, setSelectedDataType] = useState({ value: data?.type_datatype?.data_type, label: data?.type_datatype?.data_type });
    const [selectedByteOrder, setSelectedByteOrder] = useState({ value: data?.type_byteorder?.byte_order, label: data?.type_byteorder?.byte_order });

    const validationSchema = yup.object({
        // index: yup.string().required('Required'),
        name: yup.string().required('Required'),
        unit: yup.object().required('Required')
    });

    const initialValues = {
        ...data,
        index: `pt${data?.index}`,
        unit: { value: data?.type_units?.id, label: data?.type_units?.unit },
        class: data?.type_class?.type_class,
        data_type: { value: data?.type_datatype?.data_type, label: data?.type_datatype?.data_type },
        byte_order: { value: data?.type_byteorder?.byte_order, label: data?.type_byteorder?.byte_order },
        register: data?.register,
        slope: data?.slope,
        offset: data?.offset,
        check_invalid: data?.check_invalid,
        check_slope: data?.check_slope,
        check_offset: data?.check_offset,
        check_multreg: data?.check_multreg,
        check_name: data?.check_name,
        check_unit: data?.check_unit,
    };

    const onSubmit = (values) => {
        setPoint({
            ...values,
            index: parseInt(values.index.replace('pt', '')),
            unit: selectedUnit.label,
            data_type: selectedDataType.label,
            byte_order: selectedByteOrder.label,
            class: modbusRegisterType?.type_class,
            type_point: modbusConfig,
            type_class: modbusRegisterType,
            type_units: { id: selectedUnit.value, unit: selectedUnit.label },
            type_datatype: { id: selectedDataType.value, data_type: selectedDataType.label },
            type_byteorder: { id: selectedByteOrder.value, byte_order: selectedByteOrder.label },
        })
        close();
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
        onSubmit
    };
}

export default useEditMPPTModal;