/********************************************************
* Copyright 2020-2021 NEXT WAVE ENERGY MONITORING INC.
* All rights reserved.
* 
*********************************************************/
import React from 'react';
import Breadcrumb from "../../../../components/breadCrumb/BreadCrumb";
import styles from './PermissionsAndRoles.module.scss';
import Table from '../../../../components/table/Table';
import { ReactComponent as EditIcon } from "../../../../assets/images/edit.svg";
import { ReactComponent as DeleteIcon } from "../../../../assets/images/delete.svg";
import { ReactComponent as StatusIcon } from "../../../../assets/images/status-circle.svg";
import { ReactComponent as ExportIcon } from "../../../../assets/images/export.svg";
import { ReactComponent as AddIcon } from "../../../../assets/images/add.svg";
import Button from '../../../../components/button/Button';
import { RCheckbox } from './../../../../components/Controls';
import usePermissionsAndRoles from './usePermissionsAndRoles';
import AddRoles from './addRoles/AddRoles';



export default function PermissionsAndRoles() {
  const { isAddRoles, openAddRoles, closeAddRoles } = usePermissionsAndRoles();


 const columnsRoles = [
  {id: 1, slug: "id", name: "Id",}, 
  {id: 2, slug: "name",name: "Name"}, 
  {id: 3, slug: "actions", name: <div className="text-center">Actions</div>}
 ]
  const dataListRoles = [
    {id: "1", name: "Admin", action: ""},
    {id: "2", name: "Manager", action: ""},
    {id: "3", name: "Customer", action: ""},
    {id: "4", name: "User", action: ""},
  ]

  const columnsPermissions = [
    {id: 1, slug: "screen_name", name: "Screen Name", width: '400px'},
    {id: 2, slug: "full", name: "Full", width: '100px'},
    {id: 3, slug: "add", name: "Add", width: '100px'},
    {id: 4, slug: "edit", name: "Edit", width: '100px'},
    {id: 5, slug: "del", name: "Del", width: '100px'},
    {id: 6, slug: "view", name: "View", width: '100px'},
    {id: 7, slug: "print", name: "Print", width: '100px'},
    {id: 8, slug: "approval", name: "Approval", width: '100px'},
    {id: 10, slug: "pdf", name: "Pdf", width: '100px'},
    {id: 11, slug: "excel", name: "Excel", width: '100px'},
    {id: 12, slug: "translate", name: "Translate", width: '100px'}
   ]

   const dataListPermissions = [
    {screen_name: "SCADA", full: "", add: "", edit: "", del: "", view: "", print: "", approval: "", pdf: "", excel: "", translate: ""},
    {screen_name: "RS485", full: "", add: "", edit: "", del: "", view: "", print: "", approval: "", pdf: "", excel: "", translate: ""},
    {screen_name: "Devices", full: "", add: "", edit: "", del: "", view: "", print: "", approval: "", pdf: "", excel: "", translate: ""},
    {screen_name: "Templates", full: "", add: "", edit: "", del: "", view: "", print: "", approval: "", pdf: "", excel: "", translate: ""},
    {screen_name: "ModHoppers", full: "", add: "", edit: "", del: "", view: "", print: "", approval: "", pdf: "", excel: "", translate: ""},
    {screen_name: "Data", full: "", add: "", edit: "", del: "", view: "", print: "", approval: "", pdf: "", excel: "", translate: ""},
    {screen_name: "Uploads", full: "", add: "", edit: "", del: "", view: "", print: "", approval: "", pdf: "", excel: "", translate: ""},
    {screen_name: "Alarms", full: "", add: "", edit: "", del: "", view: "", print: "", approval: "", pdf: "", excel: "", translate: ""},
    {screen_name: "Networking", full: "", add: "", edit: "", del: "", view: "", print: "", approval: "", pdf: "", excel: "", translate: ""},
    {screen_name: "Users", full: "", add: "", edit: "", del: "", view: "", print: "", approval: "", pdf: "", excel: "", translate: ""},
    {screen_name: "Permissions & Roles", full: "", add: "", edit: "", del: "", view: "", print: "", approval: "", pdf: "", excel: "", translate: ""},
    {screen_name: "System", full: "", add: "", edit: "", del: "", view: "", print: "", approval: "", pdf: "", excel: "", translate: ""},
    {screen_name: "Diagnostics", full: "", add: "", edit: "", del: "", view: "", print: "", approval: "", pdf: "", excel: "", translate: ""},
    {screen_name: "Online Guild", full: "", add: "", edit: "", del: "", view: "", print: "", approval: "", pdf: "", excel: "", translate: ""},
  ]

  return (
    <div className="main">
      {isAddRoles && <AddRoles  closeAddRoles={closeAddRoles} />}
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
        <div className={styles.right_header}>
            <div className={styles.button}>
              <div className={styles.export}>
                <ExportIcon />
                <span>Export</span>
              </div>
        
              <div className={styles.add}>
                <AddIcon />
              </div>
            </div>
        </div>
        
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
                  data={dataListRoles}

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
                        />
                        <Button.Image
                            image={<DeleteIcon />}
                            className="mx-2"
                        />
                    </div>
                  )}
                />
              </div>
            </div>
          </div>

          <div className='col-xl-8 col-lg-8 col-md-8 col-8'>
          <div className={styles.permissions}>
              <div className={styles.permissions_header}>
                  <div className={styles.permissions_title}>
                      Permissions
                  </div>
                  <div className={styles.save_permissions}>
                        Save
                  </div>
              </div>
              <div className={styles.table_permissions}>
                <Table
                  columns={columnsPermissions}
                  data={dataListPermissions}

                  status={item => (
                    <div >
                        <Button.Image
                            image={<StatusIcon />}
                        />
                    </div>
                  )}
                  
                  full={item => (
                    <div className="d-flex flex-wrap justify-content-center">
                      <RCheckbox
                          inputId="full"
                          inputName="full"
                          labelClass="no-label"
                          checked={1}
                      />
                    </div>
                  )}
                  add={item => (
                    <div className="d-flex flex-wrap justify-content-center">
                      <RCheckbox
                          inputId="add"
                          inputName="add"
                          labelClass="no-label"
                          checked={1}
                      />
                    </div>
                  )}
                  edit={item => (
                    <div className="d-flex flex-wrap justify-content-center">
                      <RCheckbox
                          inputId="edit"
                          inputName="edit"
                          labelClass="no-label"
                          checked={1}
                      />
                    </div>
                  )}
                  del={item => (
                    <div className="d-flex flex-wrap justify-content-center">
                      <RCheckbox
                          inputId="del"
                          inputName="del"
                          labelClass="no-label"
                          checked={1}
                      />
                    </div>
                  )}
                  view={item => (
                    <div className="d-flex flex-wrap justify-content-center">
                      <RCheckbox
                          inputId="view"
                          inputName="view"
                          labelClass="no-label"
                          checked={1}
                      />
                    </div>
                  )}
                  print={item => (
                    <div className="d-flex flex-wrap justify-content-center">
                      <RCheckbox
                          inputId="print"
                          inputName="print"
                          labelClass="no-label"
                          checked={1}
                      />
                    </div>
                  )}
                  approval={item => (
                    <div className="d-flex flex-wrap justify-content-center">
                      <RCheckbox
                          inputId="approval"
                          inputName="approval"
                          labelClass="no-label"
                          checked={1}
                      />
                    </div>
                  )}
                  pdf={item => (
                    <div className="d-flex flex-wrap justify-content-center">
                      <RCheckbox
                          inputId="pdf"
                          inputName="pdf"
                          labelClass="no-label"
                          checked={1}
                      />
                    </div>
                  )}
                  excel={item => (
                    <div className="d-flex flex-wrap justify-content-center">
                      <RCheckbox
                          inputId="excel"
                          inputName="excel"
                          labelClass="no-label"
                          checked={1}
                      />
                    </div>
                  )}
                  translate={item => (
                    <div className="d-flex flex-wrap justify-content-center">
                      <RCheckbox
                          inputId="translate"
                          inputName="translate"
                          labelClass="no-label"
                          checked={1}
                      />
                    </div>
                  )}
                />
                
              </div>
            </div>
          </div>
      </div>
    </div>
  );
};