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
                        value={initialValues?.id_communication}
                        option={communication}
                        onChange={(e) => setInitialValues({ ...initialValues, id_communication: e })}
                    />
                </div>
            </div>

            <div className='col-xl-6 col-md-12'>
                <div className='col-xl-6 col-md-6'>
                    <FormInput.Text
                        label="RTU Bus-Address"
                        name="rtu_bus_address"
                        required={true}
                    />
                </div>
                {initialValues?.id_communication?.label && initialValues?.id_communication?.label.search(/RS485/g) === -1 ?
                    <>
                        <div className='col-xl-6 col-md-6'>
                            <FormInput.Text
                                label="MB/TCP Gateway Port"
                                name="tcp_gateway_port"
                                required={true}
                            />
                        </div>
                        <div className='col-xl-12 col-md-12'>
                            <FormInput.Text
                                label="MB/TCP Gateway IP-Address"
                                name="tcp_gateway_ip"
                                required={true}
                            />
                        </div>
                    </>
                    : ""}
            </div>
        </>
    )
}