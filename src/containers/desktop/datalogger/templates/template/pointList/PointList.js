import Button from "../../../../../../components/button/Button";
import FormInput from "../../../../../../components/formInput/FormInput";
import Table from "../../../../../../components/table/Table";
import { useTemplate } from "../useTemplate";
import EditPointModal from "./editPointModal/EditPointModal";
import usePointList from "./usePointList";

function PointList() {
    const { columns, pointList, isModalOpen, closeModal, handlePointEdit, point } = usePointList();
    const { templateId } = useTemplate();

    return (
        <div>
            <div className="d-flex">
                <FormInput.Text
                    label="Number of Points:"
                    name="num_of_point"
                    className="mx-3"
                    horizontal
                />

                <Button className="mx-3">
                    <Button.Text text="Change Number of Points" />
                </Button>
            </div>

            <Table
                visible
                resizable
                draggable
                maxHeight="calc(100vh - 400px)"
                columns={columns}
                data={pointList}
                action={item => (
                    <div className="text-center">
                        <Button onClick={() => handlePointEdit(item)}>
                            <Button.Text text="Edit" />
                        </Button>
                    </div>
                )}
                id_checkbox={item => (
                    <FormInput.Check
                        inline
                        name={item.name}
                        label={`pt${item.id}`}
                    />
                )}
            />

            <EditPointModal
                isOpen={isModalOpen}
                close={closeModal}
                data={point}
            />

            <Button className="mt-3">
                <Button.Text text="Delete Selected Points" />
            </Button>
        </div>
    );
}

export default PointList;