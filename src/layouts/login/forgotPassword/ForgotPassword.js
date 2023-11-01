/********************************************************
* Copyright 2020-2021 NEXT WAVE ENERGY MONITORING INC.
* All rights reserved.
* 
*********************************************************/
import { Component } from 'react';
import { withTranslation } from 'react-i18next';
import ForgotPasswordJsx from './ForgotPassword.jsx';

class ForgotPassword extends Component {

    constructor(props, context) {
        super(props, context);
        this.jsxTemplate = ForgotPasswordJsx;
        this.state = {
            permissions: []
        };
    }
    
    render() {
        return this.jsxTemplate.call(this)
    }
}


const HighOrderComponentTranslated = withTranslation('common')(ForgotPassword)
export default HighOrderComponentTranslated;