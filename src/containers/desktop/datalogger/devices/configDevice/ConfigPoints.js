/********************************************************
* Copyright 2020-2021 NEXT WAVE ENERGY MONITORING INC.
* All rights reserved.
* 
*********************************************************/

import React, { useEffect, useState } from 'react'
import styles from './ConfigDevice.module.scss';
import Table from '../../../../../components/table/Table';
import Button from '../../../../../components/button/Button';
import useConfigPoints from './useConfigPoints';
import { useDeviceManagement } from '../DeviceManagement';
import FormInput from '../../../../../components/formInput/FormInput';
import ConfirmModal from './ConfirmModal';
import LibToast from '../../../../../utils/LibToast';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import ConfigEachPoint from './ConfigEachPoint';

export default function ConfigPoints() {
  const {
    points,
    point,
    template,
    columns,
    rowSelection,
    initialValues,
    schema,
    setRowSelection,
    setPoints,
    handleSave
  } = useConfigPoints();

  const { device, setDevice } = useDeviceManagement();
  const [showModal, setShowModal] = useState(false);
  const [action, setAction] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (Object.keys(rowSelection).length === 0) return;

    let someDisabled = Object.keys(rowSelection).some(key => {
      return points[parseInt(key)]?.status === false;
    });

    let someEnabled = Object.keys(rowSelection).some(key => {
      return points[parseInt(key)]?.status === true;
    });

    if (someDisabled && someEnabled) {
      setRowSelection({});
      setAction(null);
      LibToast.toast("Please select points with the same status", "error");
      return;
    }

    if (someDisabled) {
      setAction("Enable");
      return;
    }

    if (someEnabled) {
      setAction("Disable");
      return;
    }

    setAction(null);
  }, [rowSelection]);

  return (

    <>
      {
        showModal &&
        <ConfirmModal
          show={showModal}
          setShow={setShowModal}
          onConfirm={(data) => {
            setPoints(data)
            setRowSelection({})
            setAction(null)
          }}
          template={template.id}
          device={device?.id}
          selectedPoints={Object.keys(rowSelection).map(key => {
            return points[parseInt(key)]?.id
          })}
          action={action}
        />
      }
      <div className={styles.main_config_device}>
        <div className={styles.detail_device}>
          <div>Device Address: <span className={styles.detail}>{device?.id}</span> mapped to real bus-addr <span className={styles.detail}>{device?.rtu_bus_address}</span> on gateway <span className={styles.detail}>{`${device?.tcp_gateway_ip}@${device?.tcp_gateway_port}`}</span></div>
          <div>
            Device type:
            <span className={styles.detail}> {device?.driver_type} </span>
            {
              template?.type === 1 &&
              <span
                className={styles.edit}
                onClick={() => navigate(`/datalogger/templates/${template.id}/points`, { state: { from: location.pathname } })}
              >
                (edit)
              </span>
            }
          </div>
          <div
          >
            Status:&nbsp;
            <span className={device?.status.toUpperCase() === "ONLINE" ? styles.detail : "status_error"}>
              {
                device?.status.toUpperCase() === "ONLINE" ?
                  device?.status.toUpperCase() :
                  device?.message
              }
            </span>
          </div>
        </div>
        {
          id ? <ConfigEachPoint point={point} setPoints={setPoints} /> :
            points.length > 0 &&
            <FormInput
              initialValues={initialValues}
              validationSchema={schema}
              id="configDevice"
              onSubmit={handleSave}
            >
              <Table
                columns={{ columnDefs: columns }}
                data={points}
                maxHeight={'400px'}
                selectRow={{
                  enable: false,
                  rowSelection: rowSelection,
                  setRowSelection: setRowSelection
                }}
              />
              <div className='mt-3'>
                <Button variant="dark" type="submit" formId="configDevice">
                  <Button.Text text="Save" />
                </Button>
                {
                  action &&
                  <Button variant="dark" className='ms-3' onClick={() => setShowModal(true)}>
                    <Button.Text text={action} />
                  </Button>
                }
                <Button variant="grey" className='ms-3' onClick={() => setDevice(null)}>
                  <Button.Text text="Cancel" />
                </Button>
              </div>
            </FormInput>
        }

      </div>
    </>
  )
}
