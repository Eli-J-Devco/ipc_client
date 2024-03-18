/********************************************************
* Copyright 2020-2021 NEXT WAVE ENERGY MONITORING INC.
* All rights reserved.
* 
*********************************************************/
import React, { useEffect } from 'react'
import { Tooltip } from 'react-tooltip';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import useAxiosPrivate from '../../../../../hooks/useAxiosPrivate';
import { loginService } from '../../../../../services/loginService';

import Modal from '../../../../../components/modal/Modal';
import { RTextForm } from '../../../../../components/Controls'
import Button from '../../../../../components/button/Button';
import Constants from '../../../../../utils/Constants';
import LibToast from '../../../../../utils/LibToast';


export default function RolesModal(props) {
  const { t } = useTranslation();
  const { closeRolesModal, action, role, setNeedRefresh } = props;
  const methods = useForm({ mode: "onChange" });
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();

  /**
   * Set default value for form when open modal to edit/ add role
   * @author nhan.tran 2024-03-18
   * @param {Object} role role to edit or null if add new role
   */
  useEffect(() => {
    if (role) {
      methods.setValue("name", role?.name);
      methods.setValue("description", role?.description);
    }
  }, [role, methods]);

  /**
   * Handle submit form to add/ edit role
   * @author nhan.tran 2024-03-18
   * @param {Object} data form data
   */
  const handleSave = methods.handleSubmit(data => {
    var output = document.getElementById("progress");
    output.innerHTML = "<div><img src='/loading.gif' /></div>";
    setTimeout(async () => {
      try {
        let url = action?.text === "Add" ? Constants.API_URL.USERS.ADD_ROLE : Constants.API_URL.USERS.UPDATE_ROLE;
        data = action?.text === "Add" ? data : { ...data, id: role?.id };
        const response = await axiosPrivate.post(url, data, { headers: { "Content-Type": "application/json" } });
        if (response?.status === 200) {
          LibToast.toast(`${action?.text} succesfully`, "info");
          setNeedRefresh(true);
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
      }
      finally {
        closeRolesModal(false);
        output.innerHTML = "";
      }
    }, 500);
  });

  const footer = <div>
    <Button variant="dark" onClick={() => handleSave()}>
      <Button.Text text={action?.text} />
    </Button>
    <Button variant="grey" className="ms-3" onClick={() => closeRolesModal(true)}>
      <Button.Text text="Cancel" />
    </Button>
  </div>

  return (
    <FormProvider {...methods}>
      <Modal
        isOpen={true}
        close={closeRolesModal}
        title={`${action?.text} Role`}
        footer={footer}
      >
        <div>
          <div >
            <RTextForm
              label="Name"
              inputClass="form-control"
              inputId="name"
              inputName="name"
              name="name"
              required={"Name is required"}
              info="Name Note"
            > </RTextForm>

            <Tooltip id="my-tooltip" />
          </div>

          <div >
            <RTextForm
              label="Description"
              inputClass="form-control"
              inputId="description"
              inputName="description"
              name="description"
              info="Description Note"
            > </RTextForm>

            <Tooltip id="my-tooltip" />
          </div>


        </div>
      </Modal>
    </FormProvider>
  )
}
