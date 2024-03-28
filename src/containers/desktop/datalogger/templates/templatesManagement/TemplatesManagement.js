import Button from "../../../../../components/button/Button";
import Table from "../../../../../components/table/Table";
import styles from "./TemplatesManagement.module.scss";
import CreateTemplateModal from "./createTemplateModal/CreateTemplateModal";
import useTemplatesManagement from "./useTemplatesManagement";
import { ReactComponent as EditIcon } from "../../../../../assets/images/edit.svg";
import { ReactComponent as DeleteIcon } from "../../../../../assets/images/delete.svg";
import FormInput from "../../../../../components/formInput/FormInput";
import { useEffect } from "react";
import useAxiosPrivate from "../../../../../hooks/useAxiosPrivate";
import Constants from "../../../../../utils/Constants";
import { loginService } from "../../../../../services/loginService";
import LibToast from "../../../../../utils/LibToast";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

function TemplatesManagement() {
    const { isModalOpen, openModal, closeModal, template, columns, templateList, setTemplateList, handleOnItemEdit, fileUpload, handleFileUploadChange } = useTemplatesManagement();
    const axiosPrivate = useAxiosPrivate();
    const { t } = useTranslation();
    const navigate = useNavigate();
    useEffect(() => {
        templateList.length === 0 && setTimeout(async () => {
            try {
                const response = await axiosPrivate.post(`${Constants.API_URL.TEMPLATE.LIST_BY_TYPE}?type=${Constants.TEMPLATE_TYPE.CUSTOM}`);
                if (response?.status === 200) {
                    setTemplateList(response?.data);
                }
            } catch (error) {
                let msg = loginService.handleMissingInfo(error);
                if (typeof msg === "string") {
                    LibToast.toast(msg, "error");
                }
                else {
                    if (msg)
                        LibToast.toast(t('toastMessage.error.fetch'), "error");
                    else
                        navigate("/")
                }
            }
        }, 300);
    }, [templateList]);

    return (
        <div className={styles["template-management"]} >
            <div className="row">
                <div className="col-12 col-lg-6">
                    <div className={styles.section} >
                        <div className={styles.title}>
                            Edit Or Manage Your Templates
                        </div>

                        <div className={styles.body}>
                            <Table
                                columns={columns}
                                data={templateList}
                                action={item => (
                                    <div className="d-flex flex-wrap justify-content-center">
                                        <Button.Image
                                            image={<EditIcon />}
                                            onClick={() => handleOnItemEdit(item)}
                                            className="mx-2"
                                        />
                                        <Button.Image
                                            image={<DeleteIcon />}
                                            onClick={() => handleOnItemEdit(item)}
                                            className="mx-2"
                                        />
                                    </div>
                                )}
                            />
                        </div>
                    </div>

                    <div className={styles.section} >
                        <div className={styles.title}>
                            Create A Template
                        </div>

                        <div className={`d-flex ${styles.body}`}>
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
                            <FormInput.File
                                name="file_upload"
                                onChange={handleFileUploadChange}
                                value={fileUpload}
                                accept=".json"
                                className="mb-2"
                            />

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