/********************************************************
* Copyright 2020-2021 NEXT WAVE ENERGY MONITORING INC.
* All rights reserved.
* 
*********************************************************/
import { useEffect, useState } from "react";
import { json, useNavigate, useParams } from "react-router-dom";
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
import { useDeviceManagement } from "./DeviceManagement";
import LibToast from "../../../../utils/LibToast";


export default function useDevices() {
  const { data } = useMQTT();
  const axiosPrivate = useAxiosPrivate();
  const { name } = useParams();
  const {
    routes,
    setRoutes,
    setDevice,
    deviceConfig,
    allDevices,
    setAllDevices,
    offset,
    limit,
    total,
    setTotal,
    setOffset,
  } = useDeviceManagement();
  const navigate = useNavigate();
  const [isAddDevice, setIsAddDevice] = useState(false);
  const [isUpdateDevice, setIsUpdateDevice] = useState(false);
  const [isDeleteDevice, setIsDeleteDevice] = useState(false);
  const [dataDevices, setDataDevices] = useState([]);
  const output = document.getElementById("progress");
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
          {row.original.tcp_gateway_ip}@{row.original.tcp_gateway_port} {row.original.rtu_bus_address}
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
            onClick={() => handleUpdateDevice(row.original)}
            className={"mx-2"}
          />
        </div>
      ),
    }),
  ];

  const handleConfigDevice = item => {
    setDevice(item);
    navigate(`/datalogger/devices/${item?.name.trim()}`, { state: { from: "/datalogger/devices" } });
    setRoutes((prev) => [...prev, { path: `/datalogger/devices/${item?.name.trim()}`, name: item?.name.trim() }]);
  };

  const handleUpdateDevice = (device) => {
    setDevice(device);
    openUpdateDevice();
  }

  const openAddDevice = () => setIsAddDevice(true);
  const closeAddDevice = () => setIsAddDevice(false);
  const openUpdateDevice = () => setIsUpdateDevice(true);
  const closeUpdateDevice = () => setIsUpdateDevice(false);

  useEffect(() => {
    if (!name) {
      setRoutes(routes.slice(0, 2));
    }
  }, [name]);

  useEffect(() => {
    let newTotal = total;
    let newData = _.cloneDeep(allDevices.map((d) => {
      if (d["is_online"] === -2) {
        return d;
      }

      const index = data.findIndex((item) => item.id_device === d.id);
      if (d["is_online"] === -1) {
        if (index === -1) {
          d["status"] = "Deleted";
          d["is_online"] = -2;
          newTotal -= 1;
        }
      } else if (index !== -1) {
        d["status"] = data[index]["status_device"] === "" ? "offline" : data[index]["status_device"];
        d["message"] = data[index]["message"];
        d["is_online"] = 1;
      }
      else {
        d["status"] = "Initiating...";
        d["is_online"] = 0;
      }
      return d;
    }));
    newData = newData.filter((d) => d["is_online"] !== -2);

    setTimeout(() => {
      // if (newData.length < 1 && offset > offset - limit) {
      //   setOffset((prev) => prev - 1);
      //   return;
      // }

      if (newTotal !== total) {
        setTotal(newTotal);
        // if (newTotal / limit < offset) {
        //   setOffset((prev) => prev - 1);
        // }
        return;
      }

      setDataDevices(newData);
    }, 100);
  }, [data]);


  const deleteDevices = (devices) => {
    output.innerHTML = "<div><img src='/loading.gif' /></div>";
    setTimeout(async () => {
      try {
        const response = await axiosPrivate.post(Constants.API_URL.DEVICES.DELETE + `?page=${offset}&limit=${limit}`, devices);
        setAllDevices(response.data?.data.map((d) => {
          if (devices.includes(d.id)) {
            d["status"] = "Deleting...";
            d["is_online"] = -1;
          }
          return d;
        }));
        setTotal(response.data?.total);
        LibToast.toast("Devices are being deleted. It would take a few minutes.", "info");
      } catch (error) {
        loginService.handleMissingInfo(error, "Failed to delete devices") && navigate("/", { replace: true });
      } finally {
        output.innerHTML = "";
      }
    }, 500);
  }

  return {
    isAddDevice,
    isUpdateDevice,
    isDeleteDevice,
    dataDevices,
    deviceConfig,
    columns,
    openAddDevice,
    closeAddDevice,
    openUpdateDevice,
    closeUpdateDevice,
    handleConfigDevice,
    deleteDevices,
    setIsDeleteDevice,
  }
}
