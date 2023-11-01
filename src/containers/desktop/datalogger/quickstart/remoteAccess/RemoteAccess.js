import { Component } from 'react';
import { withTranslation } from 'react-i18next';
import RemoteAccessJsx from './RemoteAccess.jsx';

class RemoteAccess extends Component {

    constructor(props, context) {
        super(props, context);
        this.jsxTemplate = RemoteAccessJsx;
        this.state = {
            tab: 1
        };
    }


    render() {
        return this.jsxTemplate.call(this)
    }
}


const HighOrderComponentTranslated = withTranslation('common')(RemoteAccess)
export default HighOrderComponentTranslated;