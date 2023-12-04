import { useTranslation } from "react-i18next";
import styles from './RemoteAccess.module.scss';
import { RSwitch, RButton } from './../../../../../components/Controls';
import { Link } from "react-router-dom";

function RemoteAccess() {
    const { t } = useTranslation();

    const handleInputChange = (event) => {

    }

    return (
        <div className={styles.remote_access}>
            <div className='note'>
                <p> {t('site.remote_access_note')} </p>
            </div>

            <div className={styles.form_body}>
                <div className='container-fluid'>
                    <div className='row'>
                        <div className='col-md-12'>
                            <p>Remote Access Status <span className={styles.status}> R-A disabled</span></p>
                            <p>Copy this link for Remote Access <Link to={"https://ra-001EC6100136.nextwavemonitoring.com"} >https://ra-001EC6100136.nextwavemonitoring.com</Link></p>
                            <p>The Remote Access feature makes an outgoing connection to our R-A server to allow off-site configuration and monitoring. Connection is supported on Ethernet port 1 only and requires an R-A account and password as well as an R-A PIN.
                                After enabling, be sure to note your S/N and R-A PIN, which will be displayed at the top of this page.</p>
                        </div>

                        <div className='col-md-12'>
                            <div className='form-footer'>

                                <div className='mb-3'>
                                    <div className="checkmark">
                                        <RSwitch
                                            label={t('site.allow_remote')}
                                            inputId="allow_remote_access"
                                            inputName="allow_remote_access"
                                            checked={0}
                                            onChange={handleInputChange}
                                        />
                                    </div>

                                </div>

                                <div className='form-footer'>
                                    <div className='mb-3'>
                                        <RButton
                                            className="btn_save"
                                            text="Save"
                                            iClass={true}
                                            iClassType="save"
                                        />
                                    </div>
                                </div>

                            </div>

                        </div>
                        <div className='col-md-3'></div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default RemoteAccess;