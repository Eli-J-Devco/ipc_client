import React from 'react';
// import { NavLink } from "react-router-dom";
import styles from './EthernetOne.module.scss';
import { RText, RButton } from './../../../../../components/Controls';
import ReactSelectDropdown from '../../../../../components/ReactSelectDropdown';
import { Tooltip } from 'react-tooltip';

export default function EthernetOne() {
    var { t } = this.props;
    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' },
    ];

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
                                        onChange={(e) => { this.handleDropdownChange(e) }}
                                        optionList={options}

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
                                    onChange={(e) => { this.handleInputChange(e) }}
                                />
                            </div>


                            <div className='mb-3'>
                                <RText
                                    label={t('site.subnet_mask')}
                                    inputClass="form-control"
                                    inputId="subnet_mask1"
                                    inputName="subnet_mask1"
                                    name="subnet_mask1"
                                    onChange={(e) => { this.handleInputChange(e) }}
                                />
                            </div>


                            <div className='mb-3'>
                                <RText
                                    label={t('site.gateway')}
                                    inputClass="form-control"
                                    inputId="gateway1"
                                    inputName="gateway1"
                                    name="gateway1"
                                    onChange={(e) => { this.handleInputChange(e) }}
                                />
                            </div>

                            <div className='mb-3'>
                                <RText
                                    label={t('site.mtu')}
                                    inputClass="form-control"
                                    inputId="mtu"
                                    inputName="mtu"
                                    name="mtu"
                                    onChange={(e) => { this.handleInputChange(e) }}
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
                                    onChange={(e) => { this.handleInputChange(e) }}
                                />
                            </div>

                            <div className='mb-3'>
                                <RText
                                    label={t('site.dns2')}
                                    inputClass="form-control"
                                    inputId="dns2"
                                    inputName="dns2"
                                    name="dns2"
                                    onChange={(e) => { this.handleInputChange(e) }}
                                />
                            </div>


                            <div className='form-footer'>
                                <div className='mb-3'>
                                    <RButton
                                        className="btn_back"
                                        text="Back"
                                        iClass={true}
                                        iClassType="back"
                                    />

                                    <RButton
                                        className="btn_save margin-left15"
                                        text="Save & Next"
                                        iClass={true}
                                        iClassType="save"
                                    />

                                    <RButton
                                        className="btn_skip margin-left15"
                                        text="Skip"
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
};