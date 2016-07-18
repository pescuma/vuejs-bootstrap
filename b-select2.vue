<template>
	<b-col-sm :cols="colspan">
		<div class="form-group">
			<label :for="id">{{ label }}</label>
			<select v-el:select :id="id" class="form-control" :multiple="isMultiple" :disabled="isDisabled" :readonly="isReadonly">
				<option v-if="!isMultiple && isAllowClear"></option>
				<option v-for="o in options" value="{{ o }}">{{ render ? render(o) : o }}</option>
			</select>
		</div>
	</b-col-sm>
</template>

<script>
	
	var utils = require('./utils.js');
	
	module.exports = {
		tag: 'b-select2',
		mixins: [require('./mixin-colspan.js'), require('./mixin-input.js')],
		props: {
			multiple: {},
			allowClear: {},
			emptyText: {},
			options: {
				type: Array,
				required: true
			},
			model: {
				twoWay: true
			},
			render: Function
		},
		computed: {
			isMultiple: function () {
				return utils.isTrue(this.multiple);
			},
			isAllowClear: function () {
				return utils.isTrue(this.allowClear);
			},
		},
		attached: function () {
			var self = this;
			
			var s = $(this.$els.select);
			
			s.select2({
				placeholder: this.emptyText,
				allowClear: this.isAllowClear
			});
			
			s.val(self.model).trigger('change');
			
			s.on('change', function () {
				var candidate = $(this).val();
				
				if (!self._selectedEquals(self.model, candidate))
					self.model = self._fixSelected(candidate);
				
				return;
			});
		},
		detached: function () {
			$(this.$els.select)
				.off()
				.select2('destroy');
		},
		watch: {
			'model': function (val, oldVal) {
				var s = $(this.$els.select);
				
				var current = s.val();
				
				if (!this._selectedEquals(val, current))
					s.val(val).trigger('change');
				
				return;
			},
		},
		methods: {
			_fixSelected: function (s) {
				if (this.isMultiple) {
					if (!s)
						return [];
				} else {
					if (this.isAllowClear)
						if (!s)
							return null;
				}
				
				return s;
			},
			_selectedEquals: function (a, b) {
				a = this._fixSelected(a);
				b = this._fixSelected(b);
				
				if (this.isMultiple) {
					if (a.length != b.length)
						return false;
					
					for (var i = 0; i < a.length; ++i)
						if (a[i] !== b[i])
							return false;
					
					return true;
					
				} else {
					return a == b;
				}
			}
		}
	};

</script>
