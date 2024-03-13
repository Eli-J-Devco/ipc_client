/********************************************************
* Copyright 2020-2021 NEXT WAVE ENERGY MONITORING INC.
* All rights reserved.
* 
*********************************************************/

import React, { useEffect, useState } from 'react'
import { Tooltip } from 'react-tooltip';
import ModalDefault from 'react-bootstrap/Modal';
import { FormProvider, useForm } from 'react-hook-form';

import useAddDevice from './useAddDevice';
import { AddModBusDevice } from './AddModBusDevice';

import Modal from '../../../../../components/modal/Modal';
import { RCheckbox, RTextForm } from '../../../../../components/Controls'
import ReactSelectDropdown from '../../../../../components/ReactSelectDropdown';
import Button from '../../../../../components/button/Button';


export default function AddDevice(props) {
  const methods = useForm();

  const { closeAddDevice, deviceConfig } = props;
  const { isAddMultipleDevice, openAddMultipleDevice, closeAddMultipleDevice, curItem } = useAddDevice();
  const [protocol, setProtocol] = useState({
    Physical: 1,
    Virtual: 0
  });
  const [deviceType, setDeviceType] = useState([]);
  const [selectedDeviceType, setSelectedDeviceType] = useState([]);
  const [deviceGroup, setDeviceGroup] = useState([]);
  const [selectedDeviceGroup, setSelectedDeviceGroup] = useState([]);
  const [templateLibrary, setTemplateLibrary] = useState([]);
  const [selectedTemplateLibrary, setSelectedTemplateLibrary] = useState([]);
  const [addMode, setAddMode] = useState([{ value: 1, label: "Network address" }, { value: 2, label: "Bus address" }]);
  const [selectedAddMode, setSelectedAddMode] = useState({ value: 1, label: "Network address" });

  useEffect(() => {
    if (deviceConfig) {
      setTimeout(() => {
        setDeviceType(deviceConfig.device_type.map(item => ({ value: item.id, label: item.name })));
        setSelectedDeviceType({ value: deviceConfig.device_type[0].id, label: deviceConfig.device_type[0].name });
        methods.setValue("id_device_type", deviceConfig.device_type[0].id);
        setDeviceGroup(deviceConfig.device_group.map(item => ({ value: { id_group: item.id, id_device_type: item.id_device_type }, label: item.name })));
        setSelectedDeviceGroup(deviceGroup.filter(item => item.value.id_device_type === deviceConfig.device_type[0].id)[0]);
        methods.setValue("id_device_group", deviceConfig.device_group[0].id);
        setTemplateLibrary(deviceConfig.template.map(item => ({ value: item.id, label: item.name })));
        setSelectedTemplateLibrary({ value: deviceConfig.template[0].id, label: deviceConfig.template[0].name });
        methods.setValue("id_template", deviceConfig.template[0].id);
        methods.setValue("in_addmode", selectedAddMode.value);
      }, 100);
    }
  }, [deviceConfig, methods]);

  const handleSave = methods.handleSubmit((data) => {
    if (!isAddMultipleDevice) {
      delete data.in_addcount;
      delete data.in_addmode;
    }
    console.log(data);
  });

  const footer = <div>
    <Button variant="dark" onClick={() => {
      handleSave();
      closeAddDevice();
    }} >
      <Button.Text text="Add" />
    </Button>
    <Button variant="dark" className="ms-3" onClick={() => openAddMultipleDevice()}>
      <Button.Text text="Add Multiple" />
    </Button>
    <Button variant="grey" className="ms-3" onClick={() => closeAddDevice()}>
      <Button.Text text="Cancel" />
    </Button>
  </div>


  return (
    <FormProvider {...methods}>
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
              <div className='my-3'>
                <div className='col-md-6'>
                  <RTextForm
                    label="How many to add?"
                    inputClass="form-control"
                    inputId="in_addcount"
                    inputName="in_addcount"
                    name="in_addcount"
                    type="number"
                    required={{ value: true, message: "Please enter a number" }}
                    pattern={{ value: /^\d+$/, message: "Invalid number" }}
                    min={{ value: 1, message: "Number must be greater than 0" }}
                    max={{ value: 20, message: "Number must be less than 20" }}
                    info="1-20"
                  />
                  <Tooltip id="my-tooltip" />
                </div>

                <div className='col-md-6 form_dropdown'>
                  <ReactSelectDropdown
                    label="When adding, increment"
                    className="in_addmode"
                    inputId="in_addmode"
                    inputName="in_addmode"
                    name="in_addmode"
                    value={selectedAddMode}
                    onChange={(e) => {
                      setTimeout(() => {
                        setSelectedAddMode(e);
                        methods.setValue("in_addmode", e.value);
                      }, 100);
                    }}
                    optionList={addMode}
                  />
                </div>

                <div className='mt-5 mb-2'>
                  <Button variant="dark" onClick={() => {
                    handleSave();
                    closeAddMultipleDevice();
                    closeAddDevice();
                  }}>
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
            <RTextForm
              label="Device Name"
              inputClass="form-control"
              inputId="name"
              inputName="name"
              name="name"
              info="Device Name Note"
              required={{ value: true, message: "Device Name is required" }}
            > </RTextForm>

            <Tooltip id="my-tooltip" />
          </div>

          <div className='col-xl-6 col-md-12'>
            <div>Select Device's communication protocol</div>
            <div className='d-flex my-2'>
              <div className='col-xl-4 col-md-4'>
                <div>
                  <RCheckbox
                    type="radio"
                    label="Physical"
                    inputId="Physical"
                    inputName="Physical"
                    labelClass="no-label"
                    checked={protocol.Physical}
                    onChange={(e) => {
                      setProtocol({ ...protocol, Physical: 1, Virtual: 0 });
                      methods.setValue("device_virtual", false);
                    }}
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
                    checked={protocol.Virtual}
                    onChange={(e) => {
                      setProtocol({ ...protocol, Physical: 0, Virtual: 1 });
                      methods.setValue("device_virtual", true);
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {protocol.Physical === 1 ? <AddModBusDevice curItem={curItem} communication={deviceConfig.communication} /> :
            ""}

          <div>Auto-detect requires \"Search for Modbus Devices\" be enable in <u>RS485 Options</u>.</div>
          <div>To create a Virtual Meter, use the <u>Device Framework</u> to create a template, then add a meter using that template.</div>
          <div className='col-xl-6 col-md-12 col-sm-12 d-flex mt-2 ml-5'>
            <div className='col-xl-6 col-md-6 col-sm-6'>
              <div className='form_dropdown'>
                <ReactSelectDropdown
                  label="Device type"
                  className="device_type"
                  inputId="device_type"
                  inputName="device_type"
                  name="device_type"
                  value={selectedDeviceType}
                  onChange={(e) => {
                    setTimeout(() => {
                      let selectedDeviceGroup = deviceGroup.filter(item => item.value.id_device_type === e.value)[0];
                      setSelectedDeviceType(e);
                      setSelectedDeviceGroup(selectedDeviceGroup ? selectedDeviceGroup : []);
                      methods.setValue("id_device_type", e.value);
                    }, 100);
                  }}
                  optionList={deviceType}
                />
              </div>
            </div>
            <div className='col-xl-6 col-md-6 col-sm-6'>
              <div className='form_dropdown'>
                <ReactSelectDropdown
                  label="Device Group"
                  className="device_group"
                  inputId="device_group"
                  inputName="device_group"
                  name="device_group"
                  value={selectedDeviceGroup}
                  onChange={(e) => {
                    setSelectedDeviceGroup(e);
                    methods.setValue("id_device_group", e.value);
                  }}
                  optionList={deviceGroup.filter(item => item.value.id_device_type === selectedDeviceType.value)}
                />
              </div>
            </div>
            <div className='col-xl-6 col-md-6 col-sm-6'>
              <div className='form_dropdown'>
                <ReactSelectDropdown
                  label="Template Library"
                  className="template_library"
                  inputId="template_library"
                  inputName="template_library"
                  name="template_library"
                  value={selectedTemplateLibrary}
                  onChange={(e) => {
                    setSelectedTemplateLibrary(e);
                    methods.setValue("id_template_library", e.value);
                  }}
                  optionList={templateLibrary}
                />
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </FormProvider>
  )
}
