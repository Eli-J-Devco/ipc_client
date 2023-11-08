/********************************************************
* Copyright 2020-2021 NEXT WAVE ENERGY MONITORING INC.
* All rights reserved.
* 
*********************************************************/
import { Component } from 'react';
import { withTranslation } from 'react-i18next';
import AddDeviceJsx from './AddDevice.jsx';

class AddDevice extends Component {

    constructor(props, context) {
        super(props, context);
        this.jsxTemplate = AddDeviceJsx;
        this.state = {
            tab: 1,
            isAddMultipleDevice: false,
            curItem: {
              Modbus_TCP: 1
            }
        };
    }

    handleInputChange(event, data) {
      let target = event.target;
      let name = target.name;
      let value = target.value
      if (target.type === 'radio') {
          value = target.checked ? 1 : 0;
      }
      
      if (name) {
          let item = {} ;
          item[name] = (event.target.validity.valid) ? value : this.state.curItem[name];
          this.setState({ curItem: item});
      }
  }

    handleDropdownChange = (item) => {
       
    }

    openAddMultipleDevice = () => {
      this.setState({
        isAddMultipleDevice: true
      })
    }

    closeAddMultipleDevice = () => {
      this.setState({
        isAddMultipleDevice: false
      })
    }


    render() {
        return this.jsxTemplate.call(this)
    }
}


const HighOrderComponentTranslated = withTranslation('common')(AddDevice)
export default HighOrderComponentTranslated;

