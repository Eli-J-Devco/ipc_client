/********************************************************
* Copyright 2020-2021 NEXT WAVE ENERGY MONITORING INC.
* All rights reserved.
* 
*********************************************************/

import React from 'react'
import Modal from '../../../../../components/modal/Modal';
import {  RCheckbox, RText } from '../../../../../components/Controls'
import { Tooltip } from 'react-tooltip';
import ReactSelectDropdown from '../../../../../components/ReactSelectDropdown';
import Button from '../../../../../components/button/Button';
import ModalDefault from 'react-bootstrap/Modal';
import useAddDevice from './useAddDevice';


export default function AddDevice(props) {
  const { closeAddDevice } = props;
  const { isAddMultipleDevice, openAddMultipleDevice, closeAddMultipleDevice, handleDropdownChange, handleInputChange, curItem }  = useAddDevice();

  const options = [
    { id: "1", value: "datalogger", label: 'Data Logger' },
    { id: "2", value: "inverter", label: 'Inverter' },
    { id: "3", value: "weather", label: 'Weather' },
    { id: "4", value: "sensor", label: 'Sensor' },
    { id: "5", value: "ups", label: 'UPS' }
  ];
  const selectedOption = { value: "inverter", label: 'Inverter' }
  const footer = <div>
      <Button variant="dark" >
          <Button.Text text="Add" />
      </Button>
      <Button variant="dark" className="ms-3" onClick={() => openAddMultipleDevice()}>
          <Button.Text text="Add Multiple"  />
      </Button>
      <Button variant="grey" className="ms-3">
          <Button.Text text="Cancel" />
      </Button>
    </div>
  
  return (
    <>
    <Modal
      isOpen={true}
      close={closeAddDevice}
      title="Add Device"
      size='xl'
      footer={footer}
    > 
      <div>
        <ModalDefault show={isAddMultipleDevice} style={{top: '100px'}} onHide={() => closeAddMultipleDevice()}>
          <ModalDefault.Header style={{backgroundColor: "#383434", color: "#fff"}}>Add Multiple Device</ModalDefault.Header>

            <ModalDefault.Body >
              <div className='my-3'>Add multiple devices, from #3 to #12, inclusive.</div>
              <div>Will skip over existing devices in the range.</div>
              <div className='my-3'>
                <div className='col-md-6'>
                  <RText
                    label="How many to add?"
                    inputClass="form-control"
                    inputId="how_many_to_add"
                    inputName="how_many_to_add"
                    name="how_many_to_add"
                    onChange={(e) => { this.handleInputChange(e) }}
                    info="How many to add?"
                  > </RText>
                </div>

                <div className='col-md-6 form_dropdown'>
                  <ReactSelectDropdown
                      label="When adding, increment"
                      className="when_adding"
                      inputId="when_adding"
                      inputName="when_adding"
                      name="when_adding"
                      value={selectedOption}
                      onChange={(e) => { this.handleDropdownChange(e) }}
                      optionList={options}
                      />
                </div>

                <div className='mt-5 mb-2'>
                  <Button variant="dark" onClick={() => closeAddMultipleDevice()}>
                      <Button.Text text="Add" />
                  </Button>
                  <Button variant="grey" className="ms-3" onClick={() => closeAddMultipleDevice()}>
                      <Button.Text text="Cancel" />
                  </Button>
                </div>
              </div>
            </ModalDefault.Body>
        </ModalDefault>
        
        <div className='col-xl-6 col-md-12'>
          <RText
            label="Device Name"
            inputClass="form-control"
            inputId="device_name"
            inputName="device_name"
            name="device_name"
            onChange={(e) => handleInputChange(e) }
            info="Device Name Note"
          > </RText>

          <Tooltip id="my-tooltip" />
        </div>
      
        <div className='col-xl-6 col-md-12'>
          <div>Select Device's communication protocol</div>
          <div className='d-flex my-2'>
            <div className='col-xl-4 col-md-4'>
              <div>
                <RCheckbox
                  type="radio"
                  label="Modbus"
                  inputId="Modbus"
                  inputName="Modbus"
                  labelClass="no-label"
                  checked={1}
                  onChange={(e) => handleInputChange(e) } 
                  />
              </div>
            </div>
          
            <div className='col-xl-4 col-md-4'>
              <div>
                <RCheckbox
                  type="radio"
                  label="Virtual"
                  inputId="Virtual"
                  inputName="Virtual"
                  labelClass="no-label"
                  onChange={(e) => handleInputChange(e)} 
                  />
              </div>
            </div>
          </div>
        </div>

        <div className='col-xl-6 col-md-12'>
            <div>How is Modbus Device connected?</div>
            <div className='d-flex my-3'>
              <div className='col-xl-4 col-md-4'>
                <div>
                  <RCheckbox
                    type="radio"
                    label="Modbus/TCP"
                    inputId="Modbus_TCP"
                    inputName="Modbus_TCP"
                    labelClass="no-label"
                    checked={curItem.Modbus_TCP}
                    onChange={(e) => handleInputChange(e, 1)} 
                    />
                </div>
              </div>
            
              <div className='col-xl-4 col-md-4'>
                <div>
                  <RCheckbox
                    type="radio"
                    label="RS485 Port 1"
                    inputId="RS485_Port_1"
                    inputName="RS485_Port_1"
                    labelClass="no-label"
                    checked={curItem.RS485_Port_1}
                    onChange={(e) => handleInputChange(e)} 
                    />
                </div>
              </div>

              <div className='col-xl-4 col-md-4'>
                <div >
                  <RCheckbox
                    type="radio"
                    label="RS485 Port 2"
                    inputId="RS485_Port_2"
                    inputName="RS485_Port_2"
                    labelClass="no-label"
                    checked={curItem.RS485_Port_2}
                    onChange={(e) => handleInputChange(e)} 
                    />
                </div>
              </div>
            </div>
          </div>

        <div className='mb-3'>We recommend adding the new device as #003, which is available in Device List and on all busses</div>
        <div className='col-xl-6 col-md-12'>
          <div className='col-xl-6 col-md-6'>
            <RText
              label="Device number"
              inputClass="form-control"
              inputId="device_number"
              inputName="device_number"
              name="device_number"
              onChange={(e) => handleInputChange(e)}
              info="device number note"
            > </RText>

            <Tooltip id="my-tooltip" />
          </div>

          <div className='col-xl-6 col-md-6'>
            <RText
              label="RTU Bus-Address"
              inputClass="form-control"
              inputId="rtu_bus_address"
              inputName="rtu_bus_address"
              name="rtu_bus_address"
              onChange={(e) => handleInputChange(e) }
              info="RTU Bus-Address"
            > </RText>

            <Tooltip id="my-tooltip" />
          </div>

          {curItem.Modbus_TCP === 1 ? <div className='col-xl-6 col-md-6'>
            <RText
              label="MB/TCP Gateway Port"
              inputClass="form-control"
              inputId="tcp_gateway_port"
              inputName="tcp_gateway_port"
              name="tcp_gateway_port"
              onChange={(e) => handleInputChange(e) }
              info="MB/TCP Gateway Port"
            > </RText>

            <Tooltip id="my-tooltip" />
          </div> : ""}

          {curItem.Modbus_TCP === 1 ? <div className='col-xl-12 col-md-12'>
          <RText
              label="MB/TCP Gateway IP-Address"
              inputClass="form-control"
              inputId="tcp_gateway_ip"
              inputName="tcp_gateway_ip"
              name="tcp_gateway_ip"
              onChange={(e) => handleInputChange(e) }
              info="MB/TCP Gateway IP-Address"
            > </RText>

            <Tooltip id="my-tooltip" />
          </div> : ""}
        </div>

        <div>Auto-detect requires \"Search for Modbus Devices\" be enable in <u>RS485 Options</u>.</div>
        <div>To create a Virtual Meter, use the <u>Device Framework</u> to create a template, then add a meter using that template.</div>
        <div className='col-xl-6 col-md-12 d-flex mt-2 ml-5'>
          <div className='col-md-6 me-5'>
            <div className='form_dropdown'>
              <ReactSelectDropdown
                  label="Device type"
                  className="device_type"
                  inputId="device_type"
                  inputName="device_type"
                  name="device_type"
                  value={selectedOption}
                  onChange={(e) => handleDropdownChange(e) }
                  optionList={options}
                  />
            </div>
            <div className="ms-4">
              <ul className='my-2 '>{options.map(op => <li key={op.id} style={{'listStyleType': 'disc'}}>{op.label}</li>)}</ul>
            </div>
          </div>
          <div className='col-md-6'>
            <div className='form_dropdown'>
              <ReactSelectDropdown
                  label="Template Library"
                  className="template_library"
                  inputId="template_library"
                  inputName="template_library"
                  name="template_library"
                  value={selectedOption}
                  onChange={(e) => handleDropdownChange(e) }
                  optionList={options}
                  />
            </div>
          </div>
        </div>
      </div>
    </Modal>

    </>
  )
}
