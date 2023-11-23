import { useState } from "react";
import * as yup from 'yup';

function useEditPointModal() {
    const [modbusConfig, setModbusConfig] = useState(1);
    const [modbusRegisterType, setModbusRegisterType] = useState(1);

    const validationSchema = yup.object({
        id: yup.string().required('Required'),
        name: yup.string().required('Required'),
        unit: yup.object().required('Required')
    });

    return {
        modbusConfig,
        setModbusConfig,
        modbusRegisterType,
        setModbusRegisterType,
        validationSchema
    };
}

export default useEditPointModal;