/********************************************************
 * Copyright 2020-2021 NEXT WAVE ENERGY MONITORING INC.
 * All rights reserved.
 *
 *********************************************************/

import _ from "lodash";
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
    const [deviceData, setDeviceData] = useState([]);
    const [cpuData, setCPUData] = useState([]);

    const publishMessage = (topic, message) => {
        if (!client) return;

        if (!(typeof topic === "string") && _.isEmpty(message)) return;

        client.publish(topic, JSON.stringify(message));
    };

    return (
        <MQTTReader.Provider
            value={{
                client,
                setClient,
                isConnected,
                setIsConnected,
                isSubscribed,
                setIsSubscribed,
                data: deviceData,
                setData: setDeviceData,
                cpuData,
                setCPUData,
                publishMessage,
            }}>
            {children}
        </MQTTReader.Provider>
    );
};

export default MQTTReader;
