<template>
	<span :class="colspanClass">
		<button :type="type" id="id" :class="classes" :style="style" :disabled="isDisabled">
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
			style: {}
		},
		computed: {
			isDisabled: function() {
				return !utils.isTrue(this.enabled);
			},
		},
	};

</script>
