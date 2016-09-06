<template>
	<div :class="colspanClass" v-if="colspan || coloffset">
		<slot></slot>
	</div>
	<slot v-else></slot>
</template>

<script>

	module.exports = {
		name: 'b-col-sm',
		mixins: [require('./mixin-colspan.js')],
	};

</script>
