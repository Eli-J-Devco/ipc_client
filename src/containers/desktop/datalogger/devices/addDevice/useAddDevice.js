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
    let target = event.target;
    let name = target.name;
    let value = target.value
    if (target.type === 'radio') {
        value = target.checked ? 1 : 0;
    }
    
    if (name) {
        let item = {} ;
        item[name] = (event.target.validity.valid) ? value : curItem[name];
        setCurItem(item);
    }
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
