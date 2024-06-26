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
  const { defaultPointList, setDefaultPointList, setDefaultControlGroupList } =
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
    let group = {
      ...(isEdit
        ? values
        : {
            id_template: id,
            control_group: {
              ...values,
              attributes: selectedAttributes.value,
              children: Object.keys(rowSelection).map((key) => pointList[key]),
            },
          }),
    };
    let url = isEdit
      ? Constants.API_URL.TEMPLATE.CONTROL_GROUP.UPDATE
      : Constants.API_URL.TEMPLATE.CONTROL_GROUP.CREATE;

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
              LibToast.toast("Point updated successfully", "info");
            } else {
              setDefaultControlGroupList(response?.data?.control_group_list);
              setDefaultPointList(response?.data?.point_list);
              setPoint();
              LibToast.toast("Point created successfully", "info");
            }
          }, 100);
          close();
        }
      } catch (error) {
        let msg = loginService.handleMissingInfo(error);
        if (typeof msg === "string") {
          LibToast.toast(msg, "error");
        } else if (!msg) {
          LibToast.toast("Failed to update point", "error");
        } else {
          navigate("/");
        }
      } finally {
        output.innerHTML = "";
      }
    }, 500);
  };

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
  };
}

export default useEditControlGroupModal;
