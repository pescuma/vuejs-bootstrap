<template>
	<div class="form-group" :class="colspanClass">
		<label>{{ label || '&nbsp;' }}</label>
		<p :class="{ 'form-control-static': true, 'form-control-static-disabled': isDisabled }">
			<slot></slot>
		</p>
	</div>
</template>

<script>
	
	module.exports = {
		name: 'b-input-display',
		mixins: [require('./mixin-colspan.js'), require('./mixin-input.js')],
	};

</script>
