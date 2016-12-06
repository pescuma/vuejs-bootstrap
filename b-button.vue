<template>
	<span :class="colspanClass" @click.capture="onClick($event)">
		<button v-el:btn :type="type" id="id" :class="classes" :style="style" :disabled="isDisabled">
			{{ caption }}
			<slot></slot>
		</button>
	</span>
</template>

<script>
	
	var utils = require('./utils.js');
	
	module.exports = {
		name: 'b-button',
		mixins: [require('./mixin-colspan.js'), require('./mixin-button.js')],
		props: {
			enabled: {
				default: true
			},
			style: {},
			tooltip: {
				type: String
			}
		},
		computed: {
			isDisabled: function() {
				return !utils.isTrue(this.enabled);
			},
		},
		methods: {
			onClick: function(e) {
				if (this.isDisabled) {
					e.preventDefault();
					e.stopPropagation();
				}
			}
		},
		attached: function() {
			if (this.tooltip) {
				$(this.$els.btn).tooltip({
					title: this.tooltip,
					placement: 'bottom'
				});
			}
		}
	};

</script>
