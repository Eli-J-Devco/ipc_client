import styles from './Schedule.module.scss';
import React, {  } from 'react';
import { useTranslation } from "react-i18next";
import { RButton, RSwitch } from '../../../../../components/Controls';
import ReactSelectDropdown from '../../../../../components/ReactSelectDropdown';

function Schedule() {
    const { t } = useTranslation();

    const waitBeforeRetry = [
        { value: 0, label: 'After next log cycle' }
    ];
    var selectedWaitBeforeRetry = [];


    const timesToRetry = [
        { value: 0, label: '3' }
    ];
    var selectedTimeToRetry = [];

    const uploadDebug = [
        { value: 0, label: 'Errors & Summary (default)' }
    ];
    var selectedUploadDebug = [];



    const selectedSchuduleUploadTime = [
        { value: 0, label: 'Connect every log cycle' }
    ];
    var scheduledUploadTime = [];

    const handleDropdownChange = (event) => {

    }

    const handleInputChange = (event) => {

    }
    return (
        <div className={styles.upload_channels}>
            {/* <Outlet />
                     */}
            <div className='note'>
                <p> {t('site.upload_schudule')} <span style={{color: "red"}}>Next upload at Thursday, August 17 2023 18:50:01 PDT</span></p>
                <p> {t('site.upload_schudule1')} </p>
            </div>

            <div className={styles.form_body}>
                <div className={styles.channels_body}>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-md-3'>

                            </div>

                            <div className='col-md-6'>
                                <div className='mb-3'>
                                    <div className='form_dropdown'>
                                        <ReactSelectDropdown
                                            label={t('site.scheduled_upload_time')}
                                            className="scheduled_upload_time"
                                            inputId="scheduled_upload_time"
                                            inputName="scheduled_upload_time"
                                            name="scheduled_upload_time"
                                            value={selectedSchuduleUploadTime}
                                            onChange={handleDropdownChange}
                                            optionList={scheduledUploadTime}

                                        />
                                    </div>
                                </div>


                                <div className='mb-3'>
                                    <div className='form_dropdown'>
                                        <ReactSelectDropdown
                                            label={t('site.times_to_retry')}
                                            className="times_to_retry"
                                            inputId="times_to_retry"
                                            inputName="times_to_retry"
                                            name="times_to_retry"
                                            value={selectedTimeToRetry}
                                            onChange={handleDropdownChange}
                                            optionList={timesToRetry}

                                        />
                                    </div>
                                </div>

                                <div className='mb-3'>
                                    <div className='form_dropdown'>
                                        <ReactSelectDropdown
                                            label={t('site.wait_before_retry')}
                                            className="wait_before_retry"
                                            inputId="wait_before_retry"
                                            inputName="wait_before_retry"
                                            name="wait_before_retry"
                                            value={selectedWaitBeforeRetry}
                                            onChange={handleDropdownChange}
                                            optionList={waitBeforeRetry}

                                        />
                                    </div>
                                </div>

                                <div className='mb-3'>
                                    <div className='form_dropdown'>
                                        <ReactSelectDropdown
                                            label={t('site.upload_debug')}
                                            className="upload_debug"
                                            inputId="upload_debug"
                                            inputName="upload_debug"
                                            name="upload_debug"
                                            value={selectedUploadDebug}
                                            onChange={handleDropdownChange}
                                            optionList={uploadDebug}

                                        />
                                    </div>
                                </div>

                                

                                <div className='mb-3'>
                                    <div className="checkmark">
                                        <RSwitch
                                            label={t('site.alarm_status')}
                                            inputId="alarm_status"
                                            inputName="alarm_status"
                                            checked={1}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>

                                <div className='mb-3'>
                                    <div className="checkmark">
                                        <RSwitch
                                            label={t('site.low_disk_alarm')}
                                            inputId="low_disk_alarm"
                                            inputName="low_disk_alarm"
                                            checked={1}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>

                                <div className='mb-3'>
                                    <div className="checkmark">
                                        <RSwitch
                                            label={t('site.system_startup')}
                                            inputId="system_startup"
                                            inputName="system_startup"
                                            checked={1}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>

                                <div className='form-footer'>
                                    <div className='mb-3'>
                                        <RButton
                                            className="btn_save "
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
        </div>
    );
}

export default Schedule;