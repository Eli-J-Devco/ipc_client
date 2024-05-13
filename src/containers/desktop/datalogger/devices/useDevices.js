/********************************************************
* Copyright 2020-2021 NEXT WAVE ENERGY MONITORING INC.
* All rights reserved.
* 
*********************************************************/
import { useEffect, useState } from "react";
import { json, useNavigate } from "react-router-dom";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import Constants from "../../../../utils/Constants";
import { loginService } from "../../../../services/loginService";
import useMQTT from "../../../../hooks/useMQTT";
import FormInput from "../../../../components/formInput/FormInput";
import { createColumnHelper } from "@tanstack/react-table";
import { ReactComponent as EditIcon } from "../../../../assets/images/edit.svg";
import { ReactComponent as DeleteIcon } from "../../../../assets/images/delete.svg";
import { ReactComponent as ViewIcon } from "../../../../assets/images/eye_view.svg";
import Button from "../../../../components/button/Button";
import _ from "lodash";


export default function useDevices() {
  const { data } = useMQTT();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const [isAddDevice, setIsAddDevice] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState({});
  const handleConfigDevice = item => {
    setSelectedDevice(item);
    // setIsAddDevice(true);
  };

  const openAddDevice = () => setIsAddDevice(true);
  const closeAddDevice = () => setIsAddDevice(false);
  const [dataDevices, setDataDevices] = useState([]);
  const [allDevices, setAllDevices] = useState([]);
  const [deviceConfig, setDeviceConfig] = useState({
    device_types: [],
    device_groups: [],
    template: [],
    communication: [],
  });
  const output = document.getElementById("progress");

  useEffect(() => {
    if (allDevices.length) return;

    output.innerHTML = "<div><img src='/loading.gif' /></div>";
    setTimeout(async () => {
      try {
        const { data } = await axiosPrivate.post(Constants.API_URL.DEVICES.LIST);
        let devices = data.map((d) => {
          d["status"] = "";
          return d;
        });
        setAllDevices(_.cloneDeep(devices));

        var device_type = await axiosPrivate.post(Constants.API_URL.DEVICES.CONFIG.TYPE);
        var device_group = await axiosPrivate.post(Constants.API_URL.DEVICES.CONFIG.GROUP);
        var template = await axiosPrivate.post(Constants.API_URL.TEMPLATE.LIST, {});
        var communication = await axiosPrivate.post(Constants.API_URL.RS485.GET, {});

        setDeviceConfig({
          device_types: device_type.data,
          device_groups: device_group.data,
          template: template.data,
          communication: communication.data,
        });
      } catch (error) {
        loginService.handleMissingInfo(error, "Failed to get device configuration") && navigate("/", { replace: true });
      } finally {
        output.innerHTML = "";
      }
    }, 500);
  }, [allDevices]);

  useEffect(() => {
    let new_data = _.cloneDeep(allDevices.map((d) => {
      const index = data.findIndex((item) => item.id_device === d.id);
      if (index !== -1) {
        d["status"] = data[index]["status_device"];
        d["is_online"] = 1;
      }
      else {
        d["is_online"] = 0;
      }
      return d;
    }));
    new_data = new_data.filter((d) => d["is_online"] === 1);
    setDataDevices(new_data);
  }, [data]);

  const columnsHelper = createColumnHelper();
  const columns = [
    columnsHelper.accessor("id_checkbox", {
      id: "id_checkbox",
      size: 10,
      header: ({ table }) => (
        <FormInput.Check
          {...{
            inline: true,
            name: "all",
            label: "Device#",
            checked: table.getIsAllRowsSelected(),
            onChange: (e) => table.toggleAllRowsSelected(e.target.checked),
          }}
        />
      ),
      cell: ({ row }) => {
        return (
          <FormInput.Check
            {...{
              inline: true,
              name: row.original.id,
              label: `${row.original.id}`,
              checked: row.getIsSelected(),
              onChange: row.getToggleSelectedHandler(),
              indeterminate: row.getIsSomeSelected(),
            }}
          />
        );
      },
    }),
    columnsHelper.accessor("tcp_gateway_ip", {
      id: "tcp_gateway_ip",
      header: "Port",
      width: 200,
      cell: ({ row }) => (
        <div>
          {row.original.tcp_gateway_ip}@{row.original.tcp_gateway_port}
        </div>
      ),
    }),
    columnsHelper.accessor("status", {
      id: "status",
      header: "Status",
      size: 100,
      cell: ({ row }) =>
      (
        <div className={`badge ${row.original.status === "online" ? "bg-success" : "bg-danger"}`}>
          <span>
            {row.original.status}
          </span>
        </div>
      ),
    }),
    columnsHelper.accessor("name", {
      id: "name",
      header: "Name and Purpose",
      size: 200,
    }),
    columnsHelper.accessor("driver_type", {
      id: "driver_type",
      header: "Type",
      size: 200,
    }),
    columnsHelper.accessor("action", {
      id: "action",
      header: <div className="text-center">Actions</div>,
      cell: ({ row }) => (
        <div className="d-flex flex-wrap justify-content-center">
          <Button.Image
            image={<ViewIcon />}
            onClick={() => handleConfigDevice(row.original)}
            className={"mx-2"}
          />
          <Button.Image
            image={<EditIcon />}
            onClick={() => handleConfigDevice(row.original)}
            className={"mx-2"}
          />
          <Button.Image
            image={<DeleteIcon />}
            onClick={() => handleConfigDevice(row.original)}
            className={"mx-2"}
          />
        </div>
      ),
    }),
  ];

  const deleteDevices = (devices) => {
    output.innerHTML = "<div><img src='/loading.gif' /></div>";
    setTimeout(async () => {
      try {
        const response = await axiosPrivate.post(Constants.API_URL.DEVICES.DELETE, devices);
        setAllDevices(response.data);
      } catch (error) {
        loginService.handleMissingInfo(error, "Failed to delete devices") && navigate("/", { replace: true });
      } finally {
        output.innerHTML = "";
      }
    }, 500);
  }

  return {
    isAddDevice,
    openAddDevice,
    closeAddDevice,
    handleConfigDevice,
    dataDevices,
    setAllDevices,
    deviceConfig,
    columns,
    selectedDevice,
    setSelectedDevice,
    deleteDevices,
  }
}
