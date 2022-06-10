import * as JEQL from "./JEQL.js"

let cur = document.currentScript;

let application = cur.getAttribute("application");

let authenticated = true
if (cur.hasAttribute("access")) {
    let access = cur.getAttribute("access");
    if (access === "public") {
        authenticated = false;
    } else if (access === "authenticated") {
        // Do nothing
    } else {
        console.error("JEQL access must be either 'public' or 'authenticated'");
    }
}

let jaaql = null;
if (cur.hasAttribute("jaaql")) {
    jaaql = cur.getAttribute("jaaql");
}

if (authenticated) {
    JEQL.init(application, null, true, jaaql);
} else {
    JEQL.initPublic(application, null, jaaql);
}

export default JEQL
