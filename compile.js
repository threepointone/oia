// compiler/ source maps et al.
var fs = require('fs'),
	path = require('path'),
	sweet = require('sweet.js'),
	macro = fs.readFileSync(path.join(__dirname,'./macro.js'), 'utf8');

// sweet.setReadtable('./node_modules/oia/node_modules/jsx-reader/index.js');

module.exports = function(src, options){
	return sweet.compile(src, {
		modules: [sweet.loadModule(macro)]
	});
}