import { useState } from "react";
import ResetPasswordModal from "./UserModal/ResetPasswordModal";
import AddEditModal from "./UserModal/AddEditModal";
import ConfirmDeleteModal from "./UserModal/ConfirmDeleteModal";

export default function useUserModal(props) {
    const [isOpenModal, setIsOpenModal] = useState(null);

    const openModal = (action, user) => {
        setIsOpenModal({ action: action, user: user });
    }

    const closeModal = () => {
        setIsOpenModal(null);
    }

    const actionOption = {
        Add: {
            action: "Add",
            modal: (props) => {
                return (
                    <AddEditModal isOpenModal={props.isOpenModal} closeModal={props.closeModal} setNeedRefresh={props.setNeedRefresh} />
                )
            }
        },
        Edit: {
            action: "Edit",
            modal: (props) => {
                return (
                    <AddEditModal isOpenModal={props.isOpenModal} closeModal={props.closeModal} setNeedRefresh={props.setNeedRefresh} />
                )
            }
        },
        ConfirmDelete: {
            action: "ConfirmDelete",
            modal: (props) => {
                return (
                    <ConfirmDeleteModal isOpenModal={props.isOpenModal} closeModal={props.closeModal} setNeedRefresh={props.setNeedRefresh} />
                )
            }
        },
        ResetPassword: {
            action: "ResetPassword",
            modal: (props) => {
                return (
                    <ResetPasswordModal isOpenModal={props.isOpenModal} closeModal={props.closeModal} setNeedRefresh={props.setNeedRefresh} />
                )
            }
        },
    };

    return {
        actionOption,
        isOpenModal,
        openModal,
        closeModal
    };
}