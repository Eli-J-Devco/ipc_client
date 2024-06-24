/********************************************************
 * Copyright 2020-2021 NEXT WAVE ENERGY MONITORING INC.
 * All rights reserved.
 *
 *********************************************************/

import React, { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import mqtt from "mqtt";

import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import useProjectSetup from "../../../hooks/useProjectSetup";
import useAuth from "../../../hooks/useAuth";
import useMQTT from "../../../hooks/useMQTT";
import { loginService } from "../../../services/loginService";

import Constants from "../../../utils/Constants";

const ProjectSetupInformation = () => {
  const {
    projectSetup,
    setProjectSetup,
    setEthernetConfig,
    setRS485Config,
    setLoggingIntervalConfig,
    setUploadChanelConfig,
    setScreenList,
    setRoles,
  } = useProjectSetup();
  const { auth, setAuth } = useAuth();
  const { client, setClient, state, setState, setData, setCPUData, mqttSub } =
    useMQTT();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/datalogger/quickstart";
  const output = document.getElementById("progress");

  /**
   * Fetch project setup information from server
   * @author nhan.tran 2024-03-11
   */
  useEffect(() => {
    output.innerHTML = "<div><img src='/loading.gif' alt='loading' /></div>";
    setTimeout(async () => {
      try {
        const response = await axiosPrivate.post(
          Constants.API_URL.PROJECT.PROJECT_INFO
        );
        setProjectSetup(response.data);
      } catch (error) {
        loginService.handleMissingInfo(
          error,
          "Failed to fetch project setup information"
        ) && navigate("/", { replace: true });
      } finally {
      }
    }, 300);
  }, []);

  useEffect(() => {
    setTimeout(async () => {
      try {
        const response = await axiosPrivate.post(
          Constants.API_URL.ETHERNET.IFCONFIG
        );
        setEthernetConfig(response.data);
      } catch (error) {
        loginService.handleMissingInfo(
          error,
          "Failed to fetch ethernet configuration"
        ) && navigate("/", { replace: true });
      } finally {
      }
    }, 300);
  }, []);

  useEffect(() => {
    setTimeout(async () => {
      try {
        const response = await axiosPrivate.post(
          Constants.API_URL.RS485.CONFIG
        );
        setRS485Config(response.data);
      } catch (error) {
        loginService.handleMissingInfo(
          error,
          "Failed to fetch RS485 configuration"
        ) && navigate("/", { replace: true });
      } finally {
      }
    }, 300);
  }, []);

  useEffect(() => {
    setTimeout(async () => {
      try {
        const response = await axiosPrivate.post(
          Constants.API_URL.PROJECT.LOGGING_RATE
        );
        setLoggingIntervalConfig(response.data);
      } catch (error) {
        loginService.handleMissingInfo(
          error,
          "Failed to fetch logging interval configuration"
        ) && navigate("/", { replace: true });
      } finally {
      }
    }, 300);
  }, []);

  useEffect(() => {
    setTimeout(async () => {
      try {
        const response = await axiosPrivate.post(
          Constants.API_URL.UPLOAD_CHANNEL.CONFIG
        );
        setUploadChanelConfig(response.data);
      } catch (error) {
        loginService.handleMissingInfo(
          error,
          "Failed to fetch upload channel configuration"
        ) && navigate("/", { replace: true });
      } finally {
      }
    }, 300);
  }, []);

  useEffect(() => {
    setTimeout(async () => {
      try {
        const response = await axiosPrivate.post(
          Constants.API_URL.PROJECT.SCREENS
        );
        setScreenList(response.data);
      } catch (error) {
        loginService.handleMissingInfo(error, "Failed to fetch screen list") &&
          navigate("/", { replace: true });
      } finally {
      }
    }, 300);
  }, []);

  useEffect(() => {
    setTimeout(async () => {
      try {
        const response = await axiosPrivate.post(Constants.API_URL.ROLE.LIST);
        setRoles(response.data);
      } catch (error) {
        loginService.handleMissingInfo(error, "Failed to fetch roles") &&
          navigate("/", { replace: true });
      } finally {
      }
    }, 300);
  }, []);

  useEffect(() => {
    if (client) return;

    const initialConnectionOptions = {
      protocol: "ws",
      host: Constants.MQTT_CONFIG.HOST,
      clientId:
        Constants.MQTT_CONFIG.CLIENT_ID +
        Math.random().toString(16).substring(2, 8),
      port: Constants.MQTT_CONFIG.PORT,
      username: Constants.MQTT_CONFIG.USERNAME,
      password: Constants.MQTT_CONFIG.PASSWORD,
    };
    const { protocol, host, clientId, port, username, password } =
      initialConnectionOptions;
    const url = `${protocol}://${host}:${port}/mqtt`;
    const options = {
      clientId,
      username,
      password,
      clean: true,
      reconnectPeriod: 1000, // ms
      connectTimeout: 30 * 1000, // ms
    };
    setTimeout(() => {
      setClient(mqtt.connect(url, options));
    }, 300);
  }, [client]);

  useEffect(() => {
    if (client && !state.isConnected) {
      client.on("connect", () => {
        setState({ ...state, isConnected: true });
      });

      client.on("reconnect", () => {
        setState({ ...state, isReconnecting: true });
      });

      client.on("error", (err) => {
        client.end();
      });
    }
  }, [client]);

  useEffect(() => {
    if (state.isConnected && projectSetup?.serial_number) {
      mqttSub({ topic: `${projectSetup?.serial_number}/Devices/All`, qos: 0 });
      mqttSub({
        topic: `${projectSetup?.serial_number}/CPU/Information`,
        qos: 0,
      });
    }
  }, [state.isConnected, projectSetup?.serial_number]);

  useEffect(() => {
    if (
      state.isConnected &&
      state.isSubscribed &&
      projectSetup?.serial_number
    ) {
      client.on("message", (topic, message) => {
        const payload = { topic, message: message.toString() };

        if (topic === `${projectSetup?.serial_number}/CPU/Information`) {
          const cpu = JSON.parse(payload.message);
          setCPUData(cpu);
        }

        if (topic === `${projectSetup?.serial_number}/Devices/All`) {
          const devices = JSON.parse(payload.message);
          setData(devices);
        }
      });
    }
  }, [state, projectSetup?.serial_number]);

  /**
   * Redirect to first page on login if user has just logged in and first page on login in project setup is available
   * @author nhan.tran 2024-03-11
   */
  useEffect(() => {
    if (projectSetup?.id && auth?.hasJustLoggedIn) {
      setAuth({ ...auth, hasJustLoggedIn: false });
      navigate(projectSetup?.first_page_on_login?.path, {
        replace: true,
        state: { from: from },
      });
    }
    output.innerHTML = "";
  }, [from, auth, projectSetup, navigate, setAuth, output]);

  return (
    <div>{projectSetup && !auth?.hasJustLoggedIn ? <Outlet /> : <p></p>}</div>
  );
};

export default ProjectSetupInformation;
