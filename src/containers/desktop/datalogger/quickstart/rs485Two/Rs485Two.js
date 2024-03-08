/********************************************************
 * Copyright 2020-2021 NEXT WAVE ENERGY MONITORING INC.
 * All rights reserved.
 *
 *********************************************************/
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import _ from "lodash";
import styles from './Rs485Two.module.scss';

import useAxiosPrivate from "../../../../../hooks/useAxiosPrivate";
import { loginService } from "../../../../../services/loginService";

import { RButton } from './../../../../../components/Controls';
import ReactSelectDropdown from '../../../../../components/ReactSelectDropdown';
import Constants from "../../../../../utils/Constants";
import { formatTimeUnit } from "../../../../../utils/Utils";
import LibToast from "../../../../../utils/LibToast";

function Rs485Two() {
    const axiosPrivate = useAxiosPrivate();
    const { t } = useTranslation();

    const [baudRates, setBaudRates] = useState([]);
    const [selectedBaudRate, setSelectedBaudRate] = useState();
    const [parity, setParity] = useState([]);
    const [selectedParity, setSelectedParity] = useState();
    const [stopBit, setStopBit] = useState([]);
    const [selectedStopBit, setSelectedStopBit] = useState();
    const [modbusTimeout, setModbusTimeout] = useState([]);
    const [selectedModbusTimeout, setSelectedModbusTimeout] = useState();
    const [debugLevel, setDebugLevel] = useState([]);
    const [selectedDebugLevel, setSelectedDebugLevel] = useState();
    const [namekey, setNameKey] = useState("rs485");
    const [idDriverList, setIdDriverList] = useState(1);
    const [existedRS485, setExistedRS485] = useState(false);

    const selectedDropdown = { "baud": setSelectedBaudRate, "parity": setSelectedParity, "stop_bits": setSelectedStopBit, "timeout": setSelectedModbusTimeout, "debuglevel": setSelectedDebugLevel }
    const setDropdownOption = { "baud": setBaudRates, "parity": setParity, "stop_bits": setStopBit, "timeout": setModbusTimeout, "debuglevel": setDebugLevel }

    const navigate = useNavigate();
    const location = useLocation();
    const from =
        location.state?.from?.pathname || "/datalogger/quickstart/rs485-1";
    const to = "/datalogger/quickstart/logging-rate";
    useEffect(() => {
        const fetchRS485 = async (id) => {
            try {
                var index = { "baud": "id_type_baud_rates", "parity": "id_type_parity", "stop_bits": "id_type_stopbits", "timeout": "id_type_timeout", "debuglevel": "id_type_debug_level" }
                var output = document.getElementById("progress");
                const response = await axiosPrivate.post(Constants.API_URL.RS485.RS485_INFO + id, {
                    onDownloadProgress: () => {
                        output.innerHTML = "<div><img src='/loading.gif' /></div>";
                    },
                });
                var rs4852 = response.data;
                var rs485info = response.data.rs485Inf;

                Object.entries(rs485info).map(([key, value]) => {
                    setDropdownOption[key](value.map((item) => {
                        return { label: key === "timeout" ? formatTimeUnit(item[key], Constants.TIME_UNIT.SHORT.ms, Constants.TIME_UNIT.TYPE.full, item[key] >= 1000 ? 1 : 0, Constants.TIME_UNIT.SHORT.ms, Constants.TIME_UNIT.SHORT.s) : item[key], value: item.id }
                    }));

                    let selected = value.filter((item) => item.id === rs4852[index[[key]]]);
                    selectedDropdown[key]({ label: key === "timeout" ? formatTimeUnit(selected[0][key], Constants.TIME_UNIT.SHORT.ms, Constants.TIME_UNIT.TYPE.full, selected[0][key] >= 1000 ? 1 : 0, Constants.TIME_UNIT.SHORT.ms, Constants.TIME_UNIT.SHORT.s) : selected[0][key], value: selected[0].id });
                });
                setNameKey(rs4852.namekey);
                setIdDriverList(rs4852.id_driver_list);

                delete rs4852.rs485Inf;
                setExistedRS485(rs4852)
            } catch (error) {
                if (!loginService.handleMissingInfo(error))
                    LibToast.toast(t("toastMessage.error.fetchError"), "error");
                else navigate("/", { replace: true });
            } finally {
                output.innerHTML = "";
            }
        };

        fetchRS485(2);
    }, []);

    const handleDropdownChange = (value, type) => {
        selectedDropdown[type](value);
    }

    const handleSave = () => {
        const updateRs485 = async () => {
            const rs485 = {
                id: 1,
                name: "RS485",
                namekey: namekey,
                id_driver_list: idDriverList,
                id_type_baud_rates: selectedBaudRate.value,
                id_type_parity: selectedParity.value,
                id_type_stopbits: selectedStopBit.value,
                id_type_timeout: selectedModbusTimeout.value,
                id_type_debug_level: selectedDebugLevel.value
            };
            if (_.isEqual(rs485, existedRS485)) {
                LibToast.toast(t("toastMessage.info.noChange"), "info")
                return;
            }
            try {
                var output = document.getElementById("progress");
                output.innerHTML = "<div><img src='/loading.gif' /></div>";
                const response = await axiosPrivate.post(Constants.API_URL.RS485.RS485_UPDATE + 1, rs485);
                if (response.status === 200) {
                    LibToast.toast(t("toastMessage.info.updateSuccess"), "info")
                    navigate(to, { replace: true });
                }
            } catch (error) {
                if (!loginService.handleMissingInfo(error))
                    LibToast.toast(t("toastMessage.error.updateFailed"), "error");
                else navigate("/", { replace: true });
            }
            finally {
                output.innerHTML = "";
            }
        };
        updateRs485();
    };

    return (
        <div className={styles.rs485}>
            <div className='note'>
                <p> {t('site.rs485_note')} </p>
            </div>

            <div className={styles.form_body}>
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-3'>
                        </div>
                        <div className='col-md-6'>
                            <div className="mb-3">
                                <strong>PORT:</strong>&nbsp;
                                {namekey}
                            </div>
                            <div className="mb-3">
                                <div className="form_dropdown">
                                    <ReactSelectDropdown
                                        label={t("site.rs485_baud_rate")}
                                        className="ethernet"
                                        inputId="rs485_baud_rate"
                                        inputName="rs485_baud_rate"
                                        optionList={baudRates}
                                        name="rs485_baud_rate"
                                        value={selectedBaudRate}
                                        onChange={(value) => handleDropdownChange(value, "baud")}
                                    />
                                </div>
                            </div>
                            <div className="mb-3">
                                <div className="form_dropdown">
                                    <ReactSelectDropdown
                                        label={t("site.rs485_parity")}
                                        className="rs485_parity"
                                        inputId="rs485_parity"
                                        inputName="rs485_parity"
                                        optionList={parity}
                                        name="rs485_parity"
                                        value={selectedParity}
                                        onChange={(value) => handleDropdownChange(value, "parity")}
                                    />
                                </div>
                            </div>

                            <div className='mb-3'>
                                <div className='form_dropdown'>
                                    <ReactSelectDropdown
                                        label={t('site.rs485_stopbit')}
                                        className="rs485_stopbit"
                                        inputId="rs485_stopbit"
                                        inputName="rs485_stopbit"
                                        name="rs485_stopbit"
                                        value={selectedStopBit}
                                        onChange={(value) => handleDropdownChange(value, "stop_bits")}
                                        optionList={stopBit}

                                    />
                                </div>
                            </div>


                            <div className='mb-3'>
                                <div className='form_dropdown'>
                                    <ReactSelectDropdown
                                        label={t('site.rs485_modbus')}
                                        className="rs485_modbus"
                                        inputId="rs485_modbus"
                                        inputName="rs485_modbus"
                                        name="rs485_modbus"
                                        value={selectedModbusTimeout}
                                        onChange={(value) => handleDropdownChange(value, "timeout")}
                                        optionList={modbusTimeout}

                                    />
                                </div>
                            </div>

                            <div className='mb-3'>
                                <div className='form_dropdown'>
                                    <ReactSelectDropdown
                                        label={t('site.rs485_debug')}
                                        className="rs485_debug"
                                        inputId="rs485_debug"
                                        inputName="rs485_debug"
                                        name="rs485_debug"
                                        value={selectedDebugLevel}
                                        onChange={(value) => handleDropdownChange(value, "debuglevel")}
                                        optionList={debugLevel}

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
                                        onClick={() => navigate(from, { replace: true })}
                                    />

                                    <RButton
                                        className="btn_save margin-left15"
                                        text="Save & Next"
                                        iClass={true}
                                        iClassType="save"
                                        onClick={handleSave}
                                    />

                                    <RButton
                                        className="btn_skip margin-left15"
                                        text="Skip"
                                        onClick={() => navigate(to, { replace: true })}
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

export default Rs485Two;