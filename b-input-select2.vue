<template>
	<div class="form-group" :class="colspanClass">
		<label :for="id">{{ label }}</label>
		<select v-el:select :id="id" class="form-control" :multiple="isMultiple" :disabled="isDisabled" :readonly="isReadonly" :required="isRequired">
			<option v-if="!isMultiple && isAllowClear"></option>
			<option v-for="o in processedOptions" value="{{ o.key }}">{{{ o.render }}}</option>
		</select>
	</div>
</template>

<script>

	var utils = require('./utils.js');

	module.exports = {
		name: 'b-input-select2',
		mixins: [require('./mixin-colspan.js'), require('./mixin-input.js')],
		props: {
			multiple: {},
			allowClear: {},
			emptyText: {},
			options: {
				type: Array,
				required: true
			},
			model: {},
			render: {},
			key: {}
		},
		computed: {
			isMultiple: function() {
				return utils.isTrue(this.multiple);
			},
			isAllowClear: function() {
				return utils.isTrue(this.allowClear);
			},
			renderFunc: function() {
				return utils.createRenderFunction(this.render);
			},
			keyFunc: function() {
				return utils.createRenderFunction(this.key);
			},
			processedOptions: function() {
				let result = [];

				let opts = (this.options || []);
				for (var i = 0; i < opts.length; ++i) {
					let o = opts[i];
					result.push({
						obj: o,
						key: this.keyFunc(o),
						render: this.renderFunc(o)
					});
				}

				return result;
			}
		},
		attached: function() {
			var self = this;

			var s = $(this.$els.select);

			s.select2({
				placeholder: this.emptyText,
				allowClear: this.isAllowClear
			});

			var model = this.keyFunc(self.model);
			s.val(model).trigger('change');

			s.on('change', function() {
				var candidate = $(this).val();
				var model = self.keyFunc(self.model);

				if (!self._selectedEquals(model, candidate)) {
					model = self._fixSelected(candidate);

					self.processedOptions.forEach(o => {
						if (o.key === model)
							self.model = o.obj;
					});
				}
			});

			this._attached = true;
		},
		detached: function() {
			this._attached = false;

			$(this.$els.select)
				.off()
				.select2('destroy');
		},
		watch: {
			'model': function(val, oldVal) {
				if (!this._attached)
					return;

				var s = $(this.$els.select);

				var current = s.val();
				var model = this.keyFunc(val);

				if (!this._selectedEquals(model, current)) {
					s.val(model).trigger('change');
				}
			},
			'options': function(val, oldVal) {
				if (!this._attached)
					return;

				var s = $(this.$els.select);

				s.trigger('change');
			},
		},
		methods: {
			_fixSelected: function(s) {
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
			_selectedEquals: function(a, b) {
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

