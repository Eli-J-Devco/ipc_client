import { useState } from "react";

function useEditPointModal() {
    const [modbusConfig, setModbusConfig] = useState(1);
    const [modbusRegisterType, setModbusRegisterType] = useState(1);

    return {
        modbusConfig,
        setModbusConfig,
        modbusRegisterType,
        setModbusRegisterType
    };
}

export default useEditPointModal;