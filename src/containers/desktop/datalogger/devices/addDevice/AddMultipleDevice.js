import { useEffect, useState } from "react";
import Button from "../../../../../components/button/Button";
import FormInput from "../../../../../components/formInput/FormInput";

const AddMultipleDevice = ({ initialValues, setInitialValues, schema, closeAddMultipleDevice, handleSave }) => {
    const [addMode, setAddMode] = useState();
    const [selectedAddMode, setSelectedAddMode] = useState({ value: 1, label: "Network address" });

    useEffect(() => {
        setAddMode([{ value: 1, label: "Network address" }, { value: 2, label: "Bus address" }]);
    }, []);

    return (
        <FormInput
            id="addMultiple"
            initialValues={initialValues}
            validationSchema={schema}
            onSubmit={(data) => handleSave(data)}
        >
            <div className='my-3'>
                <div className='col-6'>
                    <FormInput.Text
                        label="Number of devices"
                        className="num_of_devices"
                        inputId="num_of_devices"
                        inputName="num_of_devices"
                        name="num_of_devices"
                        placeholder="Enter number of devices"
                        required={true}
                    />
                </div>

                <div className='col-6 form_dropdown'>
                    <FormInput.Select
                        label={"Mode"}
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
                    />
                </div>

                <div className='mt-5 mb-2'>
                    <Button variant="dark" type="submit" formId="addMultiple">
                        <Button.Text text="Add" />
                    </Button>
                    <Button variant="grey" className="ms-3" onClick={() => closeAddMultipleDevice()}>
                        <Button.Text text="Cancel" />
                    </Button>
                </div>
            </div>
        </FormInput>
    );
};
export default AddMultipleDevice;