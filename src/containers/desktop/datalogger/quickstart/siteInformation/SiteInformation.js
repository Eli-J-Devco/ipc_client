import { useTranslation } from "react-i18next";
import styles from './SiteInformation.module.scss';
import { RText, RButton } from './../../../../../components/Controls';

function SiteInformation() {
    const { t } = useTranslation();
    return (
        <div className={styles.site_information}>
            <div className='note'>
                <p> {t('site.info_note')} </p>
            </div>
            <div className={styles.form_body}>
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-3'></div>
                        <div className='col-md-6'>
                            <div className='mb-3'>
                                <RText
                                    label={t('site.site_name')}
                                    inputClass="form-control"
                                    inputId="site_name"
                                    inputName="site_name"
                                    name="site_name"
                                    onChange={(e) => { this.handleInputChange(e) }}
                                />
                            </div>


                            <div className='mb-3'>
                                <RText
                                    label={t('site.location')}
                                    inputClass="form-control"
                                    inputId="location"
                                    inputName="location"
                                    name="location"
                                    onChange={(e) => { this.handleInputChange(e) }}
                                />
                            </div>


                            <div className='mb-3'>
                                <RText
                                    label={t('site.description')}
                                    inputClass="form-control"
                                    inputId="description"
                                    inputName="description"
                                    name="description"
                                    onChange={(e) => { this.handleInputChange(e) }}
                                />
                            </div>

                            <div className='mb-3'>
                                <RText
                                    label={t('site.admin_contact')}
                                    inputClass="form-control"
                                    inputId="admin_contact"
                                    inputName="admin_contact"
                                    name="admin_contact"
                                    onChange={(e) => { this.handleInputChange(e) }}
                                />
                            </div>


                            <div className='form-footer'>
                                <div className='mb-3'>
                                    <RButton
                                        className="btn_save margin-left15"
                                        text="Save & Next"
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

export default SiteInformation;