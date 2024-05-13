/********************************************************
 * Copyright 2020-2021 NEXT WAVE ENERGY MONITORING INC.
 * All rights reserved.
 *
 *********************************************************/

import { createContext, useState } from "react";

const MQTTReader = createContext({});

/**
 * MQTT context
 * @author nhan.tran 2024-05-10
 * @param { { children }}
 * @return Object
 */
export const MQTTProvider = ({ children }) => {
    const [client, setClient] = useState(null);
    const [isConnected, setIsConnected] = useState(false);
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [data, setData] = useState([]);

    return (
        <MQTTReader.Provider
            value={{
                client,
                setClient,
                isConnected,
                setIsConnected,
                isSubscribed,
                setIsSubscribed,
                data,
                setData
            }}>
            {children}
        </MQTTReader.Provider>
    );
};

export default MQTTReader;
