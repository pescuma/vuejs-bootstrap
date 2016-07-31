<template>
	<div :class="colspanClass">
		<div class="panel panel-default">
			<div class="panel-heading" v-if="title">
				<h3 class="panel-title">{{ title }}</h3>
			</div>
			<slot></slot>
		</div>
	</div>
</template>

<script>
	
	module.exports = {
		tag: 'b-panel',
		mixins: [require('./mixin-colspan.js')],
		props: ['title']
	};

</script>

