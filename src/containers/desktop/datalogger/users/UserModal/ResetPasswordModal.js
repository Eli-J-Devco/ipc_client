/********************************************************
* Copyright 2020-2021 NEXT WAVE ENERGY MONITORING INC.
* All rights reserved.
* 
*********************************************************/
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import useAxiosPrivate from "../../../../../hooks/useAxiosPrivate";
import { loginService } from "../../../../../services/loginService";

import Modal from "../../../../../components/modal/Modal";
import Button from "../../../../../components/button/Button";
import FormInput from "../../../../../components/formInput/FormInput";
import Constants from "../../../../../utils/Constants";
import LibToast from "../../../../../utils/LibToast";

export default function ResetPasswordModal({ isOpenModal, closeModal }) {
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();

    const [newPassword, setNewPassword] = useState("");

    /**
     * Handle reset password of user
     * @author nhan.tran 2024-03-22
     * @param {Object} data
     */
    const handleResetPassword = () => {
        var output = document.getElementById("progress");
        output.innerHTML = "<div><img src='/loading.gif' /></div>";
        setTimeout(async () => {
            try {
                const response = await axiosPrivate.post(Constants.API_URL.USERS.RESET_PASSWORD, { id: isOpenModal?.user?.id });
                if (response?.status === 200) {
                    LibToast.toast(response?.data?.message, 'info');
                    setNewPassword(response?.data?.new_password);
                }
            } catch (error) {
                loginService.handleMissingInfo(error, "Failed to reset password") && navigate("/", { replace: true });
            } finally {
                output.innerHTML = "";
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
                                Are you sure to reset password of user with email: <strong>{isOpenModal?.user?.email}</strong>?
                            </h4>
                            <div className="d-flex justify-content-center">
                                {footer}
                            </div>
                        </div>
                        :
                        <div>
                            <h4 className="text-center">
                                Password of user with email: <strong>{isOpenModal?.user?.email}</strong> has been reset successfully
                            </h4>
                            <div>
                                <FormInput.Text label="New password" name="new_password" isShow={true} value={newPassword} type="password" />
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