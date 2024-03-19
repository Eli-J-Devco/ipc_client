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
import { loginService } from '../../../../services/loginService';
import LibToast from '../../../../utils/LibToast';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

export default function Users() {
  const { t } = useTranslation();

  const { columns, total, limit, offset, setLimit, setOffset, setTotal } = useUsers();
  const axiosPrivate = useAxiosPrivate();

  const [isDelete, setIsDelete] = useState(false);
  const [dataList, setDataList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    var output = document.getElementById("progress");
    output.innerHTML = "<div><img src='/loading.gif' /></div>";
    setTimeout(async () => {
      try {
        const response = await axiosPrivate.post(Constants.API_URL.USERS.LIST + `?page=${offset}&limit=${limit}`);

        if (response?.status === 204) {
          throw response;
        }

        setTotal(response.data?.total);

        let insertData = response.data?.data && response.data?.data?.map((item, index) => {
          return {
            id: item?.id,
            full_name: item?.first_name + " " + item?.last_name,
            email: item?.email,
            phone: item?.phone,
            roles: item?.role.map(role => role.name).join(", "),
            status: item?.status ? 1 : 0,
            actions: ""
          }
        });

        setDataList(insertData);
      } catch (error) {
        if (error?.status === 204) {
          setOffset(offset - limit);
          return;
        }

        let msg = loginService.handleMissingInfo(error);
        if (typeof msg === 'string') {
          LibToast.toast(msg, 'error');
        }
        else if (!msg) {
          LibToast.toast(t('toastMessage.error.fetch'), 'error');
        }
        else {
          navigate("/");
        }
      } finally {
        setIsDelete(false);
        output.innerHTML = "";
      }
    }, 100);
  }, [offset, limit, isDelete]);

  const handleDelete = (id) => {
    setTimeout(async () => {
      try {
        const response = await axiosPrivate.post(Constants.API_URL.USERS.DELETE, {
          id: id
        });
        if (response?.status === 200) {
          setIsDelete(true);
          setTotal(total - 1);
          LibToast.toast(`User with id: ${id} ${t('toastMessage.info.delete')}`, 'info');
        }
      } catch (error) {
        let msg = loginService.handleMissingInfo(error);
        if (typeof msg === 'string') {
          LibToast.toast(msg, 'error');
        }
        else if (!msg) {
          LibToast.toast(t('toastMessage.error.delete'), 'error');
        }
        else {
          navigate("/");
        }
      }
    }, 300);
  }

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
                onClick={() => handleDelete(item?.id)}
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