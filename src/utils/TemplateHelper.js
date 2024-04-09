import _ from "lodash"

export const POINT_CONFIG = {
    MPPT: {
        value: 277,
        name: "MPPT"
    },
    STRING: {
        value: 276,
        name: "String"
    },
    PANEL: {
        value: 278,
        name: "Panel"
    },
    MPPT_CONFIG: {
        values: [274, 275],
        names: ["MPPT Voltage", "MPPT Current"]
    },
    NORMAL: {
        value: 266,
        name: "Normal"
    }
}

export class RowAdapter {
    constructor({
        id = 0,
        index = 0,
        name = "",
        namekey = "",
        id_config_information = 0,
        config = "",
        type_units = {
            namekey: ""
        },
        type_class = {
            namekey: ""
        },
        register = "",
        type_datatype = {
            namekey: ""
        },
        type_byteorder = {
            namekey: ""
        },
        type_point_list = {
            namekey: ""
        },
        type_control = {
            namekey: ""
        },
        slope = 0,
        offset = 0,
        multreg = 0,
        invalidvalue = 0,
        type_point = 0,
        is_check = false,
        invalidvalueenabled = true,
        slopeenabled = true,
        offsetenabled = true,
        multregenabled = true,
        nameedit = true,
        unitsedit = true,
        control_enabled = true,
        parent = 0,
        subRows = [],
        ...rest
    }) {
        this.index = index
        this.id = id
        this.name = name
        this.namekey = namekey
        this.id_config_information = id_config_information
        this.config = config
        this.unit = type_units?.namekey
        this.class = type_class?.namekey
        this.register = register
        this.data_type = type_datatype?.namekey
        this.byte_order = type_byteorder?.namekey
        this.slope = slope
        this.offset = offset
        this.multreg = multreg
        this.invalidvalue = invalidvalue
        this.type_point = type_point
        this.is_check = is_check
        this.type_byteorder = type_byteorder
        this.type_class = type_class
        this.type_datatype = type_datatype
        this.type_point_list = type_point_list
        this.type_units = type_units
        this.type_control = type_control
        this.invalidvalueenabled = invalidvalueenabled
        this.slopeenabled = slopeenabled
        this.offsetenabled = offsetenabled
        this.multregenabled = multregenabled
        this.nameedit = nameedit
        this.unitsedit = unitsedit
        this.control_enabled = control_enabled
        this.parent = parent
        this.subRows = subRows
        this.rest = rest
    }

    getRow() {
        return {
            index: this.index,
            id: this.id,
            name: this.name,
            namekey: this.namekey,
            config: this.config,
            id_config_information: this.id_config_information,
            unit: this.unit,
            class: this.class,
            register: this.register,
            data_type: this.data_type,
            byte_order: this.byte_order,
            type_point_list: this.type_point_list,
            slope: this.slope,
            offset: this.offset,
            multreg: this.multreg,
            invalidvalue: this.invalidvalue,
            type_point: this.type_point,
            is_check: this.is_check,
            type_byteorder: this.type_byteorder,
            type_class: this.type_class,
            type_datatype: this.type_datatype,
            type_units: this.type_units,
            type_control: this.type_control,
            invalidvalueenabled: this.invalidvalueenabled,
            slopeenabled: this.slopeenabled,
            offsetenabled: this.offsetenabled,
            multregenabled: this.multregenabled,
            nameedit: this.nameedit,
            unitsedit: this.unitsedit,
            control_enabled: this.control_enabled,
            parent: this.parent,
            subRows: this.subRows,
            ...this.rest
        }
    }
}

export const resortIndex = (rows, type = POINT_CONFIG.MPPT) => {
    let index = 0;
    let updateSelectedPoints = rows?.map((point) => {
        point.index = index++;

        if (!_.isEqual(type, POINT_CONFIG.MPPT)) {
            return point;
        }

        let subRows = point?.subRows?.map((string) => {
            string.index = index++;
            let subRows = string?.subRows?.map((panel) => {
                return {
                    ...panel,
                    index: index++
                }
            });
            return {
                ...string,
                subRows: subRows || []
            }
        });
        return {
            ...point,
            subRows: subRows || []
        }
    });

    return updateSelectedPoints;
}

export const formatData = (data, type = POINT_CONFIG.MPPT) => {
    let index = 0;
    let selectedPoints = data.map((point) => {
        point.index = index++;

        if (_.isEqual(type, POINT_CONFIG.MPPT)) {
            return point;
        }

        let subRows = point?.subRows?.map((string) => {
            string.index = index++;
            let subRows = string?.subRows?.map((panel) => {
                return {
                    ...panel,
                    index: index++
                }
            });
            return {
                ...string,
                subRows: subRows || []
            }
        });
        return {
            ...point,
            subRows: subRows || []
        }
    });

    return selectedPoints;
}

export const reverseFormatData = (data, type = POINT_CONFIG.MPPT) => {
    let index = 0;
    let selectedPoints = [];
    data.forEach((point) => {
        point.index = index++;
        selectedPoints.push(point);

        if (_.isEqual(type, POINT_CONFIG.MPPT)) {
            return;
        }

        point?.subRows?.forEach((string) => {
            string.index = index++;
            selectedPoints.push(string);

            string?.subRows?.forEach((panel) => {
                panel.index = index++;
                selectedPoints.push(panel);
            });
        });
    });
    console.log("selectedPoints", selectedPoints);
    return selectedPoints;
}