<template>
	<div class="form-group" :class="colspanClass">
		<label :for="id">{{ label || '&nbsp;' }}</label>
		<textarea class="form-control" :id="id" :placeholder="emptyText" :rows="rows" :cols="cols" :disabled="isDisabled" :readonly="isReadonly" :required="isRequired"
		          :maxlength="maxlength" v-model="model"></textarea>
	</div>
</template>

<script>

	module.exports = {
		name: 'b-input-text',
		mixins: [require('./mixin-colspan.js'), require('./mixin-input.js')],
		props: {
			emptyText: String,
			rows: {},
			cols: {},
			maxlength: {},
			model: {}
		}
	};

</script>

