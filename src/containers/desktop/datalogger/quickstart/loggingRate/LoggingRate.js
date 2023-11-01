import { Component } from 'react';
import { withTranslation } from 'react-i18next';
import LoggingRateJsx from './LoggingRate.jsx';

class LoggingRate extends Component {

    constructor(props, context) {
        super(props, context);
        this.jsxTemplate = LoggingRateJsx;
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


const HighOrderComponentTranslated = withTranslation('common')(LoggingRate)
export default HighOrderComponentTranslated;