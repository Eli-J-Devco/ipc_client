import { useState } from "react";
import Button from "../../../../../../components/button/Button";
import Table from "../../../../../../components/table/Table";
import EditPointModal from "../pointList/editPointModal/EditPointModal";
import Modal from "../../../../../../components/modal/Modal";
import FormInput from "../../../../../../components/formInput/FormInput";
import { POINT_CONFIG } from "../../../../../../utils/TemplateHelper";
import useStringList from "./useString";

function StringList() {
  const {
    columns,
    pointList,
    isModalOpen,
    closeModal,
    updatePoint,
    point,
    rowSelection,
    setRowSelection,
    addNewString,
    removePoint,
    addNewStringInit,
    addNewStringSchema,
    isClone,
    setIsClone,
    addChildrenModal,
    setAddChildrenModal,
  } = useStringList();

  const [confirmDelete, setConfirmDelete] = useState(false);
  const [addNewStringModal, setAddNewStringModal] = useState(false);

  return (
    <div>
      {addNewStringModal && (
        <Modal
          isOpen={addNewStringModal}
          close={() => setAddNewStringModal(false)}
          title="Add New String"
          footer={
            <div>
              <Button
                className="me-3"
                onClick={() => setAddNewStringModal(false)}
              >
                <Button.Text text="Cancel" />
              </Button>
              <Button className="ms-3" type="submit" formId="addNewString">
                <Button.Text text="Save" />
              </Button>
            </div>
          }
        >
          <div>
            <FormInput
              id="addNewString"
              initialValues={addNewStringInit}
              validationSchema={addNewStringSchema}
              onSubmit={(values) => {
                addNewString(values);
                setAddNewStringModal(false);
              }}
            >
              <div>
                <FormInput.Text
                  label="Number of String"
                  name="num_of_strings"
                  type="number"
                  required={true}
                />
                {pointList.length > 0 && (
                  <FormInput.Check
                    className="d-inline-block ms-3"
                    label="Clone from last last"
                    name="is_clone_from_last"
                    checked={isClone}
                    onChange={() => setIsClone(!isClone)}
                  />
                )}
              </div>
              {(!isClone || pointList.length <= 0) && (
                <FormInput.Text
                  label="Number of Panel per String"
                  name="num_of_panels"
                  type="number"
                  required={true}
                />
              )}
            </FormInput>
          </div>
        </Modal>
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
                                field.name === "num_of_panels"
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
          <Button onClick={() => setAddNewStringModal(true)}>
            <Button.Text text="Add New String" />
          </Button>
        </div>
      </div>
      {pointList?.length > 0 && (
        <>
          <Table
            visible
            resizable
            draggable
            maxHeight="60vh"
            columns={{ columnDefs: columns }}
            data={pointList}
            selectRow={{
              enable: false,
              rowSelection: rowSelection,
              setRowSelection: setRowSelection,
            }}
          />

          {isModalOpen && (
            <EditPointModal
              isOpen={isModalOpen}
              close={closeModal}
              data={point}
              setPoint={(newPoint) => {
                updatePoint(newPoint);
              }}
            />
          )}
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

export default StringList;
