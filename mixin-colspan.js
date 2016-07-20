module.exports = {
	props: {
		colspan: {
			validator: function (value) {
				if (!value)
					return true;
				
				value = parseInt(value);
				return value >= 1 && value <= 12;
			}
		},
	},
	computed: {
		colspanClass: function () {
			if (this.colspan)
				return 'col-sm-' + this.colspan;
			else
				return '';
		}
	},
	components: {
		'b-col-sm': require('./b-col-sm.vue')
	}
};

