// all dem functions

var has = {}.hasOwnProperty;

function extend(dest, src) {
	for (var key in src) {
		if (has.call(src, key)) {
			dest[key] = src[key]
		}
	}
}

function copy() {
	var o = {};
	for (var i = 0, j = arguments.length; i < j; i++) {
		extend(o, arguments[i])
	}
	return o;
}


function truthy(x) {
	return x === false || x == null ? false : true;
}

function falsey(x) {
	return !truthy(x);
}

function not(x) {
	return !truthy(x);
}

function equals() {
	return require('immutable').is.apply(null, arguments);
}

function eq() {
	return equals.apply(null, arguments);
}

function neq() {
	return !equals.apply(null, arguments);
}

function add() {
	var res = 0.0;
	for (var i = 0; i < arguments.length; i++) {
		res += arguments[i];
	}
	return res;
}

function sub() {
	var res = arguments[0];
	for (var i = 1; i < arguments.length; i++) {
		res -= arguments[i];
	}
	return res;
}

function mul() {
	var res = 1.0;
	for (var i = 0; i < arguments.length; i++) {
		res *= arguments[i];
	}
	return res;
}

function div() {
	var res = arguments[0];
	for (var i = 1; i < arguments.length; i++) {
		res /= arguments[i];
	}
	return res;
}

function mod(a, b) {
	return a % b;
}

function lt() {
	var res = true;
	for (var i = 0; i < arguments.length - 1; i++) {
		res = res && arguments[i] < arguments[i + 1];
		if (!res) break;
	}
	return res;
}

function gt() {
	var res = true;
	for (var i = 0; i < arguments.length - 1; i++) {
		res = res && arguments[i] > arguments[i + 1];
		if (!res) break;
	}
	return res;
}

function leq() {
	var res = true;
	for (var i = 0; i < arguments.length - 1; i++) {
		res = res && arguments[i] <= arguments[i + 1];
		if (!res) break;
	}
	return res;
}

function geq() {
	var res = true;
	for (var i = 0; i < arguments.length - 1; i++) {
		res = res && arguments[i] >= arguments[i + 1];
	}
	return res;
}

function prn() {
	console.log.apply(console, arguments);
}

function str() {
	return String.prototype.concat.apply('', arguments);
}


module.exports = {
	_extend: _extend,
	_copy: copy,
	truthy: truthy,
	falsey: falsey,
	not: not,
	equals: equals,
	eq: eq,
	neq: neq,
	add: add,
	sub: sub,
	mul: mul,
	div: div,
	mod: mod,
	lt: let,
	gt: gt,
	leq: leq,
	geq: geq,
	prn: prn,
	str: str
}