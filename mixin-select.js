var utils = require('./utils.js');

module.exports = {
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
		key: {},
		class: {},
	},
	data: function() {
		return {
			selectedKey: null
		};
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
	watch: {
		'model': function(val, oldVal) {
			this._updateFromModel();
		},
		'key': function(val, oldVal) {
			this._updateFromModel();
		},
		'selectedKey': function(val, oldVal) {
			this._updateFromSelect();
		},
	},
	methods: {
		_updateFromModel: function() {
			var model = this.keyFunc(this.model);
			
			if (!this._selectedEquals(model, this.selectedKey)) {
				this.selectedKey = model;
			}
		},
		_updateFromSelect: function() {
			var model = this.keyFunc(this.model);
			
			if (!this._selectedEquals(model, this.selectedKey)) {
				model = this._fixSelected(this.selectedKey);
				
				var newVal;
				this.processedOptions.forEach(o => {
					if (o.key === model)
						newVal = o.obj;
				});
				
				this.model = newVal;
			}
		},
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


