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
        console.error("JEQL access must be either 'public' or 'authenticated'")
    }
}

if (authenticated) {
    JEQL.init(application);
} else {
    JEQL.initPublic(application, null, credentials);
}

export default JEQL
