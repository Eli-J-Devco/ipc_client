import { useEffect, useState } from "react";
import Button from "../../../../../../../components/button/Button";
import FormInput, { FormInputEnum } from "../../../../../../../components/formInput/FormInput";
import Modal from "../../../../../../../components/modal/Modal";
import Table from "../../../../../../../components/table/Table";
import useAddPointModal, { ADD_POINT_ACTION } from "./useAddPointModal";

export default function AddPointModal({ addChildrenModal, setAddChildrenModal }) {
    const {
        pointList,
        addTypes,
        selectedAddType,
        setSelectedAddType,
        isClone,
        setIsClone,
        columns,
        rowSelection,
        setRowSelection,
        refreshTable,
    } = useAddPointModal(addChildrenModal);

    const [modal, setModal] = useState(null);

    useEffect(() => {
        setModal(Object.keys(addChildrenModal).map((key, index) => {
            let item = addChildrenModal[key];
            return (
                item.isOpen && (
                    <Modal
                        key={index}
                        isOpen={item.isOpen}
                        close={() =>
                            setAddChildrenModal({
                                ...addChildrenModal,
                                [key]: { ...item, isOpen: false },
                            })
                        }
                        title={`Add ${key}`}
                        footer={
                            <div>
                                <Button
                                    className="me-3"
                                    variant="white"
                                    onClick={() =>
                                        setAddChildrenModal({
                                            ...addChildrenModal,
                                            [key]: { ...item, isOpen: false },
                                        })
                                    }
                                >
                                    <Button.Text text="Cancel" />
                                </Button>
                                {
                                    !item?.isReachedLimit &&
                                    <Button className="ms-3" type="submit" formId={key}>
                                        <Button.Text text="Save" />
                                    </Button>
                                }
                            </div>
                        }
                        size="lg"
                    >
                        {
                            item.isReachedLimit ?
                                <div>
                                    <p>
                                        You have reached the limit of adding points. Please remove some points before adding new points.
                                    </p>
                                </div>
                                :
                                <div>
                                    <FormInput
                                        id={key}
                                        initialValues={item.initialValues}
                                        validationSchema={item.validationSchema}
                                        onSubmit={(values) => {
                                            setTimeout(() => {
                                                item.onSubmit({
                                                    ...values,
                                                    id_control_group: item.id,
                                                    is_clone_from_last: isClone,
                                                    selected_points: Object.keys(rowSelection).map((key) => pointList[key]),
                                                });
                                                setAddChildrenModal({
                                                    ...addChildrenModal,
                                                    [key]: {
                                                        ...item,
                                                        isOpen: false,
                                                    },
                                                });
                                            }, 100);
                                        }}
                                    >
                                        <div>
                                            {
                                                item.fields.map((field, index) => {
                                                    switch (field.enum) {
                                                        case FormInputEnum.Select.type:
                                                            field.isShow = true;
                                                            break;
                                                        case FormInputEnum.Check.type:
                                                            field.isShow = item?.hasChildren && selectedAddType.value === ADD_POINT_ACTION.ADD_NEW;
                                                            break;
                                                        default:
                                                            field.isShow = selectedAddType.value === ADD_POINT_ACTION.ADD_NEW;
                                                    }

                                                    return field?.isShow && (
                                                        FormInputEnum[field.enum].component({
                                                            ...field,
                                                            key: index,
                                                            ...(
                                                                field.enum === FormInputEnum.Select.type ?
                                                                    {
                                                                        value: selectedAddType,
                                                                        option: addTypes,
                                                                        onChange: (value) => setSelectedAddType(value),
                                                                    } :
                                                                    {}
                                                            ),
                                                            ...(
                                                                field.enum === FormInputEnum.Check.type ?
                                                                    {
                                                                        checked: isClone,
                                                                        onChange: () => setIsClone(!isClone),
                                                                    } :
                                                                    {}
                                                            )
                                                        }
                                                        ));
                                                }
                                                )}
                                        </div>
                                        {
                                            selectedAddType.value === 1 && (
                                                <div className="mt-3">
                                                    <h5>Existed points:</h5>
                                                    <p className="note">Remaining slot: {item?.remainingSlots}</p>

                                                    {
                                                        !refreshTable &&
                                                        <Table
                                                            className="mt-3"
                                                            visible
                                                            maxHeight="40vh"
                                                            columns={{ columnDefs: columns }}
                                                            data={pointList}
                                                            selectRow={{
                                                                enable: false,
                                                                rowSelection: rowSelection,
                                                                setRowSelection: setRowSelection,
                                                            }}
                                                        />
                                                    }
                                                </div>
                                            )
                                        }
                                    </FormInput>
                                </div>
                        }
                    </Modal>
                )
            );
        }));
    }, [selectedAddType, addChildrenModal, isClone, rowSelection, refreshTable]);

    return (
        <>
            {Object.values(addChildrenModal).filter((item) => item.isOpen === true)
                .length > 0 && (
                    <div className="container">
                        {modal}
                    </div>
                )}
        </>
    );
}