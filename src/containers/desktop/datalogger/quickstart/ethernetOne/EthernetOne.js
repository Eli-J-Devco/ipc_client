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
import { useNavigate } from "react-router-dom";

function EthernetOne() {
  const { t } = useTranslation();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const [ethernetOne, setEthernetOne] = useState({});
  const [isSkip, setIsSkip] = useState(false);
  const isChange = useRef(false);

  const abortController = new AbortController();
  useEffect(() => {
    let isMounted = true;
    const fetchEthernetOne = async (id) => {
      try {
        var output = document.getElementById("progress");
        const response = await axiosPrivate.post(
          `${Constants.API_URL.ETHERNET.ETHERNET_INFO}${id}`,
          {
            onDownloadProgress: ({ loaded, total, progress }) => {
              output.innerHTML = "<div><img src='/loading.gif' /></div>";
            },
          }
        );
        setEthernetOne({ ...response.data });
        output.innerHTML = "";
      } catch (error) {
        LibToast.toast(LoginErrors(error, "Please login again!"), "error");
        clearToken();
        navigate("/", { replace: true });
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
  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];

  var selectedOption = [];

  const handleDropdownChange = (event) => {};

  const handleInputChange = (event) => {};

  return (
    <div className={styles.ethernet}>
      <div className="note">
        <p> {t("site.info_note")} </p>
      </div>

      <div className={styles.form_body}>
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
                    name="ethernet1"
                    value={selectedOption}
                    onChange={handleDropdownChange}
                    optionList={options}
                  />
                </div>
              </div>

              <div className="mb-3">
                <div className="checkmark">
                  <RSwitch
                    label={t("site.obtain_dns")}
                    inputId="kiosk_view"
                    inputName="kiosk_view"
                    checked={1}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="mb-3">
                <RText
                  label={t("site.ip_address")}
                  inputClass="form-control"
                  inputId="ip_address1"
                  inputName="ip_address1"
                  name="ip_address1"
                  onChange={handleInputChange}
                />
              </div>

              <div className="mb-3">
                <RText
                  label={t("site.subnet_mask")}
                  inputClass="form-control"
                  inputId="subnet_mask1"
                  inputName="subnet_mask1"
                  name="subnet_mask1"
                  onChange={handleInputChange}
                />
              </div>

              <div className="mb-3">
                <RText
                  label={t("site.gateway")}
                  inputClass="form-control"
                  inputId="gateway1"
                  inputName="gateway1"
                  name="gateway1"
                  onChange={handleInputChange}
                />
              </div>

              <div className="mb-3">
                <RText
                  label={t("site.mtu")}
                  inputClass="form-control"
                  inputId="mtu"
                  inputName="mtu"
                  name="mtu"
                  onChange={handleInputChange}
                  info={t("site.mtu_note")}
                />

                <Tooltip id="my-tooltip" />
              </div>

              <div className="mb-3">
                <RText
                  label={t("site.dns1")}
                  inputClass="form-control"
                  inputId="dns1"
                  inputName="dns1"
                  name="dns1"
                  onChange={handleInputChange}
                />
              </div>

              <div className="mb-3">
                <RText
                  label={t("site.dns2")}
                  inputClass="form-control"
                  inputId="dns2"
                  inputName="dns2"
                  name="dns2"
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-footer">
                <div className="mb-3">
                  <RButton
                    className="btn_back"
                    text="Back"
                    iClass={true}
                    iClassType="back"
                  />

                  <RButton
                    className="btn_save margin-left15"
                    text="Save & Next"
                    iClass={true}
                    iClassType="save"
                  />

                  <RButton className="btn_skip margin-left15" text="Skip" />
                </div>
              </div>
            </div>
            <div className="col-md-3"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EthernetOne;
