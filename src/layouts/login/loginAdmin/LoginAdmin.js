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

import { ReactComponent as LockIcon } from "../../../assets/images/lock.svg";
import { ReactComponent as UnlockIcon } from "../../../assets/images/unlock.svg";

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
  const onSubmit = (data) => {
    if (Libs.isObjectEmpty(data)) return;

    var params = {
      username: Libs.AESEncrypt(data.email, Constants.SECRET_KEY),
      password: Libs.AESEncrypt(data.password, Constants.SECRET_KEY),
    };

    var output = document.getElementById("progress");
    output.innerHTML = "<div><img src='/loading.gif' /></div>";
    setTimeout(async () => {
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
      } catch (error) {
        let msg = loginService.handleMissingInfo(error);
        if (typeof msg === "string") {
          LibToast.toast(msg, "error");
        }
        else {
          LibToast.toast(t('toastMessage.error.fetch'), "error");
        }
        setErrMsg(msg);
      }
      finally {
        output.innerHTML = "";
      }
    }, 300);
  };

  useEffect(() => {
    if (errMsg) {
      LibToast.toast(errMsg, "error");
      setErrMsg("");
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
                    <LockIcon style={{ padding: 4 }} />
                  ) : (
                    <UnlockIcon style={{ padding: 4 }} />
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
