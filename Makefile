build:
	# compile core libs, etc

sandbox: 
	./bin/oi sandbox | node

tests: 
	./bin/oi tests | mocha

.PHONY: sandbox tests