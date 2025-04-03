import Button from "../../../../../components/button/Button";
import Table from "../../../../../components/table/Table";
import FormInput from "../../../../../components/formInput/FormInput";
import useError from "./useError";
import ErrorModal from "./errorModal/ErrorModal";
import { ReactComponent as ViewIcon } from "../../../../../assets/images/eye_view.svg";
import { ReactComponent as DeleteIcon } from "../../../../../assets/images/delete.svg";
import { ReactComponent as EditIcon } from "../../../../../assets/images/edit.svg";

function Error() {
    const { 
        columns,
        isModalOpen,
        openModal, closeModal,
        errorList, setErrorList, 
        total, 
        setLimit, 
        setOffset, 
        error, setError,
        handleEditError
     } = useError();

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
                            onClick={() => handleEditError(item)}
                            image={<EditIcon />}
                        />
                    </div>
                )}
            />

            <ErrorModal
                isOpen={isModalOpen}
                close={closeModal}
                data={error}
                setData={setError}
                dataList={errorList}
                setDataList={setErrorList}
            />

            <Button
                className="mt-3 ms-auto d-block"
                onClick={openModal}
            >
                <Button.Text text="Add Error"/>
            </Button>
        </div>
    );
}

export default Error;