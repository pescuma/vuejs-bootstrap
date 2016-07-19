<template>
	<button :type="type" id="id" :class="classes" :disabled="isDisabled" :readonly="isReadonly">
		{{ label }}
		<slot></slot>
	</button>
</template>

<script>

	var utils = require('./utils.js');

	module.exports = {
		tag: 'b-button',
		mixins: [require('./mixin-colspan.js'), require('./mixin-input.js')],
		props: {
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
			block: {}
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

				return result;
			}
		}
	};

</script>
