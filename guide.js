oia(do
    // oia syntax in few sentences:
  // ---
  // 
  // 
  // 1. consider this function call - 
  // 
  //   f(x, y)
  // 
  // lose the commas -
  // 
  //   f(x y)
  // 
  // now move the bracket to *outside* the function name 
  // 
  //   (f x y)
  // 
  // 2. arrays and objects look familiar
  // 
  //   {:x 123 :y 'abcde' :z { :a 'turn down' :b 'for what'}}
  // 
  //   [1 3 'bdf' {:whatwhat true}]
  // 
  // 3. dot notation helps you reference stuff in (js) objects
  // 
  //   (.log window.console 'hello there!')
  // 
  // now you can read oia.
  // ---


  // there are a number of core functions you can run - see oia/core

  // some useful ones - 
  // prn - logs to your console
  // str - string concatenation


  // oia comes with a number of useful primitive data structures 

  (prn 
    :number 123
    :string "whoopdedoo"
    :keywords :xyz
    :regexps /likejs/
    :booleans true false)


  (prn (str "The secret word is " (add 1 3 4 "oia")))  //> The secret word is 8oia

  
  // the core 'macros', aka code generators are - 

  // []/{}/[$]/{$} lists/maps/arrays/objects

  
  (prn [1 2 3 4])         // immutable list
  (prn {:x 1 :y 2})        // immutable map
  (prn [$ 'a' 'b' 'c'])   // js array
  (prn {$ x 1 y 2 z 3})    // js object
  
  // you can nest data structures
  (prn [
    :a :b :c 
    {:some :thing 
      :what {$ an 'object' freshly 'made'} //  ONLY js objects can have symbols as keys
      'omg' [$ :an 'array']
    }])
  //> List [ :a, :b, :c, Map { :some: :thing, :what: [object Object], omg: :an,array } ]

  // @todo - sets

  // btw, keywords are awesome little bits that evaluate to themselves 
  (prn (eq :a :a))

  // use them as keys for objects or maps 

  (let [
    x {:x 123 :y 786} 
    y {$ :x 0 :y 1}]
      (prn x y))

  // use can also use keywords as functions on maps/objects to retrieve values
  (let [ x {:a 123 :b 'abracadabra'} ]
      (prn (:a x)))  

  // @todo maps can have any key

  // def - equivalent to saying `var`. creates the binding in the *current* execution context.

  (def x 1)
  (def y 2)
  (prn (add x y))
  //> 3

  (def letters 'abcdefghij')
  (prn (.split letters ''))
  //> [ 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']

  
  // let - local bindings. creates symbols in a *new* execution context, and returns last evaluated sexpression(s)
  // the bindings are discarded outside the let scope
  
  (let [x 123 y [:a :b :c] z nil] 
    (prn x y z))
  //> 123 List [ ::a, ::b, ::c ] null

  // @todo - destructuring

  // lets - like let, but pulls symbols as keys from a js object. 
  (lets [join dirname] (require 'path') 
    (prn (join (dirname '/some/path/to/file.nope') 'somefile.yes')))


  // fn - function definition. 

  (fn sin [x] (Math.sin x))
  (prn (sin Math.PI))


  // anonymous functions work as expected

  (prn(map [1 2 3 4 5] (fn [x] (add (mul x 2) 1))))  
  //>  List [ 3, 5, 7, 9, 11 ]
  
  (prn(map [1 2 3 4 5] (fn [x] (js 3*x - 1))))      
  //> List [ 2, 5, 8, 11, 14 ]


  // can do arity based polymorphism.
  (def greet (fn 
         ([a] (str "Hello " a))
         ([a b] (str "There " a " " b))))
  
  (prn (greet 'oia'))  // Hello oia
  (prn (greet 1 2))    // There 1 2
  

  // @todo fnth - function bound to given scope 
  // @todo multimethods


  // conditionals / branching
  (prn (if true 'this should print' 'this won\'t print'))  
  //> this should print
  
  (prn (cond
     (eq 1 2) "foo"
     nil "bar"
     :else "baz"))
  //> baz

  (let [x 123]
    (prn (if (lt x 100) (mul x 2) (div x 2))))
  //> 61.5

  // available -   
  // if/if_not
  // when/when_not
  // cond

  
  // and / or works as expected 
  (prn (and true false))  //> false
  (prn (or true false))    //> true

  // do lets you eval a number of expressions, returning the last one.
  // just like this whole doc!

  // @todo while 
  // @todo loop/recur
  // @todo apply / bind

  
  // threadf lets you pass a value as the first argument through a series of computations 
  (prn (let [a 1] (threadf a inc inc inc inc dec inc)))  //> 5

  // @todo threadl chain doto

  // @todo count
  // @todo keys vals


  // immutable data structures can't be modified once they're made 
  // their methods return entirely new instances 

  (let [x ['some' 'strings' 'and' 'stuff'] 
        y (.push x 'here')]
    (prn x)
    (prn y))
  //>  List [ "some", "strings", "and", "stuff" ]
  //>  List [ "some", "strings", "and", "stuff", "here" ]

  (let [x {:x 123 :y 'abc'} 
        y (.set x :z 'here')]
    (prn x)
    (prn y))
  //>  Map { :x: 123, :y: "abc" }
  //>  Map { :x: 123, :y: "abc", :z: "here" }

  // equality on immutable data structures is by value, not by reference  
  (prn (eq {:one 1 :two "2"} {:one 1 :two "2"}))  //> true
  (prn (eq {:one 1 :two "2"} {:two "2" :one 1}))  //> true

  // maps can have complex keys
  (let [ complex { 
    [1 2] :onetwo 
    [3 4] :threefour } ]
      (prn (get complex [3 4])))
  //> :threefour

  // read more at https://facebook.github.io/immutable-js/

  // map / filter / reduce
  // oia imports all of transducers.js, and it's been configured to work with oia
  // so you can do all the stuff you're used to

  (prn (map [0 1 2 3 4 5 6 7 8 9] inc))

  (prn (filter (range 10) (fn[x] (eq(mod x 2) 0))))

  (prn (into [] (fn[x] x) (range 10)))

  // read more at https://github.com/jlongster/transducers.js

  // @todo sequable collections


  // error handling 
  // try / catch / finally works as expected
  (try
    (throw (js new Error ("Oops")))
    (catch e
      (prn e))
    (finally 
      (prn 'done')))


  // @todo - atoms / cursors
  // @future - types/ records / protocols / reify  
);


// one more thing...

// this is a regular javascript file, so you can write regular js here and it'll still work. 

console.log('are you serious', Math.random()*1000);




