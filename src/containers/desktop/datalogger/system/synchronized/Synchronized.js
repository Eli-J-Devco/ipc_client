import Button from "../../../../../components/button/Button";
import FormInput from "../../../../../components/formInput/FormInput";
import styles from "./Synchronized.module.scss";
import { ReactComponent as HideIcon } from "../../../../../assets/images/hide.svg";

function Synchronized() {
    return (
        <div className={styles.synchronized}>
            <p className='note'>
                Notes
            </p>

            <div className={styles.channel}>
                <div className="d-flex flex-wrap gap-3">
                    <span>Upload Channel #1 is</span>

                    <div>
                        <FormInput.Check
                            label="Enabled"
                            type="radio"
                            inline
                            name="enabled_1"
                        />

                        <FormInput.Check
                            label="Disabled"
                            type="radio"
                            inline
                            name="disabled_1"
                        />
                    </div>
                </div>

                <div className="container my-3">
                    <div className="row">
                        <div className="col-md-3" />
                        
                        <div className="col-md-6" >
                            <div>
                                <FormInput
                                >
                                    <div className="row" >
                                        <div className="col-md-6">
                                            <FormInput.Select
                                                label="Protocol"
                                                name="protocol"
                                                className={styles.updates}
                                            />
                                        </div>
                                    </div>

                                    <FormInput.Text
                                        label="Upload URL"
                                        name="url"
                                        className="my-3"
                                    />

                                    <div className="row align-items-end flex-nowrap" >
                                        <div className="col-10 col-md-6">
                                            <FormInput.Text
                                                label="Password"
                                                name="password"
                                                className="my-3"
                                            />
                                        </div>
                                        <div className="col-2 col-md-6">
                                            <HideIcon
                                                className="my-4"
                                            />
                                        </div>
                                    </div>
                                </FormInput>
                            </div>
                        </div>

                        <div className="col-md-3" />
                    </div>
                </div>
            </div>

            <div className={styles.channel}>
                <div className="d-flex flex-wrap gap-3">
                    <span>Upload Channel #2 is</span>

                    <div>
                        <FormInput.Check
                            label="Enabled"
                            type="radio"
                            inline
                            name="enabled_2"
                        />

                        <FormInput.Check
                            label="Disabled"
                            type="radio"
                            inline
                            name="disabled_2"
                        />
                    </div>
                </div>
            </div>

            <div className="d-flex flex-wrap gap-3 justify-content-center mt-5">
                <Button>
                    <Button.Text text="Save" />
                </Button>

                <Button variant="white">
                    <Button.Text text="Cancel" />
                </Button>
            </div>
        </div>
    );
}

export default Synchronized;