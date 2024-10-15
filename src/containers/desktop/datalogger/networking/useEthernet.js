/********************************************************
 * Copyright 2020-2021 NEXT WAVE ENERGY MONITORING INC.
 * All rights reserved.
 *
 *********************************************************/
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import _ from "lodash";

import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import { loginService } from "../../../../services/loginService";

import Constants from "../../../../utils/Constants";
import LibToast from "../../../../utils/LibToast";
import canEdit from "../../../../utils/DisabledStateByIPMode";
import useProjectSetup from "../../../../hooks/useProjectSetup";
import Libs from "../../../../utils/Libs";
import * as Yup from "yup";

export default function useEthernet() {
  const { t } = useTranslation();
  const axiosPrivate = useAxiosPrivate();

  const { ethernetConfig } = useProjectSetup();
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

  const selectedDropdown = { nic: setSelectedNIC, mode: setModeInfo };
  const setDropdownOption = { nic: setNICOptions, mode: setModeOptions };
  const options = { nic: NICOptions, mode: modeOptions };
  const selectedOption = { nic: selectedNIC, mode: modeInfo };
  const [initialValues, setInitialValues] = useState({
    name: "",
    namekey: "",
    id_type_ethernet: "",
    ip_address: "",
    subnet_mask: "",
    gateway: "",
    mtu: "",
    dns1: "",
    dns2: "",
    allow_dns: true,
  });
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    id_type_ethernet: Yup.string().required("Type is required"),
    ip_address: Yup.string()
      .required("IP Address is required")
      .matches(Constants.REGEX_PATTERN.IP_ADDRESS, "Invalid IP Address"),
    subnet_mask: Yup.string()
      .required("Subnet Mask is required")
      .matches(Constants.REGEX_PATTERN.IP_ADDRESS, "Invalid Subnet Mask"),
    gateway: Yup.string()
      .required("Gateway is required")
      .matches(Constants.REGEX_PATTERN.IP_ADDRESS, "Invalid Gateway"),
    mtu: Yup.number().min(1, "MTU must be greater than 0"),
    dns1: Yup.string().matches(
      Constants.REGEX_PATTERN.IP_ADDRESS,
      "Invalid DNS1"
    ),
    dns2: Yup.string().matches(
      Constants.REGEX_PATTERN.IP_ADDRESS,
      "Invalid DNS2"
    ),
  });

  const navigate = useNavigate();

  const back = (from) => navigate(from);
  const save = (to) => navigate(to);

  useEffect(() => {
    if (_.isEmpty(ethernetConfig?.network)) return;
    /**
     * Get default ethernet config
     * @return {Object}
     */

    setEthernet(ethernetConfig.network);
    setNICOptions(
      ethernetConfig.network.map((item) => ({
        value: item.namekey,
        label: item.namekey,
      }))
    );
    setModeOptions(
      ethernetConfig.mode.map((item) => ({
        value: item.id,
        label: t(`site.t_mode.${[item.name]}`)
          ? t(`site.t_mode.${[item.name]}`)
          : item.name,
      }))
    );
  }, [ethernetConfig]);

  /**
   * Fetch ethernet one data
   * @param {Int16Array} id
   */
  const fetchEthernet = async (id) => {
    try {
      /**
       * Get ethernet info by id
       * @param {Int16Array} id
       * @return {Object} existed ethernet info
       */
      var ethernet = await axiosPrivate.post(
        `${Constants.API_URL.ETHERNET.ETHERNET_INFO}`,
        { id: id }
      );
      ethernetConfig.network.forEach((item) => {
        if (item.namekey === ethernet.data.namekey && item.ip_address === "") {
          setIsPlugged(false);
        }
      });

      setNICInfo(ethernet.data);
      setSelectedNIC({
        value: ethernet.data.namekey,
        label: ethernet.data.namekey,
      });
      existedEthernet.current = ethernet.data;
      setIsAutoDNS(ethernet.data.allow_dns);
      setModeInfo({
        value: ethernet.data.id_type_ethernet,
        label: t(
          `site.t_mode.${
            ethernetConfig.mode.filter(
              (item) => item.id === ethernet.data.id_type_ethernet
            )[0].name
          }`
        )
          ? t(
              `site.t_mode.${
                ethernetConfig.mode.filter(
                  (item) => item.id === ethernet.data.id_type_ethernet
                )[0].name
              }`
            )
          : ethernetConfig.mode.filter(
              (item) => item.id === ethernet.data.id_type_ethernet
            )[0].name,
      });

      delete ethernet.data.id;
    } catch (error) {
      loginService.handleMissingInfo(error) && navigate("/", { replace: true });
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

    Libs.progress(true);
    /**
     * Update ethernet
     * @author: nhan.tran 2024-03-07
     * @param {Int16Array} id
     * @param {Object} data
     * return {Object} response
     */
    setTimeout(async () => {
      try {
        const response = await axiosPrivate.post(
          Constants.API_URL.ETHERNET.ETHERNET_UPDATE,
          { id: id, ...data }
        );
        if (response.status === 200) {
          LibToast.toast("Ethernet-1 " + t("toastMessage.info.update"), "info");
          to && navigate(to, { replace: true });
        }
      } catch (error) {
        loginService.handleMissingInfo(error) &&
          navigate("/", { replace: true });
      } finally {
        Libs.progress(false);
      }
    }, 300);
  };

  /**
   * Set value for allow_dns and switch button
   * @author: nhan.tran 2024-03-07
   * @param {Object} modeInfo
   */
  const updateAutoWhenModeChange = () => {
    setTimeout(() => {
      var isAuto =
        modeInfo?.label ===
        t(`site.t_mode.${existedEthernet.current?.type_ethernet?.name}`)
          ? existedEthernet.current?.allow_dns
          : canEdit["allow_dns"][[modeInfo?.label]];
      setIsAutoDNS(isAuto);
    }, 100);
  };

  const updateIsAutoDNS = (value) => {
    setTimeout(() => {
      setIsAutoDNS(value);
    }, 100);
  };

  return {
    existedEthernet,
    selectedDropdown,
    setDropdownOption,
    options,
    selectedOption,
    fetchEthernet,
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
    validationSchema,
    initialValues,
    setInitialValues,
  };
}
