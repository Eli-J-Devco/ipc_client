import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import styles from "./Header.module.scss";

import useAuth from "../../../hooks/useAuth.js";
import { loginService } from "../../../services/loginService.js";

import LibToast from "../../../utils/LibToast.js";
import { LogoutErrors } from "../../../utils/Errors.js";
import ChangePasswordModal from "./ChangePasswordModal.js";

const Header = () => {
  const { auth } = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [openResetPasswordModal, setOpenResetPasswordModal] = useState(false);
  const [isLogout, setLogout] = useState(false);
  const logout = () => {
    setLogout(true);
  };



  useEffect(() => {
    if (isLogout) {
      /**
       * Log out of the system and remove token from storage
       * @author nhan.tran 2024-02-27
       */
      const checkLogout = async () => {
        var output = document.getElementById("progress");
        try {
          const res = await loginService.logout(output);
          if (res) {
            LibToast.toast(t("toastMessage.info.logout"), "info");
            navigate("/");
          }
        } catch (error) {
          const msg = LogoutErrors(error);
          LibToast.toast(msg, "error");
          setLogout(false);
        }
        finally {
          output.innerHTML = "";
        }
      };
      checkLogout();
    }
  }, [isLogout]);

  return (
    <>
      {
        openResetPasswordModal &&
        <ChangePasswordModal openResetPasswordModal={openResetPasswordModal} setOpenResetPasswordModal={setOpenResetPasswordModal} />
      }
      <div className={styles.header}>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <div className={styles.main_header}>
                <div className={styles.logo}>
                  <img src="/logo.svg" alt="Logo" />
                </div>

                <div className={styles.user_menu}>
                  <ul>
                    <li>
                      <svg
                        className="icon-md"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                      >
                        <title></title>
                        <path
                          d="M427.68 351.43C402 320 383.87 304 383.87 217.35 383.87 138 343.35 109.73 310 96c-4.43-1.82-8.6-6-9.95-10.55C294.2 65.54 277.8 48 256 48s-38.21 17.55-44 37.47c-1.35 4.6-5.52 8.71-9.95 10.53-33.39 13.75-73.87 41.92-73.87 121.35C128.13 304 110 320 84.32 351.43 73.68 364.45 83 384 101.61 384h308.88c18.51 0 27.77-19.61 17.19-32.57zM320 384v16a64 64 0 01-128 0v-16"
                          fill="none"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="32"
                        ></path>
                      </svg>
                      <span className={styles.alarm}>2</span>
                    </li>
                    <li>
                      <svg
                        className="icon-md"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                      >
                        <title></title>
                        <path
                          d="M250.26 155.39l5.74 122 5.73-121.95a5.74 5.74 0 00-5.79-6h0a5.74 5.74 0 00-5.68 5.95z"
                          fill="none"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="32"
                        ></path>
                        <path
                          fill="currentColor"
                          d="M256 380.25a20 20 0 1120-20 20 20 0 01-20 20z"
                        ></path>
                        <path
                          d="M463.1 112.37C373.68 96.33 336.71 84.45 256 48c-80.71 36.45-117.68 48.33-207.1 64.37C32.7 369.13 240.58 457.79 256 464c15.42-6.21 223.3-94.87 207.1-351.63z"
                          fill="none"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="32"
                        ></path>
                      </svg>
                      <span className={styles.private}>1</span>
                    </li>
                    <li>
                      <svg
                        className="icon-md"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                      >
                        <title></title>
                        <path
                          fill="currentColor"
                          d="M258.9 48C141.92 46.42 46.42 141.92 48 258.9c1.56 112.19 92.91 203.54 205.1 205.1 117 1.6 212.48-93.9 210.88-210.88C462.44 140.91 371.09 49.56 258.9 48zm126.42 327.25a4 4 0 01-6.14-.32 124.27 124.27 0 00-32.35-29.59C321.37 329 289.11 320 256 320s-65.37 9-90.83 25.34a124.24 124.24 0 00-32.35 29.58 4 4 0 01-6.14.32A175.32 175.32 0 0180 259c-1.63-97.31 78.22-178.76 175.57-179S432 158.81 432 256a175.32 175.32 0 01-46.68 119.25z"
                        ></path>
                        <path
                          fill="currentColor"
                          d="M256 144c-19.72 0-37.55 7.39-50.22 20.82s-19 32-17.57 51.93C191.11 256 221.52 288 256 288s64.83-32 67.79-71.24c1.48-19.74-4.8-38.14-17.68-51.82C293.39 151.44 275.59 144 256 144z"
                        ></path>
                      </svg>

                      <span className={styles.username}> {auth?.userName} </span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="ionicon"
                        viewBox="0 0 512 512"
                      >
                        <title>Chevron Down</title>
                        <path
                          fill="none"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="30"
                          d="M112 184l144 144 144-144"
                        />
                      </svg>
                      <ul>
                        <li onClick={() => setOpenResetPasswordModal(true)}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 50 50"
                            width="50px"
                            height="50px"
                          >
                            <path d="M 25 2 C 17.832484 2 12 7.8324839 12 15 L 12 21 L 8 21 C 6.3550302 21 5 22.35503 5 24 L 5 47 C 5 48.64497 6.3550302 50 8 50 L 42 50 C 43.64497 50 45 48.64497 45 47 L 45 24 C 45 22.35503 43.64497 21 42 21 L 38 21 L 38 15 C 38 7.8324839 32.167516 2 25 2 z M 25 4 C 31.086484 4 36 8.9135161 36 15 L 36 21 L 14 21 L 14 15 C 14 8.9135161 18.913516 4 25 4 z M 8 23 L 42 23 C 42.56503 23 43 23.43497 43 24 L 43 47 C 43 47.56503 42.56503 48 42 48 L 8 48 C 7.4349698 48 7 47.56503 7 47 L 7 24 C 7 23.43497 7.4349698 23 8 23 z M 13 34 A 2 2 0 0 0 11 36 A 2 2 0 0 0 13 38 A 2 2 0 0 0 15 36 A 2 2 0 0 0 13 34 z M 21 34 A 2 2 0 0 0 19 36 A 2 2 0 0 0 21 38 A 2 2 0 0 0 23 36 A 2 2 0 0 0 21 34 z M 29 34 A 2 2 0 0 0 27 36 A 2 2 0 0 0 29 38 A 2 2 0 0 0 31 36 A 2 2 0 0 0 29 34 z M 37 34 A 2 2 0 0 0 35 36 A 2 2 0 0 0 37 38 A 2 2 0 0 0 39 36 A 2 2 0 0 0 37 34 z" />
                          </svg>
                          <span>Change password</span>
                        </li>
                        <li>
                          <svg
                            aria-hidden="true"
                            width="512px"
                            height="512px"
                            viewBox="0 0 512 512"
                            version="1.1"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g
                              stroke="none"
                              strokeWidth="1"
                              fill="none"
                              fillRule="evenodd"
                            >
                              <g
                                transform="translate(50.378500, 42.000000)"
                                stroke="currentColor"
                                strokeWidth="32"
                              >
                                <path d="M211.9115,150.31 C185.005783,147.652748 159.332619,162.189611 147.769706,186.628874 C136.206793,211.068138 141.24875,240.137201 160.366525,259.254975 C179.484299,278.37275 208.553362,283.414707 232.992626,271.851794 C257.431889,260.288881 271.968752,234.615717 269.3115,207.71 C266.263249,177.360931 242.260569,153.358251 211.9115,150.31 L211.9115,150.31 Z M410.9165,277.125 C411.707607,281.564887 410.903766,286.141508 408.647035,290.04607 L372.853966,351.97469 C370.607176,355.862053 367.040281,358.81433 362.8015,360.295 C358.482479,361.803699 353.868429,362.272089 349.334332,361.662103 L320.522752,357.785994 C299.879684,355.00882 279.988607,366.61094 272.243485,385.946453 L261.688643,412.296365 C259.969284,416.588704 257.239668,420.402837 253.7315,423.415 C250.285888,426.373452 245.894629,428 241.353189,428 L169.796876,428 C165.308275,428 160.960823,426.431216 157.5065,423.565 C153.996701,420.652754 151.25415,416.924675 149.518855,412.70702 L138.358864,385.582532 C130.453683,366.368896 110.519057,354.968685 89.9503733,357.89869 L61.8696222,361.898788 C57.3434346,362.543543 52.7286498,362.09476 48.4115003,360.59 C44.1729946,359.112652 40.6059709,356.162306 38.3598585,352.276117 L2.56596537,290.34607 C0.309233973,286.441508 -0.494606827,281.864887 0.296500273,277.425 C1.10103427,272.909758 2.99390287,268.65863 5.81124857,265.039618 L23.4896432,242.330895 C36.4067894,225.738218 36.3997393,202.490855 23.4725314,185.906016 L5.73914207,163.155131 C2.93726987,159.560495 1.06449867,155.330725 0.286500273,150.84 C-0.479118527,146.420732 0.330889273,141.87293 2.57525137,137.989769 L38.3890342,76.0253095 C40.6358245,72.1379474 44.2027191,69.1856702 48.4415003,67.705 C52.7614677,66.1959703 57.3747149,65.7192136 61.9119868,66.3128907 L91.2373143,70.1499486 C111.792442,72.839474 131.546967,61.2195013 139.18365,41.9470371 L149.578712,15.7133384 C151.281675,11.4156234 154.004147,7.5964633 157.5115,4.585 C160.957112,1.6265481 165.348371,0 169.889811,0 L241.446124,0 C245.934725,0 250.282177,1.5687841 253.7365,4.435 C257.245602,7.3466683 259.982278,11.0789954 261.704008,15.3012287 L272.612929,42.053395 C280.490247,61.3711009 300.470109,72.8820729 321.133157,70.007291 L349.370217,66.0787615 C353.899388,65.4486329 358.513486,65.904939 362.8315,67.41 C367.070006,68.8873483 370.637029,71.837694 372.883142,75.7238833 L408.677035,137.65393 C410.933766,141.558492 411.737607,146.135113 410.9465,150.575 C410.140427,155.098876 408.314604,159.379748 405.607548,163.092841 L385.561411,190.588825 C373.755974,206.781577 374.583692,228.954539 387.563545,244.222054 L405.168289,264.929585 C408.130553,268.41394 410.114244,272.622543 410.9165,277.125 Z"></path>
                              </g>
                            </g>
                          </svg>
                          <span>Configure</span>
                        </li>
                      </ul>
                    </li>
                    <li onClick={() => logout()}>
                      <svg
                        className="icon-md"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                      >
                        <title></title>
                        <path
                          d="M304 336v40a40 40 0 01-40 40H104a40 40 0 01-40-40V136a40 40 0 0140-40h152c22.09 0 48 17.91 48 40v40M368 336l80-80-80-80M176 256h256"
                          fill="none"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="32"
                        ></path>
                      </svg>
                      <span className={styles.logout}>Log out</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
