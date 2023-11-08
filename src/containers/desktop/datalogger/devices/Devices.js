/********************************************************
* Copyright 2020-2021 NEXT WAVE ENERGY MONITORING INC.
* All rights reserved.
* 
*********************************************************/
import { Component } from 'react';
import { withTranslation } from 'react-i18next';
import DevicesJsx from './Devices.jsx';

class Devices extends Component {

    constructor(props, context) {
        super(props, context);
        this.jsxTemplate = DevicesJsx;
        this.state = {
            tab: 1,
            isAddDevice: false
        };
    }


    handleDropdownChange = (item) => {
       
    }

    openAddDevice = () => { 
        this.setState({
            isAddDevice: true
        })
    }

    closeAddDevice = () => {
        this.setState({
            isAddDevice: false
        })
    }

    render() {
        return this.jsxTemplate.call(this)
    }
}


const HighOrderComponentTranslated = withTranslation('common')(Devices)
export default HighOrderComponentTranslated;

