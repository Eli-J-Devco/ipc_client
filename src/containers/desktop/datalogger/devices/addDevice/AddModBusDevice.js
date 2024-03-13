/********************************************************
 * Copyright 2020-2021 NEXT WAVE ENERGY MONITORING INC.
 * All rights reserved.
 *
 *********************************************************/
import { useEffect, useState } from "react"
import { Tooltip } from "react-tooltip"

import { RTextForm } from "../../../../../components/Controls"
import ReactSelectDropdown from "../../../../../components/ReactSelectDropdown"
import { useFormContext } from "react-hook-form"

export const AddModBusDevice = ({ communication }) => {
    const { setValue } = useFormContext();
    const [communicationProtocol, setCommunicationProtocol] = useState([]);
    const [selectedCommunicationProtocol, setSelectedCommunicationProtocol] = useState([]);

    useEffect(() => {
        if (communication) {
            setTimeout(() => {
                setCommunicationProtocol(communication.map(item => ({ value: item.id, label: item.name })))
                setSelectedCommunicationProtocol({ value: communication[0].id, label: communication[0].name })
            }, 100);
        }
    }, [communication]);

    return (
        <>
            <div className='col-xl-6 col-md-12'>
                <div className='d-flex my-3'>
                    <ReactSelectDropdown
                        label="How is Modbus Device connected?"
                        className="modbus_device_connection"
                        inputId="modbus_device_connection"
                        inputName="modbus_device_connection"
                        name="modbus_device_connection"
                        optionList={communicationProtocol}
                        value={selectedCommunicationProtocol}
                        onChange={(e) => {
                            setTimeout(() => {
                                setSelectedCommunicationProtocol(e)
                                setValue("id_communication", e.value)
                            }, 100)
                        }}
                    />
                </div>
            </div>

            <div className='col-xl-6 col-md-12'>
                <div className='col-xl-6 col-md-6'>
                    <RTextForm
                        label="RTU Bus-Address"
                        inputClass="form-control"
                        inputId="bus_address"
                        inputName="bus_address"
                        name="bus_address"
                        info="0-255"
                        required={{ value: true, message: "RTU Bus-Address is required" }}
                        pattern={{ value: /^\d{1,3}$/, message: "Invalid Bus-Address" }}
                        max={{ value: 254, message: "Bus-Address must less than or euqal to 254" }}
                        min={{ value: 0, message: "Bus-Address must greater than or euqal to 0" }}
                    />
                </div>
                {selectedCommunicationProtocol?.label && selectedCommunicationProtocol?.label.search(/RS485/g) === -1 ?
                    <>
                        <div className='col-xl-6 col-md-6'>
                            <RTextForm
                                label="MB/TCP Gateway Port"
                                inputClass="form-control"
                                inputId="tcp_gateway_port"
                                inputName="tcp_gateway_port"
                                name="tcp_gateway_port"
                                info="MB/TCP Gateway Port"
                                required={{ value: true, message: "MB/TCP Gateway Port is required" }}
                                pattern={{ value: /^\d{1,5}$/, message: "Invalid Port" }}
                                max={{ value: 65535, message: "Port must less than or euqal to 65535" }}
                                min={{ value: 0, message: "Port must greater than or euqal to 0" }}
                            />
                        </div>
                        <div className='col-xl-12 col-md-12'>
                            <RTextForm
                                label="MB/TCP Gateway IP-Address"
                                inputClass="form-control"
                                inputId="tcp_gateway_ip"
                                inputName="tcp_gateway_ip"
                                name="tcp_gateway_ip"
                                info="MB/TCP Gateway IP-Address"
                                required={{ value: true, message: "MB/TCP Gateway IP-Address is required" }}
                                pattern={{ value: /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/, message: "Invalid IP-Address" }}
                            > </RTextForm>

                            <Tooltip id="my-tooltip" />
                        </div>
                    </>
                    : ""}
            </div>
        </>
    )
}