import { useTranslation } from "react-i18next";
import styles from './Done.module.scss';
import { RButton } from './../../../../../components/Controls';
import ReactSelectDropdown from '../../../../../components/ReactSelectDropdown';

function Done() {
    const { t } = useTranslation();
    const Done = [
        { value: 0, label: 'Link 1' },
        { value: 1, label: 'Link 2' },
        { value: 2, label: 'Link 3' },
    ];
    var selectedDone = [];

    const handleDropdownChange = (event) => {

    }

    return (
        <div className={styles.done}>
            <div className='note'>
                <p> {t('site.done_note')} </p>
            </div>

            <div className={styles.form_body}>
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-3'></div>
                        <div className='col-md-6'>
                            <div className='mb-3'>
                                <div className='form_dropdown'>
                                    <ReactSelectDropdown
                                        label={t('site.go_to_page')}
                                        className="go_to_page"
                                        inputId="go_to_page"
                                        inputName="go_to_page"
                                        name="go_to_page"
                                        value={selectedDone}
                                        onChange={handleDropdownChange}
                                        optionList={Done}

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

export default Done;