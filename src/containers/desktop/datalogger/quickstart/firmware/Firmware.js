import { useTranslation } from "react-i18next";
import styles from './Firmware.module.scss';

function Firmware() {
    const { t } = useTranslation();

    return (
        <div className={styles.firmwre}>
            <div className='note'>
                <p> {t('site.firmware_note')} </p>
            </div>

            <div className={styles.form_body}>
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-3'></div>
                        <div className='col-md-6'>
                            Firmware
                        </div>
                        <div className='col-md-3'></div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Firmware;
