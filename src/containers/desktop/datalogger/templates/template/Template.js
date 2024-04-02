import styles from './Template.module.scss';
import NavTabs from "../../../../../components/navTabs/NavTabs";
import { Outlet } from "react-router-dom";
import { useTemplate } from "./useTemplate";
import useAxiosPrivate from '../../../../../hooks/useAxiosPrivate';
import { useEffect } from 'react';
import Constants from '../../../../../utils/Constants';
import Button from '../../../../../components/button/Button';

function Template() {
    const {
        id,
        setDefaultPointList,
        setDefaultMPPTList,
        setDefaultRegisterList,
        setConfig,
        editedPoint,
        editedMPPT,
        editedRegister
    } = useTemplate();
    const axiosPrivate = useAxiosPrivate();

    useEffect(() => {
        setTimeout(async () => {
            try {
                const response = await axiosPrivate.post(Constants.API_URL.TEMPLATE.GET_ONE, { id_template: id });
                if (response?.status === 200) {
                    setDefaultPointList(response?.data?.point_list);
                    setDefaultMPPTList(response?.data?.mppt_list);
                    setDefaultRegisterList(response?.data?.register_list);
                }
            } catch (error) {
                console.error(error);
            }
        }, 300);
    }, [id]);

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

    return (
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
                    <div className="col-2 d-flex justify-content-center">
                        <Button onClick={() => {
                            console.log("Save all changes", editedPoint)
                            console.log("Save all changes", editedMPPT)
                            console.log("Save all changes", editedRegister)
                        }}>
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