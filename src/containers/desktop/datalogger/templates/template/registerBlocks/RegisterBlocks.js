import { useEffect, useState } from "react";
import Button from "../../../../../../components/button/Button";
import FormInput from "../../../../../../components/formInput/FormInput";
import Modal from "../../../../../../components/modal/Modal";
import Table from "../../../../../../components/table/Table";
import useRegisterBlocks from "./useRegisterBlocks";
import * as yup from 'yup';
import { useTemplate } from "../useTemplate";

function RegisterBlocks() {
    const {
        columns,
        registerList,
        isSetUp,
        rowSelection,
        setRowSelection,
        changeRegisterNumber,
        resetRegisterList,
        removeRegister,
        temporarySave
    } = useRegisterBlocks();

    const {
        isChanged,
    } = useTemplate();

    const [confirmDelete, setConfirmDelete] = useState(false);
    const headerFormInit = {
        num_of_registers: registerList?.length || 0
    };
    const headerSchema = yup.object().shape({
        num_of_registers: yup.number().required()
    });
    const onChangeNumOfPoint = (values) => {
        changeRegisterNumber(values.num_of_registers);
    };


    return (
        <>
            {
                confirmDelete &&
                <Modal
                    isOpen={confirmDelete}
                    close={() => setConfirmDelete(false)}
                    title="Delete Selected Registers"
                    footer={
                        <div>
                            <Button className="me-3" onClick={() => setConfirmDelete(false)}>
                                <Button.Text text="No" />
                            </Button>
                            <Button className="ms-3" onClick={() => {
                                removeRegister()
                                setConfirmDelete(false)
                            }}>
                                <Button.Text text="Yes" />
                            </Button>
                        </div>
                    }
                >
                    <div>
                        <p>Are you sure you want to delete the selected points?</p>
                    </div>
                </Modal>
            }
            <div>
                <FormInput id="numOfRegistersForm" initialValues={headerFormInit} validationSchema={headerSchema} onSubmit={onChangeNumOfPoint}>
                    <div className="d-flex mb-3">
                        <FormInput.Text
                            label="Number of Registers:"
                            name="num_of_registers"
                            className="mx-3"
                            horizontal
                            type="number"
                        />

                        <Button className="mx-3" type="submit" formId="numOfRegistersForm">
                            <Button.Text text="Change Number of Registers" />
                        </Button>
                        <Button
                            className="mx-3"
                            variant="white"
                            onClick={() => resetRegisterList()}
                            disabled={!isChanged.register}
                        >
                            <Button.Text text="Cancel" />
                        </Button>
                    </div>
                </FormInput>
            </div>
            <div>

                {
                    !isSetUp && registerList.length > 0 &&
                    <FormInput
                        id="registerBlocksForm"
                        initialValues={
                            registerList.map(reg => {
                                return {
                                    [reg?.addr?.name]: reg?.addr?.value,
                                    [reg?.count?.name]: reg?.count?.value,
                                    [reg?.function_select?.name]: reg?.function_select?.value
                                }
                            }).reduce((acc, reg) => {
                                return {
                                    ...acc,
                                    ...reg
                                }
                            })}
                        onSubmit={temporarySave}
                    >
                        <Table
                            maxHeight="600px"
                            columns={{ columnDefs: columns }}
                            data={registerList}
                            selectRow={
                                {
                                    enable: false,
                                    rowSelection: rowSelection,
                                    setRowSelection: setRowSelection
                                }
                            }
                        />
                        <Button className="mt-3" type="submit" formId="registerBlocksForm">
                            <Button.Text text="Apply" />
                        </Button>
                        <Button
                            className="mt-3 ms-3"
                            onClick={() => setConfirmDelete(true)}
                        >
                            <Button.Text text="Delete selected Registers" />
                        </Button>

                    </FormInput>
                }

            </div>
        </>
    );
}

export default RegisterBlocks;