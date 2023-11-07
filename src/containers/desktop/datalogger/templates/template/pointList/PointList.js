import Button from "../../../../../../components/button/Button";
import Table from "../../../../../../components/table/Table";
import EditPointModal from "./editPointModal/EditPointModal";
import usePointList from "./usePointList";

function PointList() {
    const { columns, pointList, isModalOpen, closeModal, handlePointEdit, point } = usePointList();

    return (
        <div>
            <div>
                <span>Number of Points</span>
                <Button className="ms-3" >
                    <Button.Text text="Change Number of Points" />
                </Button>
            </div>

            <Table
                maxHeight="600px"
                columns={columns}
                data={pointList}
                action={item => (
                    <Button onClick={() => handlePointEdit(item)}>
                        <Button.Text text="Edit" />
                    </Button>
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