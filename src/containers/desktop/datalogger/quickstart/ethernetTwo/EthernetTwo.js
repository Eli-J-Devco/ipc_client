/********************************************************
 * Copyright 2020-2021 NEXT WAVE ENERGY MONITORING INC.
 * All rights reserved.
 *
 *********************************************************/
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { FormProvider, useForm } from "react-hook-form";

import EthernetTemplate from "../../networking/EthernetTemplate";
import useEthernet from "../../networking/useEthernet";

function EthernetTwo() {
  const location = useLocation();
  const from =
    location.state?.from?.pathname || "/datalogger/quickstart/ethernet-1";
  const to = "/datalogger/quickstart/rs485-1";
  const ethernet = useEthernet();
  const methods = useForm({ mode: "onChange" });

  useEffect(() => {
    var output = document.getElementById("progress");
    output.innerHTML = "<div><img src='/loading.gif' /></div>";
    setTimeout(async () => {
      ethernet.setId(2);
      ethernet.setFrom(from);
      ethernet.setTo(to);
      await ethernet.fetchEthernet(2);
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
    ethernet.updateAutoWhenModeChange();
    methods.setValue("allow_dns", ethernet.isAutoDNS);
  }, [ethernet?.modeInfo, methods]);

  useEffect(() => {
    methods.setValue("allow_dns", ethernet.isAutoDNS);
  }, [ethernet?.isAutoDNS, methods]);

  return ethernet.NICInfo ? (
    <FormProvider {...methods}>
      <EthernetTemplate data={{ ...ethernet }} />
    </FormProvider>
  ) : null;
}

export default EthernetTwo;
