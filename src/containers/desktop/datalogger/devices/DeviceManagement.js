import { Outlet, useNavigate } from "react-router-dom";
import Breadcrumb from "../../../../components/breadCrumb/BreadCrumb";
import { createContext, useContext, useEffect, useState } from "react";
import { loginService } from "../../../../services/loginService";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import Constants from "../../../../utils/Constants";
import _ from "lodash";
import useMQTT from "../../../../hooks/useMQTT";
import useProjectSetup from "../../../../hooks/useProjectSetup";
import { statusEnum } from "./useDevices";

const DeviceManagementContext = createContext();

export function useDeviceManagement() {
  return useContext(DeviceManagementContext);
}

export const DeviceManagementProvider = ({ children }) => {
  const [routes, setRoutes] = useState([
    {
      path: "/datalogger",
      name: "Dashboard",
    },
    {
      path: "/datalogger/devices",
      name: "Devices",
    },
  ]);
  const [allDevices, setAllDevices] = useState([]);
  const [device, setDevice] = useState(null);
  const [deviceConfig, setDeviceConfig] = useState({
    device_types: [],
    device_groups: [],
    template: [],
    communication: [],
  });
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(20);
  const [total, setTotal] = useState(0);
  const [deviceTypeComponents, setDeviceTypeComponents] = useState([]);
  const [clientSecret, setClientSecret] = useState("");
  const [deadletter, setDeadletter] = useState("");

  return (
    <DeviceManagementContext.Provider
      value={{
        routes,
        setRoutes,
        device,
        setDevice,
        deviceConfig,
        setDeviceConfig,
        allDevices,
        setAllDevices,
        offset,
        setOffset,
        limit,
        setLimit,
        total,
        setTotal,
        deviceTypeComponents,
        setDeviceTypeComponents,
        clientSecret,
        setClientSecret,
        deadletter,
        setDeadletter,
      }}
    >
      {children}
    </DeviceManagementContext.Provider>
  );
};

export function Device() {
  const {
    routes,
    deviceConfig,
    setDeviceConfig,
    allDevices,
    setAllDevices,
    offset,
    limit,
    setTotal,
    setDeviceTypeComponents,
    clientSecret,
    setClientSecret,
    setDeadletter,
  } = useDeviceManagement();
  const { client, isConnected, isSubscribed, mqttSub } = useMQTT();
  const { projectSetup } = useProjectSetup();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const output = document.getElementById("progress");
  const [feedbackTopic, setFeedbackTopic] = useState("");
  const [retryTime, setRetryTime] = useState(3);
  const fetchDevices = async ({ id, isPagination }) => {
    output.innerHTML = "<div><img src='/loading.gif' /></div>";
    try {
      const { data } = await axiosPrivate.post(
        `${Constants.API_URL.DEVICES.LIST}${
          isPagination && `?page=${offset}&limit=${limit}`
        }`,
        {
          id: id,
        }
      );
      let devices = data?.data.map((item) => ({
        ...item,
        state: statusEnum.reconnecting,
        status: "Reconnecting...",
      }));

      setRetryTime(3);
      output.innerHTML = "";
      return { devices, total: data?.total };
    } catch (error) {
      if (retryTime > 0) {
        setRetryTime(retryTime - 1);
        return;
      }
      loginService.handleMissingInfo(error, "Failed to get devices") &&
        navigate("/", { replace: true });
    } finally {
      if (retryTime === 1) {
        output.innerHTML = "";
      }
    }
  };

  useEffect(() => {
    if (allDevices.length === 0) return;

    setTimeout(setAllDevices([]), 300);
  }, [offset, limit]);

  useEffect(() => {
    if (allDevices.length > 0 || retryTime === 0) return;

    setTimeout(async () => {
      try {
        const devices = await fetchDevices({ id: null, isPagination: true });
        setAllDevices(_.cloneDeep(devices?.devices || []));
        setTotal(devices?.total || 0);
      } catch (error) {
        loginService.handleMissingInfo(error, "Failed to get devices") &&
          navigate("/", { replace: true });
      }
    }, 300);
  }, [allDevices, retryTime]);

  useEffect(() => {
    let isEmpty = true;
    Object.keys(deviceConfig).forEach((key) => {
      if (!isEmpty) return;
      if (!_.isEmpty(deviceConfig[key])) {
        isEmpty = false;
      }
    });

    isEmpty &&
      setTimeout(async () => {
        try {
          var device_type = await axiosPrivate.post(
            Constants.API_URL.DEVICES.CONFIG.TYPE
          );
          var device_group = await axiosPrivate.post(
            Constants.API_URL.DEVICES.CONFIG.GROUP
          );
          var template = await axiosPrivate.post(
            Constants.API_URL.TEMPLATE.LIST,
            {}
          );
          var communication = await axiosPrivate.post(
            Constants.API_URL.RS485.GET,
            {}
          );
          var deviceTypeComponents = await axiosPrivate.post(
            Constants.API_URL.DEVICES.COMPONENT.LIST
          );

          setDeviceConfig({
            device_types: device_type.data,
            device_groups: device_group.data,
            template: template.data,
            communication: communication.data,
          });
          setDeviceTypeComponents(deviceTypeComponents.data);
        } catch (error) {
          loginService.handleMissingInfo(
            error,
            "Failed to get device configuration"
          ) && navigate("/", { replace: true });
        }
      }, 300);
  }, []);

  useEffect(() => {
    if (clientSecret) return;

    setClientSecret(
      Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2)
    );
  }, [clientSecret]);

  useEffect(() => {
    if (isConnected && projectSetup?.serial_number) {
      let fbTopic = `${projectSetup?.serial_number}/InitDevices/dead-letter`;
      setFeedbackTopic(fbTopic);
      mqttSub({ topic: fbTopic, qos: 0 });
    }
  }, [isConnected, projectSetup?.serial_number]);

  useEffect(() => {
    if (
      isConnected &&
      isSubscribed &&
      projectSetup?.serial_number &&
      feedbackTopic
    ) {
      client.on("message", (topic, message) => {
        const payload = { topic, message: message.toString() };
        if (topic === feedbackTopic) {
          const response = JSON.parse(atob(payload.message));
          if (response?.metadata?.code === clientSecret) {
            let action = response?.message?.type.split("/");
            action = action[action.length - 1];
            setDeadletter({
              message: `An error occurred while ${action} devices`,
              devices: response?.message?.devices,
            });
          }
        }
      });
    }
  }, [isConnected, isSubscribed, projectSetup?.serial_number, feedbackTopic]);

  return (
    <div className="main">
      <Breadcrumb routes={routes} />
      <Outlet />
    </div>
  );
}

export function DeviceManagement() {
  return (
    <DeviceManagementProvider>
      <Device />
    </DeviceManagementProvider>
  );
}
