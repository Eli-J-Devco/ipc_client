import { useState } from "react";

function useRegisterBlocks() {
    const [columns, ] = useState([
        {
            id: 1,
            slug: "id_checkbox",
            name: "Block#",
            width: 150
        }, {
            id: 2,
            slug: "address_input",
            name: "Modbus Register Address"
        }, {
            id: 3,
            slug: "offset",
            name: "Offset"
        }, {
            id: 4,
            slug: "hex",
            name: "(hex)"
        }, {
            id: 5,
            slug: "count_input",
            name: "Count",
            width: 200
        }, {
            id: 6,
            slug: "function_select",
            name: "Function",
            width: 200
        }
    ]);
    const [registerList, ] = useState([
        {
            id: 1,
            address: 40069,
            offset: 68,
            hex: "0x0044",
            count: 34,
            fuction: "read"
        },{
            id: 2,
            address: 40104,
            offset: 68,
            hex: "0x0067",
            count: 1,
            fuction: "read"
        },{
            id: 3,
            address: 40107,
            offset: 68,
            hex: "0x006A",
            count: 3,
            fuction: "read"
        },{
            id: 4,
            address: 0,
            offset: -1,
            hex: "0xFFFF",
            count: 0,
            fuction: "not used"
        },{
            id: 5,
            address: 0,
            offset: -1,
            hex: "0xFFFF",
            count: 0,
            fuction: "not used"
        },{
            id: 6,
            address: 0,
            offset: -1,
            hex: "0xFFFF",
            count: 0,
            fuction: "not used"
        }
    ]);

    return {
        columns,
        registerList
    };
}

export default useRegisterBlocks;