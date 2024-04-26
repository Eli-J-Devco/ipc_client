/********************************************************
 * Copyright 2020-2021 NEXT WAVE ENERGY MONITORING INC.
 * All rights reserved.
 *
 *********************************************************/

import React, { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import useProjectSetup from '../../../hooks/useProjectSetup';
import useAuth from '../../../hooks/useAuth';
import { loginService } from '../../../services/loginService';

import Constants from '../../../utils/Constants';

const ProjectSetupInformation = () => {
    const {
        projectSetup,
        setProjectSetup,
        setEthernetConfig,
        setRS485Config,
        setLoggingIntervalConfig,
        setUploadChanelConfig,
        setScreenList,
        setRoles
    } = useProjectSetup();
    const { auth, setAuth } = useAuth();
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
                const response = await axiosPrivate.post(Constants.API_URL.PROJECT.PROJECT_INFO);
                setProjectSetup(response.data);
            } catch (error) {
                loginService.handleMissingInfo(error, "Failed to fetch project setup information") && navigate("/", { replace: true });
            } finally {
            }
        }, 300);
    }, []);

    useEffect(() => {
        setTimeout(async () => {
            try {
                const response = await axiosPrivate.post(Constants.API_URL.ETHERNET.IFCONFIG);
                setEthernetConfig(response.data);
            } catch (error) {
                loginService.handleMissingInfo(error, "Failed to fetch ethernet configuration") && navigate("/", { replace: true });
            } finally {
            }
        }, 300);
    }, []);

    useEffect(() => {
        setTimeout(async () => {
            try {
                const response = await axiosPrivate.post(Constants.API_URL.RS485.CONFIG);
                setRS485Config(response.data);
            } catch (error) {
                loginService.handleMissingInfo(error, "Failed to fetch RS485 configuration") && navigate("/", { replace: true });
            } finally {
            }
        }, 300);
    }, []);

    useEffect(() => {
        setTimeout(async () => {
            try {
                const response = await axiosPrivate.post(Constants.API_URL.PROJECT.LOGGING_RATE);
                setLoggingIntervalConfig(response.data);
            } catch (error) {
                loginService.handleMissingInfo(error, "Failed to fetch logging interval configuration") && navigate("/", { replace: true });
            } finally {
            }
        }, 300);
    }, []);

    useEffect(() => {
        setTimeout(async () => {
            try {
                const response = await axiosPrivate.post(Constants.API_URL.UPLOAD_CHANNEL.CONFIG);
                setUploadChanelConfig(response.data);
            } catch (error) {
                loginService.handleMissingInfo(error, "Failed to fetch upload channel configuration") && navigate("/", { replace: true });
            } finally {
            }
        }, 300);
    }, []);

    useEffect(() => {
        setTimeout(async () => {
            try {
                const response = await axiosPrivate.post(Constants.API_URL.PROJECT.SCREENS);
                setScreenList(response.data);
            } catch (error) {
                loginService.handleMissingInfo(error, "Failed to fetch screen list") && navigate("/", { replace: true });
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
                loginService.handleMissingInfo(error, "Failed to fetch roles") && navigate("/", { replace: true });
            } finally {
            }
        }, 300);
    }, []);

    /**
     * Redirect to first page on login if user has just logged in and first page on login in project setup is available
     * @author nhan.tran 2024-03-11
     */
    useEffect(() => {
        if (projectSetup?.id && auth?.hasJustLoggedIn) {
            setAuth({ ...auth, hasJustLoggedIn: false });
            navigate(projectSetup?.first_page_on_login?.path, { replace: true, state: { from: from } });
        }
        output.innerHTML = "";

    }, [from, auth, projectSetup, navigate, setAuth, output]);

    return (
        <div>
            {projectSetup && !auth?.hasJustLoggedIn ? (
                <Outlet />
            ) : (
                <p></p>
            )}
        </div>
    );
};

export default ProjectSetupInformation;