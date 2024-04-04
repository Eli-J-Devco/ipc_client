/********************************************************
* Copyright 2020-2021 NEXT WAVE ENERGY MONITORING INC.
* All rights reserved.
* 
*********************************************************/
import { useEffect, useState } from "react";
import { createColumnHelper } from "@tanstack/react-table";
import { useNavigate } from "react-router-dom";
import _ from "lodash";

import { useTemplate } from "../useTemplate";
import useAxiosPrivate from "../../../../../../hooks/useAxiosPrivate";
import { loginService } from "../../../../../../services/loginService";

import FormInput from "../../../../../../components/formInput/FormInput";
import Button from "../../../../../../components/button/Button";
import Constants from "../../../../../../utils/Constants";
import LibToast from "../../../../../../utils/LibToast";

import { RowAdapter, POINT_CONFIG, resortIndex } from "../../../../../../utils/TemplateHelper";
import { ReactComponent as ExpandIcon } from "../../../../../../assets/images/chevron-down.svg";
import { ReactComponent as CollapseIcon } from "../../../../../../assets/images/chevron-up.svg";

function useMPPTList() {
    const {
        id,
        defaultMPPTList,
        setDefaultMPPTList,
        editedMPPT,
        setEditedMPPT,
        isChanged,
        setIsChanged
    } = useTemplate();

    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [point, setPoint] = useState({});
    const [pointList, setPointList] = useState([]);

    const [rowSelection, setRowSelection] = useState({});
    const [isReset, setIsReset] = useState(false);
    const [isForceUpdate, setIsForceUpdate] = useState(false);
    const [isSetUp, setIsSetUp] = useState(true);
    const output = document.getElementById("progress");
    /**
     * This useEffect is used to set the initial state of the pointList
     * It is only called once when the convertedPointList is set
     * It is also used to set the initial state of the editedMPPT, defaultMPPTList, isReset and rowSelection
     * @author nhan.tran 2024-04-02
     */
    useEffect(() => {
        if (defaultMPPTList?.length === 0) return;
        if (!isSetUp) return;

        output.innerHTML = "<div><img src='/loading.gif' /></div>";
        if (!isReset && !editedMPPT.state) {
            setTimeout(() => {
                setPointList(_.cloneDeep(editedMPPT.data));

                editedMPPT?.data?.forEach((mppt, index) => {
                    mppt?.is_check && (rowSelection[index] = true);
                    mppt?.subRows?.forEach((string, sindex) => {
                        string?.is_check && (rowSelection[`${index}.${sindex}`] = true);
                        string?.subRows?.forEach((panel, pindex) => {
                            panel?.is_check && (rowSelection[`${index}.${sindex}.${pindex}`] = true);
                        });
                    });
                });
            }, 100);
        } else {
            setTimeout(() => {
                let data = defaultMPPTList.map((mppt, index) => {
                    return {
                        ...mppt,
                        subRows: mppt?.children?.map((string, sindex) => {
                            return {
                                ...string,
                                subRows: string?.children?.map((panel, pindex) => {
                                    return {
                                        ...panel
                                    }
                                }) || []
                            }
                        }) || []
                    }
                });
                setPointList(resortIndex(data, POINT_CONFIG.MPPT));
                setRowSelection({});
                setIsChanged({ ...isChanged, mppt: false });
                setIsReset(false);
            }, 100);
        }
        setTimeout(() => {
            console.log("reset", isReset);
            setIsSetUp(false);
            output.innerHTML = "";
        }, 100);
    }, [defaultMPPTList, isReset]);

    /**
     * This useEffect is used to update the editedMPPT when the pointList is updated
     * It is only called when the pointList is updated
     * @author nhan.tran 2024-04-02
     */
    useEffect(() => {
        if (pointList.length === 0 && !isForceUpdate) return;

        !_.isEqual(pointList, editedMPPT.data) &&
            setTimeout(() => {
                setEditedMPPT({
                    state: false,
                    data: _.cloneDeep(pointList)
                });
                setIsChanged({ ...isChanged, mppt: true });
                setIsForceUpdate(false);
            }, 100);
    }, [pointList, isForceUpdate]);

    /**
     * Close the modal
     * @author nhan.tran 2024-04-02
     */
    const closeModal = () => setIsModalOpen(false);

    /**
     * Handle the point edit
     * @author nhan.tran 2024-04-02
     * @param {Object} item The point to be edited
     */
    const handlePointEdit = item => {
        setIsModalOpen(true);
        setPoint(item);
    }

    /**
     * Update the point in the pointList
     * @author nhan.tran 2024-04-02
     * @param {Object} newPoint The new point to be updated
     */
    const updatePoint = (newPoint) => {
        setTimeout(() => {
            let updatePointList = pointList.map((p) => {
                if (p.index === newPoint.index) {
                    return newPoint;
                }

                return {
                    ...p,
                    subRows: p.subRows.map((string) => {
                        if (string.index === newPoint.index) {
                            return newPoint;
                        }

                        return {
                            ...string,
                            subRows:
                                string.subRows.map((panel) => {
                                    if (panel.index === newPoint.index) {
                                        return newPoint;
                                    }

                                    return panel;
                                })
                        };

                    })
                };
            });

            setPointList(_.cloneDeep(updatePointList));
        }, 100);
    };

    const [row, setRow] = useState({
        row: {},
        state: false
    });

    /**
     * This useEffect is used to add a new string or panel to the pointList
     * It is only called when the row is updated
     * @author nhan.tran 2024-04-02
     */
    useEffect(() => {
        row.state && setTimeout(() => {
            let children = row.row.original?.subRows?.length || 0;
            let newChild = null;
            if (children) {
                newChild = _.cloneDeep(new RowAdapter(
                    {
                        ...row.row.original?.subRows[children - 1],
                        id: null,
                        name: _.isEqual(row.row.original?.config, POINT_CONFIG.STRING) ? "New String" : "New Panel",
                        ...(
                            _.isEqual(row.row.original?.config, POINT_CONFIG.STRING) ?
                                {
                                    config: POINT_CONFIG.PANEL,
                                    id_config_information: POINT_CONFIG.STRING.value
                                } :
                                {
                                    config: "",
                                    id_config_information: POINT_CONFIG.PANEL.value
                                }
                        ),
                        subRows: row.row.original?.subRows[children - 1]?.subRows?.map((panel, index) => ({
                            ...new RowAdapter({ ...panel, id: null, config: "" }, index).getRow()
                        })) || [],
                    }, 1).getRow());
            } else {
                row.row.original.subRows = [];
                newChild = new RowAdapter(
                    {
                        id: null,
                        name: _.isEqual(row.row.original?.config, POINT_CONFIG.STRING) ? "New String" : "New Panel",
                        ...(
                            _.isEqual(row.row.original?.config, POINT_CONFIG.STRING) ?
                                {
                                    name: "New String",
                                    config: POINT_CONFIG.PANEL,
                                } :
                                {
                                    name: "New Panel",
                                    config: ""
                                }
                        ),
                        subRows: []
                    }, 1).getRow();
            }
            row.row.original?.subRows.push(newChild);
            setPointList(resortIndex(pointList, POINT_CONFIG.MPPT));
            !row.row.getIsExpanded() && row.row.toggleExpanded();
            setRow({
                row: {},
                state: false
            });
        }, 100);
    }, [row, pointList]);

    /**
     * This useEffect is used to update the selected points in the pointList
     * It is only called when the rowSelection is updated
     * It is also used to update the pointList with the updated selected points
     * @author nhan.tran 2024-04-02
     */
    useEffect(() => {
        if (Object.keys(rowSelection).length === 0) return;

        setTimeout(() => {
            let updateSelectedPoints = pointList.map((point, index) => {
                let subRows = point?.subRows?.map((string, sindex) => {
                    let subRows = string?.subRows?.map((panel, pindex) => {
                        return {
                            ...panel,
                            is_check: rowSelection[`${index}.${sindex}.${pindex}`] || false
                        }
                    });
                    return {
                        ...string,
                        is_check: rowSelection[`${index}.${sindex}`] || false,
                        subRows: subRows || []
                    }
                });
                return {
                    ...point,
                    is_check: rowSelection[index] || false,
                    subRows: subRows || []
                }
            });
            setPointList([...updateSelectedPoints]);
        }, 100);
    }, [rowSelection]);

    const columnsHelper = createColumnHelper();
    const columns = [
        columnsHelper.accessor("toggle", {
            id: "toggle",
            size: 10,
            header: ({ table }) => (
                <div>
                    <Button variant="dark" onClick={() => table.getIsSomeRowsExpanded() ? table.toggleAllRowsExpanded(false) : table.toggleAllRowsExpanded()}>
                        <Button.Image image={table.getIsAllRowsExpanded() || table.getIsSomeRowsExpanded() ? <CollapseIcon /> : <ExpandIcon />} />
                    </Button>
                </div>
            ),
            cell: ({ row }) => (
                <div style={{ paddingLeft: `${row.depth * 2}rem` }}>
                    {
                        row.getCanExpand() && (
                            <Button variant="dark" onClick={() => row.toggleExpanded()}>
                                <Button.Image image={row.getIsExpanded() ? <CollapseIcon /> : <ExpandIcon />} />
                            </Button>
                        )
                    }
                </div>
            ),
        }),
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
                            disabled: POINT_CONFIG.MPPT_CONFIG.values.includes(row.original?.id_config_information),
                            indeterminate: row.getIsSomeSelected(),
                        }}
                    />
                )
            }
        }),
        columnsHelper.accessor("name", {
            id: "name",
            header: "Name",
            size: 200
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
            size: 50
        }),
        columnsHelper.accessor("action", {
            id: "action",
            header: <div className="text-center">Actions</div>,
            cell: ({ row }) => (
                <div className="d-flex justify-content-center">
                    <Button onClick={() => handlePointEdit(row.original)}>
                        <Button.Text text="Edit" />
                    </Button>
                    {
                        row.original?.config &&
                        <Button className="mx-2" onClick={() => setRow({ row: row, state: true })}>
                            <Button.Text text={`Add ${row.original?.config.name}`} />
                        </Button>
                    }
                </div>
            )
        })
    ]

    /**
     * Add a new MPPT to the pointList
     * @author nhan.tran 2024-04-02
     */
    const addNewMPPT = () => {
        setTimeout(() => {
            let mpptLength = pointList.length;
            if (mpptLength === 0) {
                let newMPPT = _.cloneDeep(new RowAdapter({
                    id: null,
                    name: "New MPPT",
                    config: POINT_CONFIG.STRING,
                    subRows: POINT_CONFIG.MPPT_CONFIG.values.map((config, index) => {
                        return new RowAdapter({
                            id: null,
                            name: POINT_CONFIG.MPPT_CONFIG.names[index],
                            id_config_information: config,
                            config: "",
                        }, index).getRow();
                    })
                }, 0).getRow());
                setPointList([newMPPT]);
                return;
            }
            let newMPPT = _.cloneDeep(new RowAdapter(
                {
                    ...pointList[mpptLength - 1],
                    id: null,
                    name: `New MPPT ${mpptLength + 1}`,
                    config: pointList[mpptLength - 1]?.config,
                    subRows: pointList[mpptLength - 1]?.subRows?.map((string, index) => ({
                        ...new RowAdapter({ ...string }, index).getRow(),
                        id: null,
                        subRows: string?.subRows?.map((panel, pindex) => ({
                            ...new RowAdapter({ ...panel }, index).getRow(),
                            id: null
                        })) || []
                    })) || []
                },
                0)
                .getRow());
            setPointList(resortIndex([...pointList, newMPPT], POINT_CONFIG.MPPT));
        }, 100);
    }

    /**
     * Remove the selected points from the pointList and update the pointList with the updated points
     * @author nhan.tran 2024-04-02
     */
    const removePoint = () => {
        if (Object.keys(rowSelection).length === 0) {
            LibToast.toast("No point selected", "error");
            return;
        }

        let newPointList = pointList.filter((point, index) => {
            if (rowSelection[index]) {
                return false;
            }

            let newSubRows = point?.subRows?.filter((string, sindex) => {
                if (rowSelection[`${index}.${sindex}`]) {
                    return false;
                }

                let newPanel = string?.subRows?.filter((panel, pindex) => {
                    return !rowSelection[`${index}.${sindex}.${pindex}`];
                });

                string.subRows = newPanel;
                return true;
            });

            point.subRows = newSubRows;
            return true;
        });

        setPointList(resortIndex(newPointList, POINT_CONFIG.MPPT));
        setRowSelection({});
        setIsForceUpdate(newPointList.length === 0);
        setIsChanged({ ...isChanged, mppt: true });
        // let deletePoint = [];
        // rowSelection && Object.keys(rowSelection).forEach(key => {
        //     let keys = key.split(".");
        //     if (keys.length === 1) {
        //         deletePoint.push(pointList[keys[0]]);
        //     }

        //     if (keys.length === 2 && pointList[keys[0]]?.subRows) {
        //         deletePoint.push(pointList[keys[0]].subRows[keys[1]]);
        //     }

        //     if (keys.length === 3 && pointList[keys[0]]?.subRows[keys[1]]?.subRows) {
        //         deletePoint.push(pointList[keys[0]].subRows[keys[1]].subRows[keys[2]]);
        //     }
        // });
        // let data = deletePoint.map(point => {
        //     return {
        //         id_point: point?.id,
        //         id_pointkey: point?.name,
        //         id_config_information: point?.id_config_information,
        //         parent: point?.parent
        //     }
        // });

        // var output = document.getElementById("progress");
        // output.innerHTML = "<div><img src='/loading.gif' /></div>";
        // setTimeout(async () => {
        //     try {
        //         const response = await axiosPrivate.post(
        //             Constants.API_URL.TEMPLATE.POINT.DELETE_MPPT,
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
        //             setDefaultMPPTList(response?.data?.mppt_list);
        //             setIsReset(true);
        //             setEditedMPPT({});
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

    /**
     * Reset the pointList to the defaultMPPTList when the reset button is clicked
     * @author nhan.tran 2024-04-02
     */
    const resetTemp = () => {
        setTimeout(() => {
            setIsReset(true);
            setIsSetUp(true);
        }, 100);
    }

    return {
        isModalOpen,
        closeModal,
        columns,
        pointList,
        handlePointEdit,
        point,
        updatePoint,
        rowSelection,
        setRowSelection,
        addNewMPPT,
        removePoint,
        resetTemp
    };
}

export default useMPPTList;