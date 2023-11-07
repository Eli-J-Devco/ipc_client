import Form from 'react-bootstrap/Form';
import useValidate from './useValidate';
import { createContext, useContext } from 'react';

const FormInputContext = createContext();

function FormInput({ children, className, id, onSubmit }) {
    const validate = useValidate(onSubmit, children);
    
    return (
        <FormInputContext.Provider value={validate} >
            <Form
                noValidate
                className={className}
                id={id}
                onSubmit={validate.handleSubmit}
            >
                {children}
            </Form>
        </FormInputContext.Provider>
    );
}

function Text({ className, label, placeholder, name, value, disabled, readOnly, autoComplete = "off", onChange, onBlur }) {
    const validate = useContext(FormInputContext);

    return (
        <Form.Group
            controlId={name}
            className={className}
        >
            {label && <Form.Label>{ label }</Form.Label>}

            <Form.Control
                placeholder={placeholder}
                size="sm"
                name={name}
                disabled={disabled}
                readOnly={readOnly}
                autoComplete={autoComplete}
                value={validate ? validate.values[name] : value}
                onChange={validate ? validate.handleChange : onChange}
                onBlur={validate ? validate.handleBlur : onBlur}
                isInvalid={validate ? validate.touched[name] && validate.errors[name] : false}
            />

            <Form.Control.Feedback type="invalid" >{ validate ? validate.errors[name] : "" }</Form.Control.Feedback>
        </Form.Group>
    );
}
FormInput.Text = Text;

function Check({ className, label, name, checked, disabled, inline, type = "checkbox", onChange, onBlur }) {
    const validate = useContext(FormInputContext);

    return (
        <Form.Check
            type={type}
            id={name}
            name={name}
            label={label}
            disabled={disabled}
            inline={inline}
            className={className}
            checked={validate ? validate.values[name] : checked}
            onChange={validate ? validate.handleChange : onChange}
            onBlur={validate ? validate.handleBlur : onBlur}
            isInvalid={validate ? validate.touched[name] && validate.errors[name] : false}
            feedback={validate ? validate.errors[name] : ""}
            feedbackType="invalid"
        />
    );
}
FormInput.Check = Check;

export default FormInput;