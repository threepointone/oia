sandbox: 
	./node_modules/.bin/sjs -o sandbox/index.compiled.js -m ./lib/macro.sjs sandbox/index.sjs
	node sandbox/index.compiled.js

tests: 
	./node_modules/.bin/sjs -o tests/index.compiled.js -m ./lib/macro.sjs tests/index.sjs
	./node_modules/.bin/mocha tests/index.compiled.js

.PHONY: sandbox tests