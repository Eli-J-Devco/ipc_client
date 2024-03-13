/********************************************************
 * Copyright 2020-2021 NEXT WAVE ENERGY MONITORING INC.
 * All rights reserved.
 *
 *********************************************************/
import { useEffect } from "react";
import useRS485 from "../../RS485/useRS485";
import Rs485Template from "../../RS485/Rs485Template";
import { useLocation } from "react-router-dom";

function Rs485One() {
    const { fetchRS485, handleSave, selectedDropdown, selectedOption, options, namekey, back, save } = useRS485();

    const location = useLocation();
    const from =
        location.state?.from?.pathname || "/datalogger/quickstart/ethernet-2";
    const to = "/datalogger/quickstart/rs485-2";
    useEffect(() => {
        fetchRS485(1);
    }, []);

    return (
        <Rs485Template id={1} isBack={true} from={from} to={to} save={save} selectedDropdown={selectedDropdown} selectedOption={selectedOption} options={options} namekey={namekey} back={back} handleSave={handleSave} />
    );
}

export default Rs485One;