/********************************************************
* Copyright 2020-2021 NEXT WAVE ENERGY MONITORING INC.
* All rights reserved.
* 
*********************************************************/
import { useState } from "react";


export default function usePermissionsAndRoles() {
  const [isOpenRolesModal, setIsOpenRolesModal] = useState({});

  const openAddRoles = () => setIsOpenRolesModal({ add: true, isCancel: true });
  const closeAddRoles = (isCancel) => setIsOpenRolesModal({ add: false, isCancel: typeof isCancel === "boolean" ? isCancel : true });

  const openEditRoles = () => setIsOpenRolesModal({ edit: true, isCancel: true });
  const closeEditRoles = (isCancel) => setIsOpenRolesModal({ edit: false, isCancel: isCancel });

  const openConfirmDeleteRoles = () => setIsOpenRolesModal({ delete: true, isCancel: true });
  const closeConfirmDeleteRoles = (isCancel) => setIsOpenRolesModal({ delete: false, isCancel: isCancel });

  return {
    isOpenRolesModal,
    openAddRoles,
    closeAddRoles,
    openEditRoles,
    closeEditRoles,
    openConfirmDeleteRoles,
    closeConfirmDeleteRoles
  }
}
