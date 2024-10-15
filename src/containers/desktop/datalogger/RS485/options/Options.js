import { useTranslation } from "react-i18next";
import { RSwitch, RButton } from './../../../../../components/Controls';
import styles from './Options.module.scss';
import { useEffect, useState } from "react";
import useAxiosPrivate from "../../../../../hooks/useAxiosPrivate";
import Constants from "../../../../../utils/Constants";
import useProjectSetup from "../../../../../hooks/useProjectSetup";
import LibToast from "../../../../../utils/LibToast";
import { loginService } from "../../../../../services/loginService";
import { useNavigate } from "react-router-dom";

function Options() {
    const { t } = useTranslation();
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();

    const { projectSetup, setProjectSetup } = useProjectSetup();

    const [searchMbrtu, setSearchMbrtu] = useState(true);

    useEffect(() => {
        if (!projectSetup) return;
        setSearchMbrtu(projectSetup?.enable_search_modbus_rtu_device);
    }, [projectSetup]);

    const handleInputChange = (event) => {
        setSearchMbrtu(event.target.checked);
    }

    const handleSave = () => {
        if (projectSetup?.enable_search_modbus_rtu_device === searchMbrtu) {
            LibToast.toast("No changes to save", "info");
            return;
        }

        var output = document.getElementById("progress");
        output.innerHTML = "<div><img src='/loading.gif' /></div>";
        setTimeout(async () => {
            try {
                const response = await axiosPrivate.post(Constants.API_URL.PROJECT.UPDATE_SEARCH_RTU, {
                    id: projectSetup?.id,
                    enable_search_modbus_rtu_device: searchMbrtu
                });

                if (response.status === 200) {
                    setProjectSetup({ ...projectSetup, enable_search_modbus_rtu_device: searchMbrtu });
                    LibToast.toast("Update auto search RTU " + t("toastMessage.info.update"), "info")
                }
            } catch (error) {
                !loginService.handleMissingInfo(error, "Failed to update auto search RTU") && navigate("/", { replace: true });
            } finally {
                output.innerHTML = "";
            }
        }, 200);
    }

    return (
        <div className={styles.rs485}>
            <div className='note'>
                <p> {t('site.search_mbrtu_note')} </p>
            </div>

            <div className={styles.form_body}>
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-3'></div>
                        <div className='col-md-6'>

                            <div className='mb-3'>
                                <div className="checkmark">
                                    <RSwitch
                                        label={t('site.search_mbrtu')}
                                        inputId="kiosk_view"
                                        inputName="kiosk_view"
                                        checked={searchMbrtu ? 1 : 0}
                                        onChange={handleInputChange}
                                    />
                                </div>

                            </div>

                            <div className='form-footer'>
                                <div className='mb-3'>

                                    <RButton
                                        className="btn_save"
                                        text="Save"
                                        iClass={true}
                                        iClassType="save"
                                        onClick={handleSave}
                                    />

                                </div>
                            </div>
                        </div>
                        <div className='col-md-3'></div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Options;