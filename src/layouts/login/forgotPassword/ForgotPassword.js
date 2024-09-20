/********************************************************
 * Copyright 2020-2021 NEXT WAVE ENERGY MONITORING INC.
 * All rights reserved.
 *
 *********************************************************/
import React, { useState } from "react";
import styles from "./ForgotPassword.module.scss";
import FormInput from "../../../components/formInput/FormInput";
import Button from "../../../components/button/Button";
import * as Yup from "yup";
import api from "../../../api/axios";
import { useLocation, useNavigate } from "react-router-dom";
import Constants from "../../../utils/Constants";
import { loginService } from "../../../services/loginService";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const location = useLocation();
  const [newPassword, setNewPassword] = useState("");
  const [initialValues, setInitialValues] = useState({
    username: "",
  });

  const schema = Yup.object().shape({
    username: Yup.string()
      .matches(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/, "Invalid email")
      .required("Please enter your email address"),
  });

  const handleSubmit = (values) => {
    var output = document.getElementById("progress");
    output.innerHTML = "<div><img src='/loading.gif' /></div>";
    setTimeout(async () => {
      try {
        const response = await api.post(
          Constants.API_URL.AUTH.FORGOT_PASSWORD,
          values
        );
        if (response?.status === 200) {
          setNewPassword(response?.data?.new_password);
          setInitialValues({ username: values.username });
        }
      } catch (error) {
        loginService.handleMissingInfo(error, "Failed to reset password");
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
          <a href="https://nwemon.com" className="close-login">
            <var className="icon-cancel"></var>
          </a>
        </div>

        {!newPassword ? (
          <FormInput
            id="forgotPassword"
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={schema}
          >
            <div className={styles.body_forgot_password}>
              <div className={styles.forgot_password}>Forgot Password</div>
              <div className="position-relative">
                <FormInput.Text
                  name="username"
                  placeholder="Email"
                  required={true}
                  isCustomIcon={true}
                  className={styles.form_group}
                  invalidClassName={styles.invalid_form_group}
                />
                <div className="d-flex align-items-center position-absolute top-0 end-0 mt-1 me-1">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 40 41"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                  >
                    <ellipse
                      cx="20.246"
                      cy="20.4468"
                      rx="19.1589"
                      ry="19.1743"
                      fill="white"
                      stroke="#383434"
                    />
                    <rect
                      x="11.3054"
                      y="11.499"
                      width="17.8816"
                      height="17.896"
                      fill="url(#pattern0)"
                    />
                    <defs>
                      <pattern
                        id="pattern0"
                        patternContentUnits="objectBoundingBox"
                        width="1"
                        height="1"
                      >
                        <use
                          xlinkHref="#image0_1334_6"
                          transform="matrix(0.0312752 0 0 0.03125 -0.000402715 0)"
                        />
                      </pattern>
                      <image
                        id="image0_1334_6"
                        width="32"
                        height="32"
                        xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAA7AAAAOwBeShxvQAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAGQSURBVFiFxdc/axRBHMbxzx1qKkGFaAJi7R+QVEljGusUsUlImUoQxNJ3IHbX6BuwEwMJ6QOiBGNhY4hJlxAQvCTXCSFwnBa7C5dw2b3dmU0eeJqdnd/32dmZnVnKawrvsY2/qX/hHSYr1BtaN/EJ/3Lcw0fciA0fx04BvN87GIsFv4qNEvDM39K+wXpZAZ75RSi8gb2AALuhASYC4Jkf5wGaBQEeVM8+XI2iADGW062QAEcRArRDAvyMEGAztMCW6hMwGA4LAQHmYgRoYLUCfCXtG0XX8aUE/HPaJ6qu4S2Oc8DHeKPEHlBliO5iHk9xL722jzXJVvy7Qs3LU9kRaOI27mD0TNuh5KPTlryOaGpgBh/QUTwBO+m9MyKsgml8HwJ6njfwpCr8FboB8MxdvC4Lb0UAn3VrWPhiDfDMz4vgD3FSY4AT3M8LsFwjPPPSefBHkh+LugP00pHG6QPJMxF3rxw1MDuoYV39T5/566AABxcY4E//cMAVyQwtOiPGUg8j6Db7LmxdEBx+pEz/AdwVhz7VGtXJAAAAAElFTkSuQmCC"
                      />
                    </defs>
                  </svg>
                </div>
              </div>
              <div className="row">
                <div className="col-xl-12 text-center">
                  <div className={styles.btn_login}>
                    <Button
                      type="submit"
                      variant="dark"
                      formId="forgotPassword"
                    >
                      <Button.Text text="Reset" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </FormInput>
        ) : (
          <div className={styles.body_forgot_password}>
            <div className={styles.forgot_password}>New Password</div>
            <div className="position-relative">
              <FormInput.Text
                name="new_password"
                value={newPassword}
                type="password"
                isShow={true}
                className={styles.form_group}
                invalidClassName={styles.invalid_form_group}
              />
            </div>
            <div className="row">
              <div className="col-xl-12 text-center">
                <div className={styles.btn_login}>
                  <Button
                    variant="dark"
                    className="mt-3"
                    onClick={() =>
                      navigate("/", {
                        replace: true,
                        state: {
                          email: initialValues.username,
                          new_password: newPassword,
                          from: location.pathname,
                        },
                      })
                    }
                  >
                    <Button.Text text="Back to login" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
