var utils = require('./utils.js');

module.exports = {
	props: {
		class: {},
		caption: {
			type: String,
			default: function () {
				return '';
			}
		},
		enabled: {
			default: true
		},
		type: {
			type: String,
			default: function () {
				return 'button';
			}
		},
		style: {
			type: String,
			default: function () {
				return 'default';
			}
		},
		size: {
			type: String,
			default: function () {
				return 'default';
			}
		},
		block: {},
	},
	computed: {
		classes: function () {
			var result = {
				'btn': true,
				'btn-block': utils.isTrue(this.block)
			};
			
			result['btn-' + this.style] = true;
			
			switch (this.size) {
				case 'large':
				case 'lg':
					result['btn-lg'] = true;
					break;
				case 'small':
				case 'sm':
					result['btn-sm'] = true;
					break;
				case 'extra small':
				case 'xs':
					result['btn-xs'] = true;
					break;
			}
			
			return [result, this.class];
		}
	}
};
