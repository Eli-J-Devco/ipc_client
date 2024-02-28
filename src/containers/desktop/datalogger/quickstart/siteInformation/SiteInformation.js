import { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import styles from "./SiteInformation.module.scss";

import { RText, RButton } from "./../../../../../components/Controls";
import useAxiosPrivate from "../../../../../hooks/useAxiosPrivate";

import Constants from "../../../../../utils/Constants";
import LibToast from "../../../../../utils/LibToast";

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

  useEffect(() => {
    const fetchSiteInformation = async (id) => {
      try {
        var output = document.getElementById("progress");
        const response = await axiosPrivate.get(
          `${Constants.API_URL.SITE.SITE_INFO}${id}`,
          {
            onDownloadProgress: ({ loaded, total, progress }) => {
              output.innerHTML = "<div><img src='/loading.gif' /></div>";
            },
          }
        );
        setSiteInformation({ ...response.data });
        output.innerHTML = "";
      } catch (error) {
        console.error(error);
      }
    };

    fetchSiteInformation(1);
  }, []);

  useEffect(() => {
    isSkip && navigate(from, { replace: true });
  }, [isSkip]);

  const handleSave = (e) => {
    e.preventDefault();
    if (!isChange.current) {
      LibToast.toast("No change to save", "info");
      return;
    }

    const data = {
      name: siteInformation.name,
      location: siteInformation.location,
      description: siteInformation.description,
      administrative_contact: siteInformation.administrative_contact,
    };
    const saveSiteInformation = async (id) => {
      var output = document.getElementById("progress");
      try {
        const response = await axiosPrivate.post(
          `${Constants.API_URL.SITE.SITE_UPDATE}${id}`,
          data,
          {
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

    saveSiteInformation(1);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSiteInformation({ ...siteInformation, [name]: value });
    isChange.current = true;
  };

  return (
    <div className={styles.site_information}>
      <div className="note">
        <p> {t("site.info_note")} </p>
      </div>
      <div className={styles.form_body}>
        <div className="container">
          <div className="row">
            <div className="col-md-3"></div>
            <div className="col-md-6">
              <div className="mb-3">
                <RText
                  label={t("site.site_name")}
                  inputClass="form-control"
                  inputId="site_name"
                  inputName="site_name"
                  name="site_name"
                  value={siteInformation.name ? siteInformation.name : ""}
                  onChange={(e) => {
                    handleInputChange(e);
                  }}
                />
              </div>

              <div className="mb-3">
                <RText
                  label={t("site.location")}
                  inputClass="form-control"
                  inputId="location"
                  inputName="location"
                  name="location"
                  value={
                    siteInformation.location ? siteInformation.location : ""
                  }
                  onChange={(e) => {
                    handleInputChange(e);
                  }}
                />
              </div>

              <div className="mb-3">
                <RText
                  label={t("site.description")}
                  inputClass="form-control"
                  inputId="description"
                  inputName="description"
                  name="description"
                  value={
                    siteInformation.description
                      ? siteInformation.description
                      : ""
                  }
                  onChange={(e) => {
                    handleInputChange(e);
                  }}
                />
              </div>

              <div className="mb-3">
                <RText
                  label={t("site.admin_contact")}
                  inputClass="form-control"
                  inputId="administrative_contact"
                  inputName="administrative_contact"
                  name="administrative_contact"
                  value={
                    siteInformation.administrative_contact
                      ? siteInformation.administrative_contact
                      : ""
                  }
                  onChange={(e) => {
                    handleInputChange(e);
                  }}
                />
              </div>

              <div className="form-footer row">
                <div className="col-4 mb-3">
                  <RButton
                    className="btn_save margin-left15"
                    text="Save & Next"
                    iClass={true}
                    iClassType="save"
                    onClick={handleSave}
                  />
                </div>
                <div className="col-4 mb-3">
                  <RButton
                    className="btn_skip margin-left15"
                    text="Skip"
                    onClick={() => setIsSkip(true)}
                  />
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

export default SiteInformation;
