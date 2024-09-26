import { isEmpty } from "lodash";
import Button from "../../../../../components/button/Button";
import Modal from "../../../../../components/modal/Modal";
import { AddComponents } from "./AddComponents";
import { AddModBusDevice } from "./AddModBusDevice";
import AdditionInformation from "./AdditionInformation";
import GeneralInformation from "./GeneralInformation";
import useNewAddDevice from "./useNewAddDevice";
import FormInput from "../../../../../components/formInput/FormInput";

export default function NewAddDevice({ closeAddDevice }) {
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
    onSubmit,
  } = useNewAddDevice();
  const footer = (
    <div>
      <Button variant="dark" type="submit" formId="addDeviceForm">
        <Button.Text text="Add" />
      </Button>
      <Button
        variant="dark"
        className="ms-3"
        type="submit"
        formId="addDeviceForm"
        // onClick={() => {
        //   setIsOpenAddMultipleDevice(true);
        // }}
      >
        <Button.Text text="Add Multiple" />
      </Button>
      <Button variant="grey" className="ms-3" onClick={() => closeAddDevice()}>
        <Button.Text text="Cancel" />
      </Button>
    </div>
  );
  return (
    <Modal
      isOpen={true}
      close={closeAddDevice}
      title="Add Device"
      size="xl"
      footer={footer}
    >
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
        <GeneralInformation
          generalInformation={generalInformation}
          setGeneralInformation={setGeneralInformation}
          updateAddingComponent={updateAddingComponent}
        />
        {!isEmpty(generalInformation?.template) && (
          <>
            <AddModBusDevice
              communicationInformation={communicationInformation}
              setCommunicationInformation={setCommunicationInformation}
            />
            <AdditionInformation
              additionInformationFields={additionInformationFields}
              additionInformation={additionInformation}
              setAdditionInformation={setAdditionInformation}
            />
            <AddComponents
              haveComponents={haveComponents}
              addingComponents={addingComponents}
              setAddingComponents={setAddingComponents}
            />
          </>
        )}
      </FormInput>
    </Modal>
  );
}
