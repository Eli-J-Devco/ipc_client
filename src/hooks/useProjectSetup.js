/********************************************************
 * Copyright 2020-2021 NEXT WAVE ENERGY MONITORING INC.
 * All rights reserved.
 *
 *********************************************************/

import { useContext } from "react";
import { DataloggerContext } from "../context/DataloggerProvider";

/**
 * Get project setup context
 * @author nhan.tran 2024-02-26
 * @return useContext
 */
const useProjectSetup = () => {
    return useContext(DataloggerContext);
};

export default useProjectSetup;