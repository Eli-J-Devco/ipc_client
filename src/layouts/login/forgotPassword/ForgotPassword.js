
/********************************************************
* Copyright 2020-2021 NEXT WAVE ENERGY MONITORING INC.
* All rights reserved.
* 
*********************************************************/
import React, { useState } from 'react';
import styles from './ForgotPassword.module.scss';
import { RText, RButton } from '../../../components/Controls'
import FormInput from '../../../components/formInput/FormInput';
import Button from '../../../components/button/Button';
import * as Yup from 'yup';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import api from '../../../api/axios';
import { useNavigate } from 'react-router-dom';
import Constants from '../../../utils/Constants';
import { loginService } from '../../../services/loginService';
import LibToast from '../../../utils/LibToast';
import { useTranslation } from 'react-i18next';
export default function ForgotPassword() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [newPassword, setNewPassword] = useState("");
    const initialValues = {
        username: ''
    };

    const schema = Yup.object().shape({
        username: Yup.string().matches(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/, "Invalid email").required('Please enter your email address'),
    });

    const handleSubmit = (values) => {
        var output = document.getElementById("progress");
        output.innerHTML = "<div><img src='/loading.gif' /></div>";
        setTimeout(async () => {
            try {
                const response = await api.post(Constants.API_URL.USERS.RESET_PASSWORD, values);
                if (response?.status === 200) {
                    setNewPassword(response?.data?.password);
                }
            } catch (error) {
                let msg = loginService.handleMissingInfo(error);
                if (typeof msg === "string") {
                    LibToast.toast(msg, "error");
                }
                else {
                    LibToast.toast(t('toastMessage.error.fetch'), "error");
                }
            } finally {
                output.innerHTML = "";
            }
        }, 300);
    };
    return (
        <div className={styles.main_forgot_password}>
            <div className={styles.box_forgot_password}>
                <div className={styles.title}>
                    <img src="/logo.svg" alt="logo" />
                    <a href="https://nwemon.com" className='close-login'>
                        <var className="icon-cancel"></var>
                    </a>
                </div>

                {
                    !newPassword ?
                        <FormInput id="forgotPassword" initialValues={initialValues} onSubmit={handleSubmit} validationSchema={schema}>
                            <div className={styles.body_forgot_password}>
                                <div className={styles.forgot_password}>Forgot Password</div>
                                <div className='position-relative'>
                                    <FormInput.Text
                                        name="username"
                                        placeholder="Email"
                                        required={true}
                                        isCustomIcon={true}
                                    />
                                    <div className="d-flex align-items-center position-absolute top-0 end-0 mt-1">
                                        <svg style={{ padding: 6 }} fill="none" height="24" viewBox="0 0 48 48" width="24" xmlns="http://www.w3.org/2000/svg"><path d="m0 0h48v48h-48z" fill="#494c4e" fillOpacity=".01" /><g stroke="#494c4e" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4"><circle cx="24" cy="12" r="8" /><path d="m42 44c0-9.9411-8.0589-18-18-18s-18 8.0589-18 18" /></g></svg>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-xl-12 text-center">
                                        <div className={styles.btn_login}>
                                            <Button type="submit" variant="dark" formId="forgotPassword">
                                                <Button.Text text="Reset" />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </FormInput>
                        : <div className={styles.body_forgot_password}>
                            <div className={styles.forgot_password}>New Password</div>
                            <FormInput.Text name="new_password" value={newPassword} type="password" isShow={true} onClick={() => {
                                navigator.clipboard.readText().then(text => {
                                    if (newPassword !== text) {
                                        navigator.clipboard.writeText(newPassword)
                                        LibToast.toast("Password copied to clipboard", "info");
                                    }
                                });
                            }} />
                            <div className="row">
                                <div className="col-xl-12 text-center">
                                    <div className={styles.btn_login}>
                                        <Button variant="dark" className="mt-3" onClick={() => navigate("/")}>
                                            <Button.Text text="Back to login" />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                }
            </div>
        </div>
    );
};