/********************************************************
* Copyright 2020-2021 NEXT WAVE ENERGY MONITORING INC.
* All rights reserved.
* 
*********************************************************/
import React from 'react';
import Breadcrumb from "../../../../components/breadCrumb/BreadCrumb";
import styles from './Users.module.scss';
import Table from '../../../../components/table/Table';
import { ReactComponent as EditIcon } from "../../../../assets/images/edit.svg";
import { ReactComponent as DeleteIcon } from "../../../../assets/images/delete.svg";
import { ReactComponent as StatusIcon } from "../../../../assets/images/status-circle.svg";
import { ReactComponent as ExportIcon } from "../../../../assets/images/export.svg";
import { ReactComponent as AddIcon } from "../../../../assets/images/add.svg";
import Button from '../../../../components/button/Button';
import FormInput from "../../../../components/formInput/FormInput";
import useUsers from './useUsers';



export default function Users() {
  const { columns, total, setLimit, setOffset  } = useUsers();

  const dataList = [
    {id: "1", full_name: "Long Pham", email: "lpham@phoenixrs.com", phone: "0966660127", roles: "Admin", status: "1", action: ""},
    {id: "2", full_name: "Long Pham", email: "lpham@phoenixrs.com", phone: "0966660127", roles: "Admin", status: "1", action: ""},
    {id: "3", full_name: "Long Pham", email: "lpham@phoenixrs.com", phone: "0966660127", roles: "Admin", status: "1", action: ""},
    {id: "4", full_name: "Long Pham", email: "lpham@phoenixrs.com", phone: "0966660127", roles: "Admin", status: "1", action: ""},
    {id: "5", full_name: "Long Pham", email: "lpham@phoenixrs.com", phone: "0966660127", roles: "Admin", status: "1", action: ""},
    {id: "6", full_name: "Long Pham", email: "lpham@phoenixrs.com", phone: "0966660127", roles: "Admin", status: "1", action: ""},
    {id: "7", full_name: "Long Pham", email: "lpham@phoenixrs.com", phone: "0966660127", roles: "Admin", status: "1", action: ""},
    {id: "8", full_name: "Long Pham", email: "lpham@phoenixrs.com", phone: "0966660127", roles: "Admin", status: "1", action: ""},
    {id: "9", full_name: "Long Pham", email: "lpham@phoenixrs.com", phone: "0966660127", roles: "Admin", status: "1", action: ""},
    {id: "10", full_name: "Long Pham", email: "lpham@phoenixrs.com", phone: "0966660127", roles: "Admin", status: "1", action: ""},
    {id: "11", full_name: "Long Pham", email: "lpham@phoenixrs.com", phone: "0966660127", roles: "Admin", status: "1", action: ""},
    {id: "12", full_name: "Long Pham", email: "lpham@phoenixrs.com", phone: "0966660127", roles: "Admin", status: "1", action: ""},
    {id: "13", full_name: "Long Pham", email: "lpham@phoenixrs.com", phone: "0966660127", roles: "Admin", status: "1", action: ""},
    {id: "14", full_name: "Long Pham", email: "lpham@phoenixrs.com", phone: "0966660127", roles: "Admin", status: "1", action: ""},
    {id: "15", full_name: "Long Pham", email: "lpham@phoenixrs.com", phone: "0966660127", roles: "Admin", status: "1", action: ""},
  ]

  return (
    <div className="main">
      <div className={styles.header}>
        <Breadcrumb
          routes={[
              {
                  path: "/datalogger",
                  name: "Dashboard"
              },
              {
                  path: "/datalogger/users",
                  name: "Users"
              }
          ]}    
        />
        <div className={styles.right_header}>
          <div>
            <FormInput.Text
                className={styles.search}
                placeholder="Keyword..."
            />
          </div>
          <div>
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
        
      </div>

      <div className={styles.body}>
        <Table
            columns={columns}
            data={dataList}

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

            pagination={{
              enable: true,
              total: total,
              setLimit: setLimit,
              setOffset: setOffset
          }}
            // alert={item => <RedWarningIcon/>}
            />
      </div>
    </div>
  );
};