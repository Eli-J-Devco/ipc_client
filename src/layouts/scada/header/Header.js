import { Component } from 'react';
import { withTranslation } from 'react-i18next';
import HeaderJsx from './Header.jsx';

class Header extends Component {

    constructor(props, context) {
        super(props, context);
        this.jsxTemplate = HeaderJsx;
        this.state = {
            permissions: []
        };
    }
    
    render() {
        return this.jsxTemplate.call(this)
    }
}


const HighOrderComponentTranslated = withTranslation('common')(Header)
export default HighOrderComponentTranslated;