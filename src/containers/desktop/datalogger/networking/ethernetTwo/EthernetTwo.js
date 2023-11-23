import { useTranslation } from "react-i18next";
import styles from './EthernetTwo.module.scss';
import { RText, RButton, RSwitch } from './../../../../../components/Controls';
import ReactSelectDropdown from '../../../../../components/ReactSelectDropdown';
import { Tooltip } from 'react-tooltip';

function EthernetTwo() {
    const { t } = useTranslation();
    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' },
    ];

    const handleInputChange = (event) => {

    }

    const handleDropdownChange = (event) => {

    }



    var selectedOption = [];
    return (
        <div className={styles.ethernet}>
            <div className='note'>
                <p> {t('site.info_note')} </p>
            </div>

            <div className={styles.form_body}>
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-3'></div>
                        <div className='col-md-6'>
                            <div className='mb-3'>
                                <div className='form_dropdown'>
                                    <ReactSelectDropdown
                                        label={t('site.ethernet')}
                                        className="ethernet"
                                        inputId="ethernet1"
                                        inputName="ethernet1"
                                        name="ethernet1"
                                        value={selectedOption}
                                        onChange={handleDropdownChange}
                                        optionList={options}

                                    />
                                </div>
                            </div>

                            <div className='mb-3'>
                                <div className="checkmark">
                                    <RSwitch
                                        label={t('site.obtain_dns')}
                                        inputId="kiosk_view"
                                        inputName="kiosk_view"
                                        checked={1}
                                        onChange={handleInputChange}
                                    />
                                </div>

                            </div>

                            <div className='mb-3'>
                                <RText
                                    label={t('site.ip_address')}
                                    inputClass="form-control"
                                    inputId="ip_address1"
                                    inputName="ip_address1"
                                    name="ip_address1"
                                    onChange={handleInputChange}
                                />
                            </div>


                            <div className='mb-3'>
                                <RText
                                    label={t('site.subnet_mask')}
                                    inputClass="form-control"
                                    inputId="subnet_mask1"
                                    inputName="subnet_mask1"
                                    name="subnet_mask1"
                                    onChange={handleInputChange}
                                />
                            </div>


                            <div className='mb-3'>
                                <RText
                                    label={t('site.gateway')}
                                    inputClass="form-control"
                                    inputId="gateway1"
                                    inputName="gateway1"
                                    name="gateway1"
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div className='mb-3'>
                                <RText
                                    label={t('site.mtu')}
                                    inputClass="form-control"
                                    inputId="mtu"
                                    inputName="mtu"
                                    name="mtu"
                                    onChange={handleInputChange}
                                    info={t('site.mtu_note')}
                                />

                                <Tooltip id="my-tooltip" />
                            </div>


                            <div className='mb-3'>
                                <RText
                                    label={t('site.dns1')}
                                    inputClass="form-control"
                                    inputId="dns1"
                                    inputName="dns1"
                                    name="dns1"
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div className='mb-3'>
                                <RText
                                    label={t('site.dns2')}
                                    inputClass="form-control"
                                    inputId="dns2"
                                    inputName="dns2"
                                    name="dns2"
                                    onChange={handleInputChange}
                                />
                            </div>


                            <div className='form-footer'>
                                <div className='mb-3'>
                                    <RButton
                                        className="btn_save"
                                        text="Save"
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

export default EthernetTwo;