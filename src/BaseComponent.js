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

    /**
     * @description default function reactJS
     */
    render() {
        return this.jsxTemplate.call(this);
    }
}