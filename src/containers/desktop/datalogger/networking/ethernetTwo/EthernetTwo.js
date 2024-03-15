/********************************************************
 * Copyright 2020-2021 NEXT WAVE ENERGY MONITORING INC.
 * All rights reserved.
 *
 *********************************************************/
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import useEthernet from "../useEthernet";
import EthernetTemplate from "../EthernetTemplate";

function EthernetTwo() {
    const ethernet = useEthernet();
    const methods = useForm({ mode: "onChange" });

    useEffect(() => {
        var output = document.getElementById("progress");
        output.innerHTML = "<div><img src='/loading.gif' /></div>";
        setTimeout(async () => {
            ethernet.setId(2);
            await ethernet.fetchEthernetOne(2);
            output.innerHTML = "";
        }, 500);
    }, []);

    useEffect(() => {
        /**
         * Set value for ethernet info
         * @author: nhan.tran 2024-03-07
         * @param {Object} NICInfo
         */
        ethernet?.NICInfo?.name && methods.setValue("name", ethernet.NICInfo.name);
        if (ethernet?.NICInfo) {
            methods.setValue("namekey", ethernet.NICInfo.namekey);
            methods.setValue("id_type_ethernet", ethernet.modeInfo?.value);
            methods.setValue("ip_address", ethernet.NICInfo.ip_address);
            methods.setValue("subnet_mask", ethernet.NICInfo.subnet_mask);
            methods.setValue("gateway", ethernet.NICInfo.gateway);
            methods.setValue("mtu", ethernet.NICInfo.mtu);
            methods.setValue("dns1", ethernet.NICInfo.dns1);
            methods.setValue("dns2", ethernet.NICInfo.dns2);
            methods.setValue("allow_dns", ethernet.isAutoDNS);
        }
    }, [ethernet?.NICInfo, methods, ethernet?.modeInfo, ethernet?.isAutoDNS]);

    useEffect(() => {
        /**
 * Set value for allow_dns and switch button when mode change
 * @author: nhan.tran 2024-03-13
 */
        ethernet.updateAutoWhenModeChange();
        methods.setValue("allow_dns", ethernet.isAutoDNS);
    }, [ethernet?.modeInfo, methods]);

    useEffect(() => {
        /**
 * Set value for allow_dns and switch button when switch button change
 * @author: nhan.tran 2024-03-13
 */
        methods.setValue("allow_dns", ethernet.isAutoDNS);
    }, [ethernet?.isAutoDNS, methods]);

    return ethernet.NICInfo ? (
        <FormProvider {...methods}>
            <EthernetTemplate data={{ ...ethernet }} />
        </FormProvider>
    ) : null;
}

export default EthernetTwo;