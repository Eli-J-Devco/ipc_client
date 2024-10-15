/********************************************************
 * Copyright 2020-2021 NEXT WAVE ENERGY MONITORING INC.
 * All rights reserved.
 *
 *********************************************************/
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./Done.module.scss";

import useAxiosPrivate from "../../../../../hooks/useAxiosPrivate";
import useProjectSetup from "../../../../../hooks/useProjectSetup";
import { loginService } from "../../../../../services/loginService";

import Constants from "../../../../../utils/Constants";
import LibToast from "../../../../../utils/LibToast";
import _ from "lodash";
import FormInput from "../../../../../components/formInput/FormInput";
import useQuickstart from "../useQuickStart";
import { ReactComponent as BackIcon } from "../../../../../assets/images/back.svg";
import { ReactComponent as SaveIcon } from "../../../../../assets/images/save.svg";
import Button from "../../../../../components/button/Button";
import Libs from "../../../../../utils/Libs";

function Done() {
  const axiosPrivate = useAxiosPrivate();
  const { t } = useTranslation();

  const [selectedDone, setSelectedDone] = useState();
  const [link, setLink] = useState([]);
  const existedLink = useRef();
  const { projectSetup, setProjectSetup, screenList } = useProjectSetup();
  const { back, save } = useQuickstart();

  const navigate = useNavigate();
  const location = useLocation();
  const from =
    location.state?.from?.pathname || "/datalogger/quickstart/upload-channels";
  const to = null;

  useEffect(() => {
    /**
     * Fetch first page when login from project setup and set to state
     * @author: nhan.tran 2024-03-07
     * @returns {Promise<void>}
     */
    if (_.isEmpty(projectSetup) || !screenList?.length) return;

    Libs.progress(true);
    setTimeout(() => {
      setLink(
        screenList.map((item) => ({
          value: { id: item.id, path: item.path },
          label: item.screen_name,
        }))
      );
      var existed = screenList.filter(
        (item) => item.id === projectSetup?.id_first_page_on_login
      )[0];
      setSelectedDone({
        value: { id: existed.id, path: existed.path },
        label: existed.screen_name,
      });
      existedLink.current = {
        value: { id: existed.id, path: existed.path },
        label: existed.screen_name,
      };
      Libs.progress(false);
    }, 100);
  }, [projectSetup, screenList]);

  /**
   * Handle dropdown change
   * @author: nhan.tran 2024-03-07
   * @param value
   */
  const handleDropdownChange = (value) => {
    setTimeout(() => {
      setSelectedDone(value);
    }, 100);
  };

  /**
   * Handle submit first page when login to server and update project setup state
   * @author nhan.tran 2024-03-11
   */
  const handleSubmit = () => {
    if (selectedDone.value === existedLink.current.value) {
      LibToast.toast(t("toastMessage.info.noChange"), "info");
      return;
    }
    const data = {
      id: projectSetup?.id,
      id_first_page_on_login: selectedDone.value.id,
    };

    setTimeout(async () => {
      try {
        const response = await axiosPrivate.post(
          Constants.API_URL.PROJECT.UPDATE_FIRST_PAGE_ON_LOGIN,
          data,
          { headers: { "Content-Type": "application/json" } }
        );
        if (response.status === 200) {
          LibToast.toast(
            "Your fisrt page when login " + t("toastMessage.info.update"),
            "info"
          );
          setProjectSetup({
            ...projectSetup,
            id_first_page_on_login: selectedDone.value.id,
            first_page_on_login: {
              id: selectedDone.value.id,
              path: selectedDone.value.path,
              screen_name: selectedDone.label,
            },
          });
          navigate(selectedDone?.value?.path, { state: { from: from } });
        }
      } catch (error) {
        loginService.handleMissingInfo(error, t("toastMessage.error.update")) &&
          navigate("/", { replace: true });
      } finally {
        Libs.progress(false);
      }
    }, 300);
  };

  return (
    <div className={styles.done}>
      <div className="note">
        <p> {t("site.done_note")} </p>
      </div>

      <div className={styles.form_body}>
        <div className="container">
          <div className="row">
            <div className="col-md-3"></div>
            <div className="col-md-6">
              <div className="mb-3">
                <FormInput.Select
                  label={t("site.go_to_page")}
                  name="go_to_page"
                  value={selectedDone}
                  onChange={handleDropdownChange}
                  option={link}
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

export default Done;
