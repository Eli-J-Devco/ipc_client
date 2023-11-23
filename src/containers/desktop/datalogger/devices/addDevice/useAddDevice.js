/********************************************************
* Copyright 2020-2021 NEXT WAVE ENERGY MONITORING INC.
* All rights reserved.
* 
*********************************************************/
import { useState } from 'react'

export default function useAddDevice() {
  const [isAddMultipleDevice, setIsAddMultipleDevice] = useState(false);
  const [curItem, setCurItem] = useState({ Modbus_TCP: 1})


  const handleInputChange = (event, data) =>{
    const { name, value } = event.target
    
    setCurItem({...curItem,  [name]: value});
  }

  const handleDropdownChange = (item) => {
     
  }

  const openAddMultipleDevice = () => setIsAddMultipleDevice(true);
  const closeAddMultipleDevice = () => setIsAddMultipleDevice(false)

  
  return {
    isAddMultipleDevice,
    curItem,
    openAddMultipleDevice,
    closeAddMultipleDevice,
    handleDropdownChange,
    handleInputChange
  }
}
