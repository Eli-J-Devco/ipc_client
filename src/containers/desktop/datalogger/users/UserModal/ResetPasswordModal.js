import { useTranslation } from "react-i18next";
import FormInput from "../../../../../components/formInput/FormInput";
import useAxiosPrivate from "../../../../../hooks/useAxiosPrivate";
import Constants from "../../../../../utils/Constants";
import LibToast from "../../../../../utils/LibToast";
import { loginService } from "../../../../../services/loginService";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Modal from "../../../../../components/modal/Modal";
import Button from "../../../../../components/button/Button";

export default function ResetPasswordModal({ isOpenModal, closeModal }) {
    const { t } = useTranslation();
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();

    const [newPassword, setNewPassword] = useState("");

    const handleResetPassword = () => {
        setTimeout(async () => {
            try {
                const response = await axiosPrivate.post(Constants.API_URL.USERS.RESET_PASSWORD, { username: isOpenModal?.user?.email });
                if (response?.status === 200) {
                    LibToast.toast(`Password of user with id: ${isOpenModal?.user?.id} has been reset successfully`, 'info');
                    setNewPassword(response?.data?.password);
                }
            } catch (error) {
                let msg = loginService.handleMissingInfo(error);
                if (typeof msg === "string") {
                    LibToast.toast(msg, "error");
                }
                else {
                    if (msg)
                        LibToast.toast(t('toastMessage.error.fetch'), "error");
                    else
                        navigate("/")
                }
            }
        }, 300);
    }

    const footer = <div>
        <Button variant="dark" type="submit" formId="userModal">
            <Button.Text text="Reset" />
        </Button>
        <Button variant="grey" className="ms-3" onClick={() => closeModal()}>
            <Button.Text text="Cancel" />
        </Button>
    </div>
    return (
        <FormInput id="userModal" onSubmit={handleResetPassword}>
            <Modal
                isOpen={true}
                close={closeModal}
                title={"Reset password"}
                size="lg"
            >
                {

                    !newPassword ?
                        <div>
                            <h4 className="text-center m-5">
                                Are you sure to reset password of user with id: <strong>{isOpenModal?.user?.id}</strong>?
                            </h4>
                            <div className="d-flex justify-content-center">
                                {footer}
                            </div>
                        </div>
                        :
                        <div>
                            <h4 className="text-center">
                                Password of user with id: <strong>{isOpenModal?.user?.id}</strong> has been reset successfully
                            </h4>
                            <div>
                                <FormInput.Text label="New password" name="new_password" value={newPassword} type="password" onClick={() => {
                                    navigator.clipboard.writeText(newPassword);
                                    LibToast.toast("Password copied to clipboard", "info");
                                }} />
                            </div>
                            <Button variant="dark" className="mt-3" onClick={() => closeModal()}>
                                <Button.Text text="Close" />
                            </Button>
                        </div>
                }
            </Modal>
        </FormInput>
    )

}