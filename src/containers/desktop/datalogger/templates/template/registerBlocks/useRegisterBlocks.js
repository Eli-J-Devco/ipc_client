import { useEffect, useState } from "react";
import { useTemplate } from "../useTemplate";
import { createColumnHelper } from "@tanstack/react-table";
import FormInput from "../../../../../../components/formInput/FormInput";
import _ from "lodash";
import { resortIndex } from "../../../../../../utils/TemplateHelper";
import useAxiosPrivate from "../../../../../../hooks/useAxiosPrivate";
import Constants from "../../../../../../utils/Constants";
import { loginService } from "../../../../../../services/loginService";
import LibToast from "../../../../../../utils/LibToast";
import { useNavigate } from "react-router-dom";

function useRegisterBlocks() {
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
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
    const {
        id,
        defaultRegisterList,
        setDefaultRegisterList,
        config
    } = useTemplate();
    const [registerList, setRegisterList] = useState([]);
    const [functionList, setFunctionList] = useState([]);
    const [rowSelection, setRowSelection] = useState({});
    const [isSetUp, setIsSetUp] = useState(true);
    const output = document.getElementById("progress");

    useEffect(() => {
        if (!defaultRegisterList || !config?.type_function) return;

        if (!isSetUp) return;

        if (output.innerHTML === "") {
            output.innerHTML = "<div><img src='/loading.gif' alt='loading' /></div>";
        }

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
            setRowSelection({});
        }, 100);

        setTimeout(() => {
            setFunctionList(config?.type_function.map(
                item => ({ value: item?.id, label: item?.Function })
            ));
            setIsSetUp(false);
            output.innerHTML = "";
        }, 100);
    }, [defaultRegisterList, config?.type_function, isSetUp]);

    useEffect(() => {
        if (Object.keys(rowSelection).length === 0) return;

        Object.keys(rowSelection).forEach((key) => {
            registerList[key].is_checked = true;
        });
        setRegisterList(_.cloneDeep(registerList));
    }, [rowSelection]);

    const changeRegisterNumber = (num) => {
        if (num <= 0) return;

        output.innerHTML = "<div><img src='/loading.gif' alt='loading' /></div>";
        setTimeout(async () => {
            try {
                const response = await axiosPrivate.post(Constants.API_URL.TEMPLATE.REGISTER.CREATE, {
                    number_of_register: num,
                    id_template: parseInt(id),
                },
                    {
                        headers: {
                            "Content-Type": "application/json"
                        }
                    }
                );

                if (response?.status === 200) {
                    setDefaultRegisterList(response?.data?.register_list);
                    setRowSelection({});
                    setIsSetUp(true);
                    LibToast.toast("New registers added successfully", "info");
                }
            } catch (error) {
                let msg = loginService.handleMissingInfo(error);
                if (typeof msg === "string") {
                    LibToast.toast(msg, "error");
                } else if (!msg) {
                    LibToast.toast("Failed to add new registers", "error");
                } else {
                    navigate("/");
                }
            }
        }, 300);
    }

    const removeRegister = () => {
        let body = JSON.stringify({
            id_template: id,
            registers: registerList.filter((item) => rowSelection[item.index]).map((item) => ({ id: item.id }))
        });

        output.innerHTML = "<div><img src='/loading.gif' alt='loading' /></div>";
        setTimeout(async () => {
            try {
                const response = await axiosPrivate.post(Constants.API_URL.TEMPLATE.REGISTER.DELETE, body,
                    {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    });

                if (response?.status === 200) {
                    setDefaultRegisterList(response?.data?.register_list);
                    setRowSelection({});
                    setIsSetUp(true);
                    LibToast.toast("Register deleted successfully", "info");
                };
            } catch (error) {
                console.error("Failed to delete register", error);
                let msg = loginService.handleMissingInfo(error);
                if (typeof msg === 'string') {
                    LibToast.toast(msg, "error");
                } else if (!msg) {
                    LibToast.toast("Failed to delete register", "error");
                } else {
                    navigate('/');
                }
            }
        }, 300);
    };

    const applyUpdate = (values) => {
        let body = JSON.stringify({
            id_template: id,
            registers: registerList.map((item) => {
                return {
                    id: item.id,
                    addr: values[`addr${item.id}`],
                    count: values[`count${item.id}`],
                    id_type_function: values[`func${item.id}`].value
                }
            })
        });

        output.innerHTML = "<div><img src='/loading.gif' alt='loading' /></div>";
        setTimeout(async () => {
            try {
                const response = await axiosPrivate.post(Constants.API_URL.TEMPLATE.REGISTER.UPDATE, body,
                    {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    });

                if (response?.status === 200) {
                    setDefaultRegisterList(response?.data?.register_list);
                    setRowSelection({});
                    setIsSetUp(true);
                    LibToast.toast("Register updated successfully", "info");
                };
            } catch (error) {
                console.error("Failed to update register", error);
                let msg = loginService.handleMissingInfo(error);
                if (typeof msg === 'string') {
                    LibToast.toast(msg, "error");
                } else if (!msg) {
                    LibToast.toast("Failed to update register", "error");
                } else {
                    navigate('/');
                }
            }
        }, 300);
    };

    return {
        columns,
        registerList,
        isSetUp,
        rowSelection,
        setRowSelection,
        changeRegisterNumber,
        removeRegister,
        applyUpdate
    };
}

export default useRegisterBlocks;