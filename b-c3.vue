<template>
	<div :class="[ colspanClass, class ]">
		<div v-el:chart></div>
	</div>
</template>

<script>
	
	var c3 = require('c3');
	var clone = require('clone');
	
	module.exports = {
		name: 'b-c3',
		mixins: [require('./mixin-colspan.js')],
		props: {
			config: {},
			class: {},
			width: {},
			height: {},
		},
		methods: {
			clear: function() {
				if (this.chart) {
					this.chart.destroy();
					delete this.chart;
					
					this.$els.chart.innerHtml = '';
				}
			},
			rebuild: function() {
				this.clear();
				
				var config = clone(this.config);
				config.bindto = this.$els.chart;
				
				var width = parseInt(this.width);
				var height = parseInt(this.height);
				if (width || height) {
					if (!config.size)
						config.size = {};
					
					if (width)
						config.size.width = width;
					if (height)
						config.size.height = height;
				}
				
				this.chart = c3.generate(config);
			}
		},
		watch: {
			config: function() {
				this.rebuild();
			}
		},
		ready: function() {
			this.rebuild();
		},
		beforeDestroy: function() {
			this.clear();
		}
	};

</script>
