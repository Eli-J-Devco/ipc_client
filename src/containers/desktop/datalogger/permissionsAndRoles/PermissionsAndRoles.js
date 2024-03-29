/********************************************************
* Copyright 2020-2021 NEXT WAVE ENERGY MONITORING INC.
* All rights reserved.
* 
*********************************************************/
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import styles from './PermissionsAndRoles.module.scss';

import useAxiosPrivate from '../../../../hooks/useAxiosPrivate';
import { loginService } from '../../../../services/loginService';
import usePermissionsAndRoles from './usePermissionsAndRoles';

import RolesModal from './rolesModal/RolesModal';
import Permissions from './permissions/Permissions';

import Constants from '../../../../utils/Constants';
import LibToast from '../../../../utils/LibToast';
import Breadcrumb from "../../../../components/breadCrumb/BreadCrumb";
import Table from '../../../../components/table/Table';
import Button from '../../../../components/button/Button';

import { ReactComponent as EditIcon } from "../../../../assets/images/edit.svg";
import { ReactComponent as DeleteIcon } from "../../../../assets/images/delete.svg";
import { ReactComponent as StatusIcon } from "../../../../assets/images/status-circle.svg";
import { ReactComponent as ExportIcon } from "../../../../assets/images/export.svg";
import { ReactComponent as AddIcon } from "../../../../assets/images/add.svg";
import ConfirmDeleteModal from './rolesModal/ConfirmDeleteModal';

export default function PermissionsAndRoles() {
  const { t } = useTranslation();
  const axiosPrivate = useAxiosPrivate();
  const {
    isOpenRolesModal,
    openAddRoles,
    closeAddRoles,
    openEditRoles,
    closeEditRoles,
    openConfirmDeleteRoles,
    closeConfirmDeleteRoles
  } = usePermissionsAndRoles();
  const [needRefresh, setNeedRefresh] = useState(true);

  const [roles, setRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState(null);
  const [permissions, setPermissions] = useState([]);
  const navigate = useNavigate();

  /**
   * Fetch permissions of selected role
   * @author nhan.tran 2024-03-18
   * @param {Object} selectedRole selected role
   */
  useEffect(() => {
    var output = document.getElementById("progress");
    output.innerHTML = "<div><img src='/loading.gif' /></div>";
    if (selectedRole && !permissions[selectedRole?.id]) {
      setTimeout(async () => {
        try {
          const response = await axiosPrivate.post(Constants.API_URL.USERS.ROLE_SCREEN, {
            id_role: selectedRole?.id
          },
            { headers: { 'Content-Type': 'application/json' } }
          );
          if (response.status === 200) {
            // Set permissions for selected role to reduce fetching data
            setPermissions(prevState => ({ ...prevState, [selectedRole?.id]: response.data }));
          }
        }
        catch (error) {
          let msg = loginService.handleMissingInfo(error);
          if (typeof msg === 'string') {
            LibToast.toast(msg, 'error');
          }
          else {
            if (!msg) {
              LibToast.toast(t('toastMessage.error.fetch'), 'error');
            }
            else {
              navigate('/');
            }
          }
        }
        finally {
          output.innerHTML = "";
        }
      }, 300);
    }
    output.innerHTML = "";
  }, [selectedRole, axiosPrivate, navigate, t, permissions]);

  /**
   * Fetch all roles and set selected role to the first role in the list
   * If it's delete action, set selected role to the first role in the list
   * If it's add action, set selected role to the last role in the list
   * If it's edit action, set selected role to the role that is being edited
   * If it's not any action, set selected role to the first role in the list
   * @author nhan.tran 2024-03-18
   * @param {Boolean} needRefresh need to refresh roles
   * @param {Object} isOpenRolesModal open roles modal
   */
  useEffect(() => {
    needRefresh && setTimeout(async () => {
      try {
        const response = await axiosPrivate.post(Constants.API_URL.USERS.ALL_ROLE);
        if (response.status === 200) {
          let data = response.data.map(role => ({ id: role?.id, name: role?.name, description: role?.description }));
          setRoles(data);

          if (isOpenRolesModal?.delete !== undefined) {
            setSelectedRole(data[0]);
          } else if (isOpenRolesModal?.add !== undefined) {
            setSelectedRole(data[data.length - 1]);
          } else if (isOpenRolesModal?.edit !== undefined) {
            setSelectedRole(data.find(role => role?.id === selectedRole?.id));
          } else {
            setSelectedRole(data[0]);
          }
        }
      }
      catch (error) {
        let msg = loginService.handleMissingInfo(error);
        if (typeof msg === 'string') {
          LibToast.toast(msg, 'error');
        }
        else {
          if (!msg) {
            LibToast.toast(t('toastMessage.error.fetch'), 'error');
          }
          else {
            navigate('/');
          }
        }
      }
      finally {
        setNeedRefresh(false);
      }
    }, 300);
  }, [needRefresh]);

  /**
   * Delete role
   * @author nhan.tran 2024-03-18
   * @param {Object} role selected role to delete
   */

  const columnsRoles = [
    { id: 1, slug: "id", name: "Id", },
    { id: 2, slug: "name", name: "Name" },
    { id: 3, slug: "actions", name: <div className="text-center">Actions</div> }
  ]

  return (
    <div className="main">
      {isOpenRolesModal?.add && <RolesModal closeRolesModal={closeAddRoles} action={{ text: "Add" }} setNeedRefresh={setNeedRefresh} />}
      {isOpenRolesModal?.edit && <RolesModal closeRolesModal={closeEditRoles} action={{ text: "Edit" }} role={selectedRole} setNeedRefresh={setNeedRefresh} />}
      {isOpenRolesModal?.delete && <ConfirmDeleteModal closeRolesModal={closeConfirmDeleteRoles} action={{ text: "Confirm" }} role={selectedRole} setNeedRefresh={setNeedRefresh} />}
      <div className={styles.header}>
        <Breadcrumb
          routes={[
            {
              path: "/datalogger",
              name: "Dashboard"
            },
            {
              path: "/datalogger/permissions-roles",
              name: "Permissions & Roles"
            }
          ]}
        />
      </div>

      <div className='row'>
        <div className='col-xl-4 col-lg-4 col-md-4 col-4'>
          <div className={styles.roles}>
            <div className={styles.roles_header}>
              <div className={styles.roles_title}>
                Roles
              </div>
              <div className={styles.add_roles} onClick={() => openAddRoles()}>
                <AddIcon />
              </div>
            </div>
            <div className={styles.table_roles}>
              <Table
                columns={columnsRoles}
                data={roles}
                selectRow={
                  {
                    enable: true,
                    selectedRow: selectedRole,
                    onSelect: setSelectedRole
                  }
                }
                status={item => (
                  <div >
                    <Button.Image
                      image={<StatusIcon />}
                    />
                  </div>
                )}

                actions={item => (
                  <div className="d-flex flex-wrap justify-content-center">
                    <Button.Image
                      image={<EditIcon />}
                      className="mx-2"
                      onClick={() => {
                        setTimeout(() => {
                          setSelectedRole(item);
                          openEditRoles()
                        }, 100);
                      }}
                    />
                    <Button.Image
                      image={<DeleteIcon />}
                      className="mx-2"
                      onClick={() => {
                        setTimeout(() => {
                          setSelectedRole(item);
                          openConfirmDeleteRoles();
                        }, 100);
                      }}
                    />
                  </div>
                )}
              />
            </div>
          </div>
        </div>
        <Permissions permissions={permissions} setPermissions={setPermissions} selectedRole={selectedRole} />
      </div>
    </div>
  );
};