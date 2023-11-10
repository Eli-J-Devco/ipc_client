import { useTranslation } from "react-i18next";
import styles from './LoggingRate.module.scss';
import { RButton } from './../../../../../components/Controls';
import ReactSelectDropdown from '../../../../../components/ReactSelectDropdown';

function LoggingRate() {
    const { t } = useTranslation();
    const loggingRate = [
        { value: 0, label: '1 minutes' },
        { value: 1, label: '5 minutes' },
        { value: 2, label: '15 minutes' },
    ];
    var selectedLoggingRate = [];

    const handleDropdownChange = (event) => {

    }

    return (
        <div className={styles.logging_rate}>
            <div className='note'>
                <p> {t('site.logging_rate')} </p>
            </div>

            <div className={styles.form_body}>
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-3'></div>
                        <div className='col-md-6'>
                            <div className='mb-3'>
                                <div className='form_dropdown'>
                                    <ReactSelectDropdown
                                        label={t('site.logging_interval')}
                                        className="logging_interval"
                                        inputId="logging_interval"
                                        inputName="logging_interval"
                                        name="logging_interval"
                                        value={selectedLoggingRate}
                                        onChange={handleDropdownChange}
                                        optionList={loggingRate}

                                    />
                                </div>
                            </div>

                            <div className='form-footer'>
                                <div className='mb-3'>
                                    <RButton
                                        className="btn_back"
                                        text="Back"
                                        iClass={true}
                                        iClassType="back"
                                    />

                                    <RButton
                                        className="btn_save margin-left15"
                                        text="Save & Next"
                                        iClass={true}
                                        iClassType="save"
                                    />

                                    <RButton
                                        className="btn_skip margin-left15"
                                        text="Skip"
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

export default LoggingRate;