import { Component } from 'react';
import { withTranslation } from 'react-i18next';
import LeftMenuJsx from './LeftMenu.jsx';

class LeftMenu extends Component {

    constructor(props, context) {
        super(props, context);
        this.jsxTemplate = LeftMenuJsx;
        this.state = {
            permissions: []
        };
    }
    
    render() {
        return this.jsxTemplate.call(this)
    }
}


const HighOrderComponentTranslated = withTranslation('common')(LeftMenu)
export default HighOrderComponentTranslated;