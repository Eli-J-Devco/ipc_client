import Button from "../../../../../components/button/Button";
import FormInput from "../../../../../components/formInput/FormInput";
import { ReactComponent as AddIcon } from "../../../../../assets/images/add.svg";
import { ReactComponent as DeleteIcon } from "../../../../../assets/images/delete.svg";
import { ReactComponent as RefreshIcon } from "../../../../../assets/images/refresh.svg";
import styles from "./AddDevice.module.scss";
import LibToast from "../../../../../utils/LibToast";
import _ from "lodash";
import useAddComponentsModal from "./useAddComponentsModal";
import { Tooltip } from "react-tooltip";
import ModalDefault from "react-bootstrap/Modal";

export function AddComponentsModal({ close, components, setComponents }) {
  const { deviceTypes, templates, existedComponents } = components;
  const {
    addingComponents,
    rowSelection,
    setRowSelection,
    cloneDevices,
    removeComponents,
    handleDeviceTypeChange,
    handleDeviceGroupChange,
    handleTemplateChange,
    handleDeviceChange,
    onCreateOption,
    onGroupCreateOption,
    addComponent,
    deviceGroups,
    confirmCreateGroup,
    setConfirmCreateGroup,
  } = useAddComponentsModal(components.deviceGroups, existedComponents);
  return (
    <>
      {confirmCreateGroup.show && (
        <ModalDefault
          show={confirmCreateGroup.show}
          style={{ top: "100px", marginTop: "5vh" }}
          onHide={() =>
            setConfirmCreateGroup({
              ...confirmCreateGroup,
              show: false,
            })
          }
        >
          <ModalDefault.Header
            style={{ backgroundColor: "#383434", color: "#fff" }}
          >
            Confirm
          </ModalDefault.Header>
          <ModalDefault.Body>
            Are you sure you want to create a new device group?
          </ModalDefault.Body>
          <ModalDefault.Footer>
            <Button
              variant="white"
              onClick={() => {
                setConfirmCreateGroup({
                  ...confirmCreateGroup,
                  show: false,
                });
              }}
            >
              <Button.Text text="Cancel" />
            </Button>
            <Button
              variant="dark"
              onClick={() => {
                setConfirmCreateGroup({
                  ...confirmCreateGroup,
                  show: false,
                  confirm: true,
                });
              }}
            >
              <Button.Text text="Confirm" />
            </Button>
          </ModalDefault.Footer>
        </ModalDefault>
      )}
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
                      onChange={(e) => handleDeviceTypeChange(e, index)}
                    />
                  </td>
                  <td>
                    <FormInput.CreatableSelect
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
                      onChange={(e) => handleDeviceGroupChange(e, index)}
                      onCreateOption={(e) => onGroupCreateOption(e, index)}
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
                      isDisabled={
                        _.isEmpty(addingComponents[index]?.device_group) ||
                        addingComponents[index]?.device_type?.type === 1
                      }
                      value={addingComponents[index]?.template}
                      onChange={(e) => handleTemplateChange(e, index)}
                      info={
                        addingComponents[index]?.device_type?.type === 1 &&
                        "This device type does not require a template"
                      }
                      horizontal={true}
                    />
                    <Tooltip id="my-tooltip" place="bottom-start" />
                  </td>
                  <td>
                    <FormInput.CreatableSelect
                      name={"device[" + index + "].device"}
                      option={cloneDevices
                        .filter((item) => {
                          if (item.parent !== null) return false;

                          if (item.selected) return false;

                          if (
                            item.id_template ===
                              addingComponents[index]?.template?.value
                                ?.id_template &&
                            addingComponents[index]?.device_type?.type !== 1
                          )
                            return true;

                          if (
                            addingComponents[index]?.device_type?.type === 1 &&
                            item.id_device_type ===
                              addingComponents[index]?.device_type?.value
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
                      isDisabled={
                        (_.isEmpty(addingComponents[index]?.template) &&
                          addingComponents[index]?.device_type?.type !== 1) ||
                        _.isEmpty(addingComponents[index]?.device_group)
                      }
                      value={addingComponents[index]?.device}
                      onChange={(e) => handleDeviceChange(e, index)}
                      onCreateOption={(e) => onCreateOption(e, index)}
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
        <Button className="w-25" variant="white" onClick={addComponent}>
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
              addingComponents.length > 0 &&
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
