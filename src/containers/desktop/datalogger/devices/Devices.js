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
import useDevices from './useDevices';
import { useParams } from "react-router-dom";
import ConfigDevice from './configDevice/ConfigDevice';


export default function Devices() {
  const { isAddDevice, openAddDevice, closeAddDevice, handleConfigDevice } = useDevices();
  const { id } = useParams();
  
  const data = [
    {id: 1, serial_number: 1, port: '192.168.1.20.502 @001', status: 'Ok', name_and_purpose: 'SolarEdge SE42.2KUS 1 INV', type: 'SolarEdge 3 Phase Inverter', points: 37},
    {id: 2, serial_number: 2, port: '192.168.1.20.502 @001', status: 'Ok', name_and_purpose: 'SolarEdge SE42.2KUS 2 INV', type: 'SolarEdge 3 Phase Inverter', points: 37},
    {id: 3, serial_number: 3, port: '192.168.1.20.502 @001', status: 'Ok', name_and_purpose: 'SolarEdge SE42.2KUS 3 INV', type: 'SolarEdge 3 Phase Inverter', points: 37},
    {id: 4, serial_number: 4, port: '192.168.1.20.502 @001', status: 'Ok', name_and_purpose: 'SolarEdge SE42.2KUS 4 INV', type: 'SolarEdge 3 Phase Inverter', points: 37},
    {id: 5, serial_number: 5, port: '192.168.1.20.502 @001', status: 'Ok', name_and_purpose: 'SolarEdge SE42.2KUS 5 INV', type: 'SolarEdge 3 Phase Inverter', points: 37},
    {id: 6, serial_number: 6, port: '192.168.1.20.502 @001', status: 'Ok', name_and_purpose: 'SolarEdge SE42.2KUS 6 INV', type: 'SolarEdge 3 Phase Inverter', points: 37},
    {id: 7, serial_number: 7, port: '192.168.1.20.502 @001', status: 'Ok', name_and_purpose: 'SolarEdge SE42.2KUS 7 INV', type: 'SolarEdge 3 Phase Inverter', points: 37},
    {id: 8, serial_number: 8, port: '192.168.1.20.502 @001', status: 'Ok', name_and_purpose: 'SolarEdge SE42.2KUS 8 INV', type: 'SolarEdge 3 Phase Inverter', points: 37},
    {id: 9, serial_number: 9, port: '192.168.1.20.502 @001', status: 'Ok', name_and_purpose: 'SolarEdge SE42.2KUS 9 INV', type: 'SolarEdge 3 Phase Inverter', points: 37},
    {id: 10, serial_number: 10, port: '192.168.1.20.502 @001', status: 'Ok', name_and_purpose: 'SolarEdge SE42.2KUS INV', type: 'SolarEdge 3 Phase Inverter', points: 37}
  ]
  const columns = [
    {id: 1, slug: "serial_number", name: "Serial Number", width: 100},
    {id: 2, slug: "port", name: "Port", width: 300},
    {id: 3, slug: "status", name: "Status", width: 100},
    {id: 4, slug: "name_and_purpose", name: "Name and Purpose", width: 400},
    {id: 5, slug: "type", name: "Type", width: 300},
    {id: 6, slug: "points", name: "Points", width: 100},
    {id: 7, slug: "actions", name: "Actions", width: 150}
  ]

  let device = data.filter((d) => {
    if(d.id === parseInt(id)) {
      return d;
    } 
  })
  if(device.length === 0) device.push({id: 1, serial_number: 1, port: '192.168.1.20.502 @001', status: 'Ok', name_and_purpose: 'SolarEdge SE42.2KUS 1 INV', type: 'SolarEdge 3 Phase Inverter', points: 37})


  return (
    <div className={styles.main_devices}>
      {isAddDevice && <AddDevice  closeAddDevice={closeAddDevice} />}
      <div className={styles.header_devices}>
        <div className='row'>
          <div className='col-xl-6 col-lg-6 col-md-6 col-6'>
            <div className={styles.title}>
              Dashboard &gt; Devices {id ? `> ${id} ${device[0].name_and_purpose}` : ''}
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

              { id ? <div className={styles.export}>
                        <span>Configure</span>
                      </div>
                    : <div className={styles.add} onClick={() => openAddDevice()}>
                    <AddIcon />
                  </div>}
            </div>
          </div>
        </div>
      </div>
      {
        id ? <ConfigDevice device={device}/> 
        : <Table columns={columns} data={data}
        actions={item => (
          <div className="d-flex flex-wrap justify-content-center">
              <Button.Image
                  image={<ViewIcon />}
                  onClick={() => handleConfigDevice(item)}
                  className="mx-2"
              />
              <Button.Image
                  image={<EditIcon />}
                  onClick={() => handleConfigDevice(item)}
                  className="mx-2"
              />
              <Button.Image
                  image={<DeleteIcon />}
                  onClick={() => handleConfigDevice(item)}
                  className="mx-2"
              />
          </div>
      )}
      />
      }
      

      <div className={styles.pagging_devices}>

      </div>
    </div>
  );
};