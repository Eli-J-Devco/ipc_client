/********************************************************
 * Copyright 2020-2021 NEXT WAVE ENERGY MONITORING INC.
 * All rights reserved.
 *
 *********************************************************/

import { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import styles from "./SiteInformation.module.scss";
import _ from "lodash";
import useAxiosPrivate from "../../../../../hooks/useAxiosPrivate";
import { loginService } from "../../../../../services/loginService";

import Constants from "../../../../../utils/Constants";
import LibToast from "../../../../../utils/LibToast";
import { getToken } from "../../../../../utils/Token";

function SiteInformation() {
  const { t } = useTranslation();
  const [siteInformation, setSiteInformation] = useState({});
  const [isSkip, setIsSkip] = useState(false);

  const axiosPrivate = useAxiosPrivate();
  const isChange = useRef(false);

  const navigate = useNavigate();
  const location = useLocation();
  const from =
    location.state?.from?.pathname || "/datalogger/quickstart/ethernet-1";

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm({
    mode: "onChange",
  });

  useEffect(() => {
    let isMounted = true;
    const abortController = new AbortController();
    /**
     * Fetch site information
     * @author: nhan.tran 2024-03-01
     * @param {int} id site id - will be remove in future
     */
    const fetchSiteInformation = async (id) => {
      try {
        var output = document.getElementById("progress");
        const response = await axiosPrivate.post(
          `${Constants.API_URL.SITE.SITE_INFO}${id}`,
          {
            signal: abortController.signal,
            onDownloadProgress: ({ loaded, total, progress }) => {
              output.innerHTML = "<div><img src='/loading.gif' /></div>";
            },
          }
        );
        isMounted && setSiteInformation({ ...response.data });
      } catch (error) {
        if (error?.response?.status === 401) {
          loginService.handleExpiredToken(error);
          navigate("/", { replace: true });
        }
      } finally {
        output.innerHTML = "";
      }
    };
    const project_id = getToken("project_id");
    fetchSiteInformation(project_id);

    return () => {
      isMounted = false;
      abortController.abort();
    };
  }, []);

  /** 
   * Set value for form when site information is fetched
   * @author: nhan.tran 2024-03-01
   * @param {Object} siteInformation
   */
  useEffect(() => {
    setValue("name", siteInformation.name);
    setValue("location", siteInformation.location);
    setValue("description", siteInformation.description);
    setValue("administrative_contact", siteInformation.administrative_contact);
    setValue("serial_number", siteInformation.serial_number);
  }, [siteInformation]);

  /**
   * Redirect to the previous page when the skip button is clicked
   * @author: nhan.tran 2024-03-01
   * @param {boolean} isSkip
   */
  useEffect(() => {
    isSkip && navigate(from, { replace: true });
  }, [isSkip]);

  /**
   * Handles the save operation for the site information.
   * @author nhan.tran 2024-03-01
   * @param {Object} data - The event object.
   */
  const handleSave = (data) => {
    if (isSkip) {
      return;
    }
    data["id"] = siteInformation["id"];
    isChange.current = !_.isEqual(data, siteInformation);
    if (!isChange.current) {
      LibToast.toast("No change to save", "info");
      return;
    }

    /** 
     * Save site information
     * @author nhan.tran 2024-03-01
     * @param {int} id site id - will be remove in future
     * */
    const saveSiteInformation = async (id) => {

      var output = document.getElementById("progress");
      try {
        const response = await axiosPrivate.post(
          `${Constants.API_URL.SITE.SITE_UPDATE}${id}`,
          data,
          {
            headers: {
              "Content-Type": "application/json",
            },
            onUploadProgress: ({ loaded, total, progress }) => {
              output.innerHTML = "<div><img src='/loading.gif' /></div>";
            },
          }
        );
        if (response.status === 200) {
          output.innerHTML = "";
          LibToast.toast("Save successfully", "info");
          isChange.current = false;
          navigate(from, { replace: true });
        }
      } catch (error) {
        LibToast.toast("Save failed", "error");
      }
    };
    const project_id = getToken("project_id");
    saveSiteInformation(project_id);
  };

  return (
    <div className={styles.site_information}>
      <div className="note">
        <p> {t("site.info_note")} </p>
      </div>
      <form onSubmit={handleSubmit(handleSave)}>
        <div className={styles.form_body}>
          <div className='container'>
            <div className="row">
              <div className="col-md-3"></div>
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="control-label">
                    {t("site.site_name")}
                    <span className="required">*</span>
                  </label>
                  <input
                    className={errors.name ? "form-control input-error" : "form-control"}
                    id="name"
                    name="name"
                    {...register("name", {
                      required: "Must fill the site name",
                    })}
                  />

                  {errors.name && (
                    <span className="validate">{errors.name.message}</span>
                  )}
                </div>
                <div className="mb-3">
                  <label className="control-label">
                    {t("site.serial_number")}
                    <span className="required">*</span>
                  </label>
                  <input
                    className={errors.name ? "form-control input-error" : "form-control"}
                    id="serial_number"
                    name="serial_number"
                    {...register("serial_number", {
                      required: "Must fill the site serial number",
                      pattern: { value: /^[A-Z0-9]+$/g, message: "Invalid serial number. Only accept capital letter and number" }
                    })}
                  />

                  {errors.serial_number && (
                    <span className="validate">{errors.serial_number.message}</span>
                  )}
                </div>
                <div className="mb-3">
                  <label className="control-label">
                    {t("site.location")}
                  </label>
                  <input
                    className={errors.location ? "form-control input-error" : "form-control"}
                    id="location"
                    name="location"
                    {...register("location")}
                  />

                  {errors.location && (
                    <span className="validate">{errors.location.message}</span>
                  )}
                </div>
                <div className="mb-3">
                  <label className="control-label">
                    {t("site.description")}
                  </label>
                  <input
                    className={errors.description ? "form-control input-error" : "form-control"}
                    id="description"
                    name="description"
                    {...register("description")}
                  />

                  {errors.description && (
                    <span className="validate">{errors.description.message}</span>
                  )}
                </div>
                <div className="mb-3">
                  <label className="control-label">
                    {t("site.admin_contact")}
                  </label>
                  <input
                    className={errors.administrative_contact ? "form-control input-error" : "form-control"}
                    id="administrative_contact"
                    name="administrative_contact"
                    {...register("administrative_contact")}
                  />

                  {errors.administrative_contact && (
                    <span className="validate">{errors.administrative_contact.message}</span>
                  )}
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
                  onClick={() => setIsSkip(true)}
                >
                  Skip
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>

  );
}

export default SiteInformation;
