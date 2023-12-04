import Button from "../../../../../components/button/Button";
import FormInput from "../../../../../components/formInput/FormInput";
import styles from "./Firmware.module.scss";

function Firmware() {
    return (
        <div className={styles.firmware}>
            <fieldset className={`${styles.fieldset}`}>
                <legend className={styles.legend}>
                    Current Firmware Installed
                </legend>
                
                <div className="row">
                    <div className="col-3">
                        <b>Release</b>
                        <p>Apps</p>
                        <p>System</p>
                        <p>Kernel</p>
                    </div>

                    <div className="col-6">
                        <b>v04.22.0526</b>
                        <p>v04.22.0526+gca46dae</p>
                        <p>v04.22.0526+ge32d96d</p>
                        <p>L4.1.15-rM5O+g76bd3bf</p>
                    </div>

                    <div className="col-3">
                        <b>(production)</b>
                        <p>(production)</p>
                        <p>(production)</p>
                        <p>(production)</p>
                    </div>
                </div>

                <Button className="my-3">
                    <Button.Text text="Check for updates" />
                </Button>
            </fieldset>

            <fieldset className={`${styles.fieldset}`}>
                <legend className={styles.legend}>
                    Upload Firmware Files
                </legend>

                <p>Firmware may also be upgraded by selecting and uploading files.</p>

                <FormInput>
                    <FormInput.File
                        name="file"
                        className="my-3"
                    />
                </FormInput>

                <Button className="my-3" >
                    <Button.Text text="Upload Firmware" />
                </Button>
            </fieldset>
        </div>
    );
}

export default Firmware;