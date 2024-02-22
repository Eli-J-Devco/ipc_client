// var baseUrl = window.location.protocol + "//" + window.location.host;
var url = window.location.hostname;
var serverAPI = '';
var serverData = '';
switch (url) {
    case 'production-server':
        serverAPI = '';
        serverData = '';
        break;
    case 'staging-server':
        serverAPI = '';
        serverData = '';
        break;
    default:
        serverAPI = 'http://192.168.1.21:3001';
        serverData = 'http://localhost:3015/uploads';
        break;
}

const Constants = {
    "SECRET_KEY": "4dff4ea340f0a823f15d3f4f01ab62eae0e5da579ccb851f8db9dfe84c58b2b37b89903a740e1ee172da793a6e79d560e5f7f9bd058a12a280433ed6fa46510a",
    "API_HOST": serverAPI,
    "SERVER_DATA": serverData,
    "API_CONTEXT": "api-server",
    "COMMON": {
        "PER_PAGE": 10,
        "LIMIT": 30,
        "LIMIT_ALERT": 20,
        "TOKEN": "nwm-access-token",
        "ACCESS_PARAM": "access-param",
    },

    "API_URL": {
        "AUTH": "/login"
    },

    "SCREEN_MODE": {
        "VIEW": 0,
        "ADD": 1,
        "EDIT": 2
    },
    "AUTH_MODE": {
        "VIEW": 0,
        "NEW": 1,
        "DEL": 2,
        "EDIT": 3,
        "EXCEL": 4,
        "PDF": 5,
        "PRINT": 6,
        "TRANSLATE": 7,
        "APPROVAL": 8,
        "SET": 9,
        "FULL" : 511
    },
    "AUTH_DATA_KEY" : {
        "VIEW": "view",
        "NEW": "new",
        "EDIT": "edit",
        "DEL": "delete",
        "PRINT": "print",
        "PDF": "pdf",
        "EXCEL": "excel",
        "TRANSLATE": "translate",
        "APPROVAL":"approval",
        "FULL": "auths"
    },
    "PAGE_SIZES": [10, 20, 50, 100],
    "DEFAULT_PAGE_SIZE": 20,
};
export default Constants;