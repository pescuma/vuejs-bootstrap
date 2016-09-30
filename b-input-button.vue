<template>
	<div class="form-group" :class="colspanClass">
		<label :for="id" v-if="showLabel">{{ label }}</label>
		<button :type="type" id="id" :class="classes" :disabled="isDisabled">
			{{ caption }}
			<slot></slot>
		</button>
	</div>
</template>

<script>

	module.exports = {
		name: 'b-input-button',
		mixins: [require('./mixin-colspan.js'), require('./mixin-input.js'), require('./mixin-button')],
	};

</script>

