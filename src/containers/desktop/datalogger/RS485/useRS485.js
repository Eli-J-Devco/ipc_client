/********************************************************
* Copyright 2020-2021 NEXT WAVE ENERGY MONITORING INC.
* All rights reserved.
* 
*********************************************************/
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import _ from "lodash";

import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import { loginService } from "../../../../services/loginService";

import Constants from "../../../../utils/Constants";
import LibToast from "../../../../utils/LibToast";
import { formatTimeUnit } from "../../../../utils/Utils";


export default function useRS485() {
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
    const options = { "baud": baudRates, "parity": parity, "stop_bits": stopBit, "timeout": modbusTimeout, "debuglevel": debugLevel }
    const selectedOption = { "baud": selectedBaudRate, "parity": selectedParity, "stop_bits": selectedStopBit, "timeout": selectedModbusTimeout, "debuglevel": selectedDebugLevel }

    const navigate = useNavigate();

    const back = (from) => navigate(from);
    const save = (to) => navigate(to);

    const fetchRS485 = async (id) => {
        try {
            var index = { "baud": "id_type_baud_rates", "parity": "id_type_parity", "stop_bits": "id_type_stopbits", "timeout": "id_type_timeout", "debuglevel": "id_type_debug_level" }
            var output = document.getElementById("progress");
            output.innerHTML = "<div><img src='/loading.gif' /></div>";
            const response = await axiosPrivate.post(Constants.API_URL.RS485.RS485_INFO + id);
            var rs4851 = response.data;
            var rs485info = response.data.rs485Inf;

            Object.entries(rs485info).forEach(([key, value]) => {
                setDropdownOption[key](value.map((item) => {
                    return { label: key === "timeout" ? formatTimeUnit(item[key], Constants.TIME_UNIT.SHORT.ms, Constants.TIME_UNIT.TYPE.full, item[key] >= 1000 ? 1 : 0, Constants.TIME_UNIT.SHORT.ms, Constants.TIME_UNIT.SHORT.s) : item[key], value: item.id }
                }));

                let selected = value.filter((item) => item.id === rs4851[index[[key]]]);
                selectedDropdown[key]({ label: key === "timeout" ? formatTimeUnit(selected[0][key], Constants.TIME_UNIT.SHORT.ms, Constants.TIME_UNIT.TYPE.full, selected[0][key] >= 1000 ? 1 : 0, Constants.TIME_UNIT.SHORT.ms, Constants.TIME_UNIT.SHORT.s) : selected[0][key], value: selected[0].id });
            });
            setNameKey(rs4851.namekey);
            setIdDriverList(rs4851.id_driver_list);

            delete rs4851.rs485Inf;
            setExistedRS485(rs4851)
        } catch (error) {
            if (!loginService.handleMissingInfo(error))
                LibToast.toast(t("toastMessage.error.fetch"), "error");
            else navigate("/", { replace: true });
        } finally {
            output.innerHTML = "";
        }
    };

    const handleSave = (id, to) => {
        const updateRs485 = async () => {
            const rs485 = {
                id: id,
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
                    LibToast.toast("RS485 " + t("toastMessage.info.update"), "info")
                    navigate(to, { replace: true });
                }
            } catch (error) {
                if (!loginService.handleMissingInfo(error))
                    LibToast.toast(t("toastMessage.error.update"), "error");
                else navigate("/", { replace: true });
            }
            finally {
                output.innerHTML = "";
            }
        };
        updateRs485();
    };

    return {
        selectedDropdown,
        setDropdownOption,
        options,
        selectedOption,
        namekey,
        back,
        save,
        handleSave,
        fetchRS485
    }
}