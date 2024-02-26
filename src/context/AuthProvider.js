/********************************************************
 * Copyright 2020-2021 NEXT WAVE ENERGY MONITORING INC.
 * All rights reserved.
 *
 *********************************************************/

import { createContext, useState } from "react";

const AuthContext = createContext({});

/**
 * Authenticated user context
 * @author nhan.tran 2024-02-26
 * @param { { children }}
 * @return Object
 */
export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
