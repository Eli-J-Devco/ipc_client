import React from 'react';


export const RText = (props) => (
  <React.Fragment>
      {(props.label !== "" && typeof props.label != 'undefined') &&
          <label className="control-label">{props.label}
              {props.required === 'required' ? <span className="required">*</span> : null}
          </label>}
      {props.labelIcon && 
          <i className={"icon-tip-help "+ props.iconClass} onClick={props.iconClick} aria-hidden="true" data-tip = {props.dataTooktip}></i>
      }
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
  </React.Fragment>
)

export const RCheckbox = (props) => (
    <React.Fragment>
        <input
            id={props.inputId}
            type="checkbox"
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
            {(props.label !== "" && typeof props.label != 'undefined') && props.label}
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
          <i className={props.iconClass||null} aria-hidden="true"></i>
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
          autoComplete = {props.autoComplete}
      />
  </React.Fragment>
)

export const RButton = (props) => (
    
  <React.Fragment>
      <button id={props.btnId} disabled={((!props.auth) && props.auth !== undefined) || ((props.auth) && props.disabled)}
          className={props.className} onClick={props.onClick} type="button" aria-hidden="false" title={props.title}>
          {props.iClass != null && typeof props.iClass != 'undefined' ? <i className={props.iClass}
          /> : null}
          {props.text != null && typeof props.text != 'undefined' ? props.text : null}
      </button>
  </React.Fragment>
)