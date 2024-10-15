import { isEmpty } from "lodash";
import Button from "../../../../../components/button/Button";
import Modal from "../../../../../components/modal/Modal";
import { AddComponents } from "./AddComponents";
import { AddModBusDevice } from "./AddModBusDevice";
import AdditionInformation from "./AdditionInformation";
import GeneralInformation from "./GeneralInformation";
import useAddDevice from "./useAddDevice";
import FormInput from "../../../../../components/formInput/FormInput";
import { useMemo } from "react";
import AddMultipleDevice from "./AddMultipleDevice";

export default function AddDevice({ closeAddDevice }) {
  const {
    generalInformation,
    setGeneralInformation,
    communicationInformation,
    setCommunicationInformation,
    additionInformationFields,
    additionInformation,
    setAdditionInformation,
    schemas,
    addingComponents,
    setAddingComponents,
    haveComponents,
    updateAddingComponent,
    isOpenAddMultipleDevice,
    setIsOpenAddMultipleDevice,
    addMultipleDeviceInformation,
    setAddMultipleDeviceInformation,
    onSubmit,
    onAddMultiple,
  } = useAddDevice(closeAddDevice);
  const footer = useMemo(
    () => (
      <div>
        <Button variant="dark" type="submit" formId="addDeviceForm">
          <Button.Text text="Add" />
        </Button>
        <Button
          variant="dark"
          className="ms-3"
          type="submit"
          formId="addDeviceForm"
          onClick={() => {
            setIsOpenAddMultipleDevice(1);
          }}
        >
          <Button.Text text="Add Multiple" />
        </Button>
        <Button
          variant="grey"
          className="ms-3"
          onClick={() => closeAddDevice()}
        >
          <Button.Text text="Cancel" />
        </Button>
      </div>
    ),
    []
  );
  const GeneralInformationLayout = useMemo(
    () => (
      <GeneralInformation
        generalInformation={generalInformation}
        setGeneralInformation={setGeneralInformation}
        updateAddingComponent={updateAddingComponent}
      />
    ),
    [generalInformation]
  );

  const AddModBusDeviceLayout = useMemo(
    () => (
      <AddModBusDevice
        communicationInformation={communicationInformation}
        setCommunicationInformation={setCommunicationInformation}
      />
    ),
    [communicationInformation]
  );

  const AdditionInformationLayout = useMemo(
    () => (
      <AdditionInformation
        additionInformationFields={additionInformationFields}
        additionInformation={additionInformation}
        setAdditionInformation={setAdditionInformation}
      />
    ),
    [additionInformationFields, additionInformation]
  );

  const AddComponentsLayout = useMemo(
    () => (
      <AddComponents
        haveComponents={haveComponents}
        addingComponents={addingComponents}
        setAddingComponents={setAddingComponents}
      />
    ),
    [addingComponents]
  );

  const AddMultipleDeviceLayout = useMemo(
    () => (
      <AddMultipleDevice
        addMultipleDeviceInformation={addMultipleDeviceInformation}
        setAddMultipleDeviceInformation={setAddMultipleDeviceInformation}
        closeAddMultipleDevice={() => setIsOpenAddMultipleDevice(0)}
        deviceType={generalInformation?.device_type?.type}
        comunicationType={communicationInformation?.communication?.label}
        onSubmit={onAddMultiple}
      />
    ),
    [addMultipleDeviceInformation, generalInformation, communicationInformation]
  );

  return (
    <FormInput
      validationSchema={schemas}
      id={"addDeviceForm"}
      initialValues={{
        ...generalInformation,
        ...communicationInformation,
        ...additionInformation,
      }}
      onSubmit={onSubmit}
    >
      <Modal
        isOpen={true}
        close={closeAddDevice}
        title="Add Device"
        size="xl"
        footer={footer}
      >
        {isOpenAddMultipleDevice === 2 && AddMultipleDeviceLayout}
        {GeneralInformationLayout}
        {/* <GeneralInformation
          generalInformation={generalInformation}
          setGeneralInformation={setGeneralInformation}
          updateAddingComponent={updateAddingComponent}
        /> */}
        {!isEmpty(generalInformation?.template) && (
          <>
            {AddModBusDeviceLayout}
            {AdditionInformationLayout}
            {AddComponentsLayout}
          </>
        )}
      </Modal>
    </FormInput>
  );
}
