var expr = require('property-expr');
var he = require('he');
var Type = require('type-of-is');

module.exports = {
	htmlEncode: function (txt) {
		if (txt === undefined || txt === null)
			return '';

		return he.escape(txt.toString());
	},

	isTrue: function (v) {
		return v === 'true' || v === true;
	},

	isFalse: function (v) {
		return v === 'false' || v === false;
	},
	
	is: Type.is,

	getter: expr.getter
};
