import { useEffect, useState } from "react";
import { useTemplate } from "../useTemplate";
import { createColumnHelper } from "@tanstack/react-table";
import FormInput from "../../../../../../components/formInput/FormInput";
import Button from "../../../../../../components/button/Button";

function usePointList() {
    const { defaultPointList } = useTemplate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [point, setPoint] = useState({});

    const [pointList, setPointList] = useState([]);

    useEffect(() => {
        setPointList(defaultPointList.map((item, index) => ({ ...item, index: index, unit: item?.type_units?.unit, class: item?.type_class?.type_class, data_type: item?.type_datatype?.data_type, byte_order: item?.type_byteorder?.byte_order })));
    }, [defaultPointList]);

    const closeModal = () => setIsModalOpen(false);
    const handlePointEdit = item => {
        setIsModalOpen(true);
        setPoint(item);
    }

    const columnsHelper = createColumnHelper();
    const columns = [
        columnsHelper.accessor("id_checkbox", {
            id: "id_checkbox",
            header: ({ table }) => (
                <FormInput.Check
                    inline
                    name="all"
                    label="Point#"
                    checked={table.getIsAllRowsSelected()}
                    onChange={(e) => table.toggleAllRowsSelected(e.target.checked)}
                />
            ),
            cell: ({ row }) => (
                <FormInput.Check
                    inline
                    name={row.original.name}
                    label={`pt${row.original.index}`}
                    checked={row.getIsSelected()}
                    onChange={(e) => row.toggleSelected(e.target.checked)}
                />
            )
        }),
        columnsHelper.accessor("name", {
            id: "name",
            header: "Name",
            width: 200
        }),
        columnsHelper.accessor("unit", {
            id: "unit",
            header: "Units"
        }),
        columnsHelper.accessor("class", {
            id: "class",
            header: "Class"
        }),
        columnsHelper.accessor("register", {
            id: "register",
            header: "Reg"
        }),
        columnsHelper.accessor("data_type", {
            id: "data_type",
            header: "Data Type"
        }),
        columnsHelper.accessor("byte_order", {
            id: "byte_order",
            header: "Byte Order"
        }),
        columnsHelper.accessor("slope", {
            id: "slope",
            header: "Slope"
        }),
        columnsHelper.accessor("offset", {
            id: "offset",
            header: "Offset"
        }),
        columnsHelper.accessor("multreg", {
            id: "multreg",
            header: "Mult Reg"
        }),
        columnsHelper.accessor("invalidvalue", {
            id: "invalidvalue",
            header: "Invalid Bit Pattern"
        }),
        columnsHelper.accessor("action", {
            id: "action",
            header: <div className="text-center">Actions</div>,
            cell: ({ row }) => (
                <div className="d-flex justify-content-center">
                    <Button onClick={() => handlePointEdit(row.original)}>
                        <Button.Text text="Edit" />
                    </Button>
                </div>
            )
        })
    ]

    return {
        isModalOpen,
        closeModal,
        columns,
        pointList,
        handlePointEdit,
        point
    };
}

export default usePointList;