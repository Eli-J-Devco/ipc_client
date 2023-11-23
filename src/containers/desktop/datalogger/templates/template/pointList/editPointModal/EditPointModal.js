import Button from "../../../../../../../components/button/Button";
import FormInput from "../../../../../../../components/formInput/FormInput";
import Modal from "../../../../../../../components/modal/Modal";
import styles from "./EditPointModal.module.scss";
import useEditPointModal from "./useEditPointModal";

function EditPointModal({ isOpen, close, data }) {
    const { modbusConfig, setModbusConfig, modbusRegisterType, setModbusRegisterType, validationSchema } = useEditPointModal();
    
    return (
        <Modal
            isOpen={isOpen}
            close={close}
            size="xl"
            title="Edit Point"
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
                        variant="grey"
                        className="m-0 ms-3"
                    >
                        <Button.Text text="Cancel"/>
                    </Button>
                </>
            }
        >
            <FormInput
                id="point-configuration-form"
                onSubmit={values => console.log(values)}
                initialValues={data}
                validationSchema={validationSchema}
            >
                <div className="row my-2">
                    <div className="col-4">
                        <FormInput.Text
                            label="Point Identifier:"
                            name="id"
                        />
                    </div>
                </div>
            
                <div className="row my-2">
                    <div className="col-4">
                        <FormInput.Text
                            label="Point Label:"
                            name="name"
                        />
                    </div>

                    <div className="col-4">
                    </div>

                    <div className="col-4 align-self-end">
                        <FormInput.Check
                            name="check_name"
                            label="allow per-meter edit"
                        />
                    </div>
                </div>
            
                <div className="row my-2">
                    <div className="col-4">
                        <FormInput.Text
                            label="Point Unit:"
                            name="unit"
                        />
                    </div>
                    
                    <div className="col-1 align-self-end text-center mb-1">
                        &larr;
                    </div>

                    <div className="col-3 align-self-end">
                        <FormInput.Select
                            isSearchable={false}
                            isClearable={true}
                        />
                    </div>

                    <div className="col-4 align-self-end">
                        <FormInput.Check
                            name="check_unit"
                            label="allow per-meter edit"
                        />
                    </div>
                </div>

                <div className={`my-2 p-2 ${styles.title}`}>
                    <FormInput.Check
                        type="radio"
                        name="modbus_register"
                        label="Modbus Register"
                        inline
                        checked={modbusConfig === 1}
                        onChange={() => setModbusConfig(1)}
                    />

                    <FormInput.Check
                        type="radio"
                        name="equation"
                        label="Equation"
                        inline
                        checked={modbusConfig === 2}
                        onChange={() => setModbusConfig(2)}
                    />
                </div>

                {
                    modbusConfig === 1 &&
                    <div className={`my-2 p-2 ${styles.title}`}>
                        <FormInput.Check
                            type="radio"
                            label="Input"
                            name="input"
                            inline
                            checked={modbusRegisterType === 1}
                            onChange={() => setModbusRegisterType(1)}
                        />

                        <FormInput.Check
                            type="radio"
                            name="relay_output"
                            label="Relay Output"
                            inline
                            checked={modbusRegisterType === 2}
                            onChange={() => setModbusRegisterType(2)}
                        />

                        <FormInput.Check
                            type="radio"
                            name="numeric_output"
                            label="Numeric Output"
                            inline
                            checked={modbusRegisterType === 3}
                            onChange={() => setModbusRegisterType(3)}
                        />
                    </div>
                }

                {
                    modbusConfig === 1 &&
                    <>
                        <div className="row my-2">
                            <div className="col-4">
                                <FormInput.Text
                                    label="Register Address:"
                                    name="reg"
                                />
                            </div>
                            
                            <div className="col-2 align-self-end mb-1 fst-italic">
                                e.g: 40001
                            </div>
                        </div>

                        <div className="row my-2">
                            <div className="col-4">
                                <FormInput.Select
                                    label="Data Format:"
                                    name="data_type"
                                    isSearchable={false}
                                />
                            </div>
                        </div>

                        <div className="row my-2">
                            <div className="col-4">
                                <FormInput.Select
                                    label="Byte Order:"
                                    name="byte_order"
                                    isSearchable={false}
                                />
                            </div>
                        </div>

                        <div className="row my-2">
                            <div className="col-4">
                                <FormInput.Text
                                    label={`"Invalid" Bit Pattern:`}
                                    name="invalid"
                                />
                            </div>
                            
                            <div className="col-4 align-self-end mb-1">
                                =65535 / 65535 / 0xffff
                            </div>

                            <div className="col-4 align-self-end">
                                <FormInput.Check
                                    name="check_invalid"
                                    label="enabled"
                                />
                            </div>
                        </div>
                    </>
                }

                <div className={`my-2 p-2 text-center fw-bold ${styles.title} ${styles.light}`}>
                    Scale & Offset
                </div>

                {
                    modbusConfig === 1 &&
                    <>
                        <div className="row my-2">
                            <div className="col-4">
                                <FormInput.Text
                                    name="slope"
                                    label="Slope:"
                                />
                            </div>
                            
                            <div className="col-4 align-self-end mb-1 fst-italic">
                                multiply by constant
                            </div>

                            <div className="col-4 align-self-end">
                                <FormInput.Check
                                    name="check_slope"
                                    label="enabled"
                                />
                            </div>
                        </div>

                        <div className="row my-2">
                            <div className="col-4">
                                <FormInput.Text
                                    name="offset"
                                    label="Offset:"
                                />
                            </div>
                            
                            <div className="col-4 align-self-end mb-1 fst-italic">
                                then add constant
                            </div>

                            <div className="col-4 align-self-end">
                                <FormInput.Check
                                    name="check_offset"
                                    label="enabled"
                                />
                            </div>
                        </div>
                    </>
                }

                {
                    modbusConfig === 1 && modbusRegisterType === 1 &&
                    <div className="row my-2">
                        <div className="col-4">
                            <FormInput.Text
                                name="mult_reg"
                                label="Multiplier:"
                            />
                        </div>
                    
                        <div className="col-4 align-self-end mb-1 fst-italic">
                            multiply by UINT16 register, e.g.: 40002
                        </div>

                        <div className="col-4 align-self-end">
                            <FormInput.Check
                                name="check_mult_reg"
                                label="enabled"
                            />
                        </div>
                    </div>
                }

                {
                    modbusConfig === 1 && modbusRegisterType === 2 &&
                    <div className="row my-2">
                        <div className="col-4">
                            <FormInput.Text
                                textarea
                                name="output_values"
                                label="Output Values:"
                            />
                        </div>
                    
                        <div className="col-8 align-self-end fst-italic">
                            Enter Name:Value for each possible value of this Output
                            <br />
                            Read more about Output Values
                            <br />
                            Example 1:
                            <br />
                            ON:1
                            <br />
                            OFF:0
                            <br />
                            Example 2:Start:0xAA
                        </div>
                    </div>
                }

                {
                    modbusConfig === 1 && modbusRegisterType === 3 &&
                    <>
                        <div className="row my-2">
                            <div className="col-4">
                                <FormInput.Text
                                    name="output_min_value"
                                    label="Output Min Value:"
                                />
                            </div>
                        
                            <div className="col-8 align-self-end fst-italic">
                                Read more about these values
                                <br/>
                                Minimum value user may enter for this Output
                            </div>
                        </div>

                        <div className="row my-2">
                            <div className="col-4">
                                <FormInput.Text
                                    name="output_max_value"
                                    label="Output Max Value:"
                                />
                            </div>
                        
                            <div className="col-8 align-self-end mb-1 fst-italic">
                                Maximum value user may enter for this Output
                            </div>
                        </div>

                        <div className="row my-2">
                            <div className="col-4">
                                <FormInput.Text
                                    name="output_step_size"
                                    label="Output Step Size:"
                                />
                            </div>
                        
                            <div className="col-8 align-self-end mb-1 fst-italic">
                                Round value to nearest Min+N*Step value
                            </div>
                        </div>
                    </>
                }

                {
                    modbusConfig === 2 &&
                    <div className="row my-2">
                        <div className="col-4">
                            <FormInput.Text
                                textarea
                                name="equation"
                                label="Equation:"
                            />
                        </div>
                    
                        <div className="col-4 align-self-end mb-1 fst-italic">
                            Help with equations
                        </div>

                        <div className="col-4">
                            <FormInput.Check
                                name="check_equation"
                                label="allow per-meter edit"
                            />
                        </div>
                    </div>
                }
            </FormInput>
        </Modal>
    );
}

export default EditPointModal;