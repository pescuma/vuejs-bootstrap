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
			type: String,
			required: true
		},
		enabled: {
			type: Boolean,
			default: function () {
				return true;
			}
		},
		readonly: {
			type: Boolean,
			default: function () {
				return false;
			}
		}
	},
};

