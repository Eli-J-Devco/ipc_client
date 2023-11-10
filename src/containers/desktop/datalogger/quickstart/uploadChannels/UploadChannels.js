import React, { useState } from 'react';
import { useTranslation } from "react-i18next";
import styles from './UploadChannels.module.scss';
import { RButton, RSwitch, RText, RRadio } from './../../../../../components/Controls';
import ReactSelectDropdown from '../../../../../components/ReactSelectDropdown';

function UploadChannels() {
    const { t } = useTranslation();
    const [channel1, setChannel1] = useState(0);
    const [channel2, setChannel2] = useState(0);
    const [channel3, setChannel3] = useState(0);
    const [channel4, setChannel4] = useState(0);

    const UploadChannels = [
        { value: 0, label: '1 minutes' },
        { value: 1, label: '5 minutes' },
        { value: 2, label: '15 minutes' },
    ];
    var selectedUploadChannels = [];


    const devices = [
        { value: 0, label: 'INV 1' },
        { value: 1, label: 'INV 2' },
        { value: 2, label: 'INV 3' },
    ];
    var selectedDevices = [];



    const protocol = [
        { value: 0, label: 'NWM (specify URL)' }
    ];
    var selectedProtocol = [];

    const handleDropdownChange = (event) => {

    }

    const handleInputChange = (event) => {

    }

    console.log(channel1);
    return (
        <div className={styles.upload_channels}>
            <div className='note'>
                <p> {t('site.upload_channels')} </p>
                <p> {t('site.upload_channels1')} </p>
            </div>

            <div className={styles.form_body}>
                <div className={styles.channels}>
                    <div className={styles.title}>
                        <span className={styles.title_name}> {t('site.channel1')}</span>
                        <RRadio
                            label={t('site.enable')}
                            inputId="enable1"
                            inputName="enable1"
                            checked={channel1 === 1 ? 1 : 0}
                            onChange={() => setChannel1(1)}
                        />

                        <RRadio
                            label={t('site.disabled')}
                            inputId="disabled1"
                            inputName="disabled1"
                            checked={channel1 === 1 ? 0 : 1}
                            onChange={() => setChannel1(0)}
                        />


                    </div>
                    {channel1 === 1 ?
                        <div className={styles.channels_body}>
                            <div className='container'>
                                <div className='row'>
                                    <div className='col-md-3'>

                                    </div>

                                    <div className='col-md-6'>
                                        <div className='mb-3'>
                                            <div className='form_dropdown'>
                                                <ReactSelectDropdown
                                                    label={t('site.protocol')}
                                                    className="protocol"
                                                    inputId="protocol"
                                                    inputName="protocol"
                                                    name="protocol"
                                                    value={selectedProtocol}
                                                    onChange={handleDropdownChange}
                                                    optionList={protocol}

                                                />
                                            </div>
                                        </div>

                                        <div className='mb-3'>
                                            <RText
                                                label={t('site.upload_url')}
                                                inputClass="form-control"
                                                inputId="upload_url"
                                                inputName="upload_url"
                                                name="upload_url"
                                                onChange={handleInputChange}
                                            />
                                        </div>


                                        <div className='mb-3'>
                                            <RText
                                                label={t('site.password')}
                                                inputClass="form-control"
                                                inputId="password"
                                                inputName="password"
                                                name="password"
                                                onChange={handleInputChange}
                                            />
                                        </div>

                                        <div className='mb-3'>
                                            <ReactSelectDropdown
                                                label={t('site.select_device_only')}
                                                className="select_device_only"
                                                inputId="select_device_only"
                                                inputName="select_device_only"
                                                name="select_device_only"
                                                value={selectedDevices}
                                                onChange={handleDropdownChange}
                                                optionList={devices}
                                            />
                                        </div>

                                        <div className='mb-3'>
                                            <div className='form_dropdown'>
                                                <ReactSelectDropdown
                                                    label={t('site.logging_interval')}
                                                    className="logging_interval"
                                                    inputId="logging_interval"
                                                    inputName="logging_interval"
                                                    name="logging_interval"
                                                    value={selectedUploadChannels}
                                                    onChange={handleDropdownChange}
                                                    optionList={UploadChannels}

                                                />
                                            </div>
                                        </div>


                                        <div className='mb-3'>
                                            <div className="checkmark">
                                                <RSwitch
                                                    label={t('site.remote_access_channel')}
                                                    inputId="remote_access"
                                                    inputName="remote_access"
                                                    checked={1}
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                        </div>

                                    </div>
                                    <div className='col-md-3'></div>
                                </div>
                            </div>
                        </div>
                        : null}

                </div>



                <div className={styles.channels}>
                    <div className={styles.title}>
                        <span className={styles.title_name}> {t('site.channel2')}</span>
                        <RRadio
                            label={t('site.enable')}
                            inputId="enable2"
                            inputName="enable2"
                            checked={channel2 === 1 ? 1 : 0}
                            onChange={() => setChannel2(1)}
                        />

                        <RRadio
                            label={t('site.disabled')}
                            inputId="disabled2"
                            inputName="disabled2"
                            checked={channel2 === 1 ? 0 : 1}
                            onChange={() => setChannel2(0)}
                        />


                    </div>
                    {channel2 === 1 ?
                        <div className={styles.channels_body}>
                            <div className='container'>
                                <div className='row'>
                                    <div className='col-md-3'>

                                    </div>

                                    <div className='col-md-6'>
                                        <div className='mb-3'>
                                            <div className='form_dropdown'>
                                                <ReactSelectDropdown
                                                    label={t('site.protocol')}
                                                    className="protocol2"
                                                    inputId="protocol2"
                                                    inputName="protocol2"
                                                    name="protocol2"
                                                    value={selectedProtocol}
                                                    onChange={handleDropdownChange}
                                                    optionList={protocol}

                                                />
                                            </div>
                                        </div>

                                        <div className='mb-3'>
                                            <RText
                                                label={t('site.upload_url')}
                                                inputClass="form-control"
                                                inputId="upload_url"
                                                inputName="upload_url"
                                                name="upload_url"
                                                onChange={handleInputChange}
                                            />
                                        </div>


                                        <div className='mb-3'>
                                            <RText
                                                label={t('site.password')}
                                                inputClass="form-control"
                                                inputId="password"
                                                inputName="password"
                                                name="password"
                                                onChange={handleInputChange}
                                            />
                                        </div>

                                        <div className='mb-3'>
                                            <ReactSelectDropdown
                                                label={t('site.select_device_only')}
                                                className="select_device_only"
                                                inputId="select_device_only"
                                                inputName="select_device_only"
                                                name="select_device_only"
                                                value={selectedDevices}
                                                onChange={handleDropdownChange}
                                                optionList={devices}
                                            />
                                        </div>

                                        <div className='mb-3'>
                                            <div className='form_dropdown'>
                                                <ReactSelectDropdown
                                                    label={t('site.logging_interval')}
                                                    className="logging_interval"
                                                    inputId="logging_interval"
                                                    inputName="logging_interval"
                                                    name="logging_interval"
                                                    value={selectedUploadChannels}
                                                    onChange={handleDropdownChange}
                                                    optionList={UploadChannels}

                                                />
                                            </div>
                                        </div>


                                        <div className='mb-3'>
                                            <div className="checkmark">
                                                <RSwitch
                                                    label={t('site.remote_access_channel')}
                                                    inputId="remote_access"
                                                    inputName="remote_access"
                                                    checked={1}
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                        </div>

                                    </div>
                                    <div className='col-md-3'></div>
                                </div>
                            </div>
                        </div>
                        : null}

                </div>



                <div className={styles.channels}>
                    <div className={styles.title}>
                        <span className={styles.title_name}> {t('site.channel3')}</span>
                        <RRadio
                            label={t('site.enable')}
                            inputId="enable3"
                            inputName="enable3"
                            checked={channel3 === 1 ? 1 : 0}
                            onChange={() => setChannel3(1)}
                        />

                        <RRadio
                            label={t('site.disabled')}
                            inputId="disabled3"
                            inputName="disabled3"
                            checked={channel3 === 1 ? 0 : 1}
                            onChange={() => setChannel3(0)}
                        />


                    </div>
                    {channel3 === 3 ?
                        <div className={styles.channels_body}>
                            <div className='container'>
                                <div className='row'>
                                    <div className='col-md-3'>

                                    </div>

                                    <div className='col-md-6'>
                                        <div className='mb-3'>
                                            <div className='form_dropdown'>
                                                <ReactSelectDropdown
                                                    label={t('site.protocol')}
                                                    className="protocol"
                                                    inputId="protocol"
                                                    inputName="protocol"
                                                    name="protocol"
                                                    value={selectedProtocol}
                                                    onChange={handleDropdownChange}
                                                    optionList={protocol}

                                                />
                                            </div>
                                        </div>

                                        <div className='mb-3'>
                                            <RText
                                                label={t('site.upload_url')}
                                                inputClass="form-control"
                                                inputId="upload_url"
                                                inputName="upload_url"
                                                name="upload_url"
                                                onChange={handleInputChange}
                                            />
                                        </div>


                                        <div className='mb-3'>
                                            <RText
                                                label={t('site.password')}
                                                inputClass="form-control"
                                                inputId="password"
                                                inputName="password"
                                                name="password"
                                                onChange={handleInputChange}
                                            />
                                        </div>

                                        <div className='mb-3'>
                                            <ReactSelectDropdown
                                                label={t('site.select_device_only')}
                                                className="select_device_only"
                                                inputId="select_device_only"
                                                inputName="select_device_only"
                                                name="select_device_only"
                                                value={selectedDevices}
                                                onChange={handleDropdownChange}
                                                optionList={devices}
                                            />
                                        </div>

                                        <div className='mb-3'>
                                            <div className='form_dropdown'>
                                                <ReactSelectDropdown
                                                    label={t('site.logging_interval')}
                                                    className="logging_interval"
                                                    inputId="logging_interval"
                                                    inputName="logging_interval"
                                                    name="logging_interval"
                                                    value={selectedUploadChannels}
                                                    onChange={handleDropdownChange}
                                                    optionList={UploadChannels}

                                                />
                                            </div>
                                        </div>


                                        <div className='mb-3'>
                                            <div className="checkmark">
                                                <RSwitch
                                                    label={t('site.remote_access_channel')}
                                                    inputId="remote_access"
                                                    inputName="remote_access"
                                                    checked={1}
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                        </div>

                                    </div>
                                    <div className='col-md-3'></div>
                                </div>
                            </div>
                        </div>
                        : null}

                </div>



                <div className={styles.channels}>
                    <div className={styles.title}>
                        <span className={styles.title_name}> {t('site.channel1')}</span>
                        <RRadio
                            label={t('site.enable')}
                            inputId="enable4"
                            inputName="enable4"
                            checked={channel4 === 1 ? 1 : 0}
                            onChange={() => setChannel4(1)}
                        />

                        <RRadio
                            label={t('site.disabled')}
                            inputId="disabled4"
                            inputName="disabled4"
                            checked={channel4 === 1 ? 0 : 1}
                            onChange={() => setChannel4(0)}
                        />


                    </div>
                    {channel4 === 1 ?
                        <div className={styles.channels_body}>
                            <div className='container'>
                                <div className='row'>
                                    <div className='col-md-3'>

                                    </div>

                                    <div className='col-md-6'>
                                        <div className='mb-3'>
                                            <div className='form_dropdown'>
                                                <ReactSelectDropdown
                                                    label={t('site.protocol')}
                                                    className="protocol"
                                                    inputId="protocol"
                                                    inputName="protocol"
                                                    name="protocol"
                                                    value={selectedProtocol}
                                                    onChange={handleDropdownChange}
                                                    optionList={protocol}

                                                />
                                            </div>
                                        </div>

                                        <div className='mb-3'>
                                            <RText
                                                label={t('site.upload_url')}
                                                inputClass="form-control"
                                                inputId="upload_url"
                                                inputName="upload_url"
                                                name="upload_url"
                                                onChange={handleInputChange}
                                            />
                                        </div>


                                        <div className='mb-3'>
                                            <RText
                                                label={t('site.password')}
                                                inputClass="form-control"
                                                inputId="password"
                                                inputName="password"
                                                name="password"
                                                onChange={handleInputChange}
                                            />
                                        </div>

                                        <div className='mb-3'>
                                            <ReactSelectDropdown
                                                label={t('site.select_device_only')}
                                                className="select_device_only"
                                                inputId="select_device_only"
                                                inputName="select_device_only"
                                                name="select_device_only"
                                                value={selectedDevices}
                                                onChange={handleDropdownChange}
                                                optionList={devices}
                                            />
                                        </div>

                                        <div className='mb-3'>
                                            <div className='form_dropdown'>
                                                <ReactSelectDropdown
                                                    label={t('site.logging_interval')}
                                                    className="logging_interval"
                                                    inputId="logging_interval"
                                                    inputName="logging_interval"
                                                    name="logging_interval"
                                                    value={selectedUploadChannels}
                                                    onChange={handleDropdownChange}
                                                    optionList={UploadChannels}

                                                />
                                            </div>
                                        </div>


                                        <div className='mb-3'>
                                            <div className="checkmark">
                                                <RSwitch
                                                    label={t('site.remote_access_channel')}
                                                    inputId="remote_access"
                                                    inputName="remote_access"
                                                    checked={1}
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                        </div>

                                    </div>
                                    <div className='col-md-3'></div>
                                </div>
                            </div>
                        </div>
                        : null}

                </div>



                <div className='container'>
                    <div className='row'>
                        <div className='col-md-3'></div>
                        <div className='col-md-6'>
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
}

export default UploadChannels;