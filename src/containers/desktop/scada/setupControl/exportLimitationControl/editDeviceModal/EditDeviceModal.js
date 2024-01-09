import React from 'react'
import Modal from '../../../../../../components/modal/Modal'
import Button from '../../../../../../components/button/Button'
import FormInput from '../../../../../../components/formInput/FormInput'
import styles from './EditDeviceModal.module.scss'
import DatePicker from '../../../../../../components/datePicker/DatePicker'
import useEditDeviceModal from './useEditDeviceModal'


function EditDeviceModal({ isOpen, close, data }) {
  const { date, handleOnDateChange } = useEditDeviceModal
  return (
    <Modal
            isOpen={isOpen}
            close={close}
            size="lg"
            title={`${data.name_and_purpose} - Control - Manual Mode`} 
            footer={
                <>
                    <Button
                        type="submit"
                        formId="point-configuration-form"
                        className="m-0"
                    >
                        <Button.Text text="Save"/>
                    </Button>

                    <Button
                        variant="white"
                        className="m-0 ms-3"
                    >
                        <Button.Text text="Cancel"/>
                    </Button>
                </>
            }
        >
        <div className='row'>
          <div className='col-md-4'>
          <FormInput
                id="left-form"
                onSubmit={values => console.log(values)}
                initialValues={data}
            >
                <FormInput.Text
                    label="ID"
                    name="id"
                    className="my-2"
                />
    
                <FormInput.Text
                    label="Name and Purpose"
                    name="name_and_purpose"
                    className="my-2"
                />

                <FormInput.Select
                    label="Mode"
                    name="mode"
                    className="my-2"
                    placeholder={data.mode}
                />

                <FormInput.Select
                    label="Type"
                    name="type"
                    className="my-2"
                    placeholder="Inverter"
                />

                <FormInput.Select
                    label="Function"
                    name="function"
                    className="my-2"
                    placeholder={data.function}
                />

                <FormInput.Text
                    label="PV"
                    name="pv"
                    className="my-2"
                />

                <FormInput.Check
                    type="switch"
                    label="Enable"
                    name="status"
                    className="my-2"
                    checked={1}
                />
            </FormInput>
          </div>
          <div className='col-md-8'>
            <div className={styles.check_all}>
              <FormInput.Check
                  name={`all_inverter`}
                  label="Applied for all inverters of the same type"
                  inline
                  // checked={1}
              />
            </div>

            <div className='mt-3'>
              <fieldset className={styles.fieldset}>
                  <legend className={styles.legend}>
                      Control
                  </legend>

                  <div >
                    <div className='row'>
                      <FormInput
                        id="alarm-form"
                        onSubmit={values => console.log(values)}
                        initialValues={data}
                    >
                      <div className='row'>
                        <div className='col-md-4'>
                          <FormInput.Select
                          label="PointP"
                          name="pointP"
                          className="my-2"
                          placeholder="pt0"
                          />
                        </div>
                        <div className='col-md-4'>
                          <FormInput.Text
                            label="ValueP"
                            name="valueP"
                            className="my-2"
                        />
                        </div>
                        <div className='col-md-4'>
                          <div className='mt-2'>
                            <div>SendP</div>
                            <FormInput.Check
                              type="switch"
                              name="sendP"
                              className="my-2"
                              checked={1}
                          />
                          </div>
                        </div>
                      </div>
                      
                      </FormInput>
                    </div>
                    
                    <div className='row'>
                      <FormInput
                          id="alarm-form"
                          onSubmit={values => console.log(values)}
                          initialValues={data}
                      >
                        <div className='row'>
                          <div className='col-md-4'>
                            <FormInput.Select
                            label="PointQ"
                            name="pointQ"
                            className="my-2"
                            placeholder="pt0"
                            />
                          </div>
                          <div className='col-md-4'>
                            <FormInput.Text
                              label="ValueQ"
                              name="valueQ"
                              className="my-2"
                          />
                          </div>
                          <div className='col-md-4'>
                            <div className='mt-2'>
                              <div>SendQ</div>
                              <FormInput.Check
                                type="switch"
                                name="sendQ"
                                className="my-2"
                                checked={1}
                            />
                            </div>
                          </div>
                        </div>
                        
                        </FormInput>
                    </div>

                    <div className='row'>
                      <FormInput
                          id="alarm-form"
                          onSubmit={values => console.log(values)}
                          initialValues={data}
                      >
                        <div className='row'>
                          <div className='col-md-4'>
                            <FormInput.Select
                            label="PointPF"
                            name="pointPF"
                            className="my-2"
                            placeholder="pt0"
                            />
                          </div>
                          <div className='col-md-4'>
                            <FormInput.Text
                              label="ValuePF"
                              name="valuePF"
                              className="my-2"
                          />
                          </div>
                          <div className='col-md-4'>
                            <div className='mt-2'>
                              <div>SendPF</div>
                              <FormInput.Check
                                type="switch"
                                name="sendPF"
                                className="my-2"
                                checked={1}
                            />
                            </div>
                          </div>
                        </div>
                        
                        </FormInput>
                    </div>

                    <div className='row'>
                      <FormInput
                          id="alarm-form"
                          onSubmit={values => console.log(values)}
                          initialValues={data}
                      >
                        <div className='row'>
                          <div className='col-md-4'>
                            <FormInput.Select
                            label="Point Power Limit Enable"
                            name="point_power_limit_enable"
                            className="my-2"
                            placeholder="pt0"
                            />
                          </div>
                          <div className='col-md-4'></div>
                          <div className='col-md-4'>
                            <div className='mt-2'>
                              <div>SendPL</div>
                              <FormInput.Check
                                type="switch"
                                name="sendPL"
                                className="my-2"
                                checked={1}
                            />
                            </div>
                          </div>
                        </div>
                        
                        </FormInput>
                    </div>

                    <div className='row'>
                      <FormInput
                          id="alarm-form"
                          onSubmit={values => console.log(values)}
                          initialValues={data}
                      >
                        <div className='row'>
                          <div className='col-md-4'>
                            <FormInput.Text
                              label="Max (%)"
                              name="max"
                              className="my-2"
                          />
                          </div>
                          <div className='col-md-4'>
                            <FormInput.Text
                              label="Allowed Error (%)"
                              name="error"
                              className="my-2"
                          />
                          </div>
                          <div className='col-md-4'></div>
                        </div>
                        
                        </FormInput>
                    </div>
                  </div>

              </fieldset>
            </div>
            
            <div className='mt-3'>
              <fieldset className={styles.fieldset}>
                  <legend className={styles.legend}>
                      Power off
                  </legend>

                  <div className='row'>
                    <div className='col-md-4'>
                        <div>Enable</div>
                        <FormInput.Check
                          type="switch"
                          name="sendPL"
                          className="my-2"
                          checked={1}
                      />
                    </div>

                    <div className='col-md-8'>
                      <div>Inverter shutdown</div>
                      <DatePicker
                          dateFormat="MM/dd/yyyy hh:mm"
                          selected={date}
                          onChange={handleOnDateChange}
                      />
                    </div>
                  </div>
              </fieldset>
            </div>
          </div>
        </div>

        </Modal>
  )
}

export default EditDeviceModal