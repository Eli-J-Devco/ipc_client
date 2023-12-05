/********************************************************
* Copyright 2020-2021 NEXT WAVE ENERGY MONITORING INC.
* All rights reserved.
* 
*********************************************************/
import { useState } from "react";


export default function usePermissionsAndRoles() {
  const [isAddRoles, setIsAddRoles] = useState(false);

  const openAddRoles = () => setIsAddRoles(true);
  const closeAddRoles = () => setIsAddRoles(false);


  return {
    isAddRoles,
    openAddRoles,
    closeAddRoles
  }
}
