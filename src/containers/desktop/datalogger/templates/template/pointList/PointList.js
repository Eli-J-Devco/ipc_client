import { useEffect, useState } from "react";
import Button from "../../../../../../components/button/Button";
import FormInput from "../../../../../../components/formInput/FormInput";
import Table from "../../../../../../components/table/Table";
import EditPointModal from "./editPointModal/EditPointModal";
import usePointList from "./usePointList";
import * as yup from "yup";
import Modal from "../../../../../../components/modal/Modal";
function PointList() {
  const {
    columns,
    pointList,
    isModalOpen,
    closeModal,
    updatePoint,
    point,
    rowSelection,
    setRowSelection,
    removePoint,
    changePointNumber,
  } = usePointList();
  const initialValues = {
    num_of_point: 1,
  };
  const schema = yup.object().shape({
    num_of_point: yup.number().required().min(1, "Minimum 1 point"),
  });
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [confirmAddPoints, setConfirmAddPoints] = useState({
    values: {},
    resetForm: () => { },
    state: false,
  });
  const onChangeNumOfPoint = (values, { resetForm }) => {
    if (values.num_of_point <= 0) return;

    setConfirmAddPoints({
      values: values,
      resetForm: resetForm,
      state: true,
    });
  };

  const addPoints = (values, resetForm) => {
    changePointNumber(values.num_of_point);
    setTimeout(() => {
      resetForm();
      setConfirmAddPoints({
        values: {},
        resetForm: () => { },
        state: false,
      });
    }, 300);
  };

  return (
    <div>
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
            <p>
              Are you sure you want to delete the selected points? All data of
              devices that are using this template will{" "}
              <strong>
                <i>be lost</i>
              </strong>
            </p>
          </div>
        </Modal>
      )}

      {confirmAddPoints && (
        <Modal
          isOpen={confirmAddPoints.state}
          close={() =>
            setConfirmAddPoints({
              values: {},
              resetForm: () => { },
              state: false,
            })
          }
          title="Add New Points"
          footer={
            <div>
              <Button
                className="me-3"
                onClick={() =>
                  setConfirmAddPoints({
                    values: {},
                    resetForm: () => { },
                    state: false,
                  })
                }
              >
                <Button.Text text="No" />
              </Button>
              <Button
                className="ms-3"
                onClick={() => {
                  addPoints(
                    confirmAddPoints.values,
                    confirmAddPoints.resetForm
                  );
                }}
              >
                <Button.Text text="Yes" />
              </Button>
            </div>
          }
        >
          <div>
            <p>Are you sure you want to add new points?</p>
          </div>
        </Modal>
      )}

      <div className="m-2">
        <FormInput
          className="d-inline-block"
          id="pointListForm"
          initialValues={initialValues}
          validationSchema={schema}
          onSubmit={onChangeNumOfPoint}
        >
          <div className="d-flex">
            <FormInput.Text
              label="Number of points:"
              name="num_of_point"
              horizontal
              type="number"
            />

            <Button className="mx-3" type="submit" formId="pointListForm">
              <Button.Text text="Add new points" />
            </Button>
          </div>
        </FormInput>
      </div>

      {pointList.length > 0 && (
        <>
          <Table
            visible
            resizable
            draggable
            maxHeight="80vh"
            columns={{ columnDefs: columns }}
            data={pointList}
            selectRow={{
              enable: false,
              rowSelection: rowSelection,
              setRowSelection: setRowSelection,
            }}
          />

          {isModalOpen && point && (
            <EditPointModal
              isOpen={isModalOpen}
              close={closeModal}
              data={point}
              setPoint={(newPoint) => updatePoint(newPoint)}
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

export default PointList;
