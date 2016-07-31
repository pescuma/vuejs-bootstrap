module.exports = {
	props: {
		colspan: {
			validator: function(value) {
				if (!value)
					return true;
				
				value = parseInt(value);
				return value >= 1 && value <= 12;
			}
		},
		coloffset: {
			validator: function(value) {
				if (!value)
					return true;
				
				value = parseInt(value);
				return value >= 1 && value <= 12;
			}
		},
	},
	computed: {
		colspanClass: function() {
			var result = [];
			
			if (this.colspan)
				result.push('col-sm-' + this.colspan);
			
			if (this.coloffset)
				result.push('col-sm-offset-' + this.coloffset);
			
			return result;
		}
	}
};

