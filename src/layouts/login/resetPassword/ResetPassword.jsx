/********************************************************
* Copyright 2020-2021 NEXT WAVE ENERGY MONITORING INC.
* All rights reserved.
* 
*********************************************************/
import React from 'react';
import styles from './ResetPassword.module.scss';
import { RButton, RPassword } from '../../../components/Controls'
import FormInput from '../../../components/formInput/FormInput';

export default function ResetPassword() {

  return (
    <div className={styles.main_reset_password}>
      <div className={styles.header_reset_password}></div>
      <div className={styles.box_reset_password}>
        <div className={styles.title}>
          Reset Password
        </div>
        <FormInput>
          <div className={styles.body_reset_password}>
            <div className={styles.form_group}>
              <FormInput.Text
                label="A new password"
                required="required"
                inputClass="form-control"
                inputId="password"
                inputName="password"
              // value={curItem.password}
              // onChange={(e) => { this.handleInputChange(e); this.validateOne(e) }}
              // onKeyPress={(e) => { this.onPasswordKeyPress(e) }}
              />
              <span className='icon-field'>
                <var className="icon-lock"></var>
              </span>
            </div>

            <div className={styles.form_group}>
              <RPassword
                label="Re-enter new password"
                required="required"
                inputClass="form-control"
                inputId="repassword"
                inputName="repassword"
              // value={curItem.password}
              // onChange={(e) => { this.handleInputChange(e); this.validateOne(e) }}
              // onKeyPress={(e) => { this.onPasswordKeyPress(e) }}
              />
              <span className='icon-field'>
                <var className="icon-lock"></var>
              </span>
            </div>

            <div className="row">
              <div className="col-xl-12 text-center">
                <div className={styles.btn_login}>
                  <RButton className="btn btn-primary btn-app"
                    // onClick={() => this.loginAdmin()}
                    text="Submit"
                    title="Submit" />
                </div>
              </div>
            </div>
          </div>
        </FormInput>
      </div>
    </div>
  );
};