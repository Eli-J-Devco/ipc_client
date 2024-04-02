import Button from "../../../../../../components/button/Button";
import FormInput from "../../../../../../components/formInput/FormInput";
import Table from "../../../../../../components/table/Table";
import useRegisterBlocks from "./useRegisterBlocks";

function RegisterBlocks() {
    const { columns, registerList, functionList } = useRegisterBlocks();

    return registerList.length > 0 && functionList.length > 0 && (
        <FormInput id="registerBlocksForm" initialValues={{ num_of_registers: registerList.length }}>
            <div>
                <div className="d-flex mb-3">
                    <FormInput.Text
                        label="Number of registers:"
                        name="num_of_registers"
                        className="mx-3"
                        horizontal
                        type="number"
                    />

                    <Button className="mx-3">
                        <Button.Text text="Change Number of Registers" />
                    </Button>
                </div>
                <Table
                    maxHeight="600px"
                    columns={columns}
                    data={registerList}
                    id_checkbox={item => (
                        <FormInput.Check
                            inline
                            name={item.id}
                            label={`Block ${item.index}`}
                        />
                    )}
                    addr={item => (
                        <FormInput.Text
                            name={item.id}
                            horizontal
                            value={item.addr}
                            type="number"
                            onChange={(e) => console.log(e)}
                        />
                    )}
                    count={item => (
                        <FormInput.Text
                            name={item.id}
                            horizontal
                            value={item.count}
                            type="number"
                            onChange={(e) => console.log(e)}
                        />
                    )}
                    function_select={item => (
                        <FormInput.Select
                            name={item.id}
                            isSearchable={false}
                            value={item.function_select}
                            option={functionList}
                            onChange={(e) => console.log(e)}
                        />
                    )}
                />

                <Button className="mt-3">
                    <Button.Text text="Apply" />
                </Button>

                <Button className="mt-3 ms-3" variant="white">
                    <Button.Text text="Cancel" />
                </Button>
            </div>
        </FormInput>
    );
}

export default RegisterBlocks;