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

<template>
	<div class="modal-open fullscreen">
		<div class="modal-backdrop in"></div>

		<div class="modal in" role="dialog">
			<div :class="classes" role="document">
				<div class="modal-content">
					<slot></slot>
				</div>
			</div>
		</div>
	</div>
</template>

<script>

	module.exports = {
		name: 'b-modal',
		props: {
			class: {},
			size: {
				type: String,
				default: function() {
					return 'default';
				}
			},
		},
		computed: {
			classes: function() {
				var result = {
					'modal-dialog': true,
				};

				switch (this.size) {
					case 'large':
					case 'lg':
						result['modal-lg'] = true;
						break;
					case 'small':
					case 'sm':
						result['modal-sm'] = true;
						break;
				}

				return [result, this.class];
			}
		}
	};

</script>


