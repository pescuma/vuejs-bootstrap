<template>
	<div class="form-group" :class="colspanClass">
		<label :for="id" v-if="showLabel">{{ label }}</label>
		<select :id="id" :class="'form-control'" :class="class" :multiple="isMultiple" :disabled="isDisabled" :readonly="isReadonly" :required="isRequired" v-model="selectedKey">
			<option v-if="!isMultiple && isAllowClear"></option>
			<option v-for="o in processedOptions" value="{{ o.key }}">{{{ o.render }}}</option>
		</select>
	</div>
</template>

<script>
	
	module.exports = {
		name: 'b-input-select',
		mixins: [require('./mixin-select.js')],
	};

</script>

