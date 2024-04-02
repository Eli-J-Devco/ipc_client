import { useEffect, useRef, useState } from "react";
import { useTemplate } from "../useTemplate";
import { createColumnHelper } from "@tanstack/react-table";
import FormInput from "../../../../../../components/formInput/FormInput";
import Button from "../../../../../../components/button/Button";
import { ReactComponent as ExpandIcon } from "../../../../../../assets/images/chevron-down.svg";
import { ReactComponent as CollapseIcon } from "../../../../../../assets/images/chevron-up.svg";
import _, { keys } from "lodash";
import useAxiosPrivate from "../../../../../../hooks/useAxiosPrivate";
import Constants from "../../../../../../utils/Constants";
import LibToast from "../../../../../../utils/LibToast";
import { loginService } from "../../../../../../services/loginService";
import { useNavigate } from "react-router-dom";
const CONFIG = {
    STRING: {
        value: 276,
        name: "String"
    },
    PANEL: {
        value: 278,
        name: "Panel"
    },
    MPPT_CONFIG: {
        values: [274, 275],
        names: ["MPPT Voltage", "MPPT Current"]
    }
}

class RowAdapter {
    constructor(item = {
        id: 0,
        name: "",
        id_config_information: 0,
        config: "",
        type_units: {
            unit: ""
        },
        type_class: {
            type_class: ""
        },
        register: "",
        type_datatype: {
            data_type: ""
        },
        type_byteorder: {
            byte_order: ""
        },
        slope: 0,
        offset: 0,
        multreg: 0,
        invalidvalue: 0,
        type_point: 0,
        is_check: false,
        check_invalid: true,
        check_slope: true,
        check_offset: true,
        check_multreg: true,
        check_name: true,
        check_unit: true,
        parent: 0,
        subRows: []
    }, index) {
        this.index = index
        this.id = item.id
        this.name = item.name
        this.id_config_information = item.id_config_information
        this.config = item.config
        this.unit = item?.type_units?.unit
        this.class = item?.type_class?.type_class
        this.register = item.register
        this.data_type = item?.type_datatype?.data_type
        this.byte_order = item?.type_byteorder?.byte_order
        this.slope = item.slope
        this.offset = item.offset
        this.multreg = item.multreg
        this.invalidvalue = item.invalidvalue
        this.type_point = item?.type_point
        this.is_check = item.is_check
        this.type_byteorder = item?.type_byteorder
        this.type_class = item?.type_class
        this.type_datatype = item?.type_datatype
        this.type_units = item?.type_units
        this.check_invalid = item?.invalidvalueenabled
        this.check_slope = item?.slopeenabled
        this.check_offset = item?.offsetenabled
        this.check_multreg = item?.multregenabled
        this.check_name = item?.nameedit
        this.check_unit = item?.unitsedit
        this.parent = item.parent
        this.subRows = item.subRows
    }

    getRow() {
        return {
            index: this.index,
            id: this.id,
            name: this.name,
            config: this.config,
            id_config_information: this.id_config_information,
            unit: this.unit,
            class: this.class,
            register: this.register,
            data_type: this.data_type,
            byte_order: this.byte_order,
            slope: this.slope,
            offset: this.offset,
            multreg: this.multreg,
            invalidvalue: this.invalidvalue,
            type_point: this.type_point,
            is_check: this.is_check,
            type_byteorder: this.type_byteorder,
            type_class: this.type_class,
            type_datatype: this.type_datatype,
            type_units: this.type_units,
            check_invalid: this.check_invalid,
            check_slope: this.check_slope,
            check_offset: this.check_offset,
            check_multreg: this.check_multreg,
            check_name: this.check_name,
            check_unit: this.check_unit,
            parent: this.parent,
            subRows: this.subRows
        }
    }
}

function useMPPTList() {
    const {
        id,
        setDefaultMPPTList,
        defaultMPPTList,
        editedMPPT,
        setEditedMPPT
    } = useTemplate();
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [point, setPoint] = useState({});

    const [pointList, setPointList] = useState([]);
    const [rowSelection, setRowSelection] = useState({});
    const [isReset, setIsReset] = useState(false);

    useEffect(() => {
        if (!defaultMPPTList) return;

        if (!isReset && editedMPPT.length > 0) {
            setTimeout(() => {
                setPointList(_.cloneDeep(editedMPPT));

                editedMPPT.forEach((mppt, index) => {
                    mppt?.is_check && (rowSelection[index] = true);
                    mppt?.subRows?.forEach((string, sindex) => {
                        string?.is_check && (rowSelection[`${index}.${sindex}`] = true);
                        string?.subRows?.forEach((panel, pindex) => {
                            panel?.is_check && (rowSelection[`${index}.${sindex}.${pindex}`] = true);
                        });
                    });
                });
            }, 100);
            return;
        } else {
            setTimeout(() => {
                let data = [];
                defaultMPPTList.forEach((mppt, index) => {
                    if (!mppt.parent)
                        data.push({
                            ...new RowAdapter({
                                ...mppt,
                                config: CONFIG.STRING,
                                is_check: false,
                                subRows:
                                    defaultMPPTList.filter(string => string.parent === mppt.id).map((string, subIndex) => ({
                                        ...new RowAdapter({
                                            ...string,
                                            config: string?.id_config_information === 276 ? CONFIG.PANEL : undefined,
                                            is_check: false,
                                            subRows:
                                                defaultMPPTList.filter(panel => panel.parent === string.id).map((panel, subSubIndex) => ({
                                                    ...new RowAdapter({
                                                        ...panel,
                                                        is_check: false,
                                                        config: ""
                                                    },
                                                        index + subIndex + subSubIndex + 2).getRow()
                                                }))

                                        }, index + subIndex + 1).getRow(),
                                    }))
                            }, index).getRow(),
                        });
                });
                setPointList(_.cloneDeep(data));
                setIsReset(false);
            }, 100);
        }
    }, [defaultMPPTList, isReset]);

    useEffect(() => {
        if (pointList.length === 0) return;

        !_.isEqual(pointList, editedMPPT) &&
            setTimeout(() => {
                setEditedMPPT(_.cloneDeep(pointList));
                resortIndex();
            }, 100);
    }, [pointList]);

    const closeModal = () => setIsModalOpen(false);
    const handlePointEdit = item => {
        setIsModalOpen(true);
        setPoint(item);
    }

    const updatePoint = (newPoint) => {
        setTimeout(() => {
            let updatePointList = pointList.map((p) => {
                if (p.id === newPoint.id) {
                    return newPoint;
                }

                return {
                    ...p,
                    subRows: p.subRows.map((string) => {
                        if (string.id === newPoint.id) {
                            return newPoint;
                        }

                        return {
                            ...string,
                            subRows:
                                string.subRows.map((panel) => {
                                    if (panel.id === newPoint.id) {
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
    useEffect(() => {
        row.state && setTimeout(() => {
            let stringLength = row.row.original?.subRows?.length || 0;
            let maxIndex = 0;

            pointList?.forEach(mppt => {
                maxIndex = Math.max(maxIndex, mppt.index);
                mppt.subRows.forEach(string => {
                    maxIndex = Math.max(maxIndex, string.index);
                    string.subRows.forEach(panel => {
                        maxIndex = Math.max(maxIndex, panel.index);
                    });
                });
            });

            let newChild = _.cloneDeep(new RowAdapter(
                {
                    ...row.row.original?.subRows[stringLength - 1],
                    id_config_information: row.row.original?.subRows[stringLength - 1]?.config,
                    subRows: row.row.original?.subRows[stringLength - 1]?.subRows?.map((panel, index) => ({
                        ...new RowAdapter({ ...panel, id_config_information: "" }, maxIndex + index + 2).getRow()
                        || new RowAdapter({ id_config_information: "" }, maxIndex + index + 2).getRow()
                    }))
                },
                maxIndex + 1)
                .getRow()
                || new RowAdapter({ id_config_information: row.row.original?.config }, maxIndex + 1).getRow());

            row.row.original?.subRows.push(newChild);
            setPointList([...pointList]);
            !row.row.getIsExpanded() && row.row.toggleExpanded();
            setRow({
                row: {},
                state: false
            });
            resortIndex();

        }, 100);
    }, [row, pointList]);

    useEffect(() => {
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
                            name: row.original.name,
                            label: `pt${row.original.index}`,
                            checked: row.getIsSelected(),
                            onChange: row.getToggleSelectedHandler(),
                            disabled: CONFIG.MPPT_CONFIG.values.includes(row.original?.id_config_information),
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

    const addNewMPPT = () => {
        console.log("add new mppt")
        setTimeout(() => {
            let mpptLength = pointList.length;
            let newMPPT = _.cloneDeep(new RowAdapter(
                {
                    ...pointList[mpptLength - 1],
                    id_config_information: pointList[mpptLength - 1]?.config,
                    subRows: pointList[mpptLength - 1]?.subRows?.map((string, index) => ({
                        ...new RowAdapter({ ...string, id_config_information: CONFIG.PANEL }, index).getRow(),
                        subRows: string?.subRows?.map((panel, pindex) => ({
                            ...new RowAdapter({ ...panel, id_config_information: "" }, index).getRow()
                        })) || []
                    })) || []
                },
                0)
                .getRow()
                || new RowAdapter({ id_config_information: row.row.original?.config }, 0).getRow());
            console.log(newMPPT)
            setPointList([...pointList, newMPPT]);
        }, 100);
    }

    const removePoint = () => {
        let deletePoint = [];
        rowSelection && Object.keys(rowSelection).forEach(key => {
            let keys = key.split(".");
            if (keys.length === 1) {
                deletePoint.push(pointList[keys[0]]);
            }

            if (keys.length === 2 && pointList[keys[0]]?.subRows) {
                deletePoint.push(pointList[keys[0]].subRows[keys[1]]);
            }

            if (keys.length === 3 && pointList[keys[0]]?.subRows[keys[1]]?.subRows) {
                deletePoint.push(pointList[keys[0]].subRows[keys[1]].subRows[keys[2]]);
            }
        });
        let data = deletePoint.map(point => {
            return {
                id_point: point?.id,
                id_pointkey: point?.name,
                id_config_information: point?.id_config_information,
                parent: point?.parent
            }
        });

        var output = document.getElementById("progress");
        output.innerHTML = "<div><img src='/loading.gif' /></div>";
        setTimeout(async () => {
            try {
                const response = await axiosPrivate.post(
                    Constants.API_URL.TEMPLATE.POINT.DELETE_MPPT,
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
                    setDefaultMPPTList(response?.data?.mppt_list);
                    setEditedMPPT({});
                }
            } catch (error) {
                let msg = loginService.handleMissingInfo(error);
                if (typeof msg === "string") {
                    LibToast.toast(msg, "error");
                } else if (!msg) {
                    LibToast.toast("Delete point failed", "error");
                } else {
                    navigate("/", { replace: true })
                }
            } finally {
                output.innerHTML = "";
            }
        }, 300)
        // console.log("deletePoint", deletePoint);
        // setPointList([...updateSelectedPoints]);
    }

    const resortIndex = () => {
        let index = 0;
        let updateSelectedPoints = pointList.map((point, ptindex) => {
            point.index = index++;
            let subRows = point?.subRows?.map((string, sindex) => {
                string.index = index++;
                let subRows = string?.subRows?.map((panel, pindex) => {
                    return {
                        ...panel,
                        index: index++
                    }
                });
                return {
                    ...string,
                    subRows: subRows || []
                }
            });
            return {
                ...point,
                subRows: subRows || []
            }
        });

        setPointList([...updateSelectedPoints]);
    }

    const resetTemp = () => {
        setIsReset(true);
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