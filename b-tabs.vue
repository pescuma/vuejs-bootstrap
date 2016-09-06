<template>
	<div :class="colspanClass">
		<ul class="nav nav-tabs" style="margin-bottom: 20px">
			<li v-for="tab in tabs" :class="{ active: tab.active }" @click="tab.active = true">
				<a>{{ tab.title }}</a>
			</li>
		</ul>

		<div class="tab-content">
			<slot></slot>
		</div>
	</div>
</template>

<script>

	module.exports = {
		tag: 'b-tabs',
		mixins: [require('./mixin-colspan.js')],
		props: {
			activeTab: {
				default: 0
			}
		},
		data: function() {
			return {
				tabs: []
			};
		},
		ready: function() {
			var self = this;

			for (var i = 0; i < this.$children.length; ++i) {
				var child = this.$children[i];

				if (child.$options.name != 'b-tab')
					continue;

				child._index = this.tabs.length;
				this.tabs.push(child);

				child.$watch('active', function(active) {
					if (!active)
						return;

					for (var j = 0; j < self.tabs.length; ++j) {
						if (j === this._index)
							continue;

						self.tabs[j].active = false;
					}

					self.activeTab = this._index;
				});
			}

			this.tabs[this.activeTab].active = true;
		},
		watch: {
			'activeTab': function(val, oldVal) {
				oldVal = oldVal || 0;
				val = parseInt(val) || 0;
				val = Math.min(Math.max(val, 0), this.tabs.length);

				for (var j = 0; j < this.tabs.length; ++j)
					this.tabs[j].active = (j === val);
			}
		}
	};

</script>
