import Form from 'react-bootstrap/Form';
import ReactSelect from 'react-select';
import useValidate from './useValidate';
import { createContext, forwardRef, useContext, useEffect, useRef, useState } from 'react';
import styles from "./FormInput.module.scss";

const FormInputContext = createContext();

export const useFormInput = () => useContext(FormInputContext);

function FormInput({ children, className, id, onSubmit, initialValues, validationSchema }) {
    const validate = useValidate(onSubmit, initialValues, validationSchema);

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

function Text({ className, label, placeholder, name, value, disabled, readOnly, autoComplete = "off", textarea, horizontal, onChange, onBlur, unit }) {
    const validate = useContext(FormInputContext);

    return (
        <Form.Group
            controlId={name}
            className={`${styles["form-text-wrapper"]} ${className ? className : ""} ${horizontal ? styles.horizontal : ""}`}
        >
            {label && <Form.Label>{label}</Form.Label>}

            <Form.Control
                className={styles["form-text"]}
                placeholder={placeholder}
                size="sm"
                name={name}
                disabled={disabled}
                readOnly={readOnly}
                autoComplete={autoComplete}
                as={textarea ? "textarea" : "input"}
                rows={3}
                value={validate && value === undefined ? validate.values[name] : value}
                onChange={validate && onChange === undefined ? validate.handleChange : onChange}
                onBlur={validate && onBlur === undefined ? validate.handleBlur : onBlur}
                isInvalid={validate ? validate.touched[name] && validate.errors[name] : false}
            />
            {unit && <Form.Label className='ms-2'>{unit}</Form.Label>}
            <Form.Control.Feedback type="invalid" >{validate ? validate.errors[name] : ""}</Form.Control.Feedback>
        </Form.Group>
    );
}
FormInput.Text = Text;

const Check = forwardRef(({ className, label, name, checked, disabled, inline, type = "checkbox", onChange, onBlur }, ref) => {
    const validate = useContext(FormInputContext);

    return (
        <Form.Check
            ref={ref}
            type={type}
            id={name}
            name={name}
            label={label}
            disabled={disabled}
            inline={inline}
            className={`${styles["form-check"]} ${className ? className : ""} ${type === "switch" ? styles.switch : ""}`}
            checked={validate && checked === undefined ? validate.values[name] : checked}
            onChange={validate && onChange === undefined ? validate.handleChange : onChange}
            onBlur={validate && onBlur === undefined ? validate.handleBlur : onBlur}
            isInvalid={validate ? validate.touched[name] && validate.errors[name] : false}
            feedback={validate ? validate.errors[name] : ""}
            feedbackType="invalid"
        />
    );
});
FormInput.Check = Check;

function Select({ className, label, name, option, horizontal, closeMenuOnSelect, hideSelectedOptions, isClearable, isDisabled, isMulti, isSearchable, onChange, onBlur, value, placeholder }) {
    const validate = useContext(FormInputContext);
    const customStyles = {
        indicatorSeparator: (baseStyles, state) => ({
            ...baseStyles,
            display: "none"
        }),
        dropdownIndicator: (baseStyles, state) => ({
            ...baseStyles,
            paddingTop: "0px",
            paddingBottom: "0px"
        }),
        clearIndicator: (baseStyles, state) => ({
            ...baseStyles,
            padding: "0px",
        }),
        valueContainer: (baseStyles, state) => ({
            ...baseStyles,
            padding: "0px 8px",
        }),
        control: (baseStyles, state) => ({
            ...baseStyles,
            borderColor: state.isFocused ? "var(--bg-color-dark)" : validate && validate.touched[name] && validate.errors[name] ? "var(--bs-form-invalid-border-color)" : "hsl(0, 0%, 80%)",
            boxShadow: state.isFocused ? "0 0 0 0.25rem rgba(56, 52, 52, 0.25)" : "",
            "&:hover": {
                borderColor: state.isFocused ? "var(--bg-color-dark)" : validate && validate.touched[name] && validate.errors[name] ? "var(--bs-form-invalid-border-color)" : "hsl(0, 0%, 70%)"
            },
            minHeight: 31
        })
    };

    return (
        <div className={`${styles["form-select"]} ${className ? className : ""} ${horizontal ? styles.horizontal : ""}`}>
            {label && <label>{label}</label>}

            <ReactSelect
                name={name}
                className={styles.select}
                options={option}
                captureMenuScroll={true}
                styles={customStyles}
                closeMenuOnSelect={closeMenuOnSelect}
                hideSelectedOptions={hideSelectedOptions}
                isClearable={isClearable}
                isDisabled={isDisabled}
                isMulti={isMulti}
                isSearchable={isSearchable}
                maxMenuHeight={200}
                menuPosition={"fixed"}
                value={validate && value === undefined ? validate.values[name] : value}
                onChange={validate && onChange === undefined ? selected => validate.setFieldValue(name, selected) : onChange}
                onBlur={validate && onBlur === undefined ? e => validate.setFieldTouched(name, true) : onBlur}
                placeholder={placeholder}
            />

            {validate && validate.touched[name] && validate.errors[name] ? <div className={styles.errors}>{validate.errors[name]}</div> : ""}
        </div>
    );
}
FormInput.Select = Select;

function File({ className, name, value, disabled, readOnly, accept, onChange }) {
    const validate = useContext(FormInputContext);
    const [file, setFile] = useState(undefined);
    const firstRender = useRef(true);

    useEffect(() => {
        if (validate && !firstRender.current) validate.setFieldTouched(name, true);
        firstRender.current = false;
    }, [file]);

    return (
        <div className={`${styles["form-file-container"]} ${className ? className : ""}`}>
            <div className={styles["form-file-wrapper"]}>
                <label
                    htmlFor={name}
                    className={styles["form-file"]}
                >
                    Select file

                    <input
                        type="file"
                        id={name}
                        name={name}
                        disabled={disabled}
                        readOnly={readOnly}
                        accept={accept}
                        onChange={
                            validate && onChange === undefined ?
                                e => {
                                    const file = e.target.files ? e.target.files[0] : undefined;
                                    validate.setFieldValue(name, file);
                                    setFile(file);
                                }
                                :
                                onChange
                        }
                    />
                </label>

                <span className={styles.description}>
                    {
                        validate ?
                            file ? file.name : "No file selected"
                            :
                            value ? value.name : "No file selected"
                    }
                </span>
            </div>

            {validate && validate.touched[name] && validate.errors[name] ? <div className={styles.errors}>{validate.errors[name]}</div> : ""}
        </div>
    );
}
FormInput.File = File;

export default FormInput;