import { useEffect, useState } from "react";
import { useDeviceManagement } from "../DeviceManagement";
import LibToast from "../../../../../utils/LibToast";
import _ from "lodash";
import useAxiosPrivate from "../../../../../hooks/useAxiosPrivate";
import Constants from "../../../../../utils/Constants";

export default function useAddComponentsModal(existedComponents) {
  const { axiosPrivate } = useAxiosPrivate();
  const [rowSelection, setRowSelection] = useState([]);
  const [addingComponents, setAddingComponents] = useState([]);
  const { allDevices } = useDeviceManagement();
  const [cloneDevices, setCloneDevices] = useState([]);

  useEffect(() => {
    if (_.isEmpty(existedComponents)) return;
    setAddingComponents(existedComponents);
  }, [existedComponents]);

  const removeComponents = (all = false) => {
    if (all) {
      setAddingComponents([]);
      setRowSelection([]);
      setCloneDevices(
        cloneDevices.map((item) => ({ ...item, selected: false }))
      );
      return;
    }

    if (Object.keys(rowSelection).length === 0) {
      LibToast.toast("Please select at least one component to remove", "error");
      return;
    }

    let selectedComponents = Object.keys(rowSelection).map((key) =>
      parseInt(key)
    );
    let removeDevices = addingComponents
      .filter((_, index) => {
        return !selectedComponents.includes(index);
      })
      .map((item) => item.device?.value?.id);
    setAddingComponents(
      addingComponents.filter((_, index) => !selectedComponents.includes(index))
    );
    setCloneDevices(
      cloneDevices.map((item) => {
        if (item.selected && !removeDevices.includes(item.id)) {
          return {
            ...item,
            selected: false,
          };
        }
        return item;
      })
    );

    setRowSelection([]);
  };

  useEffect(() => {
    if (_.isEmpty(allDevices)) return;

    if (!_.isEmpty(cloneDevices) || _.isEqual(allDevices, cloneDevices)) {
      return;
    }

    setCloneDevices(
      _.cloneDeep([
        ...allDevices.map((item) => {
          if (
            existedComponents.some(
              (component) => component.device?.value?.id === item.id
            )
          ) {
            return {
              ...item,
              selected: true,
            };
          }
          return {
            ...item,
            selected: false,
          };
        }),
        ...existedComponents
          .filter((item) => {
            if (!item.device) return false;

            if (
              allDevices.some((device) => device.id === item.device.value.id)
            ) {
              return false;
            }

            return true;
          })
          .map((item) => {
            return {
              id: item.device.value.id,
              name: item.device.label,
              id_template: item.template?.value?.id_template,
              id_device_type: item.device_type?.value,
              id_device_group: item.device_group?.value,
              selected: true,
              parent: null,
            };
          }),
      ])
    );
  }, [cloneDevices, allDevices]);

  const handleDeviceTypeChange = (e, index) => {
    setTimeout(() => {
      setAddingComponents(
        addingComponents.map((item, idx) => {
          if (idx === index) {
            return {
              ...item,
              device_type: e,
              device_group: "",
              template: "",
              device: "",
            };
          }
          return item;
        })
      );
    });
  };

  const handleDeviceGroupChange = (e, index) => {
    setTimeout(() => {
      setAddingComponents(
        addingComponents.map((item, idx) => {
          if (idx === index) {
            return {
              ...item,
              device_group: e,
              template: "",
              device: "",
            };
          }
          return item;
        })
      );
    }, 100);
  };

  const handleTemplateChange = (e, index) => {
    setTimeout(() => {
      setAddingComponents(
        addingComponents.map((item, idx) => {
          if (idx === index) {
            return {
              ...item,
              template: e,
              device: "",
            };
          }
          return item;
        })
      );
    }, 100);
  };

  const handleDeviceChange = (e, index) => {
    setTimeout(() => {
      let resetDevice = addingComponents[index]?.device;
      setAddingComponents(
        addingComponents.map((item, idx) => {
          if (idx === index) {
            return {
              ...item,
              device: e,
            };
          }
          return item;
        })
      );

      setCloneDevices(
        cloneDevices.map((item) => {
          if (item.id === e.value.id) {
            return {
              ...item,
              selected: true,
            };
          }

          if (resetDevice?.value?.id && item.id === resetDevice.value.id) {
            return {
              ...item,
              selected: false,
            };
          }
          return item;
        })
      );
    }, 100);
  };

  const onCreateOption = (e, index) => {
    setTimeout(() => {
      if (e === "") return;

      let devices = cloneDevices;
      if (addingComponents[index]?.device) {
        devices = devices.map((item) => {
          if (item.id === addingComponents[index].device.value.id) {
            return {
              ...item,
              selected: false,
            };
          }
          return item;
        });
      }

      let newItem = {
        id: _.uniqueId("device_"),
        name: e,
        id_template: addingComponents[index]?.template?.value?.id_template,
        id_device_type: addingComponents[index]?.device_type?.value,
        id_device_group: addingComponents[index]?.device_group?.value,
        selected: true,
        parent: null,
      };
      setCloneDevices([...devices, newItem]);
      setAddingComponents(
        addingComponents.map((item, idx) => {
          if (idx === index) {
            return {
              ...item,
              device: {
                label: e,
                value: newItem,
              },
            };
          }
          return item;
        })
      );
    }, 100);
  };

  const onGroupCreateOption = (e, index) => {
    setTimeout(async () => {
      if (e === "") return;

      let body = {
        id_device_type: addingComponents[index]?.device_type?.value,
        name: e,
      };

      const response = await axiosPrivate.post(
        Constants.API_URL.DEVICES.CONFIG.GROUP,
        body
      );
    }, 100);
  };

  const addComponent = () => {
    setTimeout(() => {
      setAddingComponents([
        ...addingComponents,
        {
          device_type: "",
          device_group: "",
          template: "",
          device: "",
        },
      ]);
    }, 100);
  };

  return {
    addingComponents,
    setAddingComponents,
    removeComponents,
    rowSelection,
    setRowSelection,
    cloneDevices,
    handleDeviceTypeChange,
    handleDeviceGroupChange,
    handleTemplateChange,
    handleDeviceChange,
    onCreateOption,
    onGroupCreateOption,
    addComponent,
  };
}
