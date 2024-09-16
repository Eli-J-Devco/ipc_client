import { useEffect, useState } from "react";
import _ from "lodash";
import FormInput from "../../../../../components/formInput/FormInput";
import { createColumnHelper } from "@tanstack/react-table";
import useAxiosPrivate from "../../../../../hooks/useAxiosPrivate";
import Constants from "../../../../../utils/Constants";
import LibToast from "../../../../../utils/LibToast";
import { useDeviceManagement } from "../DeviceManagement";

export default function useAddComponents(
  haveComponents,
  addingComponents,
  setAddingComponents,
  isUpdateDevice = false
) {
  const axiosPrivate = useAxiosPrivate();
  const [updatingComponent, setUpdatingComponent] = useState({});
  const [isFull, setIsFull] = useState(false);
  const posOptions = [
    {
      label: "Top",
      value: "0",
    },
    {
      label: "Left",
      value: "1",
    },
    {
      label: "Bottom",
      value: "2",
    },
    {
      label: "Right",
      value: "3",
    },
  ];
  const { device, serviceUtils } = useDeviceManagement();
  const [dataTable, setDataTable] = useState([]);

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
      size: 200,
      header: "Device Type Group",
      cell: ({ row }) => {
        const options = !row.original.component.plug_point
          ? haveComponents.component
              .filter(
                (item) => item.plug_point === row.original.component.plug_point
              )
              .map((item) => ({
                label: item.name,
                value: item.group,
              }))
          : haveComponents.component
              .filter((item) => {
                const numOfAddedGroup = addingComponents.find(
                  (addedItem) => addedItem.group === item.group
                )?.components?.length;
                return numOfAddedGroup < item.quantity || !item.quantity;
              })
              .map((item) => {
                return {
                  label: item.name,
                  value: item.group,
                  plug_point: item.plug_point,
                };
              });
        return (
          <FormInput.Select
            name="group"
            value={{ label: row.original.name, value: row.original.group }}
            option={options}
            isDisabled={options.length <= 1}
            onChange={(e) => {
              setUpdatingComponent({
                plug_point: e.plug_point,
                group: e.value,
                rowId: row.original.component.id,
              });
            }}
          />
        );
      },
    }),
    columnsHelper.accessor("device_type", {
      id: "device_type",
      size: 300,
      header: "Device Type",
      cell: ({ row }) => {
        const options =
          !_.isEmpty(haveComponents) &&
          _.cloneDeep(haveComponents)
            ?.component.filter((item) => item.group === row.original.group)
            .map((item) =>
              item.components.map((i) => ({
                label: i.name,
                value: i.id,
                image: i.image,
                rowId: row.original.component.id,
                group: row.original.group,
                plug_point: row.original.plug_point,
              }))
            )
            .flat();
        return (
          <FormInput.Select
            name="device_type"
            value={row.original.component}
            option={options}
            onChange={(e) => setUpdatingComponent(e)}
            isDisabled={options.length === 0}
          />
        );
      },
    }),
    columnsHelper.accessor("name", {
      id: "name",
      size: 200,
      header: "Component Name",
      cell: ({ row }) => {
        return !isUpdateDevice ? (
          <FormInput.Text
            name="component_name"
            value={row.original.component.component_name || row.original.name}
            onChange={(e) => {
              setUpdatingComponent({
                component_name: e.target.value,
                rowId: row.original.component.id,
                group: row.original.group,
              });
            }}
          />
        ) : (
          <FormInput.AsyncSelect
            name="component_name"
            value={{
              label: `${
                typeof row.original.component.id === "number" &&
                row.original.component.component_name.split("|").length === 1
                  ? row.original.component.id + " | "
                  : ""
              }${row.original.component.component_name || ""}`,
              value: row.original.component.id,
            }}
            option={[]}
            isSearchable={true}
            loadOptions={(searchText, callback) =>
              searchDevicesCallback(
                searchText,
                callback,
                row.original.component.value
              )
            }
            onChange={(e) => {
              setUpdatingComponent({
                component_name: e.label,
                rowId: row.original.component.id,
                group: row.original.group,
                id: e.value,
                plug_point: row.original.plug_point,
              });
            }}
            placeholder="Search component"
          />
        );
      },
    }),
    columnsHelper.accessor("plug_point", {
      id: "plug_point",
      size: 200,
      header: "Position",
      cell: ({ row }) => {
        const acceptablePlugPoint =
          isUpdateDevice &&
          posOptions.filter((item) =>
            haveComponents.component
              .filter((item) => item.group === row.original.group)
              .map((item) => item.plug_point)
              .flat()
              .includes(parseInt(item.value))
          );
        return isUpdateDevice ? (
          <FormInput.Select
            name="plug_point"
            value={posOptions.find(
              (item) =>
                parseInt(item.value) ===
                parseInt(row.original.component.plug_point)
            )}
            option={acceptablePlugPoint}
            onChange={(e) => {
              setUpdatingComponent({
                plug_point: e.value,
                rowId: row.original.component.id,
                group: row.original.group,
              });
            }}
            isDisabled={
              row.original.require || acceptablePlugPoint.length === 1
            }
          />
        ) : (
          <div>
            {posOptions.find((item) => item.value === row.original.plug_point)
              ?.label || ""}
          </div>
        );
      },
    }),
  ];

  useEffect(() => {
    if (_.isEmpty(updatingComponent)) return;

    const e = updatingComponent;
    if (!_.isEmpty(e.image) && !isUpdateDevice) {
      const component = document.getElementById(`component_${e.rowId}`);
      const newImage = import(`../../../../../assets/images/${e.image}`);
      newImage.then((image) => {
        component.src = image.default;
      });
    }
    const isExistComponent = addingComponents.find((item) =>
      item.components.find((i) => i.id === e.rowId)
    );

    var updateAddingComponents = addingComponents;
    if (!_.isEmpty(isExistComponent)) {
      if (isExistComponent.group !== e.group) {
        updateAddingComponents = addingComponents.map((item) => {
          if (item.group === isExistComponent.group) {
            return {
              ...item,
              components: item.components.filter((i) => i.id !== e.rowId),
            };
          }

          return item;
        });
      }
    }
    updateAddingComponents = updateAddingComponents.map((item) => {
      if (item.group === e.group && item.plug_point === e.plug_point) {
        const isNewComponent = item.components.find((i) => i.id === e.rowId);
        if (!isNewComponent) {
          const newComponent = dataTable.find(
            (i) => i.component.id === e.rowId
          ).component;
          return {
            ...item,
            components: [
              ...item.components,
              {
                ...e,
                rowId: null,
                id: Math.random().toString(36).slice(2, 9),
                ...(_.isEmpty(isExistComponent) && newComponent),
              },
            ],
          };
        }
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

  const addNewComponent = () => {
    if (isFull) {
      LibToast.toast("All components are added", "error");
      return;
    }
    setTimeout(() => {
      setDataTable([
        ...dataTable,
        {
          id: dataTable.length,
          group: "",
          device_type: "",
          name: "",
          plug_point: "",
          component: {
            id: Math.random().toString(36).slice(2, 9),
            component_name: "",
            plug_point: "",
          },
        },
      ]);
    }, 100);
  };

  useEffect(() => {
    if (_.isEmpty(addingComponents)) return;

    setDataTable(
      addingComponents
        .map((item) => {
          const defaultInfo = {
            ...item,
          };
          delete defaultInfo.components;
          const output =
            item.components.map((component) => {
              return {
                ...defaultInfo,
                component,
              };
            }) || [];
          return output;
        })
        .flat()
        .map((item, index) => ({
          ...item,
          id: index,
        }))
    );

    const isFull =
      haveComponents.component.filter((item) => {
        const numOfAddedGroup = addingComponents
          .filter((addedItem) => addedItem.plug_point === item.plug_point)
          .map((item) => item.components)
          .flat().length;
        return numOfAddedGroup < item.quantity;
      }).length < 1;
    setIsFull(isFull);
  }, [addingComponents, haveComponents]);

  const [searchValue, setSearchValue] = useState("");
  const searchDevices = ({ callback, searchText, idDeviceType }) => {
    setTimeout(async () => {
      const response = await axiosPrivate.post(
        Constants.API_URL.DEVICES.COMPONENT.SEARCH,
        {
          name: searchText,
          id_device_type: idDeviceType,
          exclude: addingComponents
            .map((item) => item.components)
            .flat()
            .filter((item) => typeof item.id === "number")
            .map((item) => item.id),
          parent: device.id,
        }
      );
      callback(
        response.data.map((item) => ({
          label: item.id + " | " + item.name,
          value: item.id,
        }))
      );
    }, 100);
  };

  const searchDevicesCallback = (searchText, callback, idDeviceType) => {
    setSearchValue({ callback, searchText, idDeviceType });
  };

  useEffect(() => {
    if (!searchValue) return;

    const timeout = setTimeout(() => {
      searchDevices(searchValue);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [searchValue]);

  return {
    columns,
    addNewComponent,
    dataTable,
  };
}
