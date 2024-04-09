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
        editedPoint,
        setEditedPoint,
        setDefaultPointList
    } = useTemplate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [point, setPoint] = useState({});
    const [rowSelection, setRowSelection] = useState({});
    const [pointList, setPointList] = useState([]);
    const [isReset, setIsReset] = useState(false);
    const [isForceUpdate, setIsForceUpdate] = useState(false);
    const [isSetUp, setIsSetUp] = useState(true);
    const [isChanged, setIsChanged] = useState(false);
    const [temporaryPointList, setTemporaryPointList] = useState([]);
    const output = document.getElementById("progress");

    useEffect(() => {

        if (!isSetUp) return;

        output.innerHTML = "<div><img src='/loading.gif' /></div>";
        if (!isReset && !editedPoint.state) {
            setPointList(editedPoint.data);

            let selectedPoints = editedPoint?.data.filter((item) => item.is_check === true);
            setRowSelection(selectedPoints.reduce((acc, item, index) => {
                acc[item.index] = true;
                return acc;
            }, {}));

            if (editedPoint.data.length !== defaultPointList.length) {
                setIsChanged(true);
            }
        } else {
            // if (defaultPointList.length === 0) return;

            setTimeout(() => {
                let data = defaultPointList.map((item) => ({
                    ...new RowAdapter({
                        ...item,
                        is_check: false,
                    }).getRow()
                }));
                setPointList(_.cloneDeep(data));
                setRowSelection({});
                setIsChanged(false);
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
                setIsForceUpdate(false);
            }, 100);
    }, [pointList, isForceUpdate]);

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
        console.log(temporaryPointList)
        console.log(point.index)
        console.log(temporaryPointList.filter((item) => item.index !== point.index))
        if (!defaultPointList.find((item) => item.id === point.id)) {
            setDefaultPointList([...defaultPointList, point]);
            setTemporaryPointList([...temporaryPointList.filter((item) => item.index !== point.index)]);
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
        // setTimeout(() => {
        //     let newPoints = pointList.filter((item) => !rowSelection[item.index]);
        //     setPointList(resortIndex([...newPoints]));
        //     setIsForceUpdate(newPoints.length === 0);
        //     setIsChanged(true);
        //     setRowSelection({});
        // }, 100);
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

        var output = document.getElementById("progress");
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
                    setIsReset(true);
                    setIsSetUp(true);
                    setIsChanged(false);
                    setEditedPoint({});
                }
            } catch (error) {
                if (error.response?.status === 404) {
                    setTimeout(() => {
                        let newPoints = defaultPointList.filter((item) => !rowSelection[item.index]);
                        setDefaultPointList([...newPoints]);
                        setIsForceUpdate(newPoints.length === 0);
                        setRowSelection({});
                        setIsSetUp(true);
                        setIsReset(true);
                        setIsChanged(false);
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

            if (currentLenght === 0) {
                for (let i = 0; i < count; i++) {
                    newPointList.push({
                        ...new RowAdapter({ id: null, index: i, id_config_information: POINT_CONFIG.NORMAL.value }).getRow()
                    });
                }
                setPointList(newPointList);
                setIsChanged(true);
                setIsForceUpdate(newPointList.length === 0);
                setTemporaryPointList(newPointList);
                return;
            }

            for (let i = currentLenght; i < currentLenght + count; i++) {
                newPointList.push({ ...pointList[currentLenght - 1], id: null, index: pointList[currentLenght - 1].index + 1 });
            }

            setPointList(newPointList);
            setIsChanged(true);
            setIsForceUpdate(newPointList.length === 0);
            setTemporaryPointList([...temporaryPointList, ...newPointList.slice(currentLenght, currentLenght + count)]);
            LibToast.toast("Add new points success", "info");
        }, 100);
    }

    const saveAllChanges = () => {
        setTimeout(async () => {
            try {
                const response = await axiosPrivate.post(Constants.API_URL.TEMPLATE.POINT.UPDATE_ALL, {
                    id_template: id,
                    points: pointList
                }, {
                    headers: {
                        "Content-Type": "application/json"
                    }
                });

                if (response?.status === 200) {
                    setDefaultPointList(response?.data);
                    setIsReset(true);
                    setIsSetUp(true);
                    setIsChanged(false);
                    setEditedPoint({});
                    LibToast.toast("Save all changes success", "info");
                }
            } catch (error) {
                let msg = loginService.handleMissingInfo(error);
                if (typeof msg === "string") {
                    LibToast.toast(msg, "error");
                } else if (!msg) {
                    LibToast.toast("Save all changes failed", "error");
                } else {
                    navigate("/", { replace: true })
                }
            }
        }, 100);
    };
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
        point,
        isChanged,
        setIsChanged,
        saveAllChanges,
        temporaryPointList,
    };
}

export default usePointList;