/********************************************************
* Copyright 2020-2021 NEXT WAVE ENERGY MONITORING INC.
* All rights reserved.
* 
*********************************************************/
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
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
import { useLocation, useNavigate, useParams } from "react-router-dom";
import ConfigDevice from './configDevice/ConfigDevice';
import Constants from "../../../../utils/Constants";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import _ from "lodash";
import { loginService } from "../../../../services/loginService";
import LibToast from "../../../../utils/LibToast";

export default function Devices() {
  const { t } = useTranslation();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const { isAddDevice, openAddDevice, closeAddDevice, handleConfigDevice } = useDevices();
  const { id } = useParams();
  const [dataDevices, setdataDevices] = useState([]);
  const [deviceConfig, setDeviceConfig] = useState([]);
  const [device, setDevice] = useState([]);

  useEffect(() => {
    if (isAddDevice) return;

    var output = document.getElementById("progress");
    output.innerHTML = "<div><img src='/loading.gif' /></div>";
    setTimeout(async () => {
      try {
        const { data } = await axiosPrivate.post(Constants.API_URL.DEVICES.LIST);
        setdataDevices(data);
        const { data: deviceConfig } = await axiosPrivate.post(Constants.API_URL.DEVICES.CONFIG);
        setDeviceConfig(deviceConfig);
      } catch (error) {
        let msg = loginService.handleMissingInfo(error);
        if (typeof msg === "string") {
          LibToast.toast(msg, "error");
        }
        else {
          if (!loginService.handleMissingInfo(error))
            LibToast.toast(t("toastMessage.error.fetch"), "error");
          else
            navigate("/");
        }
      } finally {
        output.innerHTML = "";
      }
    }, 1000);

  }, [isAddDevice, navigate, t, axiosPrivate]);

  const columns = [
    { id: 1, slug: "id", name: "Serial Number", width: 100 },
    { id: 2, slug: "tcp_gateway_ip", name: "Port", width: 200 },
    { id: 3, slug: "status", name: "Status", width: 100 },
    { id: 4, slug: "name", name: "Name and Purpose", width: 200 },
    { id: 5, slug: "driver_type", name: "Type", width: 200 },
    { id: 6, slug: "actions", name: <div className="text-center">Actions</div>, width: 150 }
  ]

  useEffect(() => {
    if (_.isEmpty(dataDevices) || !id) return;
    setTimeout(() => {
      setDevice(dataDevices.filter((d) => d.id === parseInt(id))[0])
    }, 100);
  }, [dataDevices, id]);

  return (
    <div className={`main ${styles.main_devices}`}>
      {isAddDevice && <AddDevice closeAddDevice={closeAddDevice} deviceConfig={deviceConfig} />}
      <div className={styles.header_devices}>
        <div className='row'>
          <div className='col-xl-6 col-lg-6 col-md-6 col-6'>
            <div className={styles.title}>
              Dashboard &gt; Devices {id ? `> ${id} ${device?.name}` : ''}
            </div>
          </div>
          <div className='col-xl-6 col-lg-6 col-md-6 col-6'>
            <div className={styles.button}>
              {/* <div className={styles.export}>
                <ExportIcon />
                <span>Export XML</span>
              </div>

              <div className={styles.export}>
                <ExportIcon />
                <span>Export CSV</span>
              </div> */}

              {id ? <div className={styles.export}>
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
        id ? <ConfigDevice device={device} />
          : <Table columns={columns} data={dataDevices}
            status={item => (
              <p>{item.status === true ? <span>Ok</span> : <span className="status_error">Error</span>}</p>
            )}
            tcp_gateway_ip={item => (
              <p>{item.driver_type === "RS485" ? item.driver_type : `${item.tcp_gateway_ip}:${item.tcp_gateway_port}`} @<strong>{item.rtu_bus_address}</strong></p>
            )}
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