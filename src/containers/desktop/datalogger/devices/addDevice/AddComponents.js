import styles from "./AddDevice.module.scss";
import _, { isEmpty } from "lodash";
import useAddComponents, { posOptions } from "./useAddComponents";
import Table from "../../../../../components/table/Table";
import { ReactComponent as EditIcon } from "../../../../../assets/images/edit.svg";
import Button from "../../../../../components/button/Button";
import { ListAvailableComponent } from "./ListAvailableComponent";

export function AddComponents({
  haveComponents,
  addingComponents,
  setAddingComponents,
  isUpdateDevice,
}) {
  const {
    columns,
    addNewComponent,
    dataTable,
    isOpenSelectComponent,
    setIsOpenSelectComponent,
  } = useAddComponents(
    haveComponents,
    addingComponents,
    setAddingComponents,
    isUpdateDevice
  );
  return (
    <div
      className="mt-3"
      style={_.isEmpty(addingComponents) ? { display: "none" } : {}}
    >
      {isOpenSelectComponent && (
        <ListAvailableComponent
          onClose={() => setIsOpenSelectComponent(false)}
          plugPoints={
            !isEmpty(haveComponents?.device_type?.plug_point_count)
              ? Object.keys(haveComponents?.device_type?.plug_point_count)
                  .filter(
                    (key) =>
                      haveComponents?.device_type?.plug_point_count[key] !== 0
                  )
                  .map((key) => posOptions.find((item) => item.value === key))
              : []
          }
        />
      )}

      <div className="d-flex align-items-center">
        <h5>{isUpdateDevice ? "Components" : "Require Components"}</h5>
        {isUpdateDevice && (
          <Button
            variant={"light"}
            className={styles["add-btn"]}
            onClick={() => setIsOpenSelectComponent(true)}
          >
            <Button.Image image={<EditIcon />} />
          </Button>
        )}
      </div>
      <div className={`mt-2 ${styles["component"]}`}>
        {_.isEmpty(addingComponents) ? (
          ""
        ) : (
          <div className="col-6">
            <div className="me-3">
              <Table columns={{ columnDefs: columns }} data={dataTable} />
            </div>
          </div>
        )}
        <div className={`col-6 ${styles["demo-container"]}`}>
          <div id="demo" className={`ms-3 ${styles["demo"]}`}>
            <div id="top" className={`${styles["top"]}`}>
              <div
                id="top-container"
                className={`${styles["item-container"]}`}
              ></div>
            </div>
            <div id="left" className={`${styles["left"]}`}>
              <div
                id="left-container"
                className={`${styles["item-container"]}`}
              ></div>
            </div>
            <div id="center" className={`${styles["center"]}`}>
              <div
                id="center-container"
                className={`${styles["item-container"]}`}
              ></div>
            </div>
            <div id="bottom" className={`${styles["bottom"]}`}>
              <div
                id="bottom-container"
                className={`${styles["item-container"]}`}
              ></div>
            </div>
            <div id="right" className={`${styles["right"]}`}>
              <div
                id="right-container"
                className={`${styles["item-container"]}`}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
