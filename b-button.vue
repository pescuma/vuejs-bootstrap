<template>
	<button type="button" :id="id" :class="classes" :disabled="!enabled">{{ label }}</button>
</template>

<script>
	
	module.exports = {
		tag: 'b-button',
		mixins: [require('./mixin-colspan.js'), require('./mixin-input.js')],
		props: {
			type: {
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
			block: {
				type: Boolean
			}
		},
		computed: {
			classes: function () {
				var result = {
					'btn': true,
					'btn-block': this.block
				};
				
				result['btn-' + this.type] = true;
				
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
