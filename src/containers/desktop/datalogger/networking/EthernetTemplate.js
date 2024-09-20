/********************************************************
 * Copyright 2020-2021 NEXT WAVE ENERGY MONITORING INC.
 * All rights reserved.
 *
 *********************************************************/
import { useTranslation } from "react-i18next";
import styles from "./Networking.module.scss";

import canEdit from "../../../../utils/DisabledStateByIPMode";
import FormInput from "../../../../components/formInput/FormInput";
import Button from "../../../../components/button/Button";
import { ReactComponent as BackIcon } from "../../../../assets/images/back.svg";
import { ReactComponent as SaveIcon } from "../../../../assets/images/save.svg";
import { useEffect } from "react";
import { cloneDeep, isEqual } from "lodash";

function EthernetTemplate({ ...data }) {
  const { t } = useTranslation();
  const {
    existedEthernet,
    selectedDropdown,
    options,
    selectedOption,
    onSubmit,
    back,
    save,
    isAutoDNS,
    ethernet,
    NICInfo,
    modeInfo,
    isPlugged,
    from,
    to,
    updateIsAutoDNS,
    setNICInfo,
    initialValues,
    validationSchema,
  } = { ...data.data };

  /**
   * Handle dropdown change
   * @author: nhan.tran 2024-03-07
   * @param {Object} value
   */
  const handleNICDropdown = (value) => {
    setTimeout(() => {
      selectedDropdown["nic"](value);
      if (value.value !== existedEthernet.current?.namekey) {
        setNICInfo(ethernet.find((item) => item.namekey === value.value));
      } else {
        setNICInfo(existedEthernet.current);
      }
    }, 100);
  };

  /**
   * Handle mode dropdown change
   * @author: nhan.tran 2024-03-07
   * @param {Object} value
   */
  const handleModeDropdown = (value) => {
    setTimeout(() => {
      selectedDropdown["mode"](
        options?.mode.find((item) => item.value === value.value)
      );
    }, 100);
  };

  return (
    <div className={styles["ethernet"]}>
      <div className="note">
        <p> {t("site.info_note")} </p>
      </div>

      <div className={styles["form-body"]}>
        <FormInput
          initialValues={initialValues}
          onSubmit={onSubmit}
          id="ethernetForm"
          validationSchema={validationSchema}
        >
          <div className="container">
            <div className="row">
              <div className="col-md-3"></div>
              <div className="col-md-6">
                {!isPlugged && (
                  <div className="note mb-3" style={{ color: "red" }}>
                    <span style={{ color: "#000" }}>
                      <strong>Note:</strong>{" "}
                    </span>
                    {NICInfo?.name ? NICInfo?.name : existedEthernet?.name} is
                    unplugged
                  </div>
                )}
                <div className="mb-3">
                  <FormInput.Select
                    label={t("site.mode")}
                    className="form-group"
                    name={"mode"}
                    value={selectedOption?.mode}
                    option={options?.mode}
                    onChange={(e) => handleModeDropdown(e)}
                  />
                </div>
                <div className="mb-3">
                  <FormInput.Select
                    label={t("site.ethernet")}
                    className="form-group"
                    name={"ethernet"}
                    value={selectedOption?.nic}
                    option={options?.nic}
                    onChange={(e) => handleNICDropdown(e)}
                  />
                </div>

                <div className="mb-3">
                  <div className="checkmark">
                    <FormInput.Switch
                      label={t("site.obtain_dns")}
                      name={"allow_dns"}
                      checked={isAutoDNS}
                      disabled={!canEdit["allow_dns"][[modeInfo?.label]]}
                      styles={isAutoDNS ? { backgroundColor: "#4CAF50" } : null}
                      onChange={() => {
                        setTimeout(() => {
                          updateIsAutoDNS(!isAutoDNS);
                        }, 100);
                      }}
                    />
                  </div>
                </div>
                <div className="mb-3">
                  <FormInput.Text
                    label={t("site.ip_address")}
                    className="form-group"
                    name={"ip_address"}
                    disabled={!canEdit["ip_address"][[modeInfo?.label]]}
                  />
                </div>
                <div className="mb-3">
                  <FormInput.Text
                    label={t("site.subnet_mask")}
                    className="form-group"
                    name={"subnet_mask"}
                    disabled={!canEdit["subnet_mask"][[modeInfo?.label]]}
                  />
                </div>
                <div className="mb-3">
                  <FormInput.Text
                    label={t("site.gateway")}
                    className="form-group"
                    name={"gateway"}
                    disabled={!canEdit["gateway"][[modeInfo?.label]]}
                  />
                </div>
                <div className="mb-3">
                  <FormInput.Text
                    label={t("site.mtu")}
                    className="form-group"
                    name={"mtu"}
                    disabled={!canEdit["mtu"][[modeInfo?.label]]}
                  />
                </div>
                <div className="mb-3">
                  <FormInput.Text
                    label={t("site.dns1")}
                    className="form-group"
                    name={"dns1"}
                    disabled={!canEdit["dns1"][[modeInfo?.label]]}
                  />
                </div>
                <div className="mb-3">
                  <FormInput.Text
                    label={t("site.dns2")}
                    className="form-group"
                    name={"dns2"}
                    disabled={!canEdit["dns2"][[modeInfo?.label]]}
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
                      formId="ethernetForm"
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
    </div>
  );
}

export default EthernetTemplate;
