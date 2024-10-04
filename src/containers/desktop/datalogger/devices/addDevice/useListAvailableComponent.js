import { createColumnHelper } from "@tanstack/react-table";
import FormInput from "../../../../../components/formInput/FormInput";
import { useEffect, useMemo, useState } from "react";
import * as yup from "yup";
import { tcpSchema } from "../DeviceValidation";
import Constants from "../../../../../utils/Constants";
import { useDeviceManagement } from "../DeviceManagement";

export default function useListAvailableComponent() {
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
      .matches(Constants.REGEX_PATTERN.IP_ADDRESS, "Invalid IP-Address format"),
    rtu_bus_address_from: yup.number().min(1).max(255),
    rtu_bus_address_to: yup
      .number()
      .min(1)
      .max(
        yup.ref("rtu_bus_address_from"),
        "Must be greater than or equal to Bus Address From"
      ),
    tcp_port_from: yup.number().min(1).max(65535),
    tcp_port_to: yup
      .number()
      .min(1)
      .max(
        yup.ref("tcp_port_from"),
        "Must be greater than or equal to TCP Port From"
      ),
  });

  const { deviceConfig } = useDeviceManagement();
  const { communication } = deviceConfig;
  const communicationOptions = useMemo(() => {
    return communication.map((item) => ({
      label: item.name,
      value: item.id,
    }));
  }, [communication]);

  const deviceTypeOptions = useMemo(() => {}, []);
  const [searchParams, setSearchParams] = useState({
    name: "",
    device_type: null,
    communication: null,
    ip_address: "",
    rtu_bus_address_from: 1,
    rtu_bus_address_to: 255,
    tcp_port_from: 1,
    tcp_port_to: 65535,
  });

  const onSubmit = (data) => {
    console.log(data);
  };
  return {
    columns,
    validationSchemas,
    searchParams,
    setSearchParams,
    deviceTypeOptions,
    communicationOptions,
    onSubmit,
  };
}
