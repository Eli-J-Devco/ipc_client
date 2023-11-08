/********************************************************
* Copyright 2020-2021 NEXT WAVE ENERGY MONITORING INC.
* All rights reserved.
* 
*********************************************************/
import React from 'react';
import styles from './Devices.module.scss';
import Table from '../../../../components/table/Table';
import AddDevice from './addDevice/AddDevice';
import { ReactComponent as EditIcon } from "../../../../assets/images/edit.svg";
import { ReactComponent as DeleteIcon } from "../../../../assets/images/delete.svg";
import { ReactComponent as ViewIcon } from "../../../../assets/images/eye_view.svg";
import { ReactComponent as ExportIcon } from "../../../../assets/images/export.svg";
import { ReactComponent as AddIcon } from "../../../../assets/images/add.svg";
import Button from '../../../../components/button/Button';


export default function Devices() {
  const { isAddDevice} = this.state

  const data = [
    {id: 1, serial_number: 1, port: '192.168.1.20.502 @001', status: 'Ok', name_and_purpose: 'SolarEdge SE42.2KUS INV', type: 'SolarEdge 3 Phase Inverter', points: 37},
    {id: 2, serial_number: 2, port: '192.168.1.20.502 @001', status: 'Ok', name_and_purpose: 'SolarEdge SE42.2KUS INV', type: 'SolarEdge 3 Phase Inverter', points: 37},
    {id: 3, serial_number: 3, port: '192.168.1.20.502 @001', status: 'Ok', name_and_purpose: 'SolarEdge SE42.2KUS INV', type: 'SolarEdge 3 Phase Inverter', points: 37},
    {id: 4, serial_number: 4, port: '192.168.1.20.502 @001', status: 'Ok', name_and_purpose: 'SolarEdge SE42.2KUS INV', type: 'SolarEdge 3 Phase Inverter', points: 37},
    {id: 5, serial_number: 5, port: '192.168.1.20.502 @001', status: 'Ok', name_and_purpose: 'SolarEdge SE42.2KUS INV', type: 'SolarEdge 3 Phase Inverter', points: 37},
    {id: 6, serial_number: 6, port: '192.168.1.20.502 @001', status: 'Ok', name_and_purpose: 'SolarEdge SE42.2KUS INV', type: 'SolarEdge 3 Phase Inverter', points: 37},
    {id: 7, serial_number: 7, port: '192.168.1.20.502 @001', status: 'Ok', name_and_purpose: 'SolarEdge SE42.2KUS INV', type: 'SolarEdge 3 Phase Inverter', points: 37},
    {id: 8, serial_number: 8, port: '192.168.1.20.502 @001', status: 'Ok', name_and_purpose: 'SolarEdge SE42.2KUS INV', type: 'SolarEdge 3 Phase Inverter', points: 37},
    {id: 9, serial_number: 9, port: '192.168.1.20.502 @001', status: 'Ok', name_and_purpose: 'SolarEdge SE42.2KUS INV', type: 'SolarEdge 3 Phase Inverter', points: 37},
    {id: 10, serial_number: 10, port: '192.168.1.20.502 @001', status: 'Ok', name_and_purpose: 'SolarEdge SE42.2KUS INV', type: 'SolarEdge 3 Phase Inverter', points: 37}
  ]
  const columns = [
    {id: 1, slug: "serial_number", name: "Serial Number"},
    {id: 2, slug: "port", name: "Port"},
    {id: 3, slug: "status", name: "Status"},
    {id: 4, slug: "name_and_purpose", name: "Name and Purpose"},
    {id: 5, slug: "type", name: "Type"},
    {id: 6, slug: "points", name: "Points"},
    {id: 7, slug: "actions", name: "Actions"}
  ]

  return (
    <div className={styles.main_devices}>
      {isAddDevice && <AddDevice  closeAddDevice={this.closeAddDevice.bind(this)} />}
      <div className={styles.header_devices}>
        <div className='row'>
          <div className='col-xl-6 col-lg-6 col-md-6 col-6'>
            <div className={styles.title}>
              Dashboard &gt; Devices
            </div>
          </div>
          <div className='col-xl-6 col-lg-6 col-md-6 col-6'>
            <div className={styles.button}>
              <div className={styles.export}>
                <ExportIcon />
                <span>Export XML</span>
              </div>

              <div className={styles.export}>
                <ExportIcon />
                <span>Export CSV</span>
              </div>

              <div className={styles.add} onClick={this.openAddDevice.bind(this)}>
                <AddIcon />
              </div>
            </div>
          </div>
        </div>
      </div>

      <Table columns={columns} data={data} maxWidth={'100%'}
        actions={item => (
          <div className="d-flex flex-wrap justify-content-center">
              <Button.Image
                  image={<ViewIcon />}
                  // onClick={() => handleOnItemEdit(item)}
                  className="mx-2"
              />
              <Button.Image
                  image={<EditIcon />}
                  // onClick={() => handleOnItemEdit(item)}
                  className="mx-2"
              />
              <Button.Image
                  image={<DeleteIcon />}
                  // onClick={() => handleOnItemEdit(item)}
                  className="mx-2"
              />
          </div>
      )}
      />

      <div className={styles.pagging_devices}>

      </div>
    </div>
  );
};