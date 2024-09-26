import * as yup from "yup";
import Constants from "../../../../utils/Constants";
import { isEmpty } from "lodash";

export const tcpSchema = {
  tcp_gateway_ip: yup
    .string()
    .required("MB/TCP Gateway IP-Address is required")
    .matches(Constants.REGEX_PATTERN.IP_ADDRESS, "Invalid IP-Address format"),
  tcp_gateway_port: yup
    .number()
    .integer("MB/TCP Gateway Port must be an integer")
    .required("MB/TCP Gateway Port is required")
    .min(1, "MB/TCP Gateway Port must be greater than 0")
    .max(65535, "MB/TCP Gateway Port must be less than 65536"),
};

export const normalDeviceSchema = {
  communication: yup.object().required("Communication is required"),
  rtu_bus_address: yup
    .number()
    .integer("RTU Bus Address must be an integer")
    .required("RTU Bus Address is required")
    .min(1, "RTU Bus Address must be greater than 0")
    .max(255, "RTU Bus Address must be less than 256"),
};

export const defaultSchema = {
  name: yup.string().required("Name is required"),
  num_of_devices: yup
    .number()
    .integer("Number of devices must be an integer")
    .required("Number of devices is required")
    .min(1, "Number of devices must be greater than 0")
    .max(100, "Number of devices must be less than 100"),
  device_type: yup.object().required("Device type is required"),
  device_group: yup.object().required("Device group is required"),
};

export const ratedPowerSchema = {
  rated_power: yup
    .number()
    .required("Please fill this field")
    .min(1, "Must greater than or equal to 1"),
};

export const inverterSchema = {
  ...ratedPowerSchema,
  rated_power_custom: yup
    .number()
    .required("Please fill this field")
    .moreThan(0, "Must greater than or equal to 0")
    .max(yup.ref("rated_power"), "Must less than or equal to rated power"),
  min_watt_in_percent: yup
    .number()
    .required("Please fill this field")
    .min(0, "Must between 0% and 20%")
    .max(20, "Must between 0% and 20%"),
  DC_voltage: yup
    .number()
    .required("Please fill this field")
    .min(0, "Must greater than or equal to 0"),
  DC_current: yup
    .number()
    .required("Please fill this field")
    .min(0, "Must greater than or equal to 0"),
  efficiency: yup
    .number()
    .required("Please fill this field")
    .min(0, "Must greater than or equal to 0")
    .max(100, "Must less than or equal to 100"),
};

export const createSchema = (schema, config) => {
  const { type: validationType, validations = [] } = config;
  let validator = yup[validationType]();
  validations.forEach((validation) => {
    const { type, params, depends_on } = validation;
    if (!validator[type]) {
      throw new Error(`Validation type ${type} is not supported`);
    }

    if (!isEmpty(depends_on)) {
      const { name, params } = depends_on;
      validator = validator[type](yup.ref(name), params);
      return;
    }

    validator = validator[type](...params);
  });
  schema[config.name] = validator;
  return schema;
};
