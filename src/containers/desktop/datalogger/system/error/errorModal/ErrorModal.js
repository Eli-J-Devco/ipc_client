import { useEffect } from "react";
import { isEmpty } from "lodash";
import Button from "../../../../../../components/button/Button";
import FormInput from "../../../../../../components/formInput/FormInput";
import Modal from "../../../../../../components/modal/Modal";
import useErrorModal from "./useErrorModal";
import styles from "./ErrorModal.module.scss"


function ErrorModal({ isOpen, close, data, setData, dataList, setDataList }) {
    const { 
        deviceGroups, 
        templates, 
        points, 
        errorLevels, 
        errorTypes, 
        errorComparisons, 
        validationSchema,
        formSubmit, setFormSubmit,
        handleSubmitForm,
    } = useErrorModal({ data, setData, dataList, setDataList, close });
    
    useEffect(() => {
        if (!isEmpty(data)) {
            setFormSubmit({
                ...formSubmit,
                template: {
                    label: `${data.template.name} - ${data.template.id}`,
                    value: data.template.id
                },
                point: {
                    label: data.tag_point.name,
                    value: data.tag_point.id,
                }
            })
        }      
    }, [data])

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
                        onClick={() => {
                            setFormSubmit({
                                enable: true
                            })
                            close()
                        }}
                    >
                        <Button.Text text="Cancel"/>
                    </Button>
                </>
            }
        >
            <FormInput
                id="error-form"
                onSubmit={handleSubmitForm}
                initialValues={!isEmpty(data) ? {
                        name: data.name,
                        message: data.message,
                        device_group: {
                            label: `${data.device_group.name} - ${data.device_group.id}`,
                            value: data.device_group.id
                        },
                        template: {
                            label: `${data.template.name} - ${data.template.id}`,
                            value: data.template.id
                        },
                        point: {
                            label: data.tag_point.name,
                            value: data.tag_point.id,
                        },
                        error_level: {
                            label: data.error_level.name,
                            value: data.error_level.id,
                        },
                        error_type: {
                            label: data.error_type.name,
                            value: data.error_type.id,
                        },
                        error_code: data.error_code,
                        comparison: {
                            label: data.tag_comparison.name,
                            value: data.tag_comparison.id,
                        },
                        comparison_number: data.value,
                        enable: data.enable
                    }: {}
                }
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
                        setFormSubmit({
                            ...formSubmit,
                            template: e,
                            point: null
                        })
                    }}
                    value={formSubmit.template}
                />

                <FormInput.Select
                    
                    label="Point"
                    name="point"
                    className="my-2"
                    isDisabled={formSubmit.template ? false : true}
                    option={points.map(item => ({
                        label: item.name,
                        value: item.id
                    }))}
                    onChange={(e) => {
                        setFormSubmit({
                            ...formSubmit,
                            point: e
                        })
                    }}
                    value={formSubmit.point}
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
                    checked={formSubmit.enable}
                    onChange={(e) => {
                        setFormSubmit({
                            ...formSubmit,
                            enable: e.target.checked
                        })
                    }}
                />
            </FormInput>
        </Modal>
    );
}

export default ErrorModal;