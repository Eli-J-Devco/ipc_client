/********************************************************
 * Copyright 2020-2021 NEXT WAVE ENERGY MONITORING INC.
 * All rights reserved.
 *
 *********************************************************/
import FormInput from "../../../../../components/formInput/FormInput"

export const AddModBusDevice = ({ communication, initialValues, setInitialValues }) => {
    return (
        <>
            <div className='col-xl-6 col-md-12'>
                <div className='d-flex my-3'>
                    <FormInput.Select
                        label="How is Modbus Device connected?"
                        name="id_communication"
                        value={initialValues?.communication}
                        option={communication}
                        onChange={(e) => setInitialValues({ ...initialValues, communication: e, id_communication: e.value })}
                    />
                </div>
            </div>

            <div className='col-xl-6 col-md-12'>
                <div className='col-xl-6 col-md-6'>
                    <FormInput.Text
                        label="RTU Bus-Address"
                        name="rtu_bus_address"
                        type="number"
                        required={true}
                        value={initialValues?.rtu_bus_address}
                        onChange={(e) => setInitialValues({ ...initialValues, rtu_bus_address: e.target.value })}
                    />
                </div>
                {initialValues?.communication?.label && initialValues?.communication?.label.search(/COM/g) === -1 ?
                    <>
                        <div className='col-xl-6 col-md-6'>
                            <FormInput.Text
                                label="MB/TCP Gateway Port"
                                name="tcp_gateway_port"
                                type="number"
                                required={true}
                                value={initialValues?.tcp_gateway_port}
                                onChange={(e) => setInitialValues({ ...initialValues, tcp_gateway_port: e.target.value })}
                            />
                        </div>
                        <div className='col-xl-12 col-md-12'>
                            <FormInput.Text
                                label="MB/TCP Gateway IP-Address"
                                name="tcp_gateway_ip"
                                required={true}
                                value={initialValues?.tcp_gateway_ip}
                                onChange={(e) => setInitialValues({ ...initialValues, tcp_gateway_ip: e.target.value })}
                            />
                        </div>
                    </>
                    : ""}
            </div>
        </>
    )
}