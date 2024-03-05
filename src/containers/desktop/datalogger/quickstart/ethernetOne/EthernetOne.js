import { useTranslation } from "react-i18next";
import styles from "./EthernetOne.module.scss";
import { useEffect, useRef, useState } from "react";
import { Tooltip } from "react-tooltip";

import { RText, RButton, RSwitch } from "./../../../../../components/Controls";
import ReactSelectDropdown from "../../../../../components/ReactSelectDropdown";

import useAxiosPrivate from "../../../../../hooks/useAxiosPrivate";
import Constants from "../../../../../utils/Constants";
import LibToast from "../../../../../utils/LibToast";
import { LoginErrors } from "../../../../../utils/Errors";
import { clearToken } from "../../../../../utils/Token";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { loginService } from "../../../../../services/loginService";

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
  const [isSkip, setIsSkip] = useState(false);
  const [options, setOptions] = useState([]);
  const [optionsInfo, setOptionsInfo] = useState(null);
  const [ethernet, setEthernet] = useState(null);
  const [isAuto, setIsAuto] = useState(true);
  const [existedEthernet, setExistedEthernet] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();
  const from =
    location.state?.from?.pathname || "/datalogger/quickstart";
  const to = "/datalogger/quickstart/ethernet-2";

  const abortController = new AbortController();
  useEffect(() => {
    let isMounted = true;
    /**
     * Fetch ethernet one data
     * @param {Int16Array} id 
     */
    const fetchEthernetOne = async (id) => {
      try {
        var output = document.getElementById("progress");

        /**
         * Get default ethernet config
         * return {Object}
         */
        const ifconfig = await axiosPrivate.post(
          `${Constants.API_URL.ETHERNET.IFCONFIG}`,
          {
            onDownloadProgress: ({ loaded, total, progress }) => {
              output.innerHTML = "<div><img src='/loading.gif' /></div>";
            },
          }
        );
        setEthernet(ifconfig.data.network);
        setOptions(ifconfig.data.network.map((item) => ({ value: item.namekey, label: item.namekey })));

        /**
         * Get ethernet info by id
         * @param {Int16Array} id
         * return {Object} existed ethernet info
         */
        var ethernet1 = await axiosPrivate.post(`${Constants.API_URL.ETHERNET.ETHERNET_INFO}${id}`);
        setOptionsInfo(ethernet1.data);
        setExistedEthernet(ethernet1.data);
        setSelectedOption({ value: ethernet1.data.namekey, label: ethernet1.data.namekey });
      } catch (error) {
        if (error?.response?.status === 401) {
          loginService.handleExpiredToken(error);
          navigate("/", { replace: true });
        }
        else {
          LibToast.error("Server error. Please try again later.");
        }
      } finally {
        output.innerHTML = "";
      }
    };

    fetchEthernetOne(1);
    return () => {
      isMounted = false;
      abortController.abort();
    };
  }, []);

  /**
   * Set value for ethernet info
   * @param {Object} optionsInfo
   */
  useEffect(() => {
    if (optionsInfo) {
      setValue("ethernet1", { value: optionsInfo.namekey, label: optionsInfo.namekey });
      setValue("ip_address", optionsInfo.ip_address);
      setValue("subnet_mask", optionsInfo.subnet_mask);
      setValue("gateway", optionsInfo.gateway);
      setValue("mtu", optionsInfo.mtu);
      setValue("dns1", optionsInfo.dns1);
      setValue("dns2", optionsInfo.dns2);
    }
  }, [optionsInfo]);

  const [selectedOption, setSelectedOption] = useState(null);

  /**
   * Handle dropdown change
   * @param {Object} value
  */
  const handleDropdownChange = (value) => {
    setSelectedOption(value);
    console.log(value, existedEthernet.namekey);
    console.log(value.value !== existedEthernet.namekey);
    if (value.value !== existedEthernet.namekey) {
      setOptionsInfo(ethernet.find((item) => item.namekey === value.value));
    }
    else {
      setOptionsInfo(existedEthernet);
    }
  };

  /**
   * Redirect to the previous page when the skip button is clicked
   * @param {boolean} isSkip
   */
  useEffect(() => {
    isSkip && navigate(to, { replace: true });
  }, [isSkip]);

  const onSubmit = (data) => {
  };

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
                <div className="mb-3">
                  <div className="form_dropdown">
                    <ReactSelectDropdown
                      label={t("site.ethernet")}
                      className="ethernet"
                      inputId="ethernet1"
                      inputName="ethernet1"
                      optionList={options}
                      name="ethernet1"
                      value={selectedOption}
                      onChange={(value) => handleDropdownChange(value)}
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <div className="checkmark">
                    <RSwitch
                      label={t("site.obtain_dns")}
                      inputId="kiosk_view"
                      inputName="kiosk_view"
                      checked={isAuto}
                      onChange={() => {
                        setIsAuto(!isAuto);
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
                    disabled={isAuto}
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
                    disabled={isAuto}
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
                    disabled={isAuto}
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
                    disabled={isAuto}
                    {...register("mtu", { required: "Please fill the mtu", pattern: { value: /^\d{1,4}$/, message: "Invalid mtu" }, min: { value: 128, message: "MTU must be greater than or equal to 128" }, max: { value: 1500, message: "MTU must be less than or equal to 1500" } })}
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
                    disabled={isAuto}
                    {...register("dns1", { required: "Please fill the dns 1", pattern: { value: /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/, message: "Invalid DNS 1" } })}
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
                    disabled={isAuto}
                    {...register("dns2", { required: "Please fill the dns 2", pattern: { value: /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/, message: "Invalid DNS 2" } })}
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

                    <RButton
                      className="btn_save margin-left15"
                      text="Save & Next"
                      iClass={true}
                      iClassType="save"
                    />

                    <RButton className="btn_skip margin-left15" text="Skip" onClick={() => setIsSkip(true)} />
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
