import Button from "../../../../../components/button/Button";
import Table from "../../../../../components/table/Table";
import FormInput from "../../../../../components/formInput/FormInput";
import useError from "./useError";
import EditAlarmModal from "./editErrorModal/EditAlarmModal";
import { ReactComponent as ViewIcon } from "../../../../../assets/images/eye_view.svg";
import { ReactComponent as DeleteIcon } from "../../../../../assets/images/delete.svg";
import { ReactComponent as EditIcon } from "../../../../../assets/images/edit.svg";

function Alarm() {
    const { columns, errorList, total, setLimit, setOffset, isModalOpen, closeModal, error, setError, handleErrorEdit, point } = useError();

    return (
        <div>
            <Table
                variant="grey"
                maxHeight="calc(100vh - 300px)"
                pagination={{
                    enable: true,
                    total,
                    setLimit,
                    setOffset
                }}
                columns={columns}
                data={errorList}
                enable_switch={item => (
                    <FormInput.Check
                        type="switch"
                        name={item.id}
                        checked={item.enable}
                        onChange={() => {}}
                    />
                )}
                action={item => (
                    <div className="d-flex flex-wrap justify-content-center gap-2">
                        <Button.Image
                            image={<ViewIcon />}
                        />
                        <Button.Image
                            image={<DeleteIcon />}
                        />
                        <Button.Image
                            onClick={() => handleErrorEdit(item)}
                            image={<EditIcon />}
                        />
                    </div>
                )}
            />

            <EditAlarmModal
                isOpen={isModalOpen}
                close={closeModal}
                data={point}
            />

            <Button
                className="mt-3 ms-auto d-block"
                onClick={() => handleErrorEdit({})}
            >
                <Button.Text text="Add Error"/>
            </Button>
        </div>
    );
}

export default Alarm;