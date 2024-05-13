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
import ConfigDevice from './configDevice/ConfigDevice';
import _ from "lodash";
import { TreeProvider } from "../../../../components/treeView/useTree";

export default function Devices() {
  const {
    isAddDevice,
    openAddDevice,
    closeAddDevice,
    dataDevices,
    setAllDevices,
    deviceConfig,
    columns,
    selectedDevice,
    setSelectedDevice,
    deleteDevices,
  } = useDevices();

  const [rowSelection, setRowSelection] = useState([]);

  return (
    <div className={`main ${styles.main_devices}`}>
      {isAddDevice &&
        <TreeProvider>
          <AddDevice closeAddDevice={closeAddDevice} deviceConfig={deviceConfig} setdataDevices={setAllDevices} />
        </TreeProvider>
      }
      {
        selectedDevice?.id ? <ConfigDevice device={selectedDevice} setDevice={setSelectedDevice} /> :
          <>
            <Table
              columns={{ columnDefs: columns }}
              data={dataDevices}
              selectRow={{
                enable: false,
                rowSelection: rowSelection,
                setRowSelection: setRowSelection
              }}
            />
            <Button
              className="mt-3"
              variant="dark"
              onClick={openAddDevice}
            >
              <Button.Text text="Add Device" />
            </Button>
            {
              Object.keys(rowSelection).length > 0 &&
              <Button
                className="mt-3 ms-3"
                variant="dark"
                onClick={() => {
                  let ids = [];
                  Object.keys(rowSelection).forEach((key) => {
                    if (rowSelection[key]) ids.push(dataDevices[key].id);
                  });
                  deleteDevices(ids);
                  setRowSelection([]);
                }}
              >
                <Button.Text text="Delete Device" />
              </Button>
            }
          </>
      }

    </div>
  );
};