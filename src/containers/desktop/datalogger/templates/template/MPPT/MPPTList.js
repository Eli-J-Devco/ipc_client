import { useEffect, useState } from "react";
import Button from "../../../../../../components/button/Button";
import Table from "../../../../../../components/table/Table";
import EditMPPTModal from "./editMPPTModal/EditMPPTModal";
import useMPPTList from "./useMPPTList";
import Modal from "../../../../../../components/modal/Modal";

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
        resetTemp
    } = useMPPTList();

    const [confirmDelete, setConfirmDelete] = useState(false);
    return (
        <div>
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
            <Button className="m-3" onClick={() => addNewMPPT()}>
                <Button.Text text="Add New MPPT" />
            </Button>
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

                    <Button className="mt-3" onClick={() => setConfirmDelete(true)}>
                        <Button.Text text="Delete Selected Points" />
                    </Button>
                </>
            }
            <Button className="ms-3 mt-3" variant="white" onClick={() => resetTemp()}>
                <Button.Text text="Cancel" />
            </Button>
        </div>
    );
}

export default MPPTList;