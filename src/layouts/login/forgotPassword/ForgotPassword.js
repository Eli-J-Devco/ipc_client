
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
                                        className={styles.form_group}
                                        invalidClassName={styles.invalid_form_group}
                                    />
                                    <div className="d-flex align-items-center position-absolute top-0 end-0 mt-1 me-1">
                                        <svg width="24" height="24" viewBox="0 0 40 41" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                                            <ellipse cx="20.246" cy="20.4468" rx="19.1589" ry="19.1743" fill="white" stroke="#383434" />
                                            <rect x="11.3054" y="11.499" width="17.8816" height="17.896" fill="url(#pattern0)" />
                                            <defs>
                                                <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
                                                    <use xlinkHref="#image0_1334_6" transform="matrix(0.0312752 0 0 0.03125 -0.000402715 0)" />
                                                </pattern>
                                                <image id="image0_1334_6" width="32" height="32" xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAA7AAAAOwBeShxvQAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAGQSURBVFiFxdc/axRBHMbxzx1qKkGFaAJi7R+QVEljGusUsUlImUoQxNJ3IHbX6BuwEwMJ6QOiBGNhY4hJlxAQvCTXCSFwnBa7C5dw2b3dmU0eeJqdnd/32dmZnVnKawrvsY2/qX/hHSYr1BtaN/EJ/3Lcw0fciA0fx04BvN87GIsFv4qNEvDM39K+wXpZAZ75RSi8gb2AALuhASYC4Jkf5wGaBQEeVM8+XI2iADGW062QAEcRArRDAvyMEGAztMCW6hMwGA4LAQHmYgRoYLUCfCXtG0XX8aUE/HPaJ6qu4S2Oc8DHeKPEHlBliO5iHk9xL722jzXJVvy7Qs3LU9kRaOI27mD0TNuh5KPTlryOaGpgBh/QUTwBO+m9MyKsgml8HwJ6njfwpCr8FboB8MxdvC4Lb0UAn3VrWPhiDfDMz4vgD3FSY4AT3M8LsFwjPPPSefBHkh+LugP00pHG6QPJMxF3rxw1MDuoYV39T5/566AABxcY4E//cMAVyQwtOiPGUg8j6Db7LmxdEBx+pEz/AdwVhz7VGtXJAAAAAElFTkSuQmCC" />
                                            </defs>
                                        </svg>
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
                            <div className='position-relative'>

                                <FormInput.Text
                                    name="new_password"
                                    value={newPassword}
                                    type="password"
                                    isShow={true}
                                    isCustomIcon={true}
                                    className={styles.form_group}
                                    invalidClassName={styles.invalid_form_group}
                                />
                                <div className="d-flex align-items-center position-absolute top-0 end-0 mt-1 me-1">
                                    <svg width="24" height="24" viewBox="0 0 40 41" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                                        <ellipse cx="20.246" cy="20.4829" rx="19.1589" ry="19.1743" fill="white" stroke="#383434" />
                                        <rect x="11.3054" y="11.5347" width="17.8816" height="17.896" fill="url(#login)" />
                                        <defs>
                                            <pattern id="login" patternContentUnits="objectBoundingBox" width="1" height="1">
                                                <use xlinkHref="#image0_1321_5" transform="matrix(0.00781879 0 0 0.0078125 -0.000402715 0)" />
                                            </pattern>
                                            <image id="image0_1321_5" width="128" height="128" xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAADsQAAA7EB9YPtSQAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAa1SURBVHic7Z3di5VFHMc/x9VdwddVEXNdUKyU8iLSi278AzQzL8KiQoqSohdSeyEI0l4upMiomzKxyLyICCrRsigMu4so0CIDXwJfMt/3xWhz99jFnIy2s7szz/zmzJxnfh/4Xbg8/s53Zr7nOTPzzDNTofxMBxYDC4D5wLVAOzAZGF+7phe4AJwHfgEOAD8Be4HTDdarCLAI2ATsB6rA5YJRBfYBrwALG1oCxZkJwDrMN7dog48UPwJr+ffOoSRAO7ABOEu4hh8cZ4BnMT8jSiQqwCrgdxrX8IPjLPAYMCpwWZVBzAW+IV7DD469wJygJVausAI4R/xGHxxdwMqA5c6eCvAy8Rt6uKgCG2taFUFGA1uJ38C28R4wJkhNZMgYYAfxG9U1PqEJTJD6raoCbAPuFsz5J3AQOAlcrP1tHDADuAZoE/ysbcA9GEMoBZD4ze8DPgIeAOYx/JBtFGa6+EHg49r/9f38jZ51kC234VfxRzEzg1M8NEyt5TjuoaOKGbkoDszFPJwpUuFdwBqgVVBPG/A40F1Q0zlgtqCeUlOh+CTP58DMgNo6gC8LattD+n2uJLiXYrfZ9TRmSnYU8HwBjZeR7cyWknbgFG6V2g/cF0Hr6tpnu2g9CUyKoLVp2ID7N//+GEJrrB5C13DxTBSlTcAE3B/pro+i9L+8iJvm0+h6grqsw73Dl8Jj2BbgK9y0r4miNHFcVvJ0Eba378osoAd7/fviyEyXRTT/N+hJ3MpwQxyZabIJ+4o7iux8vRRjgRPYl+OlODLTZD/2Fbc2kkYbnsC+HD9E0pgc07Ffut0HTIsj04qp2D9AqpJAWVLoRS/Gfor0U8yK3FQ5C3xheW0FU/aopGCABQ7X7g6mQg4XjdcHU2FJCgaY53Dt16FECLLH4dr5wVQ0Ed9h95v5B2kYdiRaMKuObMr0bSSNV0ihQm07QgcxHafUGcBotUE7gZhnADacCqpCFts3im3LHowUDGD7YKQ3qApZui2vUwNgv3Trr6AqZOmzvC76jGYKBlAiogbIHDVA5qgBMkcNkDlqgMxRA2SOGiBz1ACZowbIHDVA5qgBMkcNkDlqgMxRA2RO6B0rOoFbgZsxW6R0YnbkUobmIubtpyPALsx2c8eiKipAB7AZuITb+3Ia/48BzHZzKb0MOyzLKb6ZksbQ0QUsc2iHKDyKcWzsyiprDAAPW7dGg1mC+545GsVMcItlm4yIVCewA/iZBFa5ZkI35q2i33wTtfhrAeBV4CahXMrItGGW0+/0TSRxB+jEDFmkzKTY0Y8ZWh/3SSIxEbQCbfwYjMbMsXghYYAlAjmUYiz1TSBhgKsFcijF8K57iT5AD7rxYSx68Rx5SRjgskAOpThebahPAzNHDZA5aoDMUQNkjhogc9QAmaMGyBw1QOaMji0gAl3AZ5gDKv5ZbDkLs2XtEmBiJF1NS+wVMrZxBLiL4Xcla8Uc7fZrAnptIzqxK8Am3sBtS7axwFsJ6FYDCMRTHmV7OgH9agCP2CpQvjcTKIcaoEAcQWYnzlbgUALlUQM4huQ5vasSKE8QA5R1PUAX5iwiqf2F2zC7lac4RNT1AHXYjezm0n2Yk0pLR1kNEOJkzlKe9llWA3i/MVOHEwFyRqesBugPkHMgQM7olNUA05skZ3TKaoAbmyRndMo6DDwPzEBuJNCK6VdMEconiQ4D69AO3C6Y707SbPwkiD0TNlQcQmZDqnHA4QTKE2QmUILYFTBcbBEo39sJlEMN4BHPeZTthQT0qwEE4h3cXqKcCLybgG41gGBsdyjT9gT0NsQAZR0F1MP2hFLXa5uanAyg1EENkDlqgMxRA2SOGiBz1ACZowbIHDVA5qgBMkcNkDk5GUCnguuQkwHmOFw7N5iKEhL7aZhtVDGnbIzEdQlo1aeBAagArzP82QYttWsUB2J/A1zjA2BSnXJMBj5MQF9D7wBlXRY+EmeA94Hva/9eCNwBTI2mqDhebZirAcqEvhegFEcNkDlqgMxRA2SOGiBz1ACZowbIHDVA5kgYoEcgh1KMbt8EEgYIsSOXYofXyeEgY4BDAjmUYhz2TSBhgF0COZRi7PRNIPEwaBZmZ+4cj5+JST8wG8+fAYk7wDHMBgxKY9mCQB9A4g4AMBM4gOdR5oo1XZjlbSd9E0nNA5wAVlLS7VQTo4o5C8G78UPwCMYEsZdJlTX6gYesWyMSyzC3qNiVVba4ACx1aIeoTANeAy4Rv+KaPS4Bm4GrnFrAEqlO4FB0AMsxd4U5QCcwPvBnNju9wFHMJM9OYAcBzyr4G1amrqN2V0oFAAAAAElFTkSuQmCC" />
                                        </defs>
                                    </svg>
                                </div>
                            </div>
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