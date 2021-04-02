function setTestResult(id, response) {
	document.getElementById(id).innerHTML = JSON.stringify(response, null, 4);
	hljs.highlightAll();
}

function runJEQL() {
	var tests = document.getElementsByClassName("jeql-test");
	for (var i = 0; i < tests.length; i ++) {
		var code = tests[i].getElementsByTagName("code")[0].innerText;
		eval(code);
	}
}

window.addEventListener("load", function(event) {
    runJEQL();
}, false);