<template>
	<div class="form-group" :class="colspanClass">
		<label :for="id" v-if="showLabel">{{ label }}</label>
		<input type="text" class="form-control" :id="id" :placeholder="emptyText" :disabled="isDisabled" :readonly="isReadonly" :required="isRequired"
		       :maxlength="maxlength" v-model="model"
		       :onkeyup="onkeyup">
	</div>
</template>

<script>
	
	module.exports = {
		name: 'b-input-text',
		mixins: [require('./mixin-colspan.js'), require('./mixin-input.js')],
		props: {
			emptyText: String,
			maxlength: {},
			model: {},
			onkeyup: {}
		}
	};

</script>
