<template>
	<div class="form-group" :class="colspanClass">
		<label :for="id" v-if="showLabel">{{ label }}</label>
		<select v-el:select :id="id" class="form-control" :multiple="isMultiple" :disabled="isDisabled" :readonly="isReadonly" :required="isRequired">
			<option v-if="!isMultiple && isAllowClear"></option>
			<option v-for="o in processedOptions" value="{{ o.key }}">{{{ o.render }}}</option>
		</select>
	</div>
</template>

<script>
	
	module.exports = {
		name: 'b-input-select2',
		mixins: [require('./mixin-select2.js')],
	};

</script>

