import { useEffect, useState } from "react";
import Button from "../../../../../../../components/button/Button";
import FormInput from "../../../../../../../components/formInput/FormInput";
import Modal from "../../../../../../../components/modal/Modal";
import useEditControlGroupModal from "./useEditControlGroupModal";
import Table from "../../../../../../../components/table/Table";

function EditControlGroupModal({ isOpen, close, data, refreshData, isEdit }) {
  const [currentData] = useState(data);

  const {
    initialValues,
    validationSchema,
    onSubmit,
    pointList,
    pointColumns,
    pointSelection,
    setPointSelection,
    groupSelection,
    setGroupSelection,
    defaultAttributes,
    selectedAttributes,
    setSelectedAttributes,
    isClone,
    setIsClone,
    refreshTable,
    kindOfClone,
    selectedKindOfClone,
    setSelectedKindOfClone,
    formatGroupList,
    groupColumns,
  } = useEditControlGroupModal(currentData, close, refreshData, isEdit);

  return (
    <Modal
      isOpen={isOpen}
      close={() => close()}
      title="Add New Control Group"
      footer={
        <div>
          <Button className="me-3" onClick={() => close()}>
            <Button.Text text="Cancel" />
          </Button>
          <Button className="ms-3" type="submit" formId="addNewControlGroup">
            <Button.Text text="Save" />
          </Button>
        </div>
      }
      size="lg"
    >
      <div>
        <FormInput
          id="addNewControlGroup"
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          <div>
            <div className="row mb-3">
              <FormInput.Text
                className="col-6"
                label="Name"
                name="name"
                required
                type="text"
              />
              <FormInput.Select
                className="col-6"
                label="Attribute"
                name="attributes"
                required
                option={defaultAttributes}
                value={selectedAttributes}
                onChange={(value) => setSelectedAttributes(value)}
              />
            </div>
            <FormInput.Text
              className="mb-3"
              label="Description"
              name="description"
              type="text"
              textarea={true}
            />
            {!isEdit && (
              <>
                <div>
                  Do you want to clone from an existed group or add existed?
                </div>
                <div className="ms-1 row">
                  <FormInput.Check
                    className="mb-3 col-sm-2"
                    label="Yes"
                    checked={isClone}
                    onChange={(value) => setIsClone(value)}
                    type="radio"
                  />
                  <FormInput.Check
                    className="mb-3 col-sm-2"
                    label="No"
                    checked={!isClone}
                    onChange={(value) => setIsClone(!value)}
                    type="radio"
                  />
                </div>
                <>
                  {isClone && (
                    <FormInput.Select
                      className="mb-3"
                      inputClassName="z-3"
                      label="Clone from an existed group or add existed points to this group?"
                      name="is_clone"
                      required
                      option={kindOfClone}
                      value={selectedKindOfClone}
                      onChange={(value) => setSelectedKindOfClone(value)}
                      isSearchable={false}
                    />
                  )}
                </>
              </>
            )}
          </div>
        </FormInput>
        {isClone ? (
          selectedKindOfClone.value === 1 ? (
            <div className="mt-3">
              <h5>Existed points</h5>
              <div className="note">
                The number of points can be selected due to the attributes:
                <ul>
                  <li>0: Unlimited</li>
                  <li>1: 2 points</li>
                  <li>2: 3 points</li>
                </ul>
              </div>
              {!refreshTable && (
                <Table
                  className="mt-3"
                  visible
                  maxHeight="40vh"
                  columns={{ columnDefs: pointColumns }}
                  data={pointList}
                  selectRow={{
                    enable: false,
                    rowSelection: pointSelection,
                    setRowSelection: setPointSelection,
                  }}
                />
              )}
            </div>
          ) : (
            !refreshTable && (
              <Table
                className="mt-3"
                visible
                maxHeight="40vh"
                columns={{ columnDefs: groupColumns }}
                data={formatGroupList}
                selectRow={{
                  enable: false,
                  rowSelection: groupSelection,
                  setRowSelection: setGroupSelection,
                }}
              />
            )
          )
        ) : null}
      </div>
    </Modal>
  );
}

export default EditControlGroupModal;
