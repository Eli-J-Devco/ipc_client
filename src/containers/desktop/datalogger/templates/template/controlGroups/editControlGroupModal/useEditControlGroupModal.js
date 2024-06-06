import { useEffect, useRef, useState } from "react";
import * as yup from "yup";
import useAxiosPrivate from "../../../../../../../hooks/useAxiosPrivate";
import Constants from "../../../../../../../utils/Constants";
import { useTemplate } from "../../useTemplate";
import LibToast from "../../../../../../../utils/LibToast";
import { loginService } from "../../../../../../../services/loginService";
import { useNavigate } from "react-router-dom";
import {
  POINT_CONFIG,
  RowAdapter,
  resortIndex,
} from "../../../../../../../utils/TemplateHelper";
import { createColumnHelper } from "@tanstack/react-table";
import FormInput from "../../../../../../../components/formInput/FormInput";
import _ from "lodash";
import Button from "../../../../../../../components/button/Button";
import { ReactComponent as ExpandIcon } from "../../../../../../../assets/images/chevron-down.svg";
import { ReactComponent as CollapseIcon } from "../../../../../../../assets/images/chevron-up.svg";

function useEditControlGroupModal(data, close, refresh, isEdit) {
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const {
    id,
    defaultPointList,
    controlGroups,
    setDefaultPointList,
    setDefaultControlGroupList,
  } = useTemplate();

  const [pointList, setPointList] = useState([]);
  const [formatGroupList, setFormatGroupList] = useState([]);
  const [pointSelection, setPointSelection] = useState([]);
  const [groupSelection, setGroupSelection] = useState([]);
  const [isSetUp, setIsSetUp] = useState(true);
  const [selectedAttributes, setSelectedAttributes] = useState({
    label: data?.attributes,
    value: data?.attributes,
  });
  const [defaultAttributes] = useState([
    { label: 0, value: 0 },
    { label: 1, value: 1 },
    { label: 2, value: 2 },
  ]);
  const [isClone, setIsClone] = useState(false);
  const [refreshTable, setRefreshTable] = useState(false);
  const [kindOfClone] = useState([
    { label: "Clone from existing groups", value: 0 },
    { label: "Add existing points to this group", value: 1 },
  ]);
  const [selectedKindOfClone, setSelectedKindOfClone] = useState(
    kindOfClone[0]
  );

  const validationSchema = yup.object({
    name: yup.string().required("Required"),
    attributes: yup.number().required("Required"),
  });

  const [initialValues, setInitialValues] = useState({
    ...data,
  });

  const output = document.getElementById("progress");
  const columnsHelper = createColumnHelper();
  const pointColumns = [
    columnsHelper.accessor("id_checkbox", {
      id: "id_checkbox",
      size: 10,
      header: ({ table }) => {
        return selectedAttributes.value === 0 ? (
          <FormInput.Check
            {...{
              inline: true,
              name: "all",
              label: "Point#",
              checked: table.getIsAllRowsSelected(),
              onChange: (e) => table.toggleAllRowsSelected(e.target.checked),
              disabled:
                selectedAttributes.value !== 0 &&
                Object.keys(pointSelection).length >=
                  selectedAttributes.value + 1,
            }}
          />
        ) : (
          <div>Point</div>
        );
      },
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
              disabled:
                selectedAttributes.value !== 0 &&
                Object.keys(pointSelection).length >=
                  selectedAttributes.value + 1 &&
                !row.getIsSelected(),
            }}
          />
        );
      },
    }),
    columnsHelper.accessor("name", {
      id: "name",
      header: "Name",
      size: 300,
    }),
  ];

  const groupColumns = [
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
      size: 20,
      header: () => <div>Group</div>,
      cell: ({ row }) => {
        return (
          <div style={{ paddingLeft: `${row.depth * 2}rem` }}>
            {_.isEqual(row.original?.config, POINT_CONFIG.CONTROL_GROUP) ? (
              <FormInput.Check
                {...{
                  inline: true,
                  name: row.original.index,
                  label: `Group${row.original.index}`,
                  checked: row.getIsSelected(),
                  onChange: row.getToggleSelectedHandler(),
                  indeterminate: row.getIsSomeSelected(),
                  disabled:
                    Object.keys(groupSelection).length > 0 &&
                    !row.getIsSelected(),
                }}
              />
            ) : (
              <div>{`pt${row.original.index}`}</div>
            )}
          </div>
        );
      },
    }),
    columnsHelper.accessor("name", {
      id: "name",
      header: "Name",
      size: 300,
      cell: ({ row }) => (
        <div style={{ paddingLeft: `${row.depth * 2}rem` }}>
          {row.original?.name}
        </div>
      ),
    }),
  ];

  useEffect(() => {
    if (isEdit) return;

    if (!isSetUp) return;

    if (controlGroups.length > 0 || formatGroupList.length === 0) {
      setTimeout(() => {
        let groupCount = 0;
        let data = controlGroups?.map((group) => {
          let pointCount = 0;
          return {
            ...new RowAdapter({
              ...group,
              config: POINT_CONFIG.CONTROL_GROUP,
              index: groupCount++,
            }).getRow(),
            subRows:
              group?.children?.map((point) => {
                return {
                  ...new RowAdapter(point).getRow(),
                  index: pointCount++,
                };
              }) || [],
          };
        });

        setFormatGroupList(_.cloneDeep(data), POINT_CONFIG.CONTROL_GROUP);
      }, 100);
    }
  }, [controlGroups, formatGroupList, isSetUp]);

  useEffect(() => {
    if (isEdit) return;

    if (!isSetUp) return;

    if (output.innerHTML === "") {
      output.innerHTML = "<div><img src='/loading.gif' /></div>";
    }

    setTimeout(() => {
      let data = defaultPointList.map((item) => ({
        ...new RowAdapter({
          ...item,
          is_check: false,
        }).getRow(),
      }));
      setPointList(resortIndex(_.cloneDeep(data)));
      setPointSelection({});
    }, 100);

    setTimeout(() => {
      setIsSetUp(false);
      output.innerHTML = "";
    }, 100);
  }, [defaultPointList, isSetUp]);

  const onSubmit = (values) => {
    if (isClone) {
      if (
        selectedKindOfClone.value === 0 &&
        Object.keys(groupSelection).length === 0
      ) {
        LibToast.toast("Please select at least one group", "error");
        return;
      } else if (
        selectedKindOfClone.value === 1 &&
        Object.keys(pointSelection).length === 0
      ) {
        LibToast.toast("Please select at least one point", "error");
        return;
      }
    }
    let group = {
      ...(isEdit
        ? {
            ...values,
            attributes: selectedAttributes.value,
          }
        : {
            ...values,
            attributes: selectedAttributes.value,
            id_points:
              selectedKindOfClone.value === 1
                ? Object.keys(pointSelection).map((key) => pointList[key]?.id)
                : initialValues?.subRows?.map((point) => point.id),
            add_type: selectedKindOfClone.value,
            id_template: id,
          }),
    };
    let url = isEdit
      ? Constants.API_URL.POINT_CONTROL.GROUP.UPDATE
      : Constants.API_URL.POINT_CONTROL.GROUP.ADD;

    let msg = isEdit
      ? "Update control group successfully"
      : "Create control group successfully";

    output.innerHTML = "<div><img src='/loading.gif' /></div>";
    setTimeout(async () => {
      try {
        const response = await axiosPrivate.post(
          url,
          {
            ...group,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response?.status === 200) {
          LibToast.toast(msg, "info");
          setDefaultControlGroupList(response.data?.point_controls);
          setDefaultPointList(response.data?.points);
          refresh();
          close();
        }
      } catch (error) {
        loginService.handleMissingInfo(
          error,
          "Failed to create or update control group"
        ) && navigate("/", { replace: true });
      } finally {
        output.innerHTML = "";
      }
    }, 500);
  };

  const onRefreshTable = (reason) => {
    if (isEdit) return;

    if (
      reason === "onSelectAttribute" &&
      Object.keys(pointSelection).length >= 0
    ) {
      setPointSelection({});
    }

    setRefreshTable(true);

    output.innerHTML = "<div><img src='/loading.gif' /></div>";
    setTimeout(() => {
      setRefreshTable(false);
      output.innerHTML = "";
    }, 300);
  };

  useEffect(() => {
    if (selectedAttributes.value === 0) return;

    onRefreshTable("onSelectPoint");
  }, [pointSelection]);

  useEffect(() => {
    onRefreshTable("onSelectAttribute");
  }, [selectedAttributes]);

  useEffect(() => {
    var selectedControlGroup = {
      name: "",
      description: "",
      attributes: 0,
    };

    if (Object.keys(groupSelection).length > 0) {
      let isFound = false;
      selectedControlGroup = Object.keys(groupSelection)
        .map((key) => {
          if (isFound) return null;

          if (key.split(".").length === 1) {
            isFound = true;
            return formatGroupList.find(
              (group) => group.index === parseInt(key)
            );
          } else {
            return null;
          }
        })
        .filter((group) => group !== null && group)[0];
    }

    setInitialValues(selectedControlGroup);
    setSelectedAttributes({
      label: selectedControlGroup?.attributes,
      value: selectedControlGroup?.attributes,
    });
    onRefreshTable("onSelectPoint");
  }, [groupSelection]);

  useEffect(() => {
    if (!isClone) {
      setInitialValues({
        name: "",
        description: "",
        attributes: 0,
      });
      setSelectedAttributes({
        label: 0,
        value: 0,
      });
      setPointSelection({});
      setGroupSelection({});
    }
  }, [isClone]);

  return {
    initialValues,
    validationSchema,
    onSubmit,
    pointList,
    pointColumns,
    pointSelection,
    setPointSelection,
    groupSelection,
    setGroupSelection,
    selectedAttributes,
    setSelectedAttributes,
    defaultAttributes,
    isClone,
    setIsClone,
    refreshTable,
    kindOfClone,
    selectedKindOfClone,
    setSelectedKindOfClone,
    formatGroupList,
    groupColumns,
  };
}

export default useEditControlGroupModal;
