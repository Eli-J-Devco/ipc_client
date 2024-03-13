/********************************************************
 * Copyright 2020-2021 NEXT WAVE ENERGY MONITORING INC.
 * All rights reserved.
 *
 *********************************************************/
import { useTranslation } from "react-i18next";
import { useFormContext } from "react-hook-form";
import styles from "./Networking.module.scss";

import { RButton, RSwitch } from "../../../../components/Controls";
import ReactSelectDropdown from "../../../../components/ReactSelectDropdown";

import canEdit from "../../../../utils/DisabledStateByIPMode";

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
    } = { ...data.data };

    const { register, formState: { errors }, handleSubmit } = useFormContext();

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
            }
            else {
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
            selectedDropdown["mode"](options?.mode.find((item) => item.value === value.value));
        }, 100);
    };

    return (
        <div className={styles.ethernet}>
            <div className="note">
                <p> {t("site.info_note")} </p>
            </div>

            <div className={styles.form_body}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-3"></div>
                            <div className="col-md-6">
                                {
                                    !isPlugged &&
                                    <div className="note mb-3" style={{ color: "red" }}>
                                        <span style={{ color: "#000" }}><strong>Note:</strong> </span>{NICInfo?.name ? NICInfo?.name : existedEthernet?.name} is unplugged
                                    </div>
                                }
                                <div className="mb-3">
                                    <div className="form_dropdown">
                                        <ReactSelectDropdown
                                            label={t("site.mode")}
                                            className="mode"
                                            inputId="mode"
                                            inputName="mode"
                                            optionList={options?.mode}
                                            name="mode"
                                            value={selectedOption?.mode}
                                            onChange={(value) => handleModeDropdown(value)}
                                        />
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <div className="form_dropdown">
                                        <ReactSelectDropdown
                                            label={t("site.ethernet")}
                                            className="ethernet"
                                            inputId="ethernet1"
                                            inputName="ethernet1"
                                            optionList={options?.nic}
                                            name="ethernet1"
                                            value={selectedOption?.nic}
                                            isDisabled={!canEdit["ethernet"][[modeInfo?.label]]}
                                            onChange={(value) => handleNICDropdown(value)}
                                        />
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <div className="checkmark">
                                        <RSwitch
                                            label={t("site.obtain_dns")}
                                            inputId="kiosk_view"
                                            inputName="kiosk_view"
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
                                    <label className="control-label">
                                        {t("site.ip_address")}
                                    </label>
                                    <input
                                        className={errors.ip_address ? "form-control input-error" : "form-control"}
                                        id="ip_address"
                                        name="ip_address"
                                        disabled={!canEdit["ip_address"][[modeInfo?.label]]}
                                        {...register("ip_address", { required: "Please fill the ip address", pattern: { value: /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/, message: "Invalid IP address" } })}
                                    />

                                    {errors.ip_address && (
                                        <span className="validate">{errors.ip_address.message}</span>
                                    )}
                                </div>
                                <div className="mb-3">
                                    <label className="control-label">
                                        {t("site.subnet_mask")}
                                    </label>
                                    <input
                                        className={errors.subnet_mask ? "form-control input-error" : "form-control"}
                                        id="subnet_mask"
                                        name="subnet_mask"
                                        disabled={!canEdit["subnet_mask"][[modeInfo?.label]]}
                                        {...register("subnet_mask", { required: "Please fill the subnet mask", pattern: { value: /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/, message: "Invalid subnet mask" } })}
                                    />

                                    {errors.subnet_mask && (
                                        <span className="validate">{errors.subnet_mask.message}</span>
                                    )}
                                </div>
                                <div className="mb-3">
                                    <label className="control-label">
                                        {t("site.gateway")}
                                    </label>
                                    <input
                                        className={errors.gateway ? "form-control input-error" : "form-control"}
                                        id="gateway"
                                        name="gateway"
                                        disabled={!canEdit["gateway"][[modeInfo?.label]]}
                                        {...register("gateway", { required: "Please fill the gateway", pattern: { value: /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/, message: "Invalid gateway" } })}
                                    />

                                    {errors.gateway && (
                                        <span className="validate">{errors.gateway.message}</span>
                                    )}
                                </div>
                                <div className="mb-3">
                                    <label className="control-label">
                                        {t("site.mtu")}
                                    </label>
                                    <input
                                        title={t("site.mtu_note")}
                                        className={errors.mtu ? "form-control input-error" : "form-control"}
                                        id="mtu"
                                        name="mtu"
                                        disabled={!canEdit["mtu"][[modeInfo?.label]]}
                                        {...register("mtu", {
                                            validate: (value) => {
                                                if (!value) {
                                                    return null;
                                                }
                                                if (!Number.isInteger(parseFloat(value))) {
                                                    return "MTU must be an integer number.";
                                                }
                                                if (value > 1500) {
                                                    return "MTU must be less than or equal to 1500.";
                                                }
                                                if (value < 128) {
                                                    return "MTU must be greater than or equal to 128";
                                                }
                                            },
                                        })}
                                    />
                                    {errors.mtu && (
                                        <span className="validate">{errors.mtu.message}</span>
                                    )}
                                </div>
                                <div className="mb-3">
                                    <label className="control-label">
                                        {t("site.dns1")}
                                    </label>
                                    <input
                                        className={errors.dns1 ? "form-control input-error" : "form-control"}
                                        id="dns1"
                                        name="dns1"
                                        disabled={!canEdit["dns1"][[modeInfo?.label]]}
                                        {...register("dns1", { pattern: { value: /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/, message: "Invalid DNS" } })}
                                    />

                                    {errors.dns1 && (
                                        <span className="validate">{errors.dns1.message}</span>
                                    )}
                                </div>
                                <div className="mb-3">
                                    <label className="control-label">
                                        {t("site.dns2")}
                                    </label>
                                    <input
                                        className={errors.dns2 ? "form-control input-error" : "form-control"}
                                        id="dns2"
                                        name="dns2"
                                        disabled={!canEdit["dns2"][[modeInfo?.label]]}
                                        {...register("dns2", { pattern: { value: /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/, message: "Invalid DNS" } })}
                                    />

                                    {errors.dns2 && (
                                        <span className="validate">{errors.dns2.message}</span>
                                    )}
                                </div>

                                <div className="form-footer">
                                    <div className="mb-3">
                                        {from && <RButton
                                            className="btn_back"
                                            text="Back"
                                            iClass={true}
                                            iClassType="back"
                                            onClick={() => back(from)}
                                        />}

                                        <button
                                            className="btn_save ms-2"
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
                                            {to ? "Save & Next" : "Save"}
                                        </button>

                                        {to && <RButton className="btn_skip margin-left15" text="Skip" onClick={() => save(to)} />}
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3"></div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EthernetTemplate;
