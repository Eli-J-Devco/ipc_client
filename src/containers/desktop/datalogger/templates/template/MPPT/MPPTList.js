import Button from "../../../../../../components/button/Button";
import FormInput from "../../../../../../components/formInput/FormInput";
import Table from "../../../../../../components/table/Table";
import { useTemplate } from "../useTemplate";
import EditMPPTModal from "./editMPPTModal/EditMPPTModal";
import useMPPTList from "./useMPPTList";

function MPPTList() {
    const { columns, pointList, isModalOpen, closeModal, handlePointEdit, point } = useMPPTList();

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
                columns={{ columnDefs: columns }}
                data={pointList}
            />

            <EditMPPTModal
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

export default MPPTList;