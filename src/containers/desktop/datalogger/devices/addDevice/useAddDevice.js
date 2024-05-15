/********************************************************
* Copyright 2020-2021 NEXT WAVE ENERGY MONITORING INC.
* All rights reserved.
* 
*********************************************************/
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup'
import useAxiosPrivate from '../../../../../hooks/useAxiosPrivate';
import Constants from '../../../../../utils/Constants';
import LibToast from '../../../../../utils/LibToast';
import { loginService } from '../../../../../services/loginService';
import { useDeviceManagement } from '../DeviceManagement';

export default function useAddDevice(closeAddDevice, deviceConfig) {
  const { setAllDevices } = useDeviceManagement();
  const [isAddMultipleDevice, setIsAddMultipleDevice] = useState(false);
  const [isOpenAddMultipleDevice, setIsOpenAddMultipleDevice] = useState(false);
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();
  const [initialValues, setInitialValues] = useState(
    {
      num_of_devices: 1,
      inc_mode: 1,
      mode: 1,
      name: "",
      id_device_type: 0,
      id_device_group: 0,
      id_template: 0,
      id_communication: 0,
      device_virtual: false,
      rtu_bus_address: 0,
      tcp_gateway_ip: "",
      tcp_gateway_port: 0,
      rated_power: 0,
    }
  )
  const [data, setData] = useState(initialValues);
  const [meterType, setMeterType] = useState({
    value: 1,
    label: "Total Consumption Meter"
  });
  const [meterTypes,] = useState([
    { value: 1, label: "Total Consumption Meter" },
    { value: 2, label: "Total Production Meter" },
    { value: 3, label: "Consumption Meter" },
    { value: 4, label: "Production Meter" },
    { value: 5, label: "Grid Meter" }
  ]);

  const [schema, setSchema] = useState(yup.object().shape({
    name: yup.string().required("Name is required"),
    num_of_devices: yup.number().required("Number of devices is required").min(1, "Number of devices must be greater than 0").max(16, "Number of devices must be less than 16"),
    mode: yup.number().required("Mode is required"),
    id_device_type: yup.number().required("Device type is required"),
    id_communication: yup.number().required("Communication is required"),
    rtu_bus_address: yup.number().required("RTU Bus Address is required").min(502, "RTU Bus Address must be greater than 501").max(65535, "RTU Bus Address must be less than 65536"),
    ...(
      initialValues?.communication && initialValues?.communication?.label && initialValues?.communication?.label.search(/RS485/g) === -1 ?
        {
          tcp_gateway_ip: yup.string().required("MB/TCP Gateway IP-Address is required"),
          tcp_gateway_port: yup.number().required("MB/TCP Gateway Port is required").min(1, "MB/TCP Gateway Port must be greater than 1").max(65535, "MB/TCP Gateway Port must be less than 65536")
        } : {}
    )
  }))

  useEffect(() => {
    initialValues?.communication?.label && setTimeout(() => {
      setSchema(yup.object().shape({
        ...schema.fields,
        ...(
          initialValues?.communication?.label.search(/COM\w*/g) === -1 ?
            {
              tcp_gateway_ip: yup.string().required("MB/TCP Gateway IP-Address is required").matches(/^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/, "Invalid IP Address"),
              tcp_gateway_port: yup.number().required("MB/TCP Gateway Port is required").min(1, "MB/TCP Gateway Port must be greater than 1").max(65535, "MB/TCP Gateway Port must be less than 65536")
            } : {}
        )
      }))
    }, 100);
  }, [initialValues?.communication?.label]);

  useEffect(() => {
    initialValues?.device_type?.label && setTimeout(() => {
      setSchema(yup.object().shape({
        ...schema.fields,
        ...(
          initialValues?.device_type?.label.indexOf("Inverter") !== -1 ?
            {
              rated_power: yup.number().required("Rated Power is required").min(0, "Rated Power must be greater than 0").max(1500, "Rated Power must be less than 1500")
            } : {}
        )
      }))
    }, 100);
  }, [initialValues?.device_type?.value]);

  const openAddMultipleDevice = () => setIsAddMultipleDevice(true);
  const closeAddMultipleDevice = () => {
    setTimeout(() => {
      setIsAddMultipleDevice(false);
      setIsOpenAddMultipleDevice(false);
      setInitialValues({
        ...initialValues,
        num_of_devices: 1,
        mode: 1,
        is_add: false,
      });
    }, 100);
  };

  const [deviceConfigDropdown, setDeviceConfigDropdown] = useState(null);
  useEffect(() => {
    if (deviceConfig) {
      setTimeout(() => {
        const { device_types, device_groups, template, communication } = deviceConfig;
        setDeviceConfigDropdown(() => {
          return {
            deviceType: device_types && device_types.map(item => ({ value: item.id, label: item.name })),
            deviceGroup: [
              {
                label: "Custom",
                options: device_groups && device_groups.filter(item => item.type === 1)?.map(item => { return { value: item.id, label: item.name, id_device_type: item.id_device_type } })
              },
              {
                label: "Built-in",
                options: device_groups && device_groups.filter(item => item.type === 0)?.map(item => { return { value: item.id, label: item.name, id_device_type: item.id_device_type } })
              }
            ],
            template: [
              {
                label: "Custom",
                options: template && template.filter(item => item.type === 1)?.map(item => { return { value: { id_template: item.id, id_device_group: item.id_device_group }, label: item.name } })
              },
              {
                label: "Built-in",
                options: template && template.filter(item => item.type === 0)?.map(item => { return { value: { id_template: item.id, id_device_group: item.id_device_group }, label: item.name } })
              },
            ].flat(),
            communicationProtocol: communication && communication.map(item => ({ value: item.id, label: item.namekey }))
          }
        })
      }, 100);
    }
  }, [deviceConfig]);

  useEffect(() => {
    deviceConfigDropdown && Object.keys(deviceConfigDropdown).length > 0 && setTimeout(() => {
      let communication = deviceConfigDropdown?.communicationProtocol[0] || [];
      let device_type = deviceConfigDropdown?.deviceType[0] || [];
      let device_group = deviceConfigDropdown?.deviceGroup.map(item => item.options.filter(item => item.id_device_type === device_type?.value))[0][0] || null;
      let template = deviceConfigDropdown?.template.map(item => item.options.filter(item => item.value.id_device_group === device_group[0]?.value))[0][0] || null;
      setInitialValues({
        ...initialValues,
        id_communication: communication?.value,
        communication: communication,
        id_device_type: device_type?.value,
        device_type: device_type,
        device_group: device_group,
        id_device_group: device_group?.value,
        id_template: template?.value?.id_template,
        template: template
      })
    }, 100);
  }, [deviceConfigDropdown]);

  const handleAddMultipleDevice = (data) => {
    data = {
      ...data,
      is_add: true,
    }
    setTimeout(() => {
      setInitialValues({ ...initialValues, ...data });
      setData(data);
    }, 100);
  }

  const handleSave = (data) => {
    setTimeout(() => {
      setData(data);
      setInitialValues({ ...initialValues, ...data });
      if (!data?.id_template) {
        LibToast.toast("Please select a template", "error");
        return;
      }
      if (isOpenAddMultipleDevice) {
        openAddMultipleDevice();
        return;
      }

      handleAddMultipleDevice({ ...initialValues, ...data });
    }, 100);
  };

  useEffect(() => {
    if (initialValues?.is_add) {
      const output = document.getElementById("progress");
      output.innerHTML = "<div><img src='/loading.gif' /></div>";
      setTimeout(async () => {
        try {
          const response = await axiosPrivate.post(Constants.API_URL.DEVICES.ADD, data, {
            headers: {
              "Content-Type": "application/json",
            },
          });

          setAllDevices(response.data)
          LibToast.toast("New devices are being added. It would take a few minutes.", "info")
        } catch (error) {
          loginService.handleMissingInfo(error, "Failed to add device") && navigate("/", { replace: true });
        }
        finally {
          output.innerHTML = "";
          if (isAddMultipleDevice) {
            closeAddMultipleDevice();
          }
          closeAddDevice();
        }
      }, 500);
    }
  }, [initialValues?.is_add]);


  return {
    isAddMultipleDevice,
    setIsAddMultipleDevice,
    isOpenAddMultipleDevice,
    setIsOpenAddMultipleDevice,
    meterType,
    setMeterType,
    meterTypes,
    schema,
    setSchema,
    initialValues,
    openAddMultipleDevice,
    closeAddMultipleDevice,
    setInitialValues,
    handleSave,
    handleAddMultipleDevice,
    deviceConfigDropdown,
  }
}
