import { useEffect, useState } from "react";
import { useTemplate } from "../useTemplate";

function useRegisterBlocks() {
    const [columns, setColumns] = useState([
        {
            id: 1,
            slug: "id_checkbox",
            name: "Block#",
            width: 150
        }, {
            id: 2,
            slug: "addr",
            name: "Modbus Register Address"
        }, {
            id: 5,
            slug: "count",
            name: "Count",
            width: 200
        }, {
            id: 6,
            slug: "function_select",
            name: "Function",
            width: 200
        }
    ]);
    const { defaultRegisterList, config } = useTemplate();

    const [registerList, setRegisterList] = useState([]);

    const [functionList, setFunctionList] = useState([]);

    useEffect(() => {
        var output = document.getElementById("progress");
        output.innerHTML = "<div><img src='/loading.gif' alt='loading' /></div>";
        if (!defaultRegisterList || !config?.type_function) return;

        setTimeout(() => {
            setRegisterList(defaultRegisterList.map((item, index) => ({
                index: index,
                id: item.id,
                id_checkbox: item.id,
                addr: item.addr,
                count: item.count,
                function_select: { value: item.type_function.id, label: item.type_function.Function }
            })));
            setFunctionList(config?.type_function.map(
                item => ({ value: item.id, label: item.Function })
            ));
            output.innerHTML = "";
        }, 100);
    }, [defaultRegisterList, config?.type_function]);

    return {
        columns,
        registerList,
        functionList
    };
}

export default useRegisterBlocks;