import Form from "react-bootstrap/Form";
import ReactSelect from "react-select";
import CreatableSelect from "react-select/creatable";
import useValidate from "./useValidate";
import {
  createContext,
  forwardRef,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import styles from "./FormInput.module.scss";
import { ReactComponent as LockIcon } from "../../assets/images/lock.svg";
import { ReactComponent as UnlockIcon } from "../../assets/images/unlock.svg";
import { ReactComponent as RandomIcon } from "../../assets/images/random.svg";
import { generateRandomPassword } from "../../utils/Utils";

const FormInputContext = createContext();

export const useFormInput = () => useContext(FormInputContext);

function FormInput({
  children,
  className,
  id,
  onSubmit,
  initialValues,
  validationSchema,
}) {
  const validate = useValidate(onSubmit, initialValues, validationSchema);

  return (
    <FormInputContext.Provider value={validate}>
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

function Text({
  className,
  inputClassName = "",
  invalidClassName = "",
  lablClassName = "",
  label,
  placeholder,
  name,
  title,
  value,
  required,
  isRandom,
  isShow = false,
  isCustomIcon = false,
  isHidden = false,
  type = "text",
  disabled,
  readOnly,
  autoComplete = "off",
  textarea,
  horizontal,
  onChange,
  onBlur,
  onClick,
  unit,
}) {
  const validate = useContext(FormInputContext);
  const [showPassword, setShowPassword] = useState(isShow);

  return (
    <Form.Group
      controlId={name}
      className={`${styles["form-text-wrapper"]} ${
        validate
          ? validate.touched[name] && validate.errors[name]
            ? invalidClassName
            : ""
          : ""
      } ${className ? className : ""} ${horizontal ? styles.horizontal : ""}`}
      hidden={isHidden}
    >
      {label && (
        <Form.Label className={lablClassName}>
          {label}
          {required ? <span className="required">*</span> : ""}
        </Form.Label>
      )}
      <div style={type === "password" ? { position: "relative" } : { flex: 1 }}>
        <div>
          <Form.Control
            className={`${styles["form-text"]} ${
              inputClassName ? inputClassName : ""
            }`}
            style={
              type === "password" || isCustomIcon
                ? { backgroundImage: "none" }
                : {}
            }
            placeholder={placeholder}
            size="sm"
            name={name}
            type={
              type === "password" ? (!showPassword ? "password" : "text") : type
            }
            disabled={disabled}
            readOnly={readOnly}
            autoComplete={autoComplete}
            as={textarea ? "textarea" : "input"}
            rows={3}
            value={
              validate && value === undefined ? validate.values[name] : value
            }
            onClick={
              validate && onClick === undefined ? validate.handleFocus : onClick
            }
            onChange={
              validate && onChange === undefined
                ? validate.handleChange
                : onChange
            }
            onBlur={
              validate && onBlur === undefined ? validate.handleBlur : onBlur
            }
            isInvalid={
              validate ? validate.touched[name] && validate.errors[name] : false
            }
            title={title}
          />
          <Form.Control.Feedback type="invalid">
            {validate ? validate.errors[name] : ""}
          </Form.Control.Feedback>
        </div>
        {type === "password" && !isCustomIcon ? (
          <div
            className="d-flex align-items-center position-absolute top-0 end-0 mt-1"
            style={{ cursor: "pointer" }}
          >
            {isRandom && (
              <span
                onClick={() => {
                  validate.setFieldValue(name, generateRandomPassword());
                  setShowPassword(true);
                }}
              >
                <RandomIcon style={{ padding: 4 }} />
              </span>
            )}
            <span onClick={() => setShowPassword(!showPassword)}>
              {!showPassword ? (
                <LockIcon style={{ padding: 6 }} />
              ) : (
                <UnlockIcon style={{ padding: 6 }} />
              )}
            </span>
          </div>
        ) : (
          ""
        )}
      </div>
      {unit && <Form.Label className="ms-2">{unit}</Form.Label>}
    </Form.Group>
  );
}
FormInput.Text = Text;

const Check = forwardRef(
  (
    {
      className,
      label,
      name,
      checked,
      disabled,
      inline,
      type = "checkbox",
      onChange,
      onBlur,
    },
    ref
  ) => {
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
        className={`${styles["form-check"]} ${className ? className : ""} ${
          type === "switch" ? styles.switch : ""
        }`}
        checked={
          validate && checked === undefined ? validate.values[name] : checked
        }
        onChange={
          validate && onChange === undefined ? validate.handleChange : onChange
        }
        onBlur={validate && onBlur === undefined ? validate.handleBlur : onBlur}
        isInvalid={
          validate ? validate.touched[name] && validate.errors[name] : false
        }
        feedback={validate ? validate.errors[name] : ""}
        feedbackType="invalid"
      />
    );
  }
);
FormInput.Check = Check;

function Select({
  className,
  labelClassName = "",
  inputClassName = "",
  label,
  name,
  required,
  groupOption,
  option,
  horizontal,
  closeMenuOnSelect,
  hideSelectedOptions,
  isClearable,
  isDisabled,
  isMulti,
  isSearchable,
  onChange,
  onBlur,
  value,
  placeholder,
  info,
}) {
  const validate = useContext(FormInputContext);
  const customStyles = {
    indicatorSeparator: (baseStyles, state) => ({
      ...baseStyles,
      display: "none",
    }),
    dropdownIndicator: (baseStyles, state) => ({
      ...baseStyles,
      paddingTop: "0px",
      paddingBottom: "0px",
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
      borderColor: state.isFocused
        ? "var(--bg-color-dark)"
        : validate && validate.touched[name] && validate.errors[name]
        ? "var(--bs-form-invalid-border-color)"
        : "hsl(0, 0%, 80%)",
      boxShadow: state.isFocused ? "0 0 0 0.25rem rgba(56, 52, 52, 0.25)" : "",
      "&:hover": {
        borderColor: state.isFocused
          ? "var(--bg-color-dark)"
          : validate && validate.touched[name] && validate.errors[name]
          ? "var(--bs-form-invalid-border-color)"
          : "hsl(0, 0%, 70%)",
      },
      minHeight: 31,
    }),
  };

  const formatGroupLabel = (data) => (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <span>{data.label}</span>
      <span
        style={{
          backgroundColor: "var(--bs-primary)",
          borderRadius: "2em",
          color: "white",
          display: "flex",
          justifyContent: "center",
          padding: "0 8px",
          fontSize: "0.8em",
          marginRight: 5,
        }}
      >
        {data.options.length}
      </span>
    </div>
  );
  return (
    <div
      className={`${styles["form-select"]} ${className ? className : ""} ${
        horizontal ? styles.horizontal : ""
      }`}
    >
      {label && (
        <label className={labelClassName}>
          {label}
          {required ? <span className="required">*</span> : ""}
        </label>
      )}

      <ReactSelect
        name={name}
        className={`${styles.select} ${inputClassName}`}
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
        onChange={
          validate && onChange === undefined
            ? (selected) => validate.setFieldValue(name, selected)
            : onChange
        }
        onBlur={
          validate && onBlur === undefined
            ? (e) => validate.setFieldTouched(name, true)
            : onBlur
        }
        placeholder={placeholder}
        formatGroupLabel={groupOption ? formatGroupLabel : undefined}
      />

      {validate && validate.touched[name] && validate.errors[name] ? (
        <div className={styles.errors}>{validate.errors[name]}</div>
      ) : (
        ""
      )}
      {info && (
        <span
          className="help"
          data-tooltip-id="my-tooltip"
          data-tooltip-content={info}
          style={{ position: "relative", marginLeft: "8px", top: "4px" }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 50 50"
            width="22px"
            height="22px"
          >
            <path d="M 25 2 C 12.309295 2 2 12.309295 2 25 C 2 37.690705 12.309295 48 25 48 C 37.690705 48 48 37.690705 48 25 C 48 12.309295 37.690705 2 25 2 z M 25 4 C 36.609824 4 46 13.390176 46 25 C 46 36.609824 36.609824 46 25 46 C 13.390176 46 4 36.609824 4 25 C 4 13.390176 13.390176 4 25 4 z M 25 11 A 3 3 0 0 0 22 14 A 3 3 0 0 0 25 17 A 3 3 0 0 0 28 14 A 3 3 0 0 0 25 11 z M 21 21 L 21 23 L 22 23 L 23 23 L 23 36 L 22 36 L 21 36 L 21 38 L 22 38 L 23 38 L 27 38 L 28 38 L 29 38 L 29 36 L 28 36 L 27 36 L 27 21 L 26 21 L 22 21 L 21 21 z" />
          </svg>
        </span>
      )}
    </div>
  );
}
FormInput.Select = Select;

function CreatableDropdown({
  className,
  labelClassName = "",
  inputClassName = "",
  label,
  name,
  required,
  groupOption,
  option,
  horizontal,
  closeMenuOnSelect,
  hideSelectedOptions,
  isClearable,
  isDisabled,
  isMulti,
  isSearchable,
  onChange,
  onBlur,
  value,
  placeholder,
  onCreateOption,
}) {
  const validate = useContext(FormInputContext);
  const customStyles = {
    indicatorSeparator: (baseStyles, state) => ({
      ...baseStyles,
      display: "none",
    }),
    dropdownIndicator: (baseStyles, state) => ({
      ...baseStyles,
      paddingTop: "0px",
      paddingBottom: "0px",
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
      borderColor: state.isFocused
        ? "var(--bg-color-dark)"
        : validate && validate.touched[name] && validate.errors[name]
        ? "var(--bs-form-invalid-border-color)"
        : "hsl(0, 0%, 80%)",
      boxShadow: state.isFocused ? "0 0 0 0.25rem rgba(56, 52, 52, 0.25)" : "",
      "&:hover": {
        borderColor: state.isFocused
          ? "var(--bg-color-dark)"
          : validate && validate.touched[name] && validate.errors[name]
          ? "var(--bs-form-invalid-border-color)"
          : "hsl(0, 0%, 70%)",
      },
      minHeight: 31,
    }),
  };

  const formatGroupLabel = (data) => (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <span>{data.label}</span>
      <span
        style={{
          backgroundColor: "var(--bs-primary)",
          borderRadius: "2em",
          color: "white",
          display: "flex",
          justifyContent: "center",
          padding: "0 8px",
          fontSize: "0.8em",
          marginRight: 5,
        }}
      >
        {data.options.length}
      </span>
    </div>
  );
  return (
    <div
      className={`${styles["form-select"]} ${className ? className : ""} ${
        horizontal ? styles.horizontal : ""
      }`}
    >
      {label && (
        <label className={labelClassName}>
          {label}
          {required ? <span className="required">*</span> : ""}
        </label>
      )}

      <CreatableSelect
        name={name}
        className={`${styles.select} ${inputClassName}`}
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
        onChange={
          validate && onChange === undefined
            ? (selected) => validate.setFieldValue(name, selected)
            : onChange
        }
        onBlur={
          validate && onBlur === undefined
            ? (e) => validate.setFieldTouched(name, true)
            : onBlur
        }
        placeholder={placeholder}
        formatGroupLabel={groupOption ? formatGroupLabel : undefined}
        onCreateOption={onCreateOption ? onCreateOption : undefined}
      />

      {validate && validate.touched[name] && validate.errors[name] ? (
        <div className={styles.errors}>{validate.errors[name]}</div>
      ) : (
        ""
      )}
    </div>
  );
}
FormInput.CreatableSelect = CreatableDropdown;

function File({
  className,
  name,
  value,
  disabled,
  readOnly,
  accept,
  onChange,
}) {
  const validate = useContext(FormInputContext);
  const [file, setFile] = useState(undefined);
  const firstRender = useRef(true);

  useEffect(() => {
    if (validate && !firstRender.current) validate.setFieldTouched(name, true);
    firstRender.current = false;
  }, [file]);

  return (
    <div
      className={`${styles["form-file-container"]} ${
        className ? className : ""
      }`}
    >
      <div className={styles["form-file-wrapper"]}>
        <label htmlFor={name} className={styles["form-file"]}>
          Select file
          <input
            type="file"
            id={name}
            name={name}
            disabled={disabled}
            readOnly={readOnly}
            accept={accept}
            onChange={
              validate && onChange === undefined
                ? (e) => {
                    const file = e.target.files ? e.target.files[0] : undefined;
                    validate.setFieldValue(name, file);
                    setFile(file);
                  }
                : onChange
            }
          />
        </label>

        <span className={styles.description}>
          {validate
            ? file
              ? file.name
              : "No file selected"
            : value
            ? value.name
            : "No file selected"}
        </span>
      </div>

      {validate && validate.touched[name] && validate.errors[name] ? (
        <div className={styles.errors}>{validate.errors[name]}</div>
      ) : (
        ""
      )}
    </div>
  );
}
FormInput.File = File;

function Switch({
  className,
  label,
  name,
  checked,
  disabled,
  inline,
  onChange,
  onBlur,
}) {
  const validate = useContext(FormInputContext);

  return (
    <Form.Check
      type="switch"
      id={name}
      name={name}
      label={label}
      disabled={disabled}
      inline={inline}
      className={`${styles["form-check"]} ${className ? className : ""} ${
        styles.switch
      }`}
      checked={
        validate && checked === undefined ? validate.values[name] : checked
      }
      onChange={
        validate && onChange === undefined ? validate.handleChange : onChange
      }
      onBlur={validate && onBlur === undefined ? validate.handleBlur : onBlur}
      isInvalid={
        validate ? validate.touched[name] && validate.errors[name] : false
      }
      feedback={validate ? validate.errors[name] : ""}
      feedbackType="invalid"
    />
  );
}
FormInput.Switch = Switch;

export const FormInputEnum = {
  Text: {
    component: (props) => <FormInput.Text {...props} />,
    type: "Text",
  },
  Check: {
    component: (props) => <FormInput.Check {...props} />,
    type: "Check",
  },
  Select: {
    component: (props) => <FormInput.Select {...props} />,
    type: "Select",
  },
  CreatableSelect: {
    component: (props) => <FormInput.CreatableSelect {...props} />,
    type: "CreatableSelect",
  },
  File: {
    component: (props) => <FormInput.File {...props} />,
    type: "File",
  },
  Switch: {
    component: (props) => <FormInput.Switch {...props} />,
    type: "Switch",
  },
};

export default FormInput;
