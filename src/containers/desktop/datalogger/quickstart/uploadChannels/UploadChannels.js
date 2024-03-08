import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import _ from 'lodash';
import styles from './UploadChannels.module.scss';

import useAxiosPrivate from '../../../../../hooks/useAxiosPrivate';
import { loginService } from '../../../../../services/loginService';

import { RButton, RSwitch, RText, RRadio, CustomShowHidePassword } from './../../../../../components/Controls';
import ReactSelectDropdown from '../../../../../components/ReactSelectDropdown';
import Constants from '../../../../../utils/Constants';
import LibToast from '../../../../../utils/LibToast';

function UploadChannels() {
    const {
        register,
        formState: { errors },
        handleSubmit,
        setValue,
    } = useForm({
        mode: "onChange",
    });

    const { t } = useTranslation();
    const axiosPrivate = useAxiosPrivate();

    const [channels, setChannels] = useState([]);
    const channelsRef = useRef([]);
    const [channelConfig, setChannelConfig] = useState({});

    const [devices, setDevices] = useState([]);
    const [protocol, setProtocol] = useState([]);
    const [loggingInterval, setLoggingInterval] = useState([]);

    const [isShow, setIsShow] = useState([]);

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
                        all_channel.forEach((channel, index) => {
                            setValue(`upload_url_${channel?.name}`, channel?.uploadurl);
                            setValue(`password_${channel?.name}`, channel?.password);
                        });
                    }, 100);
                    channelsRef.current = _.cloneDeep(all_channel);
                    setIsShow(new Array(all_channel.length).fill(false));
                }
            } catch (error) {
                if (!loginService.handleMissingInfo(error)) {
                    LibToast.toast(t('toastMessage.error.fetchError'), 'error');
                }
                else navigate("/", { replace: true });
            }
            finally {
            }
        }

        getAllChannels();
    }, [channelConfig]);

    const handleSave = (data) => {
        channels.forEach((channel, index) => {
            channel.uploadurl = data[`upload_url_${channel?.name}`];
            channel.password = data[`password_${channel?.name}`];
        });
        if (_.isEqual(channels, channelsRef.current)) {
            LibToast.toast(t('toastMessage.info.noChange'), 'info');
            return;
        }
        const updateChannels = async () => {
            try {
                output.innerHTML = "<div><img src='/loading.gif' /></div>";
                const response = await axiosPrivate.post(Constants.API_URL.UPLOAD_CHANNEL.UPDATE_CHANNEL, channels);
                if (response?.status === 200) {
                    LibToast.toast(`Upload channels ${t('toastMessage.infp.updateSuccess')}`, 'success');
                    navigate(to, { replace: true });
                }
            } catch (error) {
                if (!loginService.handleMissingInfo(error)) {
                    LibToast.toast(t('toastMessage.error.updateError'), 'error');
                }
                else navigate("/", { replace: true });
            }
            finally {
                output.innerHTML = '';
            }
        }
        setTimeout(() => {
            updateChannels();
        }, 200);
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
                                    <form onSubmit={handleSubmit(handleSave)}>
                                        <div className='container'>
                                            <div className='row'>
                                                <div className='col-md-3'></div>
                                                <div className='col-md-6'>
                                                    <div className='mb-3'>
                                                        <div className='form_dropdown'>
                                                            <ReactSelectDropdown
                                                                key={`${channel?.name}_protocol`}
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
                                                        <div className="control-label">
                                                            {t('site.upload_url')}
                                                            <span className="required">*</span>
                                                        </div>
                                                        <input
                                                            className={errors[`upload_url_${channel?.name}`] ? "form-control input-error" : "form-control"}
                                                            id={`upload_url_${channel?.name}`}
                                                            name={`upload_url_${channel?.name}`}
                                                            // type="password"
                                                            {...register(`upload_url_${channel?.name}`, {
                                                                required: "Please enter a valid URL.",
                                                                pattern: { value: /^(http|https):\/\/[^ "]+$/, message: "Please enter a valid URL." },
                                                            })}
                                                        />
                                                        {errors[`upload_url_${channel?.name}`] && (
                                                            <span className="validate">{errors[`upload_url_${channel?.name}`].message}</span>
                                                        )}
                                                    </div>


                                                    <div className='mb-3'>
                                                        <div className="control-label">
                                                            {t('site.password')}
                                                        </div>
                                                        <div style={{ display: 'flex', position: 'relative', alignItems: 'center' }}>
                                                            <input
                                                                className={errors[`password_${channel?.name}`] ? "form-control input-error" : "form-control"}
                                                                id={`password_${channel?.name}`}
                                                                name={`password_${channel?.name}`}
                                                                type={isShow[index] ? "password" : "text"}
                                                                {...register(`password_${channel?.name}`, {
                                                                    pattern: { value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, message: "Password must contain at least 8 characters, including at least one letter and one number." },
                                                                })}
                                                                style={{ paddingRight: 40 }}
                                                            />
                                                            <div style={{ display: 'flex', position: 'absolute', right: 8, cursor: 'pointer' }}
                                                                onClick={() => {
                                                                    setTimeout(() => {
                                                                        let temp = [...isShow];
                                                                        temp[index] = !isShow[index];
                                                                        setIsShow(temp);
                                                                    }, 100);
                                                                }}
                                                            >
                                                                <svg style={isShow[index] ? { display: 'none' } : { display: 'block' }} width="24" height="24" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd"><path d="M12.01 20c-5.065 0-9.586-4.211-12.01-8.424 2.418-4.103 6.943-7.576 12.01-7.576 5.135 0 9.635 3.453 11.999 7.564-2.241 4.43-6.726 8.436-11.999 8.436zm-10.842-8.416c.843 1.331 5.018 7.416 10.842 7.416 6.305 0 10.112-6.103 10.851-7.405-.772-1.198-4.606-6.595-10.851-6.595-6.116 0-10.025 5.355-10.842 6.584zm10.832-4.584c2.76 0 5 2.24 5 5s-2.24 5-5 5-5-2.24-5-5 2.24-5 5-5zm0 1c2.208 0 4 1.792 4 4s-1.792 4-4 4-4-1.792-4-4 1.792-4 4-4z" /></svg>
                                                                <svg style={!isShow[index] ? { display: 'none' } : { display: 'block' }} width="24" height="24" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd"><path d="M8.137 15.147c-.71-.857-1.146-1.947-1.146-3.147 0-2.76 2.241-5 5-5 1.201 0 2.291.435 3.148 1.145l1.897-1.897c-1.441-.738-3.122-1.248-5.035-1.248-6.115 0-10.025 5.355-10.842 6.584.529.834 2.379 3.527 5.113 5.428l1.865-1.865zm6.294-6.294c-.673-.53-1.515-.853-2.44-.853-2.207 0-4 1.792-4 4 0 .923.324 1.765.854 2.439l5.586-5.586zm7.56-6.146l-19.292 19.293-.708-.707 3.548-3.548c-2.298-1.612-4.234-3.885-5.548-6.169 2.418-4.103 6.943-7.576 12.01-7.576 2.065 0 4.021.566 5.782 1.501l3.501-3.501.707.707zm-2.465 3.879l-.734.734c2.236 1.619 3.628 3.604 4.061 4.274-.739 1.303-4.546 7.406-10.852 7.406-1.425 0-2.749-.368-3.951-.938l-.748.748c1.475.742 3.057 1.19 4.699 1.19 5.274 0 9.758-4.006 11.999-8.436-1.087-1.891-2.63-3.637-4.474-4.978zm-3.535 5.414c0-.554-.113-1.082-.317-1.562l.734-.734c.361.69.583 1.464.583 2.296 0 2.759-2.24 5-5 5-.832 0-1.604-.223-2.295-.583l.734-.735c.48.204 1.007.318 1.561.318 2.208 0 4-1.792 4-4z" /></svg>
                                                            </div>
                                                        </div>
                                                        {errors[`password_${channel?.name}`] && (
                                                            <span className="validate">{errors[`password_${channel?.name}`].message}</span>
                                                        )}
                                                    </div>

                                                    <div className='mb-3'>
                                                        <ReactSelectDropdown
                                                            key={`${channel?.name}_select_device_only`}
                                                            label={t('site.select_device_only')}
                                                            className="select_device_only"
                                                            inputId="select_device_only"
                                                            inputName="select_device_only"
                                                            name="select_device_only"
                                                            value={channel?.device_list ? channel?.device_list.map((device) => ({ value: device.id, label: device.name })) : []}
                                                            onChange={(event) => {
                                                                let temp = [...channels];
                                                                temp[index].device_list = event.map((device) => ({ id: device.value, name: device.label }));
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
                                                                key={`${channel?.name}_logging_interval`}
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
                                    </form>
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
                                        onClick={handleSubmit(handleSave)}
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