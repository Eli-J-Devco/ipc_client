import { useEffect, useState } from "react";
import useEditControlGroupModal from "../editControlGroupModal/useEditControlGroupModal";
import { createColumnHelper } from "@tanstack/react-table";
import FormInput from "../../../../../../../components/formInput/FormInput";
import { POINT_CONFIG } from "../../../../../../../utils/TemplateHelper";


export const ADD_POINT_ACTION = {
    ADD_NEW: 0,
    CHOOSE_FROM_EXISTED: 1,
};

const ADD_POINT_EVENT = {
    CLEAN_UP: "onCleanUp",
    ROW_SELECTION: "onRowSelection",
};

export default function useAddPointModal(addChildrenModal) {
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
            header: ({ table }) => {
                return typeof addChildrenModal[POINT_CONFIG.CONTROL_GROUP.name].remainingSlots !== "number" ? (
                    <FormInput.Check
                        {...{
                            inline: true,
                            name: "all",
                            label: "Point#",
                            checked: table.getIsAllRowsSelected(),
                            onChange: (e) => table.toggleAllRowsSelected(e.target.checked),
                        }}
                    />
                ) :
                    (
                        <div>Point</div>
                    )
            },
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

    return {
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
        setRefreshTable,
    };
}