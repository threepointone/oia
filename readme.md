oi
---

*pronounced "eeya"*


```lisp


oi(
  lets [prn] 
    (do
      (prn (.getIn {x 1 y [1 5 6]} ['y' 1]))
      (.forEach [$ 1 4 6] prn)))


```

kinda works

- it's a lisp
- js interop / macros (via sweet.js)
- immutable sequences, lists, maps, sets, cursors (via immutable.js)


in progress 

- destructuring 
- chaining 
- exception handling 
- loop /recur
- lexical scoping 
- tooling: source maps / browserify / node 

future

- :keywords
- multimethods
- namespaces
- macros 
- channels
- pattern matching 
- transducers
- core library


notes
- mostly copy-pasted from [ki](http://ki-lang.org)
