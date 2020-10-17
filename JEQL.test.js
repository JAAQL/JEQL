/*jslint
    browser, fudge, for, devel
*/
/*global
    JEQL
*/
/*property
    Name, apply, args, assert, doesTestPass, findAndRunTests, halt, isArray,
    keys, length, log, name, runTests, substring, test, testWithTrace, toString
*/
JEQL.doesTestPass = function (fn, test, n, verbose) {
    var result = fn.apply(fn, test.args);
    var status = (
        (result === undefined && test.assert === undefined)
        || (result === null && test.assert === null)
        || (result === true && test.assert === true)
        || (result === false && test.assert === false)
        || (result && result.isArray === false && result === test.assert)
        || (
            result && test.assert &&
            result.toString() === test.assert.toString()
        )
    );
    if (verbose || !status) {
        JEQL.trace(
            "---- Result of unit test " + n + " on '" + fn.name +
            "(" + test.args + ")'" + " was '" + result + "'"
        );
    }
    if (!status) {
        JEQL.trace("------ Failed! Expected '" + test.assert + "'");
    }
    return status;
};

JEQL.runTests = function (fn, tests, verbose) {
    var failed = false;
    var i = 0;

    for (i = 0; i < tests.length; i += 1) {
        if (!JEQL.doesTestPass(fn, tests[i], i + 1, verbose)) {
            failed = true;
        }
    }
    return !failed;
};

JEQL.findAndRunTests = function (library, verbose) {
    const Prefix = "tests_";
    var failed = false;
    var i = 0;
    var arrayName = "";
    var functionName = "";
    var fn = {};
    var tests = [];

    for (i = 0; i < Object.keys(library).length; i += 1) {
        arrayName = Object.keys(library)[i];
        if (arrayName.substring(0, Prefix.length) === Prefix) {
            functionName = arrayName.substring(Prefix.length, arrayName.length);
            fn = library[functionName];
            tests = library[arrayName];
            if (verbose) {
                JEQL.trace(
                    "-- Running " + tests.length + " test(s) on '" +
                    library.Name + "." + functionName + "'..."
                );
            }
            if (!JEQL.runTests(fn, tests, verbose)) {
                failed = true;
            }
        }
    }
    return !failed;
};

JEQL.test = function (library, verbose) {
    if (!library) {
        JEQL.halt("Must pass a library to test");
    }
    if (verbose) {
        JEQL.trace("Running test(s) on '" + library.Name + "'...");
    }
    if (!JEQL.findAndRunTests(library, verbose)) {
        JEQL.halt("Unit tests for '" + library.Name + "' failed.");
    } else {
        JEQL.trace("No tests for '" + library.Name + "' failed.");
    }
};

JEQL.testWithTrace = function (arg) {
    JEQL.test(arg, true);
};

JEQL.testJAAQL = function (arg, renderFunction) {
    JEQL.load({
        query:{ query: {
            select: "*",
            from: "pg_database",
            "order by": "1, 2, 3"
        }},
        render: renderFunction
    });
};
