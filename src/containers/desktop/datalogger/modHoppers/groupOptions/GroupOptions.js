import { useTranslation } from "react-i18next";
import { RSwitch, RButton } from './../../../../../components/Controls';
import styles from './GroupOptions.module.scss';

function GroupOptions() {
    const { t } = useTranslation();
    const handleInputChange = (event) => {

    }
    return (
        <div className={styles.rs485}>
            <div className='note'>
                <p> {t('site.search_mbrtu_note')} </p>
            </div>

            <div className={styles.form_body}>
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-3'></div>
                        <div className='col-md-6'>
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
                        <div className='col-md-3'></div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default GroupOptions;