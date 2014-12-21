// support for :keywords 



var keys = {};

function keyword(str) {
	if (!keys[str]) {
		keys[str] = function(o) {
			return o.get(keys[str]);
		}
		keys[str].toString = function() {
			return ':keyword ' + str
		}
	}
	return keys[str];
}
