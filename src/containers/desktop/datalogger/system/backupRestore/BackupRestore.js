import Button from "../../../../../components/button/Button";
import FormInput from "../../../../../components/formInput/FormInput";
import styles from "./BackupRestore.module.scss";

function BackupRestore() {
    return (
        <div className={styles["backup-restore"]}>
            <fieldset className={`${styles.fieldset}`}>
                <legend className={styles.legend}>
                    Backup
                </legend>

                <Button className="my-3">
                    <Button.Text text="Create Backup" />
                </Button>
            </fieldset>

            <fieldset className={`${styles.fieldset}`}>
                <legend className={styles.legend}>
                    Restore
                </legend>

                <FormInput>
                    <FormInput.File
                        name="file"
                        className="my-3"
                    />
                </FormInput>

                <Button className="my-3" >
                    <Button.Text text="Restore" />
                </Button>
            </fieldset>
        </div>
    );
}

export default BackupRestore;