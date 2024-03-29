/********************************************************
* Copyright 2020-2021 NEXT WAVE ENERGY MONITORING INC.
* All rights reserved.
* 
*********************************************************/
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import _ from "lodash";

import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import { loginService } from "../../../../services/loginService";

import Constants from "../../../../utils/Constants";
import LibToast from "../../../../utils/LibToast";
import canEdit from "../../../../utils/DisabledStateByIPMode";

export default function useEthernet() {
    const { t } = useTranslation();
    const axiosPrivate = useAxiosPrivate();

    const [NICOptions, setNICOptions] = useState([]);
    const [NICInfo, setNICInfo] = useState(null);
    const [selectedNIC, setSelectedNIC] = useState(null);
    const [modeOptions, setModeOptions] = useState([]);
    const [modeInfo, setModeInfo] = useState(null);
    const [ethernet, setEthernet] = useState(null);
    const [isAutoDNS, setIsAutoDNS] = useState(true);
    const existedEthernet = useRef(null);
    const [isPlugged, setIsPlugged] = useState(true);
    const [id, setId] = useState(1);
    const [to, setTo] = useState();
    const [from, setFrom] = useState();

    const selectedDropdown = { "nic": setSelectedNIC, "mode": setModeInfo }
    const setDropdownOption = { "nic": setNICOptions, "mode": setModeOptions }
    const options = { "nic": NICOptions, "mode": modeOptions }
    const selectedOption = { "nic": selectedNIC, "mode": modeInfo }

    const navigate = useNavigate();

    const back = (from) => navigate(from);
    const save = (to) => navigate(to);

    /**
     * Fetch ethernet one data
     * @param {Int16Array} id 
     */
    const fetchEthernetOne = async (id) => {
        try {
            /**
             * Get default ethernet config
             * @return {Object}
             */

            const ifconfig = await axiosPrivate.post(`${Constants.API_URL.ETHERNET.IFCONFIG}`);

            setEthernet(ifconfig.data.network);
            setNICOptions(ifconfig.data.network.map((item) => ({ value: item.namekey, label: item.namekey })));
            setModeOptions(ifconfig.data.mode.map((item) => ({ value: item.id, label: t(`site.t_mode.${[item.name]}`) ? t(`site.t_mode.${[item.name]}`) : item.name })));

            /**
             * Get ethernet info by id
             * @param {Int16Array} id
             * @return {Object} existed ethernet info
             */
            var ethernet1 = await axiosPrivate.post(`${Constants.API_URL.ETHERNET.ETHERNET_INFO}${id}`);
            ifconfig.data.network.forEach((item) => {
                if (item.namekey === ethernet1.data.namekey && item.ip_address === "") {
                    setIsPlugged(false);
                }
            });

            setNICInfo(ethernet1.data);
            setSelectedNIC({ value: ethernet1.data.namekey, label: ethernet1.data.namekey });
            existedEthernet.current = ethernet1.data;
            setIsAutoDNS(ethernet1.data.allow_dns);
            setModeInfo({ value: ethernet1.data.id_type_ethernet, label: t(`site.t_mode.${ethernet1.data.type_ethernet.name}`) ? t(`site.t_mode.${ethernet1.data.type_ethernet.name}`) : ethernet1.data.type_ethernet.name });

            delete ethernet1.data.id;
            delete ethernet1.data.type_ethernet;
        } catch (error) {
            if (!loginService.handleMissingInfo(error))
                LibToast.toast(t("toastMessage.error.fetch"), "error");
            else navigate("/", { replace: true });
        } finally {
        }
    };


    /**
     * Submit form
     * @author: nhan.tran 2024-03-07
     * @param {Object} data
     */
    const onSubmit = (data) => {
        // Check if there is any change
        if (_.isEqual(data, existedEthernet.current)) {
            LibToast.toast(t("toastMessage.info.noChange"), "info");
            return;
        }

        /**
         * Update ethernet
         * @author: nhan.tran 2024-03-07
         * @param {Int16Array} id
         * @param {Object} data
         * return {Object} response
         */
        const updateEthernet = async () => {
            try {
                var output = document.getElementById("progress");
                output.innerHTML = "<div><img src='/loading.gif' /></div>";
                const response = await axiosPrivate.post(Constants.API_URL.ETHERNET.ETHERNET_UPDATE + id, data, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                if (response.status === 200) {
                    LibToast.toast("Ethernet-1 " + t("toastMessage.info.update"), "info");
                    to && navigate(to, { replace: true });
                }
            } catch (error) {
                const msg = loginService.handleMissingInfo(error);
                if (typeof msg === "string") {
                    LibToast.toast(msg, "error");
                }
                else {
                    if (!msg)
                        LibToast.toast(t("toastMessage.error.update"), "error");
                    else navigate("/", { replace: true });
                }
            }
            finally {
                output.innerHTML = "";
            }

        };

        updateEthernet();
    };

    /**
     * Set value for allow_dns and switch button
     * @author: nhan.tran 2024-03-07
     * @param {Object} modeInfo
     */
    const updateAutoWhenModeChange = () => {
        setTimeout(() => {
            var isAuto = modeInfo?.label === t(`site.t_mode.${existedEthernet.current?.type_ethernet?.name}`) ? existedEthernet.current?.allow_dns : canEdit["allow_dns"][[modeInfo?.label]];
            setIsAutoDNS(isAuto)
        }, 100);
    }

    const updateIsAutoDNS = (value) => {
        setTimeout(() => {
            setIsAutoDNS(value);
        }, 100);
    }

    return {
        existedEthernet,
        selectedDropdown,
        setDropdownOption,
        options,
        selectedOption,
        fetchEthernetOne,
        onSubmit,
        back,
        save,
        updateAutoWhenModeChange,
        isAutoDNS,
        ethernet,
        NICInfo,
        modeInfo,
        isPlugged,
        id,
        to,
        from,
        setId,
        setTo,
        setFrom,
        updateIsAutoDNS,
        setNICInfo,
    }
}