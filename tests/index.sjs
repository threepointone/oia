
var expect = require("chai").expect;
var _ = require('../lib/core');


describe("sexpressions", function() {

  it("should allow to call js functions", function() {
    var f0 = function() { return 1; }
    var f1 = function(a) { return a; }
    var f2 = function(a, b) { return [a, b]; }
    expect(oi (f0)).to.eql(1);
    expect(oi (f1 1)).to.eql(1);
    expect(oi (f2 1 2)).to.eql([1,2]);
  });

  it("should allow to use attribute access notation as function name", function() {
    
    var foo0 = { bar: function() { return 1; } }
    var foo1 = { bar: function(a) { return a; } }
    var foo2 = { bar: function(a,b) { return [a, b]; } }
    var goo0 = { bar: { baz : function() { return 1; } } }
    var goo1 = { bar: { baz : function(a) { return a; } } }
    var goo2 = { bar: { baz : function(a, b) { return [a, b]; } } }
    expect(oi (foo0.bar)).to.eql(1);
    expect(oi (foo1.bar 1)).to.eql(1);
    expect(oi (foo2.bar 1 2)).to.eql([1,2]);
    expect(oi (goo0.bar.baz)).to.eql(1);
    expect(oi (goo1.bar.baz 1)).to.eql(1);
    expect(oi (goo2.bar.baz 1 2)).to.eql([1,2]);
  });

  it("should allow to use attribute access notation as function argument", function() {
    
    var goo1 = { bar: { baz : function(a) { return a; } } }
    var goo2 = { bar: { baz : function(a, b) { return [a, b]; } } }
    var goo3 = { bar: { baz : function(a, b, c) { return [a, b, c]; } } }
    var data = { a: { b: 0 }}
    expect(oi (goo1.bar.baz data.a.b)).to.eql(0);
    expect(oi (goo2.bar.baz data.a.b 1)).to.eql([0,1]);
    expect(oi (goo3.bar.baz data.a.b 1 data.a.b)).to.eql([0,1,0]);
  });

  // it("should allow to call mori functions on mori data structures", function() {
    
  //   var foo = oi (vector 1 2 3)
  //   expect(oi (conj foo 4)).to.eql(oi (vector 1 2 3 4));
  // });

});

describe("lambdas", function() {

  it("should allow to define anonymous functions and call them from js", function() {
    
    var f = oi (fn [x] (js x + 1))
    expect(f(1)).to.eql(2);
  });

  it("should allow to define anonymous functions and use them in oi", function() {
    
    expect(
      oi (.toJS (.map [1 2 3] (fn [x] (js x + 1)) ))
      ).to.eql([2,3,4]);
  });

  it("should allow to define named anonymous functions and call them recursively", function() {
    
    expect(
      oi (.toJS (.map [1 2 3] (fn foobar[x] (if (js x === 1) x (foobar (js x - 1)))) ))
      ).to.eql([1,1,1]);
  });

});

describe("interoperability", function() {

  it("should allow to call js within oi", function() {
    
    expect(
      oi (.toJS (.map [1 2 3] (js function(x) { return x + 1; }) ))
      ).to.eql([2,3,4]);
  });

  it("should allow to pass a oi fn as a js callback", function() {
    
    expect(
      [1,2,3,4].map(oi (fn [x] (js x % 2 === 0)))).to.eql([false,true,false,true]);
  });

});

describe("local bindings and lexical scope", function() {

  it("should allow to define local bindings in a let form and ensure proper lexical scope", function() {
    
    expect(
      oi (.toJS
           (let [a 1 
                  b 2]
              [a b]))
      ).to.eql([1,2]);
    expect(
      oi (.toJS
           (let [a 0]
            (let [a (inc a) 
                   b (inc a)]
               [a b])))
      ).to.eql([1,2]);
    var c = {d: 1};
    expect(
      oi (let [a c.d
                b (inc a)
                e :e]
            (let [a (inc a) 
                   b (inc b)] 
              a)
            [a b e])
      ).to.eql(list(1, 2, keyword('e')));
  });

});

// // describe("namespaces", function() {

// //   it("should allow to define multiple namespaces and an anonymous namespace", function() {
    
// //     oi (def a 0);
// //     oi (defn b [x] x);
// //     oi (ns foo (def a 1));
// //     oi (ns bar (def a 2));
// //     expect(oi (identity a)).to.eql(0);
// //     expect(oi (b 0)).to.eql(0);
// //     expect(oi (ns foo a)).to.eql(1);
// //     expect(oi (ns bar a)).to.eql(2);
// //   });

// //   it("should allow to use fully qualified identifiers", function() {
    
// //     oi (def a 0);
// //     oi (ns foo (def a 1));
// //     oi (ns bar (def a 2));
// //     expect(
// //       oi (clj_to_js (vector a foo/a bar/a))
// //       ).to.eql([0,1,2]);
// //   });

// //   it("should allow to intern modules", function() {
    
// //     _ki.modules['amodule'] = { bar: function() { return 1; }};
// //     _ki.modules['bmodule'] = { baz: function() { return 2; }};
// //     oi (ns foo 
// //         (use amodule bmodule));
// //     expect(
// //       oi (clj_to_js (ns foo (vector (bar) (baz))))
// //       ).to.eql([1,2]);
// //   });

// // });

describe("truthiness", function() {

  it("should have truthy return false only for boolean false, nil (and js null and undefined)", function() {
    
    expect(oi (truthy false)).to.eql(false);
    expect(oi (truthy nil)).to.eql(false);
    expect(oi (truthy (js null))).to.eql(false);
    expect(oi (truthy (js undefined))).to.eql(false);
    expect(oi (truthy "")).to.eql(true);
    expect(oi (truthy 0)).to.eql(true);
    expect(oi (falsey false)).to.eql(true);
    expect(oi (falsey 0)).to.eql(false);
    expect(oi (not (falsey false))).to.eql(false);
    expect(oi (not (falsey 0))).to.eql(true);
  });

});

describe("logical operators", function() {

  it("should be consistent with definition of truthiness", function() {
    
    expect(oi (and "" 0)).to.eql(true);
    expect(oi (and "" 0 nil)).to.eql(false);
    expect(oi (or "" 0)).to.eql(true);
    expect(oi (or false nil)).to.eql(false);
    expect(oi (and "" (not (or false nil)) 0)).to.eql(true);
  });

  it("should short circuit", function() {
    
    expect(oi (and true false undefined_symbol)).to.eql(false);
    expect(oi (or false true undefined_symbol)).to.eql(true);
  });
});

describe("equality", function() {

  it("should operate on deep data structures", function() {
    
    expect(oi (eq {"a" 1 "b" [{"c" 1} 2]} {"a" 1 "b" [{"c" 1} 2]})).to.eql(true);
    expect(oi (eq {"a" 1 "b" [{"c" 3} 2]} {"a" 1 "b" [{"c" 1} 2]})).to.eql(false);
    expect(oi (neq {"a" 1 "b" [{"c" 3} 2]} {"a" 1 "b" [{"c" 1} 2]})).to.eql(true);
  });

});

describe("flow control", function() {

  it("should allow branching consistently with definition of truthiness", function() {
    
    expect(oi (when (eq 1 1) "foo")).to.eql("foo");
    expect(oi (when_not (eq 1 2) "foo")).to.eql("foo");
    expect(oi (if "" "foo" "bar")).to.eql("foo");
    expect(oi (if 0 "foo" "bar")).to.eql("foo");
    expect(oi (if nil "foo" "bar")).to.eql("bar");
    expect(oi (if_not "" "foo" "bar")).to.eql("bar");
  });

  it("should have cond be consistent with definition of truthiness", function() {
    
    expect(
      oi (cond
           (eq 1 2) "foo"
           nil "bar"
           "" "baz")).to.eql("baz");
    expect(
      oi (cond
           (eq 1 2) "foo"
           nil "bar"
           :else "baz")).to.eql("baz");
  });

  it("should have cond short circuit", function() {
    
    expect(oi (cond
                (eq 1 2) "foo"
                true "bar"
                undefined_symbol "baz")).to.eql("bar");
  });

});

describe("data literals", function() {

  // it("should allow to create lists", function() {    
  //   expect(oi (eq [1 2 3 4] (list 1 2 3 4)).to.eql(true);
  // });

  // it("should allow to create hash maps", function() {
    
  //   expect(oi (eq {"a" 2 "b" 4} (hash_map "a" 2 "b" 4))).to.eql(true);
  // });

  // it("should allow to create hash maps and evaluate forms", function() {
    
  //   expect(oi (eq {"a" (inc 1) (str "b") 4} (hash_map "a" 2 "b" 4))).to.eql(true);
  // });

  // it("should allow to create deeply nested data structures", function() {
    
  //   expect(oi (eq {"a" [2 [3 4]] "b" {"c" 5 [6 7] "d"}} 
  //               (hash_map "a" (list 2 (list 3 4)) 
  //                         "b" (hash_map "c" 5 (list 6 7) "d")))).to.eql(true);
  // });

  // it("should allow to create js arrays", function() {
    
  //   expect(oi (do [$ 1 2 3 4])).to.eql([1,2,3,4]);
  // });

  // it("should allow to create js objects", function() {
    
  //   expect(oi (do {$ "a" 1 "b" 2})).to.eql({a: 1, b: 2});
  // });

  // it("should allow to create nested js objects", function() {
    
  //   expect(oi (do {$ "a" {$ "c" [$ 3 4]} "b" 2})).to.eql({a: {c: [3, 4]}, b: 2});
  // });


});

// describe("recursion", function() {

//   it("should allow to express simple recursion", function() {
    
//     oi (defn fib [n]
//         (cond 
//          (eq n 0) 0
//          (eq n 1) 1
//          "else" (sum (fib (js n-1)) (fib (js n-2)))));
//     expect(oi (fib 20)).to.eql(6765);
//   });

//   it("should allow to recur using loop/recur without blowing the stack", function() {
    
//     oi (defn fib [n]
//         (loop [a 0 b (inc a) iter 0]
//          (if (js iter == n) a
//           (recur b (js a + b) (inc iter)))));
//     expect(oi (fib 20)).to.eql(6765);
//     expect(oi (fib 500)).to.eql(1.394232245616977e+104);
//   });

// });

// describe("keywords", function() {

//   it("should be usable in collections", function() {
    
//     var mori = _ki.modules.mori;
//     expect(oi (do [:a 1 :b {:c 2}])).to.eql(
//       mori.vector(mori.keyword('a'),1,
//         mori.keyword('b'),mori.hash_map(mori.keyword('c'),2)));
//   });

//   it("should evaluate to themselves", function() {   
//    expect(oi (do (:a))).to.eql(_.keyword('a'));
//   });

//   it("should evaluate as keys to get values from collections", function() {   
//    expect(oi (:a {:a 1 :b 2})).to.eql(1);
//   });

// });

// describe("arity", function() {

//   it("should allow calling functions without arity constraints, as in js", function() {
    
//     oi (defn foo [a] (str "Hello " a))
//     expect(
//       oi (foo 1 2)
//       ).to.eql("Hello 1");
//     expect(
//       oi (foo)
//       ).to.eql("Hello undefined");
//   });

//   it("should allow to define functions with multiple arities", function() {
    
//     oi (defn foo 
//          ([a] (str "Hello " a))
//          ([a b] (str "There " a " " b)))
//     expect(
//       oi (foo 1)
//       ).to.eql("Hello 1");
//     expect(
//       oi (foo 1 2)
//       ).to.eql("There 1 2");
//   });

//   it("should allow to define named anonymous functions with multiple arities and refer to the name within the body", function() {
    
//     var f = oi (fn self
//                  ([] (self "world"))
//                  ([who] (str "Hello " who "!")))
//     expect(f()).to.eql("Hello world!");
//     expect(f("yellow")).to.eql("Hello yellow!");
//   });

//   it("should fallback to max arity in case supplied arguments do not match the specified arities", function() {
    
//     oi (defn foo 
//          ([a] (str "Hello " a))
//          ([a b] (str "There " a " " b)))
//     expect(
//       oi (foo)
//       ).to.eql("There undefined undefined");
//     expect(
//       oi (foo 1 2 3)
//       ).to.eql("There 1 2");
//   });

//   //it("should allow to define functions with optional arguments", function() {
//   //  throw "Not implemented"
//   //});

// });

describe("dot notation", function() {

  it("should allow to use dot notation to invoke methods on JavaScript objects", function() {
    
    var a = {
      bar: function(x) {
        return x*2;
      }
    };
    var b = {
      foo: function(x) {
        return a;
      }
    };
    expect(
      oi (.bar a 2)
      ).to.eql(4);
    expect(
      oi (threadf b (.foo) (.bar 2))
      ).to.eql(4);
  });

});

describe("chaining and doto", function() {

  it("should allow to use JavaScript chained APIs", function() {
    
    var A = function() {
      var self = this;
      this.v = "init ";
      this.foo = function(x) {
        self.v += "foo called with " + x + " ";
        return self;
      };
      this.bar = function(x) {
        self.v += "bar called with " + x + " ";
        return self;
      };
    }
    var a = new A();
    expect(
      oi (chain a (foo 1) (bar 2) v)
      ).to.eql('init foo called with 1 bar called with 2 ');
  });

  it("should allow to repeatedly call methods on a JavaScript object", function() {
    
    var A = function() {
      var self = this;
      this.foo = null;
      this.bar = null;
      this.setFoo = function(x) {
        self.foo = x;
      };
      this.setBar = function(x) {
        self.bar = x;
      };
      this.getFooBar = function() {
        return self.foo + " " + self.bar;
      }
    }
    var a = new A();
    expect(
      oi (doto a (setFoo 'a') (setBar 'b')).getFooBar()
      ).to.eql('a b');
  });

});

describe("threading", function() {

  it("should allow to thread first a value through a sequence of computations", function() {
    
    var a = 1;
    expect(
      oi (threadf a inc inc dec)
      ).to.eql(2);
    expect(
      oi (threadf a (sum 2) (sum 3))
      ).to.eql(6);
    expect(
      oi (threadf [] (conj 1) first)
      ).to.eql(1);
  });

  it("should allow to thread last a value through a sequence of computations", function() {
    
    var a = 1;
    expect(
      oi (threadl a (conj []) (map (fn [x] (inc x))) first)
      ).to.eql(2);
  });

});

describe("math operations", function() {

  it("should allow to add, subtract, multiply, divide a sequence of numbers and compute the modulo of two numbers", function() {
    
    expect(oi (add 1 2 3)).to.eql(6);
    expect(oi (sub 3 2 1)).to.eql(0);
    expect(oi (mul 1 2 3)).to.eql(6);
    expect(oi (div 3 2 1)).to.eql(1.5);
    expect(oi (mod 3 2)).to.eql(1);
  });

  it("should allow to compare sequences of numbers", function() {
    
    expect(oi (lt 1 2 3)).to.eql(true);
    expect(oi (lt 3 2 1)).to.eql(false);
    expect(oi (lt 1 2 2)).to.eql(false);
    expect(oi (gt 1 2 3)).to.eql(false);
    expect(oi (gt 3 2 1)).to.eql(true);
    expect(oi (gt 3 2 2)).to.eql(false);
    expect(oi (leq 1 2 3)).to.eql(true);
    expect(oi (leq 3 2 1)).to.eql(false);
    expect(oi (leq 1 2 2)).to.eql(true);
    expect(oi (geq 1 2 3)).to.eql(false);
    expect(oi (geq 3 2 1)).to.eql(true);
    expect(oi (geq 3 2 2)).to.eql(true);
  });

});

describe("continuations", function() {
  
  it("should allow to write asynchronous code in a synchronous fashion", function() {
    
    var foo = function(x, cb) {
      var y = x * 2;
      cb(y);
    };
    var bar = function(x, cb) {
      var y = x + 1;
      cb(y);
    };
    var baz = function(x, cb) {
      var y = x + 1;
      var z = x * 2;
      cb(y,z);
    };

    oi (letc [a (foo 2)
              b (bar a)
              [c d] (baz b)]
        (js expect(b).to.eql(5))
        (js expect(c).to.eql(6))
        (js expect(d).to.eql(10)))

    
    var log = "";
    oi (do
        (defn fake_request [url cb]
         (setTimeout (fn [] (cb 1234)) 1000))
        
        (letc [data (fake_request "fakeurl")]
         (js log += "Response received: " + data + ".")
         (js expect(log).to.eql("Request sent. Response received: 1234.")))

        (js log += "Request sent. "))
    expect(log).to.eql("Request sent. ");
  });

});

describe("apply", function() {

  it("should call a function given a list of arguments supplied as a collection", function() {
    
    expect(
      oi (apply list [1 2 3 4])
      ).to.eql(_.list(1,2,3,4));
  });

});

describe("bind", function() {

  it("should return a function with this set to the provided object", function() {
    
    oi (do 
        (def a {:a 1 :b 2})
        (defn f [] (get this :a)))
    expect(oi ((bind a f))).to.eql(1);
    expect(oi ((bind a (fn [] (get this :a))))).to.eql(1);
  });

});

// describe("multimethods", function() {

//   it("should allow to define functions that dispatch according to the result of the evaluation of another function", function() {
    
//     oi (do
//         (defmulti boss (fn [x] (get x :type)))
//         (defmethod boss :employee [x] (get x :employer))
//         (defmethod boss :employer [x] (get x :name)));
//     expect(oi (boss {:type :employee :name "Barnie" :employer "Fred"})).to.eql("Fred");
//     expect(oi (boss {:type :employer :name "Fred"})).to.eql("Fred");
//   });

// });

// describe("atoms", function() {

//   it("should allow to define reference types with read and write callbacks", function() {
    

//     oi (do
//         (let [r (atom 1 (fn [n o] (js expect(n).to.eql(2); expect(o).to.eql(1)))
//                         (fn [x] (js expect(x).to.eql(2))))]
//          (reset r 2)
//          (deref r)));

//     oi (do
//         (let [r (atom 1 (fn [n o] (js expect(n).to.eql(2); expect(o).to.eql(1)))
//                         (fn [x] (js expect(x).to.eql(2))))]
//          (swap r inc)
//          (js expect(oi (deref r)).to.eql(2))));

//   });

// });

describe("exceptions", function() {

  it("should allow to try expressions and catch exceptions", function() {

    

    oi (try foo.bar (catch e (js expect(e).to.be.a(ReferenceError))));

    var side_effect = false;
    oi (try foo.bar (catch e (js expect(e).to.be.a(ReferenceError))) (finally (js side_effect = true)));
    expect(side_effect).to.eql(true);

  });

  it("should allow to throw exceptions", function() {

    

    expect(oi (fn [] (throw (Error "foo")))).to.throwError();

  });

});

describe("this and fnth", function() {

  it("should handle binding this fn-wise correctly from within IIFN", function() {

    

    oi (defn somefn [] (let [a 1] this.someprop));
    var bar = {someprop: 1};
    var baz = {};

    expect(oi ((bind bar somefn))).to.eql(1);
    expect(oi ((bind baz somefn))).to.eql(undefined);
    expect(oi (somefn)).to.eql(undefined);

  });

  it("should allow a shorthand notation for defining a fn bound to the enclosing this, both named and unnamed", function() {

    

    var fn1, fn2;
    oi (do
         (js this.jee = 1)
         (let [a (fn [] this.jee)
               b (fnth [] this.jee)
               c (fnth cfn[] this.jee)]
           (js fn1 = a)
           (js fn2 = b)
           (js fn3 = c)));

    expect(fn1.bind({jee: 2})()).to.eql(2);
    expect(fn2.bind({jee: 2})()).to.eql(1);
    expect(fn3.bind({jee: 2})()).to.eql(1);

  });

});

describe("str", function() {

  it("should allow to concatenate strings and literals", function() {
    
    expect(oi (str "a" 2 "b" 3 "c")).to.eql("a2b3c");
  });

});

describe("destructuring", function() {

  it("should destructure nested immutable data structures in let forms", function(){
    

    var r = oi (let [[a b {c :c [d e] :d}] [1 2 {:c 3 :d [4 5]}]
                     f 6]
                 (eq [a b c d e] [1 2 3 4 5]))

    expect(r).to.eql(true);
  });

  it("should destructure nested JS data structures in let forms", function(){
    

    var r = oi (let [[$ a b {$ c 'c' [$ d e] 'd'}] [$ 1 2 {$ c 3 d [$ 4 5]}]]
                 (eq [a b c d e] [1 2 3 4 5]))

    expect(r).to.eql(true);
  });

  it("should destructure nested immutable data structures in loop forms", function(){
    

    var r = oi (loop [[a b _] [1 2 3]]
                 (if (gt a 3)
                  (eq [a b] [4 5])
                  (recur (map inc [a b 3]))))

    expect(r).to.eql(true);
  });

  it("should destructure nested JS data structures in loop forms", function(){
    

    var r = oi (loop [[$ a b _] [$ 1 2 3]]
                 (if (gt a 3)
                  (eq [a b] [4 5])
                  (recur (clj_to_js (map inc [a b 3])))))

    expect(r).to.eql(true);
  });


});
