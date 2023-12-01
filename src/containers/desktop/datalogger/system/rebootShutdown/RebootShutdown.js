import Button from "../../../../../components/button/Button";
import styles from "./RebootShutdown.module.scss";

function RebootShutdown() {
    return (
        <div className={styles.firmware}>
            <fieldset className={`${styles.fieldset}`}>
                <legend className={styles.legend}>
                    Reboot System
                </legend>
                
                <Button className="my-3">
                    <Button.Text text="Reboot" />
                </Button>
            </fieldset>

            <fieldset className={`${styles.fieldset}`}>
                <legend className={styles.legend}>
                    Shutdown System
                </legend>

                <Button className="my-3" >
                    <Button.Text text="Shutdown" />
                </Button>
            </fieldset>
        </div>
    );
}

export default RebootShutdown;