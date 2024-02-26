/********************************************************
 * Copyright 2020-2021 NEXT WAVE ENERGY MONITORING INC.
 * All rights reserved.
 *
 *********************************************************/

import { useContext } from "react";
import AuthContext from "../context/AuthProvider";

/**
 * Get Authenticated user context
 * @author nhan.tran 2024-02-26
 * @return useContext
 */
const useAuth = () => {
  return useContext(AuthContext);
};

export default useAuth;
