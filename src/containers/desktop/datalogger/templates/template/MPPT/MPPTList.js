import Button from "../../../../../../components/button/Button";
import Table from "../../../../../../components/table/Table";
import EditMPPTModal from "./editMPPTModal/EditMPPTModal";
import useMPPTList from "./useMPPTList";

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

    return pointList.length > 0 && (
        <div>
            <Button className="m-3" onClick={() => addNewMPPT()}>
                <Button.Text text="Add New MPPT" />
            </Button>

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

            <Button className="mt-3" onClick={() => removePoint()}>
                <Button.Text text="Delete Selected Points" />
            </Button>
            <Button className="ms-3 mt-3" onClick={() => resetTemp()}>
                <Button.Text text="Reset" />
            </Button>
        </div>
    );
}

export default MPPTList;