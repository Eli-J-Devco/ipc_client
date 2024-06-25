/********************************************************
 * Copyright 2020-2021 NEXT WAVE ENERGY MONITORING INC.
 * All rights reserved.
 *
 *********************************************************/
import React from "react";
import styles from "./Devices.module.scss";
import Table from "../../../../components/table/Table";
import AddDevice from "./addDevice/AddDevice";

import Button from "../../../../components/button/Button";
import useDevices from "./useDevices";
import ConfigDevice from "./configDevice/ConfigPoints";
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
    columns,
    rowSelection,
    isRetry,
    setIsRetry,
    setRowSelection,
    openAddDevice,
    closeAddDevice,
    deleteDevices,
    setIsDeleteDevice,
    closeUpdateDevice,
    retryCreateDevice,
  } = useDevices();

  const { total, offset, setOffset, setLimit } = useDeviceManagement();
  const { name } = useParams();

  return (
    <div className={`main ${styles.main_devices}`}>
      {isAddDevice && <AddDevice closeAddDevice={closeAddDevice} />}
      {isUpdateDevice && (
        <UpdateDevice
          isShow={isUpdateDevice}
          closeUpdateDevice={closeUpdateDevice}
        />
      )}
      {isDeleteDevice && (
        <Modal
          title="Delete Devices"
          isOpen={isDeleteDevice}
          close={() => setIsDeleteDevice(false)}
          footer={
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
                  deleteDevices();
                }}
              >
                <Button.Text text="Delete" />
              </Button>
            </>
          }
        >
          Are you sure you want to delete the selected devices?
        </Modal>
      )}
      {isRetry.isOpen && (
        <Modal
          title="Create Again"
          isOpen={isRetry.isOpen}
          close={() => setIsRetry({ isOpen: false, device: null })}
          footer={
            <>
              <Button
                variant="white"
                onClick={() => {
                  setIsRetry({ isOpen: false, device: null });
                }}
              >
                <Button.Text text="Cancel" />
              </Button>
              <Button
                variant="dark"
                onClick={() => {
                  retryCreateDevice();
                }}
              >
                <Button.Text text="Retry" />
              </Button>
            </>
          }
        >
          Are you sure you want to retry creating the device?
        </Modal>
      )}
      {name ? (
        <ConfigDevice />
      ) : (
        <div>
          <div className="mb-2">
            <Button variant="dark" onClick={openAddDevice}>
              <Button.Text text="Add Device" />
            </Button>
            {Object.keys(rowSelection).length > 0 && (
              <Button
                className="ms-3"
                variant="dark"
                onClick={() => {
                  setIsDeleteDevice(true);
                }}
              >
                <Button.Text text="Delete Device" />
              </Button>
            )}
            {isRetry.canRetry && (
              <Button
                className="ms-3"
                variant="dark"
                onClick={() => setIsRetry({ ...isRetry, isOpen: true })}
              >
                <Button.Text text="Retry" />
              </Button>
            )}
          </div>
          <Table
            columns={{ columnDefs: columns }}
            data={dataDevices}
            selectRow={{
              enable: false,
              rowSelection: rowSelection,
              setRowSelection: setRowSelection,
            }}
            control={true}
            pagination={{
              enable: true,
              total: total,
              offset: offset,
              setLimit: setLimit,
              setOffset: setOffset,
            }}
          />
        </div>
      )}
    </div>
  );
}
