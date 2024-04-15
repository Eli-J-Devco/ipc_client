import { useEffect, useState } from "react";
import Button from "../../../../../../../components/button/Button";
import FormInput from "../../../../../../../components/formInput/FormInput";
import Modal from "../../../../../../../components/modal/Modal";
import { useTemplate } from "../../useTemplate";
import styles from "./EditPointModal.module.scss";
import useEditPointModal from "./useEditPointModal";
import _ from "lodash";

function EditPointModal({ isOpen, close, data, setPoint }) {
  const [currentData, setCurrentData] = useState(data);

  const {
    initialValues,
    validationSchema,
    modbusConfig,
    setModbusConfig,
    modbusRegisterType,
    setModbusRegisterType,
    selectedUnit,
    setSelectedUnit,
    selectedDataType,
    setSelectedDataType,
    selectedByteOrder,
    setSelectedByteOrder,
    selectedPointListType,
    setSelectedPointListType,
    onSubmit,
  } = useEditPointModal(currentData, close, setPoint, setCurrentData);
  const { config } = useTemplate();
  const [pointUnits, setPointUnits] = useState([]);

  const {
    data_type,
    byte_order,
    point_unit,
    type_point,
    type_class,
    type_point_list,
  } = config;
  useEffect(() => {
    if (Object.keys(config).length > 0) {
      setTimeout(() => {
        setModbusConfig(currentData?.type_point);
        setModbusRegisterType(currentData?.type_class);

        let unitGroup = point_unit.filter((item) =>
          item?.namekey.match(/---/i)
        );
        let units = [];
        unitGroup.forEach((group) => {
          let firstItemIndex = point_unit.indexOf(group) + 1;
          let lastItemIndex = point_unit.indexOf(
            point_unit.find(
              (item, index) =>
                index > firstItemIndex && item?.namekey.match(/---/i)
            )
          );
          units.push({
            label: group?.namekey.replaceAll("-", "").trim(),
            options: point_unit
              .slice(firstItemIndex, lastItemIndex)
              .map((item) => ({ value: item?.id, label: item?.namekey })),
          });
        });
        setPointUnits(units);
      }, 100);
    }
  }, [config, currentData]);

  return (
    currentData &&
    Object.keys(config).length > 0 && (
      <Modal
        isOpen={isOpen}
        close={close}
        size="xl"
        title="Edit Point"
        footer={
          <>
            <Button
              type="submit"
              formId="point-configuration-form"
              className="m-0"
            >
              <Button.Text text="Save" />
            </Button>

            <Button variant="white" className="m-0 ms-3" onClick={close}>
              <Button.Text text="Cancel" />
            </Button>
          </>
        }
      >
        <FormInput
          id="point-configuration-form"
          onSubmit={onSubmit}
          initialValues={initialValues}
          validationSchema={validationSchema}
        >
          <div className="row my-2">
            <div className="col-4">
              <FormInput.Text label="Point Identifier:" name="index" disabled />
            </div>
            <div className="col-1"></div>
            <div className="col-5">
              <FormInput.Select
                label="Point list type:"
                isSearchable={true}
                name="type_point_list"
                option={
                  type_point_list.map((item) => ({
                    value: item.id,
                    label: item.namekey,
                  })) || []
                }
                value={selectedPointListType}
                onChange={(value) => setSelectedPointListType(value)}
              />
            </div>
          </div>

          <div className="row my-2">
            <div className="col-4">
              <FormInput.Text label="Point Label:" name="name" />
            </div>

            <div className="col-4"></div>

            <div className="col-4 align-self-end">
              <FormInput.Check name="nameedit" label="allow per-meter edit" />
            </div>
          </div>

          <div className="row my-2">
            <div className="col-4">
              <FormInput.Text
                label="Point Unit:"
                name="unit_name"
                value={selectedUnit?.label}
                disabled={true}
              />
            </div>

            <div className="col-1 align-self-end text-center mb-1">&larr;</div>

            <div className="col-3 align-self-end">
              <FormInput.Select
                isSearchable={true}
                name="unit"
                option={pointUnits}
                groupOption={true}
                value={selectedUnit}
                onChange={(value) => setSelectedUnit(value)}
                isDisabled={_.isEqual(currentData?.type_point, type_point[2])}
              />
            </div>

            <div className="col-4 align-self-end">
              {!_.isEqual(currentData?.type_point, type_point[2]) && (
                <FormInput.Check
                  name="unitsedit"
                  label="allow per-meter edit"
                />
              )}
            </div>
          </div>
          <div className={`my-2 p-2 ${styles.title}`}>
            {type_point.map((item) => (
              <FormInput.Check
                key={item?.id}
                type="radio"
                name={item?.namekey}
                label={item?.namekey}
                inline
                checked={_.isEqual(modbusConfig, item)}
                onChange={() => setModbusConfig(item)}
                disabled={_.isEqual(currentData?.type_point, type_point[2])}
              />
            ))}
          </div>

          {_.isEqual(modbusConfig, type_point[0]) && (
            <div className={`my-2 p-2 ${styles.title}`}>
              {type_class.map((item) => (
                <FormInput.Check
                  key={item?.id}
                  type="radio"
                  name={item?.namekey}
                  label={item?.namekey}
                  inline
                  checked={_.isEqual(modbusRegisterType, item)}
                  onChange={() => setModbusRegisterType(item)}
                />
              ))}
            </div>
          )}

          {_.isEqual(modbusConfig, type_point[0]) && (
            <>
              <div className="row my-2">
                <div className="col-4">
                  <FormInput.Text label="Register Address:" name="register" />
                </div>

                <div className="col-2 align-self-end mb-1 fst-italic">
                  e.g: 40001
                </div>
              </div>

              <div className="row my-2">
                <div className="col-4">
                  <FormInput.Select
                    label="Data Format:"
                    name="data_type"
                    isSearchable={false}
                    value={selectedDataType}
                    option={data_type.map((item) => ({
                      value: item.id,
                      label: item.data_type,
                    }))}
                    onChange={(value) => setSelectedDataType(value)}
                  />
                </div>
              </div>

              <div className="row my-2">
                <div className="col-4">
                  <FormInput.Select
                    label="Byte Order:"
                    name="byte_order"
                    isSearchable={false}
                    value={selectedByteOrder}
                    option={byte_order.map((item) => ({
                      value: item.id,
                      label: item.byte_order,
                    }))}
                    onChange={(value) => setSelectedByteOrder(value)}
                  />
                </div>
              </div>

              <div className="row my-2">
                <div className="col-4">
                  <FormInput.Text
                    label={`"Invalid" Bit Pattern:`}
                    name="invalidvalue"
                  />
                </div>

                <div className="col-4 align-self-end mb-1">
                  =65535 / 65535 / 0xffff
                </div>

                <div className="col-4 align-self-end">
                  <FormInput.Check name="invalidvalueenabled" label="enabled" />
                </div>
              </div>
            </>
          )}
          {_.isEqual(modbusConfig, type_point[2]) && (
            <div
              className={`my-2 p-2 text-center fw-bold ${styles.title} ${styles.light}`}
            >
              Scale & Offset
            </div>
          )}

          {_.isEqual(modbusConfig, type_point[0]) && (
            <>
              <div className="row my-2">
                <div className="col-4">
                  <FormInput.Text name="slope" label="Slope:" />
                </div>

                <div className="col-4 align-self-end mb-1 fst-italic">
                  multiply by constant
                </div>

                <div className="col-4 align-self-end">
                  <FormInput.Check name="slopeenabled" label="enabled" />
                </div>
              </div>

              <div className="row my-2">
                <div className="col-4">
                  <FormInput.Text name="offset" label="Offset:" />
                </div>

                <div className="col-4 align-self-end mb-1 fst-italic">
                  then add constant
                </div>

                <div className="col-4 align-self-end">
                  <FormInput.Check name="offsetenabled" label="enabled" />
                </div>
              </div>
            </>
          )}

          {_.isEqual(modbusConfig, type_point[0]) &&
            _.isEqual(modbusRegisterType, type_class[0]) && (
              <div className="row my-2">
                <div className="col-4">
                  <FormInput.Text name="multreg" label="Multiplier:" />
                </div>

                <div className="col-4 align-self-end mb-1 fst-italic">
                  multiply by UINT16 register, e.g.: 40002
                </div>

                <div className="col-4 align-self-end">
                  <FormInput.Check name="multregenabled" label="enabled" />
                </div>
              </div>
            )}

          {_.isEqual(modbusConfig, type_point[0]) &&
            _.isEqual(modbusRegisterType, type_class[1]) && (
              <div className="row my-2">
                <div className="col-4">
                  <FormInput.Text
                    textarea
                    name="output_values"
                    label="Output Values:"
                  />
                </div>

                <div className="col-8 align-self-end fst-italic">
                  Enter Name:Value for each possible value of this Output
                  <br />
                  Read more about Output Values
                  <br />
                  Example 1:
                  <br />
                  ON:1
                  <br />
                  OFF:0
                  <br />
                  Example 2:Start:0xAA
                </div>
              </div>
            )}

          {_.isEqual(modbusConfig, type_point[0]) &&
            _.isEqual(modbusRegisterType, type_class[2]) && (
              <>
                <div className="row my-2">
                  <div className="col-4">
                    <FormInput.Text
                      name="output_min_value"
                      label="Output Min Value:"
                    />
                  </div>

                  <div className="col-8 align-self-end fst-italic">
                    Read more about these values
                    <br />
                    Minimum value user may enter for this Output
                  </div>
                </div>

                <div className="row my-2">
                  <div className="col-4">
                    <FormInput.Text
                      name="output_max_value"
                      label="Output Max Value:"
                    />
                  </div>

                  <div className="col-8 align-self-end mb-1 fst-italic">
                    Maximum value user may enter for this Output
                  </div>
                </div>

                <div className="row my-2">
                  <div className="col-4">
                    <FormInput.Text
                      name="output_step_size"
                      label="Output Step Size:"
                    />
                  </div>

                  <div className="col-8 align-self-end mb-1 fst-italic">
                    Round value to nearest Min+N*Step value
                  </div>
                </div>
              </>
            )}

          {_.isEqual(modbusConfig, type_point[1]) && (
            <div className="row my-2">
              <div className="col-4">
                <FormInput.Text textarea name="equation" label="Equation:" />
              </div>

              <div className="col-4 align-self-end mb-1 fst-italic">
                Help with equations
              </div>

              <div className="col-4">
                <FormInput.Check
                  name="check_equation"
                  label="allow per-meter edit"
                />
              </div>
            </div>
          )}
        </FormInput>
      </Modal>
    )
  );
}

export default EditPointModal;
