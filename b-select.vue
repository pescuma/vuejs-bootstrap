<template>
	<b-col-sm :colspan="colspan" :coloffset="coloffset">
		<select :id="id" :class="class" style="width: 100%" :multiple="isMultiple" :disabled="isDisabled" :readonly="isReadonly" :required="isRequired" v-model="selectedKey">
			<option v-if="!isMultiple && isAllowClear"></option>
			<option v-for="o in processedOptions" value="{{ o.key }}">{{{ o.render }}}</option>
		</select>
	</b-col-sm>
</template>

<script>
	
	module.exports = {
		name: 'b-select',
		mixins: [require('./mixin-select.js')],
	};

</script>
