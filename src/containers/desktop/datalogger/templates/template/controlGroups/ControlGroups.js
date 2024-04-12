import { useState } from "react";
import Modal from "../../../../../../components/modal/Modal";
import Button from "../../../../../../components/button/Button";
import FormInput from "../../../../../../components/formInput/FormInput";
import { POINT_CONFIG } from "../../../../../../utils/TemplateHelper";
import Table from "../../../../../../components/table/Table";
import useControlGroups from "./useControlGroups";
import _ from "lodash";
import EditPointModal from "./editPointModal/EditPointModal";
import EditControlGroupModal from "./editControlGroupModal/EditControlGroupModal";

export default function ControlGroups() {
  const {
    columns,
    pointList,
    isModalOpen,
    closeModal,
    updatePoint,
    point,
    rowSelection,
    setRowSelection,
    addNewControlGroup,
    removePoint,
    addNewControlGroupInit,
    isClone,
    addChildrenModal,
    setAddChildrenModal,
    setIsSetUp,
  } = useControlGroups();

  const [confirmDelete, setConfirmDelete] = useState(false);
  const [addNewControlGroupModal, setAddNewControlGroupModal] = useState(false);

  return (
    <div>
      {addNewControlGroupModal && (
        <EditControlGroupModal
          isOpen={addNewControlGroupModal}
          close={() => setAddNewControlGroupModal(false)}
          data={addNewControlGroupInit}
          setPoint={() => setIsSetUp(true)}
        />
      )}
      {confirmDelete && (
        <Modal
          isOpen={confirmDelete}
          close={() => setConfirmDelete(false)}
          title="Delete Selected Points"
          footer={
            <div>
              <Button className="me-3" onClick={() => setConfirmDelete(false)}>
                <Button.Text text="No" />
              </Button>
              <Button
                className="ms-3"
                onClick={() => {
                  removePoint();
                  setConfirmDelete(false);
                }}
              >
                <Button.Text text="Yes" />
              </Button>
            </div>
          }
        >
          <div>
            <p>Are you sure you want to delete the selected points?</p>
          </div>
        </Modal>
      )}
      {Object.values(addChildrenModal).filter((item) => item.isOpen === true)
        .length > 0 && (
        <>
          {Object.keys(addChildrenModal).map((key, index) => {
            let item = addChildrenModal[key];
            return (
              item.isOpen && (
                <Modal
                  key={index}
                  isOpen={item.isOpen}
                  close={() =>
                    setAddChildrenModal({
                      ...addChildrenModal,
                      [key]: { ...item, isOpen: false },
                    })
                  }
                  title={`Add ${key}`}
                  footer={
                    <div>
                      <Button
                        className="me-3"
                        onClick={() =>
                          setAddChildrenModal({
                            ...addChildrenModal,
                            [key]: { ...item, isOpen: false },
                          })
                        }
                      >
                        <Button.Text text="Cancel" />
                      </Button>
                      <Button className="ms-3" type="submit" formId={key}>
                        <Button.Text text="Save" />
                      </Button>
                    </div>
                  }
                >
                  <div>
                    <FormInput
                      id={key}
                      initialValues={item.initialValues}
                      validationSchema={item.validationSchema}
                      onSubmit={(values) => {
                        item.onSubmit({
                          ...values,
                          is_clone_from_last: isClone,
                          id: item.id,
                        });
                        setAddChildrenModal({
                          ...addChildrenModal,
                          [key]: { ...item, isOpen: false },
                        });
                      }}
                    >
                      <div>
                        {item.fields.map((field, index) => {
                          return field.type !== "checkbox" ? (
                            <FormInput.Text
                              key={index}
                              label={field.label}
                              name={field.name}
                              type={field.type}
                              required={field.required}
                              isHidden={
                                isClone &&
                                key === POINT_CONFIG.STRING.name &&
                                field.name === "num_of_panel"
                              }
                            />
                          ) : (
                            item.has_children > 0 && (
                              <FormInput.Check
                                key={index}
                                label={field.label}
                                name={field.name}
                                checked={isClone}
                                onChange={field.onChange}
                              />
                            )
                          );
                        })}
                      </div>
                    </FormInput>
                  </div>
                </Modal>
              )
            );
          })}
        </>
      )}
      <div className="m-2">
        <div className="d-inline-block">
          <Button onClick={() => setAddNewControlGroupModal(true)}>
            <Button.Text text="Add New Control Group" />
          </Button>
        </div>
      </div>
      {pointList?.length > 0 && (
        <>
          <Table
            visible
            resizable
            draggable
            maxHeight="calc(100vh - 400px)"
            columns={{ columnDefs: columns }}
            data={pointList}
            selectRow={{
              enable: false,
              rowSelection: rowSelection,
              setRowSelection: setRowSelection,
            }}
          />

          {isModalOpen ? (
            !_.isEqual(point?.config, POINT_CONFIG.CONTROL_GROUP) ? (
              <EditPointModal
                isOpen={isModalOpen}
                close={closeModal}
                data={point}
                setPoint={(newPoint) => {
                  updatePoint(newPoint);
                }}
              />
            ) : (
              <EditControlGroupModal
                isOpen={isModalOpen}
                close={closeModal}
                data={point}
                setPoint={(newPoint) => {
                  updatePoint(newPoint);
                }}
                isEdit={true}
              />
            )
          ) : null}
          {Object.keys(rowSelection).length > 0 && (
            <Button className="mt-3" onClick={() => setConfirmDelete(true)}>
              <Button.Text text="Delete Selected Points" />
            </Button>
          )}
        </>
      )}
    </div>
  );
}
