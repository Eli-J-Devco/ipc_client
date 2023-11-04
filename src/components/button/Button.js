import styles from "./Button.module.scss";

function Button({ children, variant, className, type, formId, onClick }) {
    return (
        <button
            type={type ? type : "button"}
            form={type === "submit" && formId ? formId : ""}
            className={`${styles.btn} ${variant ? styles[variant] : ""} ${className}`}
            onClick={onClick}
        >
            {children}
        </button>
    );
}

function Text({ text, className }) {
    return (
        <span className={className} >{text}</span>
    );
}
Button.Text = Text;

function Image({ image, className }) {
    return (
        <span className={className} >{image}</span>
    );
}
Button.Image = Image;

export default Button;