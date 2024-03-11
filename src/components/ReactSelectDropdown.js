import React, { Component } from "react";
import PropTypes from "prop-types";
import Select, { components } from "react-select";
import { cloneDeep } from "lodash-es";
class ReactSelectDropdown extends Component {
    constructor(props) {
        super(props);
        this.state = {
            className: 'form-control-label',
        }
    }


    render() {
        let {
            selectKey,
            name,
            id,
            onChange,
            className,
            value,
            label,
            required,
            optionList,
            isDisabled,
            isLoading,
            isClearable,
            isMulti,
            isRtl,
            isSearchable,
            isOptionDisabled,
            defaultValue,
            placeHolder,
            instanceId,
            hideSelectedOptions,
            closeMenuOnSelect,
            customMultiValue,
            handleSiteGroupSelectOnClick
        } = this.props;

        const customStyles = {
            option: (provided, state) => ({
                ...provided,
                fontWeight: state.isSelected ? "bold" : "normal",
                paddingLeft: "20px"
            }),
            singleValue: (provided, state) => ({
                ...provided,
                minHeight: "34px",
                lineHeight: "34px"
            }),
            control: (provided, state) => ({
                ...provided,
                minHeight: "34px",
                outline: 'none',
                border: "1px solid #ced4da",
            }),
            input: (provided, state) => ({
                ...provided,
                minHeight: "28px",
                outline: "none"
            }),

            dropdownIndicator: (provided, state) => ({
                ...provided,
                padding: "5px",
            }),
            indicatorSeparator: (provided, state) => ({
                ...provided,
                padding: "0px",
            }),
            clearIndicator: (provided, state) => ({
                ...provided,
                padding: "0px",
            }),



            placeholder: (provided, state) => ({
                ...provided,
                padding: "0px 8px",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                maxWidth: "calc(100% - 8px)"

            }),

            valueContainer: (provided, state) => ({
                ...provided,
                padding: "0px 8px",
            }),
            menu: (provided, state) => ({
                ...provided,
                zIndex: 9,
            }),
        };

        const IndicatorSeparator = () => null;

        const MultiValue = (props) => {
            if (props.data.value === "*") return null;
            if (!customMultiValue) return <components.MultiValue {...props} />;
            const maxToShow = 5 + (props.getValue().some(item => item.value === "*") ? 1 : 0);
            const overflow = props.getValue().slice(maxToShow).map(item => item.label);

            return props.index < maxToShow ?
                <components.MultiValue {...props} />
                : props.index === maxToShow ? <MoreSelectedBadge items={overflow} /> : null;
        };

        const MoreSelectedBadge = ({ items }) => {
            const style = {
                background: "#ffda00",
                borderRadius: "4px",
                fontSize: "11px",
                padding: "4px"
            };

            const title = items.join(", ");
            const length = items.length;
            const label = `+ ${length} site${length !== 1 ? "s" : ""}`;

            return (
                <div style={style} title={title}>
                    {label}
                </div>
            );
        };

        const GroupHeading = (props) => {
            const isChecked = props.data.options.length === props.selectProps.value.filter(item => item.id_site_group === props.data.id).length;
            const groupStyles = {
                padding: '0 10px 5px 10px',
                fontSize: 11,
                color: '#a5a5a5',
                display: 'flex',
                alignItems: 'center',
            };
            const groupBadgeStyles = {
                backgroundColor: isChecked ? '#ffda00' : '#EBECF0',
                borderRadius: '2em',
                color: '#222222',
                fontSize: 11,
                padding: '0.16666666666667em 0.5em',
                textAlign: 'center',
                marginLeft: '5px',
                cursor: "pointer"
            };

            return (
                <div style={groupStyles}>
                    <span>{props.children}</span>
                    <span style={groupBadgeStyles} onClick={() => { if (handleSiteGroupSelectOnClick instanceof Function) handleSiteGroupSelectOnClick(cloneDeep(props.data)); }}>{props.data.options.length}</span>
                </div>
            );
        };

        return (
            <div>
                {label ?
                    <label className="control-label mb-1" htmlFor={name}>
                        {label} {required === 'required' ? <span className="required">*</span> : null}
                    </label>
                    : ''}

                <Select
                    key={selectKey}
                    id={id}
                    placeholder={placeHolder}
                    className={className}
                    classNamePrefix="select"
                    defaultValue={defaultValue}
                    isDisabled={isDisabled}
                    isLoading={isLoading}
                    isClearable={isClearable}
                    isMulti={isMulti}
                    isRtl={isRtl}
                    isSearchable={isSearchable}
                    name={name}
                    value={value}
                    options={optionList}
                    onChange={onChange}
                    isOptionDisabled={isOptionDisabled}
                    instanceId={instanceId}
                    styles={customStyles}
                    hideSelectedOptions={hideSelectedOptions}
                    closeMenuOnSelect={closeMenuOnSelect}
                    menuPlacement="auto"
                    components={{
                        IndicatorSeparator,
                        MultiValue,
                        GroupHeading
                    }}
                />
            </div>
        );

    }

}


ReactSelectDropdown.propTypes = {
    selectKey: PropTypes.string,
    id: PropTypes.string,
    errorMsg: PropTypes.string,
    value: PropTypes.any,
    label: PropTypes.string,
    optionValue: PropTypes.string,
    className: PropTypes.string.isRequired,
    defaultValue: PropTypes.object,
    isDisabled: PropTypes.bool,
    isLoading: PropTypes.bool,
    isClearable: PropTypes.bool,
    isMulti: PropTypes.bool,
    isRtl: PropTypes.bool,
    isSearchable: PropTypes.bool,
    name: PropTypes.string.isRequired,
    optionList: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired,
    isOptionDisabled: PropTypes.bool,
    placeholder: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    instanceId: PropTypes.string,
    required: PropTypes.string,
    hideSelectedOptions: PropTypes.bool,
    closeMenuOnSelect: PropTypes.bool,
    customMultiValue: PropTypes.bool,
    handleSiteGroupSelectOnClick: PropTypes.func
};

export default ReactSelectDropdown;