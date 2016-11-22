<template>
	<div class="form-group" :class="colspanClass">
		<div class="checkbox">
			<label>
				<input type="checkbox" :id="id" :disabled="isDisabled" :readonly="isReadonly" v-model="model">
				{{ label }}
			</label>
		</div>
	</div>
</template>

<script>
	
	module.exports = {
		name: 'b-input-checkbox',
		mixins: [require('./mixin-colspan.js'), require('./mixin-input.js')],
		props: {
			model: {
				type: Boolean
			}
		}
	};

</script>
