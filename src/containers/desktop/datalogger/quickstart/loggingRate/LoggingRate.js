/********************************************************
 * Copyright 2020-2021 NEXT WAVE ENERGY MONITORING INC.
 * All rights reserved.
 *
 *********************************************************/
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./LoggingRate.module.scss";

import useAxiosPrivate from "../../../../../hooks/useAxiosPrivate";
import { loginService } from "../../../../../services/loginService";

import { RButton } from "./../../../../../components/Controls";
import ReactSelectDropdown from "../../../../../components/ReactSelectDropdown";
import Constants from "../../../../../utils/Constants";
import LibToast from "../../../../../utils/LibToast";
import useProjectSetup from "../../../../../hooks/useProjectSetup";
import _ from "lodash";
import Button from "../../../../../components/button/Button";
import useQuickstart from "../useQuickStart";
import { ReactComponent as BackIcon } from "../../../../../assets/images/back.svg";
import { ReactComponent as SaveIcon } from "../../../../../assets/images/save.svg";
import FormInput from "../../../../../components/formInput/FormInput";
import Libs from "../../../../../utils/Libs";

function LoggingRate() {
  const axiosPrivate = useAxiosPrivate();
  const { t } = useTranslation();

  const { projectSetup, setProjectSetup, loggingIntervalConfig } =
    useProjectSetup();

  const [selectedLoggingRate, setSelectedLoggingRate] = useState();
  const [loggingRate, setLoggingRate] = useState([]);
  const [existedLoggingRate, setExistedLoggingRate] = useState();

  const navigate = useNavigate();
  const location = useLocation();
  const from =
    location.state?.from?.pathname || "/datalogger/quickstart/rs485-2";
  const to = "/datalogger/quickstart/upload-channels";
  const { back, save } = useQuickstart();

  useEffect(() => {
    /**
     * Get logging rate from project setup and set to state
     * @author: nhan.tran 2024-03-11
     */
    if (_.isEmpty(projectSetup) || _.isEmpty(loggingIntervalConfig)) return;

    Libs.progress(true);
    setTimeout(() => {
      setLoggingRate(
        loggingIntervalConfig.map((item) => ({
          value: item.id,
          label: item["name"],
        }))
      );
      setSelectedLoggingRate({
        value: projectSetup?.id_logging_interval,
        label: loggingIntervalConfig.filter(
          (item) => item.id === projectSetup?.id_logging_interval
        )[0]["name"],
      });
      setExistedLoggingRate({
        value: projectSetup?.id_logging_interval,
        label: loggingIntervalConfig.filter(
          (item) => item.id === projectSetup?.id_logging_interval
        )[0]["name"],
      });
      Libs.progress(false);
    }, 100);
  }, [projectSetup, loggingIntervalConfig]);

  /**
   * Handle dropdown change
   * @author: nhan.tran 2024-03-07
   * @param value
   */
  const handleDropdownChange = (value) => {
    setSelectedLoggingRate(value);
  };

  /**
   * Handle submit logging rate to server and update project setup state
   * @author nhan.tran 2024-03-11
   */
  const handleSubmit = () => {
    // Check if selected logging rate is the same as existed logging rate
    if (selectedLoggingRate.value === existedLoggingRate.value) {
      LibToast.toast(t("toastMessage.info.noChange"), "info");
      return;
    }

    const data = {
      id: projectSetup?.id,
      id_logging_interval: selectedLoggingRate.value,
    };

    Libs.progress(true);
    setTimeout(async () => {
      try {
        const response = await axiosPrivate.post(
          Constants.API_URL.PROJECT.UPDATE_LOGGING_RATE,
          data
        );
        if (response.status === 200) {
          LibToast.toast(
            "Logging rate " + t("toastMessage.info.update"),
            "info"
          );
          setProjectSetup({
            ...projectSetup,
            id_logging_interval: selectedLoggingRate.value,
            logging_interval: {
              id: selectedLoggingRate.value,
              time: selectedLoggingRate.label,
            },
          });
          navigate(to, { state: { from: from } });
        }
      } catch (error) {
        loginService.handleMissingInfo(
          error,
          "Failed to update logging interval rate"
        ) && navigate("/", { replace: true });
      } finally {
        Libs.progress(false);
      }
    }, 300);
  };
  return (
    <div className={styles.logging_rate}>
      <div className="note">
        <p> {t("site.logging_rate")} </p>
      </div>

      <div className={styles.form_body}>
        <div className="container">
          <div className="row">
            <div className="col-md-3"></div>
            <div className="col-md-6">
              <div className="mb-3">
                <FormInput.Select
                  label={t("site.logging_interval")}
                  name="logging_interval"
                  value={selectedLoggingRate}
                  onChange={handleDropdownChange}
                  option={loggingRate}
                />
              </div>

              <div className={styles["form-footer"]}>
                <div className="mb-3">
                  {from && (
                    <Button
                      variant="dark"
                      className={`${styles["button"]} me-3`}
                      onClick={() => back(from)}
                    >
                      <Button.Image image={<BackIcon />} />
                    </Button>
                  )}

                  <Button
                    variant="dark"
                    className={`${styles["button"]} me-3`}
                    onClick={handleSubmit}
                  >
                    <Button.Image image={<SaveIcon />} className="me-1" />
                    <Button.Text text={to ? "Save & Next" : "Save"} />
                  </Button>

                  {to && (
                    <Button
                      variant="light"
                      className={styles["button"]}
                      onClick={() => save(to)}
                    >
                      <Button.Text text="Skip" />
                    </Button>
                  )}
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

export default LoggingRate;
