/********************************************************
* Copyright 2020-2021 NEXT WAVE ENERGY MONITORING INC.
* All rights reserved.
* 
*********************************************************/
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import _ from "lodash";
import PermissionForm from "./PermissionForm";

import useAxiosPrivate from "../../../../../hooks/useAxiosPrivate";
import { loginService } from "../../../../../services/loginService";

import FormInput from "../../../../../components/formInput/FormInput";
import LibToast from "../../../../../utils/LibToast";
import Constants from "../../../../../utils/Constants";

const Permissions = ({ permissions, setPermissions, selectedRole }) => {
    const { t } = useTranslation();
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const [screensData, setScreensData] = useState([]);
    const tableData = useRef([]);

    /**
     * Fetch permissions of selected role and extract data to display on the table
     * @author nhan.tran 2024-03-18
     * @param {Object} selectedRole selected role
     * @param {Object} permissions permissions of selected role
     * @param {Function} setPermissions set permissions of selected role
     * @param {Function} setScreensData set data to display on the table
     * @param {Array} screensData data to display on the table
     */
    useEffect(() => {
        if (!permissions[selectedRole?.id] || !selectedRole) return;
        var output = document.getElementById("progress");
        output.innerHTML = "<div><img src='/loading.gif' /></div>";
        setTimeout(() => {
            setScreensData([]);
            tableData.current = [];
            permissions[selectedRole?.id].forEach(element => {
                if (element?.screen_name && element?.id_screen && element?.auth !== null) {
                    let permission = element?.auth.toString(2);
                    if (permission.length < 9) {
                        let length = 9 - permission.length;
                        for (let i = 0; i < length; i++) {
                            permission = "0" + permission;
                        }
                    }
                    let permissionArray = permission.split('').reverse();
                    let screen = {
                        id_screen: element?.id_screen,
                        screen_name: element?.screen_name,
                        full: permission.search("0") === -1 ? 1 : 0,
                        add: parseInt(permissionArray[0]),
                        edit: parseInt(permissionArray[1]),
                        del: parseInt(permissionArray[2]),
                        view: parseInt(permissionArray[3]),
                        print: parseInt(permissionArray[4]),
                        approval: parseInt(permissionArray[5]),
                        pdf: parseInt(permissionArray[6]),
                        excel: parseInt(permissionArray[7]),
                        translate: parseInt(permissionArray[8])
                    }
                    setScreensData(prevState => [...prevState, screen]);
                }
            });
            output.innerHTML = "";
        }, 100);
    }, [permissions, selectedRole]);

    /**
     * Save permission of selected role to the database
     * If there is no change, show a message to notify user
     * If there is change, update permission of selected role and show a message to notify user
     * @author nhan.tran 2024-03-18
     * @param {Array} data data to save
     * @param {Array} tableData data of table before saving
     * @param {Object} selectedRole selected role
     * @param {Function} setPermissions set permissions of selected role
     * @param {Function} setScreensData set data to display on the table
     * @param {Array} screensData data to display on the table
     */
    const onSave = (data) => {
        if (_.isEqual(tableData.current, data)) {
            LibToast.toast(t('toastMessage.info.noChange'), 'info');
            return;
        }

        // Update permission of selected role in database
        let updatePermissionData = {
            id_role: selectedRole?.id,
            role_screen: []
        };

        let newPermission = [];

        for (let i = 0; i < data.length; i++) {
            let permission = data[i].add.toString() + data[i].edit.toString() + data[i].del.toString() + data[i].view.toString() + data[i].print.toString() + data[i].approval.toString() + data[i].pdf.toString() + data[i].excel.toString() + data[i].translate.toString();
            permission = permission.split('').reverse().join('');

            // Update permission of selected role in client side to reduce fetching data
            newPermission.push({
                auth: parseInt(permission, 2),
                id_role: selectedRole?.id,
                id_screen: data[i].id_screen,
                screen_name: data[i].screen_name
            });

            if (_.isEqual(tableData.current[i], data[i])) continue;

            let screen = {
                id_screen: data[i].id_screen,
                auth: parseInt(permission, 2)
            };
            updatePermissionData.role_screen.push(screen);
        }

        var output = document.getElementById("progress");
        output.innerHTML = "<div><img src='/loading.gif' /></div>";
        setTimeout(async () => {
            try {
                const response = await axiosPrivate.post(Constants.API_URL.USERS.UPDATE_ROLE_SCREEN, updatePermissionData);
                if (response.status === 200) {
                    LibToast.toast(`Permission of ${selectedRole?.name} ${t('toastMessage.info.update')}`, 'info');
                    tableData.current = _.cloneDeep(data);

                    setPermissions(prevState => ({ ...prevState, [selectedRole?.id]: newPermission }));
                }
            }
            catch (error) {
                let msg = loginService.handleMissingInfo(error);
                if (typeof msg === 'string') {
                    LibToast.toast(msg, 'error');
                }
                else {
                    if (!msg) {
                        LibToast.toast(t('toastMessage.error.update'), 'error');
                    }
                    else {
                        navigate('/');
                    }
                }
            }
            finally {
                output.innerHTML = "";
            }
        }, 100);
    };

    /**
     * Set data to display on the table when fetching data from the server
     * @author nhan.tran 2024-03-18
     * @param {Array} screensData data to display on the table
     * @param {Array} tableData data of table before saving
     */
    useEffect(() => {
        if (!screensData)
            return;

        if (tableData.current.length > 0) {
            onSave(screensData);
            return;
        }

        tableData.current = _.cloneDeep(screensData);
    }, [screensData]);

    return (
        <div className='col-xl-8 col-lg-8 col-md-8 col-8'>
            <FormInput onSubmit={onSave} initialValues={screensData}>
                <PermissionForm
                    screensData={screensData}
                    setScreensData={setScreensData}
                />
            </FormInput>
        </div>
    );
};

export default Permissions;