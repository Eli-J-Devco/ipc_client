/********************************************************
 * Copyright 2020-2021 NEXT WAVE ENERGY MONITORING INC.
 * All rights reserved.
 *
 *********************************************************/
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import _ from "lodash";
import styles from "./EthernetOne.module.scss";

import { RButton, RSwitch } from "./../../../../../components/Controls";
import ReactSelectDropdown from "../../../../../components/ReactSelectDropdown";

import useAxiosPrivate from "../../../../../hooks/useAxiosPrivate";
import { loginService } from "../../../../../services/loginService";

import Constants from "../../../../../utils/Constants";
import LibToast from "../../../../../utils/LibToast";
import canEdit from "../../../../../utils/DisabledStateByIPMode";

function EthernetOne() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm({
    mode: "onChange",
  });

  const { t } = useTranslation();
  const axiosPrivate = useAxiosPrivate();

  const [NICOptions, setNICOptions] = useState([]);
  const [NICInfo, setNICInfo] = useState(null);
  const [selectedNIC, setSelectedNIC] = useState(null);
  const [modeOptions, setModeOptions] = useState([]);
  const [modeInfo, setModeInfo] = useState(null);
  const [ethernet, setEthernet] = useState(null);
  const [isAutoDNS, setIsAutoDNS] = useState(true);
  const [existedEthernet, setExistedEthernet] = useState(null);
  const [isPlugged, setIsPlugged] = useState(true);

  const navigate = useNavigate();
  const location = useLocation();
  const from =
    location.state?.from?.pathname || "/datalogger/quickstart";
  const to = "/datalogger/quickstart/ethernet-2";


  useEffect(() => {
    /**
     * Fetch ethernet one data
     * @author: nhan.tran 2024-03-07
     * @param {Int16Array} id 
     */
    const fetchEthernetOne = async (id) => {
      try {
        var output = document.getElementById("progress");
        /**
         * Get default ethernet config
         * @author: nhan.tran 2024-03-07
         * return {Object}
         */
        const ifconfig = await axiosPrivate.post(
          `${Constants.API_URL.ETHERNET.IFCONFIG}`,
          {
            onDownloadProgress: () => {
              output.innerHTML = "<div><img src='/loading.gif' /></div>";
            },
          }
        );

        setEthernet(ifconfig.data.network);
        setNICOptions(ifconfig.data.network.map((item) => ({ value: item.namekey, label: item.namekey })));
        setModeOptions(ifconfig.data.mode.map((item) => ({ value: item.id, label: t(`site.t_mode.${[item.name]}`) ? t(`site.t_mode.${[item.name]}`) : item.name })));

        /**
         * Get ethernet info by id
         * @author: nhan.tran 2024-03-07
         * @param {Int16Array} id
         * return {Object} existed ethernet info
         */
        var ethernet1 = await axiosPrivate.post(`${Constants.API_URL.ETHERNET.ETHERNET_INFO}${id}`);
        ifconfig.data.network.forEach((item) => {
          if (item.namekey === ethernet1.data.namekey && item.ip_address === "") {
            setIsPlugged(false);
            // return;
          }
        });
        setValue("name", ethernet1.data.name);
        setValue("allow_dns", ethernet1.data.allow_dns);

        setNICInfo(ethernet1.data);
        setSelectedNIC({ value: ethernet1.data.namekey, label: ethernet1.data.namekey });
        setExistedEthernet(ethernet1.data);
        setIsAutoDNS(ethernet1.data.allow_dns);
        setModeInfo({ value: ethernet1.data.id_type_ethernet, label: t(`site.t_mode.${ethernet1.data.type_ethernet.name}`) ? t(`site.t_mode.${ethernet1.data.type_ethernet.name}`) : ethernet1.data.type_ethernet.name });

        delete ethernet1.data.id;
        delete ethernet1.data.type_ethernet;
      } catch (error) {
        if (!loginService.handleMissingInfo(error))
          LibToast.toast(t("toastMessage.error.fetchError"), "error");
        else navigate("/", { replace: true });
      } finally {
        output.innerHTML = "";
      }
    };

    fetchEthernetOne(1);
  }, []);

  /**
   * Set value for ethernet info
   * @author: nhan.tran 2024-03-07
   * @param {Object} NICInfo
   */
  useEffect(() => {
    if (NICInfo) {
      setValue("namekey", NICInfo.namekey);
      setValue("id_type_ethernet", modeInfo?.value);
      setValue("ip_address", NICInfo.ip_address);
      setValue("subnet_mask", NICInfo.subnet_mask);
      setValue("gateway", NICInfo.gateway);
      setValue("mtu", NICInfo.mtu);
      setValue("dns1", NICInfo.dns1);
      setValue("dns2", NICInfo.dns2);
    }
  }, [NICInfo]);

  /**
   * Handle dropdown change
   * @author: nhan.tran 2024-03-07
   * @param {Object} value
  */
  const handleNICDropdown = (value) => {
    setSelectedNIC(value);
    if (value.value !== existedEthernet.namekey) {
      setNICInfo(ethernet.find((item) => item.namekey === value.value));
    }
    else {
      setNICInfo(existedEthernet);
    }
  };

  /**
   * Handle mode dropdown change
   * @author: nhan.tran 2024-03-07
   * @param {Object} value
   */
  const handleModeDropdown = (value) => {
    setModeInfo(modeOptions.find((item) => item.value === value.value));
    setValue("id_type_ethernet", value.value);
    if (value.label === "DHCP") {
      setNICInfo(ethernet.find((item) => item.namekey === selectedNIC.value));
    }
    else {
      if (existedEthernet.namekey === selectedNIC.value) {
        setNICInfo(existedEthernet);
      }
      else {
        setNICInfo(ethernet.find((item) => item.namekey === selectedNIC.value));
      }
    }
  };



  /**
   * Submit form
   * @author: nhan.tran 2024-03-07
   * @param {Object} data
   */
  const onSubmit = (data) => {
    const id = 1;

    // Check if there is any change
    if (_.isEqual(data, existedEthernet)) {
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
          LibToast.toast("Ethernet-1 " + t("toastMessage.info.noChange"), "info");
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

    updateEthernet();
  };

  /**
   * Set value for allow_dns and switch button
   * @author: nhan.tran 2024-03-07
   * @param {Object} modeInfo
   */
  useEffect(() => {
    if (!canEdit["allow_dns"][[modeInfo?.label]]) {
      setIsAutoDNS(canEdit["allow_dns"][[modeInfo?.label]])
      setValue("allow_dns", canEdit["allow_dns"][[modeInfo?.label]]);
    }
  }, [modeInfo]);

  return (
    <div className={styles.ethernet}>
      <div className="note">
        <p> {t("site.info_note")} </p>
      </div>

      <div className={styles.form_body}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="container">
            <div className="row">
              <div className="col-md-3"></div>
              <div className="col-md-6">
                {
                  !isPlugged &&
                  <div className="note mb-3" style={{ color: "red" }}>
                    <span style={{ color: "#000" }}><strong>Note:</strong> </span>{NICInfo?.name ? NICInfo?.name : existedEthernet?.name} is unplugged
                  </div>
                }
                <div className="mb-3">
                  <div className="form_dropdown">
                    <ReactSelectDropdown
                      label={t("site.mode")}
                      className="mode"
                      inputId="mode"
                      inputName="mode"
                      optionList={modeOptions}
                      name="mode"
                      value={modeInfo}
                      onChange={(value) => handleModeDropdown(value)}
                    />
                  </div>
                </div>
                <div className="mb-3">
                  <div className="form_dropdown">
                    <ReactSelectDropdown
                      label={t("site.ethernet")}
                      className="ethernet"
                      inputId="ethernet1"
                      inputName="ethernet1"
                      optionList={NICOptions}
                      name="ethernet1"
                      value={selectedNIC}
                      isDisabled={!canEdit["ethernet"][[modeInfo?.label]]}
                      onChange={(value) => handleNICDropdown(value)}
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <div className="checkmark">
                    <RSwitch
                      label={t("site.obtain_dns")}
                      inputId="kiosk_view"
                      inputName="kiosk_view"
                      checked={isAutoDNS}
                      disabled={!canEdit["allow_dns"][[modeInfo?.label]]}
                      styles={isAutoDNS ? { backgroundColor: "#4CAF50" } : null}
                      onChange={() => {
                        setIsAutoDNS(!isAutoDNS);
                        setValue("allow_dns", !isAutoDNS);
                      }}
                    />
                  </div>
                </div>
                <div className="mb-3">
                  <label className="control-label">
                    {t("site.ip_address")}
                  </label>
                  <input
                    className={errors.ip_address ? "form-control input-error" : "form-control"}
                    id="ip_address"
                    name="ip_address"
                    disabled={!canEdit["ip_address"][[modeInfo?.label]]}
                    {...register("ip_address", { required: "Please fill the ip address", pattern: { value: /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/, message: "Invalid IP address" } })}
                  />

                  {errors.ip_address && (
                    <span className="validate">{errors.ip_address.message}</span>
                  )}
                </div>
                <div className="mb-3">
                  <label className="control-label">
                    {t("site.subnet_mask")}
                  </label>
                  <input
                    className={errors.subnet_mask ? "form-control input-error" : "form-control"}
                    id="subnet_mask"
                    name="subnet_mask"
                    disabled={!canEdit["subnet_mask"][[modeInfo?.label]]}
                    {...register("subnet_mask", { required: "Please fill the subnet mask", pattern: { value: /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/, message: "Invalid subnet mask" } })}
                  />

                  {errors.subnet_mask && (
                    <span className="validate">{errors.subnet_mask.message}</span>
                  )}
                </div>
                <div className="mb-3">
                  <label className="control-label">
                    {t("site.gateway")}
                  </label>
                  <input
                    className={errors.gateway ? "form-control input-error" : "form-control"}
                    id="gateway"
                    name="gateway"
                    disabled={!canEdit["gateway"][[modeInfo?.label]]}
                    {...register("gateway", { required: "Please fill the gateway", pattern: { value: /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/, message: "Invalid gateway" } })}
                  />

                  {errors.gateway && (
                    <span className="validate">{errors.gateway.message}</span>
                  )}
                </div>
                <div className="mb-3">
                  <label className="control-label">
                    {t("site.mtu")}
                  </label>
                  <input
                    title={t("site.mtu_note")}
                    className={errors.mtu ? "form-control input-error" : "form-control"}
                    id="mtu"
                    name="mtu"
                    disabled={!canEdit["mtu"][[modeInfo?.label]]}
                    {...register("mtu", {
                      validate: (value) => {
                        if (!value) {
                          return null;
                        }
                        if (!Number.isInteger(parseFloat(value))) {
                          return "MTU must be an integer number.";
                        }
                        if (value > 1500) {
                          return "MTU must be less than or equal to 1500.";
                        }
                        if (value < 128) {
                          return "MTU must be greater than or equal to 128";
                        }
                      },
                    })}
                  />
                  {errors.mtu && (
                    <span className="validate">{errors.mtu.message}</span>
                  )}
                </div>
                <div className="mb-3">
                  <label className="control-label">
                    {t("site.dns1")}
                  </label>
                  <input
                    className={errors.dns1 ? "form-control input-error" : "form-control"}
                    id="dns1"
                    name="dns1"
                    disabled={!canEdit["dns1"][[modeInfo?.label]]}
                    {...register("dns1", { pattern: { value: /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/, message: "Invalid DNS" } })}
                  />

                  {errors.dns1 && (
                    <span className="validate">{errors.dns1.message}</span>
                  )}
                </div>
                <div className="mb-3">
                  <label className="control-label">
                    {t("site.dns2")}
                  </label>
                  <input
                    className={errors.dns2 ? "form-control input-error" : "form-control"}
                    id="dns2"
                    name="dns2"
                    disabled={!canEdit["dns2"][[modeInfo?.label]]}
                    {...register("dns2", { pattern: { value: /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/, message: "Invalid DNS" } })}
                  />

                  {errors.dns2 && (
                    <span className="validate">{errors.dns2.message}</span>
                  )}
                </div>

                <div className="form-footer">
                  <div className="mb-3">
                    <RButton
                      className="btn_back"
                      text="Back"
                      iClass={true}
                      iClassType="back"
                      onClick={() => navigate(from, { replace: true })}
                    />

                    <button
                      className="btn_save ms-2"
                      text="Save & Next"
                      title="save"
                    >
                      <span className="me-2">

                        <svg version="1.1" className='icon_save' width="16" height="16" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                          viewBox="0 0 256 256" style={{ enableBackground: "new 0 0 256 256", fill: "white" }} xmlSpace="preserve">

                          <g transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)">
                            <path className="st0" d="M88,90H2c-1.1,0-2-0.9-2-2V2c0-1.1,0.9-2,2-2h65.8c0.5,0,1,0.2,1.4,0.6l20.2,20.2c0.4,0.4,0.6,0.9,0.6,1.4V88
          C90,89.1,89.1,90,88,90z M4,86h82V23L67,4H4V86z"/>
                            <path className="st0" d="M71.8,90H18.2c-1.1,0-2-0.9-2-2V48.2c0-1.1,0.9-2,2-2h53.7c1.1,0,2,0.9,2,2V88C73.8,89.1,72.9,90,71.8,90z
          M20.2,86h49.7V50.2H20.2V86z"/>
                            <path className="st0" d="M54.4,21.6H18.2c-1.1,0-2-0.9-2-2V2c0-1.1,0.9-2,2-2h36.3c1.1,0,2,0.9,2,2v17.6C56.4,20.8,55.5,21.6,54.4,21.6
          z M20.2,17.6h32.3V4H20.2V17.6z"/>
                            <path className="st0" d="M88,90H2c-1.1,0-2-0.9-2-2V2c0-1.1,0.9-2,2-2h65.8c0.5,0,1,0.2,1.4,0.6l20.2,20.2c0.4,0.4,0.6,0.9,0.6,1.4V88
          C90,89.1,89.1,90,88,90z M4,86h82V23L67,4H4V86z"/>
                            <path className="st0" d="M62.7,60.3H27.3c-1.1,0-2-0.9-2-2s0.9-2,2-2h35.4c1.1,0,2,0.9,2,2S63.8,60.3,62.7,60.3z" />
                            <path className="st0" d="M62.7,70.1H27.3c-1.1,0-2-0.9-2-2s0.9-2,2-2h35.4c1.1,0,2,0.9,2,2S63.8,70.1,62.7,70.1z" />
                            <path className="st0" d="M62.7,79.8H27.3c-1.1,0-2-0.9-2-2s0.9-2,2-2h35.4c1.1,0,2,0.9,2,2S63.8,79.8,62.7,79.8z" />
                          </g>
                        </svg>
                      </span>
                      Save & Next
                    </button>

                    <RButton className="btn_skip margin-left15" text="Skip" onClick={() => navigate(to, { replace: true })} />
                  </div>
                </div>
              </div>
              <div className="col-md-3"></div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EthernetOne;
