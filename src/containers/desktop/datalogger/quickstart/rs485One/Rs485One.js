import { Component } from 'react';
import { withTranslation } from 'react-i18next';
import Rs485OneJsx from './Rs485One.jsx';

class Rs485One extends Component {

    constructor(props, context) {
        super(props, context);
        this.jsxTemplate = Rs485OneJsx;
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


const HighOrderComponentTranslated = withTranslation('common')(Rs485One)
export default HighOrderComponentTranslated;