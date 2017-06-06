<template>
	<div class="form-group" :class="colspanClass">
		<label :for="id" v-if="showLabel">{{ label }}</label>
		<input :type="type" class="form-control" :id="id" :placeholder="emptyText" :disabled="isDisabled" :readonly="isReadonly" :required="isRequired"
		       :maxlength="maxlength" v-model="model">
	</div>
</template>

<script>
	
	var utils = require('./utils.js');
	
	module.exports = {
		name: 'b-input-password',
		mixins: [require('./mixin-colspan.js'), require('./mixin-input.js')],
		props: {
			emptyText: String,
			maxlength: {},
			model: {},
			showPassword: {
				default: false
			},
		},
		computed: {
			type: function() {
				if (utils.isTrue(this.showPassword))
					return 'text';
				else
					return 'password';
			}
		}
	};

</script>
