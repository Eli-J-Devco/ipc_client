import Button from "../../../../../components/button/Button";
import FormInput from "../../../../../components/formInput/FormInput";
import Modal from "../../../../../components/modal/Modal";
import useUpdateDevice from "./useUpdateDevice";
import DatePicker from "../../../../../components/datePicker/DatePicker";
import { AddComponents } from "../addDevice/AddComponents";
import _ from "lodash";

export default function UpdateDevice({ closeUpdateDevice }) {
  const {
    initialValues,
    schema,
    mode,
    setMode,
    enablePowerOff,
    setEnablePowerOff,
    inverterShutdown,
    setInverterShutdown,
    handleUpdateDevice,
    haveComponents,
    addingComponents,
    setAddingComponents,
    device,
  } = useUpdateDevice();
  return (
    <Modal
      isOpen={true}
      close={closeUpdateDevice}
      title="Update Device"
      footer={
        <>
          <Button variant="white" onClick={closeUpdateDevice}>
            <Button.Text text="Cancel" />
          </Button>
          <Button variant="dark" type="submit" formId="updateDevice">
            <Button.Text text="Update" />
          </Button>
        </>
      }
      size="xl"
    >
      <div className="container">
        <FormInput
          initialValues={initialValues}
          validationSchema={schema}
          onSubmit={handleUpdateDevice}
          id="updateDevice"
        >
          <div className="row">
            <div className="col-sm-12 col-md-6">
              <FormInput.Text
                label="Device name"
                name="name"
                placeholder="Device name"
                className="mb-3"
                required={true}
                horizontal
              />
            </div>
            <div className="col-sm-6 col-md-3 col-6">
              <FormInput.Text
                name="device_type"
                placeholder="Device type"
                title="Device type"
                required={true}
                disabled={true}
                className="mb-3"
              />
            </div>
            <div className="col-sm-6 col-md-3 col-6">
              <FormInput.Text
                name="template"
                placeholder="Template"
                title="Template"
                required={true}
                disabled={true}
              />
            </div>
          </div>
          {device.device_type.type !== 1 && (
            <>
              {initialValues?.device_type &&
                initialValues?.device_type.indexOf("Inverter") !== -1 && (
                  <>
                    <div className="row mb-2 mt-2">
                      <div className="col-sm-6 col-lg-4 col-12">
                        <div>Mode:</div>
                        <div className="row align-items-center">
                          <div className="col-sm-6 col-4">
                            <FormInput.Check
                              label="Manual"
                              name="manual_mode"
                              type="radio"
                              checked={mode === 0}
                              onChange={() => setMode(0)}
                            />
                          </div>
                          <div className="col-sm-6 col-4">
                            <FormInput.Check
                              label="Auto"
                              name="auto_mode"
                              type="radio"
                              checked={mode === 1}
                              onChange={() => setMode(1)}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-sm-6 col-lg-8 col-12">
                        <FormInput.Switch
                          label="Enable Power Off"
                          name="enable_poweroff"
                          checked={enablePowerOff}
                          onChange={() => setEnablePowerOff(!enablePowerOff)}
                        />
                        <DatePicker
                          className="z-index-1000"
                          label="Poweroff Time"
                          name="inverter_shutdown"
                          required={true}
                          selected={inverterShutdown}
                          onChange={(date) => setInverterShutdown(date)}
                          disabled={!enablePowerOff}
                          minDate={new Date().setDate(new Date().getDate() + 1)}
                          maxDate={
                            new Date(
                              new Date().setFullYear(
                                new Date().getFullYear() + 1
                              )
                            )
                          }
                          showMonthDropdown={true}
                          showYearDropdown={true}
                          // onKeyDown={(e) => e.preventDefault()}
                        />
                      </div>
                    </div>
                  </>
                )}
              <div className="row">
                <div
                  className={
                    initialValues?.device_type &&
                    initialValues?.driver_type &&
                    initialValues?.device_type?.indexOf("Inverter") !== -1 &&
                    initialValues?.driver_type?.search(/RS485/g) === -1
                      ? "col-sm-12 col-md-6 col-lg-4"
                      : null
                  }
                >
                  <FormInput.Text
                    label="RTU Bus-Address"
                    name="rtu_bus_address"
                    type="number"
                    required={true}
                    className={`${
                      initialValues?.driver_type?.search(/RS485/g) !== -1 &&
                      "col-4"
                    } mb-2`}
                    onKeyDown={(evt) =>
                      ["e", "E", "+", "-"].includes(evt.key) &&
                      evt.preventDefault()
                    }
                  />
                  {initialValues?.driver_type &&
                    initialValues?.driver_type?.search(/TCP/g) !== -1 && (
                      <>
                        <FormInput.Text
                          label="MB/TCP Gateway Port"
                          name="tcp_gateway_port"
                          type="number"
                          required={true}
                          className={`${
                            initialValues?.driver_type?.search(/RS485/g) !==
                              -1 && "col-4"
                          } mb-2`}
                          onKeyDown={(evt) =>
                            ["e", "E", "+", "-"].includes(evt.key) &&
                            evt.preventDefault()
                          }
                        />
                        <FormInput.Text
                          label="MB/TCP Gateway IP-Address"
                          name="tcp_gateway_ip"
                          required={true}
                          className={`${
                            initialValues?.driver_type?.search(/RS485/g) !==
                              -1 && "col-4"
                          } mb-2`}
                        />
                      </>
                    )}
                </div>
                {initialValues?.device_type &&
                  initialValues?.device_type.indexOf("Inverter") !== -1 && (
                    <>
                      <div
                        className={
                          initialValues?.driver_type &&
                          initialValues?.driver_type?.search(/RS485/g) === -1
                            ? "col-sm-12 col-md-6 col-lg-4"
                            : "col-6"
                        }
                      >
                        <FormInput.Text
                          className="mb-2"
                          label="Rated power"
                          name="rated_power"
                          required={true}
                          type="number"
                        />
                        <FormInput.Text
                          className="mb-2"
                          label="Custom rated power"
                          name="rated_power_custom"
                          required={true}
                          type="number"
                        />
                        <FormInput.Text
                          className="mb-2"
                          label="Min watt (%)"
                          name="min_watt_in_percent"
                          required={true}
                          type="number"
                        />
                      </div>
                      <div
                        className={
                          initialValues?.driver_type &&
                          initialValues?.driver_type?.search(/RS485/g) === -1
                            ? "col-sm-12 col-md-6 col-lg-4"
                            : "col-6"
                        }
                      >
                        <FormInput.Text
                          className="mb-2"
                          label="DC voltage"
                          name="DC_voltage"
                          required={true}
                          type="number"
                        />
                        <FormInput.Text
                          className="mb-2"
                          label="DC current"
                          name="DC_current"
                          required={true}
                          type="number"
                        />
                        <FormInput.Text
                          className="mb-2"
                          label="Efficiency"
                          name="efficiency"
                          required={true}
                          type="number"
                        />
                      </div>
                    </>
                  )}
              </div>
            </>
          )}
          {!_.isEmpty(addingComponents) && (
            <AddComponents
              haveComponents={haveComponents}
              addingComponents={addingComponents}
              setAddingComponents={setAddingComponents}
              isUpdateDevice={true}
            />
          )}
        </FormInput>
      </div>
    </Modal>
  );
}
