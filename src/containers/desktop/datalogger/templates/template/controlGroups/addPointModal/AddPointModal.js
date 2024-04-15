import { useEffect, useState } from "react";
import Button from "../../../../../../../components/button/Button";
import FormInput, { FormInputEnum } from "../../../../../../../components/formInput/FormInput";
import Modal from "../../../../../../../components/modal/Modal";
import Table from "../../../../../../../components/table/Table";
import { createColumnHelper } from "@tanstack/react-table";
import useEditControlGroupModal from "../editControlGroupModal/useEditControlGroupModal";
import { POINT_CONFIG } from "../../../../../../../utils/TemplateHelper";

const ADD_POINT_ACTION = {
    ADD_NEW: 0,
    CHOOSE_FROM_EXISTED: 1,
};

const ADD_POINT_EVENT = {
    CLEAN_UP: "onCleanUp",
    ROW_SELECTION: "onRowSelection",
};

export default function AddPointModal({ addChildrenModal, setAddChildrenModal }) {
    const { pointList } = useEditControlGroupModal();
    const [addTypes,] = useState([
        {
            label: "Add New",
            value: ADD_POINT_ACTION.ADD_NEW,
        },
        {
            label: "Choose from existed",
            value: ADD_POINT_ACTION.CHOOSE_FROM_EXISTED,
        },
    ]);

    const [selectedAddType, setSelectedAddType] = useState(addTypes[0]);
    const [isClone, setIsClone] = useState(false);
    const [rowSelection, setRowSelection] = useState({});
    const [refreshTable, setRefreshTable] = useState(false);
    const columnsHelper = createColumnHelper();
    const columns = [
        columnsHelper.accessor("id_checkbox", {
            id: "id_checkbox",
            size: 10,
            header: ({ table }) => (
                <FormInput.Check
                    {...{
                        inline: true,
                        name: "all",
                        label: "Point#",
                        checked: table.getIsAllRowsSelected(),
                        onChange: (e) => table.toggleAllRowsSelected(e.target.checked),
                        disabled: Object.keys(rowSelection).length >= addChildrenModal[POINT_CONFIG.CONTROL_GROUP.name].remainingSlots,
                    }}
                />
            ),
            cell: ({ row }) => {
                return (
                    <FormInput.Check
                        {...{
                            inline: true,
                            name: row.original.index,
                            label: `pt${row.original.index}`,
                            checked: row.getIsSelected(),
                            onChange: row.getToggleSelectedHandler(),
                            indeterminate: row.getIsSomeSelected(),
                            ...(
                                typeof addChildrenModal[POINT_CONFIG.CONTROL_GROUP.name].remainingSlots === "number" && {
                                    disabled: Object.keys(rowSelection).length >= addChildrenModal[POINT_CONFIG.CONTROL_GROUP.name].remainingSlots && !row.getIsSelected(),
                                })
                        }}
                    />
                );
            },
        }),
        columnsHelper.accessor("name", {
            id: "name",
            header: "Name",
            size: 300,
        }),
    ];
    const onRefreshTable = (reason) => {
        if (reason === ADD_POINT_EVENT.CLEAN_UP && Object.keys(rowSelection).length >= 0) {
            setRowSelection({});
            return;
        }

        setRefreshTable(true);
        var output = document.getElementById("progress");
        output.innerHTML = "<div><img src='/loading.gif ' /></div>";
        setTimeout(() => {
            setRefreshTable(false);
            output.innerHTML = "";
        }, 500);
    };
    useEffect(() => {
        if (!(typeof addChildrenModal[POINT_CONFIG.CONTROL_GROUP.name].remainingSlots === "number") || selectedAddType.value === 0) return;

        onRefreshTable(ADD_POINT_EVENT.ROW_SELECTION);
    }, [rowSelection]);

    useEffect(() => {
        setSelectedAddType(addTypes[0]);
        setIsClone(false);
        onRefreshTable(ADD_POINT_EVENT.CLEAN_UP);
    }, [addChildrenModal]);

    return (
        <>
            {Object.values(addChildrenModal).filter((item) => item.isOpen === true)
                .length > 0 && (
                    <>
                        {Object.keys(addChildrenModal).map((key, index) => {
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
                                                                    field.isShow = field.enum === FormInputEnum.Select.type || selectedAddType.value === 0;
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
                                                                            maxHeight="calc(100vh - 550px)"
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
                        })}
                    </>
                )}
        </>
    );
}