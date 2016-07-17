<template>
	<b-col-sm :cols="colspan">
		<div class="form-group">
			<label :for="id">{{ label }}</label>
			<select v-el:select :id="id" class="form-control" :multiple="multiple" :disabled="!enabled" :readonly="readonly">
				<option v-if="!multiple && allowClear"></option>
				<option v-for="o in options" value="{{ o }}">{{ render ? render(o) : o }}</option>
			</select>
		</div>
	</b-col-sm>
</template>

<script>
	
	module.exports = {
		tag: 'b-select2',
		mixins: [require('./mixin-colspan.js'), require('./mixin-input.js')],
		props: {
			multiple: Boolean,
			allowClear: Boolean,
			emptyText: String,
			options: {
				type: Array,
				required: true
			},
			model: {
				twoWay: true
			},
			render: Function
		},
		attached: function () {
			var self = this;
			
			var s = $(this.$els.select);
			
			s.select2({
				placeholder: this.emptyText,
				allowClear: this.allowClear
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
				if (this.multiple) {
					if (!s)
						return [];
				} else {
					if (this.allowClear)
						if (!s)
							return null;
				}
				
				return s;
			},
			_selectedEquals: function (a, b) {
				a = this._fixSelected(a);
				b = this._fixSelected(b);
				
				if (this.multiple) {
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
