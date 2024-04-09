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
import { useLocation, useNavigate } from 'react-router-dom';

function Template() {
    const {
        id,
        setDefaultPointList,
        setDefaultMPPTList,
        setDefaultRegisterList,
        setConfig,
    } = useTemplate();
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location?.state?.from || '/datalogger/templates';

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
                }
            } catch (error) {
                if (error?.response?.status === 404) {
                    LibToast.toast(`Template with id: ${id} not found`, "error");
                    navigate(from, { replace: true });
                }
            } finally {
                setIsSetUp(true);
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

    return isSetUp && (
        <div className={styles.template} >
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
                </div>

                <div className={styles.outlet}>
                    <Outlet />
                </div>
            </div>
        </div>

    );
}

export default Template;