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
import { ungzip } from "pako";
import Libs from "../../../../utils/Libs";

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
  const [isEmpty, setIsEmpty] = useState(false);
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
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [deviceTypeComponents, setDeviceTypeComponents] = useState([]);
  const [connectionTypes, setConnectionTypes] = useState([]);
  const [clientSecret, setClientSecret] = useState("");
  const [deadletter, setDeadletter] = useState("");
  const [updateMsg, setUpdateMsg] = useState({});
  const [retryTime, setRetryTime] = useState(3);
  const [isFetching, setIsFetching] = useState(false);

  const serviceUtils = {};
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();

  serviceUtils.getAdditionCount = async (table, props) => {
    try {
      const response = await axiosPrivate.post(
        Constants.API_URL.DEVICES.COMPONENT.ADDITION,
        { table, ...props }
      );

      return response.data;
    } catch (error) {
      loginService.handleMissingInfo(error, "Failed to get number of MPPT") &&
        navigate("/", { replace: true });
    }
  };

  serviceUtils.getInputMapDetail = async (id) => {
    if (!id) return;
    try {
      const response = await axiosPrivate.post(
        Constants.API_URL.DEVICES.INPUT.GET + "?input_map_id=" + id
      );

      return response.data.name;
    } catch (error) {
      loginService.handleMissingInfo(error, "Failed to get MPPT details") &&
        navigate("/", { replace: true });
    }
  };

  const fetchDevices = async (props) => {
    if (!props?.isPagination) {
      Libs.progress(true);
    }
    try {
      const { data } = await axiosPrivate.post(
        `${Constants.API_URL.DEVICES.LIST}${
          props?.isPagination || (!props?.isPagination && !props?.id)
            ? `?page=${offset}&limit=${limit}`
            : ""
        }`,
        !props?.isPagination ? { id: props?.id } : {}
      );

      var devices = data;
      if (props?.isPagination) {
        setRetryTime(3);
        devices = devices?.data.map((item) => ({
          ...item,
          state: statusEnum.reconnecting,
          status: "Reconnecting...",
        }));
      }
      Libs.progress(false);
      return { devices, total: data?.total };
    } catch (error) {
      if (retryTime > 0 && props?.isPagination) {
        setRetryTime(retryTime - 1);
        return;
      }
      loginService.handleMissingInfo(error, "Failed to get devices") &&
        navigate("/", { replace: true });
    } finally {
      if (retryTime === 1 || !props?.isPagination) {
        Libs.progress(false);
      }
    }
  };

  const UPDATE_ACTION = {
    refresh: () => {
      setRetryTime(retryTime - 1);
    },
  };

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
        currentPageIndex,
        setCurrentPageIndex,
        serviceUtils,
        isEmpty,
        setIsEmpty,
        connectionTypes,
        setConnectionTypes,
        updateMsg,
        setUpdateMsg,
        retryTime,
        fetchDevices,
        isFetching,
        setIsFetching,
        UPDATE_ACTION,
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
    setAllDevices,
    offset,
    limit,
    setTotal,
    setDeviceTypeComponents,
    clientSecret,
    setClientSecret,
    setDeadletter,
    isEmpty,
    setIsEmpty,
    device,
    setCurrentPageIndex,
    setConnectionTypes,
    updateMsg,
    setUpdateMsg,
    retryTime,
    fetchDevices,
    isFetching,
    setIsFetching,
    UPDATE_ACTION,
  } = useDeviceManagement();
  const { client, state, mqttSub } = useMQTT();
  const { isConnected, isSubscribed } = state;
  const { projectSetup } = useProjectSetup();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const [feedbackTopic, setFeedbackTopic] = useState({});

  useEffect(() => {
    if (_.isEmpty(updateMsg)) return;

    const { message } = updateMsg;
    if (UPDATE_ACTION?.[message]) {
      UPDATE_ACTION[message]();
    }
    setUpdateMsg({});
  }, [updateMsg]);

  useEffect(() => {
    if (isFetching || retryTime === 0 || isEmpty) return;
    setIsFetching(true);
    setTimeout(async () => {
      try {
        const devices = await fetchDevices({ id: null, isPagination: true });
        const allDevices = devices?.devices || [];
        setAllDevices(allDevices);
        setTotal(devices?.total || 0);
        setIsEmpty(devices?.devices?.length === 0);
        setIsFetching(false);
      } catch (error) {
        loginService.handleMissingInfo(error, "Failed to get devices") &&
          navigate("/", { replace: true });
      }
    }, 300);
  }, [retryTime, isEmpty, offset, limit]);

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
          var connectionTypes = await axiosPrivate.post(
            Constants.API_URL.DEVICES.CONNECTION.GET
          );

          setDeviceConfig({
            device_types: device_type.data,
            device_groups: device_group.data,
            template: template.data,
            communication: communication.data,
          });
          setDeviceTypeComponents(deviceTypeComponents.data);
          setConnectionTypes(connectionTypes.data);
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
      let updateTopic = `${projectSetup?.serial_number}/InitDevices/refresh`;
      setFeedbackTopic({
        ...feedbackTopic,
        [fbTopic]: setDeadletter,
        [updateTopic]: setUpdateMsg,
      });
      mqttSub({ topic: fbTopic, qos: 0 });
      mqttSub({ topic: updateTopic, qos: 0 });
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
        if (typeof feedbackTopic?.[topic] !== "undefined") {
          let decoded = atob(message);
          let messageArr = Uint8Array.from(decoded, (c) => c.charCodeAt(0));
          const payload = {
            topic,
            ...JSON.parse(ungzip(messageArr, { to: "string" })),
          };
          console.log("payload", payload);
          if (payload?.metadata?.code === clientSecret) {
            var msg = payload.message?.data;
            console.log("msg", msg);
            if (!msg) {
              msg = payload.message?.type?.split("/");
              msg = `An unexpected error occured while ${msg[msg.length - 1]}`;
            }
            feedbackTopic?.[topic]({
              message: msg,
            });
          }
        }
      });
    }
  }, [isConnected, isSubscribed, projectSetup?.serial_number, feedbackTopic]);

  useEffect(() => {
    setCurrentPageIndex(offset / limit);
  }, [device]);

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
