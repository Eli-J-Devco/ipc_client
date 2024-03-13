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
import LibToast from '../../../utils/LibToast';

const ProjectSetupInformation = () => {
    const { projectSetup, setProjectSetup } = useProjectSetup();
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
        const fetchProjectSetup = async () => {
            try {
                const response = await axiosPrivate.post(Constants.API_URL.PROJECT.PROJECT_INFO);
                setTimeout(() => {
                    setProjectSetup(response.data);
                }, 300);
            } catch (error) {
                if (!loginService.handleMissingInfo(error)) {
                    LibToast.toast("Error fetching project setup", "error");
                }
                else navigate("/", { replace: true });
            } finally {
            }
        };

        fetchProjectSetup();
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
            {projectSetup ? (
                <Outlet />
            ) : (
                <p></p>
            )}
        </div>
    );
};

export default ProjectSetupInformation;