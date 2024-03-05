import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import styles from './Rs485One.module.scss';

import { RButton } from './../../../../../components/Controls';
import ReactSelectDropdown from '../../../../../components/ReactSelectDropdown';
import Constants from "../../../../../utils/Constants";
import useAxiosPrivate from "../../../../../hooks/useAxiosPrivate";
import { useLocation, useNavigate } from "react-router-dom";

function Rs485One() {
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

    const selectedDropdown = { "baud": setSelectedBaudRate, "parity": setSelectedParity, "stop_bits": setSelectedStopBit, "timeout": setSelectedModbusTimeout, "debuglevel": setSelectedDebugLevel }
    const setDropdownOption = { "baud": setBaudRates, "parity": setParity, "stop_bits": setStopBit, "timeout": setModbusTimeout, "debuglevel": setDebugLevel}
    
    const navigate = useNavigate();
    const location = useLocation();
    const from =
        location.state?.from?.pathname || "/datalogger/quickstart/ethernet-2";
    const to = "/datalogger/quickstart/rs485-2";
    useEffect(() => {
        const fetchRS485 = async (id) => {
            try{
                var index = {"baud": "id_type_baud_rates", "parity": "id_type_parity", "stop_bits": "id_type_stopbits", "timeout": "id_type_timeout", "debuglevel": "id_type_debug_level"}
                var output = document.getElementById("progress");
                const response = await axiosPrivate.post(Constants.API_URL.RS485.RS485_INFO + id, {
                    onDownloadProgress: ({ loaded, total, progress }) => {
                      output.innerHTML = "<div><img src='/loading.gif' /></div>";
                    },
                  });
                var rs4851 = response.data;
                var rs485info = response.data.rs485Inf;
                Object.entries(rs485info).map(([key, value]) => {
                    setDropdownOption[key](value.map((item) => {
                        return { label: item[[key]], value: item.id }
                    } ));

                    let selected = value.filter((item) => item.id === rs4851[index[[key]]]);
                    selectedDropdown[key]({ label: selected[0][key], value: selected[0].id});
                });
                setNameKey(rs4851.namekey);
            }catch(error){
                console.log(error);
            }finally{
                output.innerHTML = "";
            }
        };

        fetchRS485(1);
    }, []);

    const handleDropdownChange = (value, type) => {
        selectedDropdown[type](value);
    }

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

export default Rs485One;