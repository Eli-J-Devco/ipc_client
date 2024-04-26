/********************************************************
* Copyright 2020-2021 NEXT WAVE ENERGY MONITORING INC.
* All rights reserved.
* 
*********************************************************/
import { useEffect, useState } from 'react';
import styles from '../PermissionsAndRoles.module.scss';
import _ from 'lodash';

import FormInput, { useFormInput } from '../../../../../components/formInput/FormInput';
import Button from '../../../../../components/button/Button';
import Table from '../../../../../components/table/Table';

import { ReactComponent as StatusIcon } from "../../../../../assets/images/status-circle.svg";
import useAxiosPrivate from '../../../../../hooks/useAxiosPrivate';
import { useNavigate } from 'react-router-dom';
import LibToast from '../../../../../utils/LibToast';
import Constants from '../../../../../utils/Constants';
import { loginService } from '../../../../../services/loginService';

const PermissionForm = ({ screensData, setScreensData, role_id, setPermissions }) => {
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const [onChecked, setOnChecked] = useState(null);

    const columnsPermissions = [
        { id: 1, slug: "name", name: <div style={{ textAlign: "center" }}>Screen Name</div>, width: '100px' },
        { id: 2, slug: "full", name: <div style={{ textAlign: "center" }}>Full</div>, width: '10px' },
        { id: 3, slug: "add", name: <div style={{ textAlign: "center" }}>Add</div>, width: '10px' },
        { id: 4, slug: "edit", name: <div style={{ textAlign: "center" }}>Edit</div>, width: '10px' },
        { id: 5, slug: "del", name: <div style={{ textAlign: "center" }}>Del</div>, width: '10px' },
        { id: 6, slug: "view", name: <div style={{ textAlign: "center" }}>View</div>, width: '10px' },
        { id: 7, slug: "print", name: <div style={{ textAlign: "center" }}>Print</div>, width: '10px' },
        { id: 8, slug: "approval", name: <div style={{ textAlign: "center" }}>Approval</div>, width: '10px' },
        { id: 10, slug: "pdf", name: <div style={{ textAlign: "center" }}>Pdf</div>, width: '10px' },
        { id: 11, slug: "excel", name: <div style={{ textAlign: "center" }}>Excel</div>, width: '10px' },
        { id: 12, slug: "translate", name: <div style={{ textAlign: "center" }}>Translate</div>, width: '10px' }
    ]

    /**
     * Handle when checkbox is checked
     * @author nhan.tran 2024-03-18
     * @param {Object} onChecked
     */
    useEffect(() => {
        if (!onChecked) return;

        let field = onChecked.field.split('_')[0];
        let isChecked = onChecked.isChecked ? 1 : 0;

        setTimeout(async () => {
            let screen = screensData.find(item => item.name === onChecked.screen);
            if (screen) {
                screen[field] = isChecked;
            }

            if (field === 'full') {
                Object.keys(screen).forEach(key => {
                    if (key !== 'name' && key !== 'id') {
                        screen[key] = isChecked;
                    }
                });
            }

            let permission = screen.add.toString() + screen.edit.toString() + screen.del.toString() + screen.view.toString() + screen.print.toString() + screen.approval.toString() + screen.pdf.toString() + screen.excel.toString() + screen.translate.toString();
            permission = permission.split('').reverse().join('');
            let auths = parseInt(permission, 2);

            let data = {
                id_role: role_id,
                id_screen: screen.id,
                auths: auths
            }

            var output = document.getElementById("progress");
            output.innerHTML = "<div><img src='/loading.gif' /></div>";
            try {
                const response = await axiosPrivate.post(Constants.API_URL.ROLE.UPDATE_PERMISSION, data);
                if (response.status === 200) {
                    LibToast.toast(response?.data?.message, 'info');
                    setScreensData(screensData.map(item => item.name === onChecked.screen ? screen : item));
                    setPermissions(prevState => {
                        let newPermissions = _.cloneDeep(prevState);
                        let role = newPermissions[role_id];
                        let new_screen = role.find(item => item.id === screen.id);
                        new_screen.auth = auths;
                        return newPermissions;
                    });
                }
            } catch (error) {
                loginService.handleMissingInfo(error, `Failed to update permissions`) && navigate('/', { replace: true });
            } finally {
                setOnChecked(null);
                output.innerHTML = "";
            }
        }, 300);

    }, [onChecked, screensData, role_id, setScreensData, axiosPrivate, navigate, setPermissions]);

    return (
        <div className={styles.permissions}>
            <div className={styles.permissions_header}>
                <div className={styles.permissions_title}>
                    Permissions
                </div>
            </div>
            <div className={styles.table_permissions}>

                <Table
                    resizable={true}
                    columns={columnsPermissions}
                    data={screensData}

                    status={item => (
                        <div >
                            <Button.Image
                                image={<StatusIcon />}
                            />
                        </div>
                    )}

                    full={item => (
                        <div className="d-flex flex-wrap justify-content-center">
                            <FormInput.Check
                                name={`full_${item.name}`}
                                checked={item.full === 1 ? 1 : 0}
                                onChange={(e) => setOnChecked({
                                    field: e.target.name,
                                    isChecked: e.target.checked,
                                    screen: item?.name
                                })}
                            />
                        </div>
                    )}
                    add={item => (
                        <div className="d-flex flex-wrap justify-content-center">
                            <FormInput.Check
                                name={`add_${item.name}`}
                                checked={item.add === 1 ? 1 : 0}
                                onChange={(e) => setOnChecked({
                                    field: e.target.name,
                                    isChecked: e.target.checked,
                                    screen: item?.name
                                })}
                            />
                        </div>
                    )}
                    edit={item => (
                        <div className="d-flex flex-wrap justify-content-center">
                            <FormInput.Check
                                name={`edit_${item.name}`}
                                checked={item.edit === 1 ? 1 : 0}
                                onChange={(e) => setOnChecked({
                                    field: e.target.name,
                                    isChecked: e.target.checked,
                                    screen: item?.name
                                })}
                            />
                        </div>
                    )}
                    del={item => (
                        <div className="d-flex flex-wrap justify-content-center">
                            <FormInput.Check
                                name={`del_${item.name}`}
                                checked={item.del === 1 ? 1 : 0}
                                onChange={(e) => setOnChecked({
                                    field: e.target.name,
                                    isChecked: e.target.checked,
                                    screen: item?.name
                                })}
                            />
                        </div>
                    )}
                    view={item => (
                        <div className="d-flex flex-wrap justify-content-center">
                            <FormInput.Check
                                name={`view_${item.name}`}
                                checked={item.view === 1 ? 1 : 0}
                                onChange={(e) => setOnChecked({
                                    field: e.target.name,
                                    isChecked: e.target.checked,
                                    screen: item?.name
                                })}
                            />
                        </div>
                    )}
                    print={item => (
                        <div className="d-flex flex-wrap justify-content-center">
                            <FormInput.Check
                                name={`print_${item.name}`}
                                checked={item.print === 1 ? 1 : 0}
                                onChange={(e) => setOnChecked({
                                    field: e.target.name,
                                    isChecked: e.target.checked,
                                    screen: item?.name
                                })}
                            />
                        </div>
                    )}
                    approval={item => (
                        <div className="d-flex flex-wrap justify-content-center">
                            <FormInput.Check
                                name={`approval_${item.name}`}
                                checked={item.approval === 1 ? 1 : 0}
                                onChange={(e) => setOnChecked({
                                    field: e.target.name,
                                    isChecked: e.target.checked,
                                    screen: item?.name
                                })}
                            />
                        </div>
                    )}
                    pdf={item => (
                        <div className="d-flex flex-wrap justify-content-center">
                            <FormInput.Check
                                name={`pdf_${item.name}`}
                                checked={item.pdf === 1 ? 1 : 0}
                                onChange={(e) => setOnChecked({
                                    field: e.target.name,
                                    isChecked: e.target.checked,
                                    screen: item?.name
                                })}
                            />
                        </div>
                    )}
                    excel={item => (
                        <div className="d-flex flex-wrap justify-content-center">
                            <FormInput.Check
                                name={`excel_${item.name}`}
                                checked={item.excel === 1 ? 1 : 0}
                                onChange={(e) => setOnChecked({
                                    field: e.target.name,
                                    isChecked: e.target.checked,
                                    screen: item?.name
                                })}
                            />
                        </div>
                    )}
                    translate={item => (
                        <div className="d-flex flex-wrap justify-content-center">
                            <FormInput.Check
                                name={`translate_${item.name}`}
                                checked={item.translate === 1 ? 1 : 0}
                                onChange={(e) => setOnChecked({
                                    field: e.target.name,
                                    isChecked: e.target.checked,
                                    screen: item?.name
                                })}
                            />
                        </div>
                    )}
                />
            </div>
        </div>
    );
};

export default PermissionForm;