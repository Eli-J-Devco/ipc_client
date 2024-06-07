/********************************************************
 * Copyright 2020-2021 NEXT WAVE ENERGY MONITORING INC.
 * All rights reserved.
 *
 *********************************************************/
import { useEffect, useState } from "react";
import { createColumnHelper } from "@tanstack/react-table";
import { useNavigate } from "react-router-dom";
import _ from "lodash";
import * as yup from "yup";

import { useTemplate } from "../useTemplate";
import useAxiosPrivate from "../../../../../../hooks/useAxiosPrivate";
import { loginService } from "../../../../../../services/loginService";

import FormInput from "../../../../../../components/formInput/FormInput";
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

function useStringList() {
  const { id, defaultStringList, setDefaultStringList } = useTemplate();

  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [point, setPoint] = useState({});
  const [pointList, setPointList] = useState([]);

  const [rowSelection, setRowSelection] = useState({});
  const [isSetUp, setIsSetUp] = useState(true);
  const [isClone, setIsClone] = useState(false);
  const [addChildrenModal, setAddChildrenModal] = useState({
    [POINT_CONFIG.PANEL.name]: {
      isOpen: false,
      initialValues: {
        num_of_panels: 1,
        is_clone_from_last: false,
      },
      validationSchema: yup.object().shape({
        num_of_panels: yup
          .number()
          .required("Required")
          .min(1, "Minimum 1 panel")
          .max(10, "Maximum 10 panels per string"),
      }),
      fields: [
        {
          name: "num_of_panels",
          type: "number",
          label: "Number of Panel",
          placeholder: "Number of Panel",
          required: true,
        },
        {
          name: "is_clone_from_last",
          type: "checkbox",
          label: "Clone from last",
          placeholder: "Clone from last Panel",
          required: false,
          onChange: (e) => setIsClone(e.target.checked),
        },
      ],
      onSubmit: (data) => addNewChildren(data),
    },
  });
  const output = document.getElementById("progress");

  const addNewStringInit = {
    is_clone_from_last: isClone,
    num_of_strings: 1,
    num_of_panels: 0,
  };

  const addNewStringSchema = yup.object().shape({
    num_of_strings: yup
      .number()
      .required("Required")
      .min(1, "Minimum 1 point")
      .max(10, "Maximum 10 string"),
    ...(!isClone
      ? {
          num_of_panels: yup
            .number()
            .required("Required")
            .min(0, "Minimum 0 panel")
            .max(10, "Maximum 10 panels per string"),
        }
      : {}),
  });

  /**
   * This useEffect is used to set the initial state of the pointList
   * It is only called once when the convertedPointList is set
   * It is also used to set the initial state of the editedMPPT, defaultStringList, isReset and rowSelection
   * @author nhan.tran 2024-04-02
   */
  useEffect(() => {
    if (!isSetUp) return;

    if (output.innerHTML === "") {
      output.innerHTML = "<div><img src='/loading.gif' /></div>";
    }

    setTimeout(() => {
      let data = defaultStringList?.map((string, index) => {
        return {
          ...new RowAdapter(
            {
              ...string,
              config: POINT_CONFIG.PANEL,
            },
            index
          ).getRow(),
          subRows:
            string?.children?.map((panel, pindex) => {
              return {
                ...new RowAdapter(panel, pindex).getRow(),
              };
            }) || [],
        };
      });
      setPointList(resortIndex(_.cloneDeep(data)));
      setRowSelection({});
    }, 100);

    setTimeout(() => {
      setIsSetUp(false);
      output.innerHTML = "";
    }, 100);
  }, [defaultStringList]);

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
    let updatedPoint = { ...newPoint };
    setTimeout(() => {
      var isFound = false;
      setDefaultStringList([
        ...defaultStringList.map((mppt) => {
          if (isFound) return mppt;

          let children = mppt?.children || [];
          if (mppt.id === newPoint.id) {
            updatedPoint = {
              ...updatedPoint,
              children: children,
            };
            isFound = true;
            return updatedPoint;
          }

          let updatedString = children.map((string) => {
            if (isFound) return string;

            let panels = string?.children || [];
            if (string.id === newPoint.id) {
              updatedPoint = {
                ...updatedPoint,
                children: panels,
              };

              isFound = true;
              return updatedPoint;
            }

            let updatedPanel = panels.map((panel) => {
              if (isFound) return panel;

              if (panel.id === newPoint.id) {
                updatedPoint = {
                  ...updatedPoint,
                };

                isFound = true;
                return updatedPoint;
              }

              return panel;
            });

            return {
              ...string,
              children: updatedPanel,
            };
          });

          return {
            ...mppt,
            children: updatedString,
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
          <div style={{ paddingLeft: `${row.depth * 2}rem` }}>
            <FormInput.Check
              {...{
                inline: true,
                name: row.original.index,
                label: `pt${row.original.index}`,
                checked: row.getIsSelected(),
                onChange: row.getToggleSelectedHandler(),
                disabled: POINT_CONFIG.MPPT_CONFIG.values.includes(
                  row.original?.id_config_information
                ),
                indeterminate: row.getIsSomeSelected(),
              }}
            />
          </div>
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
              onClick={() =>
                setAddChildrenModal({
                  ...addChildrenModal,
                  [row.original?.config.name]: {
                    ...addChildrenModal[row.original?.config.name],
                    isOpen: true,
                    id: row.original.id,
                    has_children: _.isEqual(
                      row.original?.config,
                      POINT_CONFIG.STRING
                    )
                      ? row.original?.subRows?.length - 2
                      : row.original?.subRows?.length,
                  },
                })
              }
            >
              <Button.Text text={`Add ${row.original?.config.name}`} />
            </Button>
          )}
        </div>
      ),
    }),
  ];

  /**
   * Add a new MPPT to the pointList
   * @author nhan.tran 2024-04-02
   */
  const addNewString = (data) => {
    output.innerHTML = "<div><img src='/loading.gif' /></div>";
    setTimeout(async () => {
      try {
        const response = await axiosPrivate.post(
          Constants.API_URL.POINT_MPPT.ADD_STRING,
          {
            ...data,
            id_template: id,
            is_string_only: true,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response?.status === 200) {
          setDefaultStringList(response?.data);
          setRowSelection({});
          setIsSetUp(true);
          LibToast.toast("Add new string success", "info");
        }
      } catch (error) {
        loginService.handleMissingInfo(error, "Failed to add new MPPT") &&
          navigate("/", { replace: true });
        output.innerHTML = "";
      }
    }, 300);
  };

  /**
   * Remove the selected points from the pointList and update the pointList with the updated points
   * @author nhan.tran 2024-04-02
   */
  const removePoint = () => {
    if (Object.keys(rowSelection).length === 0) {
      LibToast.toast("No point selected", "error");
      return;
    }

    let deletePoint = [];
    rowSelection &&
      Object.keys(rowSelection).forEach((key) => {
        let keys = key.split(".");
        if (keys.length === 1) {
          deletePoint.push(pointList[keys[0]]);
        }

        if (keys.length === 2 && pointList[keys[0]]?.subRows) {
          deletePoint.push(pointList[keys[0]].subRows[keys[1]]);
        }

        if (
          keys.length === 3 &&
          pointList[keys[0]]?.subRows[keys[1]]?.subRows
        ) {
          deletePoint.push(
            pointList[keys[0]].subRows[keys[1]].subRows[keys[2]]
          );
        }
      });

    let data = {
      id_points: deletePoint.map((point) => point?.id),
      id_template: id,
      is_string_only: true,
    };

    output.innerHTML = "<div><img src='/loading.gif' /></div>";
    setTimeout(async () => {
      try {
        const response = await axiosPrivate.post(
          Constants.API_URL.POINT_MPPT.DELETE,
          data,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response?.status === 200) {
          LibToast.toast("Delete points success", "info");
          setDefaultStringList(response?.data);
          setIsSetUp(true);
        }
      } catch (error) {
        loginService.handleMissingInfo(error, "Failed to delete points") &&
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
    let url = Constants.API_URL.POINT_MPPT.ADD_PANEL;
    let body = {
      num_of_panels: data.num_of_panels,
      is_clone_from_last: data.is_clone_from_last,
      id_template: id,
      is_string_only: true,
      parent: data.id,
    };

    output.innerHTML = "<div><img src='/loading.gif' /></div>";

    setTimeout(async () => {
      try {
        const response = await axiosPrivate.post(url, body, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response?.status === 200) {
          setDefaultStringList(response?.data);
          setRowSelection({});
          setIsSetUp(true);
          LibToast.toast("Add new children success", "info");
        }
      } catch (error) {
        loginService.handleMissingInfo(error, "Failed to add new children") &&
          navigate("/", { replace: true });
        output.innerHTML = "";
      } finally {
        setAddChildrenModal({
          ...addChildrenModal,
          [POINT_CONFIG.PANEL.name]: {
            ...addChildrenModal[POINT_CONFIG.PANEL.name],
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
    addNewString,
    removePoint,
    addNewStringInit,
    addNewStringSchema,
    isClone,
    setIsClone,
    addChildrenModal,
    setAddChildrenModal,
  };
}

export default useStringList;
