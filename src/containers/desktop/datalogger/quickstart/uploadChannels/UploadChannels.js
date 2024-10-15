/********************************************************
 * Copyright 2020-2021 NEXT WAVE ENERGY MONITORING INC.
 * All rights reserved.
 *
 *********************************************************/
import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import _ from "lodash";
import styles from "./UploadChannels.module.scss";

import useAxiosPrivate from "../../../../../hooks/useAxiosPrivate";
import { loginService } from "../../../../../services/loginService";

import Constants from "../../../../../utils/Constants";
import LibToast from "../../../../../utils/LibToast";
import useProjectSetup from "../../../../../hooks/useProjectSetup";
import FormInput from "../../../../../components/formInput/FormInput";
import Libs from "../../../../../utils/Libs";
import Button from "../../../../../components/button/Button";
import { ReactComponent as BackIcon } from "../../../../../assets/images/back.svg";
import { ReactComponent as SaveIcon } from "../../../../../assets/images/save.svg";
import * as Yup from "yup";
import useQuickstart from "../useQuickStart";

function UploadChannels() {
  const { t } = useTranslation();
  const axiosPrivate = useAxiosPrivate();
  const { uploadChanelConfig } = useProjectSetup();

  const [channels, setChannels] = useState([]);
  const channelsRef = useRef([]);

  const [devices, setDevices] = useState([]);
  const [protocol, setProtocol] = useState([]);
  const [loggingInterval, setLoggingInterval] = useState([]);
  const defaultLoggingInterval = useRef([]);
  const [validationSchema, setValidationSchema] = useState();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.from || "/datalogger/quickstart/logging-rate";
  const to = "/datalogger/quickstart/done";
  const { back, save } = useQuickstart();

  useEffect(() => {
    if (!uploadChanelConfig) return;

    Libs.progress(true);
    /**
     * Set value for channel config when it is available
     * @author nhan.tran 2024-03-13
     * @param {Object} uploadChanelConfig
     * @return {Object}
     */
    setTimeout(() => {
      setProtocol(
        uploadChanelConfig?.type_protocols?.map((protocol) => ({
          value: protocol.id,
          label: protocol.name,
        }))
      );
      setDevices(
        uploadChanelConfig?.devices?.map((device) => ({
          value: device.id,
          label: device.name,
        }))
      );
      setLoggingInterval(
        uploadChanelConfig?.logging_intervals?.map((interval) => ({
          value: interval.id,
          label: interval.name,
        }))
      );
      defaultLoggingInterval.current =
        uploadChanelConfig?.logging_intervals?.filter(
          (interval) => interval.name === "5 minutes"
        );
    }, 100);

    /**
     * Get all channels from server and set value for each channel when it is available
     * @author nhan.tran 2024-03-13
     * @return {Object}
     */
    setTimeout(async () => {
      try {
        const response = await axiosPrivate.post(
          Constants.API_URL.UPLOAD_CHANNEL.GET
        );
        if (response?.status === 200) {
          const allChannels = response?.data.map((channel) => ({
            ...channel,
            [`upload_url_${channel.name.trim().replace(" ", "_")}`]:
              channel.uploadurl,
            [`password_${channel.name.trim().replace(" ", "_")}`]:
              channel.password,
          }));
          setChannels(allChannels);
          var validation = {};
          allChannels.forEach((channel, index) => {
            validation = {
              ...validation,
              [`upload_url_${channel.name.trim().replace(" ", "_")}`]:
                Yup.string()
                  .required("Upload URL is required")
                  .matches(
                    /[(http(s)?)://(www.)?a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/,
                    "Invalid URL"
                  ),
              [`password_${channel.name.trim().replace(" ", "_")}`]:
                Yup.string()
                  .required("Password is required")
                  .matches(
                    Constants.REGEX_PATTERN.PASSWORD,
                    "Invalid password"
                  ),
            };
          });
          setValidationSchema(Yup.object().shape(validation));
          channelsRef.current = _.cloneDeep(allChannels);
        }
      } catch (error) {
        loginService.handleMissingInfo(
          error,
          "Failed to fetch upload channel"
        ) && navigate("/", { replace: true });
      } finally {
        Libs.progress(false);
      }
    }, 300);
  }, [uploadChanelConfig]);

  /**
   * Handle save channel information when user click on save button
   * @author nhan.tran 2024-03-13
   * @param {Object} data
   * @return {Object}
   */
  const handleSave = (data) => {
    const channelsMap = channels.map((channel, index) => ({
      ...channel,
      uploadurl: data[`upload_url_${channel?.name.trim().replace(" ", "_")}`],
      password: data[`password_${channel?.name.trim().replace(" ", "_")}`],
    }));
    if (_.isEqual(channelsMap, channelsRef.current)) {
      LibToast.toast(t("toastMessage.info.noChange"), "info");
      return;
    }

    Libs.progress(true);
    setTimeout(async () => {
      try {
        const response = await axiosPrivate.post(
          Constants.API_URL.UPLOAD_CHANNEL.UPDATE,
          channels
        );
        if (response?.status === 200) {
          LibToast.toast(
            `Upload channels ${t("toastMessage.info.update")}`,
            "info"
          );
          navigate(to, { replace: true });
        }
      } catch (error) {
        loginService.handleMissingInfo(
          error,
          "Failed to update upload channels"
        ) && navigate("/", { replace: true });
      } finally {
        Libs.progress(false);
      }
    }, 300);
  };

  /**
   * Handle change protocol when user select a protocol from dropdown list
   * @author nhan.tran 2024-03-13
   * @param {Object} event
   * @param {Number} index
   * @param {String} name
   * @return {Object}
   */
  const onProtocolChange = (event, index, name) => {
    let temp = [...channels];
    temp[index] = {
      ...temp[index],
      id_type_protocol: event.value,
      type_protocol: {
        id: event.value,
        name: event.label,
      },
      [`upload_url_${name}`]: "",
      [`password_${name}`]: "",
      devices: [],
      logging_interval: defaultLoggingInterval.current[0],
    };

    if (
      temp[index].id_type_protocol ===
      channelsRef.current[index].id_type_protocol
    ) {
      temp[index] = channelsRef.current[index];
    }

    setTimeout(() => {
      setChannels(temp);
    }, 100);
  };

  return (
    <div className={styles.upload_channels}>
      <div className="note">
        <p> {t("site.upload_channels")} </p>
        <p> {t("site.upload_channels1")} </p>
      </div>

      <div className={styles.form_body}>
        <FormInput
          initialValues={channels
            .map((channel) => ({
              [`upload_url_${channel?.name.trim().replace(" ", "_")}`]:
                channel?.uploadurl,
              [`password_${channel?.name.trim().replace(" ", "_")}`]:
                channel?.password,
            }))
            .reduce((acc, val) => ({ ...acc, ...val }), {})}
          onSubmit={handleSave}
          validationSchema={validationSchema}
          id="uploadChannelsForm"
        >
          {channels &&
            protocol &&
            loggingInterval &&
            devices &&
            channels.map((channel, index) => {
              return (
                <div key={index} className={styles.channels}>
                  <div className={styles.title}>
                    <span className={styles.title_name}>
                      {" "}
                      Upload {channel?.name}
                    </span>
                    <FormInput.Check
                      label={t("site.enable")}
                      id={`enable${index + 1}`}
                      name={`enable${index + 1}`}
                      checked={channel?.enable ? 1 : 0}
                      onChange={() => {
                        let temp = [...channels];
                        temp[index].enable = true;
                        setChannels(temp);
                      }}
                      type="radio"
                      className="me-3"
                    />

                    <FormInput.Check
                      label={t("site.disabled")}
                      id={`disable${index + 1}`}
                      name={`enable${index + 1}`}
                      checked={channel?.enable ? 0 : 1}
                      onChange={() => {
                        let temp = [...channels];
                        temp[index].enable = false;
                        setChannels(temp);
                      }}
                      type="radio"
                    />
                  </div>
                  {channel?.enable ? (
                    <div className={styles.channels_body}>
                      <div className="container">
                        <div className="row">
                          <div className="col-md-3"></div>
                          <div className="col-md-6">
                            <div className="mb-3">
                              <FormInput.Select
                                label={t("site.protocol")}
                                name={`protocol_${channel?.name}`}
                                value={
                                  channel?.type_protocol?.id
                                    ? {
                                        value: channel?.type_protocol?.id,
                                        label: channel?.type_protocol.name,
                                      }
                                    : { value: "", label: "" }
                                }
                                option={protocol}
                                onChange={(e) => {
                                  onProtocolChange(e, index, channel?.name);
                                }}
                              />
                            </div>

                            <div className="mb-3">
                              <FormInput.Text
                                label={t("site.upload_url")}
                                name={`upload_url_${channel?.name
                                  .trim()
                                  .replace(" ", "_")}`}
                                placeholder={t("site.upload_url")}
                                className="form-group"
                                required
                              />
                            </div>

                            <div className="mb-3">
                              <FormInput.Text
                                label={t("site.password")}
                                name={`password_${channel?.name
                                  .trim()
                                  .replace(" ", "_")}`}
                                type="password"
                                placeholder={t("site.password")}
                                className="form-group"
                                required
                              />
                            </div>

                            <div className="mb-3">
                              <FormInput.Select
                                label={t("site.select_device_only")}
                                name={`select_device_only_${channel?.name}`}
                                value={
                                  channel?.devices
                                    ? channel?.devices.map((device) => ({
                                        value: device.id,
                                        label: device.name,
                                      }))
                                    : []
                                }
                                option={devices}
                                isMulti={true}
                                isClearable={true}
                                isSearchable={true}
                                onChange={(event) => {
                                  let temp = [...channels];
                                  temp[index].devices = event.map((device) => ({
                                    id: device.value,
                                    name: device.label,
                                  }));
                                  setChannels(temp);
                                }}
                              />
                            </div>

                            <div className="mb-3">
                              <FormInput.Select
                                label={t("site.logging_interval")}
                                name={`logging_interval_${channel?.name}`}
                                value={
                                  channel?.logging_interval?.id
                                    ? {
                                        value: channel?.logging_interval?.id,
                                        label: channel?.logging_interval?.name,
                                      }
                                    : { value: "", label: "" }
                                }
                                onChange={(event) => {
                                  let temp = [...channels];
                                  temp[index].id_type_logging_interval =
                                    event.value;
                                  temp[index].logging_interval.id = event.value;
                                  temp[index].logging_interval.name =
                                    event.label;
                                  setChannels(temp);
                                }}
                                option={loggingInterval}
                              />
                            </div>

                            {channel?.name.search(/^[^\d]*1[^\d]*$/g) !==
                              -1 && (
                              <div className="mb-3">
                                <div className="checkmark">
                                  <FormInput.Switch
                                    label={t("site.remote_access_channel")}
                                    name={`remote_access_${channel?.name}`}
                                    checked={
                                      channel?.allow_remote_configuration
                                        ? 1
                                        : 0
                                    }
                                    onChange={() => {
                                      let temp = [...channels];
                                      setChannels(temp);
                                      temp[index].allow_remote_configuration =
                                        !channel?.allow_remote_configuration;
                                    }}
                                  />
                                </div>
                              </div>
                            )}
                          </div>
                          <div className="col-md-3"></div>
                        </div>
                      </div>
                    </div>
                  ) : null}
                </div>
              );
            })}
        </FormInput>

        <div className="container">
          <div className="row">
            <div className="col-md-3"></div>
            <div className="col-md-6">
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
                    formId="uploadChannelsForm"
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
      </div>
    </div>
  );
}

export default UploadChannels;
