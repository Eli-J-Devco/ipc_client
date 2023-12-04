import { useTranslation } from "react-i18next";
import React, { useState } from 'react';
import styles from './ModHoppersOne.module.scss';
import { RButton, RRadio } from './../../../../../components/Controls';

function ModHoppersOne() {
    const { t } = useTranslation();
    const [display, setDisplay] = useState(0);

    return (
        <div className={styles.modhoppers}>
            <div className='note'>
                <p> {t('site.modhoppers_note')} </p>
            </div>

            <div className={styles.form_body}>
                <div className='container-fluid'>
                    <div className='row'>
                        <div className='col-md-3'></div>
                        <div className='col-md-6'>
                            <div className='mb-3'>
                                <div className="row">
                                    <div className="col-md-2">
                                        Status:
                                    </div>
                                    <div className="col-md-10">
                                        <span style={{ color: "red" }}>No ModHoppers found. </span>
                                    </div>
                                </div>
                            </div>

                            <div className='mb-3'>
                                <div className="row">
                                    <div className="col-md-2">
                                        Display:
                                    </div>
                                    <div className="col-md-10">
                                        <div className='mb-3'>
                                            <div>
                                                <RRadio
                                                    label={t('site.names_only')}
                                                    inputId="display"
                                                    inputName="display"
                                                    checked={display === 1 ? 1 : 0}
                                                    onChange={() => setDisplay(1)}
                                                />
                                            </div>

                                            <div>
                                                <RRadio
                                                    label={t('site.name_and_statistics')}
                                                    inputId="display"
                                                    inputName="display"
                                                    checked={display === 1 ? 1 : 0}
                                                    onChange={() => setDisplay(1)}
                                                />

                                            </div>
                                            <div>
                                                <RRadio
                                                    label={t('site.attached_devices_only')}
                                                    inputId="display"
                                                    inputName="display"
                                                    checked={display === 1 ? 1 : 0}
                                                    onChange={() => setDisplay(1)}
                                                />
                                            </div>
                                        </div>


                                    </div>
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
                        <div className='col-md-3'></div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default ModHoppersOne;