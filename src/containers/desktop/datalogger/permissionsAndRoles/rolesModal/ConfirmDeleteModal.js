/********************************************************
* Copyright 2020-2021 NEXT WAVE ENERGY MONITORING INC.
* All rights reserved.
* 
*********************************************************/
import React from 'react'
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import useAxiosPrivate from '../../../../../hooks/useAxiosPrivate';
import { loginService } from '../../../../../services/loginService';

import Modal from '../../../../../components/modal/Modal';
import Button from '../../../../../components/button/Button';
import Constants from '../../../../../utils/Constants';
import LibToast from '../../../../../utils/LibToast';


export default function ConfirmDeleteModal(props) {
  const { t } = useTranslation();
  const { closeRolesModal, action, role, setNeedRefresh } = props;
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();

  /**
   * Handle delete role
   * @author nhan.tran 2024-03-22
   * @param {Object} data
   */
  const handleDelete = () => {
    var output = document.getElementById("progress");
    output.innerHTML = "<div><img src='/loading.gif' /></div>";
    setTimeout(async () => {
      try {
        const response = await axiosPrivate.post(Constants.API_URL.USERS.DELETE_ROLE, { id: role?.id });
        if (response.status === 200) {
          LibToast.toast(`Role ${t('toastMessage.info.delete')}`, 'info');
          closeRolesModal(true);
          setNeedRefresh(true);
        }
      }
      catch (error) {
        setNeedRefresh(false);
        let msg = loginService.handleMissingInfo(error);
        if (typeof msg === 'string') {
          LibToast.toast(msg, 'error');
        }
        else {
          if (!msg) {
            LibToast.toast(t('toastMessage.error.delete'), 'error');
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
  }

  return (
    <Modal
      isOpen={true}
      close={closeRolesModal}
      title={`${action?.text} Delete Role`}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Button variant="dark" onClick={() => handleDelete()}>
          <Button.Text text={action?.text} />
        </Button>
        <Button variant="grey" className="ms-3" onClick={() => closeRolesModal(true)}>
          <Button.Text text="Cancel" />
        </Button>
      </div>
    </Modal>
  )
}
