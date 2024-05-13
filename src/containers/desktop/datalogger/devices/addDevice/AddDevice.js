/********************************************************
* Copyright 2020-2021 NEXT WAVE ENERGY MONITORING INC.
* All rights reserved.
* 
*********************************************************/

import React, { useState } from 'react'
import ModalDefault from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';


import useAddDevice from './useAddDevice';
import { AddModBusDevice } from './AddModBusDevice';

import Modal from '../../../../../components/modal/Modal';
import Button from '../../../../../components/button/Button';
import AddMultipleDevice from './AddMultipleDevice';
import FormInput from '../../../../../components/formInput/FormInput';
import _ from 'lodash';

export default function AddDevice(props) {
  const navigate = useNavigate();

  const { closeAddDevice, deviceConfig, setdataDevices } = props;
  const {
    isAddMultipleDevice,
    setIsOpenAddMultipleDevice,
    meterType,
    meterTypes,
    setMeterType,
    schema,
    initialValues,
    setInitialValues,
    closeAddMultipleDevice,
    handleSave,
    handleAddMultipleDevice,
    deviceConfigDropdown,
  } = useAddDevice(closeAddDevice, deviceConfig, setdataDevices);
  const [protocol, setProtocol] = useState({
    Physical: 1,
    Virtual: 0
  });

  const footer = <div>
    <Button variant="dark" type="submit" formId="addDeviceForm" >
      <Button.Text text="Add" />
    </Button>
    <Button
      variant="dark"
      className="ms-3"
      type="submit"
      formId="addDeviceForm"
      onClick={() => {
        setIsOpenAddMultipleDevice(true);
      }}
    >
      <Button.Text text="Add Multiple" />
    </Button>
    <Button variant="grey" className="ms-3" onClick={() => closeAddDevice()}>
      <Button.Text text="Cancel" />
    </Button>
  </div>

  const createTemplateBTN =
    <Button className='col-xl-4 col-md-4 col-sm-4' variant="dark" onClick={() => navigate("/datalogger/templates")}>
      <Button.Text text="Create template" />
    </Button>

  return (
    <FormInput id="addDeviceForm" initialValues={initialValues} validationSchema={schema} onSubmit={handleSave}>
      <Modal
        isOpen={true}
        close={closeAddDevice}
        title="Add Device"
        size='xl'
        footer={footer}
      >
        <div>
          <ModalDefault show={isAddMultipleDevice} style={{ top: '100px' }} onHide={() => closeAddMultipleDevice()}>
            <ModalDefault.Header style={{ backgroundColor: "#383434", color: "#fff" }}>Add Multiple Device</ModalDefault.Header>
            <ModalDefault.Body >
              <AddMultipleDevice
                initialValues={initialValues}
                setInitialValues={setInitialValues}
                schema={schema}
                closeAddMultipleDevice={closeAddMultipleDevice}
                handleSave={handleAddMultipleDevice}
              />
            </ModalDefault.Body>
          </ModalDefault>

          <div className='col-xl-6 col-md-12'>
            <FormInput.Text
              label="Device ID"
              name="name"
              placeholder="Device name"
              className="mb-3"
              required={true}
              value={initialValues?.name}
              onChange={(e) => setInitialValues({ ...initialValues, name: e.target.value })}
            />
          </div>

          <div className='col-xl-6 col-md-12'>
            <div>What kind of your device?</div>
            <div className='d-flex my-2'>
              <div className='col-xl-4 col-md-4'>
                <div>
                  <FormInput.Check
                    label="Physical"
                    name="RS485"
                    checked={protocol.Physical}
                    onChange={(e) => {
                      setProtocol({ ...protocol, Physical: 1, Virtual: 0 });
                    }}
                  />
                </div>
              </div>

              <div className='col-xl-4 col-md-4'>
                <div>
                  <FormInput.Check
                    label="Virtual"
                    name="Virtual"
                    checked={protocol.Virtual}
                    onChange={(e) => {
                      setProtocol({ ...protocol, Physical: 0, Virtual: 1 });
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {protocol.Physical === 1 ? <AddModBusDevice communication={deviceConfigDropdown?.communicationProtocol} initialValues={initialValues} setInitialValues={setInitialValues} /> :
            ""}

          <div>Auto-detect requires \"Search for Modbus Devices\" be enable in <u>RS485 Options</u>.</div>
          <div>To create a Virtual Meter, use the <u>Device Framework</u> to create a template, then add a meter using that template.</div>
          <div className='col-xl-6 col-md-12 col-sm-12 d-flex mt-2 ml-5 align-items-center'>
            <div className='col-xl-6 col-md-6 col-sm-6'>
              <div className='form_dropdown'>
                <FormInput.Select
                  label="Device type"
                  name="id_device_type"
                  value={initialValues?.device_type}
                  option={deviceConfigDropdown?.deviceType}
                  onChange={(e) => {
                    let device_group = deviceConfigDropdown?.deviceGroup.map(item => item.options.filter(item => item.id_device_type === e?.value)).flat() || {};
                    let template;
                    if (device_group.length >= 0) {
                      device_group = device_group[0];
                      template = deviceConfigDropdown?.template.map(item => item.options.filter(item => item.value.id_device_group === device_group?.value)).flat() || {};
                    }

                    if (template.length >= 0) {
                      template = template[0];
                    }

                    setInitialValues({
                      ...initialValues,
                      device_type: e,
                      id_device_type: e.value,
                      device_group: device_group,
                      id_device_group: device_group?.value,
                      template: template,
                      id_template: template?.value?.id_template
                    })
                  }}
                />
              </div>
            </div>
            {initialValues?.device_group ?
              <>
                <div className='col-xl-6 col-md-6 col-sm-6'>
                  <div className='form_dropdown'>
                    <FormInput.Select
                      label="Device Group"
                      name="device_group"
                      value={initialValues?.device_group}
                      option={deviceConfigDropdown?.deviceGroup.map(item => {
                        let option = item.options.filter(item => item.id_device_type === initialValues.id_device_type);
                        return {
                          label: item.label,
                          options: option
                        };
                      })}
                      onChange={(e) => {
                        let template = deviceConfigDropdown?.template.map(item => item.options.filter(item => item.value.id_device_group === e?.value))[0][0];
                        setInitialValues({
                          ...initialValues,
                          device_group: e,
                          id_device_group: e?.value,
                          template: template,
                          id_template: template?.value?.id_template
                        })
                      }}
                    />
                  </div>
                </div>
                {initialValues?.template ?
                  <div className='col-xl-6 col-md-6 col-sm-6'>
                    <div className='form_dropdown'>
                      <FormInput.Select
                        label="Template Library"
                        className="template_library"
                        name="id_template"
                        value={initialValues?.template}
                        option={deviceConfigDropdown?.template.map(item => {
                          let option = item.options.filter(item => item.value.id_device_group === initialValues.id_device_group);
                          return {
                            label: item.label,
                            options: option
                          };
                        })}
                        onChange={(e) => setInitialValues({ ...initialValues, template: e, id_template: e?.value?.id_template })}
                      />
                    </div>
                  </div> : createTemplateBTN
                }
              </>
              :
              createTemplateBTN
            }
          </div>
          {
            initialValues?.device_type?.label.indexOf("Inverter") !== -1 ?
              <div className='mt-3 note'>
                <div>Inverter mode:</div>
                <div className='row'>
                  <div className='col-2'>
                    <FormInput.Check
                      label="Manual"
                      name="manual_mode"
                      checked={initialValues?.mode === 1}
                      onChange={(e) => setInitialValues({ ...initialValues, mode: 1 })}
                      type='radio'
                    />
                  </div>
                  <div className='col-2'>
                    <FormInput.Check
                      label="Auto"
                      name="auto_mode"
                      checked={initialValues?.mode === 0}
                      onChange={(e) => setInitialValues({ ...initialValues, mode: 0 })}
                      type='radio'
                    />
                  </div>
                </div>
                <div className='col-6'>
                  <FormInput.Text
                    label="Rated Power"
                    name="rated_power"
                    placeholder="Enter rated power"
                    type='number'
                    required={true}
                  />
                </div>
              </div>
              :
              initialValues?.device_type?.label.indexOf("Meter") !== -1 &&
              <div className='mt-3 note'>
                <FormInput.Select
                  label={"Meter Type"}
                  className="col-4"
                  name={"meter_type"}
                  value={meterType}
                  option={meterTypes}
                  onChange={(e) => {
                    setMeterType(e)
                    setInitialValues({ ...initialValues, meter_type: e.value })
                  }}
                  required={true}
                />
              </div>
          }
        </div>
      </Modal>
    </FormInput>
  )
}
