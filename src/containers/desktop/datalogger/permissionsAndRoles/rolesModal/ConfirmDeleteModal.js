/********************************************************
* Copyright 2020-2021 NEXT WAVE ENERGY MONITORING INC.
* All rights reserved.
* 
*********************************************************/
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

import useAxiosPrivate from '../../../../../hooks/useAxiosPrivate';
import { loginService } from '../../../../../services/loginService';

import Modal from '../../../../../components/modal/Modal';
import Button from '../../../../../components/button/Button';
import Constants from '../../../../../utils/Constants';
import LibToast from '../../../../../utils/LibToast';


export default function ConfirmDeleteModal(props) {
  const { closeRolesModal, action, users, role, setNeedRefresh } = props;
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const [cannotDelete, setCannotDelete] = useState()

  useEffect(() => {
    users.forEach(user => {
      if (user.role.some(userRole => userRole.name === role.name)) {
        setCannotDelete(true)
      }
    })
  }, [])
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
        const response = await axiosPrivate.post(Constants.API_URL.ROLE.DELETE, { id: role?.id });
        if (response.status === 200) {
          LibToast.toast(response?.data?.message, 'info');
          closeRolesModal(true);
          setNeedRefresh(true);
        }
      }
      catch (error) {
        setNeedRefresh(false);
        loginService.handleMissingInfo(error, `Failed to delete role`) && navigate('/', { replace: true });
      }
      finally {
        output.innerHTML = "";
      }
    }, 1);
  }
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axiosPrivate.post(
          Constants.API_URL.USERS.LIST + `?page=0&limit=99999`
        );
        if (data) {
          const users = data.data
          users.forEach(user => {
            if (user.role.some(userRole => userRole.name === role.name)) {
              setCannotDelete(true)
              return
            }
          })
        }
      } catch (e) {
        console.log(e)
      }
    }
    fetchData()
  }, [])
  const footer = cannotDelete ? 
  null : 
  <div>
    <Button variant="dark" onClick={() => handleDelete()} >
      <Button.Text text={action?.text} />
    </Button>
    <Button variant="grey" className="ms-3" onClick={() => closeRolesModal(true)}>
      <Button.Text text="Cancel" />
    </Button>
  </div>
  return (
    <Modal
      isOpen={true}
      close={closeRolesModal}
      title={`${action?.text} Delete Role`}
      centered={true}
      footer={footer}
    >
      {
        cannotDelete ? 
        <h6 className="mb-3">This role is currently assigned to accounts. Cannot delete</h6> :
        <h6>Are you sure you want to delete?</h6>
      }
      
    </Modal>
  )
}
