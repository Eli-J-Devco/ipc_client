import { useEffect } from "react";
import { isEmpty } from "lodash";
import Button from "../../../../../../components/button/Button";
import FormInput from "../../../../../../components/formInput/FormInput";
import Modal from "../../../../../../components/modal/Modal";
import useAddEditErrorModal from "./useAddEditErrorModal";
import styles from "./ErrorModal.module.scss"


function AddEditErrorModal({ 
    isOpen, 
    close, 
    data, 
    setData, 
    dataList, 
    setDataList,
    deviceGroups,
    templates,
    points,
    errorLevels,
    errorTypes,
    errorComparisons,
    formSubmit, setFormSubmit,
}) {
    const {  
        validationSchema,
        handleSubmitForm,
    } = useAddEditErrorModal({ 
        data, 
        setData, 
        dataList, 
        setDataList, 
        close,
        formSubmit, setFormSubmit,
     });
    
    useEffect(() => {
        if (!isEmpty(data)) {
            setFormSubmit({
                ...formSubmit,
                name: data.name,
                message: data.message,
                device_group: {
                    label: `${data.device_group.name} - ${data.device_group.id}`,
                    value: data.device_group.id,
                },
                template: data.template !== undefined && data.template !== null ? {
                    label: `${data.template.name} - ${data.template.id}`,
                    value: data.template.id,
                } : undefined,
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
                value: data.value,
            })
        }      
    }, [data])

    return (
        <Modal
            isOpen={isOpen}
            close={() => {
                setFormSubmit({
                    enable: true
                })
                close()
            }}
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
                        <Button.Text 
                            text="Cancel" 
                            onClick={() => {
                                setFormSubmit({
                                    enable: true
                                })
                                close()
                            }}
                        />
                    </Button>
                </>
            }
        >
            <FormInput
                id="error-form"
                onSubmit={handleSubmitForm}
                initialValues={formSubmit}
                validationSchema={validationSchema}
            >
                <FormInput.Text
                    label="Name"
                    name="name"
                    className="my-2"
                    required
                    onChange={(e) => {
                        setFormSubmit({
                            ...formSubmit,
                            name: e.target.value
                        })
                    }}
                    value={formSubmit.name}
                />

                <FormInput.Text
                    label="Message"
                    name="message"
                    className="my-2"
                    required
                    textarea
                    onChange={(e) => {
                        setFormSubmit({
                            ...formSubmit,
                            message: e.target.value
                        })
                    }}
                    value={formSubmit.message}
                />

                <FormInput.Select
                    label="Device Group"
                    name="device_group"
                    className="my-2"
                    required
                    option={deviceGroups.map(item => ({
                        label: `${item.name} - ${item.id}`,
                        value: item.id
                    }))}
                    onChange={(e) => {
                        setFormSubmit({
                            ...formSubmit,
                            device_group: e,
                        })
                    }}
                    value={formSubmit.device_group}
                />

                <FormInput.Select
                    label="Template"
                    name="template"
                    className="my-2"
                    required
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
                    value={formSubmit.template ? formSubmit.template : undefined}
                />

                <FormInput.Select
                    
                    label="Point"
                    name="point"
                    className="my-2"
                    required
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
                    required
                    option={errorLevels.map(item => ({
                        label: item.name,
                        value: item.id
                    }))}
                    onChange={(e) => {
                        setFormSubmit({
                            ...formSubmit,
                            error_level: e,
                        })
                    }}
                    value={formSubmit.error_level}
                />

                <FormInput.Select
                    label="Error Type"
                    name="error_type"
                    className="my-2"
                    required
                    option={errorTypes.map(item => ({
                        label: item.name,
                        value: item.id
                    }))}
                    onChange={(e) => {
                        setFormSubmit({
                            ...formSubmit,
                            error_type: e,
                        })
                    }}
                    value={formSubmit.error_type}
                />

                <FormInput.Text
                    label="Error Code"
                    name="error_code"
                    className="my-2"
                    required
                    onChange={(e) => {
                        setFormSubmit({
                            ...formSubmit,
                            error_code: e.target.value
                        })
                    }}
                    value={formSubmit.error_code}
                />
                <div className="d-flex my-2">
                    <FormInput.Select
                        label="Comparison"
                        name="comparison"
                        className={`${styles["w-200"]}`}
                        required
                        option={errorComparisons.map(item => ({
                            label: item.name,
                            value: item.id
                        }))}
                        onChange={(e) => {
                            setFormSubmit({
                                ...formSubmit,
                                comparison: e,
                            })
                        }}
                        value={formSubmit.comparison}
                    />

                    <FormInput.Number
                        label="Value"
                        name="value"
                        className="ms-2 w-100"
                        required
                        onChange={(e) => {
                            setFormSubmit({
                                ...formSubmit,
                                value: e.target.value
                            })
                        }}
                        value={formSubmit.value}
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

export default AddEditErrorModal;