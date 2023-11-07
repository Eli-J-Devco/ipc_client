import { withTranslation } from 'react-i18next';
import BaseComponent from '../../../../../BaseComponent.js';
import SiteInformationJsx from './SiteInformation.jsx';

class SiteInformation extends BaseComponent {

    constructor(props, context) {
        super(props, context);
        this.jsxTemplate = SiteInformationJsx;
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


const HighOrderComponentTranslated = withTranslation('common')(SiteInformation)
export default HighOrderComponentTranslated;