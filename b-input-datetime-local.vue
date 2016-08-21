<template>
	<div class="form-group" :class="colspanClass">
		<label :for="id">{{ label || '&nbsp;' }}</label>
		<input type="datetime-local" class="form-control" :id="id" :placeholder="emptyText" :disabled="isDisabled" :readonly="isReadonly" :required="isRequired"
		       :min="min" :max="max" :step="step" v-model="value">
	</div>
</template>

<script>
	
	module.exports = {
		tag: 'b-input-text',
		mixins: [require('./mixin-colspan.js'), require('./mixin-input.js')],
		props: {
			emptyText: String,
			min: {},
			max: {},
			step: {},
			model: {}
		},
		data: function() {
			return {
				value: this.toValue(this.model)
			};
		},
		watch: {
			model: function() {
				var value = this.toValue(this.model);
				if (value !== this.value)
					this.value = value;
			},
			value: function() {
				var model = this.toModel(this.value);
				if (model !== this.model)
					this.model = model;
			}
		},
		methods: {
			toValue: function(model) {
				if (model === '' || model === null || model === undefined) {
					return '';
				} else {
					return new Date(model).toJSON().slice(0, 16);
				}
			},
			toModel: function(value) {
				if (value === '' || value === null || value === undefined) {
					return null;
				} else {
					return new Date(value);
				}
			}
		}
	};

</script>
