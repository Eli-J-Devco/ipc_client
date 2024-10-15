import { useMemo } from "react";
import Button from "../../../../../components/button/Button";
import FormInput from "../../../../../components/formInput/FormInput";
import Modal from "../../../../../components/modal/Modal";
import * as yup from "yup";
const AddMultipleDevice = ({
  addMultipleDeviceInformation,
  setAddMultipleDeviceInformation,
  closeAddMultipleDevice,
  deviceType,
  comunicationType,
  onSubmit,
}) => {
  const addMode = useMemo(
    () => [
      ...(comunicationType.indexOf("Com") === -1
        ? [
            {
              value: 1,
              label: "Network address",
            },
          ]
        : []),
      { value: 2, label: "Bus address" },
    ],
    [comunicationType]
  );
  const schema = yup.object().shape({
    num_of_devices: yup
      .number()
      .integer("Number of devices must be an integer")
      .required("Number of devices is required")
      .min(1, "Number of devices must be greater than 0")
      .max(100, "Number of devices must be less than 100"),
    inc_mode: yup.object().required("Increase Mode is required"),
  });

  return (
    <Modal
      isOpen={true}
      close={closeAddMultipleDevice}
      title="Add Multiple Device"
      size="md"
      footer={
        <div className="mt-3 mb-2">
          <Button variant="dark" type="submit" formId="addMultiple">
            <Button.Text text="Add" />
          </Button>
          <Button
            variant="grey"
            className="ms-3"
            onClick={() => closeAddMultipleDevice()}
          >
            <Button.Text text="Cancel" />
          </Button>
        </div>
      }
    >
      <FormInput
        id="addMultiple"
        initialValues={addMultipleDeviceInformation}
        validationSchema={schema}
        onSubmit={onSubmit}
      >
        <div className="m-3">
          <FormInput.Text
            label="Number of devices"
            className="num_of_devices"
            inputId="num_of_devices"
            inputName="num_of_devices"
            name="num_of_devices"
            placeholder="Enter number of devices"
            required={true}
            type="number"
            value={addMultipleDeviceInformation?.num_of_devices}
            onChange={(e) => {
              setTimeout(() => {
                setAddMultipleDeviceInformation({
                  ...addMultipleDeviceInformation,
                  num_of_devices: e,
                });
              }, 100);
            }}
          />

          {deviceType === 0 && (
            <FormInput.Select
              label="Increase Mode"
              className="inc_mode"
              inputId="inc_mode"
              inputName="inc_mode"
              name="inc_mode"
              option={addMode}
              value={addMultipleDeviceInformation.inc_mode}
              onChange={(e) => {
                setTimeout(() => {
                  setAddMultipleDeviceInformation({
                    ...addMultipleDeviceInformation,
                    inc_mode: e,
                  });
                }, 100);
              }}
              required={true}
              isSearchable={false}
            />
          )}
        </div>
      </FormInput>
    </Modal>
  );
};
export default AddMultipleDevice;
