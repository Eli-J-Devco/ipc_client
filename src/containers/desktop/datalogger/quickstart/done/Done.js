import { Component } from 'react';
import { withTranslation } from 'react-i18next';
import DoneJsx from './Done.jsx';

class Done extends Component {

    constructor(props, context) {
        super(props, context);
        this.jsxTemplate = DoneJsx;
        this.state = {
            tab: 1
        };
    }


    render() {
        return this.jsxTemplate.call(this)
    }
}


const HighOrderComponentTranslated = withTranslation('common')(Done)
export default HighOrderComponentTranslated;