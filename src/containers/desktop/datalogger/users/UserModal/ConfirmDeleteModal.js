import { useNavigate } from "react-router-dom";
import Button from "../../../../../components/button/Button";
import FormInput from "../../../../../components/formInput/FormInput";
import Modal from "../../../../../components/modal/Modal";
import useAxiosPrivate from "../../../../../hooks/useAxiosPrivate";
import { useTranslation } from "react-i18next";
import Constants from "../../../../../utils/Constants";
import LibToast from "../../../../../utils/LibToast";
import { loginService } from "../../../../../services/loginService";

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
                    setNeedRefresh(true);
                }
            } catch (error) {
                let msg = loginService.handleMissingInfo(error);
                if (typeof msg === 'string') {
                    LibToast.toast(msg, 'error');
                }
                else if (!msg) {
                    LibToast.toast(t('toastMessage.error.delete'), 'error');
                }
                else {
                    navigate("/");
                }
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
                size="lg"
            >
                <div className='d-flex justify-content-center mb-3'>
                    <h4>
                        Are you sure to delete user with id: {isOpenModal?.user?.id}?
                    </h4>
                </div>
                <div className='d-flex justify-content-center'>
                    {footer}
                </div>
            </Modal>
        </FormInput>
    )
}