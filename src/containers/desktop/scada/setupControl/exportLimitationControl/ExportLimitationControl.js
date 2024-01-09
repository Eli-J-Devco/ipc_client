import React from 'react'
import FormInput from "../../../../../components/formInput/FormInput";
import styles from './ExportLimitationControl.module.scss'
import Table from '../../../../../components/table/Table';
import { ReactComponent as ViewIcon } from "../../../../../assets/images/eye_view.svg";
import { ReactComponent as EditIcon } from "../../../../../assets/images/edit.svg";
import Button from '../../../../../components/button/Button';
import { RSwitch } from '../../../../../components/Controls';
import useExportLimitationControl from './useExportLimitationControl';
import EditDeviceModal from './editDeviceModal/EditDeviceModal';


function ExportLimitationControl() {
  const {  total, setLimit, setOffset, handleConfigDevice, device, isModalOpen, closeModal, handleAutoMode, autoMode } = useExportLimitationControl();

  const data = [
    {id: 1, name_and_purpose: "INV 01", pv: "16", max: 90, error: 2, mode: "Manual", inverter_shutdown: "08/27/2023 10:05", function: "V1", point_power_limit_enable: "pt3", pointP: "pt0", valueP: 50, pointQ: "pt1", valueQ: 25, pointPF: "pt2", valuePF: "0.9"  },
    {id: 2, name_and_purpose: "INV 02", pv: "16", max: 90, error: 2, mode: "Manual", inverter_shutdown: "08/27/2023 10:05", function: "V1", point_power_limit_enable: "pt3", pointP: "pt0", valueP: 50, pointQ: "pt1", valueQ: 25, pointPF: "pt2", valuePF: "0.9"  },
    {id: 3, name_and_purpose: "INV 03", pv: "16", max: 90, error: 2, mode: "Manual", inverter_shutdown: "08/27/2023 10:05", function: "V1", point_power_limit_enable: "pt3", pointP: "pt0", valueP: 50, pointQ: "pt1", valueQ: 25, pointPF: "pt2", valuePF: "0.9"  },
    {id: 4, name_and_purpose: "INV 04", pv: "16", max: 90, error: 2, mode: "Manual", inverter_shutdown: "08/27/2023 10:05", function: "V1", point_power_limit_enable: "pt3", pointP: "pt0", valueP: 50, pointQ: "pt1", valueQ: 25, pointPF: "pt2", valuePF: "0.9"  },
    {id: 5, name_and_purpose: "INV 05", pv: "16", max: 90, error: 2, mode: "Manual", inverter_shutdown: "08/27/2023 10:05", function: "V1", point_power_limit_enable: "pt3", pointP: "pt0", valueP: 50, pointQ: "pt1", valueQ: 25, pointPF: "pt2", valuePF: "0.9"  },
    {id: 6, name_and_purpose: "INV 06", pv: "16", max: 90, error: 2, mode: "Manual", inverter_shutdown: "08/27/2023 10:05", function: "V1", point_power_limit_enable: "pt3", pointP: "pt0", valueP: 50, pointQ: "pt1", valueQ: 25, pointPF: "pt2", valuePF: "0.9"  },
    {id: 7, name_and_purpose: "INV 07", pv: "16", max: 90, error: 2, mode: "Manual", inverter_shutdown: "08/27/2023 10:05", function: "V1", point_power_limit_enable: "pt3", pointP: "pt0", valueP: 50, pointQ: "pt1", valueQ: 25, pointPF: "pt2", valuePF: "0.9"  },
    {id: 8, name_and_purpose: "INV 08", pv: "16", max: 90, error: 2, mode: "Manual", inverter_shutdown: "08/27/2023 10:05", function: "V1", point_power_limit_enable: "pt3", pointP: "pt0", valueP: 50, pointQ: "pt1", valueQ: 25, pointPF: "pt2", valuePF: "0.9"  },
    {id: 9, name_and_purpose: "INV 09", pv: "16", max: 90, error: 2, mode: "Manual", inverter_shutdown: "08/27/2023 10:05", function: "V1", point_power_limit_enable: "pt3", pointP: "pt0", valueP: 50, pointQ: "pt1", valueQ: 25, pointPF: "pt2", valuePF: "0.9"  },
    {id: 10, name_and_purpose: "INV 010", pv: "16", max: 90, error: 2, mode: "Manual", inverter_shutdown: "08/27/2023 10:05", function: "V1", point_power_limit_enable: "pt3", pointP: "pt0", valueP: 50, pointQ: "pt1", valueQ: 25, pointPF: "pt2", valuePF: "0.9"  },
    {id: 11, name_and_purpose: "INV 011", pv: "16", max: 90, error: 2, mode: "Manual", inverter_shutdown: "08/27/2023 10:05", function: "V1", point_power_limit_enable: "pt3", pointP: "pt0", valueP: 50, pointQ: "pt1", valueQ: 25, pointPF: "pt2", valuePF: "0.9"  },
  ]
  const columns = [
    {id: 1, slug: "id", name: "ID", width: 50},
    {id: 2, slug: "name_and_purpose", name: "Name and Purpose", width: 200},
    {id: 3, slug: "pv", name: "PV", width: 50},
    {id: 4, slug: "max", name: "Max(%)", width: 50},
    {id: 5, slug: "error", name: "Error(%)", width: 50},
    {id: 6, slug: "mode", name: "Mode", width: 50},
    {id: 7, slug: "inverter_shutdown", name: "Inverter Shutdown", width: 100},
    {id: 8, slug: "function", name: "Function", width: 50},
    {id: 9, slug: "point_power_limit_enable", name: "Point Power Limit Enable", width: 0},
    {id: 10, slug: "sendPL", name: "SendPL", width: 50},
    {id: 11, slug: "pointP", name: "PointP", width: 50},
    {id: 12, slug: "valueP", name: "ValueP", width: 50},
    {id: 21, slug: "sendP", name: "SendP", width: 50},
    {id: 13, slug: "pointQ", name: "PointQ", width: 50},
    {id: 14, slug: "valueQ", name: "ValueQ", width: 50},
    {id: 15, slug: "sendQ", name: "SendQ", width: 50},
    {id: 16, slug: "pointPF", name: "PointPF", width: 50},
    {id: 17, slug: "valuePF", name: "ValuePF", width: 50},
    {id: 18, slug: "sendPF", name: "SendPF", width: 50},
    {id: 19, slug: "status", name: "Status", width: 50},
    {id: 20, slug: "actions", name: <div className="text-center">Actions</div>, width: 100}
  ]

  const handleInputChange = () => {

  }

  return (
    <div>
      <div className='d-flex'>
        <div className='mx-4'>
          <FormInput.Check
              name={`manual_mode`}
              label="Manual Mode"
              inline
          />
        </div>
        
        <div>
          <FormInput.Check
              name={`auto_mode`}
              label="Auto Mode"
              inline
              onChange={handleAutoMode}
          />
        </div>  
      </div>

      {
        autoMode ? <div className='row'> 
          <div className='col-4'>
            <div className='mt-3'>
                <fieldset className={styles.fieldset}>
                    <legend className={styles.legend}>
                        Power off
                    </legend>

                    <div className='row p-2'>
                      <div className='col-md-4'>
                        <div >Time of 1 cycle</div>
                        <FormInput.Text
                            name="time"
                            className="my-2"
                            unit="Minutes"
                            horizontal
                        />
                      </div>

                      <div className='col-md-5'>
                        <div >Sampling time of 1 cycle</div>
                        <FormInput.Text
                            name="sampling_time"
                            className="my-2"
                            unit="Minutes"
                            horizontal
                        />
                      </div>
                      
                      <div className='col-md-3 my-4 pe-2' style={{textAlign: "end"}}>
                      <Button
                        variant="black"
                    >
                        <Button.Text text="Apply"/>
                    </Button>
                      </div>
                     
                    </div>
                </fieldset>
            </div>
          </div>
          <div className='col-4 d-flex'>
            <div className='col-6 me-4'>
              <div className='mt-3'>
                  <fieldset className={styles.fieldset}>
                      <legend className={styles.legend}>
                          Zero Export
                      </legend>

                      <div className='row px-2 mt-2 mb-4' >
                        <div className='col-8'>
                          <div className="checkmark">
                              <RSwitch
                                  inputId="zero_export"
                                  inputName="zero_export"
                                  checked={1}
                                  onChange={handleInputChange}
                              />
                          </div>
                          <FormInput.Text
                              name="zero_export"
                              className="my-2"
                              placeholder="Zero export"
                          />
                        </div>

                        
                        <div className='col-4 mt-4'>
                        <Button
                          variant="black"
                          >
                          <Button.Text text="Apply"/>
                        </Button>
                        </div>
                      
                      </div>
                  </fieldset>
              </div>
            </div>
            <div className='col-6'>
              <div className='mt-3'>
                  <fieldset className={styles.fieldset}>
                      <legend className={styles.legend}>
                          Limit Energy
                      </legend>
                      
                      <div className='row px-2 mt-2 mb-4' >
                        <div className='col-8'>
                          <div className="checkmark">
                              <RSwitch
                                  inputId="limit_energy"
                                  inputName="limit_energy"
                                  checked={1}
                                  onChange={handleInputChange}
                              />
                          </div>
                          <FormInput.Text
                              name="limit_energy"
                              className="my-2"
                              placeholder="Limit Energy"
                          />
                        </div>

                        
                        <div className='col-4 mt-4'>
                        <Button
                          variant="black"
                          >
                          <Button.Text text="Apply"/>
                        </Button>
                        </div>
                      
                      </div>
                  </fieldset>
              </div>
            </div>
          </div>
          <div className='col-2'>
          </div>
        </div>
        : ""
      }

      <div className='mt-4'>
        <Table columns={columns} data={data}
        control={true}
            pagination={{
              enable: true,
              total: total,
              setLimit: setLimit,
              setOffset: setOffset
          }}
          actions={item => (
            <div className="d-flex flex-wrap justify-content-center">
                <Button.Image
                    image={<ViewIcon />}
                    onClick={() => handleConfigDevice(item)}
                    className="mx-2"
                />
                <Button.Image
                    image={<EditIcon />}
                    onClick={() => handleConfigDevice(item)}
                    className="mx-2"
                />
            </div>
          )}
          sendPL={item => (
            <div className="checkmark">
                <RSwitch
                    inputId="sendPL"
                    inputName="sendPL"
                    checked={1}
                    onChange={handleInputChange}
                />
            </div>
          )}
          sendP={item => (
            <div className="checkmark">
                <RSwitch
                    inputId="sendP"
                    inputName="sendP"
                    checked={1}
                    onChange={handleInputChange}
                />
            </div>
          )}
          sendQ={item => (
            <div className="checkmark">
                <RSwitch
                    inputId="sendQ"
                    inputName="sendQ"
                    checked={1}
                    onChange={handleInputChange}
                />
            </div>
          )}
          sendPF={item => (
            <div className="checkmark">
                <RSwitch
                    inputId="sendPF"
                    inputName="sendPF"
                    checked={1}
                    onChange={handleInputChange}
                />
            </div>
          )}
          status={item => (
            <div className="checkmark">
                <RSwitch
                    inputId="status"
                    inputName="status"
                    checked={1}
                    onChange={handleInputChange}
                />
            </div>
          )}
        />
      </div>
      <EditDeviceModal
          isOpen={isModalOpen}
          close={closeModal}
          data={device}
      />
    </div>
  )
}

export default ExportLimitationControl