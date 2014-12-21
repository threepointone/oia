tests: 
	./node_modules/.bin/sjs -o tests/index.compiled.js -m ./lib/macro.sjs tests/index.sjs
	./node_modules/.bin/mocha tests/index.compiled.js

.PHONY: sandbox tests