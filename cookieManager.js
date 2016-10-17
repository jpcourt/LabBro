function bake_cookie(name, value) {
	document.cookie = name + "=" + btoa(JSON.stringify(value));
}

function read_cookie(name) {
	//console.log("restoring "+name);
	var result = document.cookie.match(new RegExp(name + '=([^;]+)'));
	//console.log("Result of cookie loading :");
	var cleanResult = JSON.parse(atob(result[1]));
	//console.log(cleanResult);
	return cleanResult;
}