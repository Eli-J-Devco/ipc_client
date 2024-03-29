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
    serverData = "http://localhost:3015/uploads";
    break;
}

const Constants = {
  SECRET_KEY:
    "4dff4ea340f0a823f15d3f4f01ab62eae0e5da579ccb851f8db9dfe84c58b2b37b89903a740e1ee172da793a6e79d560e5f7f9bd058a12a280433ed6fa46510a",
  API_HOST: serverAPI,
  SERVER_DATA: serverData,
  API_CONTEXT: "api-server",
  COMMON: {
    PER_PAGE: 10,
    LIMIT: 30,
    LIMIT_ALERT: 20,
    TOKEN: "nwm-access-token",
    ACCESS_PARAM: "access-param",
  },

  API_URL: {
    AUTH: {
      LOGIN: "/login/",
      REFRESH: "/refresh_token/",
      LOGOUT: "/logout/",
    },
    SITE: {
      SITE_INFO: "/site_information/?id=",
      SITE_UPDATE: "/site_information/update/?id=",
    },
    ETHERNET: {
      ETHERNET_INFO: "/ethernet/?id=",
      ETHERNET_UPDATE: "/ethernet/update/?id=",
      IFCONFIG: "/ethernet/ifconfig/",
    },
    RS485: {
      RS485_INFO: "/rs485/?id=",
      RS485_UPDATE: "/rs485/update/?id=",
    },
    PROJECT: {
      PROJECT_INFO: "/project/",
      LOGGING_RATE: "/project/logging_interval/",
      UPDATE_LOGGING_RATE: "/project/update_logging_rate/",
      UPDATE_FIRST_PAGE: "/project/update_first_page_login/",
    },
    DEVICES: {
      LIST: "/device_list/all/",
      GET_ONE: "/device_list/?id=",
      CONFIG: "/device_list/config/",
      CREATE: "/device_list/create_multiple/",
    },
    TEMPLATE: {
      LIST: "/template/all/",
      GET_ONE: "/template/?id=",
      CREATE: "/template/create/",
      UPDATE: "/template/update/",
      DELETE: "/template/delete/",
      GET_MPTT: "/template/get_mppt_template/",
    },
    UPLOAD_CHANNEL: {
      ALL_CHANNELS: "/upload_channel/all_channel/",
      UPDATE_CHANNEL: "/upload_channel/update/",
      CONFIG_CHANNEL: "/upload_channel/config/",
    },
    USERS: {
      LIST: "/users/all_user/",
      GET_ONE: "/users/only_user",
      UPDATE: "/users/update_user/",
      DELETE: "/users/delete/user/",
      ADD: "/users/create_user/",
      CHANGE_PASSWORD: "/users/change_password/",
      RESET_PASSWORD: "/users/reset_password/",
      ALL_ROLE: "/users/all_role",
      ROLE_SCREEN: "/users/get/role_screen/",
      UPDATE_ROLE: "/users/update/role/",
      DELETE_ROLE: "/users/delete/role/",
      ADD_ROLE: "/users/create/role/",
      UPDATE_ROLE_SCREEN: "/users/update/role_screen/",
    },
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
  PAGE_SIZES: [5, 10, 20, 50, 100],
  DEFAULT_PAGE_SIZE: 5,
  TOAST_AUTO_CLOSE: 1000,
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
  }
};
export default Constants;
