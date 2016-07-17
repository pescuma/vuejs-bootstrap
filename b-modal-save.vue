<template>
	<b-modal>
		<b-modal-header>
			<button type="button" class="close" aria-hidden="true" @click.stop="onCancel">&times;</button>
			<h4 class="modal-title">{{ title }}</h4>
		</b-modal-header>
		<b-modal-body>
			<slot></slot>
		</b-modal-body>
		<b-modal-footer>
			<b-button :label="labelCancel" @click.stop="onCancel"></b-button>
			<b-button type="primary" :label="labelSave" @click.stop="onSave"></b-button>
		</b-modal-footer>
	</b-modal>
</template>

<script>
	
	module.exports = {
		tag: 'b-modal-save',
		props: {
			title: {},
			labelCancel: {
				default: function () {
					return 'Cancel';
				}
			},
			labelSave: {
				default: function () {
					return 'Save';
				}
			},
		},
		methods: {
			onCancel: function () {
				this.$emit('cancel');
			},
			onSave: function () {
				this.$emit('save');
			},
		},
		components: {
			'b-modal': require('./b-modal.vue'),
			'b-modal-header': require('./b-modal-header.vue'),
			'b-modal-body': require('./b-modal-body.vue'),
			'b-modal-footer': require('./b-modal-footer.vue'),
		}
	};

</script>

<style scoped>
</style>
