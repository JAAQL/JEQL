function setTestResult(id, response) {
	document.getElementById(id).innerHTML = JSON.stringify(response, null, 4);
	hljs.highlightAll();
}

function runJEQL() {
	var tests = document.getElementsByClassName("jeql-test");
	var testList = document.getElementById("test-contents");
	for (var i = 0; i < tests.length; i ++) {
		var code = tests[i].getElementsByTagName("code")[0].innerText;
		
		var li = document.createElement("li");
		testList.appendChild(li);
		
		var a = document.createElement("a");
		li.appendChild(a);
		var h2 = tests[i].getElementsByTagName("h2")[0];
		h2.setAttribute("id", "jeql-test-title-" + i);
		a.innerHTML = h2.innerText;
		a.href = "#jeql-test-title-" + i;
		
		eval(code);
	}
}

window.addEventListener("load", function(event) {
    runJEQL();
}, false);