import Button from "../../../../../components/button/Button";
import styles from "./TemplatesManagement.module.scss";
import CreateTemplateModal from "./createTemplateModal/CreateTemplateModal";
import useTemplatesManagement from "./useTemplatesManagement";

function TemplatesManagement() {
    const { isModalOpen, openModal, closeModal, template } = useTemplatesManagement();

    return (
        <div className={styles["template-management"]} >
            <div className="row">
                <div className="col-12 col-xxl-6">
                    <div className={styles.section} >
                        <div className={styles.title}>
                            Edit Or Manage Your Templates
                        </div>

                        <div className={styles.body}> 
                            <Button variant="grey" >
                                <Button.Text text="Edit" />
                            </Button>
                            <Button variant="grey" className="ms-3" >
                                <Button.Text text="Download" />
                            </Button>
                            <Button variant="grey" className="ms-3" >
                                <Button.Text text="Delete" />
                            </Button>
                        </div>
                    </div>

                    <div className={styles.section} >
                        <div className={styles.title}>
                            Create A Template
                        </div>

                        <div className={styles.body}> 
                            <Button variant="dark" onClick={() => openModal("Modbus Template")} >
                                <Button.Text text="Create Modbus Template" />
                            </Button>
                            <Button variant="dark" onClick={() => openModal("Virtual Meter")} className="ms-3" >
                                <Button.Text text="Create Virtual Meter" />
                            </Button>
                        </div>

                        <CreateTemplateModal
                            isOpen={isModalOpen}
                            close={closeModal}
                            template={template}
                        />
                    </div>

                    <div className={styles.section} >
                        <div className={styles.title}>
                            Upload A Template (*.Json File)
                        </div>

                        <div className={styles.body}>
                            <Button variant="dark" >
                                <Button.Text text="Upload File" />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TemplatesManagement;