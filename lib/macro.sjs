macro _arr {
  rule { () } => {
  }

  rule { ($arg) } => {
    _sexpr $arg
  }

  rule { ($arg $args ...) } => {
    _sexpr $arg, _arr ($args ...)
  }
}

macro _obj {
  rule { () } => {
  }
  
  rule { ((keyword $k) $v) } => {
    _sexpr $k: _sexpr $v
  }

  rule { ((keyword $k) $v $args ...) } => {
    _sexpr $k: _sexpr $v, _obj ($args ...)
  }

  rule { ($k $v) } => {
    _sexpr $k: _sexpr $v
  }

  rule { ($k $v $args ...) } => {
    _sexpr $k: _sexpr $v, _obj ($args ...)
  }
}

macro _args {
  rule { () } => {
  }

  rule { ($arg) } => {
    _sexpr $arg
  }

  rule { ($arg $args ...) } => {
    _sexpr $arg, _args ($args ...)
  }
}

macro _x {
  case { $ctx null } => {
    throwSyntaxError('oi','<null> is not a valid literal, use nil',#{$ctx})
  }
  case { $ctx undefined } => {
    throwSyntaxError('oi','<undefined> is not a valid literal, use nil',#{$ctx})
  }
  case { _ nil } => {
    return #{null}
  }
  case { _ $x} => {
    return #{$x}
  }
}

// macro _ns {
//   case { _ $ns $sexprs ... } => {
//     var nsname = unwrapSyntax(#{$ns});
//     letstx $nsname = [makeValue(nsname,#{$ns})];
//     return #{
//       (function () {
//         _oi.init(this,$nsname);
//         _return_sexprs ($sexprs ...);
//       }())
//     }
//   }
// }


macro _count {
  case { $m ($x(,) ...) } => {
    var n = #{$x ...}.length;
    //@pi todo - .size?
    letstx $n = [makeValue(n,#{$m})];
    return #{$n};
  }
}

macro _fnmap {
  rule { ([$args ...] $sexprs ...), $rest(,)... } => {
    _count ($args(,)...): _sexpr (fn [$args ...] $sexprs ...), _fnmap $rest(,)...
  }
  rule { ([$args ...] $sexprs ...) } => {
    _count ($args(,)...): _sexpr (fn [$args ...] $sexprs ...)
  }
}

macro _destr { 
  rule { ([$ $a], $v) } => {
    var f = $v[0];
    _destr($a, f)
  }
  rule { ([$ $a $b ...], $v) } => {
    var f = $v[0];
    _destr($a, f)
    var r = $v.slice(1);
    _destr([$ $b ...], r)
  }

  rule { ({$ $a $b}, $v) } => {
    var f = $v[$b];
    _destr($a, f)
  }
  rule { ({$ $a $b $c $d ...}, $v) } => {
    var f = $v[$b];
    _destr($a, f)
    _destr({$ $c $d ...}, $v)
  }

  rule { ([$a], $v) } => {
    var f = _sexpr(first $v);
    _destr($a, f)
  }
  rule { ([$a $b ...], $v) } => {
    var f = _sexpr(first $v);
    _destr($a, f)
    var r = _sexpr(rest $v)
    _destr([$b ...], r)
  }

  rule { ({$a $b}, $v) } => {
    var f = _sexpr(get $v $b);
    _destr($a, f)
  }
  rule { ({$a $b $c $d ...}, $v) } => {
    var f = _sexpr(get $v $b);
    _destr($a, f)
    _destr({$c $d ...}, $v)
  }

  rule { ($a, $v) } => {
    var $a = $v;
  }
}

macro _let {
  rule { ([$k $v $rest ...] $sexprs ...) } => {
    return (function (v) {
      _destr($k, v)
      _let ([$rest ...] $sexprs ...)
    }.call(this,_sexpr $v));
  }
  rule { ([] $sexprs ...) } => {
    _return_sexprs ($sexprs ...)
  }
}

macro _lets {
  rule { ([$k $rest ...] $src $sexprs ...) } => {
    return (function(v){
      var $k = v.$k;
      _lets ([$rest ...] v $sexprs ...)
    }.call(this, _sexpr $src))
    
  }
  rule { ([] $src $sexprs ...) } => {
    _return_sexprs ($sexprs ...)
  }
}

macro _letc {
  rule { ([[$ks ...] ($fn ...)] $sexprs ...) } => {
    _sexpr ($fn ... (fn [$ks ...] $sexprs ... nil))
  }
  rule { ([$k ($fn ...)] $sexprs ...) } => {
    _sexpr ($fn ... (fn [$k] $sexprs ... nil))
  }
  rule { ([[$ks ...] ($fn ...) $rest ...] $sexprs ...) } => {
    _sexpr ($fn ... (fn [$ks ...] 
                     (letc [$rest ...] $sexprs ...) nil))
  }
  rule { ([$k ($fn ...) $rest ...] $sexprs ...) } => {
    _sexpr ($fn ... (fn [$k] 
                     (letc [$rest ...] $sexprs ...) nil))
  }
}

macro _loop_let {
  rule { ([$k $v $rest ...] $i $vals $sexprs ...) } => {
    return (function (v) {
      _destr($k, v)
      _loop_let ([$rest ...] ($i+1) $vals $sexprs ...)
    }($vals === undefined ? _sexpr $v : $vals[$i]));
  }
  rule { ([] $i $vals $sexprs ...) } => {
    _return_sexprs ($sexprs ...)
  }
}

macro _chain {
  rule { (($method $args ...)) } => {
    . _sexpr $method (_args ($args ...))
  }
  rule { ($property) } => {
    . _sexpr $property
  }
  rule { (($method $args ...) $rest ...) } => {
    . _sexpr $method (_args ($args ...)) _chain ($rest ...)
  }
  rule { ($property $rest ...) } => {
    . _sexpr $property _chain ($rest ...)
  }
}

macro _doto {
  rule { ($obj ($method $args ...)) } => {
    $obj.$method(_args ($args ...));
  }
  rule { ($obj ($method $args ...) $rest ...) } => {
    $obj.$method(_args ($args ...));
    _doto ($obj $rest ...)
  }
}


macro _sexpr {

  rule { () } => { 
  }
  
  /*__macros__*/

  rule { (js $body ...) } => {
    $body ...
  }


  rule { (fn $name:ident [$args ...] $sexprs ...) } => {
    function $name($args(,)...) {
      _return_sexprs ($sexprs ...)
    }
  }

  rule { (fn [$args ...] $sexprs ...) } => {
    function ($args(,)...) {
      _return_sexprs ($sexprs ...)
    }
  }

  rule { (fnth $name:ident [$args ...] $sexprs ...) } => {
    function $name($args(,)...) {
      _return_sexprs ($sexprs ...)
    }.bind(this)
  }

  rule { (fnth [$args ...] $sexprs ...) } => {
    function ($args(,)...) {
      _return_sexprs ($sexprs ...)
    }.bind(this)
  }

  rule { (fn $name:ident $sexprs ...) } => {
    function $name() {
      var fnmap = {_fnmap $sexprs(,) ...};
      var max_arity = 0;
      for (var a in fnmap) {
        max_arity = a > max_arity ? a : max_arity;
      }
      fnmap[null] = fnmap[max_arity];
      var f = fnmap[arguments.length] || fnmap[null];
      return f.apply(this,arguments);
    }
  }

  rule { (fn $sexprs ...) } => {
    (function () {
      var fnmap = {_fnmap $sexprs(,) ...};
      var max_arity = 0;
      for (var a in fnmap) {
        max_arity = a > max_arity ? a : max_arity;
      }
      fnmap[null] = fnmap[max_arity];
      return function () {
        var f = fnmap[arguments.length] || fnmap[null];
        return f.apply(this,arguments);
      }
    }.call(this))
  }

  rule { (if $cond $sthen $selse) } => {
    (function () {
      if (_sexpr (truthy $cond)) {
        return _sexpr $sthen;
      }
      return _sexpr $selse;
    }.call(this))
  }

  rule { (if_not $cond $sthen $selse) } => {
    _sexpr (if (not $cond) $sthen $selse)
  }

  rule { (when $cond $sthen) } => {
    (function () {
      if (_sexpr (truthy $cond)) {
        return _sexpr $sthen;
      }
      return;
    }.call(this))
  }

  rule { (when_not $cond $sthen) } => {
    _sexpr (when (not $cond) $sthen)
  }

  rule { (cond $cond1 $body1 $rest ...) } => {
    (function () {
      if (_sexpr (truthy $cond1)) {
        return _sexpr $body1;
      }
      return _sexpr (cond $rest ...);
    }.call(this))
  }
  rule { (cond) } => {
    undefined
  }

  rule { (and $sexpr) } => {
    _sexpr (truthy $sexpr)
  }
  rule { (and $sexpr $sexprs ...) } => {
    _sexpr (truthy $sexpr) && _sexpr (and $sexprs ...)
  }

  rule { (or $sexpr) } => {
    _sexpr (truthy $sexpr)
  }
  rule { (or $sexpr $sexprs ...) } => {
    _sexpr (truthy $sexpr) || _sexpr (or $sexprs ...)
  }

  rule { ($[let] [$bindings ...] $sexprs ...) } => {
    (function () {
      _let ([$bindings ...] $sexprs ...)
    }.call(this))
  }

  rule { (letc [$bindings ...] $sexprs ...) } => {
    _letc ([$bindings ...] $sexprs ...)
  }

  rule { (lets [$bindings ...] $src $sexprs ...) } => {
    (function () {
      _lets ([$bindings ...] $src $sexprs ...)
    }.call(this))
  }

  rule { (do $sexprs ...) } => {
    (function () {
      _return_sexprs ($sexprs ...)
    }.call(this))
  }

  rule { (while $cond $sexpr) } => {
    (function () {
      while (_sexpr (truthy $cond)) {
        _sexpr $sexpr;
      }
    }.call(this))
  }

  rule { (loop [$bindings ...] $sexprs ...) } => {
    (function () {
      var res = {};
      do {
        res = (function () {
          _loop_let ([$bindings ...] 0 (res._oi_vals) $sexprs ...);
        }());
      }
      while ((res || 0)._oi_recur);
      return res;
    }.call(this))
  }

  rule { (recur $args ...) } => {
    {_oi_recur: true, _oi_vals: [_args ($args ...)]}
  }


  // TODO: docstring

  rule { (apply $fn $obj $args) } => {
    _sexpr $fn.apply($obj,_sexpr (clj_to_js $args))
  }

  rule { (apply $fn $args) } => {
    _sexpr $fn.apply(this,_sexpr (clj_to_js $args))
  }

  rule { (bind $obj $fn) } => {
    _sexpr $fn.bind($obj)
  }

  // rule { (defmulti $n:ident $dispatch_fn) } => {
  //   _sexpr 
  //      (defn $n [] 
  //       (js
  //        if ($n._oi_methods === undefined || $n._oi_methods.length == 0) {
  //          return undefined;
  //        }
  //        var dispatch_fn = _sexpr $dispatch_fn;
  //        for (var i=0; i<$n._oi_methods.length; i++) {
  //          var dispatch_value = $n._oi_methods[i][0];
  //          var fn = $n._oi_methods[i][1];
  //          if (equals(dispatch_fn.apply(this,arguments),dispatch_value)) {
  //            return fn.apply(this,arguments);
  //          }
  //        }) nil)
  // }
 
  // rule { (defmethod $n:ident $dispatch_val [$args ...] $sexprs ...) } => {
  //   (function () {
  //     if ($n._oi_methods === undefined) {
  //       $n._oi_methods = [];
  //     }
  //     $n._oi_methods.push([_sexpr $dispatch_val,_sexpr (fn [$args ...] $sexprs ...)])
  //   }())
  // }

  rule { (threadf $v ($[.]$fn $args ...)) } => {
    _sexpr (.$fn $v $args ...)
  }
  rule { (threadf $v ($[.]$fn $args ...) $x ...) } => {
    _sexpr (threadf (.$fn $v $args ...) $x ...)
  }
 
  rule { (threadf $v ($fn $args ...)) } => {
    _sexpr ($fn $v $args ...)
  }
  rule { (threadf $v ($fn $args ...) $x ...) } => {
    _sexpr (threadf ($fn $v $args ...) $x ...)
  }
  rule { (threadf $v $el) } => {
    _sexpr ($el $v)
  }
  rule { (threadf $v $el $x ...) } => {
    _sexpr (threadf ($el $v) $x ...)
  }

  //rule { (threadl $v ($[.]$fn $args ...)) } => {
  //  _sexpr (.$fn $args ... $v)
  //}
  //rule { (threadl $v ($[.]$fn $args ...) $x ...) } => {
  //  _sexpr (threadl (.$fn $args ... $v) $x ...)
  //}

  rule { (threadl $v ($fn $args ...)) } => {
    _sexpr ($fn $args ... $v)
  }
  rule { (threadl $v ($fn $args ...) $x ...) } => {
    _sexpr (threadl ($fn $args ... $v) $x ...)
  }
  rule { (threadl $v $el) } => {
    _sexpr ($el $v)
  }
  rule { (threadl $v $el $x ...) } => {
    _sexpr (threadl ($el $v) $x ...)
  }

  rule { (chain $obj $rest ...) } => {
    _sexpr $obj _chain ($rest ...)
  }

  rule { (doto $obj $rest ...) } => {
    (function () {
      _doto ($obj $rest ...)
      return $obj;
    }.call(this))
  }

  rule { (try $body (catch $e $catch_expr)) } => {
    (function () {
      try {
        _sexpr $body
      }
      catch ($e) {
        _sexpr $catch_expr
      }
    }.call(this))
  }

  rule { (try $body (catch $e $catch_expr) (finally $finally_expr)) } => {
    (function () {
      var ret;
      try {
        ret = _sexpr $body;
      }
      catch ($e) {
        ret = _sexpr $catch_expr;
      }
      finally {
        _sexpr $finally_expr;
      }
      return ret;
    }.call(this))
  }

  rule { (throw $x) } => {
    (function () {
      throw(_sexpr $x);
    }.call(this))
  }

  rule { ($[.] $fn $obj $args ...) } => {
    _sexpr $obj . $fn (_args ($args ...))
  }

  rule { ($fn $args ...) } => {
    _sexpr $fn (_args ($args ...))
  }

  rule { [$ $x ...] } => {
    [_arr ($x ...)]
  }

  rule { {$ $x ...} } => {
    {_obj ($x ...)}
  }

  
  rule { [$x ...] } => {
    _sexpr ((js require('immutable').List.of) $x ...)
  }

  rule { {$x ...} } => {
    _sexpr ((js require('immutable').fromJS) {$ $x ...})    
  }

  rule { $x } => { 
    _x $x
  }

}

macro _return_sexprs {
  rule { ($sexpr) } => {
    return _sexpr $sexpr
  }
  rule { ($sexpr $sexprs ...) } => {
    _sexpr $sexpr; _return_sexprs ($sexprs ...)
  }
}

macro _sexprs {
  rule { ($sexpr) } => {
    _sexpr $sexpr
  }
  rule { ($sexpr $sexprs ...) } => {
    _sexpr $sexpr _sexprs ($sexprs ...)
  }
}

macro oi {
  case { _ require core} => {
    return #{
      (function(){    

        // require core?
      }());
    }
  }
  case { _ require $module as $name} => {
    var module_name = unwrapSyntax(#{$module});
    letstx $module_name = [makeValue(module_name,#{$module})];
    return #{var $name = require($module_name);}
  }
  case { _ require $module} => {
    var module_name = unwrapSyntax(#{$module});
    letstx $module_name = [makeValue(module_name,#{$module})];
    return #{var $module = require($module_name);}
  }

  case {_ macro ($x ...) ($y ...)} => {
    return #{};
  }

  case { $oi ($x ...) } => {
    
    var Token = {
      BooleanLiteral: 1,
      EOF: 2,
      Identifier: 3,
      Keyword: 4,
      NullLiteral: 5,
      NumericLiteral: 6,
      Punctuator: 7,
      StringLiteral: 8,
      RegularExpression: 9,
      Template: 10,
      Delimiter: 11
    }
    
    function transform(oi_ast, inner) {
      var content = inner.map(function (el) { return el; });
      if (content[0].token.type == Token.Punctuator && 
          content[0].token.value == ':') {
        content.shift();
        var name = content.shift();
        content.forEach(function (el,i) {
          name.token.value += el.token.value;
        });
        name.token.type = Token.StringLiteral;
        content = [{
          token: {
            type: Token.Identifier,
            value: 'keyword',
            lineNumber: inner[0].token.lineNumber,
            lineStart: inner[0].token.lineStart,
            range: inner[0].token.range},
          context: inner[0].context,
          deferredContext: inner[0].deferredContext},
          name];
        }
      else if (content.length == 3 && 
          content[1].token.type == Token.Punctuator && 
          content[1].token.value == '/') {
        content = [{
          token: {
            type: Token.Identifier,
            value: 'ns_get',
            lineNumber: inner[0].token.lineNumber,
            lineStart: inner[0].token.lineStart,
            range: inner[0].token.range},
          context: inner[0].context,
          deferredContext: inner[0].deferredContext},
          content[0], content[2]];
        }
      else {
        content.unshift({
          token: {
            type: Token.Identifier,
            value: 'js',
            lineNumber: inner[0].token.lineNumber,
            lineStart: inner[0].token.lineStart,
            range: inner[0].token.range},
          context: inner[0].context,
          deferredContext: inner[0].deferredContext});
      }
      oi_ast.push({
        token: {
          type: Token.Delimiter,
          value: '()',
          startLineNumber: inner[0].token.lineNumber,
          startLineStart: inner[0].token.lineStart,
          startRange: inner[0].token.range,
          inner: content,
          endLineNumber: inner[0].token.lineNumber,
          endLineStart: inner[0].token.lineStart,
          endRange: inner[0].token.range
        }
      });
    }
    
    function ast_js_to_oi(ast) {
    
      var oi_ast = [];
      var acc = [];
      var next = null;
    
      ast.forEach(function (el,i) {
    
        switch (el.token.type) {
          case Token.Punctuator:
            if (i == 0 && el.token.value != ':') {
              oi_ast.push(el);
            }
            else {
              acc.push(el);
            }
            break;
          case Token.Identifier:
          case Token.Keyword:
            next = ast[i+1];
            if (next === undefined || next.token.type != Token.Punctuator ||
                (next.token.type == Token.Punctuator && next.token.value == ':')) {
              if (acc.length == 0) {
                oi_ast.push(el);
              }
              else {
                acc.push(el);
                transform(oi_ast, acc);
                acc = [];
              }
            }
            else {
              acc.push(el);
            }
            break;
          case Token.Delimiter:
            // FIXME: here we're modifying el in place.
            // We should probably avoid it.
            if (!(el.token.inner.length > 0 && 
                  (el.token.inner[0].token.type == Token.Identifier &&
                   el.token.inner[0].token.value == 'js'))) {
                     el.token.inner = ast_js_to_oi(el.token.inner);
                   }
            oi_ast.push(el);
            break;
          default:
            oi_ast.push(el);
            break;
        }
      });
    
      return oi_ast;
    }

    var x = #{$x ...};
    var oi_x = ast_js_to_oi(x);
    letstx $oi_x ... = oi_x;

    return #{
      (function () {      
        if(!global._oi_){
          var core = require('../lib/core.js');   
          core.__extend__(global, core)  ;
          global._oi_ = true;
        }        
        // initialized oi.
        return (_sexpr ($oi_x ...)); 
      }())
    }
  }
}

export oi;

