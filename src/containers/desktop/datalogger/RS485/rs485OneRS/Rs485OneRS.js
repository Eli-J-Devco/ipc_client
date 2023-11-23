import { useTranslation } from "react-i18next";
import styles from './Rs485OneRS.module.scss';
import { RCheckbox, RButton } from './../../../../../components/Controls';
import ReactSelectDropdown from '../../../../../components/ReactSelectDropdown';
import FormInput from "../../../../../components/formInput/FormInput";

function Rs485OneRS() {
    const { t } = useTranslation();
    const parity = [
        { value: 0, label: 'None' },
        { value: 1, label: 'Strawberry' },
        { value: 2, label: 'Vanilla' },
    ];
    var selectedParity = [];

    const stopBit = [
        { value: 0, label: 'None' },
        { value: 1, label: 'Strawberry' },
        { value: 2, label: 'Vanilla' },
    ];
    var selectedStopBit = [];


    const modbusTimeout = [
        { value: 0, label: 'None' },
        { value: 1, label: 'Strawberry' },
        { value: 2, label: 'Vanilla' },
    ];
    var selectedModbusTimeout = [];


    const debugLevel = [
        { value: 0, label: 'None' },
        { value: 1, label: 'Strawberry' },
        { value: 2, label: 'Vanilla' },
    ];
    var selectedDebugLevel = [];


    const handleDropdownChange = (event) => {

    }

    return (
        <div className={styles.rs485}>
            <div className='note'>
                <p> {t('site.rs485_note')} </p>
            </div>

            <div className={styles.form_body}>
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-3'></div>
                        <div className='col-md-6'>
                                <div className="list-checkbox">
                                    <p> {t('site.rs485_baud_rate')} </p>
                                    <div className='mb-3'>
                                        <div className="checkmark">
                                            <RCheckbox
                                                inputId="baud_rate9600"
                                                inputName="baud_rate9600"
                                                labelClass="no-label"
                                                checked={1}
                                                onChange={handleDropdownChange}
                                                label="9600"
                                            />
                                        </div>
                                    </div>

                                    <div className='mb-3'>
                                        <div className="checkmark">
                                            <RCheckbox
                                                inputId="baud_rate19200"
                                                inputName="baud_rate19200"
                                                labelClass="no-label"
                                                checked={0}
                                                onChange={handleDropdownChange}
                                                label="19200"
                                            />
                                        </div>
                                    </div>

                                    <div className='mb-3'>
                                        <div className="checkmark">
                                            <RCheckbox
                                                inputId="baud_rate38400"
                                                inputName="baud_rate38400"
                                                labelClass="no-label"
                                                checked={0}
                                                onChange={handleDropdownChange}
                                                label="38400"
                                            />
                                        </div>
                                    </div>

                                    <div className='mb-3'>
                                        <div className="checkmark">
                                            <RCheckbox
                                                inputId="baud_rate57600"
                                                inputName="baud_rate57600"
                                                labelClass="no-label"
                                                checked={0}
                                                onChange={handleDropdownChange}
                                                label="57600"
                                            />
                                        </div>
                                    </div>

                                    <div className='mb-3'>
                                        <div className="checkmark">
                                            <RCheckbox
                                                inputId="baud_rate115200"
                                                inputName="baud_rate115200"
                                                labelClass="no-label"
                                                checked={0}
                                                onChange={handleDropdownChange}
                                                label="115200"
                                            />
                                        </div>
                                    </div>
                                </div>




                                <FormInput.Text
                                    label={t('site.rs485_parity')}
                                    name="name"
                                    className="mb-3"
                                />

                                <div className='mb-3'>
                                    <div className='form_dropdown'>
                                        <ReactSelectDropdown
                                            label={t('site.rs485_stopbit')}
                                            className="rs485_stopbit"
                                            inputId="rs485_stopbit"
                                            inputName="rs485_stopbit"
                                            name="rs485_stopbit"
                                            value={selectedParity}
                                            onChange={handleDropdownChange}
                                            optionList={parity}

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
                                            value={selectedStopBit}
                                            onChange={handleDropdownChange}
                                            optionList={stopBit}

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
                                            value={selectedModbusTimeout}
                                            onChange={handleDropdownChange}
                                            optionList={modbusTimeout}

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
                                            value={selectedDebugLevel}
                                            onChange={handleDropdownChange}
                                            optionList={debugLevel}

                                        />
                                    </div>
                                </div>

                                <div className='form-footer'>
                                    <div className='mb-3'>

                                        <RButton
                                            className="btn_save"
                                            text="Save & Next"
                                            iClass={true}
                                            iClassType="save"
                                        />

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

export default Rs485OneRS;