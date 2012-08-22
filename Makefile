MOCHA = ./node_modules/mocha/bin/mocha
TESTS = test/*.js

test:
	$(MOCHA) $(TESTS) $(ARGS)

.PHONY: test
