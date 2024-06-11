/********************************************************
 * Copyright 2020-2021 NEXT WAVE ENERGY MONITORING INC.
 * All rights reserved.
 *
 *********************************************************/
import React from "react";

import useUserModal from "../useUserModal";

export default function UserModal(props) {
  const { isOpenModal, closeModal, setNeedRefresh } = props;
  const { actionOption } = useUserModal();
  const initialValues = {
    id: isOpenModal?.user?.id,
    first_name: isOpenModal?.user?.first_name
      ? isOpenModal?.user?.first_name
      : "",
    last_name: isOpenModal?.user?.last_name ? isOpenModal?.user?.last_name : "",
    phone: isOpenModal?.user?.phone ? isOpenModal?.user?.phone : "",
    roles_id: isOpenModal?.user?.roles_id || [],
    status: isOpenModal?.user?.status
      ? isOpenModal?.user?.status
      : isOpenModal?.action === actionOption.Add.action && {
          value: 1,
          label: "Active",
        },
    email: isOpenModal?.user?.email ? isOpenModal?.user?.email : "",
    ...(isOpenModal?.action === actionOption.Add.action && {
      password: "",
      confirmPassword: "",
    }),
  };

  const Modal = (props) => actionOption[isOpenModal?.action].modal(props);
  return (
    <Modal
      isOpenModal={{ ...isOpenModal, user: initialValues }}
      closeModal={closeModal}
      setNeedRefresh={setNeedRefresh}
    />
  );
}
