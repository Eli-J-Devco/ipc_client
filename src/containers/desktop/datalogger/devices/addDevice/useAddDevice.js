/********************************************************
 * Copyright 2020-2021 NEXT WAVE ENERGY MONITORING INC.
 * All rights reserved.
 *
 *********************************************************/
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import useAxiosPrivate from "../../../../../hooks/useAxiosPrivate";
import Constants from "../../../../../utils/Constants";
import LibToast from "../../../../../utils/LibToast";
import { loginService } from "../../../../../services/loginService";
import { useDeviceManagement } from "../DeviceManagement";
import _ from "lodash";
import {
  defaultSchema,
  normalDeviceSchema,
  ratedPowerSchema,
  tcpSchema,
} from "../DeviceValidation";
import { createColumnHelper } from "@tanstack/react-table";
import FormInput from "../../../../../components/formInput/FormInput";

export default function useAddDevice(closeAddDevice) {
  const {
    deviceTypeComponents,
    setAllDevices,
    offset,
    limit,
    setTotal,
    clientSecret,
    deviceConfig,
    setDeviceConfig,
  } = useDeviceManagement();
  const [isAddMultipleDevice, setIsAddMultipleDevice] = useState(false);
  const [isOpenAddMultipleDevice, setIsOpenAddMultipleDevice] = useState(false);
  const [isOpenAddComponents, setIsOpenAddComponents] = useState(false);
  const [addingComponents, setAddingComponents] = useState([]);
  const [haveComponents, setHaveComponents] = useState({});
  const [updatingComponent, setUpdatingComponent] = useState(null);
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();
  const [initialValues, setInitialValues] = useState({
    num_of_devices: 1,
    inc_mode: 1,
    name: "",
    id_device_type: 0,
    id_device_group: 0,
    id_template: 0,
    id_communication: 0,
    device_virtual: false,
    rtu_bus_address: 1,
    tcp_gateway_ip: "",
    tcp_gateway_port: 502,
    rated_power: 1,
    inverter_type: null,
    meter_type: null,
    secret: clientSecret,
  });
  const [data, setData] = useState(initialValues);
  const [meterType, setMeterType] = useState({
    value: 1,
    label: "Total Consumption Meter",
  });
  const [meterTypes] = useState([
    { value: 1, label: "Total Consumption Meter" },
    { value: 2, label: "Total Production Meter" },
    { value: 3, label: "Consumption Meter" },
    { value: 4, label: "Production Meter" },
    { value: 5, label: "Grid Meter" },
  ]);

  const [schema, setSchema] = useState(
    yup.object().shape({
      ...defaultSchema,
      ...(initialValues?.device_type?.label.indexOf(
        Constants.COMMON.SPECIAL_DEVICE_TYPE
      ) === -1 && {
        ...normalDeviceSchema,
        ...(initialValues?.communication &&
        initialValues?.communication?.label &&
        initialValues?.communication?.label.search(/COM\w*/g) === -1
          ? tcpSchema
          : {}),
      }),
    })
  );
  const columnsHelper = createColumnHelper();
  const columns = [
    columnsHelper.accessor("id", {
      id: "id",
      size: 50,
      header: "No.",
      cell: ({ row }) => {
        return <div id={row.original.component.id}>{row.original.id}</div>;
      },
    }),
    columnsHelper.accessor("group", {
      id: "group",
      size: 100,
      header: "Device Type Group",
      cell: ({ row }) => {
        return <div>{row.original.name}</div>;
      },
    }),
    columnsHelper.accessor("device_type", {
      id: "device_type",
      size: 100,
      header: "Device Type",
      cell: ({ row }) => {
        return (
          <FormInput.Select
            name="device_type"
            value={row.original.component}
            option={_.cloneDeep(haveComponents)
              ?.component.filter((item) => item.group === row.original.group)
              .map((item) =>
                item.components.map((i) => ({
                  label: i.name,
                  value: i.id,
                  image: i.image,
                  rowId: row.original.component.id,
                  group: row.original.group,
                }))
              )
              .flat()}
            onChange={(e) => setUpdatingComponent(e)}
          />
        );
      },
    }),
    columnsHelper.accessor("name", {
      id: "name",
      size: 100,
      header: "Component Name",
      cell: ({ row }) => {
        return (
          <FormInput.Text
            name="component_name"
            value={row.original.component.component_name}
            onChange={(e) => {
              setUpdatingComponent({
                component_name: e.target.value,
                rowId: row.original.component.id,
                group: row.original.group,
              });
            }}
          />
        );
      },
    }),
  ];

  useEffect(() => {
    initialValues?.communication?.label &&
      setTimeout(() => {
        setSchema(
          yup.object().shape({
            ...schema.fields,
            ...(initialValues?.communication?.label.search(/COM\w*/g) === -1
              ? tcpSchema
              : {}),
          })
        );
        setInitialValues({
          ...initialValues,
          tcp_gateway_port: 502,
          tcp_gateway_ip: "1.1.1.1",
        });
      }, 100);
  }, [initialValues?.communication?.label]);

  useEffect(() => {
    initialValues?.device_type?.label &&
      setTimeout(async () => {
        setSchema(
          yup.object().shape({
            ...(initialValues?.device_type?.label.indexOf(
              Constants.COMMON.SPECIAL_DEVICE_TYPE
            )
              ? -1 && {
                  ...schema.fields,
                  ...normalDeviceSchema,
                  ...(initialValues?.communication &&
                  initialValues?.communication?.label &&
                  initialValues?.communication?.label.search(/COM\w*/g) === -1
                    ? tcpSchema
                    : {}),
                  ...(initialValues?.device_type?.label.indexOf("Inverter") !==
                  -1
                    ? ratedPowerSchema
                    : {}),
                }
              : defaultSchema),
          })
        );

        if (initialValues?.device_type?.label.indexOf("Meter") !== -1) {
          setInitialValues({
            ...initialValues,
            meter_type: meterType?.value,
            meterType: meterType,
            inverter_type: null,
            inverterType: null,
          });
        }

        if (initialValues?.device_type?.label.indexOf("Inverter") !== -1) {
          setInitialValues({
            ...initialValues,
            inverter_type: 1,
            inverterType: deviceConfigDropdown?.inverterType[0] || null,
            meter_type: null,
            meterType: null,
          });
        }
        await fetchImage(initialValues?.device_type?.image);
      }, 100);
  }, [initialValues?.device_type?.label]);

  const fetchImage = async (path, pos = "4", id = null) => {
    const posMap = {
      0: "top",
      1: "left",
      2: "bottom",
      3: "right",
      4: "center",
    };
    if (!path) return;
    const absolutePath = await import("../../../../../assets/images/" + path);
    const demoContainer = document.querySelector("#demo");
    if (demoContainer) {
      const posContainer = demoContainer.querySelector(
        `#${posMap[parseInt(pos)]}`
      );
      if (posContainer) {
        const componentId = `id="component_${id}"`;
        posContainer.innerHTML = `<img ${componentId} src="${absolutePath.default}" alt=""/>`;

        if (pos !== "4") {
          const connectLine = await import(
            "../../../../../assets/images/connect-line.svg"
          );
          const lineId = `id="line_${id}"`;
          posContainer.innerHTML += `<img ${lineId} src="${connectLine.default}" alt=""/>`;
        }
      }
    }
  };

  const clearDemoImage = () => {
    const demoContainer = document.querySelector("#demo");
    if (demoContainer) {
      demoContainer.querySelector("#top").innerHTML = "";
      demoContainer.querySelector("#bottom").innerHTML = "";
      demoContainer.querySelector("#center").innerHTML = "";
      demoContainer.querySelector("#left").innerHTML = "";
      demoContainer.querySelector("#right").innerHTML = "";
    }
  };

  const updateAddingComponent = (deviceType = null) => {
    const id_device_type = deviceType?.value || initialValues?.id_device_type;
    let haveComponents = deviceTypeComponents?.find((item) => {
      if (item.device_type.id === id_device_type && item.component.length > 0) {
        return true;
      }
      return false;
    });
    var newAddingComponents = [];
    if (!_.isEmpty(haveComponents)) {
      newAddingComponents = haveComponents.component
        .filter((item) => item.type === 1 && !item.require)
        .map((item) => {
          const quantity = item.quantity || 1;
          const components = [];
          for (let i = 0; i < quantity; i++) {
            components.push({
              value: item.components[0].id,
              label: item.components[0].name,
              image: item.components[0].image,
              plug_point: item.plug_point[i],
              id: Math.random().toString(36).slice(2, 9),
            });
          }
          return {
            ...item,
            components: components,
          };
        });
    }

    setTimeout(() => {
      setAddingComponents(newAddingComponents);
      setHaveComponents(haveComponents);
      newAddingComponents.forEach(async (item) => {
        if (item.components) {
          for (let i = 0; i < item.components.length; i++) {
            await fetchImage(
              item.components[i].image,
              item.components[i].plug_point,
              item.components[i].id
            );
          }
        }
      });
    }, 100);
  };

  useEffect(() => {
    if (_.isEmpty(updatingComponent)) return;

    const e = updatingComponent;
    if (!_.isEmpty(e.image)) {
      const component = document.getElementById(`component_${e.rowId}`);
      const newImage = import(`../../../../../assets/images/${e.image}`);
      newImage.then((image) => {
        component.src = image.default;
      });
    }
    const updateAddingComponents = _.cloneDeep(addingComponents).map((item) => {
      if (item.group === e.group) {
        const newComponents = item.components.map((i) => {
          if (i.id === e.rowId) {
            return {
              ...i,
              ...e,
            };
          }
          return i;
        });
        return {
          ...item,
          components: newComponents,
        };
      }
      return item;
    });

    setTimeout(() => {
      setAddingComponents(updateAddingComponents);
      setUpdatingComponent(null);
    }, 100);
  }, [updatingComponent]);

  const openAddMultipleDevice = () => setIsAddMultipleDevice(true);
  const closeAddMultipleDevice = () => {
    setTimeout(() => {
      setIsAddMultipleDevice(false);
      setIsOpenAddMultipleDevice(false);
      setInitialValues({
        ...initialValues,
        num_of_devices: 1,
        inc_mode: 1,
        is_add: false,
      });
    }, 100);
  };

  const [deviceConfigDropdown, setDeviceConfigDropdown] = useState(null);
  useEffect(() => {
    if (deviceConfig) {
      setTimeout(() => {
        const { device_types, device_groups, template, communication } =
          deviceConfig;
        setDeviceConfigDropdown(() => {
          return {
            deviceType:
              device_types &&
              device_types.map((item) => ({
                value: item.id,
                label: item.name,
                type: item.type,
                image: item.image,
              })),
            deviceGroup: [
              {
                label: "Custom",
                options:
                  device_groups &&
                  device_groups
                    .filter((item) => item.type === 1)
                    ?.map((item) => {
                      return {
                        value: item.id,
                        label: item.name,
                        id_device_type: item.id_device_type,
                      };
                    }),
              },
              {
                label: "Built-in",
                options:
                  device_groups &&
                  device_groups
                    .filter((item) => item.type === 0)
                    ?.map((item) => {
                      return {
                        value: item.id,
                        label: item.name,
                        id_device_type: item.id_device_type,
                      };
                    }),
              },
            ],
            template: [
              {
                label: "Custom",
                options:
                  template &&
                  template
                    .filter((item) => item.type === 1)
                    ?.map((item) => {
                      return {
                        value: {
                          id_template: item.id,
                          id_device_group: item.id_device_group,
                        },
                        label: item.name,
                      };
                    }),
              },
              {
                label: "Built-in",
                options:
                  template &&
                  template
                    .filter((item) => item.type === 0)
                    ?.map((item) => {
                      return {
                        value: {
                          id_template: item.id,
                          id_device_group: item.id_device_group,
                        },
                        label: item.name,
                      };
                    }),
              },
            ].flat(),
            communicationProtocol:
              communication &&
              communication.map((item) => ({
                value: item.id,
                label: item.namekey,
              })),
            // 1: central inverter,2: string inverter, 3: hybrid inverter
            inverterType: [
              {
                value: 1,
                label: "Central Inverter",
              },
              {
                value: 2,
                label: "String Inverter",
              },
              {
                value: 3,
                label: "Hybrid Inverter",
              },
            ],
          };
        });
      }, 100);
    }
  }, [deviceConfig]);

  useEffect(() => {
    deviceConfigDropdown &&
      Object.keys(deviceConfigDropdown).length > 0 &&
      setTimeout(() => {
        let communication = initialValues?.communication
          ? initialValues?.communication
          : deviceConfigDropdown?.communicationProtocol[0] || [];
        setInitialValues({
          ...initialValues,
          id_communication: communication?.value,
          communication: communication,
          id_device_type: initialValues?.id_device_type,
          device_type: initialValues?.device_type,
          device_group: initialValues?.device_group,
          id_device_group: initialValues?.id_device_grou,
          id_template: initialValues?.id_template,
          template: initialValues?.template,
          inverterType: initialValues?.inverterType,
          meterType: initialValues?.meterType,
          rated_power: initialValues?.rated_power,
        });
      }, 100);
  }, [deviceConfigDropdown]);

  const handleAddMultipleDevice = (data) => {
    data = {
      ...data,
      is_add: true,
    };
    setTimeout(() => {
      setInitialValues({ ...initialValues, ...data });
      setData(data);
    }, 100);
  };

  const handleSave = (data) => {
    setTimeout(() => {
      let newData = {
        ...data,
        ...(initialValues?.communication?.label.search(/COM\w*/g) !== -1 && {
          tcp_gateway_ip: "",
          tcp_gateway_port: null,
        }),
        components: !_.isEmpty(addingComponents)
          ? addingComponents
              .map((item) => {
                const components = item.components.map((i) => ({
                  id: null,
                  name: i.component_name,
                  id_device_type: i.value,
                  group: item.group,
                }));
                return components;
              })
              .flat()
          : [],
      };
      setData(newData);

      setInitialValues({ ...initialValues, ...newData });
      if (initialValues?.device_type?.type === 0 && !data?.id_template) {
        LibToast.toast("Please select a template", "error");
        return;
      }
      if (isOpenAddMultipleDevice) {
        openAddMultipleDevice();
        return;
      }

      handleAddMultipleDevice({ ...initialValues, ...newData });
    }, 100);
  };

  useEffect(() => {
    if (initialValues?.is_add) {
      const output = document.getElementById("progress");
      output.innerHTML = "<div><img src='/loading.gif' /></div>";
      setTimeout(async () => {
        try {
          const response = await axiosPrivate.post(
            Constants.API_URL.DEVICES.ADD + `?page=${offset}&limit=${limit}`,
            data,
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          setAllDevices(
            response.data?.data.map((d) => {
              d["state"] = 2;
              return d;
            })
          );
          setTotal(response.data?.total);
          LibToast.toast(
            "New devices are being added. It would take a few minutes.",
            "info"
          );
          if (isAddMultipleDevice) {
            closeAddMultipleDevice();
          }
          closeAddDevice();
        } catch (error) {
          setInitialValues({ ...initialValues, is_add: false });
          loginService.handleMissingInfo(error, "Failed to add device") &&
            navigate("/", { replace: true });
        } finally {
          output.innerHTML = "";
        }
      }, 500);
    }
  }, [initialValues?.is_add]);

  const onGroupCreateOption = (e) => {
    setTimeout(async () => {
      if (e === "") return;

      let body = {
        id_device_type: initialValues?.id_device_type,
        name: e,
      };

      try {
        const response = await axiosPrivate.post(
          Constants.API_URL.DEVICES.CONFIG.ADD_GROUP,
          body
        );

        if (response.status === 200) {
          LibToast.toast("Device group created successfully", "success");
          setDeviceConfig((prev) => ({
            ...prev,
            device_groups: [
              ...prev.device_groups,
              {
                id: response.data.id,
                name: e,
                id_device_type: initialValues?.id_device_type,
                status: 1,
                type: 1,
              },
            ],
          }));
          let newDeviceGroups = _.cloneDeep(deviceConfigDropdown.deviceGroup);
          newDeviceGroups[0].options.push({
            label: e,
            value: response.data.id,
            id_device_type: initialValues?.id_device_type,
          });
          setDeviceConfigDropdown((prev) => ({
            ...prev,
            deviceGroup: newDeviceGroups,
          }));
          setInitialValues({
            ...initialValues,
            id_device_group: response.data.id,
            device_group: { value: response.data.id, label: e },
            id_template: null,
            template: null,
          });
        }
      } catch (error) {
        loginService.handleMissingInfo(
          error,
          "Failed to create device group"
        ) && navigate("/", { replace: true });
      }
    }, 100);
  };

  return {
    isAddMultipleDevice,
    setIsAddMultipleDevice,
    isOpenAddMultipleDevice,
    setIsOpenAddMultipleDevice,
    isOpenAddComponents,
    setIsOpenAddComponents,
    addingComponents,
    setAddingComponents,
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
    columns,
    haveComponents,
    onGroupCreateOption,
    clearDemoImage,
    fetchImage,
    updateAddingComponent,
  };
}
