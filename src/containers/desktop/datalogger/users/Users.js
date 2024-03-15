/********************************************************
* Copyright 2020-2021 NEXT WAVE ENERGY MONITORING INC.
* All rights reserved.
* 
*********************************************************/
import React, { useEffect, useState } from 'react';
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
import useAxiosPrivate from '../../../../hooks/useAxiosPrivate';
import Constants from '../../../../utils/Constants';
import _ from 'lodash';


export default function Users() {
  const { columns, total, limit, offset, setLimit, setOffset, setTotal } = useUsers();
  const axiosPrivate = useAxiosPrivate();
  const [dataList, setDataList] = useState([]);
  useEffect(() => {
    setTimeout(async () => {
      const response = await axiosPrivate.post(Constants.API_URL.USERS.LIST + `?page=${offset}&limit=${limit}`);
      setTotal(response.data?.length);
      let insertData = response.data.map((item, index) => {
        return {
          id: item.id,
          full_name: item.first_name + " " + item.last_name,
          email: item.email,
          phone: item.phone,
          roles: item.role[0].name,
          status: item.status ? 1 : 0,
          actions: ""
        }
      });
      if (_.findIndex(dataList, { page: offset, limit: limit }) === -1) {
        setDataList([...dataList, { page: offset, limit: limit, data: insertData }]);
      }
      console.log(dataList[offset]?.data);
    }, 100);
  }, []);

  return dataList.length > 0 && (
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
          data={dataList[offset]?.data}

          status={item => (
            <div >
              <Button.Image
                image={<StatusIcon />}
              />
            </div>
          )}
          control={true}
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
        />
      </div>
    </div>
  );
};