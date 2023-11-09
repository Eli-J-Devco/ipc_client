import { useState } from "react";

function usePointList() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [point, setPoint] = useState({});
    const [columns, ] = useState([
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
            slug: "reg",
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
            slug: "mult_reg",
            name: "Mult Reg"
        }, {
            id: 11,
            slug: "invalid",
            name: "Invalid Bit Pattern"
        }, {
            id: 12,
            slug: "action",
            name: "Actions"
        }
    ]);
    const [pointList, ] = useState([
        {
            id: 1,
            name: "C_DeviceAddress",
            unit: "",
            class: "Input",
            reg: 40069,
            data_type: "UNIT16",
            byte_order: "normal",
            slope: "",
            offset: "",
            mult_reg: "",
            invalid: ""
        },{
            id: 2,
            name: "C_SunSpec_DID",
            unit: "",
            class: "Input",
            reg: "40070",
            data_type: "UNIT16",
            byte_order: "normal",
            slope: "",
            offset: "",
            mult_reg: "",
            invalid: ""
        },{
            id: 3,
            name: "C_SunSpec_Length",
            unit: "",
            class: "Input",
            reg: 40071,
            data_type: "UNIT16",
            byte_order: "normal",
            slope: "",
            offset: "",
            mult_reg: "",
            invalid: ""
        },{
            id: 4,
            name: "I_AC_Current",
            unit: "Amps",
            class: "Input",
            reg: 40072,
            data_type: "UNIT16",
            byte_order: "normal",
            slope: "",
            offset: "",
            mult_reg: "",
            invalid: ""
        }
    ]);

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