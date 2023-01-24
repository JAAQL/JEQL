let JEQL_UTILS = {
    template: function(strings, ...keys) {
        return (function(...values) {
            let dict = values[values.length - 1] || {};
            let result = [strings[0]];
            keys.forEach(function(key, i) {
                let value = Number.isInteger(key) ? values[key] : dict[key];
                result.push(value, strings[i + 1]);
            });
            return result.join('');
        });
    },
    genStyleSheetEle: function(href, id) {
        let link = document.createElement("link");
        link.rel = "stylesheet";
        link.type = "text/css";
        link.href = href;
        link.id = id;
        return link;
    },
    genFont: function(href, id) {
        let link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = href;
        link.id = id;
        return link;
    },
    appendIfNoExist: function(parent, toAppend) {
        if (document.getElementById(toAppend.id) === null) {
            parent.appendChild(toAppend);
        }
    },
    loadStyleSheets: function() {
        let baseDir;
        if (document.currentScript) {
            baseDir = document.currentScript.src.split("/").slice(0, -1).join("/") + "/";
        } else {
            if (window.location.protocol === "file:") {
                baseDir = "../../../../JEQL/";
            } else {
                baseDir = "/apps/JEQL/";
            }
        }

        let head = document.getElementsByTagName("head")[0];

        JEQL_UTILS.appendIfNoExist(
            head,
            JEQL_UTILS.genFont(
                "https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700;900&display=swap",
                "jeql__css_font"
            )
        );

        JEQL_UTILS.appendIfNoExist(head, JEQL_UTILS.genStyleSheetEle(baseDir + "JEQL.css", "jeql__css_main"));
    },
    createSpinner: function() {
        let spinner = document.createElement("div");
        spinner.setAttribute("class", "jeql__spinner_outer");
        let subSpinner = document.createElement("div");
        subSpinner.setAttribute("class", "jeql__spinner");
        spinner.appendChild(subSpinner);
        document.body.appendChild(spinner);
    },
    destroySpinner: function() {
        try {
            document.body.removeChild(document.getElementsByClassName("jeql__spinner_outer")[0]);
        } catch (err) {
            // TODO ignore if spinner doesn't exist
        }
    }
}

let JEQL_REQUESTS = {
    ERR_UNEXPECTED_CRED_CHALLENGE: "Unexpected credential challenge for request type simple",
    HTTP_STATUS_DEFAULT: "DEFAULT",
    HTTP_STATUS_OK: 200,
    HTTP_STATUS_ACCEPTED: 202,
    HTTP_STATUS_BAD_REQUEST: 400,
    HTTP_STATUS_UNAUTHORIZED: 401,
    HTTP_STATUS_TOO_EARLY: 425,
    ANY_STATUS: "ANY_STATUS",
    ANY_STATUS_EXCEPT_5xx: "ANY_STATUS_EXCEPT_5xx",
    ANY_STATUS_EXCEPT_5xx_OR_400: "ANY_STATUS_EXCEPT_5xx_OR_400",
    ERR_NO_RESPONSE_HANDLER: JEQL_UTILS.template`No response handler found for HTTP response with code ${'code'}`,
    RequestHelper: class {
        constructor(base, authAction, refreshAction, loginFunc, refreshFunc, setXHttpAuth,
                    submitActions, usernameField, authTokenSetFunc = null, logoutFunc = null, createSpinner = JEQL_UTILS.createSpinner,
                    destroySpinner = JEQL_UTILS.destroySpinner) {
            this.base = base;
            this.authLocked = true;
            this.authQueue = [];
            this.username = null;
            this.authAction = authAction;
            this.refreshAction = refreshAction;
            this.loginFunc = loginFunc;
            this.refreshFunc = refreshFunc;
            this.authToken = null;
            this.usernameField = usernameField;
            this.createSpinner = createSpinner;
            this.destroySpinner = destroySpinner;
            this.authTokenSetFunc = authTokenSetFunc;
            if (!this.authTokenSetFunc) { this.authTokenSetFunc = function() {  } }
            this.setXHttpAuth = setXHttpAuth;
            this.rememberMe = true;
            this.logoutFunc = logoutFunc;
            if (!this.logoutFunc) { this.logoutFunc = function() {  } }
            this.parent = null;
	    	this.submitActions = submitActions;
            this.credentials = null;
            this.showSpinner = true;
        }

        setCredentials(credentials) {
            this.authLocked = false;
            this.credentials = credentials;
        }

        setRememberMe(isRememberMe) {
            this.rememberMe = isRememberMe;
            if (this.parent) {
                parent.rememberMe = isRememberMe;
            }
        }

        setShowSpinner(showSpinner) {
            this.showSpinner = showSpinner;
            if (this.parent) {
                parent.showSpinner = showSpinner;
            }
        }

        clone() {
            let ret = new JEQL_REQUESTS.RequestHelper(this.base, this.authAction, this.refreshAction, this.loginFunc, this.refreshFunc,
                this.setXHttpAuth, this.submitActions, this.usernameField, this.authTokenSetFunc, this.logoutFunc, this.createSpinner,
                this.destroySpinner);
            ret.rememberMe = this.rememberMe;
            ret.parent = this;
            ret.authLocked = false;
            ret.authToken = this.authToken;
            ret.setCredentials(this.credentials);
            ret.setShowSpinner(this.showSpinner);
            return ret;
        }

        getStorage() { return this.rememberMe ? window.localStorage : window.sessionStorage; }
        getInvertedStorage() { return this.rememberMe ? window.sessionStorage : window.localStorage; }

        logout(doReload = true, configOnly = false) {
            this.credentials = null;
            this.username = null;
            if (configOnly) { return; }
            this.resetAuthToken();

            this.logoutFunc(this.getStorage());
            this.logoutFunc(this.getInvertedStorage());
            if (this.parent) {
                this.parent.logout(doReload, true);
            }
            if (doReload) {
                window.location.reload();
            }
        }

        resetAuthToken() {
            this.authToken = null;
            this.authTokenSetFunc(this.getStorage(), this.authToken);

            if (this.parent) {
                this.parent.resetAuthToken();
            }
        }

        releaseQueues() {
            this.authLocked = false;
            while (this.authQueue.length !== 0) {
                this.authQueue.pop()();
            }
            if (this.parent) {
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
            this.authTokenSetFunc(this.getStorage(), this.authToken);

            if (this.parent) {
                this.parent.setAuthToken(authToken, username);
            }

            return didReset;
        }
    },
    jsonToUrlEncoded: function(element, key, list){
        list = list || [];
        if(typeof(element) == 'object') {
            for (let idx in element) {
                JEQL_REQUESTS.jsonToUrlEncoded(element[idx], key ? key + '[' + idx + ']' : idx, list);
            }
        } else {
            list.push(key + '=' + encodeURIComponent(element));
        }
        return list.join('&');
    },
    getScriptParentElement: function() {
        if (document.currentScript) {
            return document.currentScript.parentElement;
        } else {
            return null;
        }
    },
    getScript: function() {
        if (document.currentScript) {
            return document.currentScript;
        } else {
            return null;
        }
    },
    urlEncodedToJson: function(urlEncoded) {
        let encodeList = Array.from(urlEncoded.split("&"));
        let json = {};
        for (let idx in encodeList) {
            json[encodeList[idx].split("=")[0]] = decodeURIComponent(encodeList[idx].split("=")[1])
        }
        return json;
    },
    parseResponse: function(toParse) {
        if (toParse.getResponseHeader('Content-Type').startsWith("application/json")) {
            return JSON.parse(toParse.response);
        } else {
            return toParse.response;
        }
    },
    getURL: function(method, body, json) {
        if (method === "GET") {
            if (body) {
                return "?" + body;
            } else if (json) {
                throw new Error("Please make GET requests passing to the body argument, not json");
            }
        }
        return "";
    },
    xhttpSendRequest: function(requestHelper, xhttp, method, body, json) {
        if (this.showSpinner) {
            requestHelper.createSpinner();
        }
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
    },
    getResponseCodeHandler: function(renderFunc, status) {
        if (!renderFunc) { return null; }
        if (renderFunc.constructor !== Object) {
            let newRenderFunc = {}
            newRenderFunc[JEQL_REQUESTS.HTTP_STATUS_OK] = renderFunc;
            renderFunc = newRenderFunc;
        }

        let is_5xx = status.toString()[0] === "5";
        if (status === JEQL_REQUESTS.HTTP_STATUS_OK) {
            return renderFunc[JEQL_REQUESTS.HTTP_STATUS_OK];
        } else if (status === JEQL_REQUESTS.HTTP_STATUS_UNAUTHORIZED) {
            throw new Error(JEQL_REQUESTS.ERR_UNEXPECTED_CRED_CHALLENGE);
        } else if (status in renderFunc) {
            return renderFunc[status];
        } else if (JEQL_REQUESTS.ANY_STATUS_EXCEPT_5xx_OR_400 in renderFunc && !is_5xx &&
                status !== JEQL_REQUESTS.HTTP_STATUS_BAD_REQUEST) {
            return renderFunc[JEQL_REQUESTS.ANY_STATUS_EXCEPT_5xx_OR_400];
        } else if (JEQL_REQUESTS.ANY_STATUS_EXCEPT_5xx in renderFunc && !is_5xx) {
            return renderFunc[JEQL_REQUESTS.ANY_STATUS_EXCEPT_5xx];
        } else if (JEQL_REQUESTS.ANY_STATUS in renderFunc) {
            return renderFunc[JEQL_REQUESTS.ANY_STATUS];
        } else {
            throw new Error(JEQL_REQUESTS.ERR_NO_RESPONSE_HANDLER({code: status}));
        }
    },
    make: function(requestHelper, action, renderFunc, body, json, ignoreLock = true) {
        let curScriptParent = JEQL_REQUESTS.getScriptParentElement();
        let curScript = JEQL_REQUESTS.getScript();
        if (requestHelper.authLocked && !ignoreLock) {
            requestHelper.authQueue.push(function() {
                document.currentScriptParent = curScriptParent;
                document.theCurrentScript = curScript;
                JEQL_REQUESTS.make(requestHelper, action, renderFunc, body, json);
            });
            return
        }

        let resource = action.split(" ")[1];
        let url = requestHelper.base + resource;
        let method = action.split(" ")[0];
        let isOauth = action === requestHelper.authAction;
        let isRefresh = action === requestHelper.refreshAction;

        if (requestHelper.authToken === null && !isOauth) {
            let callback = function() { JEQL_REQUESTS.make(requestHelper, action, renderFunc, body, json); };
            requestHelper.loginFunc(requestHelper, callback);
            return
        }

        let xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            let res = null;

            if (this.readyState === 4) {
                requestHelper.destroySpinner();
                res = JEQL_REQUESTS.parseResponse(this);

                if (this.status === JEQL_REQUESTS.HTTP_STATUS_ACCEPTED) {
                    if (isOauth) {
                        renderFunc(res, true);
                    }
                } else if (this.status === JEQL_REQUESTS.HTTP_STATUS_UNAUTHORIZED) {
                    if (isOauth) {
                        renderFunc("Credentials incorrect. Please try again");
                    } else if (isRefresh) {
                        requestHelper.resetAuthToken();
                        requestHelper.loginFunc(requestHelper, function () { JEQL_REQUESTS.make(requestHelper, action, renderFunc, body, json); },
                            "Credentials expired. Please login again");
                    } else {
                        requestHelper.refreshFunc(requestHelper,
                            function () { JEQL_REQUESTS.make(requestHelper, action, renderFunc, body, json); });
                    }
                } else if (isOauth && this.status !== JEQL_REQUESTS.HTTP_STATUS_OK) {
                    renderFunc("There is an issue with the application. Our automated systems have picked this up and we will look into it asap");
                    throw new Error(this.response);
                } else {
                    if (isOauth || isRefresh) {
                        requestHelper.setAuthToken(res);
                        requestHelper.releaseQueues();
                    }
                    JEQL_REQUESTS.getResponseCodeHandler(renderFunc, this.status)(res, requestHelper, action, renderFunc, body, json);
                }
            }
        };

        url += JEQL_REQUESTS.getURL(method, body, json);
        xhttp.open(method, url, true);

        if (!isOauth) {
            requestHelper.setXHttpAuth(requestHelper, xhttp);
        }

        JEQL_REQUESTS.xhttpSendRequest(requestHelper, xhttp, method, body, json);
    },
    makeJson: function(requestHelper, action, renderFunc, json) {
        let isOauth = action === requestHelper.authAction;
        let isRefresh = action === requestHelper.refreshAction;

    	if (requestHelper.authLocked && !isOauth && !isRefresh) {
            let curScriptParent = JEQL_REQUESTS.getScriptParentElement();
            let curScript = JEQL_REQUESTS.getScript();
            requestHelper.authQueue.push(function() {
                document.currentScriptParent = curScriptParent;
                document.theCurrentScript = curScript;
                JEQL_REQUESTS.makeJson(requestHelper, action, renderFunc, json);
            });
            return
        }

        let username = null;

        if (isOauth) {
            username = json[requestHelper.usernameField];
        }

        JEQL_REQUESTS.make(requestHelper, action, renderFunc, undefined, JSON.stringify(json), true, username);
    },
    makeBody: function(requestHelper, action, renderFunc, body) {
    	if (requestHelper.authLocked) {
            let curScriptParent = JEQL_REQUESTS.getScriptParentElement();
            let curScript = JEQL_REQUESTS.getScript();
            requestHelper.authQueue.push(function() {
                document.currentScriptParent = curScriptParent;
                document.theCurrentScript = curScript;
                JEQL_REQUESTS.makeBody(requestHelper, action, renderFunc, body);
            });
            return
        }
        JEQL_REQUESTS.make(requestHelper, action, renderFunc, JEQL_REQUESTS.jsonToUrlEncoded(body), undefined, true);
    },
    makeEmpty: function(requestHelper, action, renderFunc) {
    	if (requestHelper.authLocked) {
            let curScriptParent = JEQL_REQUESTS.getScriptParentElement();
            let curScript = JEQL_REQUESTS.getScript();
            requestHelper.authQueue.push(function() {
                document.currentScriptParent = curScriptParent;
                document.theCurrentScript = curScript;
                JEQL_REQUESTS.makeEmpty(requestHelper, action, renderFunc);
            });
            return
        }
        JEQL_REQUESTS.make(requestHelper, action, renderFunc, undefined, undefined, true)
    },
    makeSimple: function(requestHelper, action, renderFunc, body, json, async = true) {
        let resource = action.split(" ")[1];
        let url = requestHelper.base + resource;
        let method = action.split(" ")[0];

        if (body) {
            body = JEQL_REQUESTS.jsonToUrlEncoded(body);
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
                if (this.readyState === 4) {
                    requestHelper.destroySpinner();
                    JEQL_REQUESTS.getResponseCodeHandler(renderFunc, this.status)(JEQL_REQUESTS.parseResponse(this))
                }
            };
        }

        url += JEQL_REQUESTS.getURL(method, body, json);
        xhttp.open(method, url, async);

        JEQL_REQUESTS.xhttpSendRequest(requestHelper, xhttp, method, body, json);
        if (!async) {
            requestHelper.destroySpinner();
            return JEQL_REQUESTS.parseResponse(xhttp);
        }
    }
}

let JEQL = {
    VERSION: "3.0.6",
    STORAGE_JAAQL_TOKEN: "JAAQL__TOKEN",
    FIESTA_INTRODUCER: "introducer",
    FIESTA_EXPRESSION: "expression",
    FIESTA_SEPARATOR: "separator",
    FIESTA_TERMINATOR: "terminator",
    FIESTA_ALTERNATIVE: "alternative",
    SIGNUP_NOT_STARTED: 0,
    SIGNUP_STARTED: 1,
    SIGNUP_ALREADY_REGISTERED: 2,
    SIGNUP_COMPLETED: 3,
    ACTION_SIGNUP: "POST /account/signup/request",
    ACTION_RESET: "POST /account/reset-password",
    ACTION_SIGNUP_WITH_TOKEN: "POST /account/signup/activate",
    ACTION_RESET_WITH_TOKEN: "POST /account/reset-password/reset",
    ACTION_FETCH_SIGNUP: "GET /account/signup/fetch",
    ACTION_FINISH_SIGNUP: "POST /account/signup/finish",
    ACTION_SIGNUP_STATUS: "GET /account/signup/status",
    ACTION_RESET_STATUS: "GET /account/reset-password/status",
    ACTION_LOGIN: "POST /oauth/token",
    ACTION_REFRESH: "POST /oauth/refresh",
    ACTION_SUBMIT: "POST /submit",
    ACTION_SEND_EMAIL: "POST /emails",
    ACTION_REQUEST_RENDERED_DOCUMENT: "POST /documents",
    ACTION_DOWNLOAD_RENDERED_DOCUMENT: "GET /documents",
    RESET_NOT_STARTED: 0,
    RESET_STARTED: 1,
    RESET_COMPLETED: 2,
    CLS_MODAL_OUTER: "jeql__modal_outer",
    CLS_MODAL: "jeql__modal",
    CLS_MODAL_WIDE: "jeql__modal_wide",
    CLS_MODAL_WIDEST: "jeql__modal_widest",
    CLS_MODAL_AUTO: "jeql__modal_auto",
    CLS_STRONG: "jeql__strong",
    CLS_INPUT_FULL: "jeql__input_full",
    CLS_BUTTON: "jeql__button",
    CLS_BUTTON_YES: "jeql__button_yes",
    CLS_BUTTON_NO: "jeql__button_no",
    CLS_MODAL_CLOSE: "jeql__modal_close",
    CLS_CURSOR_POINTER: "jeql__cursor_pointer",
    CLS_CENTER: "jeql__center",
    CLS_INPUT: "jeql__input",
    PROTOCOL_FILE: "file:",
    LOCAL_DEBUGGING_URL: "http://127.0.0.1:6060",
    ARG_INVITE_TOKEN: "invite_token",
    ARG_RESET_TOKEN: "reset_token",
    ID_LOGIN_MODAL: "jeql__login_modal",
    ID_LOGIN_BUTTON: "jeql__login_button",
    ID_LOGIN_ERROR: "jeql__login_error",
    ID_USERNAME: "jeql__username",
    ID_PASSWORD: "jeql__password",
    ID_REMEMBER_ME: "jeql__remember_me",
    KEY_QUERY: "query",
    KEY_ROWS: "rows",
    KEY_COLUMNS: "columns",
    KEY_EMAIL: "email",
    KEY_USERNAME: "username",
    KEY_PASSWORD: "password",
    KEY_APPLICATION: "application",
    KEY_TEMPLATE: "template",
    KEY_EXISTING_USER_TEMPLATE: "existing_user_template",
    KEY_CONFIGURATION: "configuration",
    KEY_INVITE_OR_POLL_KEY: "invite_or_poll_key",
    KEY_RESET_OR_POLL_KEY: "reset_or_poll_key",
    KEY_READ_ONLY: "read_only",
    KEY_INVITE_CODE: "invite_code",
    KEY_RESET_CODE: "reset_code",
    KEY_INVITE_KEY: "invite_key",
    KEY_RESET_KEY: "reset_key",
    KEY_INVITE_KEY_STATUS: "invite_key_status",
    KEY_RESET_KEY_STATUS: "reset_key_status",
    KEY_PARAMETERS: "parameters",
    KEY_DATABASE: "database",
    KEY_ATTACHMENTS: "attachments",
    KEY_SCHEMA: "schema",
    KEY_NAME: "name",
    KEY_DOCUMENT_ID: "document_id",
    KEY_AS_ATTACHMENT: "as_attachment",
    KEY_CREATE_FILE: "create_file",
    KEY_DEFAULT_EMAIL_SIGNUP_TEMPLATE: "default_email_signup_template",
    KEY_DEFAULT_EMAIL_ALREADY_SIGNED_UP_TEMPLATE: "default_email_already_signed_up_template",
    KEY_DEFAULT_EMAIL_RESET_PASSWORD_TEMPLATE: "default_reset_password_template",
    HEADER_AUTHENTICATION_TOKEN: "Authentication-Token",
    modalExists: function() {
        return document.body.getElementsByClassName(JEQL.CLS_MODAL).length !== 0;
    },
    buildChild: function(elem, tag) {
        let child = JEQL.elemBuilder(tag);
        elem.appendChild(child);
        return child;
    },
    buildClass: function(elem, classOrClasses) {
        if (!Array.isArray(classOrClasses)) {
            classOrClasses = [classOrClasses];
        }

        for (let curClass in classOrClasses) {
            elem.classList.add(classOrClasses[curClass]);
        }

        return elem;
    },
    buildOlderSibling: function(elem, tag) {
        let sibling = JEQL.elemBuilder(tag);
        elem.parentNode.insertBefore(sibling, elem);
        return sibling;
    },
    buildSibling: function(elem, tag) {
        let sibling = JEQL.elemBuilder(tag);
        elem.after(sibling);
        return sibling;
    },
    buildAttr: function(elem, attr, value) {
        elem.setAttribute(attr, value);
        return elem;
    },
    buildText: function(elem, text) {
        elem.innerText = text;
        return elem;
    },
    buildHTML: function(elem, html) {
        elem.innerHTML += html;
        return elem;
    },
    tupleToObject: function(row, columns, cellTransformer) {
        if (!cellTransformer) {
            cellTransformer = function(val) { return val; };
        }

        let obj = {};
        for (let i2 = 0; i2 < columns.length; i2 ++) {
            if (columns[i2].constructor === Object) {
                let objKey = Object.keys(columns[i2])[0];
                let subResponse = {};
                subResponse[JEQL.KEY_COLUMNS] = columns[i2][objKey];
                subResponse[JEQL.KEY_ROWS] = row[i2];
                obj[objKey] = JEQL.tuplesToObjects(subResponse, cellTransformer);
            } else {
                obj[columns[i2]] = cellTransformer(row[i2]);
            }
        }
        return obj;
    },
    tuplesToObjects: function(response, cellTransformer) {
        // This is an optimisation. I don't initialise the function per row, there may be a cost to that, but if someone wants to call
        // tupleToObject on it's own, the logic is there
        if (!cellTransformer) {
            cellTransformer = function(val) { return val; };
        }

        let columns = response[JEQL.KEY_COLUMNS];
        let rows = response[JEQL.KEY_ROWS];
        let ret = [];

        for (let i = 0; i < rows.length; i ++) {
            ret.push(JEQL.tupleToObject(rows[i], columns, cellTransformer));
        }

        return ret;
    },
    objectsToTuples: function(response) {
        let ret = {};
        ret[JEQL.KEY_COLUMNS] = [];
        ret[JEQL.KEY_ROWS] = [];
        for (let i = 0; i < response.length; i ++) {
            if (i === 0) {
                ret[JEQL.KEY_COLUMNS] = Object.keys(response[i]);
            }
            let row = [];
            for (let i2 = 0; i2 < ret[JEQL.KEY_COLUMNS].length; i2 ++) {
                row.push(response[i][ret[JEQL.KEY_COLUMNS][i2]]);
            }
            ret[JEQL.KEY_ROWS].push(row);
        }
        return ret;
    },
    buildBoolean: function(elem, attr, doBuild) {
        if (doBuild) {
            elem.setAttribute(attr, attr);
        }
        return elem;
    },
    buildEventListener: function(elem, event, onevent) {
        elem.addEventListener(event, onevent);
        return elem;
    },
    makeBuildable: function(elem) {
        elem.removeElement = function() { elem.parentNode.removeChild(elem); }
        elem.buildClass = function(classOrClasses) { return JEQL.buildClass(elem, classOrClasses); };
        elem.buildAttr = function(attr, value) { return JEQL.buildAttr(elem, attr, value); };
        elem.buildBoolean = function(attr, doBuild) { return JEQL.buildBoolean(elem, attr, doBuild); };
        elem.buildText = function(text) { return JEQL.buildText(elem, text); };
        elem.buildHTML = function(html) { return JEQL.buildHTML(elem, html); };
        elem.resetHTML = function(html) {
            elem.innerHTML = "";
            return JEQL.buildHTML(elem, html);
        };
        elem.buildChild = function(tag) {
            if (typeof tag === 'string') {
                return JEQL.buildChild(elem, tag);
            } else {
                elem.appendChild(tag);
                return elem;
            }
        };
        elem.buildRow = function() { return JEQL.buildChild(elem, "tr"); };
        elem.buildForeach = function(iterable, lambda) {
            for (let i = 0; i < iterable.length; i ++) {
                let res = lambda(iterable[i], elem);
                if (res) {
                    if (typeof res === 'string') {
                        elem.buildHTML(res);
                    } else {
                        elem.appendChild(res);
                    }
                }
            }
            return elem;
        };
        elem.getParent = function() { return JEQL.makeBuildable(elem.parentNode); };
        elem.buildSibling = function(tag) { return JEQL.buildSibling(elem, tag); };
        elem.buildEventListener = function(event, on_event) { return JEQL.buildEventListener(elem, event, on_event); };
        elem.buildClick = function(on_event) { return JEQL.buildEventListener(elem, "click", on_event); }
        elem.buildOlderSibling = function(tag) { return JEQL.buildOlderSibling(elem, tag); };
        return elem;
    },
    elemBuilder: function(tag) {
        let ret = document.createElement(tag);
        JEQL.makeBuildable(ret);
        return ret;
    },
    getBuildableById: function(id) { return JEQL.makeBuildable(document.getElementById(id)); },
    xHttpSetAuth: function(requestHelper, xhttp) {
        xhttp.setRequestHeader(JEQL.HEADER_AUTHENTICATION_TOKEN, requestHelper.authToken);
    },
    renderModal: function(modalBodyRender, allowClose = true, modalBaseClass = JEQL.CLS_MODAL, modalAdditionalClass = null) {
        let outerDiv = document.createElement("div");
        document.body.appendChild(outerDiv);
        outerDiv.setAttribute("class", JEQL.CLS_MODAL_OUTER);

        let modalDiv = JEQL.elemBuilder("div");
        outerDiv.appendChild(modalDiv);
        modalDiv.classList.add(modalBaseClass);
        if (modalAdditionalClass !== null) {
            modalDiv.classList.add(modalAdditionalClass);
        }

        if (allowClose) {
            outerDiv.classList.add(JEQL.CLS_CURSOR_POINTER);
            let modalClose = JEQL.elemBuilder("span").buildClass(JEQL.CLS_MODAL_CLOSE).buildHTML("&times;");
            modalDiv.appendChild(modalClose);
            modalClose.addEventListener("click", function() { document.body.removeChild(outerDiv); });
            outerDiv.addEventListener("click", function(event) {
                if (event.target === outerDiv) {
                    document.body.removeChild(outerDiv);
                }
            }, false);
        }

        let subDiv = modalDiv.buildChild("div");
        subDiv.closeModal = function() { outerDiv.parentElement.removeChild(outerDiv); };
        modalBodyRender(subDiv);
    },
    renderModalOk: function(msg, onOk = null, title = "Success!") {
        if (!onOk) { onOk = function() {  }; }
        JEQL.renderModal(function(modal) {
            let oldFunc = modal.closeModal;
            modal.closeModal = function() {
                oldFunc();
                onOk();
            };
            modal.buildHTML(`
                <h1>${title}</h1>
                ${msg}
            `).buildChild("button").buildText("Ok").buildClass(JEQL.CLS_BUTTON).buildClick(function() {
                modal.closeModal();
            });
        }, true);
    },
    renderModalError: function(errMsg, errTitle = "Error!") {
        JEQL.renderModal(function(modal) {
            modal.buildHTML(`
                <h1>${errTitle}</h1>
                ${errMsg}
            `).buildChild("button").buildText("Ok").buildClass([JEQL.CLS_BUTTON, JEQL.CLS_BUTTON_NO]).buildClick(modal.closeModal);
        }, true);
    },
    renderModalAreYouSure: function(msg, yesFunc, title = "Are you sure?", yesButtonText = "Yes", noButtonText = "No") {
        JEQL.renderModal(function(modal) {
            modal.buildHTML(`
                <h1>${title}</h1>
                ${msg}
            `).buildChild("button").buildText(yesButtonText).buildClass([JEQL.CLS_BUTTON, JEQL.CLS_BUTTON_YES]).buildClick(
                function() {
                    modal.closeModal();
                    yesFunc();
                }
            ).buildSibling("button").buildText(noButtonText).buildClass([JEQL.CLS_BUTTON, JEQL.CLS_BUTTON_NO]).buildClick(modal.closeModal);
        }, true);
    },
    bindButton: function(eleId, buttonId) {
        document.getElementById(eleId).addEventListener("keyup", function(event) {
            if (event.key === 'Enter') {
                event.preventDefault();
                document.getElementById(buttonId).click();
            }
        });
    },
    getLoginData: function() {
        let ret = {};
        ret[JEQL.KEY_USERNAME] = document.getElementById(JEQL.ID_USERNAME).value;
        ret[JEQL.KEY_PASSWORD] = document.getElementById(JEQL.ID_PASSWORD).value;
        return ret;
    },
    handleLoginError: function(modal, loginErrMsg) {
        document.getElementById(JEQL.ID_LOGIN_ERROR).innerHTML = loginErrMsg + "<br>";
        let inputs = modal.getElementsByClassName(JEQL.CLS_INPUT);

        for (let inp in inputs) {
            if (inputs.hasOwnProperty(inp)) {
                inputs[inp].style.borderColor = "red";
            }
        }
    },
    renderLoginInPage: function(element, callback) {
        if (!callback) { callback = function() { }; }
        element.closeModal = function() { element.innerHTML = ""; }
        JEQL.makeBuildable(element);
        JEQL.rendererLogin(element, window.JEQL__REQUEST_HELPER, callback, null);
    },
    login: function(data, rememberMe, loginHandleFunc) {
        let requestHelper = window.JEQL__REQUEST_HELPER;

        requestHelper.logout(false);
        if (rememberMe !== requestHelper.rememberMe) {
            requestHelper.setRememberMe(rememberMe);
        }
        JEQL_REQUESTS.makeJson(requestHelper, JEQL.ACTION_LOGIN, loginHandleFunc, data);
    },
    rendererLogin(modal, requestHelper, callback, errMsg) {
        modal.id = JEQL.ID_LOGIN_MODAL;
        modal.appendChild(JEQL.elemBuilder("div").buildClass(JEQL.CLS_CENTER).buildHTML(`
            <h1>
                Login
            </h1>
        `));

        let mainLoginDiv = JEQL.elemBuilder("div").buildHTML(`
            <span id=${JEQL.ID_LOGIN_ERROR} style="color: red"></span>
            <br>
        `);

        mainLoginDiv.buildHTML(`
            <label class="${JEQL.CLS_STRONG}">
                Username
                <input class="${JEQL.CLS_INPUT} ${JEQL.CLS_INPUT_FULL}" type="text" placeholder="Enter username" id=${JEQL.ID_USERNAME}>
            </label>
            <label class="${JEQL.CLS_STRONG}">
                Password 
                <input class="${JEQL.CLS_INPUT} ${JEQL.CLS_INPUT_FULL}" type="password" placeholder="Enter password" id=${JEQL.ID_PASSWORD}>
            </label>
        `);
        modal.appendChild(mainLoginDiv);
        if (errMsg) {
            document.getElementById(JEQL.ID_LOGIN_ERROR).innerHTML = errMsg + "<br>";
        }

        let rememberMeBox = modal.buildChild("div").buildHTML(`
            <label for=${JEQL.ID_REMEMBER_ME}>Remember me</label>
            <input type="checkbox" id=${JEQL.ID_REMEMBER_ME}>
        `);
        rememberMeBox.checked = requestHelper.rememberMe;

        let createLoginButton = function(buttonDiv) {
            return buttonDiv
                .buildChild("button")
                .buildClass(JEQL.CLS_BUTTON)
                .buildText("Login")
                .buildAttr("id", JEQL.ID_LOGIN_BUTTON);
        }
        let buttonDiv = JEQL.elemBuilder("div");
        let button = createLoginButton(buttonDiv);
        modal.appendChild(buttonDiv);
        button.addEventListener("click", function() {
            if (document.getElementById(JEQL.ID_REMEMBER_ME).checked !== requestHelper.rememberMe) {
                requestHelper.logout(false, true);
                requestHelper.setRememberMe(document.getElementById(JEQL.ID_REMEMBER_ME).checked);
            }
            JEQL_REQUESTS.makeJson(requestHelper, JEQL.ACTION_LOGIN, function(loginErrMsg) {
                if (loginErrMsg) {
                    JEQL.handleLoginError(modal, loginErrMsg);
                    document.getElementById(JEQL.ID_USERNAME).focus();
                } else {
                    modal.closeModal();
                    callback();
                }
            }, JEQL.getLoginData());
        });
        JEQL.bindButton(JEQL.ID_USERNAME, JEQL.ID_LOGIN_BUTTON);
        JEQL.bindButton(JEQL.ID_PASSWORD, JEQL.ID_LOGIN_BUTTON);
        document.getElementById(JEQL.ID_USERNAME).focus();
    },
    showLoginModal: function(requestHelper, callback, errMsg) {
        if (requestHelper.credentials) {
            let creds = {};
            creds[JEQL.KEY_USERNAME] = requestHelper.credentials[JEQL.KEY_USERNAME];
            creds[JEQL.KEY_PASSWORD] = requestHelper.credentials[JEQL.KEY_PASSWORD];
            JEQL_REQUESTS.makeJson(requestHelper, JEQL.ACTION_LOGIN, callback, creds);
        } else {
            JEQL.renderModal(function(modal) { JEQL.rendererLogin(modal, requestHelper, callback, errMsg); }, false);
        }
    },
    onRefreshToken: function(requestHelper, callback) {
        JEQL_REQUESTS.makeEmpty(requestHelper, requestHelper.refreshAction, callback);
    },
    findGetParameter: function(parameterName) {
        let result = null, tmp = [];
        location.search
            .substring(1)
            .split("&")
            .forEach(function (item) {
                tmp = item.split("=");
                if (tmp[0] === parameterName) { result = decodeURIComponent(tmp[1]); }
            });
        return result;
    },
    getJaaqlUrl() {
        let callLoc;
        if (window.location.protocol === JEQL.PROTOCOL_FILE) {
            callLoc = JEQL.LOCAL_DEBUGGING_URL;
        } else {
            callLoc = window.location.origin + "/api"
        }

        return callLoc;
    },
    decodeJWT: function(jwt) {
        let asBase64 = jwt.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
        let json = decodeURIComponent(atob(asBase64).split('').map(function(char) {
            return '%' + ('00' + char.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        return JSON.parse(json);
    },
    getJsonArrayFromStorage: function(storage, storageKey) {
        let storageObj = storage.getItem(storageKey);
        if (!storageObj) {
            storageObj = {};
            storage.setItem(storageKey, JSON.stringify(storageObj));
        } else {
            storageObj = JSON.parse(storageObj);
        }
        return storageObj;
    },
    render: function(formedQuery, renderFunc) {
        let formedRenderFunc = renderFunc;

        if (renderFunc.constructor === Object) {
            formedRenderFunc = function(data) {
                let body = null;
                let doAlternative = data[JEQL.KEY_ROWS].length === 0;

                if (doAlternative) {
                    if (JEQL.FIESTA_ALTERNATIVE in renderFunc) {
                        renderFunc[JEQL.FIESTA_ALTERNATIVE](data[JEQL.KEY_COLUMNS]);
                    }
                } else {
                    if (JEQL.FIESTA_INTRODUCER in renderFunc) {
                        body = renderFunc[JEQL.FIESTA_INTRODUCER](data[JEQL.KEY_COLUMNS]);
                    }
                    for (let i = 0; i < data[JEQL.KEY_ROWS].length; i ++) {
                        if (JEQL.FIESTA_EXPRESSION in renderFunc) {
                            renderFunc[JEQL.FIESTA_EXPRESSION](data[JEQL.KEY_ROWS][i], body);
                        }
                        if (JEQL.FIESTA_SEPARATOR in renderFunc) {
                            renderFunc[JEQL.FIESTA_SEPARATOR](data[JEQL.KEY_ROWS][i], body);
                        }
                    }
                    if (JEQL.FIESTA_TERMINATOR in renderFunc) {
                        renderFunc[JEQL.FIESTA_TERMINATOR](data[JEQL.KEY_COLUMNS], body);
                    }
                }
            }
        }

        JEQL.submit(formedQuery, formedRenderFunc);
    },
    renderAccountBanner: function (requestHelper) {  },  // TODO at some point
    fetchSignupData: function(token, onFetched) {
        let data = {};
        data[JEQL.KEY_INVITE_KEY] = token;
        let preOnFetched = function(data) {
            if (data.hasOwnProperty(JEQL.KEY_PARAMETERS)) {
                onFetched(data[JEQL.KEY_PARAMETERS]);
            } else {
                onFetched({});
            }
        }
        JEQL_REQUESTS.makeBody(window.JEQL__REQUEST_HELPER, JEQL.ACTION_FETCH_SIGNUP, preOnFetched, data);
    },
    finishSignup(token, onFinished) {
        let data = {};
        data[JEQL.KEY_INVITE_KEY] = token;
        if (!onFinished) {
            onFinished = function() {  };
        }
        JEQL_REQUESTS.makeJson(window.JEQL__REQUEST_HELPER, JEQL.ACTION_FINISH_SIGNUP, onFinished, data);
    },
    _renderDocument(create_file, name, parameters, callback, asAttachment) {
        let data = {};
        data[JEQL.KEY_NAME] = name;
        data[JEQL.KEY_PARAMETERS] = parameters;
        data[JEQL.KEY_CREATE_FILE] = create_file;

        let onRespFunc = function(res) {
            if (asAttachment) {
                res[JEQL.KEY_AS_ATTACHMENT] = asAttachment;
            }
            let pollFunc = {};
            pollFunc[JEQL_REQUESTS.HTTP_STATUS_OK] = function(subRes) {
                if (callback) {
                    callback(subRes);
                } else {
                    let link = document.createElement("a");
                    link.setAttribute("href", subRes);
                    link.setAttribute("target", "_blank");
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                }
            };
            pollFunc[JEQL_REQUESTS.HTTP_STATUS_TOO_EARLY] = function() {
                setTimeout(function() { onRespFunc(res); }, 125);
            };
            JEQL_REQUESTS.makeJson(window.JEQL__REQUEST_HELPER, JEQL.ACTION_DOWNLOAD_RENDERED_DOCUMENT, pollFunc, res);
        };

        JEQL_REQUESTS.makeJson(window.JEQL__REQUEST_HELPER, JEQL.ACTION_REQUEST_RENDERED_DOCUMENT, onRespFunc, data);
    },
    renderDocumentAndDownload: function(name, parameters, callback, asAttachment) {
        JEQL._renderDocument(true, name, parameters, callback, asAttachment);
    },
    renderDocumentAndFetchUrl: function(name, parameters, callback) {
        JEQL._renderDocument(false, name, parameters, callback);
    },
    convertCallbackToObjects: function(callback) {
        return function(data) {
            callback(JEQL.tuplesToObjects(data));
        }
    },
    convertCallbackToObject: function(callback) {
        return function(data) {
            callback(JEQL.tupleToObject(data[JEQL.KEY_ROWS][0], data[JEQL.KEY_COLUMNS]));
        }
    },
    formQuery: function(query, params, schema) {
        let formed = {};
        formed[JEQL.KEY_QUERY] = query;
        if (params) {
            formed[JEQL.KEY_PARAMETERS] = params;
        }
        formed[JEQL.KEY_APPLICATION] = window.JEQL__APP;
        formed[JEQL.KEY_CONFIGURATION] = window.JEQL__CONFIG;
        if (schema) {
            formed[JEQL.KEY_SCHEMA] = schema;
        }
        return formed;
    },
    fetchDefaultTemplates(callback) {
        let query = {};
        query[JEQL.KEY_QUERY] = "SELECT * FROM my_email_template_defaults WHERE application = :application";
        let parameters = {};
        parameters[JEQL.KEY_APPLICATION] = window.JEQL__APP;
        query[JEQL.KEY_PARAMETERS] = parameters;
        JEQL.submit(query, JEQL.convertCallbackToObject(callback));
    },
    resetPassword(data, onreset, errFunc) {
        if (!onreset) {
            onreset = function() {  };
        }
        if (!errFunc) {
            errFunc = function() { throw `Could not signup!`; };
        }

        if (typeof(onreset) !== "function") {
            let onresetStr = onreset;
            onreset = function(token) {
                let connector = onresetStr.includes("?") ? "&" : "?";
                window.location.assign(onresetStr + connector + encodeURIComponent(JEQL.ARG_RESET_TOKEN) + "=" + encodeURIComponent(token));
            }
        }
        data[JEQL.KEY_APPLICATION] = window.JEQL__APP;
        data[JEQL.KEY_CONFIGURATION] = window.JEQL__CONFIG;

        let resetFunc = function(ret) { onreset(ret[JEQL.KEY_RESET_KEY]); };
        let resetDict = {};
        resetDict[JEQL_REQUESTS.HTTP_STATUS_OK] = resetFunc;
        resetDict[JEQL_REQUESTS.ANY_STATUS_EXCEPT_5xx_OR_400] = errFunc;

        if (!data.hasOwnProperty(data[JEQL.KEY_TEMPLATE])) {
            JEQL.fetchDefaultTemplates(function(config) {
                data[JEQL.KEY_TEMPLATE] = config[JEQL.KEY_DEFAULT_EMAIL_RESET_PASSWORD_TEMPLATE];
                JEQL_REQUESTS.makeSimple(window.JEQL__REQUEST_HELPER, JEQL.ACTION_RESET, resetDict, null, data);
            });
        } else {
            JEQL_REQUESTS.makeSimple(window.JEQL__REQUEST_HELPER, JEQL.ACTION_RESET, resetDict, null, data);
        }
    },
    sendEmail: function(template, parameters, attachments, onSuccess, onError) {
        let data = {};
        data[JEQL.KEY_APPLICATION] = window.JEQL__APP;
        data[JEQL.KEY_CONFIGURATION] = window.JEQL__CONFIG;
        data[JEQL.KEY_PARAMETERS] = parameters;
        data[JEQL.KEY_ATTACHMENTS] = attachments;
        data[JEQL.KEY_TEMPLATE] = template;

        let resDict = {};
        resDict[JEQL_REQUESTS.HTTP_STATUS_OK] = onSuccess;
        resDict[JEQL_REQUESTS.ANY_STATUS_EXCEPT_5xx_OR_400] = onError;
        JEQL_REQUESTS.makeJson(window.JEQL__REQUEST_HELPER, JEQL.ACTION_SEND_EMAIL, resDict, data);
    },
    signup: function(data, onSignup, errFunc) {
        if (!onSignup) {
            onSignup = function() {  };
        }
        if (!errFunc) {
            errFunc = function() { throw `Could not signup!`; };
        }
        if (typeof(onSignup) !== "function") {
            let onSignupStr = onSignup;
            onSignup = function(token) {
                let connector = onSignupStr.includes("?") ? "&" : "?";
                window.location.assign(onSignupStr + connector + encodeURIComponent(JEQL.ARG_INVITE_TOKEN) + "=" + encodeURIComponent(token));
            }
        }
        data[JEQL.KEY_APPLICATION] = window.JEQL__APP;
        data[JEQL.KEY_CONFIGURATION] = window.JEQL__CONFIG;

        let signupFunc = function(ret) { onSignup(ret[JEQL.KEY_INVITE_KEY]); };
        let signupDict = {};
        signupDict[JEQL_REQUESTS.HTTP_STATUS_OK] = signupFunc;
        signupDict[JEQL_REQUESTS.ANY_STATUS_EXCEPT_5xx_OR_400] = errFunc;

        if (!data.hasOwnProperty(data[JEQL.KEY_TEMPLATE])) {
            JEQL.fetchDefaultTemplates(function(templates) {
                data[JEQL.KEY_TEMPLATE] = templates[JEQL.KEY_DEFAULT_EMAIL_SIGNUP_TEMPLATE];
                data[JEQL.KEY_EXISTING_USER_TEMPLATE] = templates[JEQL.KEY_DEFAULT_EMAIL_ALREADY_SIGNED_UP_TEMPLATE];
                JEQL_REQUESTS.makeSimple(window.JEQL__REQUEST_HELPER, JEQL.ACTION_SIGNUP, signupDict, null, data);
            })
        } else {
            JEQL_REQUESTS.makeSimple(window.JEQL__REQUEST_HELPER, JEQL.ACTION_SIGNUP, signupDict, null, data);
        }
    },
    signupWithToken: function(token, password, handleFunc) {
        let data = {};
        data[JEQL.KEY_INVITE_KEY] = token;
        data[JEQL.KEY_PASSWORD] = password;

        JEQL_REQUESTS.makeSimple(window.JEQL__REQUEST_HELPER, JEQL.ACTION_SIGNUP_WITH_TOKEN, handleFunc, null, data);
    },
    signupWithTokenAndLogin: function(token, password, handleFunc, rememberMe, onError) {
        if (typeof(handleFunc) !== "function") {
            let handleFuncStr = handleFunc;
            handleFunc = function() { window.location.assign(handleFuncStr + "?token=" + token); }
        }
        let preHandleFunc = function(res) {
            if (rememberMe !== null && rememberMe !== undefined) {
                window.JEQL__REQUEST_HELPER.setRememberMe(rememberMe);
            }
            let creds = {};
            creds[JEQL.KEY_USERNAME] = res[JEQL.KEY_EMAIL];
            creds[JEQL.KEY_PASSWORD] = password;
            window.JEQL__REQUEST_HELPER.authToken = null;
            window.JEQL__REQUEST_HELPER.setCredentials(creds);
            JEQL.fetchSignupData(token, handleFunc);
        }
        let preHandleDict = {};
        preHandleDict[JEQL_REQUESTS.HTTP_STATUS_OK] = preHandleFunc;
        if (onError) {
            preHandleDict[JEQL_REQUESTS.ANY_STATUS_EXCEPT_5xx_OR_400] = onError;
        }
        JEQL.signupWithToken(token, password, preHandleDict);
    },
    resetWithToken: function(token, password, handleFunc) {
        let data = {};
        data[JEQL.KEY_RESET_KEY] = token;
        data[JEQL.KEY_PASSWORD] = password;

        JEQL_REQUESTS.makeSimple(window.JEQL__REQUEST_HELPER, JEQL.ACTION_RESET_WITH_TOKEN, handleFunc, null, data);
    },
    resetWithTokenAndLogin: function(token, password, handleFunc, rememberMe, onError) {
        if (typeof(handleFunc) !== "function") {
            let handleFuncStr = handleFunc;
            handleFunc = function() { window.location.assign(handleFuncStr + "?token=" + token); }
        }
        let preHandleFunc = function(res) {
            if (rememberMe !== null && rememberMe !== undefined) {
                window.JEQL__REQUEST_HELPER.setRememberMe(rememberMe);
            }
            let creds = {};
            creds[JEQL.KEY_USERNAME] = res[JEQL.KEY_EMAIL];
            creds[JEQL.KEY_PASSWORD] = password;
            window.JEQL__REQUEST_HELPER.authToken = null;
            window.JEQL__REQUEST_HELPER.setCredentials(creds);
            if (res.hasOwnProperty(JEQL.KEY_PARAMETERS)) {
                handleFunc(res[JEQL.KEY_PARAMETERS]);
            } else {
                handleFunc({});
            }
        }
        let preHandleDict = {};
        preHandleDict[JEQL_REQUESTS.HTTP_STATUS_OK] = preHandleFunc;
        if (onError) {
            preHandleDict[JEQL_REQUESTS.ANY_STATUS_EXCEPT_5xx_OR_400] = onError;
        }
        JEQL.resetWithToken(token, password, preHandleDict);
    },
    callLoginDirectly: function(email, password, rememberMe, onSuccess, onError) {
        if (rememberMe !== null && rememberMe !== undefined) {
            window.JEQL__REQUEST_HELPER.setRememberMe(rememberMe);
        }

        let callDict = {};
        callDict[JEQL_REQUESTS.HTTP_STATUS_OK] = onSuccess;
        callDict[JEQL_REQUESTS.ANY_STATUS_EXCEPT_5xx_OR_400] = onError;

        let loginData = {};
        loginData[JEQL.KEY_USERNAME] = email;
        loginData[JEQL.KEY_PASSWORD] = password

        JEQL_REQUESTS.makeJson(window.JEQL__REQUEST_HELPER, JEQL.ACTION_LOGIN, callDict, loginData);
    },
    loginWithInviteToken: function(email, password, rememberMe, token, handleFunc, onError) {
        if (typeof(handleFunc) !== "function") {
            let handleFuncStr = handleFunc;
            handleFunc = function() { window.location.assign(handleFuncStr + "?token=" + token); }
        }

        let onSuccess = function() { JEQL.fetchSignupData(token, handleFunc); }

        JEQL.callLoginDirectly(email, password, rememberMe, onSuccess, onError);
    },
    signupStatusWithCode: function(token, code, onFresh, onStarted, onAlreadyRegistered, onCompleted, onInvalid) {
        let data = {};
        data[JEQL.KEY_INVITE_OR_POLL_KEY] = token;
        if (code) { data[JEQL.KEY_INVITE_CODE] = code; }
        let renderFuncs = {};
        renderFuncs[JEQL_REQUESTS.HTTP_STATUS_OK] = function(res) {
            let status = res[JEQL.KEY_INVITE_KEY_STATUS];
            if (status === JEQL.SIGNUP_STARTED) {
                onStarted();
            } else if (status === JEQL.SIGNUP_ALREADY_REGISTERED) {
                onAlreadyRegistered();
            } else if (status === JEQL.SIGNUP_COMPLETED) {
                onCompleted();
            } else {
                onFresh();
            }
        };
        renderFuncs[JEQL_REQUESTS.ANY_STATUS_EXCEPT_5xx_OR_400] = onInvalid;
        JEQL_REQUESTS.makeSimple(window.JEQL__REQUEST_HELPER, JEQL.ACTION_SIGNUP_STATUS, renderFuncs, data);
    },
    signupStatus: function(token, onFresh, onStarted, onAlreadyRegistered, onCompleted, onInvalid) {
        JEQL.signupStatusWithCode(token, null, onFresh, onStarted, onAlreadyRegistered, onCompleted, onInvalid)
    },
    resetStatusWithCode: function(token, code, onFresh, onStarted, onCompleted, onInvalid) {
        let data = {};
        data[JEQL.KEY_RESET_OR_POLL_KEY] = token;
        if (code) { data[JEQL.KEY_RESET_CODE] = code; }
        let renderFuncs = {};
        renderFuncs[JEQL_REQUESTS.HTTP_STATUS_OK] = function(res) {
            let status = res[JEQL.KEY_RESET_KEY_STATUS];
            if (status === JEQL.RESET_STARTED) {
                onStarted();
            } else if (status === JEQL.RESET_COMPLETED) {
                onCompleted();
            } else {
                onFresh();
            }
        };
        renderFuncs[JEQL_REQUESTS.ANY_STATUS_EXCEPT_5xx_OR_400] = onInvalid;
        JEQL_REQUESTS.makeSimple(window.JEQL__REQUEST_HELPER, JEQL.ACTION_RESET_STATUS, renderFuncs, data);
    },
    submit: function(input, renderFunc) {
        if (!renderFunc) { renderFunc = function() {  }; }
        let oldRenderFunc = renderFunc;
        if (renderFunc.constructor !== Object) {
            renderFunc = {};
            renderFunc[JEQL_REQUESTS.HTTP_STATUS_OK] = oldRenderFunc;
        }
        JEQL_REQUESTS.makeJson(window.JEQL__REQUEST_HELPER, JEQL.ACTION_SUBMIT, renderFunc, input);
    },
    initPublic: function(application, configuration, onLoad, jaaqlUrl = null) {
        JEQL.init(application, configuration, onLoad, false, jaaqlUrl, false);
    },
    getOrInitJEQLRequestHelper: function(jaaqlUrl, application, configuration = null, showSpinner = true) {
        if (window.hasOwnProperty("JEQL__REQUEST_HELPER")) {
            return window.JEQL__REQUEST_HELPER;
        } else {
            window.JEQL__APP = application;
            window.JEQL__CONFIG = configuration;

            if (jaaqlUrl === null) {
                jaaqlUrl = JEQL.getJaaqlUrl();
            } else {
                if (!jaaqlUrl.startsWith("http")) {
                    jaaqlUrl = "https://www." + jaaqlUrl;
                    if (!jaaqlUrl.endsWith("/api")) {
                        jaaqlUrl += "/api";
                    }
                }
            }

            let setAuthTokenFunc = function (storage, authToken) {
                storage.setItem(JEQL.STORAGE_JAAQL_TOKEN, authToken);
            };
            let logoutFunc = function (storage) {
                storage.removeItem(JEQL.STORAGE_JAAQL_TOKEN);
            };
            let requestHelper = new JEQL_REQUESTS.RequestHelper(jaaqlUrl, JEQL.ACTION_LOGIN, JEQL.ACTION_REFRESH, JEQL.showLoginModal,
                JEQL.onRefreshToken, JEQL.xHttpSetAuth, [JEQL.ACTION_SUBMIT], JEQL.KEY_USERNAME,
                setAuthTokenFunc, logoutFunc);

            requestHelper.setShowSpinner(showSpinner);
            requestHelper.setRememberMe(window.localStorage.getItem(JEQL.STORAGE_JAAQL_TOKEN) !== null);

            window.JEQL__REQUEST_HELPER = requestHelper;
            return requestHelper;
        }
    },
    init: function(application = null, configuration = null, onLoad = null,
                   doRenderAccountBanner = true, jaaqlUrl = null, authenticated = true) {
        let wasOnLoadNone = !onLoad;
        if (!onLoad) { onLoad = function() {  }; }

        let requestHelper = JEQL.getOrInitJEQLRequestHelper(jaaqlUrl, application, configuration);

        if (!authenticated) {
            // Set the credentials to the public user
            let credentials = {};
            credentials[JEQL.KEY_USERNAME] = "public";
            credentials[JEQL.KEY_PASSWORD] = "jaaql_public_password"

            requestHelper.setCredentials(credentials);
        }

        requestHelper.authToken = requestHelper.getStorage().getItem(JEQL.STORAGE_JAAQL_TOKEN);
        if (authenticated && authenticated !== true) {
            requestHelper.authToken = authenticated;
        }
        if (requestHelper.authToken) {
            requestHelper.releaseQueues();
            requestHelper.authLocked = false;
        }

        if (doRenderAccountBanner) {
            JEQL.renderAccountBanner(requestHelper);
        }

        if ((authenticated || wasOnLoadNone) && !requestHelper.authToken) {
            requestHelper.loginFunc(requestHelper, function() { onLoad(requestHelper); });
        } else {
            onLoad(requestHelper);
        }

        return requestHelper;
    }
}

console.log("Loaded JEQL library, version " + JEQL.VERSION);
