import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTemplates } from "../useTemplates";
import { createColumnHelper } from "@tanstack/react-table";
import Button from "../../../../../components/button/Button";
import { ReactComponent as ExpandIcon } from "../../../../../assets/images/chevron-down.svg";
import { ReactComponent as CollapseIcon } from "../../../../../assets/images/chevron-up.svg";
import { ReactComponent as EditIcon } from "../../../../../assets/images/edit.svg";
import { ReactComponent as DeleteIcon } from "../../../../../assets/images/delete.svg";
import Constants from "../../../../../utils/Constants";
import LibToast from "../../../../../utils/LibToast";
import { loginService } from "../../../../../services/loginService";
import { useTranslation } from "react-i18next";
import useAxiosPrivate from "../../../../../hooks/useAxiosPrivate";

function useTemplatesManagement() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [template, setTemplate] = useState("Modbus Template");
  const [fileUpload, setFileUpload] = useState(null);
  const [isConfirmDelete, setIsConfirmDelete] = useState({
    state: false,
    item: {},
  });
  const axiosPrivate = useAxiosPrivate();
  const { t } = useTranslation();
  const { templateGroups, setTemplateGroups, setTemplateGroupsByDeviceGroup } =
    useTemplates();
  const navigate = useNavigate();

  const columnsHelper = createColumnHelper();
  const columns = [
    columnsHelper.accessor("toggle", {
      id: "toggle",
      size: 5,
      maxSize: 5,
      header: () => <div></div>,
      cell: ({ row }) => (
        <div style={{ paddingLeft: `${row.depth * 1.2}rem` }}>
          {row.getCanExpand() && (
            <Button
              variant="dark"
              onClick={() => {
                row.toggleExpanded();
              }}
            >
              <Button.Image
                image={row.getIsExpanded() ? <CollapseIcon /> : <ExpandIcon />}
              />
            </Button>
          )}
        </div>
      ),
    }),
    columnsHelper.accessor("name", {
      id: "name",
      size: 200,
      header: "Name",
      cell: ({ row }) => (
        <div style={{ paddingLeft: `${row.depth * 2}rem` }}>
          {row.depth === 2 && `${row.original.id} - `}
          {row.original.name}
        </div>
      ),
    }),
    columnsHelper.accessor("actions", {
      id: "actions",
      size: 100,
      header: <div style={{ textAlign: "center" }}>Actions</div>,
      cell: ({ row }) =>
        row.depth === 2 && (
          <div className="d-flex flex-wrap justify-content-center">
            <Button.Image
              image={<EditIcon />}
              onClick={() => handleOnItemEdit(row.original)}
              className="mx-2"
            />
            <Button.Image
              image={<DeleteIcon />}
              onClick={() =>
                setIsConfirmDelete({ state: true, item: row.original })
              }
              className="mx-2"
            />
          </div>
        ),
    }),
  ];

  const openModal = (value) => {
    setIsModalOpen(true);
    setTemplate(value);
  };
  const closeModal = () => setIsModalOpen(false);
  const handleOnItemEdit = (item) => {
    navigate(`/datalogger/templates/${item.id}/points`, {
      state: { template: item },
    });
  };
  const handleFileUploadChange = (e) => {
    setFileUpload(e.target.files ? e.target.files[0] : undefined);
  };

  const deleteTemplate = (item) => {
    var output = document.getElementById("progress");
    output.innerHTML = "<div><img src='/loading.gif' alt='loading' /></div>";
    setTimeout(async () => {
      let id = item.id;
      try {
        const response = await axiosPrivate.post(
          Constants.API_URL.TEMPLATE.DELETE,
          { id: id }
        );
        if (response?.status === 200) {
          setTemplateGroups(setTemplateGroupsByDeviceGroup(response?.data));
          LibToast.toast(
            `Tempate ${item?.name} ${t("toastMessage.info.delete")}`,
            "info"
          );
        }
      } catch (error) {
        loginService.handleMissingInfo(error, "Failed to delete template") &&
          navigate("/", { replace: true });
      } finally {
        output.innerHTML = "";
        setIsConfirmDelete({ state: false, item: "" });
      }
    }, 300);
  };

  return {
    isModalOpen,
    openModal,
    closeModal,
    template,
    columns,
    handleOnItemEdit,
    fileUpload,
    handleFileUploadChange,
    templateGroups,
    isConfirmDelete,
    setIsConfirmDelete,
    deleteTemplate,
  };
}

export default useTemplatesManagement;
