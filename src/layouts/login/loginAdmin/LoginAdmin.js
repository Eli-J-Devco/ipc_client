/********************************************************
* Copyright 2020-2021 NEXT WAVE ENERGY MONITORING INC.
* All rights reserved.
* 
*********************************************************/
import { Component } from 'react';
import { withTranslation } from 'react-i18next';
import LoginAdminJsx from './LoginAdmin.jsx';

class LoginAdmin extends Component {

    constructor(props, context) {
        super(props, context);
        this.jsxTemplate = LoginAdminJsx;
        this.state = {
            permissions: []
        };
    }
    
    render() {
        return this.jsxTemplate.call(this)
    }
}


const HighOrderComponentTranslated = withTranslation('common')(LoginAdmin)
export default HighOrderComponentTranslated;