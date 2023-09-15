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
        serverAPI = 'http://localhost:3015';
        serverData = 'http://localhost:3015/uploads';
        break;
}

const Constants = {
    "API_HOST": serverAPI,
    "SERVER_DATA": serverData,
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
};
export default Constants;