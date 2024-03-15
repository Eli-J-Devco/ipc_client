/********************************************************
 * Copyright 2020-2021 NEXT WAVE ENERGY MONITORING INC.
 * All rights reserved.
 *
 *********************************************************/
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import styles from './LoggingRate.module.scss';

import useAxiosPrivate from "../../../../../hooks/useAxiosPrivate";
import { loginService } from "../../../../../services/loginService";

import { RButton } from './../../../../../components/Controls';
import ReactSelectDropdown from '../../../../../components/ReactSelectDropdown';
import Constants from "../../../../../utils/Constants";
import LibToast from "../../../../../utils/LibToast";
import useProjectSetup from "../../../../../hooks/useProjectSetup";

function LoggingRate() {
    const axiosPrivate = useAxiosPrivate();
    const { t } = useTranslation();

    const { projectSetup, setProjectSetup } = useProjectSetup();

    const [selectedLoggingRate, setSelectedLoggingRate] = useState();
    const [loggingRate, setLoggingRate] = useState([]);
    const [existedLoggingRate, setExistedLoggingRate] = useState();

    const navigate = useNavigate();
    const location = useLocation();
    const from =
        location.state?.from?.pathname || "/datalogger/quickstart/rs485-2";
    const to = "/datalogger/quickstart/upload-channels";

    useEffect(() => {
        /**
         * Get logging rate from project setup and set to state
         * @author: nhan.tran 2024-03-11
         */
        if (!projectSetup) return;
        var output = document.getElementById("progress");
        output.innerHTML = "<div><img src='/loading.gif' /></div>";
        setTimeout(() => {
            var rate = projectSetup?.logging_interval_list;
            setLoggingRate(rate.map((item) => ({ value: item.id, label: item.time })));
            setSelectedLoggingRate({ value: projectSetup?.id_logging_interval, label: rate.filter((item) => item.id === projectSetup?.id_logging_interval)[0].time });
            setExistedLoggingRate({ value: projectSetup?.id_logging_interval, label: rate.filter((item) => item.id === projectSetup?.id_logging_interval)[0].time });
            output.innerHTML = "";
        }, 100);
    }, [projectSetup]);

    /**
     * Handle dropdown change
     * @author: nhan.tran 2024-03-07
     * @param value
     */
    const handleDropdownChange = (value) => {
        setSelectedLoggingRate(value);
    }

    /**
     * Handle submit logging rate to server and update project setup state
     * @author nhan.tran 2024-03-11
     */
    const handleSubmit = () => {
        // Check if selected logging rate is the same as existed logging rate
        if (selectedLoggingRate.value === existedLoggingRate.value) {
            LibToast.toast(t("toastMessage.info.noChange"), "info");
            return;
        }


        const data = {
            id_logging_interval: selectedLoggingRate.value
        }

        const updateLoggingRate = async () => {
            try {
                var output = document.getElementById("progress");
                const response = await axiosPrivate.post(Constants.API_URL.PROJECT.UPDATE_LOGGING_RATE, data, {
                    onDownloadProgress: () => {
                        output.innerHTML = "<div><img src='/loading.gif' /></div>";
                    },
                });
                if (response.status === 200) {
                    LibToast.toast("Logging rate " + t("toastMessage.info.update"), "info");
                    setProjectSetup({ ...projectSetup, id_logging_interval: selectedLoggingRate.value, logging_interval: { id: selectedLoggingRate.value, time: selectedLoggingRate.label } });
                    navigate(to, { state: { from: from } });
                }
            } catch (error) {
                if (!loginService.handleMissingInfo(error))
                    LibToast.toast(t("toastMessage.error.update"), "error");
                else navigate("/", { replace: true });
            } finally {
                output.innerHTML = "";
            }
        }

        updateLoggingRate();
    };
    return (
        <div className={styles.logging_rate}>
            <div className='note'>
                <p> {t('site.logging_rate')} </p>
            </div>

            <div className={styles.form_body}>
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-3'></div>
                        <div className='col-md-6'>
                            <div className='mb-3'>
                                <div className='form_dropdown'>
                                    <ReactSelectDropdown
                                        label={t('site.logging_interval')}
                                        className="logging_interval"
                                        inputId="logging_interval"
                                        inputName="logging_interval"
                                        name="logging_interval"
                                        value={selectedLoggingRate}
                                        onChange={handleDropdownChange}
                                        optionList={loggingRate}
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
                                        onClick={() => navigate(from)}
                                    />

                                    <RButton
                                        className="btn_save margin-left15"
                                        text="Save & Next"
                                        iClass={true}
                                        iClassType="save"
                                        onClick={handleSubmit}
                                    />

                                    <RButton
                                        className="btn_skip margin-left15"
                                        text="Skip"
                                        onClick={() => navigate(to)}
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

export default LoggingRate;