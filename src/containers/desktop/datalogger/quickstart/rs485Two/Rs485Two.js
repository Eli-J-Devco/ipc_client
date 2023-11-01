import { Component } from 'react';
import { withTranslation } from 'react-i18next';
import Rs485TwoJsx from './Rs485Two.jsx';

class Rs485Two extends Component {

    constructor(props, context) {
        super(props, context);
        this.jsxTemplate = Rs485TwoJsx;
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


const HighOrderComponentTranslated = withTranslation('common')(Rs485Two)
export default HighOrderComponentTranslated;