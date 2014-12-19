// oi - pronounced eeya
 
 var sweet = require('sweet.js');

var getNSExprs = function(s, n) {
	var nesting = 0;
	var sexpr = "";
	var res = {
		matches: [],
		end: -1
	};
	for (var i = 0; i < s.length; ++i) {
		c = s[i];
		switch (c) {
			case '(':
				nesting++;
				break;
			case ')':
				nesting--;
				if (nesting < 0) {
					return null;
				}
				if (nesting == 0) {
					res.matches.push(sexpr + c);
					sexpr = "";
				}
				if (res.matches.length == n) {
					res.end = i + 1;
					return res;
				}
				break;
		}
		if (nesting > 0) {
			sexpr += c;
		}
	}
	return null;
}

var parseMacros = function(code) {
	var re = /oi *macro/

	var current = code;
	var start = current.search(re);
	var ret;
	var macros = [];
	while (start != -1) {
		current = current.substr(start);
		ret = getNSExprs(current, 2);
		macros.push(ret.matches);
		current = current.substr(ret.end);
		start = current.search(re);
	}

	var rules = macros.map(function(macro) {
		return 'rule { ' + macro[0] + ' } => { _sexpr ' + macro[1] + ' }'
	});

	return rules.join('\n');
}

var joinModule = function(src, oi_core, additionalRules) {
	rules = additionalRules || [];
	rules.push(parseMacros(src));
	return oi_core.replace('/*__macros__*/', rules.join('\n'));
}

var compile = function(src, options, uglify, fs) {
	if (!options.modules && options.oi_core) {
		var module = joinModule(src, options.oi_core, options.rules);
		options.modules = sweet.loadModule(module);
	}
	var result = sweet.compile(src, options);
	if (options.sourceMap) {
		var code = result.code + '\n//# sourceMappingURL=' + options.mapfile;
		var sourceMap = result.sourceMap;
		var tmpfile = options.mapfile + ".tmp";
		if (options.minify && fs) {
			fs.writeFileSync(tmpfile, sourceMap, 'utf8');
			result = uglify.minify(code, {
				fromString: true,
				inSourceMap: tmpfile,
				outSourceMap: options.mapfile,
				compress: options.compress
			});
			fs.unlinkSync(tmpfile);
			return {
				code: result.code,
				sourceMap: result.map
			};
		}

		return {
			code: code,
			sourceMap: sourceMap
		};
	} else if (options.minify) {
		var result = uglify.minify(result.code, {
			fromString: true,
			compress: options.compress
		});
		return {
			code: result.code
		};
	}
	return {
		code: result.code
	};
}

module.exports = {
	compile: compile,
	joinModule: joinModule,
	parseMacros: parseMacros
}
