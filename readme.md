work in progress


oi
---

```lisp

oi(
	lets [prn] (require '../lib/core')
		(prn (.getIn {x 1 y [1 5 6]} ['y' 1]))  # 5
		(.forEach [$ 1 4 6] prn)
		# 1 0 [ 1, 4, 6 ]
		# 4 1 [ 1, 4, 6 ]
		# 6 2 [ 1, 4, 6 ]


)

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