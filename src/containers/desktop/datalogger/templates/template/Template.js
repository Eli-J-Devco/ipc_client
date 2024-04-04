import styles from './Template.module.scss';
import NavTabs from "../../../../../components/navTabs/NavTabs";
import { Outlet } from "react-router-dom";
import { useTemplate } from "./useTemplate";
import useAxiosPrivate from '../../../../../hooks/useAxiosPrivate';
import { useEffect, useState } from 'react';
import Constants from '../../../../../utils/Constants';
import Button from '../../../../../components/button/Button';
import LibToast from '../../../../../utils/LibToast';
import { useTranslation } from 'react-i18next';
import _ from 'lodash';
import Modal from '../../../../../components/modal/Modal';
import { POINT_CONFIG, reverseFormatData } from '../../../../../utils/TemplateHelper';

function Template() {
    const {
        id,
        setDefaultPointList,
        setDefaultMPPTList,
        setDefaultRegisterList,
        editedPoint,
        editedMPPT,
        editedRegister,
        setConfig,
        isChanged,
    } = useTemplate();
    const axiosPrivate = useAxiosPrivate();
    const { t } = useTranslation();
    const [confirmUpdate, setConfirmUpdate] = useState(false);
    const [isSetUp, setIsSetUp] = useState(false);
    useEffect(() => {
        if (!id) return;

        !isSetUp && setTimeout(async () => {
            try {
                const response = await axiosPrivate.post(Constants.API_URL.TEMPLATE.GET_ONE, { id_template: id });
                if (response?.status === 200) {
                    setDefaultPointList(response?.data?.point_list);
                    setDefaultMPPTList(response?.data?.mppt_list);
                    setDefaultRegisterList(response?.data?.register_list);
                    setIsSetUp(true);
                }
            } catch (error) {
                console.error(error);
            }
        }, 300);
    }, [id, isSetUp]);

    useEffect(() => {
        setTimeout(async () => {
            try {
                const response = await axiosPrivate.post(Constants.API_URL.TEMPLATE.CONFIG);
                if (response?.status === 200) {
                    setConfig(response?.data);
                }
            } catch (error) {
                console.error(error);
            }
        }, 300);
    }, [setConfig]);

    const updateTemplate = () => {
        console.log("updateTemplate");
        const pointList = editedPoint.data;
        const mpptList = reverseFormatData(editedMPPT.data, POINT_CONFIG.MPPT_CONFIG);
        const registerList = editedRegister.data;
        const data = {
            id_template: id,
            point_list: pointList,
            mppt_list: mpptList,
            register_list: registerList
        };

        console.log("data", data);
    }

    return isSetUp && (
        <div className={styles.template} >
            {
                confirmUpdate &&
                <Modal
                    title="Confirm Update"
                    isOpen={confirmUpdate}
                    close={() => setConfirmUpdate(false)}
                    footer={
                        <div>
                            <Button className="me-3" onClick={() => setConfirmUpdate(false)}>
                                <Button.Text text="No" />
                            </Button>
                            <Button className="ms-3" onClick={() => {
                                updateTemplate();
                                setConfirmUpdate(false)
                            }}>
                                <Button.Text text="Yes" />
                            </Button>
                        </div>
                    }
                >
                    <div>
                        <p>Are you sure you want to save all changes? If any devices are using this template, all data will <strong style={{ color: "red" }}>be removed</strong></p>
                    </div>
                </Modal>
            }
            <header className={styles.header} >
                {`Modbus Template: [${id}]`}
            </header>

            <div className={styles.body}>
                <div className='row'>
                    <NavTabs
                        className="col-10"
                        routes={[
                            {
                                path: `/datalogger/templates/${id}/points`,
                                name: "Point List"
                            },
                            {
                                path: `/datalogger/templates/${id}/mppt`,
                                name: "MPPT"
                            },
                            {
                                path: `/datalogger/templates/${id}/registers`,
                                name: "Register Blocks"
                            },
                        ]}
                    />
                    <div className="col-2 d-flex justify-content-center">
                        <Button onClick={() => setConfirmUpdate(true)}>
                            <Button.Text text="Save all changes" />
                        </Button>
                    </div>
                </div>

                <div className={styles.outlet}>
                    <Outlet />
                </div>
            </div>
        </div>

    );
}

export default Template;