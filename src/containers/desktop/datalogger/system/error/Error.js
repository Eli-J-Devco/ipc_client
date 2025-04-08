import Button from "../../../../../components/button/Button";
import Table from "../../../../../components/table/Table";
import FormInput from "../../../../../components/formInput/FormInput";
import useError from "./useError";
import ErrorModal from "./errorModal/ErrorModal";
import { ReactComponent as ViewIcon } from "../../../../../assets/images/eye_view.svg";
import { ReactComponent as DeleteIcon } from "../../../../../assets/images/delete.svg";
import { ReactComponent as EditIcon } from "../../../../../assets/images/edit.svg";
import Filter from "./filter/Filter";


function Error() {
    const { 
        columns,
        isModalOpen,
        isExpand, handleIsExpand,
        openModal, closeModal,
        errorList, setErrorList, 
        total, 
        setLimit, 
        setOffset, 
        error, setError,
        deviceGroups,
        templates,
        points,
        errorLevels,
        errorTypes,
        errorComparisons,
        formSubmit, setFormSubmit,
        action,
        handleEditError,
        handleAddError,
        handleDeleteError,
     } = useError();

    return (
        <div>
            <Filter
                isExpand={isExpand}
                onExpand={handleIsExpand}
            />
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
                data={errorList && errorList.length ? errorList.sort((a, b) => b.id - a.id) : []}
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
                        onClick={() => handleDeleteError(item)}
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
                action={action}
                isOpen={isModalOpen}
                close={closeModal}
                data={error}
                setData={setError}
                dataList={errorList}
                setDataList={setErrorList}
                deviceGroups={deviceGroups}
                templates={templates}
                points={points}
                errorLevels={errorLevels}
                errorTypes={errorTypes}
                errorComparisons={errorComparisons}
                formSubmit={formSubmit}
                setFormSubmit={setFormSubmit}
            />

            <Button
                className="mt-3 ms-auto d-block"
                onClick={handleAddError}
            >
                <Button.Text text="Add Error"/>
            </Button>
        </div>
    );
}

export default Error;