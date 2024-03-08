import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import _ from 'lodash';
import styles from './UploadChannels.module.scss';

import useAxiosPrivate from '../../../../../hooks/useAxiosPrivate';

import { RButton, RSwitch, RText, RRadio } from './../../../../../components/Controls';
import ReactSelectDropdown from '../../../../../components/ReactSelectDropdown';
import Constants from '../../../../../utils/Constants';
import LibToast from '../../../../../utils/LibToast';
import { loginService } from '../../../../../services/loginService';
import { clearToken } from '../../../../../utils/Token';

function UploadChannels() {
    const { t } = useTranslation();
    const axiosPrivate = useAxiosPrivate();
    const [channels, setChannels] = useState([]);
    const channelsRef = useRef([]);
    const [channelConfig, setChannelConfig] = useState({});

    const [devices, setDevices] = useState([]);
    const [protocol, setProtocol] = useState([]);
    const [loggingInterval, setLoggingInterval] = useState([]);

    const navigate = useNavigate();
    const location = useLocation();
    const from = location?.state?.from || '/datalogger/quickstart/logging-rate';
    const to = '/datalogger/quickstart/remote-access';

    const output = document.getElementById('progress');
    useEffect(() => {
        output.innerHTML = "<div><img src='/loading.gif' /></div>";
        const getChannelConfig = async () => {
            try {
                const response = await axiosPrivate.post(Constants.API_URL.UPLOAD_CHANNEL.CONFIG_CHANNEL);
                if (response?.status === 200) {
                    setTimeout(() => {
                        setChannelConfig(response?.data);
                    }, 100);
                }
            } catch (error) {
                console.log('error', error);
            }
            finally { };
        };
        getChannelConfig();
    }, []);

    useEffect(() => {
        setTimeout(() => {
            setProtocol(channelConfig?.type_protocol?.map((protocol) => ({ value: protocol.id, label: protocol.Protocol })));
            setDevices(channelConfig?.device_list?.map((device) => ({ value: device.id, label: device.name })));
            setLoggingInterval(channelConfig?.type_logging_interval?.map((interval) => ({ value: interval.id, label: interval.time })));
        }, 100);
        const getAllChannels = async () => {
            try {
                const response = await axiosPrivate.post(Constants.API_URL.UPLOAD_CHANNEL.ALL_CHANNELS);
                if (response?.status === 200) {
                    const all_channel = response?.data?.all_channel;
                    setTimeout(() => {
                        setChannels(all_channel);
                    }, 100);
                    channelsRef.current = _.cloneDeep(all_channel);
                }
            } catch (error) {
                if (!loginService.handleMissingInfo(error)) {
                    LibToast.toast(t('toastMessage.error.fetchError'), 'error');
                }
            }
            finally {
            }
        }

        getAllChannels();
    }, [channelConfig]);

    const handleSave = async () => {
        if (_.isEqual(channels, channelsRef.current)) {
            LibToast.toast(t('toastMessage.info.noChange'), 'info');
            return;
        }
        navigate(to, { replace: true });
        // try {
        //     const response = await axiosPrivate.post(Constants.API_URL.UPLOAD_CHANNEL.UPDATE_CHANNEL, changedChannels);
        //     console.log('response', response);
        //     if (response?.status === 200) {
        //         console.log('response', response);
        //     }
        // } catch (error) {
        //     console.log('error', error);
        // }
        // finally { }
    };

    return (
        <div className={styles.upload_channels}>
            <div className='note'>
                <p> {t('site.upload_channels')} </p>
                <p> {t('site.upload_channels1')} </p>
            </div>

            <div className={styles.form_body}>
                {channels && protocol && loggingInterval && devices && channels.map((channel, index) => {
                    output.innerHTML = '';

                    return (
                        <div key={index} className={styles.channels}>
                            <div className={styles.title}>
                                <span className={styles.title_name}> Upload {channel?.name}</span>
                                <RRadio
                                    label={t('site.enable')}
                                    inputId={`enable${index + 1}`}
                                    inputName={`enable${index + 1}`}
                                    checked={channel?.enable ? 1 : 0}
                                    onChange={() => {
                                        let temp = [...channels];
                                        temp[index].enable = true;
                                        setChannels(temp);
                                    }}
                                />

                                <RRadio
                                    label={t('site.disabled')}
                                    inputId={`disabled${index + 1}`}
                                    inputName={`disabled${index + 1}`}
                                    checked={channel?.enable ? 0 : 1}
                                    onChange={() => {
                                        let temp = [...channels];
                                        temp[index].enable = false;
                                        setChannels(temp);
                                    }}
                                />


                            </div>
                            {channel?.enable ?
                                <div className={styles.channels_body}>
                                    <div className='container'>
                                        <div className='row'>
                                            <div className='col-md-3'></div>
                                            <div className='col-md-6'>
                                                <div className='mb-3'>
                                                    <div className='form_dropdown'>
                                                        <ReactSelectDropdown
                                                            key={`${index}_protocol`}
                                                            label={t('site.protocol')}
                                                            className="protocol"
                                                            inputId="protocol"
                                                            inputName="protocol"
                                                            name="protocol"
                                                            value={channel?.type_protocol?.id ? { value: channel?.type_protocol?.id, label: channel?.type_protocol.Protocol } : { value: '', label: '' }}
                                                            onChange={(event) => {
                                                                let temp = [...channels];
                                                                temp[index].id_type_protocol = event.value;
                                                                temp[index].type_protocol.id = event.value;
                                                                temp[index].type_protocol.Protocol = event.label;
                                                                setChannels(temp);
                                                            }}
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
                                                        value={channel?.uploadurl}
                                                        onChange={(event) => {
                                                            let temp = [...channels];
                                                            temp[index].uploadurl = event.target.value;
                                                            setChannels(temp);
                                                        }}
                                                    />
                                                </div>


                                                <div className='mb-3'>
                                                    <RText
                                                        label={t('site.password')}
                                                        inputClass="form-control"
                                                        inputId="password"
                                                        inputName="password"
                                                        name="password"
                                                        value={channel?.password}
                                                        onChange={(event) => {
                                                            let temp = [...channels];
                                                            temp[index].password = event.target.value;
                                                            setChannels(temp);
                                                        }}
                                                    />
                                                </div>

                                                <div className='mb-3'>
                                                    <ReactSelectDropdown
                                                        key={`${index}_select_device_only`}
                                                        label={t('site.select_device_only')}
                                                        className="select_device_only"
                                                        inputId="select_device_only"
                                                        inputName="select_device_only"
                                                        name="select_device_only"
                                                        value={channel?.selected_upload ? channel?.selected_upload.map((device) => ({ value: device.id, label: device.name })) : []}
                                                        onChange={(event) => {
                                                            let temp = [...channels];
                                                            if (!temp[index].selected_upload) {
                                                                temp[index].selected_upload = [];
                                                            }
                                                            temp[index].selected_upload = event.map((device) => ({ id: device.value, name: device.label }));
                                                            setChannels(temp);
                                                        }}
                                                        optionList={devices}
                                                        isMulti={true}
                                                        isSearchable={true}
                                                        isClearable={true}
                                                    />
                                                </div>

                                                <div className='mb-3'>
                                                    <div className='form_dropdown'>
                                                        <ReactSelectDropdown
                                                            key={`${index}_logging_interval`}
                                                            label={t('site.logging_interval')}
                                                            className="logging_interval"
                                                            inputId="logging_interval"
                                                            inputName="logging_interval"
                                                            name="logging_interval"
                                                            value={channel?.type_logging_interval?.id ? { value: channel?.type_logging_interval?.id, label: channel?.type_logging_interval?.time } : { value: '', label: '' }}
                                                            onChange={(event) => {
                                                                let temp = [...channels];
                                                                temp[index].id_type_logging_interval = event.value;
                                                                temp[index].type_logging_interval.id = event.value;
                                                                temp[index].type_logging_interval.time = event.label;
                                                                setChannels(temp);
                                                            }}
                                                            optionList={loggingInterval}

                                                        />
                                                    </div>
                                                </div>

                                                {channel?.name.search(/^[^\d]*1[^\d]*$/g) !== -1 &&
                                                    <div className='mb-3'>
                                                        <div className="checkmark">
                                                            <RSwitch
                                                                label={t('site.remote_access_channel')}
                                                                inputId="remote_access"
                                                                inputName="remote_access"
                                                                checked={channel?.allow_remote_configuration ? 1 : 0}
                                                                onChange={() => {
                                                                    let temp = [...channels];
                                                                    setChannels(temp); temp[index].allow_remote_configuration = !channel?.allow_remote_configuration
                                                                        ;

                                                                }}
                                                            />
                                                        </div>
                                                    </div>
                                                }

                                            </div>
                                            <div className='col-md-3'></div>
                                        </div>
                                    </div>
                                </div>
                                : null}

                        </div>
                    );
                })}



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
                                        onClick={() => {
                                            navigate(from, { replace: true });
                                        }}
                                    />

                                    <RButton
                                        className="btn_save margin-left15"
                                        text="Save & Next"
                                        iClass={true}
                                        iClassType="save"
                                        onClick={handleSave}
                                    />

                                    <RButton
                                        className="btn_skip margin-left15"
                                        text="Skip"
                                        onClick={() => {
                                            navigate(to, { replace: true });
                                        }}
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