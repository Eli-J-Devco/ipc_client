import Button from "../../../../../components/button/Button";
import ModalDefault from "react-bootstrap/Modal";
import FormInput from "../../../../../components/formInput/FormInput";
import Modal from "../../../../../components/modal/Modal";
import useUpdateDevice from "./useUpdateDevice";
import DatePicker from "../../../../../components/datePicker/DatePicker";
import { useState } from "react";
import { AddComponentsModal } from "../addDevice/AddComponentsModal";
import Table from "../../../../../components/table/Table";
import _ from "lodash";

export default function UpdateDevice({ isShow, closeUpdateDevice }) {
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
    device,
    deviceConfigDropdown,
    addingComponents,
    setAddingComponents,
    columns,
  } = useUpdateDevice();
  const [isOpenAddComponents, setIsOpenAddComponents] = useState(false);
  const [components, setComponents] = useState({
    deviceTypes: [],
    deviceGroups: [],
    templates: [],
  });
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
          {haveComponents && (
            <Button
              variant="dark"
              onClick={() => {
                let deviceTypes = haveComponents.component
                  .filter((item) => {
                    if (item.sub_type !== null) {
                      return (
                        item.sub_type === device?.inverter_type ||
                        item.sub_type === device?.meter_type
                      );
                    }

                    return true;
                  })
                  .map((item) => ({
                    label: item.name,
                    value: item.component,
                    type: item.type,
                  }));
                setIsOpenAddComponents(true);
                setComponents({
                  deviceTypes:
                    deviceTypes.length > 1
                      ? deviceTypes.reduce((acc, item) => {
                          let output = [];
                          if (typeof acc[Symbol.iterator] !== "function")
                            output.push(acc);
                          else output = acc;

                          if (
                            !output.find(
                              (element) => element.value === item.value
                            )
                          ) {
                            output.push(item);
                          }
                          return output;
                        })
                      : deviceTypes,
                  deviceGroups: deviceConfigDropdown.deviceGroup,
                  templates: deviceConfigDropdown.template,
                  existedComponents: addingComponents,
                });
              }}
            >
              <Button.Text text="Update components" />
            </Button>
          )}
          <Button variant="dark" type="submit" formId="updateDevice">
            <Button.Text text="Update" />
          </Button>
        </>
      }
      size="xl"
    >
      {isOpenAddComponents && (
        <ModalDefault
          show={isOpenAddComponents}
          style={{ top: "100px" }}
          onHide={() => setIsOpenAddComponents(false)}
          size="lg"
        >
          <ModalDefault.Header
            style={{ backgroundColor: "#383434", color: "#fff" }}
          >
            Add Components
          </ModalDefault.Header>
          <ModalDefault.Body>
            <AddComponentsModal
              close={() => setIsOpenAddComponents(false)}
              components={components}
              setComponents={(data) => setAddingComponents(data)}
            />
          </ModalDefault.Body>
        </ModalDefault>
      )}
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
                initialValues?.device_type &&
                initialValues?.driver_type &&
                initialValues?.device_type.indexOf("Inverter") !== -1 &&
                initialValues?.driver_type.search(/RS485/g) === -1
                  ? "col-sm-12 col-md-6 col-lg-4"
                  : null
              }
            >
              <FormInput.Text
                label="RTU Bus-Address"
                name="rtu_bus_address"
                type="number"
                required={true}
                className={
                  initialValues?.driver_type.search(/RS485/g) !== -1 && "col-4"
                }
              />
              {initialValues?.driver_type &&
                initialValues?.driver_type.search(/TCP/g) !== -1 && (
                  <>
                    <FormInput.Text
                      label="MB/TCP Gateway Port"
                      name="tcp_gateway_port"
                      type="number"
                      required={true}
                      className={
                        initialValues?.driver_type.search(/RS485/g) !== -1 &&
                        "col-4"
                      }
                    />
                    <FormInput.Text
                      label="MB/TCP Gateway IP-Address"
                      name="tcp_gateway_ip"
                      required={true}
                      className={
                        initialValues?.driver_type.search(/RS485/g) !== -1 &&
                        "col-4"
                      }
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
                      initialValues?.driver_type.search(/RS485/g) === -1
                        ? "col-sm-12 col-md-6 col-lg-4"
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
                      initialValues?.driver_type &&
                      initialValues?.driver_type.search(/RS485/g) === -1
                        ? "col-sm-12 col-md-6 col-lg-4"
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
          {!_.isEmpty(addingComponents) && (
            <div className="note mt-3">
              <div>Components:</div>
              <Table
                variant="light"
                maxHeight="30vh"
                columns={columns}
                data={addingComponents.map((item) => ({
                  id: item.device.value.id,
                  name: item.device.label,
                  template: item.template.label,
                  device_group: item.device_group.label,
                  device_type: item.device_type.label,
                }))}
              />
            </div>
          )}
        </FormInput>
      </div>
    </Modal>
  );
}
