var utils = require('./utils.js');

var _nexId = 0;

module.exports = {
	props: {
		id: {
			type: String,
			default: function() {
				return 'b-' + _nexId++;
			}
		},
		label: {
			default: ''
		},
		enabled: {
			default: true
		},
		readonly: {
			default: false
		},
		required: {
			default: false
		},
		noLabel: {
			default: false
		}
	},
	computed: {
		isDisabled: function() {
			return !utils.isTrue(this.enabled);
		},
		isReadonly: function() {
			return utils.isTrue(this.readonly);
		},
		isRequired: function() {
			return !this.isDisabled && !this.isReadonly && utils.isTrue(this.required);
		},
		showLabel: function() {
			return !utils.isTrue(this.noLabel);
		},
	}
};

