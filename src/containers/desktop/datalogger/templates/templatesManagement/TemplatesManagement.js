import Button from "../../../../../components/button/Button";
import Table from "../../../../../components/table/Table";
import styles from "./TemplatesManagement.module.scss";
import CreateTemplateModal from "./createTemplateModal/CreateTemplateModal";
import useTemplatesManagement from "./useTemplatesManagement";
import { ReactComponent as EditIcon } from "../../../../../assets/images/edit.svg";
import { ReactComponent as DeleteIcon } from "../../../../../assets/images/delete.svg";
import FormInput from "../../../../../components/formInput/FormInput";
import { useEffect, useState } from "react";
import useAxiosPrivate from "../../../../../hooks/useAxiosPrivate";
import Constants from "../../../../../utils/Constants";
import { loginService } from "../../../../../services/loginService";
import LibToast from "../../../../../utils/LibToast";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import Modal from "../../../../../components/modal/Modal";

function TemplatesManagement() {
  const {
    isModalOpen,
    openModal,
    closeModal,
    template,
    columns,
    templateList,
    setTemplateList,
    handleOnItemEdit,
    fileUpload,
    handleFileUploadChange,
  } = useTemplatesManagement();
  const axiosPrivate = useAxiosPrivate();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isConfirmDelete, setIsConfirmDelete] = useState({
    state: false,
    item: {},
  });

  useEffect(() => {
    if (templateList.length > 0) return;

    var output = document.getElementById("progress");
    output.innerHTML = "<div><img src='/loading.gif' alt='loading' /></div>";
    setTimeout(async () => {
      try {
        const response = await axiosPrivate.post(
          Constants.API_URL.TEMPLATE.LIST,
          {
            type: 1,
          }
        );
        if (response?.status === 200) {
          setTemplateList(response?.data);
        }
      } catch (error) {
        loginService.handleMissingInfo(error, "Failed to fetch templates") &&
          navigate("/", { replace: true });
      } finally {
        output.innerHTML = "";
      }
    }, 300);
  }, [templateList]);

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
          setTemplateList(templateList.filter((item) => item.id !== id));
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

  return (
    <>
      {isConfirmDelete.state && (
        <Modal
          isOpen={isConfirmDelete.state}
          close={() => setIsConfirmDelete({ state: false, item: "" })}
          title="Confirm Delete"
        >
          <div className="text-center">
            <div>Are you sure you want to delete this template?</div>
            <div className="mt-3">
              <Button
                onClick={() => setIsConfirmDelete({ state: false, item: "" })}
              >
                <Button.Text text="Cancel" />
              </Button>
              <Button
                onClick={() => {
                  deleteTemplate(isConfirmDelete.item);
                }}
                className="ms-3"
              >
                <Button.Text text="Delete" />
              </Button>
            </div>
          </div>
        </Modal>
      )}
      <div className={styles["template-management"]}>
        <div className="row">
          <div className="col-12 col-lg-7">
            <div className={styles.section}>
              <div className={styles.title}>Edit Or Manage Your Templates</div>

              <div className={styles.body}>
                <Table
                  maxHeight="50vh"
                  columns={columns}
                  data={templateList}
                  action={(item) => (
                    <div className="d-flex flex-wrap justify-content-center">
                      <Button.Image
                        image={<EditIcon />}
                        onClick={() => handleOnItemEdit(item)}
                        className="mx-2"
                      />
                      <Button.Image
                        image={<DeleteIcon />}
                        onClick={() =>
                          setIsConfirmDelete({ state: true, item: item })
                        }
                        className="mx-2"
                      />
                    </div>
                  )}
                />
              </div>
            </div>

            <div className={styles.section}>
              <div className={styles.title}>Create A Template</div>

              <div className={`d-flex ${styles.body}`}>
                <Button
                  variant="dark"
                  onClick={() => openModal("Modbus Template")}
                >
                  <Button.Text text="Create Modbus Template" />
                </Button>
                <Button
                  variant="dark"
                  onClick={() => openModal("Virtual Meter")}
                  className="ms-3"
                >
                  <Button.Text text="Create Virtual Meter" />
                </Button>
              </div>

              <CreateTemplateModal
                isOpen={isModalOpen}
                close={closeModal}
                template={template}
              />
            </div>

            <div className={styles.section}>
              <div className={styles.title}>
                Upload A Template (*.Json File)
              </div>

              <div className={styles.body}>
                <FormInput.File
                  name="file_upload"
                  onChange={handleFileUploadChange}
                  value={fileUpload}
                  accept=".json"
                  className="mb-2"
                />

                <Button variant="dark">
                  <Button.Text text="Upload File" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default TemplatesManagement;
