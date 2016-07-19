<template>
	<b-col-sm :cols="colspan">
		<div class="form-group">
			<label :for="id">{{ label }}</label>
			<input type="number" class="form-control" :id="id" :placeholder="emptyText" :disabled="isDisabled" :readonly="isReadonly" :required="isRequired"
				   :min="min" :max="max" v-model="model">
		</div>
	</b-col-sm>
</template>

<script>

	module.exports = {
		tag: 'b-input-number',
		mixins: [require('./mixin-colspan.js'), require('./mixin-input.js')],
		props: {
			emptyText: String,
			min: {},
			max: {},
			model: {
				twoWay: true
			}
		}
	};

</script>
