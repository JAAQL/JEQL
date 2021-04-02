/*jslint
    browser, fudge, for
*/
/*global
    ActiveXObject, Array, Error, JEQL, JSON, Object, XMLHttpRequest, console,
    decodeURIComponent, document, encodeURIComponent, parseInt, window, confirm
*/
/*property
    Anatomy, Assertion, Class, DOM, HTTP, JSON, JSON_UTF8, Lib, Name,
    URIQueryGlyph, XMLHttpRequest, action, add, addEventListener, appendChild,
    args, as, assert, assertElement, body, button, call, caption, className,
    clearElement, colSpan, columns, confirmCalls, contentType, cover,
    createElement, datatype, days, debug, debugCall, delete, descriptors, done,
    edit, empty, eventHandlers, eventType, exclude, expandRender, fake,
    fakeData, fakeResponseText, firstChild, floor, friday, get, getElementById,
    getElementsByTagName, grid, halt, handleEvent, heading, hideEmptyRows,
    hideWhenEmpty, href, id, includes, indexCloserGlyph, indexOf,
    indexOpenerGlyph, indirectionGlyph, init, innerHTML, interpret, isArray,
    isSimpleObject, isWeekday, isrequired, iterationLimit, keys, legend, length,
    load, location, log, logElement, matches, memberGlyph, missing, monday,
    name, nonBreakingSpace, none, notFound, ok, on, one, oneOrMore, onerror,
    onreadystatechange, open, operations, page, parentElement, parse, perhaps,
    plural, popup, push, query, random, readyState, removeChild, render,
    requestHeader, responseText, row, rows, saturday, script, select, selector,
    send, setRequestHeader, settings, split, src, srcElement, stack, startsWith,
    status, stringify, substring, sunday, table, tagName, targetCellId,
    tests_isSimpleObject, tests_isWeekday, tests_plural, thursday, toString,
    trace, trigger, tuesday, type, unset, unshift, using, value, viewport,
    wednesday, withCredentials, zero, zeroOrOne
*/


const JEQL = {
    Name: "JEQL",
    Class: {
        add: "add",
        "button": "button",
        caption: "caption",
        columns: "columns",
        cover: "cover",
        "delete": "delete",
        echo: "echo",
        edit: "edit",
        error: "error",
        empty: "empty",
        grid: "grid",
        legend: "legend",
        missing: "missing",
        operations: "operations",
        parameters: "parameters",
        popup: "popup",
        query: "query",
        render: "render",
        renderAsObjects: "renderAsObjects",
        renderAsTuples: "renderAsTuples",
        rows: "rows",
        table: "table",
        value: "value",
        viewport: "viewport"
    },
    DOM: {
        none: "none",
        unset: "",
        script: "script",
        nonBreakingSpace: "&nbsp;",
        days: {
            sunday: 0,
            monday: 1,
            tuesday: 2,
            wednesday: 3,
            thursday: 4,
            friday: 5,
            saturday: 6
        },
        assertElement: function (id) {
            var element = document.getElementById(id);
            if (!element) {
                JEQL.halt(
                    "Expected element with id='" + id + "'; none was found"
                );
            }
            return element;
        }
    },
    HTTP: {
        readyState: {
            done: 4
        },
        sessionStorage: {
            jaaqlKey: 'jaaql_key'
        },
        status: {
            ok: 200,
            unauthorized: 401,
            notFound: 404
        },
        requestHeader: {
            authorization: "authorization_key",
            contentType: "Content-Type",
            JSON: "application/json",
            JSON_UTF8: "application/json; charset=UTF-8",
            FORM: "application/x-www-form-urlencoded"
        }
    },
    Anatomy: {
        eventHandlers: "eventHandlers",
        logElement: "JEQL--log",
        render: "render",
        action: "action",
        exclude: "exclude"
    },
    Assertion: {
        one: 1,
        zero: 0,
        zeroOrOne: "0/1",
        oneOrMore: "1+"
    },

    settings: {
        debug: false,
        debugCall: false,
        endpoint: "http://localhost:6060/",
        fakeData: false,
        eventHandlers: [],
        iterationLimit: 100,
        indirectionGlyph: ":",
        indexOpenerGlyph: "[",
        indexCloserGlyph: "]",
        memberGlyph: ".",
        URIQueryGlyph: "?"
    },
    
    helpers: {
        encodePostBody: function(input) {
            var ret = "";
            var first = true;
            for (var key in input) {
                if (!first) { ret += "&"; }
                ret += key + "=" + encodeURIComponent(input[key]);
                first = false;
            }
            return ret;
        },
        formatFromUrl: function(newUrl) {
            var url = "";
            for (var i = 0; i < window.location.href.split("/").length - 1; i ++) {
                if (i !== 0) { url += "/"; }
                url += window.location.href.split("/")[i];
            }
            url += "/" + newUrl;
            return url;
        }
    },
    
    endpoints: {
        login: "login",
        submit: "submit"
    },

    log: function (logElement, msg) {
        if (logElement) {
            logElement.innerHTML += "<br>" + msg;
        }
        console.log(msg);
    },
    
    pages: {
        login: false,
        root: "index.html"
    },

    debug: function (args) {
        JEQL.settings.debug = true;
        JEQL.settings.fakeData = args.fakeData;
        JEQL.settings.debugCall = args.confirmCalls;
    },

    trace: function (msg) {
        var logElement = document.getElementById(JEQL.Anatomy.logElement);
        if (logElement) {
            JEQL.log(logElement, msg);
        } else if (JEQL.settings.debug) {
            console.log(msg);
        }
    },

    halt: function (msg) {
        var logElement = document.getElementById(JEQL.Anatomy.logElement);
        if (logElement) {
            logElement.innerHTML +=
            "<br><b>HALT!</b>&mdash;<em>" + msg + "<em><pre>" +
            new Error().stack + "</pre>";
        }
        console.log(new Error("HALT -- " + msg));
        throw msg;
    },

    assert: function (name, value) {
        if (!value) {
            JEQL.halt("Must specify a value for '" + name + "'!");
        }
    },

    Lib: {
        Name: "JEQL.Lib",
        isSimpleObject: function (arg) {
            return (
                Boolean(arg) &&
                typeof arg === "object" &&
                !Array.isArray(arg)
            );
        },
        tests_isSimpleObject: [
            {args: [undefined], assert: false},
            {args: [], assert: false},
            {args: [null], assert: false},
            {args: [1], assert: false},
            {args: ["Hello World"], assert: false},
            {args: [[1, 2]], assert: false},
            {args: [{}], assert: true},
            {args: [{halt: 1}], assert: true}
        ],
        plural: function (number, noun, plural, no) {
            if (number === 0 && no) {
                return no + " " + plural;
            } else {
                return number + " " + (
                    (number === 1)
                    ? noun
                    : plural
                );
            }
        },
        tests_plural: [
            {args: [0, "bean", "beans", "No"], assert: "No beans"},
            {args: [0, "bean", "beans"], assert: "0 beans"},
            {args: [1, "bean", "beans"], assert: "1 bean"},
            {args: [-1, "bean", "beans"], assert: "-1 beans"},
            {args: [2, "bean", "beans"], assert: "2 beans"},
            {args: [-2, "bean", "beans"], assert: "-2 beans"}
        ],
        isWeekday: function (n) {
            return (
                n === JEQL.DOM.days.monday
                || n === JEQL.DOM.days.tuesday
                || n === JEQL.DOM.days.wednesday
                || n === JEQL.DOM.days.thursday
                || n === JEQL.DOM.days.friday
            );
        },
        tests_isWeekday: [
            {args: [0], assert: false},
            {args: [1], assert: true},
            {args: [2], assert: true},
            {args: [3], assert: true},
            {args: [4], assert: true},
            {args: [5], assert: true},
            {args: [6], assert: false}
        ],
        perhaps: function (value, fallback) {
            return (
                (!value || value.toString() === "")
                ? fallback
                : value
            );
        }
    },

    targetCellId: function (name) {
        const nameParts = name.split(JEQL.settings.indexOpenerGlyph);
        const objectName = nameParts[0];
        const elementName = (
            (
                nameParts.length === 2 && nameParts[1].startsWith(
                    JEQL.settings.indexCloserGlyph + JEQL.settings.memberGlyph
                )
            )
            ? nameParts[1].split(JEQL.settings.memberGlyph)[1]
            : JEQL.halt(
                "A " + JEQL.name + " cell selector must contain exactly one" +
                " occurence of '" + JEQL.settings.indexOpenerGlyph +
                JEQL.settings.indexCloserGlyph + JEQL.settings.memberGlyph + "'"
            )
        );
        var currentRowNumber = 0; // Default to the first row
        var trigger = JEQL.trigger;
        var indexPart;
        var i;

        // Find out, if possible, from what row the last event was triggered
        for (i = 0; trigger && i < JEQL.settings.iterationLimit; i += 1) {
            JEQL.trace(
                "targetCellId(" + name + ", " + objectName + "): " +
                trigger.tagName + " with id '" + trigger.id + "')"
            );
            if (
                trigger.id &&
                trigger.id.includes(JEQL.settings.indexCloserGlyph) &&
                trigger.id.startsWith(
                    objectName + JEQL.settings.indexOpenerGlyph
                )
            ) {
                indexPart = trigger.id.split(JEQL.settings.indexOpenerGlyph);
                JEQL.trace("targetCellId: " + JSON.stringify(indexPart));
                currentRowNumber = parseInt(
                    indexPart[1].split(JEQL.settings.indexCloserGlyph)[0]
                );
                break;
            }
            trigger = trigger.parentElement;
        }

        return (
            objectName +
            JEQL.settings.indexOpenerGlyph +
            currentRowNumber +
            JEQL.settings.indexCloserGlyph +
            JEQL.settings.memberGlyph +
            elementName
        );
    },

    interpret: function (name) {
        const targetId = (
            name.includes(
                JEQL.settings.indexOpenerGlyph +
                JEQL.settings.indexCloserGlyph +
                JEQL.settings.memberGlyph
            )
            ? JEQL.targetCellId(name)
            : name
        );
        var target = (
            targetId
            ? document.getElementById(targetId)
            : null
        );
        var result = "";

        if (!target) {
            JEQL.halt("No element found with id '" + targetId + "'");
        }

        result = target.innerHTML;
        JEQL.trace(
            "interpret(" + name + ", " + target.id + ") = '" + result + "'"
        );
        return result;
    },

    popup: function (callArgs) {
        var cover = document.createElement("div");
        var iframe = document.createElement("iframe");

        cover.className = JEQL.Class.cover;
        iframe.className = JEQL.Class.popup;
        iframe.src = callArgs + ".html";

        cover.appendChild(iframe);
        document.body.appendChild(cover);
    },

    call: function (callArgs) {
        const keys = (
            JEQL.Lib.isSimpleObject(callArgs)
            ? Object.keys(callArgs.args)
            : []
        );
        const page = (
            (keys.length)
            ? callArgs.page
            : callArgs
        );
        var actualArgs = {};
        var i = 0;
        var target;

        if (!JEQL.settings.fakeData) {
            for (i = 0; i < keys.length; i += 1) {
                target = keys[i];
                actualArgs[target] = JEQL.interpret(callArgs.args[target]);
            }
        }

        if (JEQL.settings.debugCall) {
            target = page + "(" + JSON.stringify(actualArgs) + ")";
            if (!confirm("Target of call is '" + target + "'")) {
                JEQL.halt("Call cancelled: " + target);
            }
        }

        window.location.href = page + ".html" + (
            actualArgs.length
            ? JEQL.settings.URIQueryGlyph + encodeURIComponent(
                JSON.stringify(actualArgs)
            )
            : ""
        );
    },

    init: function () {
        if (!JEQL.pages.login || window.location.href !== JEQL.helpers.formatFromUrl(JEQL.pages.login)) {
            if (!(JEQL.HTTP.sessionStorage.jaaqlKey in window.sessionStorage)) {
                if (JEQL.pages.login) {
                    window.location.replace(JEQL.helpers.formatFromUrl(JEQL.pages.login));
                } else {
                    window.addEventListener('DOMContentLoaded', JEQL.showLoginModal, false);
                    return;
                }
            } else {
                // TODO swap this out for a login checker
                JEQL.submit({
                    "query": "SELECT version()",
                    "render": function() {},
                    "async": false
                });
            }
        }
        
        const href = window.location.href;
        const questionMark = href.indexOf(JEQL.settings.URIQueryGlyph);
        const uriData = (
            questionMark > 0
            ? href.substring(questionMark + 1)
            : ""
        );

        JEQL.trace(
            "init(" + href +
            ", " + questionMark +
            ", " + uriData +
            ")"
        );
        JEQL.args = (
            uriData
            ? JSON.parse(decodeURIComponent(uriData))
            : []
        );
    },

    clearElement: function (container) {
        JEQL.trace("clearElement(" + container + ")");
        while (container.firstChild) {
            container.removeChild(container.firstChild);
        }
    },

    table: function (container, render, object) {
        var viewport;
        var table;
        var thead;
        var tbody;
        var tr;
        var hasRowOperations = false;
        var i = 0;
        var n = 0;
        var cell = {};
        var span = {};

        JEQL.trace(
            "table(" + container +
            ", " + JSON.stringify(render) +
            ", " + JSON.stringify(object.columns) +
            ", " + JSON.stringify(object.descriptors) +
            ")"
        );

        if (render.hideWhenEmpty && object.rows.length < 1) {
            return;
        }

        // If the user requests a legend, we add it (a div above the table)
        if (render.legend) {
            cell = document.createElement("div");
            cell.className = JEQL.Class.legend;
            cell.innerHTML = render.legend;
            container.appendChild(cell);
        }

        if (render.operations) {
            n = 0;
            for (i = 0; i < render.operations.length; i += 1) {
                JEQL.trace(
                    "table: '" + JSON.stringify(render.operations[i]) + "'"
                );
                if (render.operations[i].table) {
                    n += 1;
                    if (n === 1) {
                        cell = document.createElement("div");
                        cell.className = JEQL.Class.operations;
                        container.appendChild(cell);
                    }
                    span = document.createElement("span");
                    span.className = (
                        render.operations[i].table +
                        " " +
                        JEQL.Class.button
                    );
                    cell.appendChild(span);
                    JEQL.trace(
                        "table: added table button '" +
                        render.operations[i].table + "'"
                    );
                }
            }
        }

        viewport = document.createElement("div");
        viewport.className = JEQL.Class.viewport;
        if (render.as) {
            viewport.id = render.as;
        }

        table = document.createElement("table");
        thead = document.createElement("thead");
        tbody = document.createElement("tbody");

        // If the user requests a caption, we add one
        if (render.caption) {
            cell = document.createElement("caption");
            cell.innerHTML = render.caption;
            table.appendChild(cell);
        }

        // Add the heading to the table
        tr = document.createElement("tr");

        if (!object.columns) {
            object.columns = [];
            for (i = 0; i < object.descriptors.length; i += 1) {
                object.columns[i] = object.descriptors[i].name;
            }
        }

        for (i = 0; i < object.columns.length; i += 1) {
            cell = document.createElement("th");
            cell.id = (
                table.id +
                JEQL.settings.indexOpenerGlyph +
                JEQL.settings.indexCloserGlyph
            );
            if (
                object.descriptors &&
                object.descriptors.length === object.columns.length
            ) {
                cell.innerHTML = JEQL.Lib.perhaps(
                    object.descriptors[i].heading,
                    object.descriptors[i].caption
                );
            } else {
                cell.innerHTML = object.columns[i];
            }
            tr.appendChild(cell);
        }
        if (render.operations) {
            cell = document.createElement("th");
            cell.className = JEQL.Class.operations;
            for (i = 0; i < render.operations.length; i += 1) {
                if (render.operations[i].row) {
                    hasRowOperations = true;
                    cell = document.createElement("th");
                    cell.className = JEQL.Class.operations;
                    cell.innerHTML = JEQL.DOM.nonBreakingSpace;
                    tr.appendChild(cell);
                    break;
                }
            }
        }
        thead.appendChild(tr);

        // Add the body to the table
        for (n = 0; n < object.rows.length; n += 1) {
            tr = document.createElement("tr");
            tr.id = (
                table.id +
                JEQL.settings.indexOpenerGlyph +
                n +
                JEQL.settings.indexCloserGlyph
            );
            for (i = 0; i < object.columns.length; i += 1) {
                cell = document.createElement("td");

                // Caption
                if (object.rows[n][i] !== "") {
                    span = document.createElement("span");
                    span.className = JEQL.Class.caption;
                    span.innerHTML = (
                        (
                            object.descriptors &&
                            object.descriptors.length === object.columns.length
                        )
                        ? object.descriptors[i].caption
                        : object.columns[i]
                    );
                    cell.appendChild(span);
                    tr.appendChild(cell);
                } else {
                    cell.className = JEQL.Class.empty;
                }

                // Value
                span = document.createElement("span");
                span.className = JEQL.Class.value;
                span.id = (
                    tr.id +
                    JEQL.settings.memberGlyph +
                    object.columns[i]
                );
                span.innerHTML = object.rows[n][i];
                cell.appendChild(span);
                tr.appendChild(cell);
            }
            tbody.appendChild(tr);
            if (hasRowOperations) {
                cell = document.createElement("td");
                cell.className = JEQL.Class.operations;
                for (i = 0; i < render.operations.length; i += 1) {
                    if (render.operations[i].row) {
                        span = document.createElement("span");
                        span.className = (
                            render.operations[i].row +
                            " " +
                            JEQL.Class.button
                        );
                        cell.appendChild(span);
                    }
                }
                tr.appendChild(cell);
            }
        }

        if (object.rows.length < 1) {
            tr = document.createElement("tr");
            tr.className = JEQL.Class.missing;
            cell = document.createElement("td");
            cell.colSpan = object.columns.length;
            cell.className = JEQL.Class.missing;
            tr.appendChild(cell);
            tbody.appendChild(tr);
        }

        table.appendChild(thead);
        table.appendChild(tbody);
        table.className = JEQL.Class.table;
        viewport.appendChild(table);
        container.appendChild(viewport);
    },

    grid: function (container, render, object) {
        var table;
        var tbody;
        var tr = {};
        var cell = {};
        var i = 0;
        var j = 0;
        var n = 0;
        var span;
        var viewport;
        var showRow = true;

        if (render.hideWhenEmpty && object.rows.length < 1) {
            return;
        }

        // If the user requests a legend, we add it (a div above the table)
        if (render.legend) {
            cell = document.createElement("div");
            cell.className = JEQL.Class.legend;
            cell.innerHTML = render.legend;
            container.appendChild(cell);
        }

        if (render.operations) {
            n = 0;
            for (i = 0; i < render.operations.length; i += 1) {
                if (render.operations[i].grid) {
                    n += 1;
                    if (n === 1) {
                        cell = document.createElement("div");
                        cell.className = JEQL.Class.operations;
                    }
                    span = document.createElement("span");
                    span.className = (
                        render.operations[i].grid +
                        " " +
                        JEQL.Class.button
                    );
                    cell.appendChild(span);
                }
            }
            if (n) {
                container.appendChild(cell);
            }
        }

        viewport = document.createElement("div");
        viewport.className = JEQL.Class.viewport;
        if (render.as) {
            viewport.id = render.as;
        }

        table = document.createElement("table");
        tbody = document.createElement("tbody");

        JEQL.trace(
            "grid(" + container + ", " + render.as + ", " + object + ")"
        );

        // If the user requests a caption, we add one (inside the table)
        if (render.caption) {
            cell = document.createElement("caption");
            cell.innerHTML = render.caption;
            table.appendChild(cell);
        }

        if (!object.columns) {
            object.columns = [];
            for (i = 0; i < object.descriptors.length; i += 1) {
                object.columns[i] = object.descriptors[i].name;
            }
        }

        if (object.rows.length > 0) {
            for (i = 0; i < object.columns.length; i += 1) {
                if (object.rows.length < 1 && render.hideEmptyRows) {
                    showRow = false;
                }
                if (showRow) {
                    tr = document.createElement("tr");

                    // Caption
                    cell = document.createElement("th");
                    cell.innerHTML = (
                        (
                            object.descriptors &&
                            object.descriptors.length === object.columns.length
                        )
                        ? object.descriptors[i].caption
                        : object.columns[i]
                    );
                    tr.appendChild(cell);

                    for (j = 0; j < object.rows.length; j += 1) {
                        // Content
                        cell = document.createElement("td");
                        cell.innerHTML = object.rows[j][i];
                        cell.id = (
                            table.id +
                            JEQL.settings.memberGlyph +
                            object.columns[i]
                        );
                        tr.appendChild(cell);
                    }
                    tbody.appendChild(tr);
                }
            }
        } else {
            tr = document.createElement("tr");
            tr.className = JEQL.Class.missing;
            cell = document.createElement("td");
            cell.colSpan = 2;
            cell.className = JEQL.Class.missing;
            tr.appendChild(cell);
            tbody.appendChild(tr);
        }

        table.className = JEQL.Class.grid;
        table.appendChild(tbody);
        container.appendChild(table);
    },

    fakeResponseText: function (descriptors, assertion) {
        const Fake = {
            "descriptors": [{
                "name": "lorem",
                "datatype": "number",
                "caption": "Lorem",
                "isrequired": true
            }, {
                "name": "dolor_sit_amet",
                "datatype": "date",
                "caption": "Dolor Sit Amet",
                "heading": "Dolor",
                "isrequired": true
            }, {
                "name": "adipisci",
                "datatype": "number",
                "caption": "Adipisci",
                "isrequired": true
            }, {
                "name": "ipsum",
                "datatype": "string",
                "length": "32",
                "caption": "Ipsum",
                "isrequired": false
            }, {
                "name": "ligula",
                "datatype": "string",
                "length": "20",
                "caption": "Ligula",
                "isrequired": false
            }],
            "rows": [
                [
                    17,
                    "1962-08-14",
                    2001,
                    "Aliquam interdum facilisis ligula id faucibus.",
                    "nulla"
                ],
                [
                    18,
                    "1960-09-03",
                    1984,
                    "",
                    "augue"
                ],
                [
                    88,
                    "1999-12-31",
                    2020,
                    "Similique sunt in culpa qui officia deserunt mollitia" +
                    " animi, id est laborum et dolorum fuga. Et harum quidem" +
                    " rerum facilis est et expedita distinctio. Nam libero" +
                    " tempore, cum soluta nobis est eligendi optio cumque" +
                    " nihil impedit quo minus id quod maxime placeat facere" +
                    " possimus, omnis voluptas assumenda est, omnis dolor" +
                    " repellendus. Temporibus autem quibusdam et aut officiis" +
                    " debitis aut rerum necessitatibus saepe eveniet ut et" +
                    " voluptates repudiandae sint et molestiae non" +
                    " recusandae. Itaque earum rerum hic tenetur a sapiente" +
                    " delectus, ut aut reiciendis.",
                    ""
                ],
                [
                    93,
                    "1964-11-22",
                    1976,
                    "At vero eos et accusamus et iusto odio dignissimos" +
                    " ducimus qui blanditiis praesentium voluptatum deleniti" +
                    " atque corrupti quos dolores et quas molestias excepturi" +
                    " sint occaecati cupiditate non provident.",
                    ""
                ],
                [
                    112,
                    "1932-09-13",
                    1954,
                    "Itaque earum rerum hic tenetur a sapiente delectus, ut" +
                    " aut reiciendis voluptatibus maiores alias consequatur" +
                    " aut perferendis doloribus asperiores repellat.",
                    ""
                ],
                [
                    977,
                    "2009-09-11",
                    1999,
                    "Neque porro quisquam est, qui dolorem ipsum quia dolor" +
                    " sit amet, consectetur, adipisci velit, sed quia non" +
                    " numquam eius modi tempora incidunt ut labore et dolore" +
                    " magnam aliquam quaerat voluptatem.",
                    ""
                ],
                [
                    1288,
                    "1982-05-04",
                    1989,
                    "Mauris ultricies, elit a maximus ornare, neque dui" +
                    " convallis nulla, sed rutrum orci urna ut nunc. Maecenas" +
                    " mi ligula, laoreet ut dignissim eu, porttitor at augue." +
                    " Morbi aliquet orci sit amet mi condimentum sollicitudin.",
                    ""
                ]
            ]
        };
        const rowOffset = Math.floor(Math.random() * Fake.rows.length);
        const columnOffset = Math.floor(
            Math.random() * Fake.descriptors.length
        );

        var rowCount = Math.floor(Math.random() * 58); // Age when writing!
        var columnCount = (
            JEQL.Lib.isSimpleObject(descriptors)
            ? Object.keys(descriptors).length
            : (
                (descriptors && Array.isArray(descriptors))
                ? descriptors.length
                : 0
            )
        );
        var i;
        var x; // marks the spot: here be treasure...
        var result = {};

        if (columnCount === 0) {
            columnCount = 3 + ( // 3 or more descriptors
                Math.floor(Math.random() * (Fake.descriptors.length - 3))
            );
        }
        result.descriptors = [];
        for (i = 0; i < columnCount; i += 1) {
            x = (i + columnOffset) % Fake.descriptors.length;
            result.descriptors[i] = Fake.descriptors[x];
        }

        if (assertion === JEQL.Assertion.one) {
            rowCount = 1;
        } else if (assertion === JEQL.Assertion.zero) {
            rowCount = 0;
        } else if (assertion === JEQL.Assertion.oneOrMore) {
            rowCount += 1;
        } else if (assertion === JEQL.Assertion.zeroOrOne) {
            rowCount = rowCount % 2;
        }
        result.rows = [];
        for (i = 0; i < rowCount; i += 1) {
            x = (i + rowOffset) % Fake.rows.length;
            result.rows[i] = Fake.rows[x];
        }

        return result;
    },

    fake: function (container, queries, renders, renderAsTuples, errHandlers) {
        var i = 0;

        JEQL.trace(
            "fake(" + container.tagName +
            ", " + queries.toString() +
            ", " + renders.toString() +
            ")"
        );

        for (i = 0; i < queries.length && i < renders.length; i += 1) {
            renders[i].using(
                container,
                renders[i],
                JEQL.fakeResponseText(queries.select, queries[i].assert)
            );
        }
    },
    
    showLoginModal: function () {
        if (document.getElementById("jeql__login_div")) { return; }
        var loginDiv = document.createElement("div");
        loginDiv.setAttribute("id", "jeql__login_div");
        document.body.appendChild(loginDiv);
        loginDiv.setAttribute("class", "login-modal-container");

        var sub = document.createElement("div");
        loginDiv.appendChild(sub);
        sub.setAttribute("class", "login-modal");
        
        var h1 = document.createElement("h1");
        sub.appendChild(h1);
        h1.innerHTML = "Login to Your Account";
        
        var input = document.createElement("input");
        sub.appendChild(input);
        input.setAttribute("type", "text");
        input.setAttribute("name", "jaaql_user");
        input.setAttribute("size", "10");
        input.setAttribute("id", "jaaql_user");
        input.setAttribute("placeholder", "Username");
        
        input = document.createElement("input");
        sub.appendChild(input);
        input.setAttribute("type", "password");
        input.setAttribute("name", "jaaql_pass");
        input.setAttribute("size", "10");
        input.setAttribute("id", "jaaql_pass");
        input.setAttribute("placeholder", "Password");
        
        var but = document.createElement("button");
        sub.appendChild(but);
        but.setAttribute("name", "login");
        but.innerHTML = "Login";
        but.onclick = function() {
            JEQL.login(document.getElementById("jaaql_user").value, document.getElementById("jaaql_pass").value, function(rootUrl) { window.location.reload() });
        }
        
        setTimeout(function() {
            var div = document.getElementById("jeql__login_div");
            div.style.opacity = 1.0;
        }, 200);
    },
    
    tuplesToObjects: function(response) {
        var columns = response[JEQL.Class.columns];
        var rows = response[JEQL.Class.rows];
        
        var ret = [];
        
        for (var i = 0; i < rows.length; i ++) {
            var obj = {};
            for (var i2 = 0; i2 < columns.length; i2 ++) {
                obj[columns[i2]] = rows[i][i2];
            }
            ret.push(obj);
        }

        return ret;
    },

    get: function (container, queries, renders, renderAsTuples, errHandler, runAsync = true) {
        var request = (
            window.XMLHttpRequest
            ? new XMLHttpRequest()
            : new ActiveXObject("Microsoft.XMLHTTP")
        );

        JEQL.trace(
            "get(" + container.tagName +
            ", " + JSON.stringify(queries) +
            ", " + JSON.stringify(renders) +
            ")"
        );

        request.withCredentials = false;
        request.onerror = function () {
            JEQL.halt("Request failed!");
        };
        request.onreadystatechange = function () {
            var i = 0;
            var response;
            if (request.readyState === JEQL.HTTP.readyState.done) {
                if (request.status === JEQL.HTTP.status.ok) {
                    response = JSON.parse(request.responseText);
                    for (i = 0; i < renders.length; i += 1) {
                        renders[i].using(
                            container,
                            renders[i],
                            JEQL.tuplesToObjects(response[i])
                        );
                        renderAsTuples[i].using(
                            container,
                            renderAsTuples[i],
                            response[i]
                        );
                    }
                } else if (request.status === JEQL.HTTP.status.unauthorized) {
                    if (JEQL.pages.login) {
                        window.location.replace(JEQL.helpers.formatFromUrl(JEQL.pages.login));
                    } else {
                        JEQL.showLoginModal();
                        return;
                    }
                } else {
                    errHandler(request.status, request.responseText, "Request completed but not OK: status was " +
                        request.status + ", response was '" +
                        request.responseText + "'");
                }
            }
        };

        request.open("POST", JEQL.settings.endpoint + JEQL.endpoints.submit, runAsync);
        request.setRequestHeader(
            JEQL.HTTP.requestHeader.contentType,
            JEQL.HTTP.requestHeader.JSON
        );
        request.setRequestHeader(
            JEQL.HTTP.requestHeader.authorization,
            window.sessionStorage[JEQL.HTTP.sessionStorage.jaaqlKey]
        );
        try {
            request.send(JSON.stringify(queries));
        } catch (e) {
            JEQL.halt("Failed to send request: " + e.toString());
        }
    },

    expandRender: function (arg) {
        return (
            (arg && typeof arg === "function")
            ? {"using": arg}
            : arg
        );
    },

    /**  Find the last script element in the DOM so far--which is where we
    *    were called from--and append a set of named elements to its parent
    *    which are to be populated with data retrieved from the database.
    *    If, for whatever reason, we are unable to find the last script element
    *    we'll append the set of named elements to the body of the document
    **/
    load: function (args, errorHandler = undefined) {
        const scriptElements = document.getElementsByTagName(JEQL.DOM.script);
        const lastScriptElement = (
            (scriptElements && scriptElements.length)
            ? scriptElements[scriptElements.length - 1]
            : null
        );
        const container = (
            lastScriptElement
            ? lastScriptElement.parentElement
            : document.body
        );
        const queryFunction = (
            JEQL.settings.fakeData
            ? JEQL.fake
            : JEQL.get
        );

        var queries = [];
        var renders = [];
        var renderAsTuples = [];
        var errHandlers = [];
        var defaultErrorHandler = function(status, response, message) { JEQL.halt(message); };

        var i = 0;

        JEQL.trace(
            "load(" + container.tagName +
            ", " + JSON.stringify(args) +
            ")"
        );

        if (Array.isArray(args)) {
            for (i = 0; i < args.length; i += 1) {
                queries.push(args[i].query);
                
                if (JEQL.Class.render in args[i]) {
                    renders.push(JEQL.expandRender(args[i].render));
                } else if (JEQL.Class.renderAsObjects in args[i]) {
                    renders.push(JEQL.expandRender(args[i].renderAsObjects));
                } else {
                    renders.push(JEQL.expandRender(function() {  }));
                }
                if (JEQL.Class.renderAsTuples in args[i]) {
                    renderAsTuples.push(JEQL.expandRender(args[i].renderAsTuples));
                } else {
                    renderAsTuples.push(JEQL.expandRender(function() {  }));
                }
            }
        } else {
            queries.push(args.query);
            if (JEQL.Class.render in args) {
                renders.push(JEQL.expandRender(args.render));
            } else if (JEQL.Class.renderAsObjects in args) {
                renders.push(JEQL.expandRender(args.renderAsObjects));
            } else {
                renders.push(JEQL.expandRender(function() {  }));
            }
            if (JEQL.Class.renderAsTuples in args) {
                renderAsTuples.push(JEQL.expandRender(args.renderAsTuples));
            } else {
                renderAsTuples.push(JEQL.expandRender(function() {  }));
            }
            if (JEQL.Class.error in args) {
                errorHandler = args.error;
            }
        }
        
        if (errorHandler === undefined) {
            errorHandler = defaultErrorHandler;
        }
        
        queryFunction(container, queries, renders, renderAsTuples, errorHandler);
    },

    handleEvent: function (e) {
        var i = 0;
        var eventHandler;

        JEQL.trace("handleEvent(" + e.type + ", " + e.srcElement + ")");
        for (i = 0; i < JEQL.settings.eventHandlers.length; i += 1) {
            eventHandler = JEQL.settings.eventHandlers[i];
            if (
                e.type === eventHandler.eventType &&
                e.srcElement.matches(eventHandler.selector)
            ) {
                JEQL.trigger = e.srcElement;
                eventHandler.action(e);
                break;
            }
        }
    },

    on: function (args) {
        const keys = Object.keys(args);
        var eventType;
        var i = 0;
        var found = false;

        JEQL.trace("on(" + JSON.stringify(args) + ")");

        if (!args.action) {
            JEQL.halt("No 'action' found in arguments to 'JEQL.on()'");
        }

        // Get the event name from the args object
        for (i = 0; i < keys.length; i += 1) {
            if (
                keys[i] !== JEQL.Anatomy.action &&
                keys[i] !== JEQL.Anatomy.exclude
            ) {
                if (eventType) {
                    JEQL.halt(
                        "Second event name '" + keys[i] + "' found in" +
                        " arguments to 'JEQL.on()' after finding '" +
                        eventType + "'"
                    );
                }
                eventType = keys[i];
            }
        }
        if (!eventType) {
            JEQL.halt("No event name found in arguments to 'JEQL.on()'");
        }

        // Find out whether or not we have registered a listener for that
        // event. If not, add one.
        for (i = 0; i < JEQL.settings.eventHandlers.length; i += 1) {
            if (JEQL.settings.eventHandlers[i].eventType) {
                found = true;
                break;
            }
        }
        if (!found) {
            document.addEventListener(
                eventType,
                function (e) {
                    JEQL.handleEvent(e);
                },
                false
            );
        }

        // Put the requested event name, action and selector into the list of
        // handlers which might match an incoming event
        JEQL.settings.eventHandlers.unshift({ // Insert at the beginning
            "eventType": eventType,
            "selector": args[eventType],
            "action": args.action
        });
    },
    
    submit: function (args, errorHandler = undefined) {
        const scriptElements = document.getElementsByTagName(JEQL.DOM.script);
        const lastScriptElement = (
            (scriptElements && scriptElements.length)
            ? scriptElements[scriptElements.length - 1]
            : null
        );
        const container = (
            lastScriptElement
            ? lastScriptElement.parentElement
            : document.body
        );

        const queryFunction = (
            JEQL.settings.fakeData
            ? JEQL.fake
            : JEQL.get
        );
        var queries = [];
        var renders = [];
        var renderAsTuples = [];
        var i = 0;
        
        var defaultErrorHandler = function(status, response, message) { JEQL.halt(message); };

        JEQL.trace(
            "submit(" + container.tagName +
            ", " + JSON.stringify(args) +
            ")"
        );
        var runAsync = true;
        if (Array.isArray(args)) {
            for (i = 0; i < args.length; i += 1) {
                var subDict = {};
                subDict[JEQL.Class.query] = args[i].query;
                if (JEQL.Class.echo in args[i]) {
                    subDict[JEQL.Class.echo] = args[i].echo;
                }
                if (JEQL.Class.parameters in args[i]) {
                    subDict[JEQL.Class.parameters] = args[i].parameters;
                }
                queries.push(subDict);

                if (JEQL.Class.render in args[i]) {
                    renders.push(JEQL.expandRender(args[i].render));
                } else if (JEQL.Class.renderAsObjects in args[i]) {
                    renders.push(JEQL.expandRender(args[i].renderAsObjects));
                } else {
                    renders.push(JEQL.expandRender(function() {  }));
                }
                if (JEQL.Class.renderAsTuples in args[i]) {
                    renderAsTuples.push(JEQL.expandRender(args[i].renderAsTuples));
                } else {
                    renderAsTuples.push(JEQL.expandRender(function() {  }));
                }
            }
        } else {
            var subDict = {};
            subDict[JEQL.Class.query] = args.query;
            if (JEQL.Class.echo in args) {
                subDict[JEQL.Class.echo] = args.echo;
            }
            if (JEQL.Class.parameters in args) {
                subDict[JEQL.Class.parameters] = args.parameters;
            }
            if (JEQL.Class.error in args) {
                errorHandler = args.error;
            }
            queries.push(subDict);
            
            if (JEQL.Class.render in args) {
                renders.push(JEQL.expandRender(args.render));
            } else if (JEQL.Class.renderAsObjects in args) {
                renders.push(JEQL.expandRender(args.renderAsObjects));
            } else {
                renders.push(JEQL.expandRender(function() {  }));
            }
            if (JEQL.Class.renderAsTuples in args) {
                renderAsTuples.push(JEQL.expandRender(args.renderAsTuples));
            } else {
                renderAsTuples.push(JEQL.expandRender(function() {  }));
            }

            if ('async' in args) {
                runAsync = args.async;
            }
        }
        
        if (errorHandler === undefined) {
            errorHandler = defaultErrorHandler;
        }

        queryFunction(container, queries, renders, renderAsTuples, errorHandler, runAsync);
    },
    
    login: function (username, password, callback = window.location.replace) {
        var request = (
            window.XMLHttpRequest
            ? new XMLHttpRequest()
            : new ActiveXObject("Microsoft.XMLHTTP")
        );

        JEQL.trace(
            "login(" + username + ", ...)"
        );

        request.withCredentials = false;
        request.onerror = function () {
            if (this.status === 401) {
                alert("Incorrect Credentials!"); // TODO spice me up!
            } else {
                alert("Could not login: " + request.responseText);
            }
            JEQL.halt("Request failed!");
        };
        request.onreadystatechange = function () {
            var i = 0;
            var response;
            if (request.readyState === JEQL.HTTP.readyState.done) {
                if (request.status === JEQL.HTTP.status.ok) {
                    window.sessionStorage[JEQL.HTTP.sessionStorage.jaaqlKey] = request.responseText;
                    callback(JEQL.helpers.formatFromUrl(JEQL.pages.root));
                } else {
                    JEQL.halt(
                        "Request completed but not OK: status was " +
                        request.status + ", response was '" +
                        request.responseText + "'"
                    );
                }
            }
        }
        
        request.open("POST", JEQL.settings.endpoint + JEQL.endpoints.login, false);
        request.setRequestHeader(
            JEQL.HTTP.requestHeader.contentType,
            JEQL.HTTP.requestHeader.FORM
        );
        try {
            request.send(JEQL.helpers.encodePostBody({"username": username, "password": password}));
        } catch (e) {
            JEQL.halt("Failed to send request: " + e.toString());
        }
    }
};
JEQL.init();