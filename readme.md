*WORK IN PROGRESS*


![oia](http://i.imgur.com/ZDqVxDn.png)

*pronounced 'eeya'*
```js
oia(do 
  (def xf 
    (compose 
      (drop 20)
      (map (fn [x] (mul x 3))) 
      (filter (fn [x] (eq 0 (mod x 2)))) 
      (take 10)))
  
  (prn (seq (range 500) xf)))

  //> [ 60, 66, 72, 78, 84, 90, 96, 102, 108, 114 ]
```

why? 

- js interop
- immutable + transducers + channels 
- ui components
- tooling

kinda works
- [test suite](https://github.com/threepointone/oic/blob/master/tests.js)
- [user guide](https://github.com/threepointone/oia/blob/master/guide.js)
- lisp-ish
- forked from [ki](http://ki-lang.org)
- js interop / macros (via [sweet.js](http://sweetjs.org/))
- immutable sequences, lists, maps, sets, cursors (via [immutable](https://facebook.github.io/immutable-js/))
- lexical scoping
- loop /recur
- destructuring 
- :keywords
- transducers (via [transducers.js](https://github.com/jlongster/transducers.js))
- exception handling 
- chaining 
- multimethods

in progress 

- tooling: source maps / browserify / node 
- channels
- react macros 
- generators


future
- namespaces
- macros
- pattern matching 

tests

- 51 passing
- 2 pending
- 1 failing
