// all dem functions

// assumption is somone else will bring in their flavor of functional programming. 
// either via macros, or library (underscore, lodash, etc)
// assume there'll be a way for (require) to load up some keys onto the scope 

// keep this to the bare minimum
// primitives 
// data structures
// arithmetic 
// conditionals
// comparisons

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

var core = module.exports = {
	__extend__: extend,
	__copy__: copy,
	// from ki. thanks, @lantiga.
	truthy: function(x) {
		return x === false || x == null ? false : true;
	},
	falsey: function(x) {
		return !core.truthy(x);
	},
	not: function(x) {
		return !core.truthy(x);
	},
	equals: function(){
		var is = require('immutable').is;
		return is.apply(null, arguments);
	},
	eq: function() {
		return core.equals.apply(null, arguments);
	},
	neq: function() {
		return !core.equals.apply(null, arguments);
	},
	add: function() {
		var res = 0.0;
		for (var i = 0; i < arguments.length; i++) {
			res += arguments[i];
		}
		return res;
	},
	sub: function() {
		var res = arguments[0];
		for (var i = 1; i < arguments.length; i++) {
			res -= arguments[i];
		}
		return res;
	},
	mul: function() {
		var res = 1.0;
		for (var i = 0; i < arguments.length; i++) {
			res *= arguments[i];
		}
		return res;
	},
	div: function() {
		var res = arguments[0];
		for (var i = 1; i < arguments.length; i++) {
			res /= arguments[i];
		}
		return res;
	},
	mod: function(a, b) {
		return a % b;
	},
	lt: function() {
		var res = true;
		for (var i = 0; i < arguments.length - 1; i++) {
			res = res && arguments[i] < arguments[i + 1];
			if (!res) break;
		}
		return res;
	},
	gt: function() {
		var res = true;
		for (var i = 0; i < arguments.length - 1; i++) {
			res = res && arguments[i] > arguments[i + 1];
			if (!res) break;
		}
		return res;
	},
	leq: function() {
		var res = true;
		for (var i = 0; i < arguments.length - 1; i++) {
			res = res && arguments[i] <= arguments[i + 1];
			if (!res) break;
		}
		return res;
	},
	geq: function() {
		var res = true;
		for (var i = 0; i < arguments.length - 1; i++) {
			res = res && arguments[i] >= arguments[i + 1];
		}
		return res;
	},
	prn: function() {
		console.log.apply(console, arguments);
	},
	str: function() {
		return String.prototype.concat.apply('', arguments);
	},
	// we try to pass tests
	inc: function(x){
		return x + 1;
	},
	keyword: function(str){
		return ':' + str;
	}
};