/********************************************************
* Copyright 2020-2021 NEXT WAVE ENERGY MONITORING INC.
* All rights reserved.
* 
*********************************************************/
import { useState } from 'react'
import * as yup from 'yup'

export default function useAddDevice() {
  const [isAddMultipleDevice, setIsAddMultipleDevice] = useState(false);
  const [curItem, setCurItem] = useState({ Modbus_TCP: 1 })

  const schema = yup.object().shape({
    device_name: yup.string().required("Device Name is required"),
    rtu_bus_address: yup.number().required("RTU Bus-Address is required").min(0, "Bus-Address must greater than or euqal to 0").max(254, "Bus-Address must less than or euqal to 254"),
    tcp_gateway_port: yup.number().required("MB/TCP Gateway Port is required").min(0, "Port must greater than or euqal to 0").max(65535, "Port must less than or euqal to 65535"),
    tcp_gateway_ip: yup.string().required("MB/TCP Gateway IP is required").matches(/^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/, "Invalid IP Address"),
  })

  const [initialValues, setInitialValues] = useState(
    {
      name: "",
      device_virtual: false,
      id_communication: 0,
      rtu_bus_address: 0,
      tcp_gateway_port: 502,
      tcp_gateway_ip: "",
      id_device_type: 0,
      add_count: 0,
      in_mode: 0,
      id_template: 0,
      device_group: 0,
      // mppt: [
      //   {
      //     id: 0,
      //     id_pointkey: "string",
      //     string: [
      //       {
      //         id: 0,
      //         id_pointkey: "string",
      //         panel: [
      //           {
      //             id: 0,
      //             id_pointkey: "string"
      //           }
      //         ]
      //       }
      //     ]
      //   }
      // ]
    }
  )

  const handleInputChange = (event, data) => {
    const { name, value } = event.target

    setCurItem({ ...curItem, [name]: value });
  }

  const handleDropdownChange = (item) => {
  }

  const openAddMultipleDevice = () => setIsAddMultipleDevice(true);
  const closeAddMultipleDevice = () => setIsAddMultipleDevice(false)


  return {
    isAddMultipleDevice,
    schema,
    initialValues,
    curItem,
    openAddMultipleDevice,
    closeAddMultipleDevice,
    handleDropdownChange,
    handleInputChange,
    setInitialValues
  }
}
