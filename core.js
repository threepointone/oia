"use strict";

exports.truthy = truthy;
exports.falsey = falsey;
exports.not = not;
exports.equals = equals;
exports.eq = eq;
exports.neq = neq;
exports.add = add;
exports.sub = sub;
exports.mul = mul;
exports.div = div;
exports.mod = mod;
exports.lt = lt;
exports.gt = gt;
exports.leq = leq;
exports.geq = geq;
exports.prn = prn;
exports.str = str;
exports.list = list;
exports.hash_map = hash_map;
exports.set = set;
exports.keyword = keyword;
exports.struct = struct;
exports.inc = inc;
exports.dec = dec;
exports.first = first;
exports.rest = rest;
exports.get = get;
var List = require('immutable').List;
var Map = require('immutable').Map;
var Set = require('immutable').Set;
var is = require('immutable').is;



var transducers = require("transducers.js");

// attach transformer protocol to immutable lists.
List.prototype[transducers.protocols.transformer] = {
  init: function () {
    return List().asMutable();
  },
  result: function (list) {
    return list.asImmutable();
  },
  step: function (list, x) {
    return list.push(x);
  }
};
// and to maps
// todo

var has = {}.hasOwnProperty;

function extend(dest, src) {
  for (var key in src) {
    if (has.call(src, key)) {
      dest[key] = src[key];
    }
  }
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
  return is.apply(null, arguments);
}

function eq() {
  return equals.apply(null, arguments);
}

function neq() {
  return !equals.apply(null, arguments);
}

function add() {
  var res = 0;
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
  var res = 1;
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
  return String.prototype.concat.apply("", arguments);
}

function list() {
  return List(arguments);
}

function hash_map() {
  var arr = [];
  for (var i = 0, j = arguments.length; i < j; i += 2) {
    arr.push([arguments[i], arguments[i + 1]]);
  }
  return Map(arr);
}

function set() {
  return Set(arguments);
}

var _keywords_ = {};

function keyword(str) {
  if (!_keywords_[str]) {
    _keywords_[str] = function (o) {
      return !o ? _keywords_[str] : (o.get ? o.get(_keywords_[str]) : o[str]);
    };

    extend(_keywords_[str], {
      toString: function () {
        return str;
      },
      isKeyword: true,
      inspect: function () {
        return ":" + str;
      }
    });
  }
  return _keywords_[str];
}



// transducers? capital idea.

extend(exports, transducers);

function struct() {
  return require("immstruct").apply(null, arguments);
}

function inc(x) {
  return x + 1;
}

function dec(x) {
  return x - 1;
}

function first(x) {
  return x.first ? x.first() : x[0];
}

var slice = [].slice;
function rest(x) {
  return x.rest ? x.rest() : slice.call(x, 1);
}

function get(v, k) {
  return v.get ? v.get(k) : v[k.isKeyword ? k.toString() : k];
}
