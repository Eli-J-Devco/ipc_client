import { useEffect, useState } from "react";
import Button from "../../../../../../components/button/Button";
import FormInput from "../../../../../../components/formInput/FormInput";
import Modal from "../../../../../../components/modal/Modal";
import { useTemplates } from "../../useTemplates";
import useSubmitTemplate from "./useSubmitTemplate";

function CreateTemplateModal({ isOpen, close, template }) {
    const { handleOnSubmit, initialValues, validationSchema } = useSubmitTemplate(close);
    const { deviceType } = useTemplates();
    const [groups, setGroups] = useState(null);

    useEffect(() => {
        if (deviceType && !groups) {
            setGroups(deviceType.map(item => ({ value: item.id, label: item.name })))
        }
    }, [deviceType, groups, setGroups]);

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
                    required={true}
                    placeholder={`Enter name of ${template}`}
                />

                <FormInput.Select
                    label={`Select group of ${template}`}
                    name="group"
                    option={groups}
                    className="mb-3"
                    required={true}
                    placeholder={`Select group of ${template}`}
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