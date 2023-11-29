import Button from "../../../../../components/button/Button";
import FormInput from "../../../../../components/formInput/FormInput";
import styles from "./LoggingRate.module.scss";

function LoggingRate() {
    return (
        <div className={styles["logging-rate"]}>
            <FormInput.Select
                label="Logging Interval:"
                className={`mx-2 ${styles.interval}`}
                horizontal
                value={{label: "5 minutes", value: 2}}
                option={[{label: "1 minute", value: 1}, {label: "5 minutes", value: 2}, {label: "15 minutes", value: 3}]}
            />

            <div className={styles.action} >
                <Button className="m-2">
                    <Button.Text text="Apply"/>
                </Button>

                <Button className="m-2" variant="white">
                    <Button.Text text="Cancel"/>
                </Button>
            </div>
        </div>
    );
}

export default LoggingRate;