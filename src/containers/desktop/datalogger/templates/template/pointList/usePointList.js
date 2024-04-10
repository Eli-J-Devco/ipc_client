import { useEffect, useState } from "react";
import { useTemplate } from "../useTemplate";
import { createColumnHelper } from "@tanstack/react-table";
import FormInput from "../../../../../../components/formInput/FormInput";
import Button from "../../../../../../components/button/Button";
import { POINT_CONFIG, RowAdapter } from "../../../../../../utils/TemplateHelper";
import _ from "lodash";
import LibToast from "../../../../../../utils/LibToast";
import useAxiosPrivate from "../../../../../../hooks/useAxiosPrivate";
import Constants from "../../../../../../utils/Constants";
import { loginService } from "../../../../../../services/loginService";
import { useNavigate } from "react-router-dom";

function usePointList() {
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();

    const {
        id,
        defaultPointList,
        setDefaultPointList
    } = useTemplate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [point, setPoint] = useState({});
    const [rowSelection, setRowSelection] = useState({});
    const [pointList, setPointList] = useState([]);
    const [isSetUp, setIsSetUp] = useState(true);
    const output = document.getElementById("progress");

    useEffect(() => {
        if (!isSetUp) return;

        if (output.innerHTML === "") {
            output.innerHTML = "<div><img src='/loading.gif' /></div>";
        }

        setTimeout(() => {
            let data = defaultPointList.map((item) => ({
                ...new RowAdapter({
                    ...item,
                    is_check: false,
                }).getRow()
            }));
            setPointList(_.cloneDeep(data));
            setRowSelection({});
        }, 100);

        setTimeout(() => {
            setIsSetUp(false);
            output.innerHTML = "";
        }, 100);

    }, [defaultPointList, isSetUp]);


    useEffect(() => {
        if (Object.keys(rowSelection).length === 0) return;

        setTimeout(() => {

            Object.keys(rowSelection).forEach(key => {
                pointList[parseInt(key)].is_check = true;
            });
            setPointList([...pointList]);
        }, 100);
    }, [rowSelection]);

    const closeModal = () => setIsModalOpen(false);
    const handlePointEdit = item => {
        setIsModalOpen(true);
        setPoint(item);
    }

    useEffect(() => {
        if (!point.id) return;

        if (!defaultPointList.find((item) => item.id === point.id)) {
            setDefaultPointList([...defaultPointList, point]);
        }
    }, [point]);

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
                            label: `pt${row.original.index}`,
                            checked: row.getIsSelected(),
                            onChange: row.getToggleSelectedHandler(),
                            indeterminate: row.getIsSomeSelected(),
                        }}
                    />
                )
            }
        }),
        columnsHelper.accessor("name", {
            id: "name",
            header: "Name",
            width: 300
        }),
        columnsHelper.accessor("unit", {
            id: "unit",
            header: "Units",
            size: 80
        }),
        columnsHelper.accessor("class", {
            id: "class",
            header: "Class",
            size: 80
        }),
        columnsHelper.accessor("register", {
            id: "register",
            header: "Reg",
            size: 80
        }),
        columnsHelper.accessor("data_type", {
            id: "data_type",
            header: "Data Type",
            size: 80
        }),
        columnsHelper.accessor("byte_order", {
            id: "byte_order",
            header: "Byte Order",
            size: 80
        }),
        columnsHelper.accessor("slope", {
            id: "slope",
            header: "Slope",
            size: 80
        }),
        columnsHelper.accessor("offset", {
            id: "offset",
            header: "Offset",
            size: 80
        }),
        columnsHelper.accessor("multreg", {
            id: "multreg",
            header: "Mult Reg",
            size: 80
        }),
        columnsHelper.accessor("invalidvalue", {
            id: "invalidvalue",
            header: "Invalid Bit Pattern",
            size: 80
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

    const updatePoint = (updatedPoint) => {
        setTimeout(() => {
            let updatePointList = pointList.map((p) => {
                if (p.index === updatedPoint.index) {
                    return updatedPoint;
                }

                return p;
            });

            setPointList(_.cloneDeep(updatePointList));
            setPoint(updatedPoint);
        }, 100);
    };

    const removePoint = () => {
        if (Object.keys(rowSelection).length === 0) {
            LibToast.toast("No point selected", "error");
            return;
        }

        let deletePoint = [];
        rowSelection && Object.keys(rowSelection).forEach(key => {
            deletePoint.push(pointList[parseInt(key)]);
        });

        let data = deletePoint.map(point => {
            return {
                id_point: point?.id,
                id_pointkey: point?.id_pointkey
            }
        });

        output.innerHTML = "<div><img src='/loading.gif' /></div>";
        setTimeout(async () => {
            try {
                const response = await axiosPrivate.post(
                    Constants.API_URL.TEMPLATE.POINT.DELETE,
                    {
                        id_template: id,
                        points: data
                    },
                    {
                        headers: {
                            "Content-Type": "application/json"
                        }
                    }
                );
                if (response?.status === 200) {
                    LibToast.toast("Delete points success", "info");
                    setDefaultPointList(response?.data?.point_list);
                    setIsSetUp(true);
                }
            } catch (error) {
                if (error.response?.status === 404) {
                    setTimeout(() => {
                        let newPoints = defaultPointList.filter((item) => !rowSelection[item.index]);
                        setDefaultPointList([...newPoints]);
                        setRowSelection({});
                        setIsSetUp(true);
                        LibToast.toast("Delete points success", "info");
                    }, 100);
                    return;
                }

                let msg = loginService.handleMissingInfo(error);
                if (typeof msg === "string") {
                    LibToast.toast(msg, "error");
                    return;
                }

                if (!msg) {
                    LibToast.toast("Delete point failed", "error");
                    return;
                }

                navigate("/", { replace: true })
            } finally {
                output.innerHTML = "";
            }
        }, 300)
    }

    const changePointNumber = (count) => {
        if (count <= 0) {
            LibToast.toast("Minimum 1 point", "error");
            return;
        }

        output.innerHTML = "<div><img src='/loading.gif' /></div>";
        setTimeout(async () => {
            try {
                const response = await axiosPrivate.post(Constants.API_URL.TEMPLATE.POINT.ADD_POINT, {
                    number_of_point: count,
                    id_template: parseInt(id)
                }, {
                    headers: {
                        "Content-Type": "application/json"
                    }
                });

                if (response?.status === 200) {
                    setDefaultPointList(response?.data?.point_list);
                    setIsSetUp(true);
                    LibToast.toast(`Add ${count} success`, "info");
                }
            } catch (error) {
                let msg = loginService.handleMissingInfo(error);
                if (typeof msg === "string") {
                    LibToast.toast(msg, "error");
                } else if (!msg) {
                    LibToast.toast("Add points failed", "error");
                } else {
                    navigate("/", { replace: true })
                }
            }
        }, 100);
    }

    return {
        isModalOpen,
        closeModal,
        columns,
        pointList,
        handlePointEdit,
        rowSelection,
        setRowSelection,
        updatePoint,
        removePoint,
        changePointNumber,
    };
}

export default usePointList;