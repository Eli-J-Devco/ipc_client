/********************************************************
 * Copyright 2020-2021 NEXT WAVE ENERGY MONITORING INC.
 * All rights reserved.
 *
 *********************************************************/

import { useTranslation } from "react-i18next";
import styles from "./SiteInformation.module.scss";

import FormInput from "../../../../../components/formInput/FormInput";
import Button from "../../../../../components/button/Button";
import { ReactComponent as BackIcon } from "../../../../../assets/images/back.svg";
import { ReactComponent as SaveIcon } from "../../../../../assets/images/save.svg";

import useQuickstart from "../useQuickStart";
import useSiteInformation from "./useSiteInformation";

function SiteInformation() {
  const { t } = useTranslation();

  const { siteInformation, handleSave, from, to } = useSiteInformation();
  const { back, save } = useQuickstart();

  return (
    <div className={styles["site-information"]}>
      <div className="note">
        <p> {t("site.info_note")} </p>
      </div>
      <FormInput
        initialValues={siteInformation}
        onSubmit={handleSave}
        id="siteInfoForm"
      >
        <div className="container">
          <div className="row">
            <div className="col-md-3"></div>
            <div className="col-md-6">
              <div className={styles["form-body"]}>
                <div className="mb-3">
                  <FormInput.Text
                    className="form-group"
                    label={t("site.site_name")}
                    name="name"
                    placeholder={t("site.site_name")}
                  />
                </div>
                <div className="mb-3">
                  <FormInput.Text
                    className="form-group"
                    label={t("site.serial_number")}
                    name="serial_number"
                    placeholder={t("site.serial_number")}
                  />
                </div>
                <div className="mb-3">
                  <FormInput.Text
                    className="form-group"
                    label={t("site.location")}
                    name="location"
                    placeholder={t("site.location")}
                  />
                </div>
                <div className="mb-3">
                  <FormInput.Text
                    className="form-group"
                    label={t("site.description")}
                    name="description"
                    placeholder={t("site.description")}
                  />
                </div>
                <div className="mb-3">
                  <FormInput.Text
                    className="form-group"
                    label={t("site.admin_contact")}
                    name="administrative_contact"
                    placeholder={t("site.admin_contact")}
                  />
                </div>
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
                    formId="siteInfoForm"
                    type="submit"
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
      </FormInput>
    </div>
  );
}

export default SiteInformation;
