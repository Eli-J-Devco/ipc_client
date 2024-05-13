/********************************************************
 * Copyright 2020-2021 NEXT WAVE ENERGY MONITORING INC.
 * All rights reserved.
 *
 *********************************************************/

import { useContext } from "react";
import MQTTReader from "../context/MQTTReaderProvider";

/**
 * Get MQTT context
 * @author nhan.tran 2024-05-10
 * @return useContext
 */
const useMQTT = () => {
    return useContext(MQTTReader);
};

export default useMQTT;
