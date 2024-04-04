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
    }
}

export class RowAdapter {
    constructor(item = {
        id: 0,
        name: "",
        id_config_information: 0,
        config: "",
        type_units: {
            unit: ""
        },
        type_class: {
            type_class: ""
        },
        register: "",
        type_datatype: {
            data_type: ""
        },
        type_byteorder: {
            byte_order: ""
        },
        slope: 0,
        offset: 0,
        multreg: 0,
        invalidvalue: 0,
        type_point: 0,
        is_check: false,
        check_invalid: true,
        check_slope: true,
        check_offset: true,
        check_multreg: true,
        check_name: true,
        check_unit: true,
        parent: 0,
        subRows: []
    }, index) {
        this.index = index
        this.id = item.id
        this.name = item.name
        this.id_config_information = item.id_config_information
        this.config = item.config
        this.unit = item?.type_units?.unit
        this.class = item?.type_class?.type_class
        this.register = item.register
        this.data_type = item?.type_datatype?.data_type
        this.byte_order = item?.type_byteorder?.byte_order
        this.slope = item.slope
        this.offset = item.offset
        this.multreg = item.multreg
        this.invalidvalue = item.invalidvalue
        this.type_point = item?.type_point
        this.is_check = item.is_check
        this.type_byteorder = item?.type_byteorder
        this.type_class = item?.type_class
        this.type_datatype = item?.type_datatype
        this.type_units = item?.type_units
        this.check_invalid = item?.invalidvalueenabled
        this.check_slope = item?.slopeenabled
        this.check_offset = item?.offsetenabled
        this.check_multreg = item?.multregenabled
        this.check_name = item?.nameedit
        this.check_unit = item?.unitsedit
        this.parent = item.parent
        this.subRows = item.subRows
    }

    getRow() {
        return {
            index: this.index,
            id: this.id,
            name: this.name,
            config: this.config,
            id_config_information: this.id_config_information,
            unit: this.unit,
            class: this.class,
            register: this.register,
            data_type: this.data_type,
            byte_order: this.byte_order,
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
            check_invalid: this.check_invalid,
            check_slope: this.check_slope,
            check_offset: this.check_offset,
            check_multreg: this.check_multreg,
            check_name: this.check_name,
            check_unit: this.check_unit,
            parent: this.parent,
            subRows: this.subRows
        }
    }
}

export const resortIndex = (rows, type = POINT_CONFIG.MPPT) => {
    let index = 0;
    let updateSelectedPoints = rows.map((point) => {
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