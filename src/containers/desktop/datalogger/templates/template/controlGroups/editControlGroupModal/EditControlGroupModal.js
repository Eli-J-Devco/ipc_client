import { useEffect, useState } from "react";
import Button from "../../../../../../../components/button/Button";
import FormInput from "../../../../../../../components/formInput/FormInput";
import Modal from "../../../../../../../components/modal/Modal";
import { useTemplate } from "../../useTemplate";
import styles from "./EditControlGroupModal.module.scss";
import useEditControlGroupModal from "./useEditControlGroupModal";
import _ from "lodash";
import Table from "../../../../../../../components/table/Table";

function EditControlGroupModal({ isOpen, close, data, setPoint, isEdit }) {
  const [currentData, setCurrentData] = useState(data);

  const {
    initialValues,
    validationSchema,
    onSubmit,
    pointList,
    columns,
    rowSelection,
    defaultAttributes,
    selectedAttributes,
    setSelectedAttributes,
    setRowSelection,
    isClone,
    setIsClone,
    refreshTable,
  } = useEditControlGroupModal(
    currentData,
    close,
    setPoint,
    setCurrentData,
    isEdit
  );

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
                  Do you want to add existed points to this control group?
                </div>
                <div>
                  <FormInput.Check
                    className="d-inline-block me-3"
                    label="Yes"
                    name="is_clone"
                    type="radio"
                    checked={isClone}
                    onChange={() => setIsClone(!isClone)}
                  />
                  <FormInput.Check
                    className="d-inline-block me-3"
                    label="No"
                    name="not_clone"
                    type="radio"
                    checked={!isClone}
                    onChange={() => setIsClone(!isClone)}
                  />
                </div>
              </>
            )}
          </div>
        </FormInput>
        {isClone && (
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
            {
              !refreshTable &&
              <Table
                className="mt-3"
                visible
                maxHeight="calc(100vh - 700px)"
                columns={{ columnDefs: columns }}
                data={pointList}
                selectRow={{
                  enable: false,
                  rowSelection: rowSelection,
                  setRowSelection: setRowSelection,
                }}
              />
            }
          </div>
        )}
      </div>
    </Modal>
  );
}

export default EditControlGroupModal;
