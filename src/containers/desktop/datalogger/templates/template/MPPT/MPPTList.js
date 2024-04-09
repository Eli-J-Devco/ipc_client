import { useEffect, useState } from "react";
import Button from "../../../../../../components/button/Button";
import Table from "../../../../../../components/table/Table";
import EditMPPTModal from "./editMPPTModal/EditMPPTModal";
import useMPPTList from "./useMPPTList";
import Modal from "../../../../../../components/modal/Modal";
import FormInput from "../../../../../../components/formInput/FormInput";

function MPPTList() {
    const {
        columns,
        pointList,
        isModalOpen,
        closeModal,
        updatePoint,
        point,
        rowSelection,
        setRowSelection,
        addNewMPPT,
        removePoint,
        resetTemp,
        isChangedMPPT,
        addNewMPPTInit,
        addNewMPPTSchema,
        isClone,
        setIsClone,
    } = useMPPTList();

    const [confirmDelete, setConfirmDelete] = useState(false);
    const [confirmUpdate, setConfirmUpdate] = useState(false);
    const [addNewMPPTModal, setAddNewMPPTModal] = useState(false);


    return (
        <div>
            {
                addNewMPPTModal &&
                <Modal
                    isOpen={addNewMPPTModal}
                    close={() => setAddNewMPPTModal(false)}
                    title="Add New MPPT"
                    footer={
                        <div>
                            <Button className="me-3" onClick={() => setAddNewMPPTModal(false)}>
                                <Button.Text text="Cancel" />
                            </Button>
                            <Button className="ms-3" type="submit" formId="addNewMPPT">
                                <Button.Text text="Save" />
                            </Button>
                        </div>
                    }
                >
                    <div>
                        <FormInput
                            id="addNewMPPT"
                            initialValues={addNewMPPTInit}
                            validationSchema={addNewMPPTSchema}
                            onSubmit={(values) => {
                                addNewMPPT(values)
                                setAddNewMPPTModal(false)
                            }}
                        >
                            <div>
                                <FormInput.Text
                                    className={`d-inline-block ${pointList.length <= 0 && "w-100"}`}
                                    label="Number of MPPT"
                                    name="num_of_mppt"
                                    type="number"
                                    required={true}
                                />
                                {
                                    pointList.length > 0 &&
                                    <FormInput.Check
                                        className="d-inline-block ms-3"
                                        label="Clone from last MPPT"
                                        name="is_clone_last_mppt"
                                        checked={isClone}
                                        onChange={() => setIsClone(!isClone)}
                                    />
                                }
                            </div>
                            {
                                (!isClone || pointList.length <= 0) &&
                                <>
                                    <FormInput.Text
                                        label="Number of String per MPPT"
                                        name="num_of_string"
                                        type="number"
                                        required={true}
                                    />
                                    <FormInput.Text
                                        label="Number of Panel per String"
                                        name="num_of_panel"
                                        type="number"
                                        required={true}
                                    />
                                </>
                            }
                        </FormInput>
                    </div>
                </Modal>
            }
            {
                confirmDelete &&
                <Modal
                    isOpen={confirmDelete}
                    close={() => setConfirmDelete(false)}
                    title="Delete Selected Points"
                    footer={
                        <div>
                            <Button className="me-3" onClick={() => setConfirmDelete(false)}>
                                <Button.Text text="No" />
                            </Button>
                            <Button className="ms-3" onClick={() => {
                                removePoint()
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
            <div className="m-2">
                <div className="d-inline-block">
                    <Button onClick={() => setAddNewMPPTModal(true)}>
                        <Button.Text text="Add New MPPT" />
                    </Button>
                </div>
                {
                    isChangedMPPT &&
                    <div className="d-inline-block float-end">
                        <Button onClick={() => setConfirmUpdate(true)}>
                            <Button.Text text="Save all changes" />
                        </Button>
                    </div>
                }
            </div>
            {
                pointList.length > 0 &&
                <>
                    <Table
                        visible
                        resizable
                        draggable
                        maxHeight="calc(100vh - 400px)"
                        columns={{ columnDefs: columns }}
                        data={pointList}
                        selectRow={{
                            enable: false,
                            rowSelection: rowSelection,
                            setRowSelection: setRowSelection
                        }}
                    />

                    {
                        isModalOpen &&
                        <EditMPPTModal
                            isOpen={isModalOpen}
                            close={closeModal}
                            data={point}
                            setPoint={(newPoint) => {
                                updatePoint(newPoint);
                            }}
                        />
                    }
                    {
                        Object.keys(rowSelection).length > 0 &&
                        <Button className="mt-3" onClick={() => setConfirmDelete(true)}>
                            <Button.Text text="Delete Selected Points" />
                        </Button>
                    }
                </>
            }
            {
                isChangedMPPT &&
                <Button className="ms-3 mt-3" variant="white" onClick={() => resetTemp()}>
                    <Button.Text text="Cancel" />
                </Button>
            }
        </div>
    );
}

export default MPPTList;