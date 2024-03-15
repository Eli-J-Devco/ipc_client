import { Tooltip } from "react-tooltip";
import { RTextForm } from "../../../../../components/Controls";
import ReactSelectDropdown from "../../../../../components/ReactSelectDropdown";
import { useFormContext } from "react-hook-form";
import { useEffect, useState } from "react";
import Button from "../../../../../components/button/Button";

const AddMultipleDevice = ({ handleSave, closeAddMultipleDevice }) => {
    const { setValue } = useFormContext();
    const [addMode, setAddMode] = useState();
    const [selectedAddMode, setSelectedAddMode] = useState({ value: 1, label: "Network address" });

    useEffect(() => {
        setAddMode([{ value: 1, label: "Network address" }, { value: 2, label: "Bus address" }]);
        setValue("in_mode", selectedAddMode?.value);

    }, []);
    return (
        <div className='my-3'>
            <div className='col-md-6'>
                <RTextForm
                    label="How many to add?"
                    inputClass="form-control"
                    inputId="add_count"
                    inputName="add_count"
                    name="add_count"
                    valueAsNumber={true}
                    type="number"
                    required={{ value: true, message: "Please enter a number" }}
                    pattern={{ value: /^\d+$/, message: "Invalid number" }}
                    min={{ value: 2, message: "Number must be greater than 1" }}
                    max={{ value: 20, message: "Number must be less than 20" }}
                    info="2-20"
                />
                <Tooltip id="my-tooltip" />
            </div>

            <div className='col-md-6 form_dropdown'>
                <ReactSelectDropdown
                    label="When adding, increment"
                    className="in_mode"
                    inputId="in_mode"
                    inputName="in_mode"
                    name="in_mode"
                    value={selectedAddMode}
                    onChange={(e) => {
                        setTimeout(() => {
                            setSelectedAddMode(e);
                            setValue("in_mode", e.value);
                        }, 100);
                    }}
                    optionList={addMode}
                />
            </div>

            <div className='mt-5 mb-2'>
                <Button variant="dark" onClick={() => handleSave()}>
                    <Button.Text text="Add" />
                </Button>
                <Button variant="grey" className="ms-3" onClick={() => closeAddMultipleDevice()}>
                    <Button.Text text="Cancel" />
                </Button>
            </div>
        </div>
    );
};
export default AddMultipleDevice;