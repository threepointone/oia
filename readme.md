oia
---
*pronounced 'eeya'*
```lisp
oia( 
  let [xf 
    (compose 
      (map (fn [x] (mul x 3))) 
      (filter (fn [x] (eq 0 (mod x 2)))) 
      (take 10))]
  (prn (seq [1 2 3 4 5] xf)))
```

why? 

- js interop
- immutable + transducers + channels 
- ui components
- tooling

kinda works

- lisp-ish
- forked from [ki](http://ki-lang.org)
- js interop / macros (via sweet.js)
- immutable sequences, lists, maps, sets, cursors (via immutable.js)
- lexical scoping
- loop /recur
- destructuring 
- :keywords
- transducers (via transducers.js)
- generators(!)
- exception handling 
- chaining 

in progress 

- tooling: source maps / browserify / node 
- channels
- react macros 

future

- multimethods
- namespaces
- macros
- pattern matching 
- core library?

tests

- 50 passing
- 2 pending
- 2 failing
