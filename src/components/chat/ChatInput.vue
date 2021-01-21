<template>
	<div class="input">
		<v-text-field
			class="chat-input"
			hide-details
			@keyup.enter="send()"
			v-model="message"
			dense
			flat
			rounded
			filled
		>
			<v-icon dense slot="append" color="primary">
				mdi-send
			</v-icon>
		</v-text-field>
	</div>
</template>

<script>
export default {
	data: () => ({
		message: ''
	}),
	methods: {
		send() {
			this.$emit('send-message', this.message)
			this.message = ''
		}
	}
}
</script>

<style lang="scss" scoped>
.chat-input {
	padding: 0;
	margin: 0;
}
</style>
