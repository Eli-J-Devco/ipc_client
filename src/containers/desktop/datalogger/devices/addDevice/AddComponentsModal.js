import { useEffect, useState } from "react";
import Button from "../../../../../components/button/Button";
import FormInput from "../../../../../components/formInput/FormInput";
import { ReactComponent as AddIcon } from "../../../../../assets/images/add.svg";
import { ReactComponent as DeleteIcon } from "../../../../../assets/images/delete.svg";
import { ReactComponent as RefreshIcon } from "../../../../../assets/images/refresh.svg";
import styles from "./AddDevice.module.scss";
import LibToast from "../../../../../utils/LibToast";
import _ from "lodash";
import { useDeviceManagement } from "../DeviceManagement";

export function AddComponentsModal({ close, components, setComponents }) {
  const { deviceTypes, deviceGroups, templates } = components;
  const [rowSelection, setRowSelection] = useState([]);
  const [selectedDropdown, setSelectedDropdown] = useState({});
  const [addingComponents, setAddingComponents] = useState([
    {
      device_type: "",
      device_group: "",
      template: "",
      device: "",
    },
  ]);
  const { allDevices } = useDeviceManagement();
  const [cloneDevices, setCloneDevices] = useState(_.cloneDeep(allDevices));

  const removeComponents = (all = false) => {
    if (all) {
      setAddingComponents([]);
      setRowSelection([]);
      setCloneDevices(_.cloneDeep(allDevices));
      return;
    }

    if (Object.keys(rowSelection).length === 0) {
      LibToast.toast("Please select at least one component to remove", "error");
      return;
    }

    let selectedComponents = Object.keys(rowSelection).map((key) =>
      parseInt(key)
    );
    setAddingComponents(
      addingComponents.filter((_, index) => !selectedComponents.includes(index))
    );
    setCloneDevices(
      cloneDevices.map((item) => {
        if (item.selected) {
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
    if (_.isEmpty(selectedDropdown)) return;

    setAddingComponents(
      addingComponents.map((item, idx) => {
        if (idx === parseInt(selectedDropdown.index))
          return {
            ...item,
            [selectedDropdown.type]: selectedDropdown.value,
          };
        return item;
      })
    );
    setSelectedDropdown({});
  }, [selectedDropdown]);

  return (
    <>
      <div className={styles.add_component}>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Device Type</th>
              <th>Device Group</th>
              <th>Template</th>
              <th>Device</th>
            </tr>
          </thead>
          <tbody>
            {addingComponents.map((item, index) => {
              return (
                <tr key={index}>
                  <td>
                    <FormInput.Check
                      inline={true}
                      label={index}
                      name={index}
                      checked={rowSelection[index]}
                      onChange={() => {
                        setRowSelection({
                          ...rowSelection,
                          [index]: !rowSelection[index] ? true : false,
                        });
                      }}
                    />
                  </td>
                  <td>
                    <FormInput.Select
                      name={"device[" + index + "].device_type"}
                      option={deviceTypes}
                      required={true}
                      isSearchable={true}
                      value={item.device_type}
                      onChange={(e) => {
                        setSelectedDropdown({
                          index: index,
                          type: "device_type",
                          value: e,
                        });
                      }}
                    />
                  </td>
                  <td>
                    <FormInput.Select
                      name={"device[" + index + "].device_group"}
                      option={deviceGroups.map((item) => {
                        let option = item.options.filter(
                          (item) =>
                            item.id_device_type ===
                            addingComponents[index].device_type.value
                        );
                        return {
                          label: item.label,
                          options: option,
                        };
                      })}
                      required={true}
                      isSearchable={true}
                      isDisabled={_.isEmpty(
                        addingComponents[index]?.device_type
                      )}
                      value={addingComponents[index]?.device_group}
                      onChange={(e) => {
                        setSelectedDropdown({
                          index: index,
                          type: "device_group",
                          value: e,
                        });
                      }}
                    />
                  </td>
                  <td>
                    <FormInput.Select
                      name={"device[" + index + "].template"}
                      option={templates.map((item) => {
                        let option = item.options.filter(
                          (item) =>
                            item.value.id_device_group ===
                            addingComponents[index].device_group.value
                        );
                        return {
                          label: item.label,
                          options: option,
                        };
                      })}
                      required={true}
                      isSearchable={true}
                      isDisabled={_.isEmpty(
                        addingComponents[index]?.device_group
                      )}
                      value={addingComponents[index]?.template}
                      onChange={(e) => {
                        setSelectedDropdown({
                          index: index,
                          type: "template",
                          value: e,
                        });
                      }}
                    />
                  </td>
                  <td>
                    <FormInput.Select
                      name={"device[" + index + "].device"}
                      option={cloneDevices
                        .filter((item) => {
                          if (item.parent !== null) return false;

                          if (item.selected) return false;

                          if (
                            item.id_template ===
                            addingComponents[index]?.template?.value
                              ?.id_template
                          )
                            return true;

                          return false;
                        })
                        .map((item) => {
                          return {
                            label: item.name,
                            value: item,
                          };
                        })}
                      required={true}
                      isSearchable={true}
                      isDisabled={_.isEmpty(addingComponents[index]?.template)}
                      isClearable={true}
                      value={addingComponents[index]?.device}
                      onChange={(e) => {
                        setSelectedDropdown({
                          index: index,
                          type: "device",
                          value: e,
                        });
                        if (e === null) {
                          setCloneDevices(
                            cloneDevices.map((item) => {
                              if (
                                item.id_device ===
                                addingComponents[index].device.value.id_device
                              ) {
                                return {
                                  ...item,
                                  selected: false,
                                };
                              }
                              return item;
                            })
                          );
                          return;
                        }

                        setCloneDevices(
                          cloneDevices.map((item) => {
                            if (item.id_device === e.value.id_device) {
                              return {
                                ...item,
                                selected: true,
                              };
                            }
                            return item;
                          })
                        );
                      }}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div
        style={{
          position: "absolute",
          top: 0,
          right: -40,
          zIndex: -1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Button
          className="w-25"
          variant="white"
          onClick={() => {
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
          }}
        >
          <Button.Image image={<AddIcon />} />
        </Button>
        <Button
          className="w-25"
          variant="white"
          onClick={() => removeComponents()}
        >
          <Button.Image image={<DeleteIcon />} />
        </Button>
        <Button
          className="w-25"
          variant="white"
          onClick={() => removeComponents(true)}
        >
          <Button.Image image={<RefreshIcon />} />
        </Button>
      </div>

      <div className="mt-3 mb-2">
        <Button
          variant="dark"
          onClick={() => {
            if (
              addingComponents.length === 0 ||
              addingComponents.some((item) => !item.device)
            ) {
              LibToast.toast(
                "Please add at least one device for each component",
                "error"
              );
              return;
            }

            setComponents(addingComponents);
            close();
          }}
        >
          <Button.Text text="Save" />
        </Button>
        <Button variant="grey" className="ms-3" onClick={close}>
          <Button.Text text="Cancel" />
        </Button>
      </div>
    </>
  );
}
