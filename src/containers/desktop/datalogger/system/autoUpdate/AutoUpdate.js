import Button from "../../../../../components/button/Button";
import FormInput from "../../../../../components/formInput/FormInput";
import styles from "./AutoUpdate.module.scss";

function AutoUpdate() {
    return (
        <div>
            <p className='note'>
                <span>Status Last checked: </span>
                <span className={styles.red}>Thursday, Jun 01 2023 15:16:23 PDT</span>
            </p>

            <FormInput.Select
                label="Automatic firmware updates"
                name="auto_update"
                className={styles.updates}
            />

            <Button className="my-3">
                <Button.Text text="Upload Firmware" />
            </Button>
        </div>
    );
}

export default AutoUpdate;