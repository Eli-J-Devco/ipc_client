import { useEffect, useState } from "react";
import Button from "../../../../../../components/button/Button";
import FormInput from "../../../../../../components/formInput/FormInput";
import Modal from "../../../../../../components/modal/Modal";
import { useTemplates } from "../../useTemplates";
import useSubmitTemplate from "./useSubmitTemplate";
import { ReactComponent as AddIcon } from "../../../../../../assets/images/add.svg";

function CreateTemplateModal({ isOpen, close, template }) {
    const { deviceGroups, deviceTypes, setDeviceTypes } = useTemplates();
    const [isAddNewGroup, setIsAddNewGroup] = useState(false);
    const [groups, setGroups] = useState(null);
    const onRefresh = () => {
        setDeviceTypes([]);
        setIsAddNewGroup(false);
    }
    const { handleOnSubmit, initialValues, validationSchema, initialCreateGroup, validationCreateGroup, handleCreateGroup } = useSubmitTemplate(close, onRefresh);

    useEffect(() => {
        if (deviceGroups && deviceGroups.length > 0) {
            setGroups(deviceGroups)
        }
    }, [deviceGroups, groups, setGroups]);

    return (
        <Modal
            isOpen={isOpen}
            close={close}
            title={`Add ${template}`}
            variant="grey"
        >
            {
                isAddNewGroup &&
                <Modal
                    isOpen={isAddNewGroup}
                    close={() => setIsAddNewGroup(false)}
                    title="Create New Group"
                    variant="grey"
                    size="sm"
                >
                    <FormInput
                        id="new-group-form"
                        initialValues={initialCreateGroup}
                        validationSchema={validationCreateGroup}
                        onSubmit={handleCreateGroup}
                    >
                        <FormInput.Text
                            label="Name of new group"
                            name="name"
                            className="mb-3"
                            required={true}
                            placeholder="Enter name of new group"
                        />
                        <FormInput.Select
                            label="Select type of new group"
                            name="type"
                            option={deviceTypes.map(item => ({ value: item.id, label: item.name }))}
                            required={true}
                            placeholder="Select type of new group"
                        />
                        <div className="d-flex justify-content-center mt-3">
                            <Button variant="dark" type="submit" formId="new-group-form" >
                                <Button.Text text="Create New Group" />
                            </Button>
                        </div>
                    </FormInput>
                </Modal>
            }
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

                <div className="row mb-3">
                    <div className="col-11">
                        <FormInput.Select
                            label={`Select group of ${template}`}
                            name="group"
                            option={groups}
                            required={true}
                            placeholder={`Select group of ${template}`}
                            groupOption={true}
                            isSearchable={true}
                        />
                    </div>
                    <div className="col-1 position-relative">
                        <Button
                            className="position-absolute ms-1 p-2 start-0 top-50 translate-middle-y"
                            title="Create new group"
                            onClick={() => setIsAddNewGroup(true)}
                        >
                            <Button.Image image={<AddIcon />} />
                        </Button>
                    </div>
                </div>
            </FormInput>

            <Button variant="dark" type="submit" formId="template-form" >
                <Button.Text text={`Yes, Create ${template}`} />
            </Button>

            <Button variant="white" onClick={close} className="ms-3" >
                <Button.Text text="Cancel" />
            </Button>
        </Modal >
    );
}

export default CreateTemplateModal;