<template>
	<div class="form-group" :class="colspanClass">
		<label :for="id">{{ label || '&nbsp;' }}</label>
		<input type="number" class="form-control" :id="id" :placeholder="emptyText" :disabled="isDisabled" :readonly="isReadonly" :required="isRequired"
		       :min="min" :max="max" :step="step" v-model="value">
	</div>
</template>

<script>
	
	module.exports = {
		name: 'b-input-number',
		mixins: [require('./mixin-colspan.js'), require('./mixin-input.js')],
		props: {
			emptyText: String,
			min: {},
			max: {},
			step: {},
			model: {}
		},
		data: function() {
			var places = this.computeDecimalPlaces(this.step);
			return {
				value: this.toValue(this.model, places)
			};
		},
		computed: {
			decimalPlaces: function() {
				return this.computeDecimalPlaces(this.step);
			}
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
				
				var value = this.toValue(model);
				if (value !== this.value)
					this.value = value;
			}
		},
		methods: {
			computeDecimalPlaces: function(step) {
				var result = 0;
				
				step = parseFloat(step);
				if (isNaN(step))
					return result;
				
				if (step < 0)
					step = -step;
				
				while (step < 1) {
					result++;
					step = step *= 10;
				}
				
				return result;
			},
			toValue: function(model, places) {
				if (places === undefined)
					places = this.decimalPlaces;
				
				if (model === '' || model === null || model === undefined) {
					return '';
				} else {
					model = parseFloat(model);
					return model.toFixed(places);
				}
			},
			toModel: function(value) {
				if (value === '' || value === null || value === undefined) {
					return null;
				} else {
					return parseFloat(value);
				}
			}
		}
	};

</script>
