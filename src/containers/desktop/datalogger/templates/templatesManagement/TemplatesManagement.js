import Button from "../../../../../components/button/Button";
import Table from "../../../../../components/table/Table";
import styles from "./TemplatesManagement.module.scss";
import CreateTemplateModal from "./createTemplateModal/CreateTemplateModal";
import useTemplatesManagement from "./useTemplatesManagement";
import FormInput from "../../../../../components/formInput/FormInput";
import Modal from "../../../../../components/modal/Modal";

function TemplatesManagement() {
  const {
    isModalOpen,
    openModal,
    closeModal,
    template,
    columns,
    templateGroups,
    fileUpload,
    handleFileUploadChange,
    deleteTemplate,
    isConfirmDelete,
    setIsConfirmDelete,
  } = useTemplatesManagement();

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
          <div className="col-12 col-xl-6 col-lg-7 col-md-8">
            <div className={styles.section}>
              <div className={styles.title}>Edit Or Manage Your Templates</div>

              <div className={styles.body}>
                <Table
                  maxHeight="50vh"
                  columns={{ columnDefs: columns }}
                  data={templateGroups}
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
