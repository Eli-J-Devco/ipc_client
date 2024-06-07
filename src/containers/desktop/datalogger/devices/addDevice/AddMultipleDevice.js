import { useEffect, useState } from "react";
import Button from "../../../../../components/button/Button";
import FormInput from "../../../../../components/formInput/FormInput";
import Constants from "../../../../../utils/Constants";

const AddMultipleDevice = ({
  initialValues,
  setInitialValues,
  schema,
  closeAddMultipleDevice,
  handleSave,
  deviceType,
  comunicationType,
}) => {
  const [addMode, setAddMode] = useState();
  const [selectedAddMode, setSelectedAddMode] = useState({});

  useEffect(() => {
    setAddMode([
      ...(comunicationType.indexOf("Com") !== -1
        ? [
            {
              value: 1,
              label: "Network address",
            },
          ]
        : []),
      { value: 2, label: "Bus address" },
    ]);
  }, []);

  useEffect(() => {
    if (!addMode) return;

    setSelectedAddMode(addMode[0]);
    setInitialValues({ ...initialValues, inc_mode: addMode[0].value });
  }, [addMode]);

  return (
    <FormInput
      id="addMultiple"
      initialValues={initialValues}
      validationSchema={schema}
      onSubmit={(data) => handleSave(data)}
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
        />

        {deviceType.indexOf(Constants.COMMON.SPECIAL_DEVICE_TYPE) === -1 && (
          <FormInput.Select
            label="Increase Mode"
            className="inc_mode"
            inputId="inc_mode"
            inputName="inc_mode"
            name="inc_mode"
            option={addMode}
            value={selectedAddMode}
            onChange={(item) => {
              setTimeout(() => {
                setSelectedAddMode(item);
                setInitialValues({ ...initialValues, inc_mode: item.value });
              }, 100);
            }}
            required={true}
            isSearchable={false}
          />
        )}

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
      </div>
    </FormInput>
  );
};
export default AddMultipleDevice;
