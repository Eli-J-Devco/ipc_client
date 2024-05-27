/********************************************************
* Copyright 2020-2021 NEXT WAVE ENERGY MONITORING INC.
* All rights reserved.
* 
*********************************************************/
import React, { useState } from "react";
import styles from './Devices.module.scss';
import Table from '../../../../components/table/Table';
import AddDevice from './addDevice/AddDevice';

import Button from '../../../../components/button/Button';
import useDevices from './useDevices';
import ConfigDevice from './configDevice/ConfigPoints';
import _ from "lodash";
import { TreeProvider } from "../../../../components/treeView/useTree";
import { useParams } from "react-router-dom";
import Modal from "../../../../components/modal/Modal";
import UpdateDevice from "./updateDevice/UpdateDevice";
import { useDeviceManagement } from "./DeviceManagement";

export default function Devices() {
  const {
    isAddDevice,
    isUpdateDevice,
    isDeleteDevice,
    dataDevices,
    deviceConfig,
    columns,
    openAddDevice,
    closeAddDevice,
    deleteDevices,
    setIsDeleteDevice,
    closeUpdateDevice,
  } = useDevices();

  const { total, offset, setOffset, setLimit } = useDeviceManagement();

  const [rowSelection, setRowSelection] = useState([]);
  const { name } = useParams();


  return (
    <div className={`main ${styles.main_devices}`}>
      {isAddDevice &&
        <AddDevice closeAddDevice={closeAddDevice} deviceConfig={deviceConfig} />
      }
      {
        isUpdateDevice &&
        <UpdateDevice isShow={isUpdateDevice} closeUpdateDevice={closeUpdateDevice} />
      }
      {
        isDeleteDevice &&
        <Modal
          title="Delete Devices"
          isOpen={isDeleteDevice}
          close={() => setIsDeleteDevice(false)}
          footer={(
            <>
              <Button
                variant="white"
                onClick={() => {
                  setIsDeleteDevice(false);
                }}
              >
                <Button.Text text="Cancel" />
              </Button>
              <Button
                variant="dark"
                onClick={() => {
                  let ids = [];
                  Object.keys(rowSelection).forEach((key) => {
                    if (rowSelection[key]) ids.push(dataDevices[key].id);
                  });
                  deleteDevices(ids);
                  setRowSelection([]);
                  setIsDeleteDevice(false);
                }}
              >
                <Button.Text text="Delete" />
              </Button>
            </>
          )}
        >
          Are you sure you want to delete the selected devices?
        </Modal>
      }
      {
        name ? <ConfigDevice /> :
          <div>
            <div className="mb-2">
              <Button
                variant="dark"
                onClick={openAddDevice}
              >
                <Button.Text text="Add Device" />
              </Button>
              {
                Object.keys(rowSelection).length > 0 &&
                <Button
                  className="ms-3"
                  variant="dark"
                  onClick={() => {
                    setIsDeleteDevice(true);
                  }}
                >
                  <Button.Text text="Delete Device" />
                </Button>
              }
            </div>
            <Table
              columns={{ columnDefs: columns }}
              data={dataDevices}
              selectRow={{
                enable: false,
                rowSelection: rowSelection,
                setRowSelection: setRowSelection
              }}
              control={true}
              pagination={{
                enable: true,
                total: total,
                offset: offset,
                setLimit: setLimit,
                setOffset: setOffset
              }}
            />
          </div>
      }

    </div>
  );
};