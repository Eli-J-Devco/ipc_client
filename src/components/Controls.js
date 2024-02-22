import React from 'react';

export const RRadio = (props) => (
    <React.Fragment>
        <div className="radio_box">
            <label>
                <input id={props.inputId} type="radio" name={props.inputName}
                    onChange={props.onChange} disabled={props.disabled} onKeyPress={props.rEnter}
                    checked={(props.checked === 1) ? true : false}
                />
                <span className="lever switch-col-darkblue" />

                {(props.label !== "" && typeof props.label !== 'undefined') ?
                    <var className="radio_var" htmlFor={props.inputId} >
                        {props.label}
                    </var>
                    : null}

            </label>
        </div>


    </React.Fragment>
)

export const RSwitch = (props) => (
    <React.Fragment>
        <div className="switch">
            <label>
                <input id={props.inputId} type="checkbox" name={props.inputName}
                    onChange={props.onChange} disabled={props.disabled} onKeyPress={props.rEnter}
                    checked={(props.checked === 1) ? true : false}
                />
                <span className="lever switch-col-darkblue" />

                {(props.label !== "" && typeof props.label !== 'undefined') ?
                    <var className="control-var" htmlFor={props.inputId} >
                        {props.label}
                    </var>
                    : null}

            </label>
        </div>

    </React.Fragment>
)

export const RText = (props) => (
    <React.Fragment>
        {(props.label !== "" && typeof props.label != 'undefined') &&
            <label className="control-label">{props.label}
                {props.required === 'required' ? <span className="required">*</span> : null}
            </label>}
        {props.labelIcon &&
            <i className={"icon-tip-help " + props.iconClass} onClick={props.iconClick} aria-hidden="true" data-tip={props.dataTooktip}></i>
        }
        <div className='d-flex mt-1 mb-3'>
            <input id={props.inputId ? props.inputId : null}
                style={props.style ? props.style : null}
                className={props.inputClass}
                name={props.inputName}
                maxLength={typeof props.maxLength !== 'undefined' ? props.maxLength : null}
                value={props.value == null || typeof props.value === 'undefined' ? '' : props.value}
                placeholder={props.placeholder}
                onChange={props.onChange} tabIndex={props.tabindex}
                // disabled={props.disabled} onKeyPress={Libs.rEnter}
                onKeyUp={props.onKeyUp}
                onFocus={props.onFocus}
                onClick={props.onClick}
                onKeyDown={props.onKeyDown}
                autoComplete="off"
                onBlur={props.onBlur}
                pattern={props.pattern == null || typeof props.pattern === 'undefined' ? '.*' : props.pattern}
            />

            {(props.info !== "" && typeof props.info !== 'undefined') &&

                <span className='help' data-tooltip-id="my-tooltip" data-tooltip-content={props.info} style={{ position: 'relative', marginLeft: "8px", top: '4px' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" width="22px" height="22px">
                        <path d="M 25 2 C 12.309295 2 2 12.309295 2 25 C 2 37.690705 12.309295 48 25 48 C 37.690705 48 48 37.690705 48 25 C 48 12.309295 37.690705 2 25 2 z M 25 4 C 36.609824 4 46 13.390176 46 25 C 46 36.609824 36.609824 46 25 46 C 13.390176 46 4 36.609824 4 25 C 4 13.390176 13.390176 4 25 4 z M 25 11 A 3 3 0 0 0 22 14 A 3 3 0 0 0 25 17 A 3 3 0 0 0 28 14 A 3 3 0 0 0 25 11 z M 21 21 L 21 23 L 22 23 L 23 23 L 23 36 L 22 36 L 21 36 L 21 38 L 22 38 L 23 38 L 27 38 L 28 38 L 29 38 L 29 36 L 28 36 L 27 36 L 27 21 L 26 21 L 22 21 L 21 21 z" />
                    </svg>
                </span>

                // <label className="control-label">{props.label}
                //     {props.required === 'required' ? <span className="required">*</span> : null}
                // </label>
            }
        </div>

    </React.Fragment>
)

export const RCheckbox = (props) => (
    <React.Fragment>
        <input
            id={props.inputId}
            type={props.type ? props.type : "checkbox"}
            name={props.inputName}
            className={props.inputClass != null && typeof props.inputClass != 'undefined' ? props.inputClass :
                "filled-in chk-col-blue"}
            onChange={props.onChange}
            onClick={props.onClick}
            // disabled={!Libs.isBlank(props.disabled) ? props.disabled : false}
            // readOnly={!Libs.isBlank(props.readOnly) ? props.readOnly : false}
            // onKeyPress={Libs.rEnter}
            value={props.value}
            checked={(props.checked === 1) ? true : false}
        />
        <label htmlFor={props.inputId} className={"chkbox-gray-border " + (props.labelClass ? props.labelClass : "")}>
            {(props.label !== "" && typeof props.label != 'undefined') && <var style={{ fontStyle: "normal" }} >{props.label}</var>}
        </label>
    </React.Fragment>
)

export const RPassword = (props) => (
    <React.Fragment>
        {(props.label !== "" && typeof props.label != 'undefined') ?
            <label className="control-label">{props.label}
                {props.required === 'required' ? <span className="required">*</span> : null}
            </label> : null}
        {props.labelIcon &&
            <i className={props.iconClass || null} aria-hidden="true"></i>
        }
        <input id={props.inputId ? props.inputId : null}
            type="password"
            className={props.inputClass}
            name={props.inputName}
            value={props.value == null || typeof props.value === 'undefined' ? '' : props.value}
            placeholder={props.placeholder}
            onChange={props.onChange} tabIndex={props.tabindex}
            // disabled={props.disabled} onKeyPress={Libs.rEnter}
            maxLength={typeof props.maxLength !== 'undefined' ? props.maxLength : null}
            onBlur={props.onBlur}
            autoComplete={props.autoComplete}
        />
    </React.Fragment>
)

export const RButton = (props) => (

    <React.Fragment>
        <button
            id={props.btnId} disabled={((!props.auth) && props.auth !== undefined) || ((props.auth) && props.disabled)}
            className={props.className}
            onClick={props.onClick}
            type="button" aria-hidden="false"
            title={props.title}>

            {props.iClass !== false && props.iClassType !== null && typeof props.iClass !== 'undefined' ?
                props.iClassType === 'back' ?
                    <svg className='icon_back' xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" width="14" height="14" viewBox="0 0 256 256" xmlSpace="preserve">
                        <defs>
                        </defs>
                        <g
                            style={{
                                stroke: "none", strokeWidth: "0", strokeDasharray: "none", strokeLinecap: "butt", strokeLinejoin: "miter",
                                strokeMiterlimit: 10, fill: "none", fillRule: "nonzero", opacity: 1
                            }}
                            transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)" >
                            <path d="M 65.75 90 c 0.896 0 1.792 -0.342 2.475 -1.025 c 1.367 -1.366 1.367 -3.583 0 -4.949 L 29.2 45 L 68.225 5.975 c 1.367 -1.367 1.367 -3.583 0 -4.95 c -1.367 -1.366 -3.583 -1.366 -4.95 0 l -41.5 41.5 c -1.367 1.366 -1.367 3.583 0 4.949 l 41.5 41.5 C 63.958 89.658 64.854 90 65.75 90 z"

                                style={{ stroke: "none", strokeWidth: 1, strokeDasharray: "none", strokeLinecap: "butt", strokeLinejoin: "miter", strokeMiterlimit: 10, fill: "rgb(0,0,0)", fillRule: "nonzero", opacity: 1 }}
                                transform=" matrix(1 0 0 1 0 0) " strokeLinecap="round" />
                        </g>
                    </svg>
                    : props.iClassType === 'save' ?
                        <svg version="1.1" className='icon_save' width="16" height="16" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                            viewBox="0 0 256 256" style={{ enableBackground: "new 0 0 256 256", fill: "white" }} xmlSpace="preserve">

                            <g transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)">
                                <path className="st0" d="M88,90H2c-1.1,0-2-0.9-2-2V2c0-1.1,0.9-2,2-2h65.8c0.5,0,1,0.2,1.4,0.6l20.2,20.2c0.4,0.4,0.6,0.9,0.6,1.4V88
		C90,89.1,89.1,90,88,90z M4,86h82V23L67,4H4V86z"/>
                                <path className="st0" d="M71.8,90H18.2c-1.1,0-2-0.9-2-2V48.2c0-1.1,0.9-2,2-2h53.7c1.1,0,2,0.9,2,2V88C73.8,89.1,72.9,90,71.8,90z
		 M20.2,86h49.7V50.2H20.2V86z"/>
                                <path className="st0" d="M54.4,21.6H18.2c-1.1,0-2-0.9-2-2V2c0-1.1,0.9-2,2-2h36.3c1.1,0,2,0.9,2,2v17.6C56.4,20.8,55.5,21.6,54.4,21.6
		z M20.2,17.6h32.3V4H20.2V17.6z"/>
                                <path className="st0" d="M88,90H2c-1.1,0-2-0.9-2-2V2c0-1.1,0.9-2,2-2h65.8c0.5,0,1,0.2,1.4,0.6l20.2,20.2c0.4,0.4,0.6,0.9,0.6,1.4V88
		C90,89.1,89.1,90,88,90z M4,86h82V23L67,4H4V86z"/>
                                <path className="st0" d="M62.7,60.3H27.3c-1.1,0-2-0.9-2-2s0.9-2,2-2h35.4c1.1,0,2,0.9,2,2S63.8,60.3,62.7,60.3z" />
                                <path className="st0" d="M62.7,70.1H27.3c-1.1,0-2-0.9-2-2s0.9-2,2-2h35.4c1.1,0,2,0.9,2,2S63.8,70.1,62.7,70.1z" />
                                <path className="st0" d="M62.7,79.8H27.3c-1.1,0-2-0.9-2-2s0.9-2,2-2h35.4c1.1,0,2,0.9,2,2S63.8,79.8,62.7,79.8z" />
                            </g>
                        </svg>
                        : null

                : null}

            {props.text !== null && typeof props.text !== 'undefined' ? <span className='string'>{props.text}</span> : null}
        </button>
    </React.Fragment>
)