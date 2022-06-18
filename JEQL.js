import "./css_loader.js"  // Will import the CSS
import * as requests from "./requests/requests.js"; export {requests}
let HTTP_STATUS_DEFAULT = requests.HTTP_STATUS_DEFAULT; export {HTTP_STATUS_DEFAULT};

let VERSION = "2.2.12";
console.log("Loaded JEQL library, version " + VERSION);

let HTTP_STATUS_CONNECTION_EXPIRED = 419;
let HTTP_STATUS_OK = 200; export {HTTP_STATUS_OK};
let HTTP_STATUS_ACCEPTED = 202; export {HTTP_STATUS_ACCEPTED};

let STORAGE_JAAQL_TOKENS = "JAAQL_TOKENS";
let STORAGE_JAAQL_CONFIGS = "JAAQL_CONFIGS";

let JEQL_FIESTA_INTRODUCER = "introducer";
let JEQL_FIESTA_EXPRESSION = "expression";
let JEQL_FIESTA_SEPARATOR = "separator";
let JEQL_FIESTA_TERMINATOR = "terminator";
let JEQL_FIESTA_ALTERNATIVE = "alternative";

let SIGNUP_NOT_STARTED = 0; export {SIGNUP_NOT_STARTED};
let SIGNUP_STARTED = 1; export {SIGNUP_STARTED};
let SIGNUP_ALREADY_REGISTERED = 2; export {SIGNUP_ALREADY_REGISTERED};
let SIGNUP_COMPLETED = 3; export {SIGNUP_COMPLETED};

let RESET_NOT_STARTED = 0; export {RESET_NOT_STARTED};
let RESET_STARTED = 1; export {RESET_STARTED};
let RESET_COMPLETED = 3; export {RESET_COMPLETED};

let ACTION_SIGNUP = "POST /account/signup/request";
let ACTION_RESET = "POST /account/reset-password";
let ACTION_SIGNUP_WITH_TOKEN = "POST /account/signup/activate";
let ACTION_RESET_WITH_TOKEN = "POST /account/reset-password/reset";
let ACTION_FETCH_SIGNUP = "GET /account/signup/fetch";
let ACTION_FINISH_SIGNUP = "POST /account/signup/finish";
let ACTION_SIGNUP_STATUS = "GET /account/signup/status";
let ACTION_RESET_STATUS = "GET /account/reset-password/status";
let ACTION_LOGIN = "POST /oauth/token";
let ACTION_FETCH_APPLICATION_PUBLIC_USER = "GET /applications/public-user";
let ACTION_FETCH_APPLICATION_DEFAULT_EMAIL_TEMPLATES = "GET /applications/default-templates";
let ACTION_FETCH_APPLICATIONS = "GET /applications";
let ACTION_INTERNAL_EMAIL_ACCOUNTS = "GET /internal/emails/accounts"; export {ACTION_INTERNAL_EMAIL_ACCOUNTS};
let ACTION_INTERNAL_EMAIL_ACCOUNTS_ADD = "POST /internal/emails/accounts"; export {ACTION_INTERNAL_EMAIL_ACCOUNTS_ADD};
let ACTION_INTERNAL_EMAIL_ACCOUNTS_DEL = "DELETE /internal/emails/accounts"; export {ACTION_INTERNAL_EMAIL_ACCOUNTS_DEL};
let ACTION_INTERNAL_EMAIL_ACCOUNTS_DELCONF = "POST /internal/emails/accounts/confirm-deletion"; export {ACTION_INTERNAL_EMAIL_ACCOUNTS_DELCONF};
let ACTION_INTERNAL_EMAIL_TEMPLATES = "GET /internal/emails/templates"; export {ACTION_INTERNAL_EMAIL_TEMPLATES};
let ACTION_INTERNAL_EMAIL_TEMPLATES_ADD = "POST /internal/emails/templates"; export {ACTION_INTERNAL_EMAIL_TEMPLATES_ADD};
let ACTION_INTERNAL_EMAIL_TEMPLATES_DEL = "DELETE /internal/emails/templates"; export {ACTION_INTERNAL_EMAIL_TEMPLATES_DEL};
let ACTION_INTERNAL_EMAIL_TEMPLATES_DELCONF = "POST /internal/emails/templates/confirm-deletion"; export {ACTION_INTERNAL_EMAIL_TEMPLATES_DELCONF};
let ACTION_INTERNAL_NODES = "GET /internal/nodes"; export {ACTION_INTERNAL_NODES};
let ACTION_INTERNAL_NODES_ADD = "POST /internal/nodes"; export {ACTION_INTERNAL_NODES_ADD};
let ACTION_INTERNAL_NODES_DEL = "DELETE /internal/nodes"; export {ACTION_INTERNAL_NODES_DEL};
let ACTION_INTERNAL_NODES_DELCONF = "POST /internal/nodes/confirm-deletion"; export {ACTION_INTERNAL_NODES_DELCONF};
let ACTION_INTERNAL_NODE_AUTHS = "GET /internal/nodes/credentials"; export {ACTION_INTERNAL_NODE_AUTHS};
let ACTION_INTERNAL_NODE_AUTHS_ADD = "POST /internal/nodes/credentials"; export {ACTION_INTERNAL_NODE_AUTHS_ADD};
let ACTION_INTERNAL_NODE_AUTHS_DEL = "DELETE /internal/nodes/credentials"; export {ACTION_INTERNAL_NODE_AUTHS_DEL};
let ACTION_INTERNAL_NODE_AUTHS_DELCONF = "POST /internal/nodes/credentials/confirm-deletion"; export {ACTION_INTERNAL_NODE_AUTHS_DELCONF};
let ACTION_INTERNAL_DATABASES = "GET /internal/databases"; export {ACTION_INTERNAL_DATABASES};
let ACTION_INTERNAL_DATABASES_ADD = "POST /internal/databases"; export {ACTION_INTERNAL_DATABASES_ADD};
let ACTION_INTERNAL_DATABASES_DEL = "DELETE /internal/databases"; export {ACTION_INTERNAL_DATABASES_DEL};
let ACTION_INTERNAL_DATABASES_DELCONF = "POST /internal/databases/confirm-deletion"; export {ACTION_INTERNAL_DATABASES_DELCONF};
let ACTION_INTERNAL_APPLICATIONS = "GET /internal/applications"; export {ACTION_INTERNAL_APPLICATIONS};
let ACTION_INTERNAL_APPLICATIONS_ADD = "POST /internal/applications"; export {ACTION_INTERNAL_APPLICATIONS_ADD};
let ACTION_INTERNAL_APPLICATIONS_DEL = "DELETE /internal/applications"; export {ACTION_INTERNAL_APPLICATIONS_DEL};
let ACTION_INTERNAL_APPLICATIONS_DELCONF = "POST /internal/applications/confirm-deletion"; export {ACTION_INTERNAL_APPLICATIONS_DELCONF};
let ACTION_REFRESH = "POST /oauth/refresh";
let ACTION_SUBMIT = "POST /submit";
let ACTION_SUBMIT_FILE = "POST /submit-file";
let ACTION_CONFIGURATIONS = "GET /configurations";
let ACTION_INTERNAL_ASSIGNED_DATABASES = "GET /internal/applications/configurations/assigned-databases"; export {ACTION_INTERNAL_ASSIGNED_DATABASES};
let ACTION_INTERNAL_ASSIGNED_DATABASE_ADD = "POST /internal/applications/configurations/assigned-databases"; export {ACTION_INTERNAL_ASSIGNED_DATABASE_ADD};
let ACTION_INTERNAL_ASSIGNED_DATABASE_DEL = "DELETE /internal/applications/configurations/assigned-databases"; export {ACTION_INTERNAL_ASSIGNED_DATABASE_DEL};
let ACTION_INTERNAL_ASSIGNED_DATABASE_DELCONF = "POST /internal/applications/configurations/assigned-databases/confirm-deletion"; export {ACTION_INTERNAL_ASSIGNED_DATABASE_DELCONF};
let ACTION_INTERNAL_CONFIG = "GET /internal/applications/configurations"; export {ACTION_INTERNAL_CONFIG};
let ACTION_INTERNAL_CONFIG_ADD = "POST /internal/applications/configurations"; export {ACTION_INTERNAL_CONFIG_ADD};
let ACTION_INTERNAL_CONFIG_DEL = "DELETE /internal/applications/configurations"; export {ACTION_INTERNAL_CONFIG_DEL};
let ACTION_INTERNAL_CONFIG_DELCONF = "POST /internal/applications/configurations/confirm-deletion"; export {ACTION_INTERNAL_CONFIG_DELCONF};
let ACTION_INTERNAL_CONFIG_AUTH = "GET /internal/applications/configurations/authorizations"; export {ACTION_INTERNAL_CONFIG_AUTH};
let ACTION_INTERNAL_CONFIG_AUTH_ADD = "POST /internal/applications/configurations/authorizations"; export {ACTION_INTERNAL_CONFIG_AUTH_ADD};
let ACTION_INTERNAL_CONFIG_AUTH_DEL = "DELETE /internal/applications/configurations/authorizations"; export {ACTION_INTERNAL_CONFIG_AUTH_DEL};
let ACTION_INTERNAL_CONFIG_AUTH_DELCONF = "POST /internal/applications/configurations/authorizations/confirm-deletion"; export {ACTION_INTERNAL_CONFIG_AUTH_DELCONF};
let ACTION_INTERNAL_DATASETS = "GET /internal/applications/datasets"; export {ACTION_INTERNAL_DATASETS};
let ACTION_INTERNAL_DATASETS_ADD = "POST /internal/applications/datasets"; export {ACTION_INTERNAL_DATASETS_ADD};
let ACTION_INTERNAL_DATASETS_DEL = "DELETE /internal/applications/datasets"; export {ACTION_INTERNAL_DATASETS_DEL};
let ACTION_INTERNAL_DATASETS_DELCONF = "POST /internal/applications/datasets/confirm-deletion"; export {ACTION_INTERNAL_DATASETS_DELCONF};
let ACTION_CONFIGURATIONS_ASSIGNED_DATABASES = "GET /configurations/assigned-databases";

let PARAMETER_JAAQL = "jaaql";
let PARAMETER_CONFIGURATION = "configuration";

let JWT_KEY_CONFIG_NAME = "name";

let ERR_WIPING_CONFIG = "Error when loading app config, wiping config";
let ERR_IMPERATIVE_APP_CONFIG_FAILED = "Tried to get app config in an imperative manner yet app config was not set";
let ERR_NO_FOUND_CONFIGURATION_FOR_USER = "No configuration found for user";
let ERR_COULD_NOT_REFRESH_APP_CONFIG = "Could not refresh app config connection token";
let ERR_COULD_NOT_FIND_APPLICATION_WITH_NAME = "Could not find application with name ";
let ERR_MFA_TIMEOUT_OCCURRED = "MFA timeout hit. Please login again";

let KEY_QUERY = "query";
let KEY_EMAIL = "email"; export {KEY_EMAIL};
let KEY_DEFAULT_EMAIL_SIGNUP_TEMPLATE = "default_email_signup_template"; export {KEY_DEFAULT_EMAIL_SIGNUP_TEMPLATE};
let KEY_DEFAULT_EMAIL_ALREADY_SIGNED_UP_TEMPLATE = "default_email_already_signed_up_template"; export {KEY_DEFAULT_EMAIL_ALREADY_SIGNED_UP_TEMPLATE};
let KEY_DEFAULT_EMAIL_RESET_PASSWORD_TEMPLATE = "default_reset_password_template"; export {KEY_DEFAULT_EMAIL_RESET_PASSWORD_TEMPLATE};
let KEY_TEMPLATE = "template"; export {KEY_TEMPLATE};
let KEY_EXISTING_USER_TEMPLATE = "existing_user_template"; export {KEY_EXISTING_USER_TEMPLATE};
let KEY_PARAMETERS = "parameters"; export {KEY_PARAMETERS};
let KEY_DATASET = "dataset"; export {KEY_DATASET};
let KEY_DEFAULT_DATABASE = "default_database"; export {KEY_DEFAULT_DATABASE};
let KEY_NODE = "node"; export {KEY_NODE};
let KEY_PROTOCOL = "protocol"; export {KEY_PROTOCOL};
let KEY_DATABASE = "database"; export {KEY_DATABASE};
let KEY_FORCE_TRANSACTIONAL = "force_transactional"; export {KEY_FORCE_TRANSACTIONAL};
let KEY_ROWS = "rows"; export {KEY_ROWS};
let KEY_COLUMNS = "columns"; export {KEY_COLUMNS};
let KEY_PORT = "port"; export {KEY_PORT};
let KEY_ADDRESS = "address"; export {KEY_ADDRESS};
let KEY_DELETED = "deleted"; export {KEY_DELETED};
let KEY_CONNECTION = "connection";
let KEY_USERNAME = "username"; export {KEY_USERNAME};
let KEY_ACCOUNT = "account"; export {KEY_ACCOUNT};
let KEY_ALLOW_CONFIRM_SIGNUP_ATTEMPT = "allow_confirm_signup_attempt"; export {KEY_ALLOW_CONFIRM_SIGNUP_ATTEMPT};
let KEY_ALLOW_RESET_PASSWORD = "allow_reset_password"; export {KEY_ALLOW_RESET_PASSWORD};
let KEY_ALLOW_SIGNUP = "allow_signup"; export {KEY_ALLOW_SIGNUP};
let KEY_PASSWORD = "password"; export {KEY_PASSWORD};
let KEY_MFA_KEY = "mfa_key";
let KEY_PRE_AUTH_KEY = "pre_auth_key";
let KEY_CONFIGURATION = "configuration"; export {KEY_CONFIGURATION};
let KEY_APPLICATION = "application"; export {KEY_APPLICATION};
let KEY_DESCRIPTION = "description"; export {KEY_DESCRIPTION};
let KEY_URL = "url"; export {KEY_URL};
let KEY_PUBLIC_USERNAME = "public_username"; export {KEY_PUBLIC_USERNAME};
let KEY_ROLE = "role"; export {KEY_ROLE};
let KEY_PRECEDENCE = "precedence"; export {KEY_PRECEDENCE};
let KEY_CONNECTIONS = "connections";
let KEY_NAME = "name"; export {KEY_NAME};
let KEY_SEND_NAME = "send_name"; export {KEY_SEND_NAME};
let KEY_HOST = "host"; export {KEY_HOST};
let KEY_DATA = "data"; export {KEY_DATA};
let KEY_CREATE = "create"; export {KEY_CREATE};
let KEY_DROP = "drop"; export {KEY_DROP};
let KEY_CREATE_USERNAME = "create_username"; export {KEY_CREATE_USERNAME};
let KEY_RECORDS_TOTAL = "records_total";
let KEY_RECORDS_FILTERED = "records_filtered";
let KEY_SEARCH = "search";
let KEY_SORT = "sort";
let KEY_SIZE = "size";
let KEY_PAGE = "page";
let KEY_DELETION_KEY = "deletion_key";
let KEY_INVITE_OR_POLL_KEY = "invite_or_poll_key"
let KEY_RESET_OR_POLL_KEY = "reset_or_poll_key"
let KEY_INVITE_CODE = "invite_code"
let KEY_RESET_CODE = "reset_code"
let KEY_INVITE_KEY = "invite_key"
let KEY_RESET_KEY = "reset_key"
let KEY_INVITE_KEY_STATUS = "invite_key_status"
let KEY_SUBJECT = "subject"; export {KEY_SUBJECT};
let KEY_APP_RELATIVE_PATH = "app_relative_path"; export {KEY_APP_RELATIVE_PATH};
let KEY_DATA_VALIDATION_TABLE = "data_validation_table"; export {KEY_DATA_VALIDATION_TABLE};
let KEY_DATA_VALIDATION_VIEW = "data_validation_view"; export {KEY_DATA_VALIDATION_VIEW};
let KEY_RECIPIENT_VALIDATION_VIEW = "recipient_validation_view"; export {KEY_RECIPIENT_VALIDATION_VIEW};

let PROTOCOL_FILE = "file:";
let LOCAL_DEBUGGING_URL = "http://127.0.0.1:6060";

let CLS_MODAL_OUTER = "jeql-modal-outer";
let CLS_MODAL = "jeql-modal"; export {CLS_MODAL};
let CLS_MODAL_WIDE = "jeql-modal-wide"; export {CLS_MODAL_WIDE};
let CLS_MODAL_WIDEST = "jeql-modal-widest"; export {CLS_MODAL_WIDEST};
let CLS_MODAL_AUTO = "jeql-modal-auto"; export {CLS_MODAL_AUTO};
let CLS_BUTTON = "jeql-button"; export {CLS_BUTTON};
let CLS_BUTTON_YES = "jeql-button-yes"; export {CLS_BUTTON_YES};
let CLS_BUTTON_NO = "jeql-button-no"; export {CLS_BUTTON_NO};
let CLS_MODAL_CLOSE = "jeql-modal-close";
let CLS_CURSOR_POINTER = "jeql-cursor-pointer";
let CLS_CENTER = "jeql-center";
let CLS_INPUT_MFA = "jeql-input-mfa";
let CLS_SELECTED_APP_CONFIG = "jeql-selected-app-config";
let CLS_JEQL_TABLE_HEADER = "jeql-table-header";
let CLS_JEQL_TABLE_HEADER_SORT = "jeql-table-header-sort";
let CLS_JEQL_TABLE_HEADER_SORT_SPAN = "jeql-table-header-sort-span";

let SORT_DEFAULT = "&nbsp;-";
let SORT_ASC = "&nbsp;&#9650;";
let SORT_DESC = "&nbsp;&#9660;";

let ATTR_JEQL_DATA = "jeql-data";
let ATTR_JEQL_PAGING_TABLE = "jeql-paging-table";
let ATTR_JEQL_SORT_DIRECTION = "jeql-sort-direction";

let ID_LOGIN_MODAL = "jeql-login-modal";
let ID_LOGIN_ERROR = "jeql-login-error";
let ID_USERNAME = "jeql-username";
let ID_PASSWORD = "jeql-password";
let ID_REMEMBER_ME = "jeql-remember-me";
let ID_MFA_0 = "jeql-mfa-0";
let ID_MFA_1 = "jeql-mfa-1";
let ID_MFA_2 = "jeql-mfa-2";
let ID_MFA_3 = "jeql-mfa-3";
let ID_MFA_4 = "jeql-mfa-4";
let ID_MFA_5 = "jeql-mfa-5";
let ID_LOGIN_BUTTON = "jeql-login-button";
let ID_SELECT_APP_CONFIG = "jeql-select-app-config-";
let ID_PAGING_REFRESH_BUTTON = "refresh";
let ID_PAGING_FILTERED = "filtered";
let ID_PAGING_TOTAL = "total";
let ID_PAGING_PAGES = "pages";
let ID_PAGING_SIZE = "size";
let ID_PAGING_FROM = "from";
let ID_PAGING_TO = "to";
let ID_PAGING_CUR_PAGE = "cur";
let ID_PAGING_SORT = "sort";
let ID_PAGING_SEARCH = "search";
let ID_PAGING_LAST_SEARCH = "last-search";

let CLS_INPUT = "jeql-input";

let AUTH_MFA_EXPIRY_MS = 120000;

export function getSearchObj(page, size, search, sort) {
    let obj = {};
    obj[KEY_PAGE] = page;
    obj[KEY_SIZE] = size;
    obj[KEY_SEARCH] = search;
    obj[KEY_SORT] = sort;
    return obj;
}

export function modalExists() {
    return document.body.getElementsByClassName(CLS_MODAL).length !== 0;
}

export function doConfirmDelete(config, data, actionDel, actionDelConf, onComplete) {
    requests.makeBody(window.JEQL_CONFIG, actionDel, function(res) {
        data = {};
        data[KEY_DELETION_KEY] = res[KEY_DELETION_KEY];
        requests.makeJson(window.JEQL_CONFIG, actionDelConf, onComplete, data);
    }, data);
}

export function simpleSearchTransformer(cols) {
    return function(search) {
        if (search === "") { return search; }
        let simplified = "";
        for (let i = 0; i < cols.length; i ++) {
            if (i !== 0) { simplified += " OR "; }
            simplified += cols[i] + " LIKE '%" + search + "%'"
        }
        return simplified;
    }
}

export function pagedTableUpdate(table, data) {
    let tableId = table.id;
    let refreshId = tableId + "-" + ID_PAGING_REFRESH_BUTTON;
    let totalId = tableId + "-" + ID_PAGING_TOTAL;
    let filteredId = tableId + "-" + ID_PAGING_FILTERED;
    let fromId = tableId + "-" + ID_PAGING_FROM;
    let toId = tableId + "-" + ID_PAGING_TO;
    let curPageElem = document.getElementById(tableId + "-" + ID_PAGING_CUR_PAGE);
    let curPage = parseInt(curPageElem.innerText);
    let pagesElem = document.getElementById(tableId + "-" + ID_PAGING_PAGES);
    let pageSize = parseInt(document.getElementById(tableId + "-" + ID_PAGING_SIZE).value);
    let numPages = Math.ceil(data[KEY_RECORDS_FILTERED] / pageSize);
    let pageButtonClickFunc = function(event) {
        curPageElem.innerText = event.target.innerHTML;
        document.getElementById(refreshId).click();
    };

    pagesElem.innerHTML = "";
    pagesElem.appendChild(elemBuilder("button").buildText("1").buildBoolean("disabled",
        curPage === 1).buildEventListener("click", pageButtonClickFunc));
    if (curPage > 3) {
        if (numPages < 8 || curPage === 4) {
            pagesElem.appendChild(elemBuilder("button").buildText("2").buildBoolean("disabled",
                curPage === 2).buildEventListener("click", pageButtonClickFunc));
        } else {
            pagesElem.appendChild(elemBuilder("button").buildText("...").buildBoolean("disabled", true));
        }
    }
    if (numPages > 6 && numPages === curPage) {
        let curNum = curPage - 4;
        pagesElem.appendChild(elemBuilder("button").buildText(curNum.toString()).buildBoolean("disabled",
            curPage === curNum).buildEventListener("click", pageButtonClickFunc));
    }
    if (numPages > 5 && numPages - curPage < 2 && curPage > 5) {
        let curNum = curPage - 3;
        pagesElem.appendChild(elemBuilder("button").buildText(curNum.toString()).buildBoolean("disabled",
            curPage === curNum).buildEventListener("click", pageButtonClickFunc));
    }
    if (numPages > 4 && numPages - curPage < 3 && curPage > 4) {
        let curNum = curPage - 2;
        pagesElem.appendChild(elemBuilder("button").buildText(curNum.toString()).buildBoolean("disabled",
            curPage === curNum).buildEventListener("click", pageButtonClickFunc));
    }
    if (numPages > 1 && curPage - 1 !== numPages) {
        let curNum = curPage > 2 ? curPage - 1 : 2;
        pagesElem.appendChild(elemBuilder("button").buildText(curNum.toString()).buildBoolean("disabled",
            curPage === curNum).buildEventListener("click", pageButtonClickFunc));
    }
    if (numPages > 2 && curPage !== numPages) {
        let curNum = curPage > 3 ? curPage : 3;
        pagesElem.appendChild(elemBuilder("button").buildText(curNum.toString()).buildBoolean("disabled",
            curPage === curNum).buildEventListener("click", pageButtonClickFunc));
    }
    if (numPages > 3 && curPage < numPages && (numPages !== curPage + 1 || numPages === 4)) {
        let curNum = curPage > 3 ? curPage + 1 : 4;
        pagesElem.appendChild(elemBuilder("button").buildText(curNum.toString()).buildBoolean("disabled",
            curPage === curNum).buildEventListener("click", pageButtonClickFunc));
    }
    if (numPages > 6 && curPage < 4) {
        let curNum = 5;
        pagesElem.appendChild(elemBuilder("button").buildText(curNum.toString()).buildBoolean("disabled",
            curPage === curNum).buildEventListener("click", pageButtonClickFunc));
    }
    if (numPages - curPage > 2 && numPages > 5) {
        if (numPages < 8 || numPages - curPage < 4) {
            let curNum = numPages - 1;
            pagesElem.appendChild(elemBuilder("button").buildText(curNum.toString()).buildBoolean("disabled",
                curPage === curNum).buildEventListener("click", pageButtonClickFunc));
        } else {
            pagesElem.appendChild(elemBuilder("button").buildText("...").buildBoolean("disabled", true));
        }
    }
    if (numPages > 4 || (numPages === curPage && (curPage === 3 || curPage === 4))) {
        let curNum = numPages;
        pagesElem.appendChild(elemBuilder("button").buildText(curNum.toString()).buildBoolean("disabled",
            curPage === curNum).buildEventListener("click", pageButtonClickFunc));
    }

    document.getElementById(totalId).innerText = data[KEY_RECORDS_TOTAL];
    document.getElementById(filteredId).innerText = data[KEY_RECORDS_FILTERED];
    if (data[KEY_RECORDS_FILTERED] === 0) {
        document.getElementById(fromId).innerText = "0";
    } else {
        document.getElementById(fromId).innerText = (curPage * pageSize - pageSize + 1).toString();
    }
    document.getElementById(toId).innerText = Math.min((curPage * pageSize), data[KEY_RECORDS_FILTERED]).toString();
}

export function getPagedSearchingTableRefreshButton(tableId) {
    return document.getElementById(tableId + "-" + ID_PAGING_REFRESH_BUTTON);
}

export function setPagedSearchingTableSortField(tableId, sort) {
    document.getElementById(tableId + "-" + ID_PAGING_SORT).innerText = sort;
}

export function pagedSearchingTable(table, onChange, searchTransformer = null) {
    if (!searchTransformer) {
        searchTransformer = function(ret) { return ret; }
    }
    makeBuildable(table);
    table.buildBoolean(ATTR_JEQL_PAGING_TABLE, true);
    let tableId = table.id;
    let refreshId = tableId + "-" + ID_PAGING_REFRESH_BUTTON;
    let totalId = tableId + "-" + ID_PAGING_TOTAL;
    let filteredId = tableId + "-" + ID_PAGING_FILTERED;
    let pagesId = tableId + "-" + ID_PAGING_PAGES;
    let sizeId = tableId + "-" + ID_PAGING_SIZE;
    let fromId = tableId + "-" + ID_PAGING_FROM;
    let searchId = tableId + "-" + ID_PAGING_SEARCH;
    let lastSearchId = tableId + "-" + ID_PAGING_LAST_SEARCH;
    let toId = tableId + "-" + ID_PAGING_TO;
    let curPageId = tableId + "-" + ID_PAGING_CUR_PAGE;
    let sortId = tableId + "-" + ID_PAGING_SORT;
    table.buildOlderSibling("div").buildHTML(`
        <label>
            Search: 
            <input type="text" id="${searchId}"/>
        </label>
        <label>
            Page Size:
            <select id="${sizeId}">
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
                <option value="100">100</option>
                <option value="250">250</option>
                <option value="999999999">All</option>
            </select>
        </label>
        <button id="${refreshId}">Search</button>
        <span id="${curPageId}" style="display:none">1</span>
        <span id="${sortId}" style="display:none"></span>
        <span id="${lastSearchId}" style="display:none"></span>
    `);
    table.buildSibling("div").buildHTML(`
        <div id="${pagesId}"></div><div>Showing <span id="${fromId}"></span> to <span id="${toId}"></span> of <span id="${filteredId}"></span>/<span id="${totalId}"> records</span></div>
    `);
    makeBuildable(document.getElementById(pagesId));
    document.getElementById(sizeId).addEventListener("change", function() {
        document.getElementById(curPageId).innerText = "1";
        onChange(0, parseInt(document.getElementById(sizeId).value),
            searchTransformer(document.getElementById(searchId).value), document.getElementById(sortId).innerText);
    });
    document.getElementById(refreshId).addEventListener("click", function() {
        if (document.getElementById(lastSearchId).innerHTML !== document.getElementById(searchId).value) {
            document.getElementById(curPageId).innerText = "1";
        }
        document.getElementById(lastSearchId).value = document.getElementById(searchId).value;
        onChange(parseInt(document.getElementById(curPageId).innerText) - 1,
            parseInt(document.getElementById(sizeId).value), searchTransformer(document.getElementById(searchId).value),
            document.getElementById(sortId).innerText);
    });
    onChange(0, 10, searchTransformer(document.getElementById(searchId).value), "");
}

function buildChild(elem, tag) {
    let child = elemBuilder(tag);
    elem.appendChild(child);
    return child;
}

function buildClass(elem, classOrClasses) {
   if (!Array.isArray(classOrClasses)) {
       classOrClasses = [classOrClasses];
   }

   for (let curClass in classOrClasses) {
       elem.classList.add(classOrClasses[curClass]);
   }

   return elem;
}

function buildOlderSibling(elem, tag) {
    let sibling = elemBuilder(tag);
    elem.parentNode.insertBefore(sibling, elem);
    return sibling;
}

function buildSibling(elem, tag) {
    let sibling = elemBuilder(tag);
    elem.after(sibling);
    return sibling;
}

function buildAttr(elem, attr, value) {
    elem.setAttribute(attr, value);
    return elem;
}

function buildText(elem, text) {
    elem.innerText = text;
    return elem;
}

function buildHTML(elem, html) {
    elem.innerHTML += html;
    return elem;
}

export function tupleToObject(row, columns) {
    let obj = {};
    for (let i2 = 0; i2 < columns.length; i2 ++) {
        if (columns[i2].constructor === Object) {
            let objKey = Object.keys(columns[i2])[0];
            let subResponse = {};
            subResponse[KEY_COLUMNS] = columns[i2][objKey];
            subResponse[KEY_ROWS] = row[i2];
            obj[objKey] = tuplesToObjects(subResponse);
        } else {
            obj[columns[i2]] = row[i2];
        }
    }
    return obj;
}

export function tuplesToObjects(response) {
    let columns = response[KEY_COLUMNS];
    let rows = response[KEY_ROWS];
    let ret = [];

    for (let i = 0; i < rows.length; i ++) {
        ret.push(tupleToObject(rows[i], columns));
    }

    return ret;
}

export function objectsToTuples(response) {
    let ret = {};
    ret[KEY_COLUMNS] = [];
    ret[KEY_ROWS] = [];
    for (let i = 0; i < response.length; i ++) {
        if (i === 0) {
            ret[KEY_COLUMNS] = Object.keys(response[i]);
        }
        let row = [];
        for (let i2 = 0; i2 < ret[KEY_COLUMNS].length; i2 ++) {
            row.push(response[i][ret[KEY_COLUMNS][i2]]);
        }
        ret[KEY_ROWS].push(row);
    }
    return ret;
}

export function tableRenderer(data, table, rowRenderer, skipColumns) {
    if (!skipColumns) {
        skipColumns = [];
    }

    let oldSortCol = null;
    let oldSortDir = null;

    if (!table) {
        table = elemBuilder(table);
        document.body.appendChild(table);
    } else {
        let oldHeaders = table.getElementsByClassName(CLS_JEQL_TABLE_HEADER_SORT);
        for (let i = 0; i < oldHeaders.length; i ++) {
            let span = oldHeaders[i].getElementsByClassName(CLS_JEQL_TABLE_HEADER_SORT_SPAN)[0];
            if (span.getAttribute(ATTR_JEQL_SORT_DIRECTION) !== SORT_DEFAULT) {
                oldSortCol = oldHeaders[i].childNodes[0].data;
                oldSortDir = span.getAttribute(ATTR_JEQL_SORT_DIRECTION);
            }
        }
        table.innerHTML = "";
        makeBuildable(table);
    }
    let isPagingTable = table.getAttribute(ATTR_JEQL_PAGING_TABLE);
    let header = table.buildChild("tr");
    for (let idx in Object.keys(data[KEY_COLUMNS])) {
        if (skipColumns.includes(data[KEY_COLUMNS][idx])) {
            continue;
        }
        let headerText = formatAsTableHeader(data[KEY_COLUMNS][idx]);
        let th = header.buildChild("th").buildClass(CLS_JEQL_TABLE_HEADER).buildText(headerText);
        if (isPagingTable) {
            th.buildClass(CLS_JEQL_TABLE_HEADER_SORT);
            let span = th.buildChild("span").buildClass(CLS_JEQL_TABLE_HEADER_SORT_SPAN).buildHTML(
                SORT_DEFAULT).buildAttr(ATTR_JEQL_SORT_DIRECTION, SORT_DEFAULT);
            if (headerText === oldSortCol) {
                span.buildAttr(ATTR_JEQL_SORT_DIRECTION, oldSortDir);
                span.innerHTML = oldSortDir;
            }
            th.buildEventListener().buildEventListener("click", function() {
                if (span.getAttribute(ATTR_JEQL_SORT_DIRECTION) === SORT_DEFAULT) {
                    span.innerHTML = SORT_ASC;
                    span.setAttribute(ATTR_JEQL_SORT_DIRECTION, SORT_ASC);
                    let sorts = table.getElementsByClassName(CLS_JEQL_TABLE_HEADER_SORT_SPAN);
                    for (let i = 0; i < sorts.length; i ++) {
                        if (sorts[i] !== span) {
                            sorts[i].setAttribute(ATTR_JEQL_SORT_DIRECTION, SORT_DEFAULT);
                            sorts[i].innerHTML = SORT_DEFAULT;
                        }
                    }
                    setPagedSearchingTableSortField(table.id, data[KEY_COLUMNS][idx] + " ASC");
                } else if (span.getAttribute(ATTR_JEQL_SORT_DIRECTION) === SORT_ASC) {
                    span.innerHTML = SORT_DESC;
                    span.setAttribute(ATTR_JEQL_SORT_DIRECTION, SORT_DESC);
                    setPagedSearchingTableSortField(table.id, data[KEY_COLUMNS][idx] + " DESC");
                } else /*if (span.getAttribute(ATTR_JEQL_SORT_DIRECTION) === SORT_DESC)*/ {
                    span.innerHTML = SORT_DEFAULT;
                    span.setAttribute(ATTR_JEQL_SORT_DIRECTION, SORT_DEFAULT);
                    setPagedSearchingTableSortField(table.id, "");
                }
                getPagedSearchingTableRefreshButton(table.id).click();
            });
        }
    }
    header.buildChild("th");
    for (let idx in data[KEY_ROWS]) {
        let row = table.buildChild("tr");
        let defaultRowRenderer = function () {
            let iter = -1;
            for (let key in data[KEY_ROWS][idx]) {
                iter += 1;
                if (skipColumns.includes(data[KEY_COLUMNS][iter])) {
                    continue;
                }
                row.buildChild("td").buildText(data[KEY_ROWS][idx][key]);
            }
        };
        if (rowRenderer) {
            rowRenderer(row, data, idx, defaultRowRenderer);
        } else {
            defaultRowRenderer();
        }
    }
}

function buildBoolean(elem, attr, doBuild) {
    if (doBuild) {
        elem.setAttribute(attr, attr);
    }
    return elem;
}

function buildEventListener(elem, event, onevent) {
    elem.addEventListener(event, onevent);
    return elem;
}

export function makeBuildable(elem) {
    elem.removeElement = function() { elem.parentNode.removeChild(elem); }
    elem.buildClass = function(classOrClasses) { return buildClass(elem, classOrClasses); };
    elem.buildAttr = function(attr, value) { return buildAttr(elem, attr, value); };
    elem.buildBoolean = function(attr, doBuild) { return buildBoolean(elem, attr, doBuild); };
    elem.buildText = function(text) { return buildText(elem, text); };
    elem.buildHTML = function(html) { return buildHTML(elem, html); };
    elem.resetHTML = function(html) {
        elem.innerHTML = "";
        return buildHTML(elem, html);
    };
    elem.buildChild = function(tag) { return buildChild(elem, tag); };
    elem.buildRow = function() { return buildChild(elem, "tr"); };
    elem.buildForeach = function(iterable, lambda) {
        for (let i = 0; i < iterable.length; i ++) {
            elem.buildHTML(lambda(iterable[i]));
        }
        return elem;
    };
    elem.getParent = function() { return makeBuildable(elem.parentNode); };
    elem.buildSibling = function(tag) { return buildSibling(elem, tag); };
    elem.buildEventListener = function(event, onevent) { return buildEventListener(elem, event, onevent); };
    elem.buildOlderSibling = function(tag) { return buildOlderSibling(elem, tag); };
    return elem;
}

export function elemBuilder(tag) {
    let ret = document.createElement(tag);
    makeBuildable(ret);
    return ret;
}

export function getBuildableById(id) { return makeBuildable(document.getElementById(id)); }

function xHttpSetAuth(config, xhttp) {
    xhttp.setRequestHeader("Authentication-Token", config.authToken);
}

export function renderModal(modalBodyRender, allowClose = true, modalBaseClass = CLS_MODAL,
                            modalAdditionalClass = null) {
    let outerDiv = document.createElement("div");
    document.body.appendChild(outerDiv);
    outerDiv.setAttribute("class", CLS_MODAL_OUTER);

    let modalDiv = elemBuilder("div");
    outerDiv.appendChild(modalDiv);
    modalDiv.classList.add(modalBaseClass);
    if (modalAdditionalClass !== null) {
        modalDiv.classList.add(modalAdditionalClass);
    }

    if (allowClose) {
        outerDiv.classList.add(CLS_CURSOR_POINTER);
        let modalClose = elemBuilder("span").buildClass(CLS_MODAL_CLOSE).buildHTML("&times;");
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
}

export function renderModalOk(msg, onOk = null, title = "Success!") {
    if (!onOk) { onOk = function() {  }; }
    renderModal(function(modal) {
        let oldFunc = modal.closeModal;
        modal.closeModal = function() {
            oldFunc();
            onOk();
        };
        modal.buildHTML(`
            <h1>${title}</h1>
            ${msg}
        `).buildChild("button").buildText("Ok").buildClass(CLS_BUTTON).buildEventListener("click", function() {
            modal.closeModal();
        });
    }, false);
}

export function renderModalError(errMsg, errTitle = "Error!") {

}

export function renderModalAreYouSure(msg, yesFunc, title = "Are you sure?", yesButtonText = "Yes",
                                      noButtonText = "No") {
    renderModal(function(modal) {
        modal.buildHTML(`
            <h1>${title}</h1>
            ${msg}
        `).buildChild("button").buildText(yesButtonText).buildClass([CLS_BUTTON, CLS_BUTTON_YES]).buildEventListener(
            "click",
            function() {
                modal.closeModal();
                yesFunc();
            }
        ).buildSibling("button").buildText(noButtonText).buildClass([CLS_BUTTON, CLS_BUTTON_NO]).buildEventListener(
            "click",
            modal.closeModal);
    }, false);
}

function bindButton(eleId, buttonId) {
    document.getElementById(eleId).addEventListener("keyup", function(event) {
        if (event.keyCode === 13) {
            event.preventDefault();
            document.getElementById(buttonId).click();
        }
    });
}

function setMFAKey(curId, nextId, nextFunc = null) {
    if (nextFunc === null) {
        nextFunc = function() { document.getElementById(nextId).focus(); };
    }
    document.getElementById(curId).onkeypress = function(event) {
        if (Number.parseInt(event.key) || Number.parseInt(event.key) === 0) {
            document.getElementById(curId).value = event.key;
            nextFunc();
        } else {
            event.preventDefault();
        }
    };
}

function getLoginData(isMFA) {
    let ret = {};

    if (isMFA) {
        ret[KEY_MFA_KEY] = document.getElementById(ID_MFA_0).value + document.getElementById(ID_MFA_1).value +
            document.getElementById(ID_MFA_2).value + document.getElementById(ID_MFA_3).value +
            document.getElementById(ID_MFA_4).value + document.getElementById(ID_MFA_5).value;
        ret[KEY_PRE_AUTH_KEY] = isMFA;
    } else {
        ret[KEY_USERNAME] = document.getElementById(ID_USERNAME).value;
        ret[KEY_PASSWORD] = document.getElementById(ID_PASSWORD).value;
    }

    return ret;
}

function handleLoginError(modal, loginErrMsg) {
    document.getElementById(ID_LOGIN_ERROR).innerHTML = loginErrMsg + "<br>";
    let inputs = modal.getElementsByClassName(CLS_INPUT);

    for (let inp in inputs) {
        if (inputs.hasOwnProperty(inp)) {
            inputs[inp].style.borderColor = "red";
        }
    }
}

function rendererMFALogin(modal, mainLoginDiv, config, callback, preAuthKey) {
    mainLoginDiv.buildHTML(`
        <span id=${ID_LOGIN_ERROR} style="color: red"></span>
        <br>
        <label class="jeql-strong">
            2FA
            <br>
            <div style="width: 100%; display: flex; gap: 1%">
                <input class="${CLS_INPUT} ${CLS_INPUT_MFA}" type="text" id=${ID_MFA_0} maxlength="1" size="1">
                <input class="${CLS_INPUT} ${CLS_INPUT_MFA}" type="text" id=${ID_MFA_1} maxlength="1" size="1">
                <input class="${CLS_INPUT} ${CLS_INPUT_MFA}" type="text" id=${ID_MFA_2} maxlength="1" size="1">
                <input class="${CLS_INPUT} ${CLS_INPUT_MFA}" type="text" id=${ID_MFA_3} maxlength="1" size="1">
                <input class="${CLS_INPUT} ${CLS_INPUT_MFA}" type="text" id=${ID_MFA_4} maxlength="1" size="1">
                <input class="${CLS_INPUT} ${CLS_INPUT_MFA}" type="text" id=${ID_MFA_5} maxlength="1" size="1">
            </div>
        </label>
    `);

    setMFAKey(ID_MFA_0, ID_MFA_1);
    setMFAKey(ID_MFA_1, ID_MFA_2);
    setMFAKey(ID_MFA_2, ID_MFA_3);
    setMFAKey(ID_MFA_3, ID_MFA_4);
    setMFAKey(ID_MFA_4, ID_MFA_5);
    setMFAKey(ID_MFA_5, null, function() {
        document.getElementById(ID_LOGIN_BUTTON).click()
    });

    bindButton(ID_MFA_5, ID_LOGIN_BUTTON);

    document.getElementById(ID_LOGIN_BUTTON).addEventListener("click", function() {
        requests.makeJson(config, ACTION_LOGIN, function(loginErrMsg) {
            if (loginErrMsg) {
                handleLoginError(modal, loginErrMsg);
                document.getElementById(ID_MFA_0).focus();
                document.getElementById(ID_MFA_0).value = "";
                document.getElementById(ID_MFA_1).value = "";
                document.getElementById(ID_MFA_2).value = "";
                document.getElementById(ID_MFA_3).value = "";
                document.getElementById(ID_MFA_4).value = "";
                document.getElementById(ID_MFA_5).value = "";
            } else {
                modal.closeModal();
                callback();
            }
        }, getLoginData(preAuthKey));
    });

    document.getElementById(ID_MFA_0).focus();
}

export function renderLoginInPage(element, callback) {
    if (!callback) { callback = function() { }; }
    element.closeModal = function() { element.innerHTML = ""; }
    makeBuildable(element);
    rendererLogin(element, window.JEQL_CONFIG, callback, null);
}

export function login(data, rememberMe, loginHandleFunc) {
    let config = window.JEQL_CONFIG;

    config.logout(false);
    if (rememberMe !== config.rememberMe) {
        config.setRememberMe(rememberMe);
    }
    requests.makeJson(window.JEQL_CONFIG, ACTION_LOGIN, loginHandleFunc, data);
}

function rendererLogin(modal, config, callback, errMsg) {
    modal.id = ID_LOGIN_MODAL;
    modal.appendChild(elemBuilder("div").buildClass(CLS_CENTER).buildHTML(`
        <h1>
            Login
        </h1>
    `));

    let mainLoginDiv = elemBuilder("div").buildHTML(`
        <span id=${ID_LOGIN_ERROR} style="color: red"></span>
        <br>
        <label class="jeql-strong">
            Username
            <input class="${CLS_INPUT} jeql-input-full" type="text" placeholder="Enter username" id=${ID_USERNAME}>
        </label>
        <label class="jeql-strong">
            Password 
            <input class="${CLS_INPUT} jeql-input-full" type="password" placeholder="Enter password" id=${ID_PASSWORD}>
        </label>
    `);
    modal.appendChild(mainLoginDiv);
    if (errMsg) {
        document.getElementById(ID_LOGIN_ERROR).innerHTML = errMsg + "<br>";
    }

    let rememberMeBox = modal.buildChild("div").buildHTML(`
        <label for=${ID_REMEMBER_ME}>Remember me</label>
        <input type="checkbox" id=${ID_REMEMBER_ME}>
    `);
    rememberMeBox.checked = config.rememberMe;

    let createLoginButton = function(buttonDiv) {
        return buttonDiv
            .buildChild("button")
            .buildClass(CLS_BUTTON)
            .buildText("Login")
            .buildAttr("id", ID_LOGIN_BUTTON);
    }
    let buttonDiv = elemBuilder("div");
    let button = createLoginButton(buttonDiv);
    modal.appendChild(buttonDiv);
    button.addEventListener("click", function() {
        if (document.getElementById(ID_REMEMBER_ME).checked !== config.rememberMe) {
            config.logout(false, true);
            config.setRememberMe(document.getElementById(ID_REMEMBER_ME).checked);
        }
        requests.makeJson(config, ACTION_LOGIN, function(loginErrMsg, mfaNext) {
            if (mfaNext) {
                mainLoginDiv.innerHTML = "";
                rememberMeBox.removeElement();
                let mfaError = mainLoginDiv.buildChild("span")
                    .buildAttr("style", "display: none");
                buttonDiv.innerHTML = "";
                let backButton = buttonDiv.buildChild("button")
                    .buildClass(CLS_BUTTON)
                    .buildText("Back");
                createLoginButton(buttonDiv);
                setTimeout(function() {
                    mfaError.innerText = ERR_MFA_TIMEOUT_OCCURRED;
                    backButton.click();
                }, AUTH_MFA_EXPIRY_MS);
                backButton.addEventListener("click", function() {
                    modal.closeModal();
                    let mfaErrMsg = null;
                    if (mfaError.innerText.length !== 0) {
                        mfaErrMsg = mfaError.innerText;
                    }
                    showLoginModal(config, callback, mfaErrMsg);
                });
                rendererMFALogin(modal, mainLoginDiv, config, callback, loginErrMsg);
            } else if (loginErrMsg) {
                handleLoginError(modal, loginErrMsg);
                document.getElementById(ID_USERNAME).focus();
            } else {
                modal.closeModal();
                callback();
            }
        }, getLoginData());
    });
    bindButton(ID_USERNAME, ID_LOGIN_BUTTON);
    bindButton(ID_PASSWORD, ID_LOGIN_BUTTON);
    document.getElementById(ID_USERNAME).focus();
}

function showLoginModal(config, callback, errMsg) {
    if (config.credentials) {
        requests.makeJson(config, ACTION_LOGIN, callback, config.credentials);
    } else {
        renderModal(
            function(modal) { rendererLogin(modal, config, callback, errMsg); },
            false);
    }
}

function onRefreshToken(config, callback) {
    requests.makeEmpty(config, config.refreshAction, callback);
}

export function formatAsTableHeader(inStr) {
    let formatted = "";
    let lastChar = "_";
    for (let i = 0; i < inStr.length; i ++) {
        let char = inStr[i];
        formatted += lastChar === "_" ? char.toUpperCase() : char;
        lastChar = char;
    }
    return formatted.replace("_", " ");
}

export function findGetParameter(parameterName) {
    let result = null, tmp = [];
    location.search
        .substr(1)
        .split("&")
        .forEach(function (item) {
            tmp = item.split("=");
            if (tmp[0] === parameterName) { result = decodeURIComponent(tmp[1]); }
        });
    return result;
}

function getJaaqlUrl() {
    let jaaqlUrl = findGetParameter(PARAMETER_JAAQL);
    if (jaaqlUrl !== null) { return jaaqlUrl; }

    let callLoc = window.location.protocol;
    if (callLoc === PROTOCOL_FILE) {
        callLoc = LOCAL_DEBUGGING_URL;
    } else {
        callLoc += window.location.origin + "/api"
    }

    return callLoc;
}

function decodeJWT(jwt) {
    let asBase64 = jwt.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
    let json = decodeURIComponent(atob(asBase64).split('').map(function(char) {
        return '%' + ('00' + char.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(json);
}

function getJsonArrayFromStorage(storage, storageKey) {
    let storageObj = storage.getItem(storageKey);
    if (!storageObj) {
        storageObj = {};
        storage.setItem(storageKey, JSON.stringify(storageObj));
    } else {
        storageObj = JSON.parse(storageObj);
    }
    return storageObj;
}

function getAppConfig(config, allowFromUrl = false) {
    try {
        let application = config.getApplicationName();
        let appConfig = null;
        if (allowFromUrl) {
            appConfig = findGetParameter(PARAMETER_CONFIGURATION);
        }
        let storedAppConfigs = getJsonArrayFromStorage(config.getStorage(), STORAGE_JAAQL_CONFIGS);

        if (appConfig === null) {
            let appConfigsForConfig = {};
            if (config.base in storedAppConfigs) {
                appConfigsForConfig = storedAppConfigs[config.base];
            } else {
                storedAppConfigs[config.base] = appConfigsForConfig;
            }

            if (application in appConfigsForConfig) {
                appConfig = appConfigsForConfig[application];
            } else {
                appConfigsForConfig[application] = appConfig;
            }
        } else {
            appConfig = appConfig.split(",");  //Stored as multiple JWTs, comma separated
            let configName = appConfig.shift();

            let configMap = (token) => ({[decodeJWT(token)[JWT_KEY_CONFIG_NAME]]: token});
            configMap = Object.assign({}, ...appConfig.map(configMap));
            appConfig = {};
            appConfig[KEY_NAME] = configName;
            appConfig[KEY_CONNECTIONS] = configMap;

            let appConfigsForConfig = {};
            if (config.base in storedAppConfigs) {
                appConfigsForConfig = storedAppConfigs[config.base];
            } else {
                storedAppConfigs[config.base] = appConfigsForConfig;
            }

            appConfigsForConfig[application] = appConfig;
        }
        config.getStorage().setItem(STORAGE_JAAQL_CONFIGS, JSON.stringify(storedAppConfigs));

        return appConfig;
    } catch (err) {
        // Something has gone wrong
        console.error(ERR_WIPING_CONFIG);
        console.error(err);
        console.getStorage().removeItem(STORAGE_JAAQL_CONFIGS);
    }
}

function selectAppConfig(config, callback, chosenConfig) {
    let callData = {};
    callData[KEY_APPLICATION] = config.getApplicationName();
    callData[KEY_CONFIGURATION] = chosenConfig;

    let updateStoredAppConfigs = function(config, callback, chosenConfig, connections) {
        let connectionLookup = {};
        for (let idx in connections) {
            connectionLookup[connections[idx][KEY_DATASET]] = connections[idx][KEY_CONNECTION];
        }

        let configObj = {};
        configObj[KEY_CONNECTIONS] = connectionLookup;
        configObj[KEY_NAME] = chosenConfig;
        let storedAppConfigs = getJsonArrayFromStorage(config.getStorage(), STORAGE_JAAQL_CONFIGS);
        storedAppConfigs[config.base][config.getApplicationName()] = configObj;
        config.getStorage().setItem(STORAGE_JAAQL_CONFIGS, JSON.stringify(storedAppConfigs));

        callback(config);
    };

    requests.makeBody(config, ACTION_CONFIGURATIONS_ASSIGNED_DATABASES,
        function(connections) { updateStoredAppConfigs(config, callback, chosenConfig, connections); },
        callData);
}

function resetAppConfig(config, afterSelectAppConfig = null) {
    if (afterSelectAppConfig === null) {
        afterSelectAppConfig = function() {
            console.error(ERR_IMPERATIVE_APP_CONFIG_FAILED);
        };
    }

    let data = {};
    data[KEY_APPLICATION] = config.getApplicationName();
    requests.makeBody(config, ACTION_CONFIGURATIONS,
        function (data) {
            renderSelectAppConfig(config, afterSelectAppConfig, data);
        },
        data);
}

export function getOrSelectAppConfig(config, afterSelectAppConfig = null, allowFromUrl = false,
                                     preventRecursion = false) {
    let newAfterSelectAppConfig = afterSelectAppConfig;

    if (afterSelectAppConfig) {
        let curScriptParent = scriptParent();
        let curScript = script();
        newAfterSelectAppConfig = function (...args) {
            document.currentScriptParent = curScriptParent;
            document.theCurrentScript = curScript;
            config.releaseQueues();
            afterSelectAppConfig(...args);
        }
    }

    let appConfig = getAppConfig(config, allowFromUrl);

    if (appConfig !== null && appConfig.constructor === Object && KEY_CONNECTIONS in appConfig &&
        KEY_NAME in appConfig) {
        if (newAfterSelectAppConfig) {
            newAfterSelectAppConfig(config);
            return;
        } else {
            config.releaseQueues();
            return appConfig;
        }
    }

    if (!preventRecursion) {
        resetAppConfig(config, newAfterSelectAppConfig);
    }

    let fallback = {};
    fallback[KEY_CONNECTIONS] = {};
    fallback[KEY_NAME] = null;
    return fallback;
}

function storeJEQLDataToElement(elem, data) {
    elem.setAttribute(ATTR_JEQL_DATA, btoa(JSON.stringify(data)));
}

function extractJEQLDataFromElement(elem) {
    return JSON.parse(atob(elem.getAttribute(ATTR_JEQL_DATA)));
}

export function scriptParent() {
    if (document.currentScript) {
        return document.currentScript.parentElement;
    } else if (document.hasOwnProperty("currentScriptParent")) {
        return document.currentScriptParent;
    } else {
        return document.currentScript;
    }
}

export function script() {
    if (document.currentScript) {
        return document.currentScript;
    } else if (document.hasOwnProperty("theCurrentScript")) {
        return document.theCurrentScript;
    } else {
        return document.currentScript;
    }
}

export function prepareQuery(query) {
    if (query.hasOwnProperty("parameter")) {
        query["parameters"] = query["parameter"];
        delete query.parameter;
    }
    if (query.hasOwnProperty("select")) {
        query["query"] = "SELECT " + query["select"];
        delete query.select;
    }
    return query;
}

export function scriptPrior() {
    return script().previousElementSibling;
}

export function foreach(query, renderer, asObjects = true) {
    if (query.constructor !== Object) {
        query = formQuery(window.JEQL_CONFIG, query);
    }
    let currentScriptParent = scriptParent();
    let curScript = script();
    submit(window.JEQL_CONFIG, query, function(data) {
        document.currentScriptParent = currentScriptParent;
        document.theCurrentScript = curScript;
        for (let i = 0; i <  data[KEY_ROWS].length; i ++) {
            if (asObjects) {
                renderer(tupleToObject(data[KEY_ROWS][i], data[KEY_COLUMNS]));
            } else {
                renderer(data[KEY_ROWS[i]], data[KEY_COLUMNS]);
            }
        }
    });
}

export function render(formedQuery, renderFunc, config) {
    let formedRenderFunc = renderFunc;

    if (renderFunc.constructor === Object) {
        formedRenderFunc = function(data) {
            let body = null;
            let doAlternative = data[KEY_ROWS].length === 0;

            if (doAlternative) {
                if (JEQL_FIESTA_ALTERNATIVE in renderFunc) {
                    renderFunc[JEQL_FIESTA_ALTERNATIVE](data[KEY_COLUMNS]);
                }
            } else {
                if (JEQL_FIESTA_INTRODUCER in renderFunc) {
                    body = renderFunc[JEQL_FIESTA_INTRODUCER](data[KEY_COLUMNS]);
                }
                for (let i = 0; i < data[KEY_ROWS].length; i ++) {
                    if (JEQL_FIESTA_EXPRESSION in renderFunc) {
                        renderFunc[JEQL_FIESTA_EXPRESSION](data[KEY_ROWS][i], body);
                    }
                    if (JEQL_FIESTA_SEPARATOR in renderFunc) {
                        renderFunc[JEQL_FIESTA_SEPARATOR](data[KEY_ROWS][i], body);
                    }
                }
                if (JEQL_FIESTA_TERMINATOR in renderFunc) {
                    renderFunc[JEQL_FIESTA_TERMINATOR](data[KEY_COLUMNS], body);
                }
            }
        }
    }

    if (!config) { config = window.JEQL_CONFIG; }

    submit(window.JEQL_CONFIG, formedQuery, formedRenderFunc);
}

function renderSelectAppConfig(config, callback, data) {
    if (data.length === 1) {
        selectAppConfig(config, callback, data[0][KEY_CONFIGURATION])
    } else if (data.length === 0) {
        console.error(ERR_NO_FOUND_CONFIGURATION_FOR_USER);
    } else {
        renderModal(function (modal) {
            let curAppConfig = getOrSelectAppConfig(config, null, false, true)[KEY_NAME];

            modal.appendChild(elemBuilder("h1").buildText("Select Configuration"));
            let table = elemBuilder("table");
            modal.appendChild(table);
            let header = table.buildChild("tr");
            for (let idx in Object.keys(data[0])) {
                header.buildChild("th").buildText(formatAsTableHeader(Object.keys(data[0])[idx]));
            }
            header.buildChild("th");
            for (let idx in data) {
                let row = table.buildChild("tr");
                if (data[idx][KEY_CONFIGURATION] === curAppConfig) {
                    row.buildClass(CLS_SELECTED_APP_CONFIG);
                }
                for (let key in data[idx]) {
                    row.buildChild("td").buildText(data[idx][key]);
                }
                row.buildChild("td").buildHTML(`
                    <button id="${ID_SELECT_APP_CONFIG + idx}" class="${CLS_BUTTON}">Select</button>
                `);
                storeJEQLDataToElement(document.getElementById(ID_SELECT_APP_CONFIG + idx), data[idx]);
                document.getElementById(ID_SELECT_APP_CONFIG + idx).addEventListener("click", function (event) {
                    modal.closeModal();
                    selectAppConfig(config, callback, extractJEQLDataFromElement(event.target)[KEY_CONFIGURATION]);
                });
            }
        }, false, CLS_MODAL_WIDE);
    }
}

function renderAccountBanner(config) {
    // TODO render something that allows you to select configurations and access the account app
}

export function fetchMyApplications(config, callback) {
    requests.makeEmpty(config, ACTION_FETCH_APPLICATIONS, callback);
}

export function getAppUrl(config, appName) {
    let data = {};
    data[KEY_SEARCH] = `%${KEY_APPLICATION} LIKE '%${appName}'`;
    fetchMyApplications(config,
        function(data) {
            data = data[KEY_DATA];
            for (let idx in data) {
                if (data[idx][KEY_NAME] === appName) {
                    return data[idx][KEY_URL];
                }
            }
            throw ERR_COULD_NOT_FIND_APPLICATION_WITH_NAME + `'${appName}'`;
        }
    );
}

function setConnection(config, json) {
    let dataset = json[KEY_CONNECTION]
    let appConfig = getOrSelectAppConfig(config)[KEY_CONNECTIONS];

    if (!dataset) {
        if (Object.keys(appConfig).length > 1) {
            throw new Error("Must supply dataset as multiple datasets exist");
        } else if (appConfig.length === 0) {
            resetAppConfig(config);
        }
        json[KEY_CONNECTION] = appConfig[Object.keys(appConfig)[0]];
    } else {
        if (dataset in appConfig) {
            json[KEY_CONNECTION] = appConfig[dataset];
        } else {
            throw new Error("Dataset '" + dataset + " does not exist");
        }
    }
}

export function initPublic(application, onLoad, jaaqlUrl = null) {
    init(application, onLoad, false, jaaqlUrl, false);
}

export function getOrInitJEQLConfig(application, jaaqlUrl) {
    if (window.hasOwnProperty("JEQL_CONFIG")) {
        return window.JEQL_CONFIG;
    } else {
        if (jaaqlUrl === null) {
            jaaqlUrl = getJaaqlUrl();
        } else {
            if (!jaaqlUrl.startsWith("http")) {
                jaaqlUrl = "https://www." + jaaqlUrl;
            }
            if (!jaaqlUrl.endsWith("/api")) {
                jaaqlUrl += "/api";
            }
        }

        let setAuthTokenFunc = function (storage, authToken) {
            let jaaqlTokens = getJsonArrayFromStorage(storage, STORAGE_JAAQL_TOKENS);
            jaaqlTokens[jaaqlUrl] = authToken;
            storage.setItem(STORAGE_JAAQL_TOKENS, JSON.stringify(jaaqlTokens));
        };
        let logoutFunc = function (config, storage) {
            let jaaqlTokens = getJsonArrayFromStorage(storage, STORAGE_JAAQL_TOKENS);
            let jaaqlConfigs = getJsonArrayFromStorage(storage, STORAGE_JAAQL_CONFIGS);
            if (jaaqlTokens && jaaqlUrl in jaaqlTokens) {
                jaaqlTokens.pop(jaaqlUrl);
            }
            if (jaaqlConfigs && jaaqlUrl in jaaqlConfigs) {
                jaaqlConfigs.pop(jaaqlUrl);
            }
            storage.setItem(STORAGE_JAAQL_CONFIGS, JSON.stringify(jaaqlConfigs));
            storage.setItem(STORAGE_JAAQL_TOKENS, JSON.stringify(jaaqlTokens));
        };
        let rememberMeFunc = function (config) {
            let oldStorage = config.getInvertedStorage();
            let newStorage = config.getStorage();
            let oldConfigs = getJsonArrayFromStorage(oldStorage, STORAGE_JAAQL_CONFIGS);
            let newConfigs = getJsonArrayFromStorage(newStorage, STORAGE_JAAQL_CONFIGS);
            for (let key in oldConfigs) {
                if (!(key in newConfigs)) {
                    newConfigs[key] = {};
                }
            }
            config.getStorage().setItem(STORAGE_JAAQL_CONFIGS, JSON.stringify(newConfigs));
        }
        let config = new requests.RequestConfig(application, jaaqlUrl, ACTION_LOGIN, ACTION_REFRESH, showLoginModal,
            onRefreshToken, xHttpSetAuth, [ACTION_SUBMIT, ACTION_SUBMIT_FILE], setConnection, KEY_USERNAME, resetAppConfig,
            rememberMeFunc, setAuthTokenFunc, logoutFunc);

        config.setRememberMe(window.localStorage.getItem(STORAGE_JAAQL_TOKENS) !== null);

        window.JEQL_CONFIG = config;

        return config;
    }
}

export function init(application, onLoad, doRenderAccountBanner = true, jaaqlUrl = null,
                     authenticated = true) {
    if (!onLoad) { onLoad = function() {  }; }

    let config = getOrInitJEQLConfig(application, jaaqlUrl);

    if (!authenticated) {
        let body = {};
        body[KEY_APPLICATION] = application;
        let credentials = requests.makeSimple(config, ACTION_FETCH_APPLICATION_PUBLIC_USER, null,
            body, null, false);
        if (!credentials) {
            console.error("No public user for application " + application);
            return
        }
        config.setCredentials(credentials);
    }

    let jaaqlTokens = getJsonArrayFromStorage(config.getStorage(), STORAGE_JAAQL_TOKENS);
    let authToken = null;
    if (config.base in jaaqlTokens) {
        authToken = jaaqlTokens[config.base];
    }
    config.authToken = authToken;

    if (doRenderAccountBanner) {
        renderAccountBanner(config);
    }

    getOrSelectAppConfig(config.clone(), onLoad, true);

    return config;
}

export function fetchSignupData(token, onFetched) {
    let data = {};
    data[KEY_INVITE_KEY] = token;
    let preOnFetched = function(data) {
        if (data.hasOwnProperty(KEY_PARAMETERS)) {
            onFetched(data[KEY_PARAMETERS]);
        } else {
            onFetched({});
        }
    }
    requests.makeBody(window.JEQL_CONFIG, ACTION_FETCH_SIGNUP, preOnFetched, data);
}

export function finishSignup(token, onFinished) {
    let data = {};
    data[KEY_INVITE_KEY] = token;
    if (!onFinished) {
        onFinished = function() {  };
    }
    requests.makeJson(window.JEQL_CONFIG, ACTION_FINISH_SIGNUP, onFinished, data);
}

export function resetPassword(data, onreset) {
    if (!onreset) {
        onreset = function() {  };
    }
    if (typeof(onreset) !== "function") {
        let onresetStr = onreset;
        onreset = function(token) { window.location.assign(onresetStr + "?token=" + token); }
    }
    data[KEY_APPLICATION] = window.JEQL_CONFIG.applicationName;

    let resetFunc = function(ret) { onreset(ret[KEY_RESET_KEY]); };

    if (!data.hasOwnProperty(data[KEY_TEMPLATE])) {
        let getTemplateData = {};
        getTemplateData[KEY_APPLICATION] = window.JEQL_CONFIG.applicationName;

        requests.makeSimple(window.JEQL_CONFIG, ACTION_FETCH_APPLICATION_DEFAULT_EMAIL_TEMPLATES, function(templates) {
            data[KEY_TEMPLATE] = templates[KEY_DEFAULT_EMAIL_RESET_PASSWORD_TEMPLATE];
            requests.makeSimple(window.JEQL_CONFIG, ACTION_RESET, resetFunc, null, data);
        }, getTemplateData);
    } else {
        requests.makeSimple(window.JEQL_CONFIG, ACTION_RESET, resetFunc, null, data);
    }
}

export function signup(data, onsignup) {
    if (!onsignup) {
        onsignup = function() {  };
    }
    if (typeof(onsignup) !== "function") {
        let onsignupStr = onsignup;
        onsignup = function(token) { window.location.assign(onsignupStr + "?token=" + token); }
    }
    data[KEY_APPLICATION] = window.JEQL_CONFIG.applicationName;

    let signupFunc = function(ret) { onsignup(ret[KEY_INVITE_KEY]); };

    if (!data.hasOwnProperty(data[KEY_TEMPLATE])) {
        let getTemplateData = {};
        getTemplateData[KEY_APPLICATION] = window.JEQL_CONFIG.applicationName;

        requests.makeSimple(window.JEQL_CONFIG, ACTION_FETCH_APPLICATION_DEFAULT_EMAIL_TEMPLATES, function(templates) {
            data[KEY_TEMPLATE] = templates[KEY_TEMPLATE];
            data[KEY_EXISTING_USER_TEMPLATE] = templates[KEY_EXISTING_USER_TEMPLATE];
            requests.makeSimple(window.JEQL_CONFIG, ACTION_SIGNUP, signupFunc, null, data);
        }, getTemplateData);
    } else {
        requests.makeSimple(window.JEQL_CONFIG, ACTION_SIGNUP, signupFunc, null, data);
    }
}

export function signupWithToken(token, password, handleFunc) {
    let data = {};
    data[KEY_INVITE_KEY] = token;
    data[KEY_PASSWORD] = password;

    requests.makeSimple(window.JEQL_CONFIG, ACTION_SIGNUP_WITH_TOKEN, handleFunc, null, data);
}

export function signupWithTokenAndLogin(token, password, handleFunc, rememberMe) {
    if (typeof(handleFunc) !== "function") {
        let handleFuncStr = handleFunc;
        handleFunc = function() { window.location.assign(handleFuncStr + "?token=" + token); }
    }
    let preHandleFunc = function(res) {
        if (rememberMe !== null && rememberMe !== undefined) {
            window.JEQL_CONFIG.setRememberMe(rememberMe);
        }
        let creds = {};
        creds[KEY_USERNAME] = res[KEY_EMAIL];
        creds[KEY_PASSWORD] = password;
        window.JEQL_CONFIG.setCredentials(creds);
        window.JEQL_CONFIG.authLocked = false;
        getOrSelectAppConfig(window.JEQL_CONFIG, handleFunc, true);
    }
    signupWithToken(token, password, preHandleFunc);
}

export function resetWithToken(token, password, handleFunc) {
    let data = {};
    data[KEY_RESET_KEY] = token;
    data[KEY_PASSWORD] = password;

    requests.makeSimple(window.JEQL_CONFIG, ACTION_RESET_WITH_TOKEN, handleFunc, null, data);
}

export function resetWithTokenAndLogin(token, password, handleFunc, rememberMe) {
    if (typeof(handleFunc) !== "function") {
        let handleFuncStr = handleFunc;
        handleFunc = function() { window.location.assign(handleFuncStr); }
    }
    let preHandleFunc = function(res) {
        if (rememberMe !== null && rememberMe !== undefined) {
            window.JEQL_CONFIG.setRememberMe(rememberMe);
        }
        let creds = {};
        creds[KEY_USERNAME] = res[KEY_EMAIL];
        creds[KEY_PASSWORD] = password;
        window.JEQL_CONFIG.setCredentials(creds);
        window.JEQL_CONFIG.authLocked = false;
        getOrSelectAppConfig(window.JEQL_CONFIG, handleFunc, true);
    }
    resetWithToken(token, password, preHandleFunc);
}

export function signupStatus(token, onFresh, onStarted, onAlreadyRegistered, onCompleted, onInvalid) {
    signupStatusWithCode(token, null, onFresh, onStarted, onAlreadyRegistered, onCompleted, onInvalid)
}

export function signupStatusWithCode(token, code, onFresh, onStarted, onAlreadyRegistered, onCompleted, onInvalid) {
    let data = {};
    data[KEY_INVITE_OR_POLL_KEY] = token;
    if (code) { data[KEY_INVITE_CODE] = code; }
    let renderFuncs = {};
    renderFuncs[200] = function(res) {
        let status = res[KEY_INVITE_KEY_STATUS];
        if (status === SIGNUP_STARTED) {
            onStarted();
        } else if (status === SIGNUP_ALREADY_REGISTERED) {
            onAlreadyRegistered();
        } else if (status === SIGNUP_COMPLETED) {
            onCompleted();
        } else {
            onFresh();
        }
    };
    renderFuncs[422] = onInvalid;
    requests.makeSimple(window.JEQL_CONFIG, ACTION_SIGNUP_STATUS, renderFuncs, data);
}

export function resetStatusWithCode(token, code, onFresh, onStarted, onCompleted, onInvalid) {
    let data = {};
    data[KEY_RESET_OR_POLL_KEY] = token;
    if (code) { data[KEY_RESET_CODE] = code; }
    let renderFuncs = {};
    renderFuncs[200] = function(res) {
        let status = res[KEY_RESET_OR_POLL_KEY];
        if (status === RESET_STARTED) {
            onStarted();
        } else if (status === RESET_COMPLETED) {
            onCompleted();
        } else {
            onFresh();
        }
    };
    renderFuncs[422] = onInvalid;
    requests.makeSimple(window.JEQL_CONFIG, ACTION_RESET_STATUS, renderFuncs, data);
}

function callbackDoNotRefreshConnections(res, config) {
    resetAppConfig(config, function() { console.error(ERR_COULD_NOT_REFRESH_APP_CONFIG); })
}

function expiredConnectionHandler(res, config, action, renderFunc, body, json) {
    let appConfig = getOrSelectAppConfig(config);
    let reverseMap = {};
    for (let idx in appConfig[KEY_CONNECTIONS]) {
        reverseMap[appConfig[KEY_CONNECTIONS][idx]] = idx;
    }

    selectAppConfig(config,
        function() {
            let newAppConfig = getOrSelectAppConfig(config);
            if (json) {
                json = JSON.parse(json);
            } else {
                json = requests.urlEncodedToJson(body);
            }

            let wasArray = true;
            if (!Array.isArray(json)) {
                wasArray = false;
                json = [json];
            }

            for (let idx in json) {
                json[idx][KEY_CONNECTION] = newAppConfig[KEY_CONNECTIONS][reverseMap[json[idx][KEY_CONNECTION]]];
            }

            if (!wasArray) {
                json = json[0];
            }

            if (body) {
                body = requests.jsonToUrlEncoded(json);
                json = undefined;
            }

            let newRenderFuncs = {...renderFunc};
            newRenderFuncs[HTTP_STATUS_CONNECTION_EXPIRED] = callbackDoNotRefreshConnections;

            requests.make(config, action, newRenderFuncs, body, json);
        },
        appConfig[KEY_NAME]);
}

export function formQuery(config, query, queryParameters = null, dataset = null, database = null) {
    if (queryParameters === null) { queryParameters = {}; }

    let formed = {};
    formed[KEY_QUERY] = query;
    formed[KEY_PARAMETERS] = queryParameters;
    formed[KEY_CONNECTION] = dataset;
    formed[KEY_DATABASE] = database;
    return formed;
}

export function submitFile(config, input, renderFunc) {
    submit(config, input, renderFunc, false, true);
}

export function submit(config, input, renderFunc, doNotRefresh = false, asFile = false) {
    let oldRenderFunc = renderFunc;
    if (renderFunc.constructor !== Object) {
        renderFunc = {};
        renderFunc[HTTP_STATUS_OK] = oldRenderFunc;
    }
    renderFunc[HTTP_STATUS_CONNECTION_EXPIRED] = doNotRefresh ?
        callbackDoNotRefreshConnections :
        expiredConnectionHandler;
    requests.makeJson(config, asFile ? ACTION_SUBMIT_FILE : ACTION_SUBMIT, renderFunc, input);
}
