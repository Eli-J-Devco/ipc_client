import { useEffect, useState } from "react";
import * as yup from "yup";
import useAxiosPrivate from "../../../../../../../hooks/useAxiosPrivate";
import Constants from "../../../../../../../utils/Constants";
import { useTemplate } from "../../useTemplate";
import LibToast from "../../../../../../../utils/LibToast";
import { loginService } from "../../../../../../../services/loginService";
import { useNavigate } from "react-router-dom";
import {
  RowAdapter,
  resortIndex,
} from "../../../../../../../utils/TemplateHelper";
import { createColumnHelper } from "@tanstack/react-table";
import FormInput from "../../../../../../../components/formInput/FormInput";
import _, { at } from "lodash";

function useEditControlGroupModal(
  data,
  close,
  setPoint,
  setCurrentData,
  isEdit
) {
  const axiosPrivate = useAxiosPrivate();
  const { id } = useTemplate();
  const navigate = useNavigate();
  const {
    defaultPointList,
    setDefaultPointList,
    setDefaultControlGroupList
  } =
    useTemplate();

  const [pointList, setPointList] = useState([]);
  const [rowSelection, setRowSelection] = useState([]);
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

  const validationSchema = yup.object({
    name: yup.string().required("Required"),
    attributes: yup.number().required("Required"),
  });

  const initialValues = {
    ...data,
  };

  const output = document.getElementById("progress");
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
            onChange: (e) => table.toggleAllRowsSelected(e.target.checked),
            disabled: selectedAttributes.value !== 0 && Object.keys(rowSelection).length >= selectedAttributes.value + 1,
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
              disabled: selectedAttributes.value !== 0 && Object.keys(rowSelection).length >= selectedAttributes.value + 1 && !row.getIsSelected(),
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
      setRowSelection({});
    }, 100);

    setTimeout(() => {
      setIsSetUp(false);
      output.innerHTML = "";
    }, 100);
  }, [defaultPointList, isSetUp]);

  const onSubmit = (values) => {
    if (isClone && Object.keys(rowSelection).length === 0) {
      LibToast.toast("Please select at least one point", "error");
      return;
    }

    let group = {
      ...(isEdit
        ? {
          ...values,
          attributes: selectedAttributes.value,
        }
        : {
          id_template: id,
          ...values,
          attributes: selectedAttributes.value,
          id_points: Object.keys(rowSelection).map((key) => pointList[key]?.id),
        }),
    };
    let url = isEdit
      ? Constants.API_URL.POINT_CONTROL.UPDATE
      : Constants.API_URL.POINT_CONTROL.ADD;
    console.log(group);
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
          setTimeout(() => {
            if (isEdit) {
              setPoint({
                ...new RowAdapter({ ...response.data }).getRow(),
              });
              setCurrentData({
                ...new RowAdapter({ ...response.data }).getRow(),
              });
              LibToast.toast("Control Group successfully", "info");
            } else {
              setDefaultControlGroupList(response.data?.point_controls);
              setDefaultPointList(response.data?.points);
              setPoint();
              LibToast.toast("Control Group created successfully", "info");
            }
          }, 100);
          close();
        }
      } catch (error) {
        loginService.handleMissingInfo(error, "Failed to create control group") &&
          navigate("/", { replace: true });
      } finally {
        output.innerHTML = "";
      }
    }, 500);
  };

  const onRefreshTable = (reason) => {
    if (reason === "onSelectAttribute" && Object.keys(rowSelection).length >= 0) {
      setRowSelection({});
    }

    setRefreshTable(true);

    output.innerHTML = "<div><img src='/loading.gif' /></div>";
    setTimeout(() => {
      setRefreshTable(false);
      output.innerHTML = "";
    }, 300);
  }

  useEffect(() => {
    if (selectedAttributes.value === 0) return;

    onRefreshTable("onSelectPoint");
  }, [rowSelection]);

  useEffect(() => {
    onRefreshTable("onSelectAttribute");
  }, [selectedAttributes]);

  return {
    initialValues,
    validationSchema,
    onSubmit,
    pointList,
    columns,
    rowSelection,
    selectedAttributes,
    setSelectedAttributes,
    defaultAttributes,
    setRowSelection,
    isClone,
    setIsClone,
    refreshTable,
  };
}

export default useEditControlGroupModal;
