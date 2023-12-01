import Button from "../../../../../components/button/Button";
import FormInput from "../../../../../components/formInput/FormInput";
import styles from "./DateTime.module.scss";

function DateTime() {
    return (
        <div>
            <div className='note'>
                <p>
                    <span>Local time: </span>
                    <span className={styles.red}>Thu, Aug 17 2023 20:47:32 PDT</span>
                </p>
                
                <p>
                    <span>UTC/GMT time: </span>
                    <span className={styles.red}>Fri, Aug 18 2023 03:48:05 GMT</span>
                </p>

                <p>
                    <span>Status: </span>
                    <span className={styles.red}>Synchronized to time server 108.61.56.35:123 (0.pool.ntp.org)</span>
                </p>
            </div>

            <div className="container">
                <div className="row">
                    <div className="col-md-3" />
                    
                    <div className="col-md-6" >
                        <div>
                            <FormInput
                            >
                                <div className="row align-items-end mt-3" >
                                    <div className="col-md-6">
                                        <FormInput.Select
                                            label="Time Protocol"
                                            name="protocol"
                                        />
                                    </div>

                                    <div className="col-md-6 text-nowrap mt-3 mt-md-0" >
                                        <Button>
                                            <Button.Text text="Sync Time Now" />
                                        </Button>
                                    </div>
                                </div>

                                <div className="row mt-3">
                                    <div className="col-md-6">
                                        <FormInput.Select
                                            label="Timezone"
                                            name="timezone"
                                        />
                                    </div>

                                    <div className="col-md-6" />
                                </div>

                                <FormInput.Text
                                    label="Time Server 1"
                                    name="time_server_1"
                                    className="my-3"
                                />

                                <FormInput.Text
                                    label="Time Server 2"
                                    name="time_server_2"
                                    className="my-3"
                                />

                                <FormInput.Text
                                    label="Time Server 3"
                                    name="time_server_3"
                                    className="my-3"
                                />

                                <FormInput.Text
                                    label="Time Server 4"
                                    name="time_server_4"
                                    className="my-3"
                                />
                            </FormInput>

                            <div className="mt-5 d-flex flex-wrap gap-3">
                                <Button>
                                    <Button.Text text="Save" />
                                </Button>

                                <Button variant="white" >
                                    <Button.Text text="Cancel" />
                                </Button>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-3" />
                </div>
            </div>
        </div>
    );
}

export default DateTime;