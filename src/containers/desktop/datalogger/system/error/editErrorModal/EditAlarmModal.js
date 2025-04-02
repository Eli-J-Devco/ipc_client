import { isEmpty } from "lodash";
import Button from "../../../../../../components/button/Button";
import FormInput from "../../../../../../components/formInput/FormInput";
import Modal from "../../../../../../components/modal/Modal";
import useEditErrorModal from "./useEditErrorModal";
import styles from "./EditAlarmModal.module.scss"


function EditErrorModal({ isOpen, close, data }) {
    const { 
        deviceGroups, 
        templates, 
        points, 
        errorLevels, 
        errorTypes, 
        errorComparisons, 
        error, setError,
        validationSchema,
        handleSubmitForm
    } = useEditErrorModal({ close });

    return (
        <Modal
            isOpen={isOpen}
            close={close}
            title={`${!isEmpty(data) ? "Edit" : "Add"} Error`}
            footer={
                <>
                    <Button
                        type="submit"
                        formId="error-form"
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
                id="error-form"
                onSubmit={handleSubmitForm}
                initialValues={data}
                validationSchema={validationSchema}
            >
                <FormInput.Text
                    label="Name"
                    name="name"
                    className="my-2"
                    required
                />

                <FormInput.Text
                    label="Message"
                    name="message"
                    className="my-2"
                    required
                    textarea
                />

                <FormInput.Select
                    label="Device Group"
                    name="device_group"
                    className="my-2"
                    option={deviceGroups.map(item => ({
                        label: `${item.name} - ${item.id}`,
                        value: item.id
                    }))}
                />

                <FormInput.Select
                    label="Template"
                    name="template"
                    className="my-2"
                    option={templates.map(item => ({
                        label: `${item.name} - ${item.id}`,
                        value: item.id
                    }))}
                    onChange={(e) => {
                        setError({
                            ...error,
                            id_template: e.value
                        })
                    }}
                />

                <FormInput.Select
                    
                    label="Point"
                    name="point"
                    className="my-2"
                    isDisabled={error.id_template ? false : true}
                    option={points.map(item => ({
                        label: item.name,
                        value: item.id
                    }))}
                />

                <FormInput.Select
                    label="Error Level"
                    name="error_level"
                    className="my-2"
                    option={errorLevels.map(item => ({
                        label: item.name,
                        value: item.id
                    }))}
                />

                <FormInput.Select
                    label="Error Type"
                    name="error_type"
                    className="my-2"
                    option={errorTypes.map(item => ({
                        label: item.name,
                        value: item.id
                    }))}
                />

                <FormInput.Text
                    label="Error Code"
                    name="error_code"
                    className="my-2"
                />
                <div className="d-flex my-2">
                    <FormInput.Select
                        label="Comparison"
                        name="comparison"
                        className={`${styles["w-200"]}`}
                        option={errorComparisons.map(item => ({
                            label: item.name,
                            value: item.id
                        }))}
                    />

                    <FormInput.Number
                        name="comparison_number"
                        className="align-self-end ms-2 w-100"
                    />
                </div>

                <FormInput.Check
                    type="switch"
                    label="Enable"
                    name="enable"
                    className="my-2"
                    checked={error.enable}
                    onChange={(e) => {
                        setError({
                            ...error,
                            enable: e.target.checked
                        })
                    }}
                />
            </FormInput>
        </Modal>
    );
}

export default EditErrorModal;