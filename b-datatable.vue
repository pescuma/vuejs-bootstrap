<style scoped>
	table {
		table-layout: fixed;
	}

	th {
		text-align: center;
		vertical-align: top !important;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	td {
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
</style>

<template>
	<b-col-sm :cols="colspan">
		<table v-el:table class="table table-striped table-bordered table-hover" cellspacing="0" width="100%">
			<thead>
			<tr v-for="hr in headers">
				<th v-for="h in hr" rowspan="{{ h.rowspan }}" colspan="{{ h.colspan }}" width="{{ h.width }}">{{ h.title }}</th>
			</tr>
			</thead>
		</table>
	</b-col-sm>
	<slot></slot>
</template>

<script>

	var Vue = require('vue')
	var Type = require('type-of-is');

	module.exports = {
		tag: 'b-datatable',
		mixins: [require('./mixin-colspan.js'), require('./mixin-columns.js')],
		props: {
			model: Array
		},
		methods: {
			_updateDataTable: function () {
				var self = this;

				Vue.nextTick(function () {
					var cols = [];
					for (var i = 0; i < self.columns.length; ++i) {
						var col = self.columns[i];

						cols.push(self._createColumnConfig(col));
					}

					self.internal_datatable = $(self.$els.table)
							.DataTable({
								destroy: true,
								searching: false,
								lengthChange: false,
								autoWidth: false,
								data: self.model,
								columns: cols
							});
				})
			},
			_createColumnConfig: function (col) {
				var result = {};

				if (Type.is(col.render, String)) {
					result.data = col.render;
					
				} else if (Type.is(col.render, Function)) {
					result.data = null;
					result.render = function (data, type, row) {
						if (type === 'display')
							return col.render(row);
						else
							return row.name;
					};
					
				} else {
					throw 'Column does not have render field';
				}
				
				if (col.width)
					result.width = col.width;

				if (col.class)
					result.className = col.class;

				return result;
			}
		},
		attached: function () {
			this._updateDataTable();
		},
		detached: function () {
			this.internal_datatable.destroy();
			this.internal_datatable = undefined;
		},
		watch: {
			model: function (val, oldVal) {
				this._updateDataTable();
			},
		}
	};

</script>
