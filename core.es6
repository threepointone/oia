// all dem functions

//boolean

import {List, Map, Set, is} from 'immutable';


var transducers = require('transducers.js');

// attach transformer protocol to immutable lists. 
List.prototype[transducers.protocols.transformer] = {
  init: function() {
    return List().asMutable();
  },
  result: function(list) {
    return list.asImmutable();
  },
  step: function(list, x) {
    return list.push(x);
  }
};
// and to maps
// todo

var has = {}.hasOwnProperty;

function extend(dest, src) {
	for (var key in src) {
		if (has.call(src, key)) {
			dest[key] = src[key]
		}
	}
}


export function truthy(x) {
	return x === false || x == null ? false : true;
}

export function falsey(x) {
	return !truthy(x);
}

export function not(x) {
	return !truthy(x);
}

export function equals() {
	return is.apply(null, arguments);
}

export function eq() {
	return equals.apply(null, arguments);
}

export function neq() {
	return !equals.apply(null, arguments);
}

// arithmetic
export function add() {
	var res = 0.0;
	for (var i = 0; i < arguments.length; i++) {
		res += arguments[i];
	}
	return res;
}

export function sub() {
	var res = arguments[0];
	for (var i = 1; i < arguments.length; i++) {
		res -= arguments[i];
	}
	return res;
}

export function mul() {
	var res = 1.0;
	for (var i = 0; i < arguments.length; i++) {
		res *= arguments[i];
	}
	return res;
}

export function div() {
	var res = arguments[0];
	for (var i = 1; i < arguments.length; i++) {
		res /= arguments[i];
	}
	return res;
}
export function mod(a, b) {
	return a % b;
}

// comparisons
export function lt() {
	var res = true;
	for (var i = 0; i < arguments.length - 1; i++) {
		res = res && arguments[i] < arguments[i + 1];
		if (!res) break;
	}
	return res;
}

export function gt() {
	var res = true;
	for (var i = 0; i < arguments.length - 1; i++) {
		res = res && arguments[i] > arguments[i + 1];
		if (!res) break;
	}
	return res;
}

export function leq() {
	var res = true;
	for (var i = 0; i < arguments.length - 1; i++) {
		res = res && arguments[i] <= arguments[i + 1];
		if (!res) break;
	}
	return res;
}

export function geq() {
	var res = true;
	for (var i = 0; i < arguments.length - 1; i++) {
		res = res && arguments[i] >= arguments[i + 1];
	}
	return res;
}

// debug


export function prn() {
	console.log.apply(console, arguments);
}

// string concatenation
export function str() {
	return String.prototype.concat.apply('', arguments);
}

// data structures

export function list() {
	return List(arguments);
}

export function hash_map() {
	var arr = [];
	for (var i = 0, j = arguments.length; i < j; i += 2) {
		arr.push([arguments[i], arguments[i + 1]])
	}
	return Map(arr);
}

export function set(){
	return Set(arguments);
}

var _keywords_ = {};

export function keyword(str) {
	if (!_keywords_[str]) {
		
		_keywords_[str] = o => !o ? _keywords_[str] : (o.get ? o.get(_keywords_[str]) : o[str])
		
		extend(_keywords_[str], {
			toString : () => str,
			isKeyword : true,
			inspect: () => ':' + str
		});		
	}
	return _keywords_[str];
}





// transducers? capital idea.

extend(exports, transducers);

export function struct(){
	return require('immstruct').apply(null, arguments);
}

// some common stuff

export function inc(x){
	return x + 1;
}

export function dec(x){
	return x - 1;
}

export function first(x){
	return x.first? x.first(): x[0];
}

var slice = [].slice;
export function rest(x){
	return x.rest? x.rest() : slice.call(x, 1);
}

export function get(v, k){
	return v.get? v.get(k) : v[k.isKeyword? k.toString(): k];
}
