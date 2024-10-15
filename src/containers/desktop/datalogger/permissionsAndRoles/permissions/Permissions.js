/********************************************************
* Copyright 2020-2021 NEXT WAVE ENERGY MONITORING INC.
* All rights reserved.
* 
*********************************************************/
import React, { useEffect, useRef, useState } from "react";
import PermissionForm from "./PermissionForm";

const Permissions = ({ permissions, setPermissions, selectedRole }) => {
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

        setTimeout(() => {
            setScreensData([]);
            tableData.current = [];
            permissions[selectedRole?.id].forEach(element => {
                if (element?.name && element?.id && element?.auth !== null) {
                    let permission = element?.auth.toString(2);
                    if (permission.length < 9) {
                        let length = 9 - permission.length;
                        for (let i = 0; i < length; i++) {
                            permission = "0" + permission;
                        }
                    }
                    let permissionArray = permission.split('').reverse();
                    let screen = {
                        id: element?.id,
                        name: element?.name,
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
        }, 100);
    }, [permissions, selectedRole]);

    return (
        <div className='col-xl-8 col-lg-8 col-md-8 col-8'>
            <PermissionForm
                screensData={screensData}
                setScreensData={setScreensData}
                role_id={selectedRole?.id}
                setPermissions={setPermissions}
            />
        </div>
    );
};

export default Permissions;