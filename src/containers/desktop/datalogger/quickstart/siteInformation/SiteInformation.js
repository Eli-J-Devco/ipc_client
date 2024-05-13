/********************************************************
 * Copyright 2020-2021 NEXT WAVE ENERGY MONITORING INC.
 * All rights reserved.
 *
 *********************************************************/

import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FormProvider, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import _ from "lodash";
import styles from "./SiteInformation.module.scss";

import useAxiosPrivate from "../../../../../hooks/useAxiosPrivate";
import useProjectSetup from "../../../../../hooks/useProjectSetup";
import { loginService } from "../../../../../services/loginService";

import Constants from "../../../../../utils/Constants";
import LibToast from "../../../../../utils/LibToast";
import { getToken } from "../../../../../utils/Token";
import { RTextForm } from "../../../../../components/Controls";

function SiteInformation() {
  const { t } = useTranslation();
  const { projectSetup, setProjectSetup } = useProjectSetup();
  const [siteInformation, setSiteInformation] = useState({});

  const axiosPrivate = useAxiosPrivate();
  const isChange = useRef(false);

  const navigate = useNavigate();
  const to = "/datalogger/quickstart/ethernet-1";

  const methods = useForm();

  const output = document.getElementById("progress");

  useEffect(() => {

    /**
     * Fetch site information
     * @author: nhan.tran 2024-03-01
     * @param {int} id site id - will be remove in future
     */
    if (_.isEmpty(projectSetup)) return;

    output.innerHTML = "<div><img src='/loading.gif' /></div>";

    setTimeout(() => {
      setSiteInformation({
        id: projectSetup.id,
        name: projectSetup.name,
        location: projectSetup.location,
        description: projectSetup.description,
        administrative_contact: projectSetup.administrative_contact,
        serial_number: projectSetup.serial_number,
      });
    }, 300);
  }, [projectSetup, output]);

  /** 
   * Set value for form when site information is fetched
   * @author: nhan.tran 2024-03-01
   * @param {Object} siteInformation
   */
  useEffect(() => {
    if (_.isEmpty(siteInformation)) return;

    methods.setValue("name", siteInformation.name);
    methods.setValue("location", siteInformation.location);
    methods.setValue("description", siteInformation.description);
    methods.setValue("administrative_contact", siteInformation.administrative_contact);
    methods.setValue("serial_number", siteInformation.serial_number);
    output.innerHTML = "";
  }, [siteInformation, output, methods]);

  /**
   * Handles the save operation for the site information.
   * @author nhan.tran 2024-03-01
   * @param {Object} data - The event object.
   */
  const handleSave = methods.handleSubmit((data) => {
    data["id"] = siteInformation["id"];
    isChange.current = !_.isEqual(data, siteInformation);
    if (!isChange.current) {
      LibToast.toast(t("toastMessage.info.noChange"), "info");
      return;
    }

    /** 
     * Save site information
     * @author nhan.tran 2024-03-01
     * @param {int} id site id - will be remove in future
     * */
    setTimeout(async () => {
      var output = document.getElementById("progress");
      try {
        const response = await axiosPrivate.post(
          Constants.API_URL.PROJECT.PROJECT_UPDATE,
          data,
          {
            headers: {
              "Content-Type": "application/json",
            },
            onUploadProgress: () => {
              output.innerHTML = "<div><img src='/loading.gif' /></div>";
            },
          }
        );
        if (response.status === 200) {
          output.innerHTML = "";
          LibToast.toast("Site information " + t("toastMessage.info.update"), "info");
          setProjectSetup({
            ...projectSetup,
            name: data.name,
            location: data.location,
            description: data.description,
            administrative_contact: data.administrative_contact,
            serial_number: data.serial_number,
          });
          isChange.current = false;
          navigate(to, { replace: true });
        }
      } catch (error) {
        loginService.handleMissingInfo(error, t("toastMessage.error.updateSiteInfo")) && navigate("/", { replace: true });
      } finally {
        output.innerHTML = "";
      }
    }, 300);
  });

  return (
    <FormProvider {...methods}>
      <div className={styles.site_information}>
        <div className="note">
          <p> {t("site.info_note")} </p>
        </div>
        <form onSubmit={handleSave}>
          <div className={styles.form_body}>
            <div className='container'>
              <div className="row">
                <div className="col-md-3"></div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <RTextForm
                      label={t("site.site_name")}
                      inputClass="form-control"
                      inputId="name"
                      inputName="name"
                      name="name"
                      required={{ value: true, message: "Must fill the site name" }}
                    />
                  </div>
                  <div className="mb-3">
                    <RTextForm
                      label={t("site.serial_number")}
                      inputClass="form-control"
                      inputId="serial_number"
                      inputName="serial_number"
                      name="serial_number"
                      required={{ value: true, message: "Must fill the site serial number" }}
                    />
                  </div>
                  <div className="mb-3">
                    <RTextForm
                      label={t("site.location")}
                      inputClass="form-control"
                      inputId="location"
                      inputName="location"
                      name="location"
                    />
                  </div>
                  <div className="mb-3">
                    <RTextForm
                      label={t("site.description")}
                      inputClass="form-control"
                      inputId="description"
                      inputName="description"
                      name="description"
                    />
                  </div>
                  <div className="mb-3">
                    <RTextForm
                      label={t("site.admin_contact")}
                      inputClass="form-control"
                      inputId="administrative_contact"
                      inputName="administrative_contact"
                      name="administrative_contact"
                    />
                  </div>
                </div>
                <div className="col-md-3"></div>
              </div>

            </div>
            <div className="form-footer row justify-content-center">
              <div className="col-2">

                <div className={styles.btn_save}>
                  <button
                    // className="btn btn-primary btn-app"
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
                </div>
              </div>
              <div className="col-2">
                <div className={styles.btn_skip}>
                  <button
                    // className="btn btn-primary btn-app"
                    text="Skip"
                    title="Skip"
                    onClick={() => navigate(to, { replace: true })}
                  >
                    Skip
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </FormProvider>

  );
}

export default SiteInformation;
