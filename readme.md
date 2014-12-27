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

usage
---
```
npm install oia -g
oia script.js | node
```

why?
---
- js interop
- immutable + transducers + channels 
- ui components
- tooling

kinda works
---
- [working repl](http://npmjs.com/package/oiarepl)
- [test suite](https://github.com/threepointone/oic/blob/master/tests.js)
- [user guide](https://github.com/threepointone/oia/blob/master/guide.js)
- lisp-ish
- forked from [ki](http://ki-lang.org)
- js interop / macros (via [sweet.js](http://sweetjs.org/))
- immutable sequences, lists, maps, sets, cursors (via [immutable](https://facebook.github.io/immutable-js/) & [immstruct](https://github.com/omniscientjs/immstruct))
- lexical scoping
- loop /recur
- destructuring 
- :keywords
- transducers (via [transducers.js](https://github.com/jlongster/transducers.js))
- exception handling 
- chaining 
- multimethods
- generators / channels ([example](https://gist.github.com/threepointone/eee1972ad47c4a10b3a0))

in progress 
---
- tooling: bin / source maps / browserify / repl
- macros

future
---
- react macros 
- pattern matching 
