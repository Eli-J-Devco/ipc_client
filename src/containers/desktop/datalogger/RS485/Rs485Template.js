/********************************************************
 * Copyright 2020-2021 NEXT WAVE ENERGY MONITORING INC.
 * All rights reserved.
 *
 *********************************************************/
import { useTranslation } from "react-i18next";
import styles from "./Rs485Template.module.scss";
import FormInput from "../../../../components/formInput/FormInput";
import Button from "../../../../components/button/Button";
import { ReactComponent as BackIcon } from "../../../../assets/images/back.svg";
import { ReactComponent as SaveIcon } from "../../../../assets/images/save.svg";

function Rs485Template({
  id,
  from,
  to,
  selectedDropdown,
  selectedOption,
  options,
  namekey,
  back,
  save,
  handleSave,
}) {
  const { t } = useTranslation();

  const handleDropdownChange = (value, type) => {
    setTimeout(() => {
      selectedDropdown[type](value);
    }, 200);
  };

  return (
    <div className={styles.rs485}>
      <div className="note">
        <p> {t("site.rs485_note")} </p>
      </div>

      <div className={styles.form_body}>
        <div className="container">
          <div className="row">
            <div className="col-md-3"></div>
            <div className="col-md-6">
              <FormInput>
                <div className="mb-3">
                  <strong>PORT:</strong>&nbsp;
                  {namekey}
                </div>
                <div className="mb-3">
                  <FormInput.Select
                    label={t("site.rs485_baud_rate")}
                    name="rs485_baud_rate"
                    option={options.baud_rates}
                    value={selectedOption.baud_rates}
                    onChange={(e) => handleDropdownChange(e, "baud_rates")}
                  />
                </div>
                <div className="mb-3">
                  <FormInput.Select
                    label={t("site.rs485_parity")}
                    name="rs485_parity"
                    option={options.parities}
                    value={selectedOption.parities}
                    onChange={(e) => handleDropdownChange(e, "parities")}
                  />
                </div>

                <div className="mb-3">
                  <FormInput.Select
                    label={t("site.rs485_stopbit")}
                    name="rs485_stopbit"
                    option={options.stop_bits}
                    value={selectedOption.stop_bits}
                    onChange={(e) => handleDropdownChange(e, "stop_bits")}
                  />
                </div>

                <div className="mb-3">
                  <FormInput.Select
                    label={t("site.rs485_modbus")}
                    name="rs485_modbus"
                    option={options.timeouts}
                    value={selectedOption.timeouts}
                    onChange={(e) => handleDropdownChange(e, "timeouts")}
                  />
                </div>

                <div className="mb-3">
                  <FormInput.Select
                    label={t("site.rs485_debug")}
                    name="rs485_debug"
                    option={options.debug_levels}
                    value={selectedOption.debug_levels}
                    onChange={(e) => handleDropdownChange(e, "debug_levels")}
                  />
                </div>
              </FormInput>

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
                    onClick={() => handleSave(id)}
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

export default Rs485Template;
