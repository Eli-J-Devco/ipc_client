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

const PermissionForm = ({ screensData, setScreensData }) => {
    const { initialValues } = useFormInput();
    const [onChecked, setOnChecked] = useState(null);

    const columnsPermissions = [
        { id: 1, slug: "screen_name", name: "Screen Name", width: '400px' },
        { id: 2, slug: "full", name: "Full", width: '100px' },
        { id: 3, slug: "add", name: "Add", width: '100px' },
        { id: 4, slug: "edit", name: "Edit", width: '100px' },
        { id: 5, slug: "del", name: "Del", width: '100px' },
        { id: 6, slug: "view", name: "View", width: '100px' },
        { id: 7, slug: "print", name: "Print", width: '100px' },
        { id: 8, slug: "approval", name: "Approval", width: '100px' },
        { id: 10, slug: "pdf", name: "Pdf", width: '100px' },
        { id: 11, slug: "excel", name: "Excel", width: '100px' },
        { id: 12, slug: "translate", name: "Translate", width: '100px' }
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
        let newScreens = initialValues.map(item => {
            if (item.screen_name === onChecked.screen) {
                if (field === 'full') {
                    item = {
                        ...item,
                        full: isChecked,
                        add: isChecked,
                        edit: isChecked,
                        del: isChecked,
                        view: isChecked,
                        print: isChecked,
                        approval: isChecked,
                        pdf: isChecked,
                        excel: isChecked,
                        translate: isChecked
                    };
                }
                else {
                    item = {
                        ...item,
                        [field]: isChecked
                    };
                    if (isChecked === 0)
                        item = {
                            ...item,
                            full: 0
                        };
                    else {
                        let isFull = 1;
                        for (let key in item) {
                            if (key !== 'screen_name' && key !== 'full' && item[key] === 0) {
                                isFull = 0;
                                break;
                            }
                        }
                        item = {
                            ...item,
                            full: isFull
                        };
                    }
                }

            }
            return item;
        });

        setTimeout(() => {
            setScreensData(_.cloneDeep(newScreens));
            setOnChecked(null);
        }, 100);

    }, [onChecked, setScreensData, screensData, initialValues]);

    return (
        <div className={styles.permissions}>
            <div className={styles.permissions_header}>
                <div className={styles.permissions_title}>
                    Permissions
                </div>
            </div>
            <div className={styles.table_permissions}>

                <Table
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
                                name={`full_${item.screen_name}`}
                                checked={item.full === 1 ? 1 : 0}
                                onChange={(e) => setOnChecked({
                                    field: e.target.name,
                                    isChecked: e.target.checked,
                                    screen: item?.screen_name
                                })}
                            />
                        </div>
                    )}
                    add={item => (
                        <div className="d-flex flex-wrap justify-content-center">
                            <FormInput.Check
                                name={`add_${item.screen_name}`}
                                checked={item.add === 1 ? 1 : 0}
                                onChange={(e) => setOnChecked({
                                    field: e.target.name,
                                    isChecked: e.target.checked,
                                    screen: item?.screen_name
                                })}
                            />
                        </div>
                    )}
                    edit={item => (
                        <div className="d-flex flex-wrap justify-content-center">
                            <FormInput.Check
                                name={`edit_${item.screen_name}`}
                                checked={item.edit === 1 ? 1 : 0}
                                onChange={(e) => setOnChecked({
                                    field: e.target.name,
                                    isChecked: e.target.checked,
                                    screen: item?.screen_name
                                })}
                            />
                        </div>
                    )}
                    del={item => (
                        <div className="d-flex flex-wrap justify-content-center">
                            <FormInput.Check
                                name={`del_${item.screen_name}`}
                                checked={item.del === 1 ? 1 : 0}
                                onChange={(e) => setOnChecked({
                                    field: e.target.name,
                                    isChecked: e.target.checked,
                                    screen: item?.screen_name
                                })}
                            />
                        </div>
                    )}
                    view={item => (
                        <div className="d-flex flex-wrap justify-content-center">
                            <FormInput.Check
                                name={`view_${item.screen_name}`}
                                checked={item.view === 1 ? 1 : 0}
                                onChange={(e) => setOnChecked({
                                    field: e.target.name,
                                    isChecked: e.target.checked,
                                    screen: item?.screen_name
                                })}
                            />
                        </div>
                    )}
                    print={item => (
                        <div className="d-flex flex-wrap justify-content-center">
                            <FormInput.Check
                                name={`print_${item.screen_name}`}
                                checked={item.print === 1 ? 1 : 0}
                                onChange={(e) => setOnChecked({
                                    field: e.target.name,
                                    isChecked: e.target.checked,
                                    screen: item?.screen_name
                                })}
                            />
                        </div>
                    )}
                    approval={item => (
                        <div className="d-flex flex-wrap justify-content-center">
                            <FormInput.Check
                                name={`approval_${item.screen_name}`}
                                checked={item.approval === 1 ? 1 : 0}
                                onChange={(e) => setOnChecked({
                                    field: e.target.name,
                                    isChecked: e.target.checked,
                                    screen: item?.screen_name
                                })}
                            />
                        </div>
                    )}
                    pdf={item => (
                        <div className="d-flex flex-wrap justify-content-center">
                            <FormInput.Check
                                name={`pdf_${item.screen_name}`}
                                checked={item.pdf === 1 ? 1 : 0}
                                onChange={(e) => setOnChecked({
                                    field: e.target.name,
                                    isChecked: e.target.checked,
                                    screen: item?.screen_name
                                })}
                            />
                        </div>
                    )}
                    excel={item => (
                        <div className="d-flex flex-wrap justify-content-center">
                            <FormInput.Check
                                name={`excel_${item.screen_name}`}
                                checked={item.excel === 1 ? 1 : 0}
                                onChange={(e) => setOnChecked({
                                    field: e.target.name,
                                    isChecked: e.target.checked,
                                    screen: item?.screen_name
                                })}
                            />
                        </div>
                    )}
                    translate={item => (
                        <div className="d-flex flex-wrap justify-content-center">
                            <FormInput.Check
                                name={`translate_${item.screen_name}`}
                                checked={item.translate === 1 ? 1 : 0}
                                onChange={(e) => setOnChecked({
                                    field: e.target.name,
                                    isChecked: e.target.checked,
                                    screen: item?.screen_name
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