<template>
	<div :class="[ classes, colspanClass ]" role="alert">
		<button type="button" class="close" aria-label="Close" v-if="isDismissible" @click.prevent="onClose"><span aria-hidden="true">&times;</span></button>
		<slot></slot>
	</div>
</template>

<script>
	
	var utils = require('./utils.js');
	
	module.exports = {
		tag: 'b-button',
		mixins: [require('./mixin-colspan.js')],
		props: {
			context: {
				type: String,
				default: function() {
					return 'info';
				}
			},
			dismissible: {
				default: false
			}
		},
		computed: {
			isDismissible: function() {
				return utils.isTrue(this.dismissible);
			},
			classes: function() {
				var result = {
					'alert': true,
					'alert-dismissible': this.isDismissible
				};
				
				result['alert-' + this.context] = true;
				
				return result;
			}
		},
		methods: {
			onClose: function() {
				this.$emit('close');
			}
		}
	};

</script>
