import { useTranslation } from 'react-i18next';
import Button from '../../../../../components/button/Button';
import FormInput from '../../../../../components/formInput/FormInput';
import useProjectSetup from '../../../../../hooks/useProjectSetup';
import { useEffect, useRef, useState } from 'react';
import useAxiosPrivate from '../../../../../hooks/useAxiosPrivate';
import { useNavigate } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';
import _ from 'lodash';
import LibToast from '../../../../../utils/LibToast';
import Constants from '../../../../../utils/Constants';
import { loginService } from '../../../../../services/loginService';
import { getToken } from '../../../../../utils/Token';
import styles from "./SiteInformation.module.scss";
import { RTextForm } from '../../../../../components/Controls';
function SiteInformation() {
    const { t } = useTranslation();
    const { projectSetup, setProjectSetup } = useProjectSetup();
    const [siteInformation, setSiteInformation] = useState({});

    const axiosPrivate = useAxiosPrivate();
    const isChange = useRef(false);

    const navigate = useNavigate();
    const methods = useForm();
    const output = document.getElementById("progress");

    useEffect(() => {

        /**
         * Fetch site information
         * @author: nhan.tran 2024-03-01
         * @param {int} id site id - will be remove in future
         */
        if (_.isEmpty(projectSetup)) return;

        output.innerHTML = "<div><img src='/loading.gif' /></div>";

        setTimeout(() => {
            setSiteInformation({
                id: projectSetup.id,
                name: projectSetup.name,
                location: projectSetup.location,
                description: projectSetup.description,
                administrative_contact: projectSetup.administrative_contact,
                serial_number: projectSetup.serial_number,
            });
        }, 300);
    }, [projectSetup, output]);

    /** 
     * Set value for form when site information is fetched
     * @author: nhan.tran 2024-03-01
     * @param {Object} siteInformation
     */
    useEffect(() => {
        if (_.isEmpty(siteInformation)) return;
        methods.setValue("name", siteInformation.name);
        methods.setValue("location", siteInformation.location);
        methods.setValue("description", siteInformation.description);
        methods.setValue("administrative_contact", siteInformation.administrative_contact);
        methods.setValue("serial_number", siteInformation.serial_number);
        output.innerHTML = "";
    }, [siteInformation, output, methods]);

    /**
     * Handles the save operation for the site information.
     * @author nhan.tran 2024-03-01
     * @param {Object} data - The event object.
     */
    const handleSave = methods.handleSubmit((data) => {
        data["id"] = siteInformation["id"];
        isChange.current = !_.isEqual(data, siteInformation);
        if (!isChange.current) {
            LibToast.toast(t("toastMessage.info.noChange"), "info");
            return;
        }

        /** 
         * Save site information
         * @author nhan.tran 2024-03-01
         * @param {int} id site id - will be remove in future
         * */
        const saveSiteInformation = async (id) => {

            var output = document.getElementById("progress");
            try {
                const response = await axiosPrivate.post(
                    `${Constants.API_URL.SITE.SITE_UPDATE}${id}`,
                    data,
                    {
                        headers: {
                            "Content-Type": "application/json",
                        },
                        onUploadProgress: () => {
                            output.innerHTML = "<div><img src='/loading.gif' /></div>";
                        },
                    }
                );
                if (response.status === 200) {
                    output.innerHTML = "";
                    LibToast.toast("Site information " + t("toastMessage.info.update"), "info");
                    setProjectSetup({
                        ...projectSetup,
                        name: data.name,
                        location: data.location,
                        description: data.description,
                        administrative_contact: data.administrative_contact,
                        serial_number: data.serial_number,
                    });
                    isChange.current = false;
                }
            } catch (error) {
                if (!loginService.handleMissingInfo(error))
                    LibToast.toast(t("toastMessage.error.update"), "error");
                else navigate("/", { replace: true });
            }
        };
        const project_id = getToken("project_id");
        saveSiteInformation(project_id);
    });

    const handleCancel = () => {
        methods.setValue("name", siteInformation.name);
        methods.setValue("location", siteInformation.location);
        methods.setValue("description", siteInformation.description);
        methods.setValue("administrative_contact", siteInformation.administrative_contact);
        methods.setValue("serial_number", siteInformation.serial_number);
    };

    return (
        <FormProvider {...methods}>
            <div className={styles.site_information}>
                <div className="note">
                    <p> {t("site.info_note")} </p>
                </div>
                <form onSubmit={handleSave}>
                    <div className={styles.form_body}>
                        <div className='container'>
                            <div className="row">
                                <div className="col-md-3"></div>
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <RTextForm
                                            label={t("site.site_name")}
                                            inputClass="form-control"
                                            inputId="name"
                                            inputName="name"
                                            name="name"
                                            required={{ value: true, message: "Must fill the site name" }}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <RTextForm
                                            label={t("site.serial_number")}
                                            inputClass="form-control"
                                            inputId="serial_number"
                                            inputName="serial_number"
                                            name="serial_number"
                                            required={{ value: true, message: "Must fill the site serial number" }}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <RTextForm
                                            label={t("site.location")}
                                            inputClass="form-control"
                                            inputId="location"
                                            inputName="location"
                                            name="location"
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <RTextForm
                                            label={t("site.description")}
                                            inputClass="form-control"
                                            inputId="description"
                                            inputName="description"
                                            name="description"
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <RTextForm
                                            label={t("site.admin_contact")}
                                            inputClass="form-control"
                                            inputId="administrative_contact"
                                            inputName="administrative_contact"
                                            name="administrative_contact"
                                        />
                                    </div>
                                    <div className="mt-5 d-flex flex-wrap gap-3">
                                        <Button onClick={handleSave}>
                                            <Button.Text text="Save" />
                                        </Button>

                                        <Button variant="white" onClick={handleCancel}>
                                            <Button.Text text="Cancel" />
                                        </Button>
                                    </div>
                                </div>
                                <div className="col-md-3"></div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </FormProvider>
    );
}

export default SiteInformation;