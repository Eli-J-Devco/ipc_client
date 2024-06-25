/********************************************************
 * Copyright 2020-2021 NEXT WAVE ENERGY MONITORING INC.
 * All rights reserved.
 *
 *********************************************************/
import { useEffect, useMemo, useState } from "react";
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

export const statusEnum = {
  online: 1,
  offline: 0,
  "Initiating...": 2,
  "Deleting...": -1,
  deleted: -2,
  failed: -4,
  symbolic: 3,
  reconnecting: -5,
  disconnected: -6,
};

export default function useDevices() {
  const { data, state } = useMQTT();
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
    setTotal,
    clientSecret,
    deadletter,
    setDeadletter,
  } = useDeviceManagement();
  const navigate = useNavigate();
  const [isAddDevice, setIsAddDevice] = useState(false);
  const [isRetry, setIsRetry] = useState({
    isConfirm: false,
    isOpen: false,
    canRetry: false,
    deivce: [],
  });
  const [isUpdateDevice, setIsUpdateDevice] = useState(false);
  const [isDeleteDevice, setIsDeleteDevice] = useState(false);
  const [newDevices, setNewDevices] = useState({
    parent: 0,
    devices: [],
  });
  const [rowSelection, setRowSelection] = useState({});
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
    "Reconnecting...": "bg-warning",
    disconnected: "bg-secondary",
  };

  const columns = [
    columnsHelper.accessor("toggle", {
      id: "toggle",
      size: 5,
      maxSize: 5,
      header: () => <div></div>,
      cell: ({ row }) => (
        <div style={{ paddingLeft: `${row.depth * 1.2}rem` }}>
          {row.original.children && (
            <Button
              variant="dark"
              onClick={() => {
                row.toggleExpanded();
                !row.getIsExpanded() &&
                  row.subRows.length === 0 &&
                  setTimeout(async () => {
                    if (row.getIsExpanded()) {
                      await fetchDevices({
                        id: row.original.id,
                        isPagination: false,
                      });
                    }
                  }, 100);
              }}
              disabled={[
                statusEnum["Deleting..."],
                statusEnum.deleted,
                statusEnum["Initiating..."],
              ].includes(row.original.state)}
            >
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
      maxSize: 10,
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
          <div style={{ paddingLeft: `${row.depth * 1.2}rem` }}>
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
          </div>
        );
      },
    }),
    columnsHelper.accessor("tcp_gateway_ip", {
      id: "tcp_gateway_ip",
      header: "Port",
      size: 200,
      maxSize: 200,
      cell: ({ row }) => (
        <div style={{ paddingLeft: `${row.depth * 1.2}rem` }}>
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
        <div style={{ paddingLeft: `${row.depth * 1.2}rem` }}>
          <div className={`badge ${statusColor[row.original.status]}`}>
            <span>{row.original.status}</span>
          </div>
        </div>
      ),
    }),
    columnsHelper.accessor("name", {
      id: "name",
      header: "Name and Purpose",
      size: 200,
      maxSize: 200,
      cell: ({ row }) => (
        <div style={{ paddingLeft: `${row.depth * 1.2}rem` }}>
          <div>{row.original.name}</div>
          <div>{row.original.purpose}</div>
        </div>
      ),
    }),
    columnsHelper.accessor("driver_type", {
      id: "driver_type",
      header: "Type",
      size: 200,
      maxSize: 200,
      cell: ({ row }) => (
        <div style={{ paddingLeft: `${row.depth * 1.2}rem` }}>
          {row.original.driver_type}
        </div>
      ),
    }),
    columnsHelper.accessor("action", {
      id: "action",
      header: <div className="text-center">Actions</div>,
      cell: ({ row }) => (
        <div
          className="d-flex flex-wrap justify-content-center"
          style={{ paddingLeft: `${row.depth * 1.2}rem` }}
        >
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

  const dataDevices = useMemo(() => {
    if (_.isEmpty(allDevices)) return [];

    const setDeviceState = (index, d) => {
      if (state.isReconnecting) {
        d["state"] = statusEnum.reconnecting;
        d["status"] = "Reconnecting...";
        return d;
      }

      if (d["creation_state"] === 1) {
        d["state"] = statusEnum.failed;
        d["status"] = "failed";
        return d;
      }

      if (index !== -1) {
        if (d["creation_state"] === -1) {
          d["creation_state"] = 0;
        }
        if (d["state"] !== statusEnum["Deleting..."]) {
          if (d?.device_type?.type === 1) {
            d["state"] = statusEnum.symbolic;
            d["status"] = statusEnum[d["state"]];
          } else {
            d["state"] = statusEnum[data[index]["status_device"]];
            d["status"] = data[index]["status_device"];
          }
        }
      } else {
        if (d["creation_state"] === -1) {
          d["state"] = statusEnum["Initiating..."];
          d["status"] = "Initiating...";
          return d;
        }
        if (d["state"] === statusEnum["Deleting..."]) {
          d["state"] = statusEnum.deleted;
          d["status"] = statusEnum[d["state"]];
        } else if (d["state"] !== statusEnum["Initiating..."]) {
          d["state"] = statusEnum.disconnected;
          d["status"] = "disconnected";
        }
      }
      return d;
    };

    const getDeepestDepth = (devs) => {
      return devs.map((d) => {
        if (d.subRows) {
          d.subRows = getDeepestDepth(d.subRows);
        }

        const index = data.findIndex((item) => item.id_device === d.id);
        return setDeviceState(index, { ...d });
      });
    };

    let newData = _.cloneDeep(getDeepestDepth(allDevices));
    newData = newData.filter((d) => d["state"] !== statusEnum.deleted);

    return newData;
  }, [allDevices, data, state]);

  const deleteDevices = () => {
    let ids = [];
    Object.keys(rowSelection).forEach((key) => {
      let splitedKey = key.split(".");
      if (splitedKey.length === 1) {
        ids.push(dataDevices[parseInt(key)].id);
        return;
      }

      ids.push(findId(dataDevices, splitedKey));
    });
    output.innerHTML = "<div><img src='/loading.gif' /></div>";
    setTimeout(async () => {
      try {
        const response = await axiosPrivate.post(
          Constants.API_URL.DEVICES.DELETE + `?page=${offset}&limit=${limit}`,
          {
            device_id: ids,
            secret: clientSecret,
          }
        );
        setAllDevices(
          response.data?.data.map((d) => {
            if (ids.includes(d.id)) {
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
        setRowSelection({});
        setIsDeleteDevice(false);
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

  const fetchDevices = async ({ id, isPagination }) => {
    output.innerHTML = "<div><img src='/loading.gif' /></div>";
    try {
      const { data } = await axiosPrivate.post(
        `${Constants.API_URL.DEVICES.LIST}${
          isPagination ? `?page=${offset}&limit=${limit}` : ""
        }`,
        {
          id: id,
        }
      );
      let devices = data.map((item) => ({
        ...item,
        status: "Reconnecting...",
        state: statusEnum.reconnecting,
      }));

      setNewDevices({ parent: id, devices: devices });
    } catch (error) {
      loginService.handleMissingInfo(error, "Failed to get devices") &&
        navigate("/", { replace: true });
    } finally {
      output.innerHTML = "";
    }
  };

  useEffect(() => {
    if (newDevices.devices.length === 0) return;

    addSubRows(allDevices, newDevices.parent, newDevices.devices);
    setNewDevices({ parent: 0, devices: [] });
  }, [newDevices]);

  const addSubRows = (devs, id, newDevices) => {
    return devs.map((d) => {
      if (d.id === id) {
        d.subRows = newDevices;
      } else if (d.subRows) {
        d.subRows = addSubRows(d.subRows, id, newDevices);
      }
      return d;
    });
  };

  const findId = (devs, keys) => {
    let id = -1;
    let index = parseInt(keys[0]);
    let d = devs[index];
    if (keys.length === 1) {
      return d.id;
    }

    id = findId(d.subRows, keys.slice(1));
    return id;
  };

  useEffect(() => {
    setRowSelection({});
  }, [offset, limit]);

  useEffect(() => {
    if (Object.keys(rowSelection).length === 0) {
      setIsRetry({ ...isRetry, canRetry: false });
      return;
    }

    const canItemsRetry = (devs, keys) => {
      let canRetry = false;
      let canDelete = false;

      let index = parseInt(keys[0]);
      let d = devs[index];
      if (keys.length === 1) {
        if (d["creation_state"] === 1) {
          canRetry = true;
        } else {
          canDelete = true;
        }
        return canRetry && canDelete ? -1 : canRetry ? 1 : 0;
      }

      if (canItemsRetry(d.subRows, keys.slice(1)) !== 1) return -1;
    };

    let canRetry = 1;
    Object.keys(rowSelection).forEach((key) => {
      if (canRetry !== 1) return;
      let splitedKey = key.split(".");
      canRetry = canItemsRetry(dataDevices, splitedKey);
    });

    setIsRetry({ ...isRetry, canRetry: canRetry === 1 });
  }, [rowSelection]);

  const retryCreateDevice = () => {
    const data = {
      is_retry: true,
      devices: Object.keys(rowSelection).map((key) => {
        let splitedKey = key.split(".");
        return findId(dataDevices, splitedKey);
      }),
    };

    setTimeout(async () => {
      try {
        const response = await axiosPrivate.post(
          Constants.API_URL.DEVICES.ADD + `?page=${offset}&limit=${limit}`,
          data
        );
        setAllDevices(
          response.data?.data.map((d) => {
            d["state"] = statusEnum.reconnecting;
            d["status"] = "Reconnecting...";
            return d;
          })
        );
        setTotal(response.data?.total);
        LibToast.toast(
          "Devices are being recreated. It would take a few minutes.",
          "info"
        );
      } catch (error) {
        loginService.handleMissingInfo(error, "Failed to create devices") &&
          navigate("/", { replace: true });
      } finally {
        output.innerHTML = "";
        setIsRetry({ ...isRetry, isOpen: false });
        setRowSelection({});
      }
    }, 500);
  };

  return {
    isAddDevice,
    isRetry,
    isUpdateDevice,
    isDeleteDevice,
    dataDevices,
    deviceConfig,
    columns,
    rowSelection,
    setIsRetry,
    setRowSelection,
    openAddDevice,
    closeAddDevice,
    openUpdateDevice,
    closeUpdateDevice,
    handleConfigDevice,
    deleteDevices,
    setIsDeleteDevice,
    retryCreateDevice,
  };
}
