import { useEffect, useState } from "react";
import { createColumnHelper } from "@tanstack/react-table";
import { useNavigate } from "react-router-dom";
import _ from "lodash";
import * as yup from "yup";

import { useTemplate } from "../useTemplate";
import useAxiosPrivate from "../../../../../../hooks/useAxiosPrivate";
import { loginService } from "../../../../../../services/loginService";

import FormInput, { FormInputEnum } from "../../../../../../components/formInput/FormInput";
import Button from "../../../../../../components/button/Button";
import Constants from "../../../../../../utils/Constants";
import LibToast from "../../../../../../utils/LibToast";

import {
  RowAdapter,
  POINT_CONFIG,
  resortIndex,
} from "../../../../../../utils/TemplateHelper";
import { ReactComponent as ExpandIcon } from "../../../../../../assets/images/chevron-down.svg";
import { ReactComponent as CollapseIcon } from "../../../../../../assets/images/chevron-up.svg";

export default function useControlGroups() {
  const {
    id,
    defaultControlGroupList,
    setDefaultControlGroupList,
    setDefaultPointList,
  } =
    useTemplate();

  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [point, setPoint] = useState({});
  const [pointList, setPointList] = useState([]);

  const [rowSelection, setRowSelection] = useState({});
  const [isSetUp, setIsSetUp] = useState(true);
  const [addChildrenModal, setAddChildrenModal] = useState({
    [POINT_CONFIG.CONTROL_GROUP.name]: {
      isOpen: false,
      initialValues: {
        num_of_point: 1,
        is_clone_from_last: false,
      },
      validationSchema: yup.object().shape({
        num_of_point: yup
          .number()
          .required("Required")
          .min(1, "Minimum 1")
          .max(3, "Maximum 3"),
      }),
      fields: [
        {
          key: "add_type",
          name: "add_type",
          label: "Add Type",
          required: true,
          enum: FormInputEnum.Select.type,
          isShow: true,
        },
        {
          key: "num_of_point",
          name: "num_of_point",
          type: "number",
          label: "Number of Points",
          placeholder: "Number of Points",
          required: true,
          enum: FormInputEnum.Text.type,
          isShow: true,
        },
        {
          key: "is_clone_from_last",
          name: "is_clone_from_last",
          type: "checkbox",
          label: "Clone from last",
          placeholder: "Clone from last Point",
          required: false,
          enum: FormInputEnum.Check.type,
          isShow: true,
          // onChange: (e) => setIsClone(e.target.checked),
        },
      ],
      onSubmit: (data) => addNewChildren(data),
    },
  });
  const output = document.getElementById("progress");

  const addNewControlGroupInit = {
    name: "",
    description: "",
    value: 0,
    attributes: 0,
  };

  const addNewCGSchema = yup.object().shape({
    name: yup.string().required("Required"),
    attributes: yup
      .number()
      .required("Required")
      .min(0, "Minimum 0")
      .max(2, "Maximum 2"),
  });

  /**
   * Add a new control group to the pointList and update the pointList with the updated control group list
   * @author nhan.tran 2024-04-02
   */
  useEffect(() => {
    if (!isSetUp) return;

    if (output.innerHTML === "") {
      output.innerHTML = "<div><img src='/loading.gif' /></div>";
    }

    setTimeout(() => {
      let groupCount = 0;
      let data = defaultControlGroupList?.map((group) => {
        return {
          ...new RowAdapter({
            ...group,
            index: groupCount++,
            config: POINT_CONFIG.CONTROL_GROUP,
          }).getRow(),
          subRows:
            group?.children?.map((point) => {
              return {
                ...new RowAdapter(point).getRow(),
              };
            }) || [],
        };
      });
      setPointList(resortIndex(data, POINT_CONFIG.CONTROL_GROUP));
      setRowSelection({});
    }, 100);

    setTimeout(() => {
      setIsSetUp(false);
      output.innerHTML = "";
    }, 100);
  }, [defaultControlGroupList]);

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
  const handlePointEdit = (item) => {
    setTimeout(() => {
      setIsModalOpen(true);
      setPoint(item);
    }, 100);
  };

  /**
   * Update the point in the pointList
   * @author nhan.tran 2024-04-02
   * @param {Object} newPoint The new point to be updated
   */
  const updatePoint = (newPoint) => {
    if (!newPoint) return;

    let updatedPoint = { ...newPoint };
    setTimeout(() => {
      var isFound = false;
      setDefaultControlGroupList([
        ...defaultControlGroupList.map((group) => {
          if (isFound) return group;

          let children = group?.children || [];
          if (group.id === newPoint.id) {
            updatedPoint = {
              ...updatedPoint,
              children: children,
            };
            isFound = true;
            return updatedPoint;
          }

          let updatedPoints = children.map((p) => {
            if (isFound) return p;

            if (p.id === newPoint.id) {
              return newPoint;
            }

            return p;
          });

          return {
            ...group,
            children: updatedPoints,
          };
        }),
      ]);

      setIsSetUp(true);
      setPoint({});
    }, 100);
  };

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
              is_check: rowSelection[`${index}.${sindex}.${pindex}`] || false,
            };
          });
          return {
            ...string,
            is_check: rowSelection[`${index}.${sindex}`] || false,
            subRows: subRows || [],
          };
        });
        return {
          ...point,
          is_check: rowSelection[index] || false,
          subRows: subRows || [],
        };
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
          <Button
            variant="dark"
            onClick={() =>
              table.getIsSomeRowsExpanded()
                ? table.toggleAllRowsExpanded(false)
                : table.toggleAllRowsExpanded()
            }
          >
            <Button.Image
              image={
                table.getIsAllRowsExpanded() ||
                  table.getIsSomeRowsExpanded() ? (
                  <CollapseIcon />
                ) : (
                  <ExpandIcon />
                )
              }
            />
          </Button>
        </div>
      ),
      cell: ({ row }) => (
        <div style={{ paddingLeft: `${row.depth * 2}rem` }}>
          {row.getCanExpand() && (
            <Button variant="dark" onClick={() => row.toggleExpanded()}>
              <Button.Image
                image={row.getIsExpanded() ? <CollapseIcon /> : <ExpandIcon />}
              />
            </Button>
          )}
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
            onChange: (e) => table.toggleAllRowsSelected(e.target.checked),
          }}
        />
      ),
      cell: ({ row }) => {
        return (
          <FormInput.Check
            {...{
              inline: true,
              name: row.original.index,
              label: !_.isEqual(
                row.original?.config,
                POINT_CONFIG.CONTROL_GROUP
              )
                ? `pt${row.original.index}`
                : `Group${row.original.index}`,
              checked: row.getIsSelected(),
              onChange: row.getToggleSelectedHandler(),
              indeterminate: row.getIsSomeSelected(),
            }}
          />
        );
      },
    }),
    columnsHelper.accessor("name", {
      id: "name",
      header: "Name",
      size: 200,
      cell: ({ row }) => (
        <div style={{ paddingLeft: `${row.depth * 2}rem` }}>
          {row.original?.name}
        </div>
      ),
    }),
    columnsHelper.accessor("unit", {
      id: "unit",
      header: "Units",
      size: 80,
    }),
    columnsHelper.accessor("class", {
      id: "class",
      header: "Class",
      size: 80,
    }),
    columnsHelper.accessor("register", {
      id: "register",
      header: "Reg",
      size: 80,
    }),
    columnsHelper.accessor("data_type", {
      id: "data_type",
      header: "Data Type",
      size: 80,
    }),
    columnsHelper.accessor("byte_order", {
      id: "byte_order",
      header: "Byte Order",
      size: 80,
    }),
    columnsHelper.accessor("slope", {
      id: "slope",
      header: "Slope",
      size: 80,
    }),
    columnsHelper.accessor("offset", {
      id: "offset",
      header: "Offset",
      size: 80,
    }),
    columnsHelper.accessor("multreg", {
      id: "multreg",
      header: "Mult Reg",
      size: 80,
    }),
    columnsHelper.accessor("invalidvalue", {
      id: "invalidvalue",
      header: "Invalid Bit Pattern",
      size: 50,
    }),
    columnsHelper.accessor("action", {
      id: "action",
      header: <div className="text-center">Actions</div>,
      cell: ({ row }) => (
        <div className="d-flex justify-content-center">
          <Button onClick={() => handlePointEdit(row.original)}>
            <Button.Text text="Edit" />
          </Button>
          {row.original?.config && (
            <Button
              className="mx-2"
              onClick={() => {
                let nums = row?.original?.attributes - row.original?.subRows?.length + 1;
                let canAddMoreChildren = row?.original?.attributes !== 0 && nums > 0;
                setTimeout(() => {
                  setAddChildrenModal({
                    ...addChildrenModal,
                    [row.original?.config.name]: {
                      ...addChildrenModal[row.original?.config.name],
                      isReachedLimit: !canAddMoreChildren && row?.original?.attributes !== 0,
                      remainingSlots: row?.original?.attributes !== 0 ? nums : "unlimited",
                      validationSchema: yup.object().shape({
                        num_of_point: yup
                          .number()
                          .required("Required")
                          .min(1, "Minimum is 1")
                          .max(
                            canAddMoreChildren ? nums : 10,
                            `${canAddMoreChildren ? `Maximum is ${nums}` : "Maximum is 10"}`
                          ),
                      }),
                      isOpen: true,
                      id: row.original.id,
                      has_children: row.original?.subRows?.length > 0,
                    },
                  })
                }, 100);
              }}
            >
              <Button.Text text={`Add ${row.original?.config.name}`} />
            </Button>
          )}
        </div>
      ),
    }),
  ];

  /**
   * Remove the selected points from the pointList and update the pointList with the updated points
   * @author nhan.tran 2024-04-02
   */
  const removePoint = ({
    isGroupSelected,
    isGroupOnly,
    isChildrenSelected,
    isDeletePoints,
  }) => {
    if (Object.keys(rowSelection).length === 0) {
      LibToast.toast("No point selected", "error");
      return;
    }

    let url = isDeletePoints ?
      Constants.API_URL.TEMPLATE.POINT.DELETE :
      isChildrenSelected ?
        Constants.API_URL.TEMPLATE.POINT.REMOVE_GROUP :
        Constants.API_URL.TEMPLATE.CONTROL_GROUP.DELETE;
    let successMsg = isDeletePoints ?
      "Delete points success" :
      isChildrenSelected ?
        "Remove points success. You can see them in the Point List Tab" :
        isGroupOnly ?
          "Delete control group success. You can see the points of this group in the Point List Tab" :
          "Delete control group success";
    let body = {}

    if (isChildrenSelected) {
      let deletePoint = [];
      Object.keys(rowSelection).forEach((key) => {
        let splitKey = key.split(".");
        if (splitKey.length > 1) {
          deletePoint.push(pointList[parseInt(splitKey[0])].subRows[parseInt(splitKey[1])]);
        }
      });

      let data = deletePoint.map((point) => {
        return {
          id_point: point?.id,
          id_pointkey: point?.id_pointkey,
        };
      });
      body = {
        id_template: id,
        points: data,
      }
    }

    if (isGroupSelected) {
      let deleteGroup = [];
      Object.keys(rowSelection).forEach((key) => {
        if (key?.split(".").length > 1) {
          return;
        }

        if (isGroupSelected && !isGroupOnly) {
          deleteGroup.push(pointList[parseInt(key)]);
          return;
        }

        deleteGroup.push({ ...pointList[parseInt(key)], children: [] });
      });

      body = {
        id_template: id,
        control_group: deleteGroup,
      };
    }

    output.innerHTML = "<div><img src='/loading.gif' /></div>";
    setTimeout(async () => {
      try {
        const response = await axiosPrivate.post(
          url,
          body,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response?.status === 200) {
          LibToast.toast(successMsg, "info");
          setDefaultControlGroupList(response?.data?.control_group_list);
          setDefaultPointList(response?.data?.point_list);
          setRowSelection({});
          setIsSetUp(true);
        }
      } catch (error) {
        let msg = loginService.handleMissingInfo(error);
        if (typeof msg === "string") {
          LibToast.toast(msg, "error");
          return;
        }

        if (!msg) {
          LibToast.toast("Delete point failed", "error");
          return;
        }

        navigate("/", { replace: true });
      } finally {
        output.innerHTML = "";
      }
    }, 300);
  };

  /**
   * Add new children to the pointList and update the pointList with the updated children
   * @param {Object} data The data of the new children to be added
   * @author nhan.tran 2024-04-10
   */
  const addNewChildren = (data) => {
    console.log(data);
    let body = {
      number_of_point: data.num_of_point,
      id_template: id,
      id_control_group: data.id_control_group,
      is_clone_from_last: data.is_clone_from_last || false,
      selected_points: data?.selected_points || null,
    };

    output.innerHTML = "<div><img src='/loading.gif' /></div>";

    setTimeout(async () => {
      try {
        const response = await axiosPrivate.post(
          Constants.API_URL.TEMPLATE.POINT.ADD_POINT,
          body,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response?.status === 200) {
          setDefaultControlGroupList(response?.data?.control_group_list);
          setDefaultPointList(response?.data?.point_list);
          setRowSelection({});
          setIsSetUp(true);
          LibToast.toast("Add new children success", "info");
        }
      } catch (error) {
        let msg = loginService.handleMissingInfo(error);
        if (typeof msg === "string") {
          LibToast.toast(msg, "error");
        } else if (!msg) {
          LibToast.toast("Add new children failed", "error");
        } else {
          navigate("/", { replace: true });
        }
      } finally {
        output.innerHTML = "";
        setAddChildrenModal({
          ...addChildrenModal,
          [POINT_CONFIG.CONTROL_GROUP.name]: {
            ...addChildrenModal[POINT_CONFIG.CONTROL_GROUP.name],
            isOpen: false,
          },
        });
      }
    }, 300);
  };

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
    removePoint,
    addNewControlGroupInit,
    addNewCGSchema,
    addChildrenModal,
    setAddChildrenModal,
    setIsSetUp,
  };
}
