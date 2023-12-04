import { isEmpty } from "lodash";
import Button from "../../../../../../components/button/Button";
import FormInput from "../../../../../../components/formInput/FormInput";
import Modal from "../../../../../../components/modal/Modal";
import useEditAlarmModal from "./useEditAlarmModal";

function EditAlarmModal({ isOpen, close, data }) {
    const { validationSchema } = useEditAlarmModal();
    
    return (
        <Modal
            isOpen={isOpen}
            close={close}
            title={`${!isEmpty(data) ? "Edit" : "Add"} Alarm`}
            footer={
                <>
                    <Button
                        type="submit"
                        formId="alarm-form"
                        className="m-0"
                    >
                        <Button.Text text="Save"/>
                    </Button>

                    <Button
                        variant="white"
                        className="m-0 ms-3"
                        onClick={close}
                    >
                        <Button.Text text="Cancel"/>
                    </Button>
                </>
            }
        >
            <FormInput
                id="alarm-form"
                onSubmit={values => console.log(values)}
                initialValues={data}
                validationSchema={validationSchema}
            >
                <FormInput.Text
                    label="Name"
                    name="name"
                    className="my-2"
                />
    
                <FormInput.Text
                    label="Message"
                    name="message"
                    className="my-2"
                />

                <FormInput.Select
                    label="Device Categorize"
                    name="device_categorize"
                    className="my-2"
                />

                <FormInput.Select
                    label="Device"
                    name="device"
                    className="my-2"
                />

                <FormInput.Select
                    label="Tag (point)"
                    name="tag"
                    className="my-2"
                />

                <FormInput.Select
                    label="Error Level"
                    name="error_level"
                    className="my-2"
                />

                <FormInput.Select
                    label="Error Type"
                    name="error_type"
                    className="my-2"
                />

                <FormInput.Check
                    type="switch"
                    label="Enable"
                    name="enable"
                    className="my-2"
                />
            </FormInput>
        </Modal>
    );
}

export default EditAlarmModal;