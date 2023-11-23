import styles from "./DatePickerButton.module.scss";

function DatePickerButton({ className, prevDate, nextDate, onPrevClick, onNextClick, onDatePickerClick }) {
    return (
        <div className={`position-relative ${className ? className : ""}`}>
            <button
                className={styles.btn}
            >
                <span
                    onClick={onPrevClick}
                >
                    ←
                </span>

                <span
                    onClick={onDatePickerClick}
                    className={styles.date}
                >
                    {prevDate}
                </span>
            </button>

            <span className={styles.hyphen}>-</span>
            
            <button
                className={styles.btn}
            >
                <span
                    onClick={onDatePickerClick}
                    className={styles.date}
                >
                    {nextDate}
                </span>

                <span
                    onClick={onNextClick}
                >
                    →
                </span>
            </button>
        </div>
    );
}

export default DatePickerButton;