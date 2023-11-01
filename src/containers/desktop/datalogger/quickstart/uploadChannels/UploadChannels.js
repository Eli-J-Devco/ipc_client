import { Component } from 'react';
import { withTranslation } from 'react-i18next';
import UploadChannelsJsx from './UploadChannels.jsx';

class UploadChannels extends Component {

    constructor(props, context) {
        super(props, context);
        this.jsxTemplate = UploadChannelsJsx;
        this.state = {
            tab: 1
        };
    }


    render() {
        return this.jsxTemplate.call(this)
    }
}


const HighOrderComponentTranslated = withTranslation('common')(UploadChannels)
export default HighOrderComponentTranslated;