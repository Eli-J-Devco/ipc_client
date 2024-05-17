import { useState } from "react";
import Button from "../../../../../../components/button/Button";
import FormInput from "../../../../../../components/formInput/FormInput";
import Modal from "../../../../../../components/modal/Modal";
import Table from "../../../../../../components/table/Table";
import useRegisterBlocks from "./useRegisterBlocks";
import * as yup from 'yup';

function RegisterBlocks() {
    const {
        columns,
        registerList,
        isSetUp,
        rowSelection,
        setRowSelection,
        changeRegisterNumber,
        removeRegister,
        applyUpdate
    } = useRegisterBlocks();

    const [confirmAdd, setConfirmAdd] = useState(false);
    const [confirmDelete, setConfirmDelete] = useState(false);
    const headerFormInit = {
        num_of_registers: 1
    };
    const headerSchema = yup.object().shape({
        num_of_registers: yup.number().required("Required").min(1, "Minimum 1 register")
    });
    const onChangeNumOfPoint = (values, { resetForm }) => {
        changeRegisterNumber(values.num_of_registers);

        setTimeout(() => {
            resetForm();
            setConfirmAdd(false);
        }, 500);
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
            {
                confirmAdd &&
                <Modal
                    isOpen={confirmAdd}
                    close={() => setConfirmAdd(false)}
                    title="Add Registers"
                    footer={
                        <div>
                            <Button className="me-3" onClick={() => setConfirmAdd(false)}>
                                <Button.Text text="No" />
                            </Button>
                            <Button className="ms-3" type="submit" formId="numOfRegistersForm">
                                <Button.Text text="Yes" />
                            </Button>
                        </div>
                    }
                >
                    <div>
                        <p>Are you sure you want to add new registers?</p>
                    </div>
                </Modal>
            }
            <FormInput className="m-2" id="numOfRegistersForm" initialValues={headerFormInit} validationSchema={headerSchema} onSubmit={onChangeNumOfPoint}>
                <div className="d-inline-block">
                    <FormInput.Text
                        label="Number of Registers:"
                        name="num_of_registers"
                        horizontal
                        type="number"
                    />
                </div>

                <Button className="mx-3 d-inline-block" onClick={() => setConfirmAdd(true)} >
                    <Button.Text text="Add Registers" />
                </Button>
            </FormInput>
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
                        validationSchema={
                            yup.object().shape({
                                ...registerList.reduce((acc, reg) => {
                                    return {
                                        ...acc,
                                        [reg?.addr?.name]: yup.number().required("Required").min(1, "Minimum address is 1").max(65535, "Maximum address is 65535"),
                                        [reg?.count?.name]: yup.number().required("Required").min(0, "Minimum count is 0").max(125, "Maximum count is 125"),
                                        [reg?.function_select?.name]: yup.object().required("Required")
                                    }
                                }, {})
                            })
                        }
                        onSubmit={applyUpdate}
                    >
                        <Table
                            maxHeight="60vh"
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
                        {
                            Object.keys(rowSelection).length > 0 &&
                            <Button
                                className="mt-3 ms-3"
                                onClick={() => setConfirmDelete(true)}
                            >
                                <Button.Text text="Delete selected Registers" />
                            </Button>
                        }

                    </FormInput>
                }

            </div>
        </>
    );
}

export default RegisterBlocks;