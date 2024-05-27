/********************************************************
* Copyright 2020-2021 NEXT WAVE ENERGY MONITORING INC.
* All rights reserved.
* 
*********************************************************/
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import _ from 'lodash';
import * as yup from 'yup';

import useUserModal from '../useUserModal';
import useAxiosPrivate from '../../../../../hooks/useAxiosPrivate';
import { loginService } from '../../../../../services/loginService';

import FormInput from '../../../../../components/formInput/FormInput';
import Button from '../../../../../components/button/Button';
import Modal from '../../../../../components/modal/Modal';

import LibToast from '../../../../../utils/LibToast';
import Constants from '../../../../../utils/Constants';
import useProjectSetup from '../../../../../hooks/useProjectSetup';

export default function AddEditModal({ isOpenModal, closeModal, setNeedRefresh }) {
    const { t } = useTranslation();
    const { actionOption } = useUserModal();
    const { roles } = useProjectSetup();

    const [allRoles, setAllRoles] = useState([]);
    const statusOption = [{ value: 1, label: "Active" }, { value: 0, label: "Inactive" }]
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();

    const schema = yup.object().shape({
        first_name: yup.string().required("First Name is required"),
        last_name: yup.string().required("Last Name is required"),
        roles_id: yup.array().min(1, "Role is required"),
        ...(isOpenModal?.action === actionOption.Add.action && {
            email: yup.string().matches(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, "Email is not valid").required("Email is required"),
            password: yup.string().matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character").required("Password is required").min(8, "Password must be at least 8 characters"),
            confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match').required("Confirm password is required")
        }),
    });

    /**
     * Handle add or edit user
     * @author nhan.tran 2024-03-22
     * @param {Object} data 
     */
    const handleSave = (data) => {
        if (_.isEqual(data, isOpenModal?.user)) {
            LibToast.toast(t('toastMessage.info.noChange'), "info");
            return;
        }

        let url = isOpenModal?.action === actionOption.Add.action ? Constants.API_URL.USERS.ADD : Constants.API_URL.USERS.UPDATE;
        const { id, first_name, last_name, phone, roles_id, status } = data;
        const role = roles_id?.map(role => ({ id: role.value })) || [];

        const dataPost = {
            id: id || "",
            first_name: first_name || "",
            last_name: last_name || "",
            phone: phone || "",
            role,
            status: status?.value,
            ...(isOpenModal?.action === actionOption.Add.action && { email: data?.email, password: data?.password })
        };

        var output = document.getElementById("progress");
        output.innerHTML = "<div><img src='/loading.gif' /></div>";
        setTimeout(async () => {
            try {
                const response = await axiosPrivate.post(url, dataPost);
                if (response?.status === 200 || response?.status === 201) {
                    LibToast.toast(response?.data?.message, "info");
                    setNeedRefresh(true);
                    closeModal();
                }
            } catch (error) {
                loginService.handleMissingInfo(error, "Failed to add or edit user") && navigate("/", { replace: true });
            } finally {
                output.innerHTML = "";
            }
        }, 300);
    };

    const footer = <div>
        <Button variant="dark" type="submit" formId="userModal">
            <Button.Text text={isOpenModal?.action} />
        </Button>
        <Button variant="grey" className="ms-3" onClick={() => closeModal()}>
            <Button.Text text="Cancel" />
        </Button>
    </div>

    useEffect(() => {
        if (!roles?.length) return;

        if (allRoles?.length) return;

        setAllRoles(roles.map(role => ({ value: role.id, label: role.name })));
    }, [roles, allRoles]);

    return (
        <FormInput id="userModal" validationSchema={schema} initialValues={isOpenModal?.user} onSubmit={handleSave}>
            <Modal
                isOpen={true}
                close={closeModal}
                title={`${isOpenModal?.action} User`}
                footer={footer}
                size="lg"
            >
                <div className='row justify-content-center m-3'>
                    <div className='col-6'>
                        <FormInput.Text
                            label="First Name"
                            name="first_name"
                            placeholder="First Name"
                            className="mb-3"
                            required={true}
                        />
                    </div>
                    <div className='col-6'>
                        <FormInput.Text
                            label="Last Name"
                            name="last_name"
                            placeholder="Last Name"
                            className="mb-3"
                            required={true}
                        />
                    </div>
                    <div className='ms-3 me-3'>
                        <FormInput.Text
                            label="Email"
                            name="email"
                            placeholder="Email"
                            className="mb-3"
                            disabled={isOpenModal?.action === actionOption.Update.action}
                            required={isOpenModal?.action === actionOption.Add.action}
                        />
                        <FormInput.Text
                            label="Phone Number"
                            name="phone"
                            placeholder="Phone Number"
                            className="mb-3"
                        />
                        {
                            isOpenModal?.action === actionOption.Add.action &&
                            <>
                                <FormInput.Text
                                    label="Password"
                                    name="password"
                                    type='password'
                                    placeholder="Password"
                                    className="mb-3"
                                    required={true}
                                    isRandom={true}
                                />
                                <FormInput.Text
                                    label="Confirm password"
                                    name="confirmPassword"
                                    type='password'
                                    placeholder="Confirm password"
                                    className="mb-3"
                                    required={true}
                                />
                            </>
                        }
                        <FormInput.Select
                            label="Role"
                            name="roles_id"
                            isClearable={true}
                            isMulti={true}
                            isSearchable={true}
                            option={allRoles}
                            className="mb-3"
                            required={true}
                        />
                        <FormInput.Select
                            label="Status"
                            name="status"
                            option={statusOption}
                            className="mb-3"
                        />
                    </div>
                </div>
            </Modal>
        </FormInput>
    )
}