import { useEffect, useState } from "react";
import { useTemplate } from "../useTemplate";
import { createColumnHelper } from "@tanstack/react-table";
import FormInput from "../../../../../../components/formInput/FormInput";
import _ from "lodash";
import { resortIndex } from "../../../../../../utils/TemplateHelper";
function useRegisterBlocks() {
    const {
        editedRegister,
        setEditedRegister,
        isChanged,
        setIsChanged,
    } = useTemplate();

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
                        label: "Block#",
                        checked: table.getIsAllRowsSelected(),
                        onChange: (e) => table.toggleAllRowsSelected(e.target.checked)
                    }}
                />
            ),
            cell: ({ row }) => {
                return (
                    <FormInput.Check
                        {...{
                            inline: true,
                            name: row.original.index,
                            label: `Block${row.original.index}`,
                            checked: row.getIsSelected(),
                            onChange: row.getToggleSelectedHandler(),
                            indeterminate: row.getIsSomeSelected(),
                        }}
                    />
                )
            }
        }),
        columnsHelper.accessor("addr", {
            id: "addr",
            header: "Modbus Register Address",
            cell: ({ row }) => (
                <FormInput.Text
                    {...{
                        name: `addr${row.original.id}`,
                        horizontal: true,
                        type: "number",
                    }}
                />
            )
        }),
        columnsHelper.accessor("count", {
            id: "count",
            header: "Count",
            cell: ({ row }) => (
                <FormInput.Text
                    {...{
                        name: `count${row.original.id}`,
                        horizontal: true,
                        type: "number",
                    }}
                />
            )
        }),
        columnsHelper.accessor("function_select", {
            id: "function_select",
            header: "Function",
            size: 200,
            cell: ({ row }) => (
                <FormInput.Select
                    {...{
                        name: `func${row.original.id}`,
                        isSearchable: false,
                        option: functionList,
                    }}
                />
            )
        })
    ];
    const { defaultRegisterList, config } = useTemplate();
    const [registerList, setRegisterList] = useState([]);
    const [functionList, setFunctionList] = useState([]);
    const [rowSelection, setRowSelection] = useState({});
    const [isSetUp, setIsSetUp] = useState(true);
    const [isReset, setIsReset] = useState(false);
    const [forceChange, setForceChange] = useState(false);

    useEffect(() => {
        if (!defaultRegisterList || !config?.type_function) return;

        if (!isSetUp) return;

        var output = document.getElementById("progress");
        output.innerHTML = "<div><img src='/loading.gif' alt='loading' /></div>";
        if (!isReset && !editedRegister.state) {
            setTimeout(() => {
                setRegisterList(_.cloneDeep(editedRegister.data));
                let selectedRegisters = editedRegister.data.filter((item) => item?.is_checked === true);
                setRowSelection(selectedRegisters.reduce((acc, item, index) => {
                    acc[item?.index] = true;
                    return acc;
                }, {}));
            }, 100);
        } else {
            setTimeout(() => {
                setRegisterList(defaultRegisterList.map((item, index) => ({
                    index: index,
                    id: item?.id,
                    id_checkbox: item?.id,
                    addr: {
                        name: `addr${item?.id}`,
                        value: item?.addr,
                    },
                    count: {
                        name: `count${item?.id}`,
                        value: item?.count,
                    },
                    is_checked: false,
                    function_select: {
                        name: `func${item?.id}`,
                        value: { value: item?.type_function?.id, label: item?.type_function?.Function }
                    }
                })));
                setIsChanged({ ...isChanged, register: false });
                setRowSelection({});
            }, 100);
        }

        setTimeout(() => {
            setFunctionList(config?.type_function.map(
                item => ({ value: item?.id, label: item?.Function })
            ));
            setIsReset(false);
            setIsSetUp(false);
            output.innerHTML = "";
        }, 100);
    }, [defaultRegisterList, config?.type_function, isReset, isSetUp]);

    useEffect(() => {
        if (registerList.length === 0 && !forceChange) return;
        !_.isEqual(registerList, editedRegister.data) &&
            setTimeout(() => {
                setEditedRegister(
                    {
                        state: false,
                        data: _.cloneDeep(registerList)
                    }
                );
                setForceChange(false);
            }, 100);
    }, [registerList, forceChange]);

    useEffect(() => {
        if (Object.keys(rowSelection).length === 0) return;

        Object.keys(rowSelection).forEach((key) => {
            registerList[key].is_checked = true;
        });
        setRegisterList(_.cloneDeep(registerList));
    }, [rowSelection]);

    const changeRegisterNumber = (num) => {
        setTimeout(() => {
            let currentLenght = registerList.length;
            let newRegisters = _.cloneDeep(registerList);
            let newRegister = {};

            if (currentLenght === 0) {
                newRegister = {
                    index: 0,
                    id: null,
                    id_checkbox: null,
                    addr: {
                        name: `addr0`,
                        value: null,
                    },
                    count: {
                        name: `count0`,
                        value: null,
                    },
                    is_checked: false,
                    function_select: {
                        name: `func0`,
                        value: functionList[0],
                    }
                }
                for (let i = 0; i < num; i++) {
                    newRegisters.push({ ...newRegister, index: i, id: i, addr: { ...newRegister.addr, name: `addr${i}` }, count: { ...newRegister.count, name: `count${i}` }, function_select: { ...newRegister.function_select, name: `func${i}` } });
                }
            }
            else {
                if (num > currentLenght) {
                    for (let i = currentLenght; i < num; i++) {
                        let newId = newRegisters[currentLenght - 1]?.id + 1;
                        newRegisters.push({
                            ...registerList,
                            index: i,
                            id: newId,
                            addr: {
                                name: `addr${newId}`,
                                value: registerList[currentLenght - 1]?.addr?.value,
                            },
                            count: {
                                name: `count${newId}`,
                                value: registerList[currentLenght - 1]?.count?.value,
                            },
                            is_checked: false,
                            function_select: {
                                name: `func${newId}`,
                                value: registerList[currentLenght - 1]?.function_select?.value,
                            }
                        });
                    }
                } else {
                    newRegisters = newRegisters.slice(0, num);
                }
            }
            setRegisterList([...newRegisters]);
            setForceChange(newRegisters.length === 0);
            setIsChanged({ ...isChanged, register: true });
        }, 100);
    }

    const resetRegisterList = () => {
        setTimeout(() => {
            setIsReset(true);
            setIsSetUp(true);
        }, 100);
    }

    const removeRegister = () => {
        setTimeout(() => {
            let newRegisters = registerList.filter((item) => !rowSelection[item.index]);
            setRegisterList(resortIndex([...newRegisters]));
            setForceChange(newRegisters.length === 0);
            setIsChanged({ ...isChanged, register: true });
            setRowSelection({});
        }, 100);
    };

    const temporarySave = (values) => {
        var output = document.getElementById("progress");
        output.innerHTML = "<div><img src='/loading.gif' alt='loading' /></div>";
        setTimeout(() => {
            let newRegisters = _.cloneDeep(registerList);
            newRegisters.forEach((item) => {
                item.addr.value = values[`addr${item.id}`];
                item.count.value = values[`count${item.id}`];
                item.function_select.value = values[`func${item.id}`];
            });
            setRegisterList(newRegisters);
            setIsChanged({ ...isChanged, register: true });
            output.innerHTML = "";
        }, 100);
    };

    return {
        columns,
        registerList,
        isSetUp,
        rowSelection,
        setRowSelection,
        changeRegisterNumber,
        resetRegisterList,
        removeRegister,
        temporarySave
    };
}

export default useRegisterBlocks;