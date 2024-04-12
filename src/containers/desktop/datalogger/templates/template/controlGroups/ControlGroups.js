import { useState } from "react";
import Modal from "../../../../../../components/modal/Modal";
import Button from "../../../../../../components/button/Button";
import FormInput, { FormInputEnum } from "../../../../../../components/formInput/FormInput";
import { POINT_CONFIG } from "../../../../../../utils/TemplateHelper";
import Table from "../../../../../../components/table/Table";
import useControlGroups from "./useControlGroups";
import _ from "lodash";
import EditPointModal from "./editPointModal/EditPointModal";
import EditControlGroupModal from "./editControlGroupModal/EditControlGroupModal";
import LibToast from "../../../../../../utils/LibToast";
import AddPointModal from "./addPointModal/AddPointModal";

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
    removePoint,
    addNewControlGroupInit,
    addChildrenModal,
    setAddChildrenModal,
    setIsSetUp,
  } = useControlGroups();

  const [confirmDelete, setConfirmDelete] = useState({});
  const [addNewControlGroupModal, setAddNewControlGroupModal] = useState(false);
  const footer = {
    yes: (onclick) => (
      <Button
        className="ms-3 me-3"
        onClick={() => {
          if (onclick) {
            onclick();
            return;
          };

          removePoint({
            isGroupSelected: true,
          });
          setConfirmDelete({});
        }}
      >
        <Button.Text text="Yes" />
      </Button>
    ),
    no: (
      <Button
        className="ms-3"
        onClick={() => setConfirmDelete({})}
      >
        <Button.Text text="No" />
      </Button>
    ),
  }

  const unselectedPoints = () => {
    setTimeout(() => {
      setRowSelection(...Object.entries(rowSelection).filter(([key, value]) => {
        if (key?.split('.').length > 1) {
          return false;
        }
        return true;
      }).map(([key, value]) => {
        return { [key]: value };
      }));
      LibToast.toast("Points unselected successfully", "info");

      setConfirmDelete({
        title: "Delete Control Group",
        message: "Are you sure you want to delete the selected control group?",
        footer: (
          <>
            {footer.no}
            {footer.yes()}
          </>
        ),
      });
    }, 100);
  };

  const checkDelete = () => {
    let groupSelected = Object.keys(rowSelection).reduce((acc, key) => {
      let splitedKey = key.split('.');
      if (splitedKey.length > 1) {
        return {
          ...acc,
          ...(
            acc[splitedKey[0]] ?
              {
                [splitedKey[0]]: [...(acc[splitedKey[0]] || []), key]
              }
              : {
                [key]: []
              }
          ),
        }
      }

      return {
        ...acc,
        [key]: [],
      };
    }, {});

    let isGroupSelected = Object.keys(groupSelected).some((key) => groupSelected[key].length > 0);
    let isChildrenSelected = Object.keys(groupSelected).some((key) => key.split('.').length > 1);

    var removePoints = {};
    if (isChildrenSelected) {
      removePoints = {
        title: "Remove Points",
        message: "No group are selected. Are you sure you want to remove the selected points out of group?",
        footer: (
          <>
            <Button className="ms-3" onClick={() => {
              removePoint({
                isChildrenSelected: true,
                isDeletePoints: true,
              });
              setConfirmDelete({});
            }}>
              <Button.Text text="Delete points" />
            </Button>
            <Button className="ms-3" onClick={() => {
              removePoint({
                isChildrenSelected: true,
              });
              setConfirmDelete({});
            }}>
              <Button.Text text="Remove points only" />
            </Button>
          </>
        ),
      };
    }

    if (isGroupSelected) {
      setConfirmDelete({
        title: "Delete Control Group with Points",
        message: "You have selected the points within control group. Do you want to remove them too?",
        footer: (
          <>
            {footer.no}
            {footer.yes()}
            <Button className="ms-3 me-3" onClick={unselectedPoints}>
              <Button.Text text="Unselected points" />
            </Button>
            {removePoints.footer}
          </>
        ),
        size: "lg",
      });
      return;
    }

    setConfirmDelete({
      title: removePoints.title || "Delete Control Group",
      message: removePoints.message || "Are you sure you want to delete the selected control group?",
      footer: (
        <>
          {
            removePoints.footer ?
              (
                <>
                  {footer.no}
                  {removePoints.footer}
                </>
              ) : (
                <>
                  {footer.no}
                  {footer.yes(() => {
                    removePoint(
                      {
                        isGroupSelected: true,
                        isGroupOnly: true,
                      }
                    )
                    setConfirmDelete({});
                  })}
                </>
              )
          }
        </>
      ),
      size: "md",
    });
  };

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
      {Object.keys(confirmDelete).length > 0 && (
        <Modal
          isOpen={confirmDelete || false}
          close={() => setConfirmDelete({})}
          title={confirmDelete.title || ""}
          footer={
            confirmDelete.footer || footer
          }
          size={confirmDelete.size || "md"}
        >
          <div>
            <p>
              {
                confirmDelete.message ||
                "Are you sure you want to delete the selected control group?"
              }
            </p>
          </div>
        </Modal>
      )}
      <AddPointModal
        addChildrenModal={addChildrenModal}
        setAddChildrenModal={setAddChildrenModal}
      />
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
            <Button className="mt-3" onClick={() => checkDelete()}>
              <Button.Text text="Delete Selected Points" />
            </Button>
          )}
        </>
      )}
    </div>
  );
}
