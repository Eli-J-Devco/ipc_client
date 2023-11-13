/********************************************************
* Copyright 2020-2021 NEXT WAVE ENERGY MONITORING INC.
* All rights reserved.
* 
*********************************************************/
import { useState } from "react";
import { useNavigate } from "react-router-dom";


export default function useDevices() {
  const [isAddDevice, setIsAddDevice] = useState(false);
  const navigate = useNavigate();
  const handleConfigDevice = item => {
    navigate(`/datalogger/devices/${item.id}`);
};

  const openAddDevice = () => setIsAddDevice(true);
  const closeAddDevice = () => setIsAddDevice(false);


  return {
    isAddDevice,
    openAddDevice,
    closeAddDevice,
    handleConfigDevice
  }
}
