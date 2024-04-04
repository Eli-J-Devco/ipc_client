import { useState } from "react";
import Button from "../../../../../../components/button/Button";
import FormInput from "../../../../../../components/formInput/FormInput";
import Table from "../../../../../../components/table/Table";
import EditPointModal from "./editPointModal/EditPointModal";
import usePointList from "./usePointList";
import * as yup from 'yup';
import Modal from "../../../../../../components/modal/Modal";
function PointList() {
    const {
        columns,
        pointList,
        isModalOpen,
        closeModal,
        updatePoint,
        point,
        rowSelection,
        setRowSelection,
        removePoint,
        changePointNumber,
        reset
    } = usePointList();
    const initialValues = {
        num_of_point: pointList?.length || 0
    };
    const schema = yup.object().shape({
        num_of_point: yup.number().required()
    });
    const onChangeNumOfPoint = (values) => {
        changePointNumber(values.num_of_point);
    };
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
            <FormInput id="pointListForm" initialValues={initialValues} validationSchema={schema} onSubmit={onChangeNumOfPoint}>
                <div className="d-flex mb-3">
                    <FormInput.Text
                        label="Number of Points:"
                        name="num_of_point"
                        className="mx-3"
                        horizontal
                        type="number"
                    />

                    <Button className="mx-3" type="submit" formId="pointListForm">
                        <Button.Text text="Change Number of Points" />
                    </Button>
                </div>
            </FormInput>

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
                        <EditPointModal
                            isOpen={isModalOpen}
                            close={closeModal}
                            data={point}
                            setPoint={(newPoint) => updatePoint(newPoint)}
                        />
                    }

                    <Button className="mt-3" onClick={() => setConfirmDelete(true)}>
                        <Button.Text text="Delete Selected Points" />
                    </Button>
                </>
            }
            <Button className="ms-3 mt-3" variant="white" onClick={() => reset()}>
                <Button.Text text="Cancel" />
            </Button>
        </div>
    );
}

export default PointList;