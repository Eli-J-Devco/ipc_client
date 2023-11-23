import Button from "../../../../../../components/button/Button";
import FormInput from "../../../../../../components/formInput/FormInput";
import Modal from "../../../../../../components/modal/Modal";
import useSubmitTemplate from "./useSubmitTemplate";

function CreateTemplateModal({ isOpen, close, template }) {
    const { handleOnSubmit, initialValues, validationSchema } = useSubmitTemplate(close);

    return (
        <Modal
            isOpen={isOpen}
            close={close}
            title={`Add ${template}`}
            variant="grey"
        >
            <FormInput
                id="template-form"
                onSubmit={handleOnSubmit}
                initialValues={initialValues}
                validationSchema={validationSchema}
            >
                <FormInput.Text
                    label={`Name of new ${template}`}
                    name="name"
                    className="mb-3"
                />
            </FormInput>

            <Button variant="dark" type="submit" formId="template-form" >
                <Button.Text text={`Yes, Create ${template}`} />
            </Button>

            <Button variant="white" onClick={close} className="ms-3" >
                <Button.Text text="Cancel" />
            </Button>
        </Modal>
    );
}

export default CreateTemplateModal;