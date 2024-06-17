/********************************************************
 * Copyright 2020-2021 NEXT WAVE ENERGY MONITORING INC.
 * All rights reserved.
 *
 *********************************************************/
var url = window.location.hostname;
var serverAPI = "";
var serverData = "";
switch (url) {
  case "production-server":
    serverAPI = "";
    serverData = "";
    break;
  case "staging-server":
    serverAPI = "";
    serverData = "";
    break;
  default:
    serverAPI = "http://115.78.133.129:3001";
    // serverAPI = "http://127.0.0.1:3001";
    // serverAPI = "http://localhost:3001";
    serverData = "http://localhost:3015/uploads";
    break;
}

const Constants = {
  SECRET_KEY:
    "4dff4ea340f0a823f15d3f4f01ab62eae0e5da579ccb851f8db9dfe84c58b2b37b89903a740e1ee172da793a6e79d560e5f7f9bd058a12a280433ed6fa46510a",
  API_HOST: serverAPI,
  SERVER_DATA: serverData,
  API_CONTEXT: "api-server",
  MQTT_CONFIG: {
    HOST: "115.78.133.129",
    PORT: 1884,
    USERNAME: "nextwave",
    PASSWORD: "123654789",
    CLIENT_ID: "setup_client",
  },
  COMMON: {
    PER_PAGE: 10,
    LIMIT: 30,
    LIMIT_ALERT: 20,
    TOKEN: "nwm-access-token",
    ACCESS_PARAM: "access-param",
    SPECIAL_DEVICE_TYPE: "Circuit Breaker",
    MPPT_CONFIG_INFORMATION: 277,
  },

  API_URL: {
    AUTH: {
      LOGIN: "/authentication/login/",
      REFRESH: "/authentication/refresh/",
      FORGOT_PASSWORD: "/authentication/forgot/",
      LOGOUT: "/authentication/logout/",
    },
    ETHERNET: {
      ETHERNET_INFO: "/ethernet/get/",
      ETHERNET_UPDATE: "/ethernet/update/",
      IFCONFIG: "/ethernet/ifconfig/",
    },
    RS485: {
      GET: "/rs485/get/",
      UPDATE: "/rs485/update/",
      CONFIG: "/rs485/config/",
      SERIAL_PORT: "/rs485/serial_ports/",
    },
    PROJECT: {
      PROJECT_INFO: "/project_setup/",
      PROJECT_UPDATE: "/project_setup/update/",
      LOGGING_RATE: "/project_setup/logging_interval/get/",
      UPDATE_LOGGING_RATE: "/project_setup/logging_interval/update/",
      FIRST_PAGE_ON_LOGIN: "/project_setup/first_page_on_login/get/",
      UPDATE_FIRST_PAGE_ON_LOGIN: "/project_setup/first_page_on_login/update/",
      REMOTE_ACCESS: "/project_setup/remote_access/get/",
      UPDATE_REMOTE_ACCESS: "/project_setup/remote_access/update/",
      UPDATE_SEARCH_RTU: "/project_setup/update_search_rtu/",
      SCREENS: "/project_setup/screen/get/",
    },
    DEVICES: {
      LIST: "/devices/get/all/",
      GET_ONE: "/devices/get/",
      ADD: "/devices/add/",
      DELETE: "/devices/delete/",
      UPDATE: "/devices/update/",
      CONFIG: {
        TYPE: "/devices/config/type/get/",
        GROUP: "/devices/config/group/get/",
        ADD_GROUP: "/devices/config/group/add/",
        POINT_MAP: "/device_point/",
        POINT_ACTION: "/device_point/action/",
        ALARM: "/device_point/alarm/",
        UNITS: "/device_point/config/unit/",
        CONFIG_POINT: "/device_point/config/point/",
      },
      COMPONENT: {
        GET: "/devices/component/get/",
        LIST: "/devices/component/get/all/",
        DEFAULT: "/devices/component/",
      },
    },
    POINT: {
      LIST: "/point/get/",
      ADD: "/point/add/",
      UPDATE: "/point/update/",
      DELETE: "/point/delete/",
    },
    POINT_MPPT: {
      ADD: "/point_mppt/add/",
      ADD_STRING: "/point_mppt/add/string/",
      ADD_PANEL: "/point_mppt/add/panel/",
      DELETE: "/point_mppt/delete/",
    },
    POINT_CONTROL: {
      ADD_EXIST: "/point_control/add/exist/",
      ADD_NEW: "/point_control/add/new/",
      REMOVE: "/point_control/remove/",
      DELETE: "/point_control/delete/",
      GROUP: {
        ADD: "/point_control/group/add/",
        UPDATE: "/point_control/group/update/",
        DELETE: "/point_control/group/delete/",
        LIST: "/point_control/get/",
      },
    },
    REGISTER: {
      LIST: "/register_block/get/",
      ADD: "/register_block/add/",
      UPDATE: "/register_block/update/",
      DELETE: "/register_block/delete/",
    },
    TEMPLATE: {
      LIST: "/template/get/",
      ADD: "/template/add/",
      UPDATE: "/template/update/",
      DELETE: "/template/delete/",
      CONFIG: {
        GET: "/template/config/get/",
        CONTROL_GROUPS: "/template/config/control_group/",
      },
    },
    UPLOAD_CHANNEL: {
      GET: "/upload_channel/get/",
      UPDATE: "/upload_channel/update/",
      CONFIG: "/upload_channel/config/",
    },
    ROLE: {
      GET_ONE: "/role/get/",
      LIST: "/role/get/all/",
      ADD: "/role/add/",
      UPDATE: "/role/update/",
      DELETE: "/role/delete/",
      ACTIVATE: "/role/activate/",
      DEACTIVATE: "/role/deactivate/",
      PERMISSION: "/role/permission/get/",
      UPDATE_PERMISSION: "/role/permission/update/",
    },
    USERS: {
      LIST: "/user/get/all/",
      GET_ONE: "/user/get/",
      ADD: "/user/add/",
      UPDATE: "/user/update/",
      DELETE: "/user/delete/",
      ACTIVATE: "/user/activate/",
      DEACTIVATE: "/user/deactivate/",
      CHANGE_PASSWORD: "/user/password/update/",
      RESET_PASSWORD: "/user/password/reset/",
    },
  },

  REGEX_PATTERN: {
    EMAIL: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
    PASSWORD:
      /^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[~`!@#$%^&*()--+={}[\]|\\:;"'<>,.?/_₹])[a-zA-Z0-9~`!@#$%^&*()--+={}[\]|\\:;"'<>,.?/_₹]{7,}$/,
  },

  SCREEN_MODE: {
    VIEW: 0,
    ADD: 1,
    EDIT: 2,
  },

  AUTH_MODE: {
    VIEW: 0,
    NEW: 1,
    DEL: 2,
    EDIT: 3,
    EXCEL: 4,
    PDF: 5,
    PRINT: 6,
    TRANSLATE: 7,
    APPROVAL: 8,
    SET: 9,
    FULL: 511,
  },

  AUTH_DATA_KEY: {
    VIEW: "view",
    NEW: "new",
    EDIT: "edit",
    DEL: "delete",
    PRINT: "print",
    PDF: "pdf",
    EXCEL: "excel",
    TRANSLATE: "translate",
    APPROVAL: "approval",
    FULL: "auths",
  },

  TEMPLATE_TYPE: {
    BUILT_IN: 0,
    CUSTOM: 1,
  },

  PAGE_SIZES: [5, 10, 20, 50, 100],
  DEFAULT_PAGE_SIZE: 20,
  TOAST_AUTO_CLOSE: 3000,
  TIME_UNIT: {
    TYPE: {
      short: "short",
      full: "full",
    },
    SHORT: {
      ms: "ms",
      s: "s",
      m: "m",
      h: "h",
      d: "d",
    },
    FULL: {
      ms: "milliseconds",
      s: "seconds",
      m: "minutes",
      h: "hours",
      d: "days",
    },
  },
};
export default Constants;
