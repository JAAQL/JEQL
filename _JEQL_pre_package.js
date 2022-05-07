import * as JEQL from "./JEQL.js"

let appName = document.currentScript.getAttribute("appName");

if (document.currentScript.hasAttribute("username")) {
    let credentials = {};
    credentials[JEQL.KEY_USERNAME] = document.currentScript.getAttribute("username");
    credentials[JEQL.KEY_PASSWORD] = document.currentScript.getAttribute("password");

    JEQL.initPublic(appName, null, credentials);
} else {
    JEQL.init(appName);
}

export default JEQL
