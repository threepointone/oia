// all dem functions

//boolean

var truthy  = module.exports.truthy = function () {
	return x === false || x == null ? false : true;
}

var falsey = module.exports.falsey = function (){
	return !truthy(x);
}

var not  = module.exports.not = function () {
	return !truthy(x);
}

var equals = module.exports.equals =  function () {
	return require('immutable').is.apply(null, arguments);
}

var eq = module.exports.eq =  function () {
	return equals.apply(null, arguments);
}

var neq = module.exports.neq =  function () {
	return !equals.apply(null, arguments);
}

// arithmetic

var add = module.exports.add =  function () {
	var res = 0.0;
	for (var i = 0; i < arguments.length; i++) {
		res += arguments[i];
	}
	return res;
}

var sub = module.exports.sub =  function () {
	var res = arguments[0];
	for (var i = 1; i < arguments.length; i++) {
		res -= arguments[i];
	}
	return res;
}

var mul = module.exports.mul =  function () {
	var res = 1.0;
	for (var i = 0; i < arguments.length; i++) {
		res *= arguments[i];
	}
	return res;
}

var div = module.exports.div =  function () {
	var res = arguments[0];
	for (var i = 1; i < arguments.length; i++) {
		res /= arguments[i];
	}
	return res;
}

var mod = module.exports.mod = function () {
	return a % b;
}

// comparisons

var lt = module.exports.lt =  function () {
	var res = true;
	for (var i = 0; i < arguments.length - 1; i++) {
		res = res && arguments[i] < arguments[i + 1];
		if (!res) break;
	}
	return res;
}

var gt = module.exports.gt =  function () {
	var res = true;
	for (var i = 0; i < arguments.length - 1; i++) {
		res = res && arguments[i] > arguments[i + 1];
		if (!res) break;
	}
	return res;
}

var leq = module.exports.leq =  function () {
	var res = true;
	for (var i = 0; i < arguments.length - 1; i++) {
		res = res && arguments[i] <= arguments[i + 1];
		if (!res) break;
	}
	return res;
}

var geq = module.exports.geq =  function () {
	var res = true;
	for (var i = 0; i < arguments.length - 1; i++) {
		res = res && arguments[i] >= arguments[i + 1];
	}
	return res;
}

// debug

var prn = module.exports.prn =  function () {
	console.log.apply(console, arguments);
}

// string concatenation
var str = module.exports.str =  function () {
	return String.prototype.concat.apply('', arguments);
}

// data structures

var list = module.exports.list = function (){
	return require('immutable').List(arguments);	
}

var hash_map = module.exports.hash_map = function hash_map(){
	return require('immutable').Map.apply(null, arguments);
}
