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
  const [state, setState] = useState({
    isConnected: false,
    isSubscribed: false,
    isReconnecting: false,
  });
  const [deviceData, setDeviceData] = useState([]);
  const [cpuData, setCPUData] = useState([]);

  const publishMessage = (topic, message) => {
    if (!client) return;

    if (!(typeof topic === "string") && _.isEmpty(message)) return;

    client.publish(topic, JSON.stringify(message));
  };

  const mqttSub = (subscription) => {
    if (client) {
      const { topic, qos } = subscription;
      client.subscribe(topic, { qos }, (error) => {
        if (error) {
          return;
        }
        setState({ ...state, isSubscribed: true });
      });
    }
  };

  return (
    <MQTTReader.Provider
      value={{
        client,
        setClient,
        state,
        setState,
        data: deviceData,
        setData: setDeviceData,
        cpuData,
        setCPUData,
        publishMessage,
        mqttSub,
      }}
    >
      {children}
    </MQTTReader.Provider>
  );
};

export default MQTTReader;
