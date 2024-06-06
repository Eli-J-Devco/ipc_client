import Button from "../../../../../components/button/Button";
import FormInput from "../../../../../components/formInput/FormInput";
import Modal from "../../../../../components/modal/Modal";
import useUpdateDevice from "./useUpdateDevice";
import DatePicker from "../../../../../components/datePicker/DatePicker";

export default function UpdateDevice({ isShow, closeUpdateDevice }) {
  const {
    device,
    schema,
    mode,
    setMode,
    enablePowerOff,
    setEnablePowerOff,
    inverterShutdown,
    setInverterShutdown,
    handleUpdateDevice,
  } = useUpdateDevice();

  return (
    <Modal
      isOpen={isShow}
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
      size="lg"
    >
      <div className="container">
        <FormInput
          initialValues={device}
          validationSchema={schema}
          onSubmit={handleUpdateDevice}
          id="updateDevice"
        >
          <div className="row">
            <div className="col-sm-8 col-md-6 col-lg-4">
              <FormInput.Text
                label="Device name"
                name="name"
                placeholder="Device name"
                className="mb-3"
                required={true}
                horizontal
              />
            </div>
            <div className="col-sm-8 col-md-6 col-lg-4">
              <FormInput.Text
                name="device_type"
                placeholder="Device type"
                required={true}
                disabled={true}
              />
            </div>
          </div>
          {device?.device_type.indexOf("Inverter") !== -1 && (
            <>
              <div className="row mb-2 mt-2">
                <div className="col-sm-8 col-md-6 col-lg-4 mb-2">
                  <div>Mode:</div>
                  <div className="row align-items-center">
                    <div className="col-sm-8 col-md-6 col-lg-5 col-4">
                      <FormInput.Check
                        label="Manual"
                        name="manual_mode"
                        type="radio"
                        checked={mode === 1}
                        onChange={() => setMode(1)}
                      />
                    </div>
                    <div className="col-sm-8 col-md-6 col-lg-5 col-4">
                      <FormInput.Check
                        label="Auto"
                        name="auto_mode"
                        type="radio"
                        checked={mode === 0}
                        onChange={() => setMode(0)}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-sm-8 col-md-6 col-lg-4 mb-2">
                  <FormInput.Switch
                    label="Enable Power Off"
                    name="enable_poweroff"
                    checked={enablePowerOff}
                    onChange={() => setEnablePowerOff(!enablePowerOff)}
                  />
                  <DatePicker
                    label="Poweroff Time"
                    name="inverter_shutdown"
                    required={true}
                    selected={inverterShutdown}
                    onChange={(date) => setInverterShutdown(date)}
                    disabled={!enablePowerOff}
                    minDate={new Date()}
                    maxDate={
                      new Date(
                        new Date().setFullYear(new Date().getFullYear() + 1)
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
                device?.device_type.indexOf("Inverter") !== -1 &&
                device?.driver_type.search(/RS485/g) === -1
                  ? "col-sm-8 col-md-6 col-lg-4"
                  : "col-12"
              }
            >
              <FormInput.Text
                label="RTU Bus-Address"
                name="rtu_bus_address"
                type="number"
                required={true}
              />
              {device?.driver_type.search(/RS485/g) === -1 && (
                <>
                  <FormInput.Text
                    label="MB/TCP Gateway Port"
                    name="tcp_gateway_port"
                    type="number"
                    required={true}
                  />
                  <FormInput.Text
                    label="MB/TCP Gateway IP-Address"
                    name="tcp_gateway_ip"
                    required={true}
                  />
                </>
              )}
            </div>
            {device?.device_type.indexOf("Inverter") !== -1 && (
              <>
                <div
                  className={
                    device?.driver_type.search(/RS485/g) === -1
                      ? "col-sm-8 col-md-6 col-lg-4"
                      : "col-6"
                  }
                >
                  <FormInput.Text
                    label="Rated power"
                    name="rated_power"
                    required={true}
                    type="number"
                  />
                  <FormInput.Text
                    label="Custom rated power"
                    name="rated_power_custom"
                    required={true}
                    type="number"
                  />
                  <FormInput.Text
                    label="Min watt (%)"
                    name="min_watt_in_percent"
                    required={true}
                    type="number"
                  />
                </div>
                <div
                  className={
                    device?.driver_type.search(/RS485/g) === -1
                      ? "col-sm-8 col-md-6 col-lg-4"
                      : "col-6"
                  }
                >
                  <FormInput.Text
                    label="DC voltage"
                    name="DC_voltage"
                    required={true}
                    type="number"
                  />
                  <FormInput.Text
                    label="DC current"
                    name="DC_current"
                    required={true}
                    type="number"
                  />
                  <FormInput.Text
                    label="Efficiency"
                    name="efficiency"
                    required={true}
                    type="number"
                  />
                </div>
              </>
            )}
          </div>
        </FormInput>
      </div>
    </Modal>
  );
}
