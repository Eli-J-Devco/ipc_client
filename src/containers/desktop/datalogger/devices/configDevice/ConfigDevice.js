/********************************************************
* Copyright 2020-2021 NEXT WAVE ENERGY MONITORING INC.
* All rights reserved.
* 
*********************************************************/

import React, { useEffect } from 'react'
import styles from './ConfigDevice.module.scss';
import Table from '../../../../../components/table/Table';
import Button from '../../../../../components/button/Button';
import useConfigDevice from './useConfigDevice';
import { RText } from '../../../../../components/Controls'
import { useLocation, useNavigate } from 'react-router-dom';
import useAxiosPrivate from '../../../../../hooks/useAxiosPrivate';
import Constants from '../../../../../utils/Constants';

export default function ConfigDevice({ device }) {
  const { handleEditAlarm, handleInputChange, curItem, setCurItem } = useConfigDevice();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || { pathname: '/datalogger/devices' };
  const columns = [
    { id: 1, slug: "id", name: "#", width: 150 },
    { id: 2, slug: "function", name: "Function", width: 500 },
    { id: 3, slug: "current_reading", name: "Current Reading", width: 200 },
    { id: 4, slug: "low_alarm", name: "Low Alarm", width: 100 },
    { id: 5, slug: "high_alarm", name: "High Alarm", width: 100 },
    { id: 7, slug: "actions", name: "Actions", width: 250 }
  ]

  // useEffect(() => {
  //   setTimeout(async () => {
  //     try {
  //       const response = await axiosPrivate.post(Constants.API_URL.DEVICES.GET_ONE + device.id);
  //       setCurItem(response.data);
  //     } catch (error) {
  //       console.log(error)
  //     }
  //   }, 1000);
  // }, [curItem])

  return (
    <div className={styles.main_config_device}>
      <div className={styles.detail_device}>
        <div>Device Address: <span className={styles.detail}>{device?.id}</span> mapped to real bus-addr <span className={styles.detail}>{device?.rtu_bus_address}</span> on gateway <span className={styles.detail}>{`${device?.tcp_gateway_ip}@${device?.tcp_gateway_port}`}</span></div>
        <div>Device type: <span className={styles.detail}>{device?.device_type_name} </span> (edit)</div>
        <div>Status: <span className={styles.detail}>{device?.status ? "OK" : <span className="status_error">Error</span>}</span></div>
      </div>

      <Table columns={columns} data={curItem} maxHeight={'400px'} variant={'config_table'}
        actions={item => (
          <div className="d-flex flex-wrap justify-content-center" onClick={() => handleEditAlarm(item)}>
            <Button>
              <Button.Text text="Config Points" />
            </Button>
          </div>
        )}
        low_alarm={item => (
          <div className={`d-flex flex-wrap ${styles.alarm}`} >
            <RText
              inputClass="form-control"
              inputId="low_alarm"
              inputName="low_alarm"
              name="low_alarm"
              value={item.low_alarm}
              onChange={(e) => handleInputChange(e, item)}
            />
          </div>
        )}
        high_alarm={item => (
          <div className={`d-flex flex-wrap ${styles.alarm}`} >
            <RText
              inputClass="form-control"
              inputId="high_alarm"
              inputName="high_alarm"
              name="high_alarm"
              value={item.high_alarm}
              onChange={(e) => handleInputChange(e)}
            />
          </div>
        )}
      />

      <div className='mt-5'>
        <Button variant="dark">
          <Button.Text text="Save" />
        </Button>
        <Button variant="grey" className='ms-3' onClick={() => navigate(from, { replace: true })}>
          <Button.Text text="Cancel" />
        </Button>
      </div>
    </div>

  )
}
