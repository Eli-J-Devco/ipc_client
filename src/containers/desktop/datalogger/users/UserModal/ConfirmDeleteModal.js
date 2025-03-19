/********************************************************
* Copyright 2020-2021 NEXT WAVE ENERGY MONITORING INC.
* All rights reserved.
* 
*********************************************************/
import useAxiosPrivate from "../../../../../hooks/useAxiosPrivate";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { loginService } from "../../../../../services/loginService";

import Button from "../../../../../components/button/Button";
import FormInput from "../../../../../components/formInput/FormInput";
import Modal from "../../../../../components/modal/Modal";

import Constants from "../../../../../utils/Constants";
import LibToast from "../../../../../utils/LibToast";

import api from "../../../../../api/axios";
import { clearToken } from "../../../../../utils/Token";

export default function ConfirmDeleteModal({ isOpenModal, closeModal, setNeedRefresh }) {
    const { t } = useTranslation();
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();

    const footer = <div>
        <Button variant="dark" type="submit" formId="userModal">
            <Button.Text text="Confirm delete" />
        </Button>
        <Button variant="grey" className="ms-3" onClick={() => closeModal()}>
            <Button.Text text="Cancel" />
        </Button>
    </div>

    /**
     * Handle delete user
     * @author nhan.tran 2024-03-22
     * @param {Object} data
     */
    const handleDelete = () => {
        const output = document.getElementById("progress");
        output.innerHTML = "<div><img src='/loading.gif' /></div>";
        setTimeout(async () => {
            try {
                const response = await axiosPrivate.post(Constants.API_URL.USERS.DELETE, {
                    id: isOpenModal?.user?.id
                });
                if (response?.status === 200) {
                    LibToast.toast(`User with id: ${isOpenModal?.user?.id} ${t('toastMessage.info.delete')}`, 'info');
                    const currentUser = localStorage.getItem("email").replace(/["]+/g, '');
                    const deletedUser = isOpenModal.user.email
                    if (currentUser === deletedUser) {
                        const res = await api.post(Constants.API_URL.AUTH.LOGOUT);
                        if (res.status === 200) {
                            clearToken();
                            navigate("/")
                        }
                    }
                    setNeedRefresh(true);
                }
                
            } catch (error) {
                loginService.handleMissingInfo(error, "Failed to delete user") && navigate("/", { replace: true });
            }
            finally {
                output.innerHTML = "";
                closeModal();
            }
        }, 300);
    }
    return (
        <FormInput id="userModal" onSubmit={handleDelete}>
            <Modal
                isOpen={true}
                close={closeModal}
                title={"Confirm delete user"}
                centered
                footer={footer}
            >
                <div className='d-flex justify-content-center'>
                    <p className="text-center">
                        Are you sure to delete user with email: <strong>{isOpenModal?.user?.email}</strong>?
                    </p>
                </div>
            </Modal>
        </FormInput>
    )
}