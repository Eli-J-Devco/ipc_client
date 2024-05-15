import { useEffect, useState } from "react";
import FormInput from "../../../../../components/formInput/FormInput";
import * as yup from "yup";
import styles from './ConfigDevice.module.scss';
import useAxiosPrivate from "../../../../../hooks/useAxiosPrivate";
import { useLocation, useNavigate } from "react-router-dom";
import Constants from "../../../../../utils/Constants";
import Button from "../../../../../components/button/Button";
import { useDeviceManagement } from "../DeviceManagement";
import { loginService } from "../../../../../services/loginService";
import LibToast from "../../../../../utils/LibToast";

export default function ConfigEachPoint({ point, setPoints }) {
    const axiosPrivate = useAxiosPrivate();
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from || { pathname: '/datalogger/devices' };
    const { device } = useDeviceManagement();
    const [saving, setSaving] = useState(false);

    const initialValues = {
        function: point?.name,
        engineering_units: {
            value: point?.unit?.id,
            label: point?.unit?.name
        }
    }

    const schema = yup.object().shape({
        function: yup.string().required(),
        engineering_units: yup.string().required()
    });

    const [units, setUnits] = useState([]);

    useEffect(() => {
        setTimeout(async () => {
            try {
                const response = await axiosPrivate.post(Constants.API_URL.DEVICES.CONFIG.UNITS);
                let point_unit = response?.data;
                let unitGroup = point_unit.filter((item) =>
                    item?.name.match(/---/i)
                );
                let units = [];
                unitGroup.forEach((group) => {
                    let firstItemIndex = point_unit.indexOf(group) + 1;
                    let lastItemIndex = point_unit.indexOf(
                        point_unit.find(
                            (item, index) =>
                                index > firstItemIndex && item?.name.match(/---/i)
                        )
                    );
                    units.push({
                        label: group?.name.replaceAll("-", "").trim(),
                        options: point_unit
                            .slice(firstItemIndex, lastItemIndex)
                            .map((item) => ({ value: item?.id, label: item?.name })),
                    });
                });
                setUnits(units);
            } catch (error) {
                console.error(error);
            }
        }, 300);
    }, []);

    const handleSave = (data) => {
        if (saving) return;

        setSaving(true);
        const body = {
            id: point?.id,
            id_device: device?.id,
            id_point_list: point?.id_point_list,
            name: data.function,
            id_type_units: data.engineering_units.value,
        }
        var output = document.getElementById("progress");
        output.innerHTML = "<div><img src='/loading.gif' /></div>";
        setTimeout(async () => {
            try {
                const response = await axiosPrivate.post(Constants.API_URL.DEVICES.CONFIG.CONFIG_POINT, body);
                setPoints(response.data?.points)
                navigate(from);
                LibToast.toast("Update point successfully", "info");
            } catch (error) {
                loginService.handleMissingInfo(error, "Failed to configure point") && navigate("/", { replace: true });
            } finally {
                output.innerHTML = "";
                setSaving(false);
            }
        }, 300);
    }

    return (
        <div className={styles.config_point}>
            <FormInput
                initialValues={initialValues}
                schema={schema}
                onSubmit={handleSave}
                id="configPoint"
            >
                <hr />
                <div className="main">
                    <div>
                        <FormInput.Text
                            lablClassName={styles.label}
                            inputClassName={styles.select}
                            horizontal
                            label="Function"
                            name="function"
                            disabled={!point?.enable_edit?.name}
                        />
                    </div>
                    <div className="mt-3">
                        <FormInput.Select
                            labelClassName={styles.label}
                            inputClassName={styles.select}
                            horizontal
                            label="Engineering Units"
                            name="engineering_units"
                            isDisabled={!point?.enable_edit?.unit}
                            option={units}
                        />
                    </div>
                </div>
                <hr />
                <div className={`mt-3 ${styles.btn_group}`}>
                    {
                        Object.values(point?.enable_edit).some(item => item === true) &&
                        <Button variant="dark" type="submit" formId="configPoint">
                            <Button.Text text="Save" />
                        </Button>
                    }
                    <Button variant="grey" className='ms-3' onClick={() => navigate(from)}>
                        <Button.Text text="Cancel" />
                    </Button>
                </div>
            </FormInput>
        </div>
    );
}