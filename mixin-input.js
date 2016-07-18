var utils = require('./utils.js');

var _nexId = 0;

module.exports = {
	props: {
		id: {
			type: String,
			default: function () {
				return 'b-' + _nexId++;
			}
		},
		label: {
			required: true
		},
		enabled: {
			default: true
		},
		readonly: {
			default: false
		}
	},
	computed: {
		isDisabled: function () {
			return !utils.isTrue(this.enabled);
		},
		isReadonly: function () {
			return utils.isTrue(this.readonly);
		}
	}
};

