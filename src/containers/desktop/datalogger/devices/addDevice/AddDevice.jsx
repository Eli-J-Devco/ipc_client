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


export default function AddDevice() {
  const { t, closeAddDevice } = this.props;
  const { isAddMultipleDevice, curItem }  = this.state
  console.log(isAddMultipleDevice)
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
          <Button.Text text={t('common.add')} />
      </Button>
      <Button variant="dark" className="ms-3" onClick={this.openAddMultipleDevice.bind(this)}>
          <Button.Text text={t('common.add_multiple')}  />
      </Button>
      <Button variant="grey" className="ms-3">
          <Button.Text text={t('common.cancel')} />
      </Button>
    </div>
  
  return (
    <>
    <Modal
      isOpen={true}
      close={closeAddDevice}
      title={t('devices.add_device')}
      size='xl'
      footer={footer}
    > 
      <div>
        <ModalDefault show={isAddMultipleDevice} style={{top: '100px'}} onHide={this.closeAddMultipleDevice.bind(this)}>
          <ModalDefault.Header style={{backgroundColor: "#383434", color: "#fff"}}>{t('devices.add_multi_device')}</ModalDefault.Header>

            <ModalDefault.Body >
              <div className='my-3'>{t('devices.add_multi_device_title')}</div>
              <div>{t('devices.add_multi_device_info')}</div>
              <div className='my-3'>
                <div className='col-md-6'>
                  <RText
                    label={t('devices.how_many_to_add')}
                    inputClass="form-control"
                    inputId="how_many_to_add"
                    inputName="how_many_to_add"
                    name="how_many_to_add"
                    onChange={(e) => { this.handleInputChange(e) }}
                    info={t('devices.device_number_note')}
                  > </RText>
                </div>

                <div className='col-md-6 form_dropdown'>
                  <ReactSelectDropdown
                      label={t('devices.when_adding')}
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
                  <Button variant="dark" onClick={this.closeAddMultipleDevice.bind(this)}>
                      <Button.Text text={t('common.add')} />
                  </Button>
                  <Button variant="grey" className="ms-3" onClick={this.closeAddMultipleDevice.bind(this)}>
                      <Button.Text text={t('common.cancel')} />
                  </Button>
                </div>
              </div>
            </ModalDefault.Body>
        </ModalDefault>
        
        <div className='col-xl-6 col-md-12'>
          <RText
            label={t('devices.device_name')}
            inputClass="form-control"
            inputId="device_name"
            inputName="device_name"
            name="device_name"
            onChange={(e) => { this.handleInputChange(e) }}
            info={t('devices.device_name_note')}
          > </RText>

          <Tooltip id="my-tooltip" />
        </div>
      
        <div className='col-xl-6 col-md-12'>
          <div>{t('devices.communication_protocol')}</div>
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
                  onChange={(e) => { this.handleInputChange(e); }} 
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
                  onChange={(e) => { this.handleInputChange(e); }} 
                  />
              </div>
            </div>
          </div>
        </div>

        <div className='col-xl-6 col-md-12'>
            <div>{t('devices.device_connected')}</div>
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
                    onChange={(e) => { this.handleInputChange(e, 1); }} 
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
                    onChange={(e) => { this.handleInputChange(e); }} 
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
                    onChange={(e) => { this.handleInputChange(e); }} 
                    />
                </div>
              </div>
            </div>
          </div>

        <div className='mb-3'>{t('devices.recommended_adding')}</div>
        <div className='col-xl-6 col-md-12'>
          <div className='col-xl-6 col-md-6'>
            <RText
              label={t('devices.device_number')}
              inputClass="form-control"
              inputId="device_number"
              inputName="device_number"
              name="device_number"
              onChange={(e) => { this.handleInputChange(e) }}
              info={t('devices.device_number_note')}
            > </RText>

            <Tooltip id="my-tooltip" />
          </div>

          <div className='col-xl-6 col-md-6'>
            <RText
              label={t('devices.rtu_bus_address')}
              inputClass="form-control"
              inputId="rtu_bus_address"
              inputName="rtu_bus_address"
              name="rtu_bus_address"
              onChange={(e) => { this.handleInputChange(e) }}
              info={t('devices.rtu_bus_address_note')}
            > </RText>

            <Tooltip id="my-tooltip" />
          </div>

          {curItem.Modbus_TCP === 1 ? <div className='col-xl-6 col-md-6'>
            <RText
              label={t('devices.tcp_gateway_port')}
              inputClass="form-control"
              inputId="tcp_gateway_port"
              inputName="tcp_gateway_port"
              name="tcp_gateway_port"
              onChange={(e) => { this.handleInputChange(e) }}
              info={t('devices.tcp_gateway_port_note')}
            > </RText>

            <Tooltip id="my-tooltip" />
          </div> : ""}

          {curItem.Modbus_TCP === 1 ? <div className='col-xl-12 col-md-12'>
          <RText
              label={t('devices.tcp_gateway_ip')}
              inputClass="form-control"
              inputId="tcp_gateway_ip"
              inputName="tcp_gateway_ip"
              name="tcp_gateway_ip"
              onChange={(e) => { this.handleInputChange(e) }}
              info={t('devices.tcp_gateway_ip_note')}
            > </RText>

            <Tooltip id="my-tooltip" />
          </div> : ""}
        </div>

        <div>{t('devices.search_for_modbus_devices')} <u>RS485 Options</u>.</div>
        <div>{t('devices.to_create_virtual')}<u>{t('devices.device_framework')}</u>{t('devices.to_create_template')}</div>
        <div className='col-xl-6 col-md-12 d-flex mt-2 ml-5'>
          <div className='col-md-6 me-5'>
            <div className='form_dropdown'>
              <ReactSelectDropdown
                  label={t('devices.device_type')}
                  className="device_type"
                  inputId="device_type"
                  inputName="device_type"
                  name="device_type"
                  value={selectedOption}
                  onChange={(e) => { this.handleDropdownChange(e) }}
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
                  label={t('devices.template_library')}
                  className="template_library"
                  inputId="template_library"
                  inputName="template_library"
                  name="template_library"
                  value={selectedOption}
                  onChange={(e) => { this.handleDropdownChange(e) }}
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
