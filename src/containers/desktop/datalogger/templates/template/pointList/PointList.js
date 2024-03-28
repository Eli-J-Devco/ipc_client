import Button from "../../../../../../components/button/Button";
import FormInput from "../../../../../../components/formInput/FormInput";
import Table from "../../../../../../components/table/Table";
import { useTemplate } from "../useTemplate";
import EditPointModal from "./editPointModal/EditPointModal";
import usePointList from "./usePointList";
import * as yup from 'yup';
function PointList() {
    const { columns, pointList, isModalOpen, closeModal, handlePointEdit, point } = usePointList();
    const initialValues = {
        num_of_point: pointList?.length || 0
    };
    const schema = yup.object().shape({
        num_of_point: yup.number().required()
    });
    return (
        <FormInput id="pointListForm" initialValues={initialValues} validationSchema={schema}>
            <div>
                <div className="d-flex">
                    <FormInput.Text
                        label="Number of Points:"
                        name="num_of_point"
                        className="mx-3"
                        horizontal
                        type="number"
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
                    columns={{ columnDefs: columns }}
                    data={pointList}
                />

                <EditPointModal
                    isOpen={isModalOpen}
                    close={closeModal}
                    data={point}
                />

                <Button className="mt-3" type="submit" formId="pointListForm">
                    <Button.Text text="Delete Selected Points" />
                </Button>
            </div>
        </FormInput>
    );
}

export default PointList;