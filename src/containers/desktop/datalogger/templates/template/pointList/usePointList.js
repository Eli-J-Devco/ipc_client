import { useEffect, useState } from "react";
import { useTemplate } from "../useTemplate";
import { createColumnHelper } from "@tanstack/react-table";
import FormInput from "../../../../../../components/formInput/FormInput";
import Button from "../../../../../../components/button/Button";
import { RowAdapter, resortIndex } from "../../../../../../utils/TemplateHelper";
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
        editedPoint,
        setEditedPoint,
        isChanged,
        setIsChanged
    } = useTemplate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [point, setPoint] = useState({});
    const [rowSelection, setRowSelection] = useState({});
    const [pointList, setPointList] = useState([]);
    const [isReset, setIsReset] = useState(false);
    const [isForceUpdate, setIsForceUpdate] = useState(false);
    const [isSetUp, setIsSetUp] = useState(true);
    const output = document.getElementById("progress");

    useEffect(() => {
        if (defaultPointList.length === 0) return;

        if (!isSetUp) return;

        output.innerHTML = "<div><img src='/loading.gif' /></div>";
        if (!isReset && !editedPoint.state) {
            setPointList(editedPoint.data);

            let selectedPoints = editedPoint?.data.filter((item) => item.is_checked === true);
            setRowSelection(selectedPoints.reduce((acc, item, index) => {
                acc[item.index] = true;
                return acc;
            }, {}));
        } else {
            setTimeout(() => {
                let data = defaultPointList.map((item, index) => new RowAdapter({
                    ...item,
                    is_checked: false,
                }, index).getRow());
                setPointList(_.cloneDeep(data));
                setRowSelection({});
                setIsChanged({ ...isChanged, point: false });
                setIsReset(false);
            }, 100);
        }

        setTimeout(() => {
            setIsSetUp(false);
            output.innerHTML = "";
        }, 100);

    }, [defaultPointList, isReset]);

    useEffect(() => {
        if (pointList.length === 0 && !isForceUpdate) return;

        !_.isEqual(pointList, editedPoint.data) &&
            setTimeout(() => {
                setEditedPoint({
                    state: false,
                    data: _.cloneDeep(pointList)
                });
                setIsChanged({ ...isChanged, point: true });
                setIsForceUpdate(false);
            }, 100);
    }, [pointList, isForceUpdate]);

    useEffect(() => {
        if (Object.keys(rowSelection).length === 0) return;

        setTimeout(() => {

            Object.keys(rowSelection).forEach(key => {
                pointList[parseInt(key)].is_checked = true;
            });
            setPointList([...pointList]);
        }, 100);
    }, [rowSelection]);

    const closeModal = () => setIsModalOpen(false);
    const handlePointEdit = item => {
        setIsModalOpen(true);
        setPoint(item);
    }

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
        }, 100);
    };

    const removePoint = () => {
        setTimeout(() => {
            let newPoints = pointList.filter((item) => !rowSelection[item.index]);
            setPointList(resortIndex([...newPoints]));
            setIsForceUpdate(newPoints.length === 0);
            setIsChanged({ ...isChanged, point: true });
            setRowSelection({});
        }, 100);
        // if (Object.keys(rowSelection).length === 0) {
        //     LibToast.toast("No point selected", "error");
        //     return;
        // }

        // let deletePoint = [];
        // rowSelection && Object.keys(rowSelection).forEach(key => {
        //     deletePoint.push(pointList[parseInt(key)]);
        // });

        // let data = deletePoint.map(point => {
        //     return {
        //         id_point: point?.id,
        //         id_pointkey: point?.name
        //     }
        // });

        // var output = document.getElementById("progress");
        // output.innerHTML = "<div><img src='/loading.gif' /></div>";
        // setTimeout(async () => {
        //     try {
        //         const response = await axiosPrivate.post(
        //             Constants.API_URL.TEMPLATE.POINT.DELETE,
        //             {
        //                 id_template: id,
        //                 points: data
        //             },
        //             {
        //                 headers: {
        //                     "Content-Type": "application/json"
        //                 }
        //             }
        //         );
        //         if (response?.status === 200) {
        //             LibToast.toast("Delete points success", "info");
        //             setDefaultPointList(response?.data?.point_list);
        //             setConvertedPointList([]);
        //             setEditedPoint({});
        //         }
        //     } catch (error) {
        //         let msg = loginService.handleMissingInfo(error);
        //         if (typeof msg === "string") {
        //             LibToast.toast(msg, "error");
        //         } else if (!msg) {
        //             LibToast.toast("Delete point failed", "error");
        //         } else {
        //             navigate("/", { replace: true })
        //         }
        //     } finally {
        //         output.innerHTML = "";
        //     }
        // }, 300)
    }

    const reset = () => {
        setTimeout(() => {
            setIsReset(true);
            setIsSetUp(true);
        }, 100);
    }

    const changePointNumber = (count) => {
        setTimeout(() => {
            let currentLenght = pointList.length;
            let newPointList = _.cloneDeep(pointList);

            if (currentLenght === count) return;

            if (currentLenght === 0) {
                for (let i = 0; i < count; i++) {
                    newPointList.push({ id: null });
                }
            } else if (currentLenght < count) {
                for (let i = currentLenght; i < count; i++) {
                    newPointList.push({ ...pointList[currentLenght - 1], id: null });
                }
            } else {
                newPointList = newPointList.slice(0, count);
            }

            setPointList(resortIndex(newPointList));
            setIsChanged({ ...isChanged, point: true });
            setIsForceUpdate(newPointList.length === 0);
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
        reset,
        updatePoint,
        removePoint,
        changePointNumber,
        point
    };
}

export default usePointList;