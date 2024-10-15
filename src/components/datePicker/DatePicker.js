import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from './DatePicker.module.scss';

function DatePicker({
    className,
    selected,
    minDate,
    maxDate,
    onChange,
    onKeyDown,
    dateFormat,
    dropdownMode,
    locale,
    inline,
    isClearable,
    disabled,
    showMonthYearPicker,
    showMonthDropdown,
    showYearDropdown,
    monthsShown,
    showTimeSelect,
    timeIntervals,
    timeInputLabel,
}) {
    return (
        <ReactDatePicker
            wrapperClassName={`${styles["date-picker"]} ${className ? className : ""}`}
            className={styles.input}
            clearButtonClassName={styles.clear}
            calendarIconClassname={styles.icon}
            popperClassName={styles.popper}
            dayClassName={() => styles.day}
            enableTabLoop={false}
            showIcon={true}
            selected={selected ? selected : new Date()}
            minDate={minDate}
            maxDate={maxDate ? maxDate : new Date()}
            onChange={onChange}
            dateFormat={dateFormat ? dateFormat : "MM/dd/yyyy"}
            dropdownMode={dropdownMode ? dropdownMode : "select"}
            locale={locale ? locale : "en"}
            inline={inline}
            isClearable={isClearable}
            disabled={disabled}
            showMonthYearPicker={showMonthYearPicker}
            showMonthDropdown={showMonthDropdown}
            showYearDropdown={showYearDropdown}
            monthsShown={monthsShown}
            showTimeSelect={showTimeSelect}
            timeIntervals={timeIntervals}
            timeInputLabel={timeInputLabel}
            toggleCalendarOnIconClick={true}
            onKeyDown={onKeyDown ? onKeyDown : () => { }}
        />
    );
}

export default DatePicker;