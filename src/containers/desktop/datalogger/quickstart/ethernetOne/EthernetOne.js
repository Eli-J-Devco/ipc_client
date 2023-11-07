import { Component } from 'react';
import { withTranslation } from 'react-i18next';
import EthernetOneJsx from './EthernetOne.jsx';

class EthernetOne extends Component {

    constructor(props, context) {
        super(props, context);
        this.jsxTemplate = EthernetOneJsx;
        this.state = {
            tab: 1
        };
    }


    handleDropdownChange = (item) => {
       
    }


    render() {
        return this.jsxTemplate.call(this)
    }
}


const HighOrderComponentTranslated = withTranslation('common')(EthernetOne)
export default HighOrderComponentTranslated;