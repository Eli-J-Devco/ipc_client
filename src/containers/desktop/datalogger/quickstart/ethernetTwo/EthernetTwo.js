import { Component } from 'react';
import { withTranslation } from 'react-i18next';
import EthernetTwoJsx from './EthernetTwo.jsx';

class EthernetTwo extends Component {

    constructor(props, context) {
        super(props, context);
        this.jsxTemplate = EthernetTwoJsx;
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


const HighOrderComponentTranslated = withTranslation('common')(EthernetTwo)
export default HighOrderComponentTranslated;