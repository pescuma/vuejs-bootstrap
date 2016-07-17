<template>
	<div class="modal-open fullscreen">
		<div class="modal-backdrop in"></div>
		
		<div class="modal in" role="dialog">
			<div class="modal-dialog" role="document">
				<div class="modal-content">
					<slot></slot>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	
	module.exports = {
		tag: 'b-modal'
	};

</script>

<style scoped>
	
	.fullscreen {
		position: fixed;
		width: 100%;
		height: 100%;
		left: 0;
		top: 0;
	}
	
	.modal.in {
		display: block;
	}

</style>

