import { Component } from 'react';
import { withTranslation } from 'react-i18next';
import QuickStartJsx from './QuickStart.jsx';

class QuickStart extends Component {

    constructor(props, context) {
        super(props, context);
        this.jsxTemplate = QuickStartJsx;
        this.state = {
            tab: 2
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


const HighOrderComponentTranslated = withTranslation('common')(QuickStart)
export default HighOrderComponentTranslated;