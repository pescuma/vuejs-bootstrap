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
			var result = {};
			
			if (this.colspan)
				result['col-sm-' + this.colspan] = true;
			
			if (this.coloffset)
				result['col-sm-offset-' + this.coloffset] = true;
			
			return result;
		}
	}
};

