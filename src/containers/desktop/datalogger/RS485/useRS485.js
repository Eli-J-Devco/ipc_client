/********************************************************
* Copyright 2020-2021 NEXT WAVE ENERGY MONITORING INC.
* All rights reserved.
* 
*********************************************************/
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import _ from "lodash";

import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import { loginService } from "../../../../services/loginService";
import useProjectSetup from "../../../../hooks/useProjectSetup";

import Constants from "../../../../utils/Constants";
import LibToast from "../../../../utils/LibToast";
import { formatTimeUnit } from "../../../../utils/Utils";

export default function useRS485() {
    const axiosPrivate = useAxiosPrivate();
    const { t } = useTranslation();
    const { rs485Config } = useProjectSetup();

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

    const selectedDropdown = {
        "baud_rates": setSelectedBaudRate,
        "parities": setSelectedParity,
        "stop_bits": setSelectedStopBit,
        "timeouts": setSelectedModbusTimeout,
        "debug_levels": setSelectedDebugLevel
    }
    const setDropdownOption = {
        "baud_rates": setBaudRates,
        "parities": setParity,
        "stop_bits": setStopBit,
        "timeouts": setModbusTimeout,
        "debug_levels": setDebugLevel
    }
    const options = {
        "baud_rates": baudRates,
        "parities": parity,
        "stop_bits": stopBit,
        "timeouts": modbusTimeout,
        "debug_levels": debugLevel
    }
    const selectedOption = {
        "baud_rates": selectedBaudRate,
        "parities": selectedParity,
        "stop_bits": selectedStopBit,
        "timeouts": selectedModbusTimeout,
        "debug_levels": selectedDebugLevel
    }

    const navigate = useNavigate();

    const back = (from) => navigate(from);
    const save = (to) => navigate(to);

    useEffect(() => {
        if (!rs485Config) return;
        if (Object.keys(rs485Config).length === 0 || !existedRS485) return;
        var index = {
            "baud_rates": "id_type_baud_rates",
            "parities": "id_type_parity",
            "stop_bits": "id_type_stopbits",
            "timeouts": "id_type_timeout",
            "debug_levels": "id_type_debug_level"
        }
        Object.entries(rs485Config).forEach(([key, value]) => {
            setDropdownOption[key](value.map((item) => {
                return {
                    label: key === "timeouts" ?
                        formatTimeUnit(item["name"], Constants.TIME_UNIT.SHORT.ms, Constants.TIME_UNIT.TYPE.full, item["name"] >= 1000 ? 1 :
                            0, Constants.TIME_UNIT.SHORT.ms, Constants.TIME_UNIT.SHORT.s) :
                        item["name"],
                    value: item.id
                }
            }));

            let selected = value.filter((item) => item.id === existedRS485[index[[key]]]);
            selectedDropdown[key]({
                label: key === "timeouts" ?
                    formatTimeUnit(selected[0]["name"], Constants.TIME_UNIT.SHORT.ms, Constants.TIME_UNIT.TYPE.full, selected[0]["name"] >= 1000 ? 1 :
                        0, Constants.TIME_UNIT.SHORT.ms, Constants.TIME_UNIT.SHORT.s) :
                    selected[0]["name"],
                value: selected[0].id
            });
        });
    }, [rs485Config, existedRS485])

    const fetchRS485 = async (id) => {
        try {
            var output = document.getElementById("progress");
            output.innerHTML = "<div><img src='/loading.gif' /></div>";
            const response = await axiosPrivate.post(Constants.API_URL.RS485.GET, { id: id });
            var rs4851 = response.data;

            setNameKey(rs4851.namekey);
            setIdDriverList(rs4851.id_driver_list);

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
                const response = await axiosPrivate.post(Constants.API_URL.RS485.UPDATE, rs485);
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