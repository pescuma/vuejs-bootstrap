<template>
	<b-col-sm :cols="colspan">
		<div class="form-group">
			<label :for="id">{{ label }}</label>
			<input type="text" class="form-control" :id="id" :placeholder="emptyText" :disabled="!enabled" :readonly="readonly" v-model="model">
		</div>
	</b-col-sm>
</template>

<script>
	
	module.exports = {
		tag: 'b-input-text',
		mixins: [require('./mixin-colspan.js'), require('./mixin-input.js')],
		props: {
			emptyText: String,
			model: {
				twoWay: true
			}
		}
	};

</script>
