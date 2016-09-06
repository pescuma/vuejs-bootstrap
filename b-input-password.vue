<template>
	<div class="form-group" :class="colspanClass">
		<label :for="id">{{ label }}</label>
		<input type="password" class="form-control" :id="id" :placeholder="emptyText" :disabled="isDisabled" :readonly="isReadonly" :required="isRequired"
		       :maxlength="maxlength" v-model="model">
	</div>
</template>

<script>
	
	module.exports = {
		name: 'b-input-password',
		mixins: [require('./mixin-colspan.js'), require('./mixin-input.js')],
		props: {
			emptyText: String,
			maxlength: {},
			model: {}
		}
	};

</script>
