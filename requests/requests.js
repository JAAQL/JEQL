import * as spinner from "../spinner/spinner.js"

let ERR_UNEXPECTED_CRED_CHALLENGE = "Unexpected credential challenge for request type simple";
let HTTP_STATUS_DEFAULT = "DEFAULT"; export {HTTP_STATUS_DEFAULT};

export class RequestConfig {
    constructor(applicationName, base, authAction, refreshAction, loginFunc, refreshFunc, setXHttpAuth,
                submitActions, setConnectionAction, authTokenSetFunc = null, logoutFunc = null,
                createSpinner = spinner.createSpinner, destroySpinner = spinner.destroySpinner) {
        this.base = base;
        this.authLocked = true;
        this.authQueue = [];
        this.applicationName = applicationName;
        this.authAction = authAction;
        this.refreshAction = refreshAction;
        this.loginFunc = loginFunc;
        this.refreshFunc = refreshFunc;
        this.authToken = null;
        this.createSpinner = createSpinner;
        this.destroySpinner = destroySpinner;
        this.authTokenSetFunc = authTokenSetFunc;
        this.setXHttpAuth = setXHttpAuth;
        this.rememberMe = true;
        this.logoutFunc = logoutFunc;
        this.parent = null;
		this.submitActions = submitActions;
        this._setConnectionAction = setConnectionAction
        this.setConnectionAction = function(json) { setConnectionAction(this, json); };
        this.credentials = null;
    }

    setCredentials(credentials) { this.credentials = credentials; }

    setRememberMe(isRememberMe) {
        this.rememberMe = isRememberMe;
        if (this.parent) {
            parent.rememberMe = isRememberMe;
        }
    }

    clone() {
        let ret = new RequestConfig(this.applicationName, this.base, this.authAction, this.refreshAction,
            this.loginFunc, this.refreshFunc, this.setXHttpAuth, this.submitActions, this._setConnectionAction,
            this.authTokenSetFunc, this.logoutFunc, this.createSpinner, this.destroySpinner);
        ret.rememberMe = this.rememberMe;
        ret.parent = this;
        ret.authLocked = false;
        ret.setCredentials(this.credentials);
        return ret;
    }

    getApplicationName() { return this.applicationName; }

    getStorage() { return this.rememberMe ? window.localStorage : window.sessionStorage; }
    getInvertedStorage() { return this.rememberMe ? window.sessionStorage : window.localStorage; }

    logout(doReload = true, doCopy = false) {
        if (this.loginFunc !== null) {
            this.logoutFunc(this.getStorage(), doReload, doCopy, this.getInvertedStorage());
        }

        if (this.parent !== null) {
            this.parent.logout();
        }
    }

    resetAuthToken() {
        this.authToken = null;
        if (this.authTokenSetFunc !== null) {
            this.authTokenSetFunc(this.getStorage(), this.authToken);
        }

        if (this.parent !== null) {
            this.parent.resetAuthToken();
        }
    }

    releaseQueues() {
        this.authLocked = false;
        while (this.authQueue.length !== 0) {
            this.authQueue.pop()();
        }
        if (this.parent !== null) {
            this.parent.releaseQueues();
        }
    }

    setAuthToken(authToken) {
        this.authToken = authToken;
        if (this.authTokenSetFunc !== null) {
            this.authTokenSetFunc(this.getStorage(), this.authToken);
        }

        if (this.parent !== null) {
            this.parent.setAuthToken(authToken);
        }
    }
}

export function jsonToUrlEncoded(element, key, list){
    list = list || [];
    if(typeof(element) == 'object') {
        for (let idx in element) {
            jsonToUrlEncoded(element[idx], key ? key + '[' + idx + ']' : idx, list);
        }
    } else {
        list.push(key + '=' + encodeURIComponent(element));
    }
    return list.join('&');
}

function getScriptParentElement() {
    if (document.currentScript) {
        return document.currentScript.parentElement;
    } else {
        return null;
    }
}

export function urlEncodedToJson(urlEncoded) {
    let encodeList = Array.from(urlEncoded.split("&"));
    let json = {};
    for (let idx in encodeList) {
        json[encodeList[idx].split("=")[0]] = decodeURIComponent(encodeList[idx].split("=")[1])
    }
    return json;
}

function parseResponse(toParse) {
    if (toParse.getResponseHeader('Content-Type').startsWith("application/json")) {
        return JSON.parse(toParse.response);
    } else {
        return toParse.response;
    }
}

function xhttpSendRequest(config, xhttp, method, body, json) {
    config.createSpinner();
    if (body !== undefined && json === undefined && method !== 'GET') {
        xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhttp.send(body);
    } else if (json !== undefined && body === undefined && method !== 'GET') {
        xhttp.setRequestHeader("Content-Type", "application/json; charset=utf-8");
        xhttp.send(json);
    } else if (json !== undefined && body !== undefined && method !== 'GET') {
        alert("Tell the developer off! They've provided both json and body data. Naughty");
    } else {
        xhttp.send();
    }
}

function getResponseCodeHandler(renderFunc, status) {
    if (!renderFunc) { return null; }
    if (renderFunc.constructor === Object) {
        if (renderFunc.hasOwnProperty(status)) {
            return renderFunc[status];
        } else {
            return null;
        }
    } else {
        return status === 200 ? renderFunc : null;
    }
}

export function make(config, action, renderFunc, body, json, ignoreLock = true) {
    let curScriptParent = getScriptParentElement();
    if (config.authLocked && !ignoreLock) {
        config.authQueue.push(function() {
            document.currentScriptParent = curScriptParent;
            make(config, action, renderFunc, body, json);
        });
        return;
    }

    let resource = action.split(" ")[1];
    let url = config.base + resource;
    let method = action.split(" ")[0];
    let isOauth = action === config.authAction;
    let isRefresh = action === config.refreshAction;

    if (config.authToken === null && !isOauth) {
        let callback = function() { make(config, action, renderFunc, body, json); };
        config.loginFunc(config, callback);
        return;
    }

    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        let res = null;
        let origRenderFunc = null;
        if (this.readyState === 4) {
            config.destroySpinner();
            origRenderFunc = renderFunc;
            renderFunc = getResponseCodeHandler(renderFunc, this.status);
            res = parseResponse(this);
        }

        if (this.readyState === 4 && this.status === 200) {
            if (isOauth || isRefresh) {
                config.setAuthToken(res);
                renderFunc();
            } else {
                renderFunc(res);
            }
        } else if (this.readyState === 4 && this.status === 202) {
            if (isOauth) {
                origRenderFunc(res, true);
            }
        } else if (this.readyState === 4 && this.status === 401) {
            if (isOauth) {
                origRenderFunc("Credentials incorrect. Please try again");
            } else if (isRefresh) {
                config.resetAuthToken();
                config.loginFunc(config, function() { make(config, action, origRenderFunc, body, json); },
                    "Credentials expired. Please login again");
            } else {
                config.refreshFunc(config, function() { make(config, action, origRenderFunc, body, json); });
            }
        } else if (this.readyState === 4) {
            if (isOauth) {
                renderFunc(this.response);
            } else if (renderFunc !== null) {
                renderFunc(res, config, action, origRenderFunc, body, json);
            } else {
                if (HTTP_STATUS_DEFAULT in origRenderFunc) {
                    origRenderFunc[HTTP_STATUS_DEFAULT](res, config, action, origRenderFunc, body, json);
                } else {
                    console.error("Unexpected response code from server: " + this.status + " response: " +
                        this.response);
                }
            }
        }
    };
    if (method === 'GET' && body !== undefined) {
        url += "?" + body;
    }
    xhttp.open(method, url, true);
    if (!isOauth) {
        config.setXHttpAuth(config, xhttp);
    }

    xhttpSendRequest(config, xhttp, method, body, json);
}

export function makeJson(config, action, renderFunc, json) {
	if (config.authLocked) {
        let curScriptParent = getScriptParentElement();
        config.authQueue.push(function() {
            document.currentScriptParent = curScriptParent;
            makeJson(config, action, renderFunc, json);
        });
        return
    }
	if (action in config.submitActions) {
        config.setConnectionAction(json);
    }
    make(config, action, renderFunc, undefined, JSON.stringify(json), true);
}

export function makeBody(config, action, renderFunc, body) {
	if (config.authLocked) {
        let curScriptParent = getScriptParentElement();
        config.authQueue.push(function() {
            document.currentScriptParent = curScriptParent;
            makeBody(config, action, renderFunc, body);
        });
        return
    }
    make(config, action, renderFunc, jsonToUrlEncoded(body), true);
}

export function makeEmpty(config, action, renderFunc) {
	if (config.authLocked) {
        let curScriptParent = getScriptParentElement();
        config.authQueue.push(function() {
            document.currentScriptParent = curScriptParent;
            makeEmpty(config, action, renderFunc);
        });
        return
    }
    make(config, action, renderFunc, undefined, undefined, true)
}

export function makeSimple(config, action, renderFunc, body, json) {
    let resource = action.split(" ")[1];
    let url = config.base + resource;
    let method = action.split(" ")[0];

    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState === 4) {
            config.destroySpinner();
        }

        if (this.readyState === 4 && this.status === 200) {
            renderFunc(parseResponse(this));
        } else if (this.readyState === 4 && this.status === 401) {
            console.log(ERR_UNEXPECTED_CRED_CHALLENGE);
        }
    };

    if (method === 'GET' && body !== undefined) {
        url += "?" + body;
    }
    xhttp.open(method, url, true);
    xhttpSendRequest(config, xhttp, method, body, json);
}
