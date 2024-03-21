import { useEffect, useState } from 'react';
import * as yup from 'yup';
import Button from '../../../../../components/button/Button';
import LibToast from '../../../../../utils/LibToast';
import { useTranslation } from 'react-i18next';
import useUserModal from '../useUserModal';
import useAxiosPrivate from '../../../../../hooks/useAxiosPrivate';
import { useNavigate } from 'react-router-dom';
import Constants from '../../../../../utils/Constants';
import { loginService } from '../../../../../services/loginService';
import FormInput from '../../../../../components/formInput/FormInput';
import Modal from '../../../../../components/modal/Modal';
import _ from 'lodash';

export default function AddEditModal({ isOpenModal, closeModal, setNeedRefresh }) {
    const { t } = useTranslation();
    const { actionOption } = useUserModal();
    const [allRoles, setAllRoles] = useState([]);
    const statusOption = [{ value: 0, label: "Inactive" }, { value: 1, label: "Active" }]
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
                    LibToast.toast(`User ${data?.full_name} ${isOpenModal?.action === actionOption.Edit ? t('toastMessage.info.update') : t('toastMessage.info.add')}`, "info");
                    setNeedRefresh(true);
                    closeModal();
                }
            } catch (error) {
                let msg = loginService.handleMissingInfo(error);
                if (typeof msg === "string") {
                    LibToast.toast(msg, "error");
                }
                else {
                    if (msg)
                        LibToast.toast(t('toastMessage.error.update'), "error");
                    else
                        navigate("/")
                }
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
        !allRoles.length && setTimeout(async () => {
            try {
                const response = await axiosPrivate.post(Constants.API_URL.USERS.ALL_ROLE);
                if (response?.status === 200) {
                    setAllRoles(response.data.map(role => ({ value: role.id, label: role.name })));
                }
            } catch (error) {
                let msg = loginService.handleMissingInfo(error);
                if (typeof msg === "string") {
                    LibToast.toast(msg, "error");
                }
                else {
                    if (msg)
                        LibToast.toast(t('toastMessage.error.fetch'), "error");
                    else
                        navigate("/")
                }
            }
        }, 100);
    }, [allRoles, isOpenModal?.action]);

    return (
        <FormInput id="userModal" validationSchema={schema} initialValues={isOpenModal?.user} onSubmit={handleSave}>
            <Modal
                isOpen={true}
                close={closeModal}
                title={`${isOpenModal?.action} User`}
                footer={footer}
                size="xl"
            >
                <div className='row d-flex justify-content-center'>
                    <div className='col-5 m-3'>
                        <FormInput.Text
                            label="First Name"
                            name="first_name"
                            placeholder="First Name"
                            className="mb-3"
                            required={true}
                        />
                        <FormInput.Text
                            label="Email"
                            name="email"
                            placeholder="Email"
                            className="mb-3"
                            disabled={isOpenModal?.action === actionOption.Edit.action}
                            required={isOpenModal?.action === actionOption.Add.action}
                        />
                        {
                            isOpenModal?.action === actionOption.Add.action &&
                            <FormInput.Text
                                label="Password"
                                name="password"
                                type='password'
                                placeholder="Password"
                                className="mb-3"
                                required={true}
                                isRandom={true}
                            />
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
                    </div>
                    <div className='col-5 m-3'>
                        <FormInput.Text
                            label="Last Name"
                            name="last_name"
                            placeholder="Last Name"
                            className="mb-3"
                            required={true}
                        />
                        <FormInput.Text
                            label="Phone Number"
                            name="phone"
                            placeholder="Phone Number"
                            className="mb-3"
                        />
                        {
                            isOpenModal?.action === actionOption.Add.action &&
                            <FormInput.Text
                                label="Confirm password"
                                name="confirmPassword"
                                type='password'
                                placeholder="Confirm password"
                                className="mb-3"
                                required={true}
                            />
                        }
                        <FormInput.Select
                            label="Status"
                            name="status"
                            option={statusOption}
                            className="mb-3"
                            required={true}
                        />
                    </div>
                </div>
            </Modal>
        </FormInput>
    )
}