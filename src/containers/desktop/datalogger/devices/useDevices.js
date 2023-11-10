/********************************************************
* Copyright 2020-2021 NEXT WAVE ENERGY MONITORING INC.
* All rights reserved.
* 
*********************************************************/
import { useState } from "react";

export default function useDevices() {
  const [isAddDevice, setIsAddDevice] = useState(false);


  const openAddDevice = () => setIsAddDevice(true);
  const closeAddDevice = () => setIsAddDevice(false);


  return {
    isAddDevice,
    openAddDevice,
    closeAddDevice
  }
}
