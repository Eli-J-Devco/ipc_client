/********************************************************
 * Copyright 2020-2021 NEXT WAVE ENERGY MONITORING INC.
 * All rights reserved.
 *
 *********************************************************/
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import Constants from "../../../../utils/Constants";
import { loginService } from "../../../../services/loginService";
import useMQTT from "../../../../hooks/useMQTT";
import FormInput from "../../../../components/formInput/FormInput";
import { createColumnHelper } from "@tanstack/react-table";
import { ReactComponent as EditIcon } from "../../../../assets/images/edit.svg";
import { ReactComponent as ViewIcon } from "../../../../assets/images/eye_view.svg";
import Button from "../../../../components/button/Button";
import _ from "lodash";
import { useDeviceManagement } from "./DeviceManagement";
import LibToast from "../../../../utils/LibToast";
import { ReactComponent as ExpandIcon } from "../../../../assets/images/chevron-down.svg";
import { ReactComponent as CollapseIcon } from "../../../../assets/images/chevron-up.svg";

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
    clientSecret,
    deadletter,
    setDeadletter,
  } = useDeviceManagement();
  const navigate = useNavigate();
  const [isAddDevice, setIsAddDevice] = useState(false);
  const [isUpdateDevice, setIsUpdateDevice] = useState(false);
  const [isDeleteDevice, setIsDeleteDevice] = useState(false);
  const [dataDevices, setDataDevices] = useState([]);
  const output = document.getElementById("progress");
  const columnsHelper = createColumnHelper();
  const statusColor = {
    online: "bg-success",
    offline: "bg-danger",
    "Initiating...": "bg-warning",
    "Deleting...": "bg-warning",
    deleted: "bg-danger",
    failed: "bg-danger",
    symbolic: "bg-warning",
  };
  const statusEnum = {
    online: 1,
    offline: 0,
    "Initiating...": 2,
    "Deleting...": -1,
    deleted: -2,
    failed: -4,
    symbolic: 3,
  };

  const columns = [
    columnsHelper.accessor("toggle", {
      id: "toggle",
      size: 10,
      header: ({ table }) => (
        <div>
          <Button
            variant="dark"
            onClick={() =>
              table.getIsSomeRowsExpanded()
                ? table.toggleAllRowsExpanded(false)
                : table.toggleAllRowsExpanded()
            }
          >
            <Button.Image
              image={
                table.getIsAllRowsExpanded() ||
                table.getIsSomeRowsExpanded() ? (
                  <CollapseIcon />
                ) : (
                  <ExpandIcon />
                )
              }
            />
          </Button>
        </div>
      ),
      cell: ({ row }) => (
        <div style={{ paddingLeft: `${row.depth * 2}rem` }}>
          {row.getCanExpand() && (
            <Button variant="dark" onClick={() => row.toggleExpanded()}>
              <Button.Image
                image={row.getIsExpanded() ? <CollapseIcon /> : <ExpandIcon />}
              />
            </Button>
          )}
        </div>
      ),
    }),
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
              disabled: [
                statusEnum["Deleting..."],
                statusEnum.deleted,
                statusEnum["Initiating..."],
              ].includes(row.original.state),
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
          {row.original.tcp_gateway_ip}@{row.original.tcp_gateway_port}{" "}
          {row.original.rtu_bus_address}
        </div>
      ),
    }),
    columnsHelper.accessor("status", {
      id: "status",
      header: "Status",
      size: 100,
      cell: ({ row }) => (
        <div className={`badge ${statusColor[row.original.status]}`}>
          <span>{row.original.status}</span>
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
          {[
            statusEnum["Deleting..."],
            statusEnum.deleted,
            statusEnum["Initiating..."],
          ].includes(row.original.state) ? null : (
            <>
              {row.original?.device_type?.type !== 1 && (
                <Button.Image
                  image={<ViewIcon />}
                  onClick={() => handleConfigDevice(row.original)}
                  className={"mx-2"}
                />
              )}
              <Button.Image
                image={<EditIcon />}
                onClick={() => handleUpdateDevice(row.original)}
                className={"mx-2"}
              />
            </>
          )}
        </div>
      ),
    }),
  ];

  const handleConfigDevice = (item) => {
    setDevice(item);
    navigate(`/datalogger/devices/${item?.name.trim()}`, {
      state: { from: "/datalogger/devices" },
    });
    setRoutes((prev) => [
      ...prev,
      {
        path: `/datalogger/devices/${item?.name.trim()}`,
        name: item?.name.trim(),
      },
    ]);
  };

  const handleUpdateDevice = (device) => {
    setDevice(device);
    openUpdateDevice();
  };

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
    const setDeviceState = (index, d) => {
      if (index !== -1) {
        if (d["state"] !== statusEnum["Deleting..."]) {
          if (d?.device_type?.type === 1) {
            d["state"] = statusEnum.symbolic;
          } else {
            d["state"] = statusEnum[data[index]["status_device"]];
          }
        }
      } else {
        if (d["state"] === statusEnum["Deleting..."])
          d["state"] = statusEnum.deleted;
        else if (d["state"] !== statusEnum["Initiating..."]) {
          d["state"] = statusEnum.failed;
        }
      }

      switch (d["state"]) {
        case statusEnum.deleted:
          d["status"] = "Deleted";
          d["state"] = statusEnum.deleted;
          break;
        case statusEnum["Deleting..."]:
          d["status"] = "Deleting...";
          break;
        case statusEnum.failed:
          d["status"] = "failed";
          break;
        case statusEnum.online:
          d["status"] = data[index]["status_device"];
          d["message"] = data[index]["message"];
          break;
        case statusEnum.offline:
          d["status"] = data[index]["status_device"];
          d["message"] = data[index]["message"];
          break;
        case statusEnum["Initiating..."]:
          d["status"] = "Initiating...";
          break;
        case statusEnum.symbolic:
          d["status"] = "symbolic";
          break;
        default:
          break;
      }
      return d;
    };

    const getDeepestDepth = (data) => {
      if (!data.subRows) return;

      data.subRows = data.subRows.map((d) => {
        if (d["state"] === statusEnum.deleted) {
          return d;
        }

        if (d.subRows) {
          d.subRows = getDeepestDepth(d.subRows, d);
        }

        const index = data.findIndex((item) => item.id_device === d.id);
        return setDeviceState(index, d);
      });
    };

    let newTotal = total;
    let newData = _.cloneDeep(
      allDevices.map((d) => {
        if (d["state"] === statusEnum.deleted) {
          return d;
        }

        if (d.subRows) {
          d.subRows = getDeepestDepth(d.subRows, d);
        }

        const index = data.findIndex((item) => item.id_device === d.id);
        return setDeviceState(index, { ...d });
      })
    );
    newData = newData.filter((d) => d["state"] !== statusEnum.deleted);

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
        const response = await axiosPrivate.post(
          Constants.API_URL.DEVICES.DELETE + `?page=${offset}&limit=${limit}`,
          {
            device_id: devices,
            secret: clientSecret,
          }
        );
        setAllDevices(
          response.data?.data.map((d) => {
            if (devices.includes(d.id)) {
              // d["status"] = "Deleting...";
              d["state"] = statusEnum["Deleting..."];
            }
            return d;
          })
        );
        setTotal(response.data?.total);
        LibToast.toast(
          "Devices are being deleted. It would take a few minutes.",
          "info"
        );
      } catch (error) {
        loginService.handleMissingInfo(error, "Failed to delete devices") &&
          navigate("/", { replace: true });
      } finally {
        output.innerHTML = "";
      }
    }, 500);
  };

  useEffect(() => {
    if (!deadletter) return;

    LibToast.toast(deadletter.message, "error");

    setAllDevices(
      allDevices.map((item) => {
        if (deadletter.devices.includes(item.id)) {
          // item["status"] = "Add failed";
          item["state"] = statusEnum.failed;
        }
        return item;
      })
    );
    setDeadletter(null);
  }, [deadletter]);

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
  };
}
