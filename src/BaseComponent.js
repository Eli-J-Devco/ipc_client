import React from 'react';
import Constants from './utils/Constants';

export default class BaseComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentMode: Constants.SCREEN_MODE.VIEW, // mode update or edit
        }
        this.jsxTemplate = function () { };

        if (this.constructor === BaseComponent) {
            // Error Type 1. Abstract class can not be constructed.
            throw new TypeError("Can not construct abstract class.");
        }


    }

    handleInputChange(event, data) {
        let target = event.target;
        let name = target.name;
        let value = target.value
        if (target.type === 'checkbox') {
            value = target.checked ? 1 : 0;
        }
        if (name) {
            let item = this.state.curItem;
            item[name] = (event.target.validity.valid) ? value : this.state.curItem[name];
            if (event.setResultType) {
                this.setState({ curItem: item, resultType: value });
            } else {
                this.setState({ curItem: item });
            }
        }
    }

    /**
     * @description default function reactJS
     */
    render() {
        return this.jsxTemplate.call(this);
    }
}