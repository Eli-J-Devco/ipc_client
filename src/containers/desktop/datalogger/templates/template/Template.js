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
import { loginService } from '../../../../../services/loginService';

function Template() {
    const {
        id,
        setDefaultPointList,
        setDefaultMPPTList,
        setDefaultRegisterList,
        setDefaultControlGroupList,
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
                const response = await axiosPrivate.post(Constants.API_URL.TEMPLATE.LIST, { id: id });
                if (response?.status === 200) {
                    setDefaultPointList(response?.data?.points);
                    setDefaultMPPTList(response?.data?.point_mppt);
                    setDefaultRegisterList(response?.data?.register_blocks);
                    setDefaultControlGroupList(response?.data?.point_controls);
                }
            } catch (error) {
                loginService.handleMissingInfo(error, "Failed to fetch template") && navigate(from, { replace: true });
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
                loginService.handleMissingInfo(error, "Failed to fetch template config") && navigate(from, { replace: true });
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
                            }, {
                                path: `/datalogger/templates/${id}/control-groups`,
                                name: "Control Groups"
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