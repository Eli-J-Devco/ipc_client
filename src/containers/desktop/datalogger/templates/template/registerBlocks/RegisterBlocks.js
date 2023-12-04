import Button from "../../../../../../components/button/Button";
import FormInput from "../../../../../../components/formInput/FormInput";
import Table from "../../../../../../components/table/Table";
import useRegisterBlocks from "./useRegisterBlocks";

function RegisterBlocks() {
    const { columns, registerList } = useRegisterBlocks();

    return (
        <div>
            <Table
                maxHeight="600px"
                columns={columns}
                data={registerList}
                id_checkbox={item => (
                    <FormInput.Check
                        inline
                        name={item.id}
                        label={`Block ${item.id}`}
                    />
                )}
                address_input={item => (
                    <FormInput.Text
                        name={item.id}
                        horizontal
                    />
                )}
                count_input={item => (
                    <FormInput.Text
                        name={item.id}
                        horizontal
                    />
                )}
                function_select={item => (
                    <FormInput.Select
                        name={item.id}
                        isSearchable={false}
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
    );
}

export default RegisterBlocks;