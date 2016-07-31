<template>
	<button :type="type" id="id" :class="classes" :class="colspanClass" :disabled="isDisabled">
		{{ caption }}
		<slot></slot>
	</button>
</template>

<script>

	var utils = require('./utils.js');

	module.exports = {
		tag: 'b-button',
		mixins: [require('./mixin-colspan.js'), require('./mixin-button.js')],
		props: {
			enabled: {
				default: true
			},
		},
		computed: {
			isDisabled: function () {
				return !utils.isTrue(this.enabled);
			},
		},
	};

</script>
