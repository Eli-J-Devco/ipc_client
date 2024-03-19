/********************************************************
* Copyright 2020-2021 NEXT WAVE ENERGY MONITORING INC.
* All rights reserved.
* 
*********************************************************/

import React, { useEffect, useState } from 'react'
import { Tooltip } from 'react-tooltip';
import ModalDefault from 'react-bootstrap/Modal';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import useAxiosPrivate from '../../../../../hooks/useAxiosPrivate'

import useAddDevice from './useAddDevice';
import { AddModBusDevice } from './AddModBusDevice';

import Modal from '../../../../../components/modal/Modal';
import { RCheckbox, RTextForm } from '../../../../../components/Controls'
import ReactSelectDropdown from '../../../../../components/ReactSelectDropdown';
import Button from '../../../../../components/button/Button';
import Constants from '../../../../../utils/Constants';
import LibToast from '../../../../../utils/LibToast';
import { loginService } from '../../../../../services/loginService';
import AddMultipleDevice from './AddMultipleDevice';


export default function AddDevice(props) {
  const methods = useForm({ mode: "onChange" });
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();

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
  const [communicationProtocol, setCommunicationProtocol] = useState([]);
  const [selectedCommunicationProtocol, setSelectedCommunicationProtocol] = useState([]);

  useEffect(() => {
    if (deviceConfig) {
      setTimeout(() => {
        const { device_type, device_group, template, communication } = deviceConfig;
        setDeviceType(device_type.map(item => ({ value: item.id, label: item.name })));
        setSelectedDeviceType({ value: device_type[0].id, label: device_type[0].name });
        setDeviceGroup(device_group.map(item => ({ value: { id_group: item.id, id_device_type: item.id_device_type }, label: item.name })));
        setTemplateLibrary(template.map(item => ({ value: { id_template: item.id, id_device_group: item.id_device_group }, label: item.name })));
        setCommunicationProtocol(communication.map(item => ({ value: item.id, label: item.name })));
        setSelectedCommunicationProtocol({ value: communication[0].id, label: communication[0].name });

        methods.setValue("id_device_type", device_type[0].id);
        methods.setValue("device_virtual", false);
        methods.setValue("in_mode", 0);
        methods.setValue("add_count", 1);
      }, 100);
    }
  }, [deviceConfig, methods]);

  useEffect(() => {
    setTimeout(() => {
      setSelectedDeviceGroup(deviceGroup.filter(item => item.value.id_device_type === deviceConfig.device_type[0].id)[0]);
      // methods.setValue("id_device_group", deviceConfig.device_group[0].id);
    }, 100);
  }, [methods, deviceConfig, deviceGroup]);

  useEffect(() => {
    setTimeout(() => {
      setSelectedTemplateLibrary(templateLibrary.filter(item => item.value.id_device_group === deviceConfig.device_group[0].id)[0]);
      methods.setValue("id_template", deviceConfig.template[0].id);
    }, 100);
  }, [methods, deviceConfig, templateLibrary]);

  const handleSave = methods.handleSubmit((data) => {
    const output = document.getElementById("progress");
    output.innerHTML = "<div><img src='/loading.gif' /></div>";
    setTimeout(async () => {
      try {
        const response = await axiosPrivate.post(Constants.API_URL.DEVICES.CREATE, data, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        console.log(response);
        LibToast.toast("Device added successfully", "info")
      } catch (error) {
        let msg = loginService.handleMissingInfo(error);
        if (typeof msg === "string") {
          LibToast.toast(msg, "error");
        }
        else {
          if (!loginService.handleMissingInfo(error))
            LibToast.toast("Error adding device", "error");
          else
            navigate("/");
        }
      }
      finally {
        output.innerHTML = "";
        if (isAddMultipleDevice) {
          closeAddMultipleDevice();
        }
        closeAddDevice();
      }
    }, 500);
  });

  const footer = <div>
    <Button variant="dark" onClick={() => handleSave()} >
      <Button.Text text="Add" />
    </Button>
    <Button
      variant="dark" className="ms-3"
      onClick={() => {
        let data = methods.getValues();
        let isValid = true;
        Object.entries(data).forEach(([key, value]) => {
          if (!isValid) return;
          if (selectedCommunicationProtocol?.label.search(/RS485/g) === -1) {
            const allowedKeys = ["device_virtual", "in_mode", "add_count"];
            if (!value && !allowedKeys.includes(key)) {
              LibToast.toast(`Please fill in ${key.replace("_", " ").toUpperCase()}`, "error");
              isValid = false;
            }
          } else {
            const allowedKeys = ["tcp_gateway_ip", "tcp_gateway_port", "device_virtual", "in_mode", "add_count"];
            if (!value && !allowedKeys.includes(key)) {
              LibToast.toast(`Please fill in ${key.replace("_", " ").toUpperCase()}`, "error");
              isValid = false;
            }
          }
        });
        if (isValid) {
          methods.setValue("in_mode", 1);
          openAddMultipleDevice()
        }
      }}>
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
    <FormProvider {...methods}>
      <form onSubmit={handleSave}>
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
                <AddMultipleDevice handleSave={handleSave} closeAddMultipleDevice={closeAddMultipleDevice} />
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

            {protocol.Physical === 1 ? <AddModBusDevice communication={{ communicationProtocol, selectedCommunicationProtocol, setSelectedCommunicationProtocol }} /> :
              ""}

            <div>Auto-detect requires \"Search for Modbus Devices\" be enable in <u>RS485 Options</u>.</div>
            <div>To create a Virtual Meter, use the <u>Device Framework</u> to create a template, then add a meter using that template.</div>
            <div className='col-xl-6 col-md-12 col-sm-12 d-flex mt-2 ml-5 align-items-center'>
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
                        let selectedTemplateLibrary = selectedDeviceGroup ? templateLibrary.filter(item => item.value.id_device_group === selectedDeviceGroup.value.id_group)[0] : [];
                        setSelectedDeviceType(e);
                        setSelectedDeviceGroup(selectedDeviceGroup ? selectedDeviceGroup : []);
                        setSelectedTemplateLibrary(selectedTemplateLibrary ? selectedTemplateLibrary : []);
                        methods.setValue("id_device_type", e.value);
                      }, 100);
                    }}
                    optionList={deviceType}
                  />
                </div>
              </div>
              {selectedDeviceGroup?.label ?
                <>
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
                          setTimeout(() => {
                            let selectedTemplateLibrary = templateLibrary.filter(item => item.value.id_device_group === e.value.id_group)[0];
                            setSelectedDeviceGroup(e);
                            setSelectedTemplateLibrary(selectedTemplateLibrary ? selectedTemplateLibrary : []);
                            // methods.setValue("id_device_group", e.value);
                          }, 100);
                        }}
                        optionList={deviceGroup.filter(item => item.value.id_device_type === selectedDeviceType?.value)}
                      />
                    </div>
                  </div>
                  {selectedTemplateLibrary?.label ?
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
                          optionList={templateLibrary.filter(item => item.value.id_device_group === selectedDeviceGroup?.value?.id)}
                        />
                      </div>
                    </div> : createTemplateBTN
                  }
                </>
                :
                createTemplateBTN
              }
            </div>
          </div>
        </Modal>
      </form>
    </FormProvider>
  )
}
