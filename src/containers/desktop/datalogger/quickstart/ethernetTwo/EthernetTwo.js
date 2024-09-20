/********************************************************
 * Copyright 2020-2021 NEXT WAVE ENERGY MONITORING INC.
 * All rights reserved.
 *
 *********************************************************/
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import EthernetTemplate from "../../networking/EthernetTemplate";
import useEthernet from "../../networking/useEthernet";
import _, { cloneDeep, isEmpty, isEqual } from "lodash";
import Libs from "../../../../../utils/Libs";
import useProjectSetup from "../../../../../hooks/useProjectSetup";

function EthernetTwo() {
  const location = useLocation();
  const from =
    location.state?.from?.pathname || "/datalogger/quickstart/ethernet-1";
  const to = "/datalogger/quickstart/rs485-1";
  const ethernet = useEthernet();
  const { ethernetConfig } = useProjectSetup();

  useEffect(() => {
    if (isEmpty(ethernetConfig?.network)) return;

    Libs.progress(true);
    setTimeout(async () => {
      ethernet.setId(2);
      ethernet.setFrom(from);
      ethernet.setTo(to);
      await ethernet.fetchEthernet(2);
      Libs.progress(false);
    }, 500);
  }, [ethernetConfig.network]);

  useEffect(() => {
    /**
     * Set value for ethernet info
     * @author: nhan.tran 2024-03-07
     * @param {Object} NICInfo
     */
    const init = cloneDeep(ethernet.initialValues);
    if (ethernet?.NICInfo?.name) init.name = ethernet.NICInfo.name;
    if (ethernet?.NICInfo) {
      init.namekey = ethernet.NICInfo.namekey;
      init.id_type_ethernet = ethernet.modeInfo?.value;
      init.ip_address = ethernet.NICInfo.ip_address || "";
      init.subnet_mask = ethernet.NICInfo.subnet_mask || "";
      init.gateway = ethernet.NICInfo.gateway || "";
      init.mtu = ethernet.NICInfo.mtu || "";
      init.dns1 = ethernet.NICInfo.dns1 || "";
      init.dns2 = ethernet.NICInfo.dns2 || "";
      init.allow_dns = ethernet.isAutoDNS;
    }

    if (isEqual(init, ethernet.initialValues)) return;
    ethernet.setInitialValues(init);
  }, [ethernet]);

  useEffect(() => {
    ethernet.updateAutoWhenModeChange();
    ethernet.setInitialValues({
      ...ethernet.initialValues,
      allow_dns: ethernet.isAutoDNS,
    });
  }, [ethernet?.modeInfo]);

  useEffect(() => {
    if (ethernet?.isAutoDNS === ethernet.initialValues.allow_dns) return;
    ethernet.setInitialValues({
      ...ethernet.initialValues,
      allow_dns: ethernet.isAutoDNS,
    });
  }, [ethernet?.isAutoDNS]);

  return ethernet.NICInfo ? <EthernetTemplate data={{ ...ethernet }} /> : null;
}

export default EthernetTwo;
