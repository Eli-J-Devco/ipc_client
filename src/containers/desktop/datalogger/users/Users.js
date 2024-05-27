/********************************************************
* Copyright 2020-2021 NEXT WAVE ENERGY MONITORING INC.
* All rights reserved.
* 
*********************************************************/
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Users.module.scss';

import useAxiosPrivate from '../../../../hooks/useAxiosPrivate';
import useUserModal from './useUserModal';
import UserModal from './UserModal/UserModal';
import useUsers from './useUsers';

import Breadcrumb from "../../../../components/breadCrumb/BreadCrumb";
import Table from '../../../../components/table/Table';
import Button from '../../../../components/button/Button';
import FormInput from "../../../../components/formInput/FormInput";

import { ReactComponent as EditIcon } from "../../../../assets/images/edit.svg";
import { ReactComponent as DeleteIcon } from "../../../../assets/images/delete.svg";
import { ReactComponent as StatusIcon } from "../../../../assets/images/status-circle.svg";
import { ReactComponent as ResetPassword } from "../../../../assets/images/reset-password.svg";
import { ReactComponent as AddIcon } from "../../../../assets/images/add.svg";

import Constants from '../../../../utils/Constants';
import { loginService } from '../../../../services/loginService';

export default function Users() {
  const { columns, total, limit, offset, setLimit, setOffset, setTotal } = useUsers();
  const { actionOption, isOpenModal, openModal, closeModal } = useUserModal();
  const [statusFilter, setStatusFilter] = useState(undefined); // 1: Active, 0: Inactive
  const axiosPrivate = useAxiosPrivate();

  const [needRefresh, setNeedRefresh] = useState(false);
  const [dataList, setDataList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    var output = document.getElementById("progress");
    output.innerHTML = "<div><img src='/loading.gif' /></div>";
    setTimeout(async () => {
      try {
        const response = await axiosPrivate.post(Constants.API_URL.USERS.LIST + `?page=${offset}&limit=${limit}${statusFilter !== undefined ? `&status=${statusFilter}` : ""}`);

        setTotal(response.data?.total);

        let insertData = response.data?.data && response.data?.data?.map((item, index) => {
          return {
            id: item?.id,
            full_name: item?.first_name + " " + item?.last_name,
            email: item?.email,
            phone: item?.phone,
            roles: item?.role.map(role => role.name).join(", "),
            roles_id: item?.role.map(role => ({ value: role.id, label: role.name })),
            status: { value: item?.status ? 1 : 0, label: item?.status ? "Active" : "Inactive" },
            actions: ""
          }
        });

        setDataList(insertData);
      } catch (error) {
        loginService.handleMissingInfo(error, "Failed to get users list") && navigate("/", { replace: true });
      } finally {
        needRefresh && setNeedRefresh(false);
        output.innerHTML = "";
      }
    }, 100);
  }, [offset, limit, statusFilter, needRefresh]);

  return (
    <div className="main">
      {isOpenModal && <UserModal isOpenModal={isOpenModal} closeModal={closeModal} setNeedRefresh={setNeedRefresh} />}
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
        <FormInput>
          <div className={styles.right_header}>
            <FormInput.Select
              className='me-3'
              name={"statusFilter"}
              option={[
                { value: 1, label: "Active" },
                { value: 0, label: "Inactive" }
              ]}
              onChange={e => setStatusFilter(e?.value === 1 ? true : e?.value === 0 ? false : undefined)}
              isClearable={true}
              placeholder={"Status"}
            />
            <div className={styles.button} onClick={() => openModal(actionOption.Add.action)}>
              <div className={styles.add}>
                <Button.Image
                  image={<AddIcon />}
                  title="Add new user"
                />
              </div>
            </div>
          </div>
        </FormInput>

      </div>

      <div className={styles.body}>
        <Table
          columns={columns}
          data={dataList}

          status={item => (
            <div >
              {<StatusIcon fill={item?.status?.value ? "#38FF49" : "red"} />}
            </div>
          )}
          control={true}
          actions={item => (
            <div className="d-flex flex-wrap justify-content-center">
              <Button.Image
                image={<EditIcon />}
                className="mx-2"
                title="Edit"
                onClick={() => openModal(actionOption.Update.action, { ...item, first_name: item?.full_name.split(" ")[0], last_name: item?.full_name.split(" ")[1] })}
              />
              <Button.Image
                image={<DeleteIcon />}
                className="mx-2"
                title="Delete"
                onClick={() => openModal(actionOption.ConfirmDelete.action, { email: item?.email, id: item?.id })}
              />
              <Button.Image
                image={<ResetPassword />}
                className="mx-2"
                title="Reset Password"
                onClick={() => openModal(actionOption.ResetPassword.action, { email: item?.email, id: item?.id })}
              />
            </div>
          )}

          pagination={{
            statusFilter: statusFilter,
            enable: true,
            total: total,
            offset: offset,
            setLimit: setLimit,
            setOffset: setOffset
          }}
        />
      </div>
    </div>
  );
};