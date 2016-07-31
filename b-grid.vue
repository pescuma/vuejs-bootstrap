<style scoped>
	table.table thead tr th.order {
		position: relative;
		padding-right: 20px;
		cursor: pointer;
	}
	
	table.table thead tr th.order-desc:after {
		opacity: 1;
		content: "\e252";
	}
	
	table.table thead tr th.order-asc:after {
		opacity: 1;
		content: "\e253";
	}
	
	table.table thead tr th.order-no:after {
		opacity: 0.4;
		content: "\e252";
	}
	
	table.table thead tr th.order:after {
		font-family: "Glyphicons Halflings";
		font-size: 10px;
		position: absolute;
		top: 8px;
		right: 5px;
		display: block;
		box-sizing: border-box;
	}
	
	table.table thead tr th {
		text-align: center;
		vertical-align: top;
	}
	
	table.nowrap {
		table-layout: fixed;
	}
	
	table.table thead tr th.nowrap, table.table thead tr tr.nowrap {
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
</style>

<template>
	<div :class="colspanClass">
		<table v-el:table :class="tableClass" cellspacing="0" width="100%">
			<thead>
				<tr v-for="hr in headers">
					<th v-for="h in hr" :rowspan="h.rowspan" :colspan="h.colspan" :width="h.width"
					    :class="[_orderClass(h), h.class, thClass]" @click="_orderByTh(h)">{{ h.title }}</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="line in rows">
					<td v-for="r in line" :class="[r.class, trClass]">{{{ r.value }}}</td>
				</tr>
			</tbody>
		</table>
		<nav v-if="pagingItems">
			<ul class="pagination" style="margin-top: 0">
				<li :class="{ disabled: pageIndex == 0 }"><a @click="pageIndex = 0">&laquo;</a></li>
				<li v-for="i in pagingItems" :class="{ active: pageIndex == i.val }"><a @click="pageIndex = i.val">{{ i.name }}</a></li>
				<li :class="{ disabled: pageIndex == lastPage }"><a @click="pageIndex = lastPage">&raquo;</a></li>
			</ul>
		</nav>
		<slot></slot>
	</div>
</template>

<script>
	
	var Vue = require('vue');
	var utils = require('./utils.js');
	
	function _addTitleToWrapedElement() {
		var $el = $(this);
		var title = $el.attr('title');
		var needs = (this.scrollWidth > this.clientWidth);
		if (needs) {
			if (!title) {
				$el.attr('title', $el.text().trim());
			}
		} else {
			if (title == $el.text().trim()) {
				$el.removeAttr('title');
			}
		}
	}
	
	module.exports = {
		tag: 'b-grid',
		mixins: [require('./mixin-colspan.js'), require('./mixin-columns.js')],
		props: {
			model: Array,
			pageSize: {
				default: null
			},
			pageIndex: {
				default: 0
			},
			orderBy: {
				default: 0
			},
			orderAsc: {
				default: false
			},
			wrapLines: {
				default: false
			},
			striped: {
				default: false
			},
			bordered: {
				default: false
			},
			hover: {
				default: false
			},
			condensed: {
				default: false
			},
		},
		computed: {
			tableClass: function () {
				return {
					'table': true,
					'table-striped': utils.isTrue(this.striped),
					'table-bordered': utils.isTrue(this.bordered),
					'table-hover': utils.isTrue(this.hover),
					'table-condensed': utils.isTrue(this.condensed),
					'nowrap': !utils.isTrue(this.wrapLines)
				};
			},
			thClass: function () {
				return {
					'nowrap': !utils.isTrue(this.wrapLines)
				};
			},
			trClass: function () {
				return {
					'nowrap': !utils.isTrue(this.wrapLines)
				};
			},
			sortedData: function () {
				var result = this.model;
				
				if (result === undefined)
					result = [];
				
				if (!utils.isFalse(this.orderBy) && this.columns.length) {
					var orderBy = parseInt(this.orderBy) || 0;
					var sortCol = this.columns[orderBy];
					if (!sortCol)
						return result;
					
					var getter;
					if (utils.is(sortCol.order, String)) {
						getter = utils.getter(sortCol.order);
					} else if (utils.is(sortCol.order, Function)) {
						getter = sortCol.order;
					} else if (utils.is(sortCol.render, String)) {
						getter = utils.getter(sortCol.render);
					} else if (utils.is(sortCol.render, Function)) {
						getter = sortCol.render;
					} else {
						// Can't sort
						return result;
					}
					
					var asc = utils.isTrue(this.orderAsc);
					
					result = result.slice();
					
					result.sort(function (a, b) {
						var va = getter(a);
						var vb = getter(b);
						
						if (va < vb) {
							return asc ? -1 : 1;
						}
						
						if (va > vb) {
							return asc ? 1 : -1;
						}
						
						return 0;
					});
				}
				
				return result;
			},
			rows: function () {
				var result = [];
				
				var data = this.sortedData;
				
				var pi = parseInt(this.pageIndex) || 0;
				var ps = parseInt(this.pageSize);
				
				var start, end;
				if (this.pageSize) {
					start = Math.min(Math.max(ps * pi, 0), data.length);
					end = Math.min(start + ps, data.length);
				} else {
					start = 0;
					end = data.length;
				}
				
				var renders = [];
				for (var j = 0; j < this.columns.length; ++j) {
					var col = this.columns[j];
					var render;
					
					if (utils.is(col.render, String)) {
						render = (function () {
							var getter = utils.getter(col.render);
							return function (obj) {
								return utils.htmlEncode(getter(obj));
							};
						})();
					} else if (utils.is(col.render, Function)) {
						render = col.render;
					} else {
						render = function (obj) {
							return utils.htmlEncode(obj);
						};
					}
					
					renders.push(render);
				}
				
				for (var i = start; i < end; ++i) {
					var line = [];
					var dataLine = data[i];
					
					for (var j = 0; j < this.columns.length; ++j) {
						line.push({
							value: renders[j](dataLine),
							class: this.columns[j].class
						});
					}
					
					result.push(line);
				}
				
				return result;
			},
			lastPage: function () {
				if (!this.pageSize)
					return 0;
				
				if (!this.model.length)
					return 0;
				
				return Math.floor((this.model.length - 1) / this.pageSize);
			},
			pagingItems: function () {
				if (!this.pageSize)
					return null;
				
				if (!this.model.length)
					return null;
				
				var borders = 2;
				
				var min = Math.max(this.pageIndex - borders, 0);
				var max = Math.min(min + 2 * borders, this.lastPage);
				min = Math.max(max - 2 * borders, 0);
				
				if (min == max) {
					return null;
				}
				
				var result = [];
				for (var i = min; i <= max; ++i)
					result.push({
						name: i + 1,
						val: i
					});
				return result;
			}
		},
		methods: {
			_orderClass: function (th) {
				return {
					'order': th.order,
					'order-no': th.order && th.index != this.orderBy,
					'order-asc': th.order && th.index == this.orderBy && utils.isTrue(this.orderAsc),
					'order-desc': th.order && th.index == this.orderBy && !utils.isTrue(this.orderAsc)
				};
			},
			_orderByTh: function (header) {
				if (!header.order)
					return;
				
				if (this.orderBy == header.index) {
					this.orderAsc = !utils.isTrue(this.orderAsc);
				} else {
					this.orderBy = header.index;
					this.orderAsc = false;
				}
			},
		},
		attached: function () {
			if (!utils.isTrue(this.wrapLines)) {
				var self = this;
				
				Vue.nextTick(function () {
					$(self.$els.table)
						.on('mouseenter', 'th,td', _addTitleToWrapedElement);
				});
			}
		},
		detached: function () {
			$(this.$els.table)
				.off('mouseenter', 'th,td', _addTitleToWrapedElement);
		}
	};

</script>
