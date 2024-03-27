import { useEffect, useState } from "react";
import { useTemplate } from "../useTemplate";

function usePointList() {
    const { defaultPointList } = useTemplate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [point, setPoint] = useState({});
    const [columns,] = useState([
        {
            id: 1,
            slug: "id_checkbox",
            name: "Point#"
        }, {
            id: 2,
            slug: "name",
            name: "Name",
            width: 200
        }, {
            id: 3,
            slug: "unit",
            name: "Units"
        }, {
            id: 4,
            slug: "class",
            name: "Class"
        }, {
            id: 5,
            slug: "register",
            name: "Reg"
        }, {
            id: 6,
            slug: "data_type",
            name: "Data Type"
        }, {
            id: 7,
            slug: "byte_order",
            name: "Byte Order"
        }, {
            id: 8,
            slug: "slope",
            name: "Slope"
        }, {
            id: 9,
            slug: "offset",
            name: "Offset"
        }, {
            id: 10,
            slug: "multreg",
            name: "Mult Reg"
        }, {
            id: 11,
            slug: "invalidvalue",
            name: "Invalid Bit Pattern"
        }, {
            id: 12,
            slug: "action",
            name: <div className="text-center">Actions</div>
        }
    ]);
    const [pointList, setPointList] = useState();

    useEffect(() => {
        setPointList(defaultPointList.map((item, index) => ({ ...item, id: index, unit: item?.type_units?.Units, class: item?.type_class?.TypeClass, data_type: item?.type_datatype?.["Data Type"], byte_order: item?.type_byteorder?.["Byte Order"] })));
    }, [defaultPointList]);

    const closeModal = () => setIsModalOpen(false);
    const handlePointEdit = item => {
        setIsModalOpen(true);
        setPoint(item);
    }

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