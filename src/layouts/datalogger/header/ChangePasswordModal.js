import Modal from "../../../components/modal/Modal.js";
import Button from "../../../components/button/Button.js";
import FormInput from "../../../components/formInput/FormInput.js";
import styles from "./Header.module.scss";
import * as Yup from "yup";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate.js";
import { useTranslation } from "react-i18next";
import Constants from "../../../utils/Constants.js";
import LibToast from "../../../utils/LibToast.js";
import { loginService } from "../../../services/loginService.js";
import { useNavigate } from "react-router-dom";
import Libs from "../../../utils/Libs.js";

export default function ChangePasswordModal({
  openResetPasswordModal,
  setOpenResetPasswordModal,
}) {
  const { t } = useTranslation();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    oldPassword: Yup.string()
      .matches(
        Constants.REGEX_PATTERN.PASSWORD,
        "Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special case character"
      )
      .required("Old password is required"),
    password: Yup.string()
      .matches(
        Constants.REGEX_PATTERN.PASSWORD,
        "Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special case character"
      )
      .required("New password is required"),
    repassword: Yup.string()
      .required("Re-enter new password is required")
      .oneOf([Yup.ref("password"), null], "Passwords must match"),
  });

  const initialChangePassword = {
    oldPassword: "",
    password: "",
    repassword: "",
  };

  const handleChangePassword = (data) => {
    let body = {
      old_password: Libs.AESEncrypt(data.oldPassword, Constants.SECRET_KEY),
      new_password: data.password,
    };
    var output = document.getElementById("progress");
    output.innerHTML = "<div><img src='/loading.gif' /></div>";
    setTimeout(async () => {
      try {
        const response = await axiosPrivate.post(
          Constants.API_URL.USERS.CHANGE_PASSWORD,
          body
        );
        if (response.status === 200) {
          setOpenResetPasswordModal(false);
          LibToast.toast(`Password changed successfully`, "info");
        }
      } catch (error) {
        loginService.handleMissingInfo(error, "Failed to change password") &&
          navigate("/", { replace: true });
      } finally {
        output.innerHTML = "";
      }
    }, 100);
  };

  return (
    <Modal
      isOpen={openResetPasswordModal}
      close={() => setOpenResetPasswordModal(false)}
      title="Reset password"
    >
      <FormInput
        id="changePasswordForm"
        initialValues={initialChangePassword}
        onSubmit={handleChangePassword}
        validationSchema={validationSchema}
      >
        <div className={styles.form_group}>
          <FormInput.Text
            label="Old password"
            name="oldPassword"
            required={true}
            type="password"
          />
        </div>
        <div className={styles.form_group}>
          <FormInput.Text
            label="A new password"
            name="password"
            required={true}
            type="password"
            isRandom={true}
          />
        </div>
        <div className={styles.form_group}>
          <FormInput.Text
            label="Re-enter new password"
            name="repassword"
            required={true}
            type="password"
          />
        </div>
        <div className="row mt-3">
          <div className="col-xl-12 text-center">
            <div className={styles.btn_login}>
              <Button
                type="submit"
                className="btn btn-primary btn-app"
                formId="changePasswordForm"
              >
                <Button.Text text="Submit" title="Submit" />
              </Button>
            </div>
          </div>
        </div>
      </FormInput>
    </Modal>
  );
}
