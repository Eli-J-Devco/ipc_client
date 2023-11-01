import { Component } from 'react';
import { withTranslation } from 'react-i18next';
import FirmwareJsx from './Firmware.jsx';

class Firmware extends Component {

    constructor(props, context) {
        super(props, context);
        this.jsxTemplate = FirmwareJsx;
        this.state = {
            tab: 1
        };
    }


    onClickChangeTab = (index) => {
        this.setState({
            tab: index
        });
    }

    render() {
        return this.jsxTemplate.call(this)
    }
}


const HighOrderComponentTranslated = withTranslation('common')(Firmware)
export default HighOrderComponentTranslated;