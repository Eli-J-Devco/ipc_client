/********************************************************
 * Copyright 2020-2021 NEXT WAVE ENERGY MONITORING INC.
 * All rights reserved.
 *
 *********************************************************/
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import styles from './Done.module.scss';

import useAxiosPrivate from "../../../../../hooks/useAxiosPrivate";
import useProjectSetup from "../../../../../hooks/useProjectSetup";
import { loginService } from "../../../../../services/loginService";

import { RButton } from './../../../../../components/Controls';
import ReactSelectDropdown from '../../../../../components/ReactSelectDropdown';
import Constants from "../../../../../utils/Constants";
import LibToast from "../../../../../utils/LibToast";
import _ from "lodash";

function Done() {
    const axiosPrivate = useAxiosPrivate();
    const { t } = useTranslation();

    const [selectedDone, setSelectedDone] = useState();
    const [link, setLink] = useState([]);
    const existedLink = useRef();
    const { projectSetup, setProjectSetup } = useProjectSetup();

    const navigate = useNavigate();
    const location = useLocation();
    const from =
        location.state?.from?.pathname || "/datalogger/quickstart/upload-channels";

    useEffect(() => {
        /**
         * Fetch first page when login from project setup and set to state
         * @author: nhan.tran 2024-03-07
         * @returns {Promise<void>}
         */
        if (_.isEmpty(projectSetup)) return;

        var output = document.getElementById("progress");
        output.innerHTML = "<div><img src='/loading.gif' /></div>";
        setTimeout(() => {
            var screens = projectSetup?.screen_list;
            setLink(screens.map((item) => ({ value: { id: item.id, path: item.path }, label: item.screen_name })));
            var existed = screens.filter((item) => item.id === projectSetup?.id_first_page_on_login)[0];
            setSelectedDone({ value: { id: existed.id, path: existed.path }, label: existed.screen_name });
            existedLink.current = { value: { id: existed.id, path: existed.path }, label: existed.screen_name };
            output.innerHTML = "";
        }, 100);
    }, [projectSetup]);

    /**
     * Handle dropdown change
     * @author: nhan.tran 2024-03-07
     * @param value
     */
    const handleDropdownChange = (value) => {
        setTimeout(() => {
            setSelectedDone(value);
        }, 100);
    }

    /**
     * Handle submit first page when login to server and update project setup state
     * @author nhan.tran 2024-03-11
     */
    const handleSubmit = () => {
        if (selectedDone.value === existedLink.current.value) {
            LibToast.toast(t("toastMessage.info.noChange"), "info");
            return;
        }
        const data = {
            id_first_page_on_login: selectedDone.value.id
        }

        const updateFirstPage = async () => {
            try {
                var output = document.getElementById("progress");
                output.innerHTML = "<div><img src='/loading.gif' /></div>";
                const response = await axiosPrivate.post(Constants.API_URL.PROJECT.UPDATE_FIRST_PAGE, data,
                    { headers: { "Content-Type": "application/json" } }
                );
                if (response.status === 200) {
                    LibToast.toast("Your fisrt page when login " + t("toastMessage.info.update"), "info");
                    setProjectSetup({ ...projectSetup, id_first_page_on_login: selectedDone.value.id, first_page_on_login: { id: selectedDone.value.id, path: selectedDone.value.path, screen_name: selectedDone.label } });
                    navigate(selectedDone?.value?.path, { state: { from: from } });
                }
            } catch (error) {
                if (!loginService.handleMissingInfo(error))
                    LibToast.toast(t("toastMessage.error.update"), "error");
                else navigate("/", { replace: true });
            } finally {
                output.innerHTML = "";
            }
        }

        updateFirstPage();
    };

    return (
        <div className={styles.done}>
            <div className='note'>
                <p> {t('site.done_note')} </p>
            </div>

            <div className={styles.form_body}>
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-3'></div>
                        <div className='col-md-6'>
                            <div className='mb-3'>
                                <div className='form_dropdown'>
                                    <ReactSelectDropdown
                                        label={t('site.go_to_page')}
                                        className="go_to_page"
                                        inputId="go_to_page"
                                        inputName="go_to_page"
                                        name="go_to_page"
                                        value={selectedDone}
                                        onChange={handleDropdownChange}
                                        optionList={link}

                                    />
                                </div>
                            </div>

                            <div className='form-footer'>
                                <div className='mb-3'>
                                    <RButton
                                        className="btn_back"
                                        text="Back"
                                        iClass={true}
                                        iClassType="back"
                                    />

                                    <RButton
                                        className="btn_save margin-left15"
                                        text="Save"
                                        iClass={true}
                                        iClassType="save"
                                        onClick={handleSubmit}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className='col-md-3'></div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Done;