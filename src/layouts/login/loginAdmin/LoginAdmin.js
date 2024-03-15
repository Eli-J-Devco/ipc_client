/********************************************************
 * Copyright 2020-2021 NEXT WAVE ENERGY MONITORING INC.
 * All rights reserved.
 *
 *********************************************************/
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import styles from "./LoginAdmin.module.scss";

import Libs from "../../../utils/Libs";
import Constants from "../../../utils/Constants";
import LibToast from "../../../utils/LibToast";
import { LoginErrors } from "../../../utils/Errors";
import { clearToken, getToken, setToken } from "../../../utils/Token";

import useAuth from "../../../hooks/useAuth";
import { loginService } from "../../../services/loginService";

/**
 * Login Admin
 * @author nhan.tran 2024-02-26
 * @return JSX
 */
const LoginAdmin = () => {
  const { t } = useTranslation();
  const [errMsg, setErrMsg] = useState("");

  const { auth, setAuth } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/datalogger/quickstart";

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    mode: "onChange",
  });

  const [showPassword, setShowPassword] = useState(false);

  /**
   * Submit login form
   * @author nhan.tran 2024-02-26
   * @param {data} hash email and password
   */
  const onSubmit = async (data) => {
    if (Libs.isObjectEmpty(data)) return;

    var params = {
      username: Libs.AESEncrypt(data.email, Constants.SECRET_KEY),
      password: Libs.AESEncrypt(data.password, Constants.SECRET_KEY),
    };

    var output = document.getElementById("progress");
    try {
      const response = await loginService.login(params, output);

      var { userName, permissions, project_id } = response;
      setToken("userName", userName);
      setToken("permissions", permissions);
      setToken("project_id", project_id);

      setAuth({ ...response, isAuthenticated: true, hasJustLoggedIn: true });
      localStorage.setItem("persist", true);

      LibToast.toast(t("toastMessage.info.loginSuccess") + " " + userName, "info");
      navigate(from, { replace: true });
    } catch (err) {
      const msg = LoginErrors(err);
      setErrMsg(msg);
    }
    finally {
      output.innerHTML = "";
    }
  };

  useEffect(() => {
    if (errMsg) {
      LibToast.toast(errMsg, "error");
    }
  }, [errMsg]);

  /**
   * Check if user is already logged in and redirect to the last page
   * @author nhan.tran 2024-03-07
   * @param {auth} object
   * @param {persist} string
   * @param {project_id} integer
   */
  useEffect(() => {
    const persist = localStorage.getItem("persist");
    const project_id = getToken("project_id");
    if (auth?.isAuthenticated && persist && project_id) {
      navigate(from, { replace: true });
    }
    else {
      clearToken();
    }
  }, []);

  return (
    <div className={styles.main_login}>
      {process.env.SALT}
      <div className={styles.box_login}>
        <div className={styles.title}>
          <a href="https://nwemon.com" className="close-login">
            <img src="/logo.svg" alt="logo" />
          </a>
        </div>

        <div className={styles.body_login}>
          <div className={styles.login_title}>Login</div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.form_group}>
              <input
                placeholder="Email"
                className={
                  errors.email ? "form-control input-error" : "form-control"
                }
                id="email"
                name="email"
                {...register("email", {
                  required: "Email Address is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                    message: "Invalid email address",
                  },
                })}
              />

              {errors.email && (
                <span className={styles.validate}>{errors.email.message}</span>
              )}
              <svg style={{ padding: 4 }} fill="none" height="48" viewBox="0 0 48 48" width="48" xmlns="http://www.w3.org/2000/svg"><path d="m0 0h48v48h-48z" fill="#494c4e" fillOpacity=".01" /><g stroke="#494c4e" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4"><circle cx="24" cy="12" r="8" /><path d="m42 44c0-9.9411-8.0589-18-18-18s-18 8.0589-18 18" /></g></svg>
            </div>

            <div className={styles.form_group}>
              <input
                placeholder="Password"
                className={
                  errors.password ? "form-control input-error" : "form-control"
                }
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                {...register("password", {
                  required: "You must specify a password",
                  pattern: {
                    value:
                      /^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[~`!@#$%^&*()--+={}[\]|\\:;"'<>,.?/_₹])[a-zA-Z0-9~`!@#$%^&*()--+={}[\]|\\:;"'<>,.?/_₹]{7,}$/,
                    message:
                      "Password should include at least one uppercase, one numeric value and one special character",
                  },
                  minLength: {
                    value: 8,
                    message: "Password must have at least 8 characters",
                  },
                })}
              />
              {errors.password && (
                <span className={styles.validate}>
                  {errors.password.message}
                </span>
              )}
              <div
                style={{ cursor: "pointer", position: "absolute", right: 0, top: 0 }}
                onClick={() => {
                  setTimeout(() => {
                    setShowPassword(!showPassword);
                  }, 100);
                }}
              >
                {
                  !showPassword ? (
                    <svg style={{ padding: 4 }} height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><g fill="#494c4e"><path d="m14 15c0 .74-.4 1.38-1 1.73v2.27c0 .55-.45 1-1 1s-1-.45-1-1v-2.27c-.6-.35-1-.99-1-1.73 0-1.1.9-2 2-2s2 .9 2 2z" /><path d="m19 9h-1v-4c0-2.76-2.24-5-5-5h-2c-2.76 0-5 2.24-5 5v4h-1c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-11c0-1.1-.9-2-2-2zm-11-4c0-1.65 1.35-3 3-3h2c1.65 0 3 1.35 3 3v4h-8zm11 16.5c0 .28-.22.5-.5.5h-13c-.28 0-.5-.22-.5-.5v-10c0-.28.22-.5.5-.5h13c.28 0 .5.22.5.5z" /></g></svg>
                  ) : (
                    <svg style={{ padding: 4 }} height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><g fill="#494c4e"><path d="m19 1h-1c-2.76 0-5 2.24-5 5v3h-11c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-11c0-1.1-.9-2-2-2h-1v-3c0-1.65 1.35-3 3-3h1c1.65 0 3 1.35 3 3v6c0 .55.45 1 1 1s1-.45 1-1v-6c0-2.76-2.24-5-5-5zm-3.5 10c.28 0 .5.22.5.5v10c0 .27-.22.5-.5.5h-13c-.28 0-.5-.22-.5-.5v-10c0-.27.22-.5.5-.5z" /><path d="m11 15c0 .74-.4 1.38-1 1.73v2.27c0 .55-.45 1-1 1s-1-.45-1-1v-2.27c-.6-.35-1-.99-1-1.73 0-1.1.9-2 2-2s2 .9 2 2z" /></g></svg>
                  )
                }
              </div>
            </div>

            <div className="row">
              <div className="col-xl-12 text-center">
                <div className={styles.btn_login}>
                  <button
                    className="btn btn-primary btn-app"
                    text="Login"
                    title="Login"
                  >
                    Login
                  </button>
                </div>
              </div>
            </div>

            <div className={styles.email_password}>
              <div className="form-group text-center">
                <a href="/forgot-password">Forgot email or password?</a>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
    // <LoginAdminJSX onclick={handleSubmit(onSubmit)} />
  );
};

export default LoginAdmin;
