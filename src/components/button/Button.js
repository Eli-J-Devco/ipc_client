import styles from "./Button.module.scss";

function Button({ children, variant, className, title, type, formId, onClick }) {
    return (
        <button
            type={type ? type : "button"}
            form={type === "submit" && formId ? formId : ""}
            className={`${styles.btn} ${variant ? styles[variant] : ""} ${className ? className : ""}`}
            onClick={onClick}
            title={title}
        >
            {children}
        </button>
    );
}

function Text({ text, className }) {
    return (
        <span className={className ? className : ""} >{text}</span>
    );
}
Button.Text = Text;

function Image({ children, image, title, className, onClick }) {
    return (
        <span
            className={`${styles.img} ${className ? className : ""}`}
            onClick={onClick}
            title={title}
        >
            {image}
            {children}
        </span>
    );
}
Button.Image = Image;

export default Button;