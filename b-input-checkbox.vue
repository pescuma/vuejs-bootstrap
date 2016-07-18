<template>
	<b-col-sm :cols="colspan">
		<div class="checkbox">
			<label>
				<input type="checkbox" :id="id" :disabled="isDisabled" :readonly="isReadonly" v-model="model">
				{{ label }}
			</label>
		</div>
	</b-col-sm>
</template>

<script>
	
	module.exports = {
		tag: 'b-input-checkbox',
		mixins: [require('./mixin-colspan.js'), require('./mixin-input.js')],
		props: {
			model: {
				twoWay: true,
				type: Boolean
			}
		}
	};

</script>
