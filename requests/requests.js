import * as spinner from "../spinner/spinner.js"
import {template} from "../utils/utils.js"

let ERR_UNEXPECTED_CRED_CHALLENGE = "Unexpected credential challenge for request type simple";
let HTTP_STATUS_DEFAULT = "DEFAULT"; export {HTTP_STATUS_DEFAULT};
let ANY_STATUS = "ANY_STATUS"; export {ANY_STATUS};
let ANY_STATUS_EXCEPT_5xx = "ANY_STATUS_EXCEPT_5xx"; export {ANY_STATUS_EXCEPT_5xx};
let ANY_STATUS_EXCEPT_5xx_OR_400 = "ANY_STATUS_EXCEPT_5xx_OR_400"; export {ANY_STATUS_EXCEPT_5xx_OR_400};
let ERR_NO_RESPONSE_HANDLER = template`No response handler found for HTTP response with code ${'code'}`

export class RequestConfig {
    constructor(applicationName, base, authAction, refreshAction, loginFunc, refreshFunc, setXHttpAuth,
                submitActions, setConnectionAction, usernameField, reloadAppConfigFunc, rememberMeFunc, authTokenSetFunc = null,
                logoutFunc = null, createSpinner = spinner.createSpinner, destroySpinner = spinner.destroySpinner) {
        this.base = base;
        this.authLocked = true;
        this.authQueue = [];
        this.applicationName = applicationName;
        this.username = null;
        this.authAction = authAction;
        this.refreshAction = refreshAction;
        this.loginFunc = loginFunc;
        this.refreshFunc = refreshFunc;
        this.authToken = null;
        this.usernameField = usernameField;
        this.reloadAppConfigFunc = reloadAppConfigFunc;
        this.createSpinner = createSpinner;
        this.destroySpinner = destroySpinner;
        this.authTokenSetFunc = authTokenSetFunc;
        this.rememberMeFunc = rememberMeFunc;
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
        this.rememberMeFunc(this, isRememberMe);
    }

    clone() {
        let ret = new RequestConfig(this.applicationName, this.base, this.authAction, this.refreshAction,
            this.loginFunc, this.refreshFunc, this.setXHttpAuth, this.submitActions, this._setConnectionAction,
            this.usernameField, this.reloadAppConfigFunc, this.rememberMeFunc, this.authTokenSetFunc, this.logoutFunc, this.createSpinner,
            this.destroySpinner);
        ret.rememberMe = this.rememberMe;
        ret.parent = this;
        ret.authLocked = false;
        ret.authToken = this.authToken;
        ret.setCredentials(this.credentials);
        return ret;
    }

    getApplicationName() { return this.applicationName; }

    getStorage() { return this.rememberMe ? window.localStorage : window.sessionStorage; }
    getInvertedStorage() { return this.rememberMe ? window.sessionStorage : window.localStorage; }

    logout(doReload = true, configOnly = false) {
        this.credentials = null;
        this.username = null;
        if (configOnly) { return; }
        this.resetAuthToken();

        if (this.logoutFunc !== null) {
            this.logoutFunc(this, this.getStorage());
            this.logoutFunc(this, this.getInvertedStorage());
            if (doReload) {
                window.location.reload();
            }
        }

        if (this.parent !== null) {
            this.parent.logout(doReload, true);
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

    setAuthToken(authToken, username) {
        let didReset = false;

        if (this.username && this.username !== username && username) {
            this.logout(false);
            this.username = username;
            didReset = true;
        }

        this.authToken = authToken;
        if (this.authTokenSetFunc !== null) {
            this.authTokenSetFunc(this.getStorage(), this.authToken);
        }

        if (this.parent !== null) {
            this.parent.setAuthToken(authToken, username);
        }

        return didReset;
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

function getScript() {
    if (document.currentScript) {
        return document.currentScript;
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

function getURL(method, body, json) {
    if (method === "GET") {
        if (body) {
            return "?" + body;
        } else if (json) {
            throw new Error("Please make GET requests passing to the body argument, not json");
        }
    }
    return "";
}

function xhttpSendRequest(config, xhttp, method, body, json) {
    config.createSpinner();
    if (body && !json && method !== 'GET') {
        xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhttp.send(body);
    } else if (json && !body && method !== 'GET') {
        xhttp.setRequestHeader("Content-Type", "application/json; charset=utf-8");
        xhttp.send(json);
    } else if (json && body && method !== 'GET') {
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

export function make(config, action, renderFunc, body, json, ignoreLock = true, loginUsername = null) {
    let curScriptParent = getScriptParentElement();
    let curScript = getScript();
    if (config.authLocked && !ignoreLock) {
        config.authQueue.push(function() {
            document.currentScriptParent = curScriptParent;
            document.theCurrentScript = curScript;
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
            if (isOauth) {
                let didReset = config.setAuthToken(res, loginUsername);
                if (didReset) {
                    renderFunc = function() { config.reloadAppConfigFunc(config, renderFunc); }
                }
                renderFunc();
            } else if (isRefresh) {
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

    url += getURL(method, body, json);
    xhttp.open(method, url, true);

    if (!isOauth) {
        config.setXHttpAuth(config, xhttp);
    }

    xhttpSendRequest(config, xhttp, method, body, json);
}

export function makeJson(config, action, renderFunc, json) {
    let isOauth = action === config.authAction;
    let isRefresh = action === config.refreshAction;

	if (config.authLocked && !isOauth && !isRefresh) {
        let curScriptParent = getScriptParentElement();
        let curScript = getScript();
        config.authQueue.push(function() {
            document.currentScriptParent = curScriptParent;
            document.theCurrentScript = curScript;
            makeJson(config, action, renderFunc, json);
        });
        return
    }
	if (config.submitActions.includes(action)) {
        config.setConnectionAction(json);
    }

    let username = null;

    if (isOauth) {
        username = json[config.usernameField];
    }

    make(config, action, renderFunc, undefined, JSON.stringify(json), true, username);
}

export function makeBody(config, action, renderFunc, body) {
	if (config.authLocked) {
        let curScriptParent = getScriptParentElement();
        let curScript = getScript();
        config.authQueue.push(function() {
            document.currentScriptParent = curScriptParent;
            document.theCurrentScript = curScript;
            makeBody(config, action, renderFunc, body);
        });
        return
    }
    make(config, action, renderFunc, jsonToUrlEncoded(body), undefined, true);
}

export function makeEmpty(config, action, renderFunc) {
	if (config.authLocked) {
        let curScriptParent = getScriptParentElement();
        let curScript = getScript();
        config.authQueue.push(function() {
            document.currentScriptParent = curScriptParent;
            document.theCurrentScript = curScript;
            makeEmpty(config, action, renderFunc);
        });
        return
    }
    make(config, action, renderFunc, undefined, undefined, true)
}

export function makeSimple(config, action, renderFunc, body, json, async = true) {
    let resource = action.split(" ")[1];
    let url = config.base + resource;
    let method = action.split(" ")[0];

    if (body) {
        body = jsonToUrlEncoded(body);
    }
    if (json) {
        json = JSON.stringify(json);
    }

    if (!renderFunc) {
        renderFunc = function() {  };
    }

    let xhttp = new XMLHttpRequest();
    if (async) {
        xhttp.onreadystatechange = function () {
            let origRenderFunc;
            if (this.readyState === 4) {
                config.destroySpinner();
                let origRenderFunc = renderFunc;
                if (typeof(renderFunc) === 'object') {
                    renderFunc = renderFunc[200];
                }
                let is_5xx = this.status.toString()[0] === "5";
                if (this.status === 200) {
                    renderFunc(parseResponse(this));
                } else if (this.status === 401) {
                    console.log(ERR_UNEXPECTED_CRED_CHALLENGE);
                } else if (this.status in origRenderFunc) {
                    origRenderFunc[this.status](parseResponse(this));
                } else if (ANY_STATUS_EXCEPT_5xx_OR_400 in origRenderFunc && !is_5xx && this.status !== 400) {
                    origRenderFunc[ANY_STATUS_EXCEPT_5xx_OR_400](parseResponse(this));
                } else if (ANY_STATUS_EXCEPT_5xx in origRenderFunc && !is_5xx) {
                    origRenderFunc[ANY_STATUS_EXCEPT_5xx](parseResponse(this));
                } else if (ANY_STATUS in origRenderFunc) {
                    origRenderFunc[ANY_STATUS](parseResponse(this));
                } else {
                    throw ERR_NO_RESPONSE_HANDLER({code: this.status});
                }
            }
        };
    }

    url += getURL(method, body, json);
    xhttp.open(method, url, async);

    xhttpSendRequest(config, xhttp, method, body, json);
    if (!async) {
        config.destroySpinner();
        return parseResponse(xhttp);
    }
}
