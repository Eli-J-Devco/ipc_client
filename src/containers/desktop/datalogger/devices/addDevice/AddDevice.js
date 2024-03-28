/********************************************************
* Copyright 2020-2021 NEXT WAVE ENERGY MONITORING INC.
* All rights reserved.
* 
*********************************************************/

import React, { useEffect, useState } from 'react'
import ModalDefault from 'react-bootstrap/Modal';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import useAxiosPrivate from '../../../../../hooks/useAxiosPrivate'

import useAddDevice from './useAddDevice';
import { AddModBusDevice } from './AddModBusDevice';

import Modal from '../../../../../components/modal/Modal';
import Button from '../../../../../components/button/Button';
import Constants from '../../../../../utils/Constants';
import LibToast from '../../../../../utils/LibToast';
import { loginService } from '../../../../../services/loginService';
import AddMultipleDevice from './AddMultipleDevice';
import FormInput from '../../../../../components/formInput/FormInput';
import { createColumnHelper } from '@tanstack/react-table';
import { ReactComponent as ExpandIcon } from "../../../../../assets/images/chevron-down.svg";
import { ReactComponent as CollapseIcon } from "../../../../../assets/images/chevron-up.svg";
import Table from '../../../../../components/table/Table';
import _ from 'lodash';
import MPTTConfigure from './mpttConfigure';

export default function AddDevice(props) {
  const methods = useForm({ mode: "onChange" });
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();

  const { closeAddDevice, deviceConfig } = props;
  const { isAddMultipleDevice, schema, initialValues, setInitialValues, openAddMultipleDevice, closeAddMultipleDevice, setMaxMppt } = useAddDevice();
  const [protocol, setProtocol] = useState({
    Physical: 1,
    Virtual: 0
  });

  const [deviceConfigDropdown, setDeviceConfigDropdown] = useState(null);
  useEffect(() => {
    if (deviceConfig) {
      setTimeout(() => {
        const { device_type, device_group, template, communication } = deviceConfig;
        setDeviceConfigDropdown(() => {
          return {
            deviceType: device_type && device_type.map(item => ({ value: item.id, label: item.name })),
            deviceGroup: [
              {
                label: "Custom",
                options: device_group && device_group.filter(item => item.type === 1)?.map(item => { return { value: item.id, label: item.name, id_device_type: item.id_device_type } })
              },
              {
                label: "Built-in",
                options: device_group && device_group.filter(item => item.type === 0)?.map(item => { return { value: item.id, label: item.name, id_device_type: item.id_device_type } })
              }
            ],
            template: [
              {
                label: "Custom",
                options: template && template.filter(item => item.type === 1)?.map(item => { return { value: { id_template: item.id, id_device_group: item.id_device_group }, label: item.name } })
              },
              {
                label: "Built-in",
                options: template && template.filter(item => item.type === 0)?.map(item => { return { value: { id_template: item.id, id_device_group: item.id_device_group }, label: item.name } })
              },
            ].flat(),
            communicationProtocol: communication && communication.map(item => ({ value: item.id, label: item.name }))
          }
        })
      }, 100);
    }
  }, [deviceConfig, methods]);

  useEffect(() => {
    deviceConfigDropdown && setTimeout(() => {
      let id_communication = deviceConfigDropdown?.communicationProtocol[0] || [];
      let id_device_type = deviceConfigDropdown?.deviceType[0] || [];
      let device_group = deviceConfigDropdown?.deviceGroup.map(item => item.options.filter(item => item.id_device_type === id_device_type?.value))[0][0] || null;
      let id_template = deviceConfigDropdown?.template.map(item => item.options.filter(item => item.value.id_device_group === device_group[0]?.value))[0][0] || null;
      setInitialValues({
        ...initialValues,
        id_communication: id_communication,
        id_device_type: id_device_type,
        device_group: device_group,
        id_template: id_template
      })
    }, 100);
  }, [deviceConfigDropdown]);

  const handleSave = (data) => {
    let body = {
      ...data,
      id_communication: data.id_communication?.value,
      id_device_type: data.id_device_type?.value,
      id_template: data.id_template?.value.id_template,
      mppt: data.mppt.map(item => {
        return {
          id: item.id,
          id_pointkey: item.id_pointkey,
          string: item.subRows.map(item => {
            return {
              id: item.id,
              id_pointkey: item.id_pointkey,
              panel: item.subRows.map(item => {
                return {
                  id: item.id,
                  id_pointkey: item.id_pointkey
                }
              })
            }
          }).flat()
        }
      })
    }
    delete body.device_group;
    delete body.mptt_count;
    const output = document.getElementById("progress");
    output.innerHTML = "<div><img src='/loading.gif' /></div>";
    setTimeout(async () => {
      try {
        const response = await axiosPrivate.post(Constants.API_URL.DEVICES.CREATE, body, {
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
  };

  const footer = <div>
    <Button variant="dark" type="submit" formId="addDeviceForm" >
      <Button.Text text="Add" />
    </Button>
    <Button
      variant="dark" className="ms-3"
      onClick={() => {
        // let data = methods.getValues();
        // let isValid = true;
        // Object.entries(data).forEach(([key, value]) => {
        //   if (!isValid) return;
        //   if (selectedCommunicationProtocol?.label.search(/RS485/g) === -1) {
        //     const allowedKeys = ["device_virtual", "in_mode", "add_count"];
        //     if (!value && !allowedKeys.includes(key)) {
        //       LibToast.toast(`Please fill in ${key.replace("_", " ").toUpperCase()}`, "error");
        //       isValid = false;
        //     }
        //   } else {
        //     const allowedKeys = ["tcp_gateway_ip", "tcp_gateway_port", "device_virtual", "in_mode", "add_count"];
        //     if (!value && !allowedKeys.includes(key)) {
        //       LibToast.toast(`Please fill in ${key.replace("_", " ").toUpperCase()}`, "error");
        //       isValid = false;
        //     }
        //   }
        // });
        // if (isValid) {
        //   methods.setValue("in_mode", 1);
        //   openAddMultipleDevice()
        // }
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

  const [mpttTemplate, setMpttTemplate] = useState();
  useEffect(() => {
    initialValues?.id_template ? setTimeout(async () => {
      try {
        const response = await axiosPrivate.post(Constants.API_URL.TEMPLATE.GET_MPTT, { id_template: initialValues?.id_template?.value?.id_template });
        if (response.data.length === 0) return;
        setMaxMppt(response.data.mppt.length);
        setInitialValues({ ...initialValues, mptt_count: response.data.mppt.length })
        let data = response.data.mppt.map(item => {
          return {
            ...item,
            status: 1,
            subRows: item.string,
            name: item.name + " (" + item.string.length + " strings)",
          }
        });
        data = data.map(item => {
          return {
            ...item,
            subRows: item.subRows.map(item => {
              return {
                ...item,
                status: 1,
                subRows: item.panel.map(item => {
                  return {
                    ...item,
                    status: 1,
                  }
                }),
                name: item.name + " (" + item.panel.length + " panels)",
              }
            })
          }
        });

        setMpttTemplate(data);
      } catch (error) {
        console.log(error);
      }
    }, 100)
      : setTimeout(() => {
        setMpttTemplate([]);
      }, 100);
  }, [initialValues?.id_template]);

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
          {/* <ModalDefault show={isAddMultipleDevice} style={{ top: '100px' }} onHide={() => closeAddMultipleDevice()}>
            <ModalDefault.Header style={{ backgroundColor: "#383434", color: "#fff" }}>Add Multiple Device</ModalDefault.Header>
            <ModalDefault.Body >
              <AddMultipleDevice handleSave={handleSave} closeAddMultipleDevice={closeAddMultipleDevice} />
            </ModalDefault.Body>
          </ModalDefault> */}

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
            <div>Select Device's communication protocol</div>
            <div className='d-flex my-2'>
              <div className='col-xl-4 col-md-4'>
                <div>
                  <FormInput.Check
                    label="RS485"
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
                  value={initialValues?.id_device_type}
                  option={deviceConfigDropdown?.deviceType}
                  onChange={(e) => {
                    let device_group = deviceConfigDropdown?.deviceGroup.map(item => item.options.filter(item => item.id_device_type === e?.value))[0][0];
                    let id_template = deviceConfigDropdown?.template.map(item => item.options.filter(item => item.value.id_device_group === device_group[0]?.value))[0][0];
                    setInitialValues({ ...initialValues, id_device_type: e, device_group: device_group, id_template: id_template })
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
                        let option = item.options.filter(item => item.id_device_type === initialValues.id_device_type?.value);
                        return {
                          label: item.label,
                          options: option
                        };
                      })}
                      onChange={(e) => {
                        let id_template = deviceConfigDropdown?.template.map(item => item.options.filter(item => item.value.id_device_group === e?.value))[0][0];
                        setInitialValues({ ...initialValues, device_group: e, id_template: id_template })
                      }}
                    />
                  </div>
                </div>
                {initialValues?.id_template ?
                  <div className='col-xl-6 col-md-6 col-sm-6'>
                    <div className='form_dropdown'>
                      <FormInput.Select
                        label="Template Library"
                        className="template_library"
                        name="id_template"
                        value={initialValues?.id_template}
                        option={deviceConfigDropdown?.template.map(item => {
                          let option = item.options.filter(item => item.value.id_device_group === initialValues.device_group?.value);
                          return {
                            label: item.label,
                            options: option
                          };
                        })}
                        onChange={(e) => setInitialValues({ ...initialValues, id_template: e })}
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
            mpttTemplate && mpttTemplate.length > 0 &&
            <MPTTConfigure initialValues={initialValues} dataTemplate={mpttTemplate} setDataTemplate={setMpttTemplate} setInitialValues={setInitialValues} />
          }
        </div>
      </Modal>
    </FormInput>
  )
}
