/********************************************************
* Copyright 2020-2021 NEXT WAVE ENERGY MONITORING INC.
* All rights reserved.
*
*********************************************************/

import Constants from "./Constants";
import Libs from "./Libs";
import qs from 'qs';
import axios from 'axios';
//import envConfig from 'EnvConfig.js'
export default class NWHttp {
    constructor(showProcess) {
        this.showProcess = showProcess || false;
    }

    initialize(url, data, method, contentType) {
        var self = this;
        // Setting URL and headers for request
        var json = null;
        if (method === Constants.METHOD.get) {
            if (typeof data != undefined && data != null) {
                json = qs.stringify(data);
            }
        } else {
            if (typeof data != undefined && data != null) {
                json = JSON.stringify(data);
            }
        }
        const API_HOST = process.api_host || Constants.API_HOST;
        if (!Libs.isBlank(API_CONTEXT)) { API_HOST = API_HOST + "/" + API_CONTEXT; }
        var baseUrl = API_HOST + "/" + url;

        let isGetToken = false;
        if (baseUrl.indexOf('oauth/token') >= 0) { isGetToken = true; }

        // set header
        let header = this.setHeader(method, contentType, isGetToken, 'password', 'backoffice');

        let idShowProcess = 0;
        if (this.showProcess == true) {
            idShowProcess = this.showProcessLoading();
        }

        // create cancel info to cancel request API
        let cancelInfo;
        if (!Libs.isBlank(data.source)) {
            header.cancelToken = data.source.token;
            cancelInfo = setTimeout(() => {
                self.showCancelMessage(trans.translate('common.cancel_info'), data.source);
            }, 1000 * 10)

        }

        // Return new promise 
        const CancelToken = axios.CancelToken;
        const cancelTokenSource = CancelToken.source();

        return new Promise(function (resolve, reject) {
            // Do async job
            axios.post(baseUrl, json, header)
                .then(function (response) {
                    if (self.showProcess == true) {
                        self.hideProcessLoading(idShowProcess);
                    }

                    // remove cancel info if promise resolved
                    if (!Libs.isBlank(data.source)) {
                        if ($('.close-notification-error').length) {
                            if ($('.system-error').length) {
                                $('body').removeClass('system-error');
                            }
                            if ($('.notification-info').length) {
                                $('.notification-info').remove();
                            }
                        }
                        clearTimeout(cancelInfo);
                    }


                    resolve(response);
                })
                .catch(function (error) {
                    self.hideProcessLoading(idShowProcess);
                    if (error.response && error.response.status == 401) {
                        // window.location.href = Constants.FRONT_SITE_URL.ADMIN_LOGIN;
                        resolve(error.response);
                        return;
                    } else if (error.response && error.response.status == 400) {
                        resolve(error.response);
                        return;
                    }

                    if (axios.isCancel(error)) {
                        resolve('request canceled', error)
                        return;
                    }

                    reject(error);
                });
        })
    }



    post(url, params, callBack) {
        let self = this;
        var user = {};
        let info = localStorage.getItem(Constants.COMMON.ADMIN_INFO);
        let adminInfo = JSON.parse(Libs.base64Decrypt(info));
        let info1 = localStorage.getItem(Constants.COMMON.USER_INFO);
        let userInfo = JSON.parse(Libs.base64Decrypt(info1));

        if (!Libs.isObjectEmpty(userInfo) && !Libs.isBlank(userInfo.is_view_customer) && userInfo.is_view_customer) {
            user = userInfo;
        } else {
            user = (!Libs.isObjectEmpty(adminInfo)) ? adminInfo : this.user;
        }

        if (user && !Libs.isObjectEmpty(user)) {
            params.customer_type = user ? user.customer_type : null;
        }

        var is_supper_admin = 0;
        if (!Libs.isBlank(params.is_supper_admin)) {
            is_supper_admin = params.is_supper_admin;
        } else {
            if (!Libs.isObjectEmpty(user) && !Libs.isBlank(user.is_supper_admin)) {
                is_supper_admin = user.is_supper_admin;
            }
        }

        params.is_supper_admin = is_supper_admin;
        var initializePromise = this.initialize(url, params, Constants.METHOD.POST, Constants.CONTENT_TYPE.json);
        initializePromise.then(function (result) {
            if (result.status != 200 && result.status != 400) {
                if (result.status != 401) {
                    self.showError(result.status);
                }

                if (result == 'request canceled') {
                    callBack(false, result);
                    return;
                }

                callBack(false, {});
                return;
            }
            let data = result.data;
            if (data != null) {
                callBack(true, data);
                return;
            } else {
                self.showError(Constants.ERROR_CODE.CODE_01);
                callBack(false, {});
            }
        }, function (status, err) {
            self.showError(Constants.ERROR_CODE.CODE_01);
            callBack(false, err);
        });
    }


    setHeader(method, contentType, isLogin = false) {
        var lang = "en";
        let info = localStorage.getItem(Constants.COMMON.ADMIN_INFO);
        let userInfo = JSON.parse(Libs.base64Decrypt(info));
        if (Libs.isObjectEmpty(userInfo)) {
            info = localStorage.getItem(Constants.COMMON.USER_INFO);
            userInfo = JSON.parse(Libs.base64Decrypt(info));
        }

        let token = '';
        if (isLogin) {
            token = 'Basic ' + Libs.base64Encrypt("backoffice:secret");
        } else {
            token = "Bearer " + localStorage.getItem(Constants.COMMON.TOKEN);
        }

        let headers = {
            // 'grant_type': grantType,
            // 'client_id': clientId,
            'Content-Type': contentType,
            'customer_type': customerType,
            'x-access-token': localStorage.getItem('nwm-access-token'),
            'lang': lang
        }

        let ar = window.location.pathname.split("/");
        let path = ar.length > 1 ? ar[1] : "";
        let isCheck = true;
        if (path != '') {
            isCheck = Constants.PUBLIC_PAGE.indexOf(path) < 0
        }
        if (isCheck || path == 'login') {
            headers.Authorization = token;
        }

        let header = { headers: headers, timeout: 3600000 };
        // if (method == Constants.METHOD.POSTEXCEL) {
        //     header['responseType'] = 'blob';
        //     headers['Accept'] = 'application/vnd.ms-excel';
        //     header.headers = headers;
        // }
        // if (method == Constants.METHOD.POSTPDF) {
        //     header['responseType'] = 'blob';
        //     headers['Accept'] = 'application/pdf';
        //     header.headers = headers;
        // }
        return header;
    }
    /**
     * show process loading
     */
    showProcessLoading() {
        var progress_id = "disabled_div" + globalIdProgress;
        var div = document.createElement("div");
        div.className = 'disabled_div';
        div.id = progress_id;
        div.style.position = 'fixed';
        div.style.width = '100%';
        // div.style.height = '100%';
        div.style.zIndex = 2000;
        div.style.left = '0px';
        div.style.top = '0px';
        var divInner = document.createElement("div");
        divInner.style.width = '66px';
        divInner.style.height = '66px';
        divInner.style.display = 'block';
        divInner.style.position = 'fixed';
        divInner.style.top = '50%';
        divInner.style.left = '50%';
        divInner.style.marginLeft = '-33px';
        divInner.style.marginTop = '-33px';
        divInner.style.zIndex = 1500;
        var img = document.createElement("img");
        img.src = "/assets/images/loading.gif";
        divInner.appendChild(img);
        div.appendChild(divInner);
        var body = document.getElementById("root");
        // body.append(div);
        body.appendChild(div);
        return globalIdProgress;
    };
    /**
     * hide process loading
     * @param {string} id 
     */
    hideProcessLoading(id) {
        if (id != null) {
            $('#' + "disabled_div" + id).remove();
        } else {
            $('.' + "disabled_div").remove();
        }
    };
    checkIsLogin() {
        // This code is not active
        // var token = localStorage.getItem(Constants.TOKEN) || null;
        // if (!token) {
        // 	window.location.href = Constants.FRONT_SITE_URL.LOGIN;
        // 	return false;
        // }
        return true;
    }

    /**
     * show error popup with style modal bootstrap
     */
    showError(message_code) {
        var message = this.getErrorMessage(message_code);
        this.showErrorMessage(message);
        // if (document.location.pathname != '/admin') {
        //     setTimeout(function () {
        //         window.location.href = Constants.FRONT_SITE_URL.ADMIN_LOGIN;
        //     }, 5000);
        // }
    };

    getErrorMessage(code) {
        var msg = "";
        switch (code) {
            case 201:
                msg = trans.translate("message.msg_err_201");
                break;
            case 203:
                msg = trans.translate("message.msg_err_203");
                break;
            case 204:
                msg = trans.translate("message.msg_err_204");
                break;
            case 205:
                msg = trans.translate("message.msg_err_205");
                break;
            case 206:
                msg = trans.translate("message.msg_err_206");
                break;
            case 500:
                msg = trans.translate("message.msg_err_500");
                break;
            case 501:
                msg = trans.translate("message.msg_err_501");
                break;
            case 502:
                msg = trans.translate("message.msg_err_502");
                break;
            case 503:
                msg = trans.translate("message.msg_err_503");
                break;
            case 504:
                msg = trans.translate("message.msg_err_504");
                break;
            case 505:
                msg = trans.translate("message.msg_err_505");
            case 401:
                msg = trans.translate("message.msg_err_401");
                break;
            case 1:
                msg = trans.translate("message.network_error");
                break;
            default: msg = code;
                break;
        }
        return msg;
    }



    /**
     * @description Add text error message when not calling server or api error
     * @author LuyenNguyen 2018-11-07
     */
    showErrorMessage(msg) {
        $('body').addClass('system-error');
        var html = '<div class="notification-error">';
        html += '<p>';
        html += msg;
        html += '<a class="close-notification-error fa fa-times" href="javascript:void(0)">×</a>';
        html += '</p>'
        html += '</div>';
        if (!$('.notification-error').length) {
            $('#root').prepend(html);
        }
        if ($('.close-notification-error').length) {
            $('.close-notification-error').on('click', function () {
                if ($('.system-error').length) {
                    $('body').removeClass('system-error');
                }
                if ($('.notification-error').length) {
                    $('.notification-error').remove();
                }
            });
        }
        setTimeout(function () {
            if ($('.system-error').length) {
                $('body').removeClass('system-error');
            }
            if ($('.notification-error').length) {
                $('.notification-error').remove();
            }
        }, Constants.ERROR_MSG_TIMEOUT);
    }

    showCancelMessage(msg, source) {
        $('body').addClass('system-error');
        var html = '<div class="notification-info">';
        html += '<p>';
        html += '<img src="/assets/images/info.png" />'
        html += msg;
        html += '<span class="cancel" href="javascript::void(0)">';
        html += trans.translate('common.cancel');
        html += '</span>'
        html += '<a class="close-notification-error fa fa-times" href="javascript:void(0)">×</a>';
        html += '</p>'
        html += '</div>';
        if (!$('.notification-info').length) {
            $('#root').prepend(html);
        }
        if ($('.close-notification-error').length) {
            $('.close-notification-error').on('click', function () {
                if ($('.system-error').length) {
                    $('body').removeClass('system-error');
                }
                if ($('.notification-info').length) {
                    $('.notification-info').remove();
                }
            });
        }

        if ($('.close-notification-error').length) {
            $('.cancel').on('click', function () {
                source.cancel("API canceled");
                setTimeout(function () {
                    if ($('.system-error').length) {
                        $('body').removeClass('system-error');
                    }
                    if ($('.notification-info').length) {
                        $('.notification-info').remove();
                    }
                    if ($('.notification-error').length) {
                        $('.notification-error').remove();
                    }
                }, 100);
            })
        }

        setTimeout(function () {
            if ($('.system-error').length) {
                $('body').removeClass('system-error');
            }
            if ($('.notification-info').length) {
                $('.notification-info').remove();
            }
        }, Constants.ERROR_MSG_TIMEOUT);
    }
}

