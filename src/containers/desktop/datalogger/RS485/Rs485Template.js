/********************************************************
 * Copyright 2020-2021 NEXT WAVE ENERGY MONITORING INC.
 * All rights reserved.
 *
 *********************************************************/
import { useTranslation } from "react-i18next";
import styles from './Rs485Template.module.scss';
import ReactSelectDropdown from "../../../../components/ReactSelectDropdown";
import { RButton } from "../../../../components/Controls";

function Rs485Template({ id, isBack, from, to, selectedDropdown, selectedOption, options, namekey, back, save, handleSave }) {
    const { t } = useTranslation();

    const handleDropdownChange = (value, type) => {
        setTimeout(() => {
            selectedDropdown[type](value);
        }, 200);
    }

    return (
        <div className={styles.rs485}>
            <div className='note'>
                <p> {t('site.rs485_note')} </p>
            </div>

            <div className={styles.form_body}>
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-3'>
                        </div>
                        <div className='col-md-6'>
                            <div className="mb-3">
                                <strong>PORT:</strong>&nbsp;
                                {namekey}
                            </div>
                            <div className="mb-3">
                                <div className="form_dropdown">
                                    <ReactSelectDropdown
                                        label={t("site.rs485_baud_rate")}
                                        className="ethernet"
                                        inputId="rs485_baud_rate"
                                        inputName="rs485_baud_rate"
                                        optionList={options.baud}
                                        name="rs485_baud_rate"
                                        value={selectedOption.baud}
                                        onChange={(value) => handleDropdownChange(value, "baud")}
                                    />
                                </div>
                            </div>
                            <div className="mb-3">
                                <div className="form_dropdown">
                                    <ReactSelectDropdown
                                        label={t("site.rs485_parity")}
                                        className="rs485_parity"
                                        inputId="rs485_parity"
                                        inputName="rs485_parity"
                                        optionList={options.parity}
                                        name="rs485_parity"
                                        value={selectedOption.parity}
                                        onChange={(value) => handleDropdownChange(value, "parity")}
                                    />
                                </div>
                            </div>

                            <div className='mb-3'>
                                <div className='form_dropdown'>
                                    <ReactSelectDropdown
                                        label={t('site.rs485_stopbit')}
                                        className="rs485_stopbit"
                                        inputId="rs485_stopbit"
                                        inputName="rs485_stopbit"
                                        name="rs485_stopbit"
                                        value={selectedOption.stop_bits}
                                        onChange={(value) => handleDropdownChange(value, "stop_bits")}
                                        optionList={options.stop_bits}

                                    />
                                </div>
                            </div>


                            <div className='mb-3'>
                                <div className='form_dropdown'>
                                    <ReactSelectDropdown
                                        label={t('site.rs485_modbus')}
                                        className="rs485_modbus"
                                        inputId="rs485_modbus"
                                        inputName="rs485_modbus"
                                        name="rs485_modbus"
                                        value={selectedOption.timeout}
                                        onChange={(value) => handleDropdownChange(value, "timeout")}
                                        optionList={options.timeout}

                                    />
                                </div>
                            </div>

                            <div className='mb-3'>
                                <div className='form_dropdown'>
                                    <ReactSelectDropdown
                                        label={t('site.rs485_debug')}
                                        className="rs485_debug"
                                        inputId="rs485_debug"
                                        inputName="rs485_debug"
                                        name="rs485_debug"
                                        value={selectedOption.debuglevel}
                                        onChange={(value) => handleDropdownChange(value, "debuglevel")}
                                        optionList={options.debuglevel}

                                    />
                                </div>
                            </div>

                            <div className='form-footer'>
                                <div className='mb-3'>
                                    {isBack &&
                                        <RButton
                                            className="btn_back"
                                            text="Back"
                                            iClass={true}
                                            iClassType="back"
                                            onClick={() => back(from)}
                                        />
                                    }

                                    <RButton
                                        className="btn_save margin-left15"
                                        text={to ? "Save & Next" : "Save"}
                                        iClass={true}
                                        iClassType="save"
                                        onClick={() => handleSave(id, to)}
                                    />

                                    {to && <RButton
                                        className="btn_skip margin-left15"
                                        text="Skip"
                                        onClick={() => save(to)}
                                    />
                                    }
                                </div>
                            </div>
                        </div>
                        <div className='col-md-3'></div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Rs485Template;