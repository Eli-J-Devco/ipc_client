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

function Text({ className, label, placeholder, name, disabled, readOnly, autoComplete = "off" }) {
    const { handleBlur, handleChange, values, touched, errors } = useContext(FormInputContext);

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
                value={values[name]}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched[name] && errors[name]}
            />

            <Form.Control.Feedback type="invalid" >{ errors[name] }</Form.Control.Feedback>
        </Form.Group>
    );
}
FormInput.Text = Text;

export default FormInput;