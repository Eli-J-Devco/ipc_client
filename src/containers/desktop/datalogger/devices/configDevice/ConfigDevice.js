/********************************************************
* Copyright 2020-2021 NEXT WAVE ENERGY MONITORING INC.
* All rights reserved.
* 
*********************************************************/

import React from 'react'
import styles from './ConfigDevice.module.scss';
import Table from '../../../../../components/table/Table';
import Button from '../../../../../components/button/Button';
import useConfigDevice from './useConfigDevice';
import { RText } from '../../../../../components/Controls'



export default function ConfigDevice() {
  const { handleEditAlarm, handleInputChange, curItem } = useConfigDevice();
  

  const columns = [
    {id: 1, slug: "id", name: "#", width: 150},
    {id: 2, slug: "function", name: "Function", width: 500},
    {id: 3, slug: "current_reading", name: "Current Reading", width: 200},
    {id: 4, slug: "low_alarm", name: "Low Alarm", width: 100},
    {id: 5, slug: "high_alarm", name: "High Alarm", width: 100},
    {id: 7, slug: "actions", name: "Actions", width: 250}
  ]
  
  return (
    <div className={styles.main_config_device}>
      <div className={styles.detail_device}>
          <div>Device Address: <span className={styles.detail}>2</span> mapped to real bus-addr <span className={styles.detail}>001</span> on gateway <span className={styles.detail}>192.168.50.41.502</span></div>
          <div>Device type: <span className={styles.detail}>Solar Edge 3 Phase Inverter </span> (edit)</div>
          <div>Status: <span className={styles.detail}>OK</span></div>
      </div>

      <Table columns={columns} data={curItem} maxHeight={'400px'} variant={'config_table'}
        actions={item => (
          <div className="d-flex flex-wrap justify-content-center" onClick={() =>handleEditAlarm(item)}>
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
            value={item}
            onChange={(e) => handleInputChange(e, item) }
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
            value={item}
            onChange={(e) => handleInputChange(e) }
          /> 
        </div>    
      )}
      />

      <div className='mt-5'>
        <Button variant="dark" >
            <Button.Text text="Save" />
        </Button>
        <Button variant="grey" className='ms-3'>
            <Button.Text text="Cancel" />
        </Button>
      </div>
    </div>
    
  )
}
