import { useTranslation } from "react-i18next";
import Button from "../../../../../components/button/Button";
import FormInput from "../../../../../components/formInput/FormInput";
import useAxiosPrivate from "../../../../../hooks/useAxiosPrivate";
import styles from "./LoggingRate.module.scss";
import useProjectSetup from "../../../../../hooks/useProjectSetup";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LibToast from "../../../../../utils/LibToast";
import Constants from "../../../../../utils/Constants";
import { loginService } from "../../../../../services/loginService";

function LoggingRate() {
    const axiosPrivate = useAxiosPrivate();
    const { t } = useTranslation();

    const { projectSetup, setProjectSetup } = useProjectSetup();

    const [selectedLoggingRate, setSelectedLoggingRate] = useState();
    const [loggingRate, setLoggingRate] = useState([]);
    const [existedLoggingRate, setExistedLoggingRate] = useState();

    const navigate = useNavigate();

    useEffect(() => {
        /**
         * Get logging rate from project setup and set to state
         * @author: nhan.tran 2024-03-11
         */
        if (!projectSetup) return;
        var output = document.getElementById("progress");
        output.innerHTML = "<div><img src='/loading.gif' /></div>";
        setTimeout(() => {
            var rate = projectSetup?.logging_interval_list;
            setLoggingRate(rate.map((item) => ({ value: item.id, label: item.time })));
            setSelectedLoggingRate({ value: projectSetup?.id_logging_interval, label: rate.filter((item) => item.id === projectSetup?.id_logging_interval)[0].time });
            setExistedLoggingRate({ value: projectSetup?.id_logging_interval, label: rate.filter((item) => item.id === projectSetup?.id_logging_interval)[0].time });
            output.innerHTML = "";
        }, 100);
    }, [projectSetup]);

    /**
     * Handle dropdown change
     * @author: nhan.tran 2024-03-07
     * @param value
     */
    const handleDropdownChange = (value) => {
        setSelectedLoggingRate(value);
    }

    /**
     * Handle submit logging rate to server and update project setup state
     * @author nhan.tran 2024-03-11
     */
    const handleSubmit = () => {
        // Check if selected logging rate is the same as existed logging rate
        if (selectedLoggingRate.value === existedLoggingRate.value) {
            LibToast.toast(t("toastMessage.info.noChange"), "info");
            return;
        }


        const data = {
            id_logging_interval: selectedLoggingRate.value
        }

        const updateLoggingRate = async () => {
            try {
                var output = document.getElementById("progress");
                const response = await axiosPrivate.post(Constants.API_URL.PROJECT.UPDATE_LOGGING_RATE, data, {
                    onDownloadProgress: () => {
                        output.innerHTML = "<div><img src='/loading.gif' /></div>";
                    },
                });
                if (response.status === 200) {
                    LibToast.toast("Logging rate " + t("toastMessage.info.updateSuccess"), "info");
                    setProjectSetup({ ...projectSetup, id_logging_interval: selectedLoggingRate.value, logging_interval: { id: selectedLoggingRate.value, time: selectedLoggingRate.label } });
                }
            } catch (error) {
                if (!loginService.handleMissingInfo(error))
                    LibToast.toast(t("toastMessage.error.updateFailed"), "error");
                else navigate("/", { replace: true });
            } finally {
                output.innerHTML = "";
            }
        }

        updateLoggingRate();
    };
    return (
        <div className={styles["logging-rate"]}>
            <FormInput.Select
                label="Logging Interval:"
                className={`mx-2 ${styles.interval}`}
                horizontal
                value={selectedLoggingRate}
                option={loggingRate}
                onChange={handleDropdownChange}
            />

            <div className={styles.action} >
                <Button className="m-2" onClick={handleSubmit}>
                    <Button.Text text="Apply" />
                </Button>

                <Button className="m-2" variant="white">
                    <Button.Text text="Cancel" />
                </Button>
            </div>
        </div>
    );
}

export default LoggingRate;