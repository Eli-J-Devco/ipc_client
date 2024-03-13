/********************************************************
 * Copyright 2020-2021 NEXT WAVE ENERGY MONITORING INC.
 * All rights reserved.
 *
 *********************************************************/
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import Rs485Template from "../../RS485/Rs485Template";
import useRS485 from "../../RS485/useRS485";

function Rs485Two() {
    const { fetchRS485, handleSave, selectedDropdown, selectedOption, options, namekey, back, save } = useRS485();

    const location = useLocation();
    const from =
        location.state?.from?.pathname || "/datalogger/quickstart/rs485-1";
    const to = "/datalogger/quickstart/logging-rate";

    useEffect(() => {
        fetchRS485(2);
    }, []);

    return (
        <Rs485Template id={2} isBack={true} from={from} to={to} save={save} selectedDropdown={selectedDropdown} selectedOption={selectedOption} options={options} namekey={namekey} back={back} handleSave={handleSave} />
    );
}

export default Rs485Two;