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

kinda works

- it's a lisp
- forked from [ki](http://ki-lang.org)
- js interop / macros (via sweet.js)
- immutable sequences, lists, maps, sets, cursors (via immutable.js)
- lexical scoping
- destructuring 
- :keywords
- transducers (via transducers.js)


in progress 

- chaining 
- exception handling 
- loop /recur
- tooling: source maps / browserify / node 

future


- multimethods
- namespaces
- macros 
- channels
- pattern matching 
- core library?