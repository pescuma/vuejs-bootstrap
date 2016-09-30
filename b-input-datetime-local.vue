<template>
	<div class="form-group" :class="colspanClass">
		<label :for="id" v-if="showLabel">{{ label }}</label>
		<input type="datetime-local" class="form-control" :id="id" :placeholder="emptyText" :disabled="isDisabled" :readonly="isReadonly" :required="isRequired"
		       :min="min" :max="max" :step="step" v-model="value">
	</div>
</template>

<script>

	var moment = require('moment');

	module.exports = {
		name: 'b-input-text',
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
				if (value !== this.value) {
					this.value = value;
				}
			},
			value: function() {
				var model = this.toModel(this.value);
				if (model !== this.model) {
					this.model = model;
				}
			}
		},
		methods: {
			toValue: function(model) {
				if (model === '' || model === null || model === undefined) {
					return '';
				} else {
					return moment(model).format('YYYY-MM-DDTHH:mm');
				}
			},
			toModel: function(value) {
				if (value === '' || value === null || value === undefined) {
					return null;
				} else {
					return moment(value).toDate();
				}
			}
		}
	};

</script>
