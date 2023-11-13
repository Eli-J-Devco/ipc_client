/********************************************************
* Copyright 2020-2021 NEXT WAVE ENERGY MONITORING INC.
* All rights reserved.
* 
*********************************************************/
import { useState } from "react";

export default function useConfigDevice() {
  const [ curItem, setCurItem ] = useState([
    {id: 1, function: "C_DeviceAddress", current_reading: '1.000', low_alarm: '0.000', high_alarm: "0.000"},
    {id: 2, function: "C_DeviceAddress", current_reading: '1.000', low_alarm: '0.000', high_alarm: "0.000"},
    {id: 3, function: "C_DeviceAddress", current_reading: '1.000', low_alarm: '0.000', high_alarm: "0.000"},
    {id: 4, function: "C_DeviceAddress", current_reading: '1.000', low_alarm: '0.000', high_alarm: "0.000"},
    {id: 5, function: "C_DeviceAddress", current_reading: '1.000', low_alarm: '0.000', high_alarm: "0.000"},
    {id: 6, function: "C_DeviceAddress", current_reading: '1.000', low_alarm: '0.000', high_alarm: "0.000"},
    {id: 7, function: "C_DeviceAddress", current_reading: '1.000', low_alarm: '0.000', high_alarm: "0.000"},
    {id: 8, function: "C_DeviceAddress", current_reading: '1.000', low_alarm: '0.000', high_alarm: "0.000"},
    {id: 9, function: "C_DeviceAddress", current_reading: '1.000', low_alarm: '0.000', high_alarm: "0.000"},
    {id: 10, function: "C_DeviceAddress", current_reading: '1.000', low_alarm: '0.000', high_alarm: "0.000"},
    {id: 11, function: "C_DeviceAddress", current_reading: '1.000', low_alarm: '0.000', high_alarm: "0.000"},
    {id: 12, function: "C_DeviceAddress", current_reading: '1.000', low_alarm: '0.000', high_alarm: "0.000"},
    {id: 13, function: "C_DeviceAddress", current_reading: '1.000', low_alarm: '0.000', high_alarm: "0.000"},
    {id: 14, function: "C_DeviceAddress", current_reading: '1.000', low_alarm: '0.000', high_alarm: "0.000"}
  ])

  const handleInputChange = (event, data) =>{
    // const { name, value } = event.target
    // console.log(data)
    // setCurItem({...curItem,  [name]: value});
  }


  

  const handleEditAlarm = (value) => [
    console.log(value)
  ]
  
  return {
    handleEditAlarm,
    handleInputChange,
    curItem
  }
}
