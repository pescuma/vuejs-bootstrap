var expr = require('property-expr');
var he = require('he');
var Type = require('type-of-is');

var utils = {
	htmlEncode: function(txt) {
		if (txt === undefined || txt === null)
			return '';
		
		return he.escape(txt.toString());
	},
	
	isTrue: function(v) {
		return v === 'true' || v === true;
	},
	
	isFalse: function(v) {
		return v === 'false' || v === false;
	},
	
	is: Type.is,
	
	getter: expr.getter,
	
	createRenderFunction: function(render) {
		if (utils.is(render, String)) {
			var getter = utils.getter(render);
			return function(obj) {
				if (obj == null)
					return '';
				
				return utils.htmlEncode(getter(obj));
			};
			
		} else if (utils.is(render, Function)) {
			return function(obj) {
				if (obj == null)
					return '';
				
				return render(obj);
			};
			
		} else {
			return function(obj) {
				if (obj == null)
					return '';
				
				return utils.htmlEncode(obj);
			};
		}
	}
};

module.exports = utils;
