import { createColumnHelper } from "@tanstack/react-table";
import FormInput from "../../../../../components/formInput/FormInput";
import { useEffect, useMemo, useState } from "react";
import * as yup from "yup";
import Constants from "../../../../../utils/Constants";
import { useDeviceManagement } from "../DeviceManagement";
import useAxiosPrivate from "../../../../../hooks/useAxiosPrivate";
import { isEmpty } from "lodash";
import Libs from "../../../../../utils/Libs";
import LibToast from "../../../../../utils/LibToast";

export default function useListAvailableComponent({
  existingComponents,
  deviceTypes,
}) {
  const axiosPrivate = useAxiosPrivate();
  const columnsHelper = createColumnHelper();
  const columns = [
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
              }}
            />
          </div>
        );
      },
    }),
    columnsHelper.accessor("tcp_gateway_ip", {
      id: "tcp_gateway_ip",
      header: "Port",
      size: 100,
      maxSize: 200,
      cell: ({ row }) => (
        <div style={{ paddingLeft: `${row.depth * 1.2}rem` }}>
          {row.original.tcp_gateway_ip}@{row.original.tcp_gateway_port}{" "}
          {row.original.rtu_bus_address}
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
  ];
  const validationSchemas = yup.object().shape({
    ip_address: yup
      .string()
      .matches(
        Constants.REGEX_PATTERN.IP_ADDRESS_WITH_WILDCARD,
        "Invalid IP-Address format"
      ),
    // rtu_bus_address_from: yup.number().min(1).max(255),
    // rtu_bus_address_to: yup
    //   .number()
    //   .min(1)
    //   .max(
    //     yup.ref("rtu_bus_address_from"),
    //     "Must be greater than or equal to Bus Address From"
    //   ),
    // tcp_gateway_port_from: yup.number().min(1).max(65535),
    // tcp_gateway_port_to: yup
    //   .number()
    //   .min(1)
    //   .max(
    //     yup.ref("tcp_gateway_port_from"),
    //     "Must be greater than or equal to TCP Port From"
    //   ),
  });
  const [rowSelection, setRowSelection] = useState({});
  const [total, setTotal] = useState(0);
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(Constants.DEFAULT_PAGE_SIZE);

  const { deviceConfig, device } = useDeviceManagement();
  const { communication, device_types } = deviceConfig;
  const [availableDevices, setAvailableDevices] = useState([]);

  const communicationOptions = useMemo(() => {
    return communication.map((item) => ({
      label: item.name,
      value: item.id,
    }));
  }, [communication]);

  const deviceTypeOptions = useMemo(() => {
    return device_types
      .filter((item) => deviceTypes.includes(item.id))
      .map((item) => ({
        label: item.name,
        value: item.id,
      }));
  }, [device_types, deviceTypes]);

  useEffect(() => {
    if (deviceTypes.length === 0) {
      return;
    }

    setTimeout(async () => {
      try {
        const res = await axiosPrivate.post(
          Constants.API_URL.DEVICES.COMPONENT.SEARCH +
            `?page=${offset}&limit=${limit}`,
          {
            id_device_type: deviceTypes,
            parent: device.id,
            exclude: existingComponents.map((item) => item.component.id),
          }
        );
        if (!isEmpty(res.data)) {
          setAvailableDevices(res.data);
        }
      } catch (e) {
        Libs.progress(false);
        LibToast.toast(
          e.message || "An error occurred while fetching data",
          "error"
        );
      }
    }, 1000);
  }, [deviceTypes]);

  const [searchParams, setSearchParams] = useState({
    name: "",
    device_type: null,
    communication: null,
    ip_address: "",
    rtu_bus_address_from: 1,
    rtu_bus_address_to: 255,
    tcp_gateway_port_from: 1,
    tcp_gateway_port_to: 65535,
  });

  const onSubmit = (data) => {
    Libs.progress(true);
    let body = {
      ...searchParams,
      ...data,
      ...(!isEmpty(data.device_type)
        ? {
            id_device_type: data.device_type.map((item) => item.value),
          }
        : {
            id_device_type: deviceTypes,
          }),
      ...(!isEmpty(data.communication)
        ? {
            id_communication: data.communication.map((item) => item.value),
          }
        : {}),
      rtu_bus_address: {
        range_from: Math.min(
          data.rtu_bus_address_from,
          data.rtu_bus_address_to
        ),
        range_to: Math.max(data.rtu_bus_address_from, data.rtu_bus_address_to),
      },
      tcp_gateway_port: {
        range_from: Math.min(
          data.tcp_gateway_port_from,
          data.tcp_gateway_port_to
        ),
        range_to: Math.max(
          data.tcp_gateway_port_from,
          data.tcp_gateway_port_to
        ),
      },
    };

    setTimeout(async () => {
      try {
        const res = await axiosPrivate.post(
          Constants.API_URL.DEVICES.COMPONENT.SEARCH +
            `?page=${offset}&limit=${limit}`,
          body
        );
        setAvailableDevices(res.data);
      } catch (e) {
        Libs.progress(false);
        LibToast.toast(
          e.message || "An error occurred while fetching data",
          "error"
        );
      } finally {
        Libs.progress(false);
      }
    }, 1000);
  };

  const dataTable = useMemo(() => {
    if (isEmpty(existingComponents)) {
      Libs.progress(true);
      return [];
    }

    Libs.progress(false);
    return [
      ...existingComponents
        .map((item) => item.component)
        .flat()
        .map((item, index) => {
          setRowSelection((prev) => ({
            ...prev,
            [index]: true,
          }));
          return {
            id: item.id,
            tcp_gateway_ip: item.tcp_gateway_ip,
            tcp_gateway_port: item.tcp_gateway_port,
            rtu_bus_address: item.rtu_bus_address,
            name: item.name,
          };
        }),
      ...availableDevices,
    ];
  }, [existingComponents, availableDevices]);

  return {
    columns,
    validationSchemas,
    searchParams,
    setSearchParams,
    deviceTypeOptions,
    communicationOptions,
    onSubmit,
    dataTable,
    rowSelection,
    setRowSelection,
    total,
    setTotal,
    offset,
    setOffset,
    limit,
    setLimit,
  };
}
