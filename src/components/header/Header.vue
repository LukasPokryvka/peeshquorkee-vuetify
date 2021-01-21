<template>
	<v-app-bar app color="white" flat>
		<v-container class="py-0 fill-height d-flex justify-space-between">
			<div class="d-flex align-center">
				<v-avatar
					v-if="getIsLoggedIn"
					class="mr-3"
					color="grey darken-1"
					size="50"
				>
					<img :src="getUser.avatar" alt="avatar" />
				</v-avatar>
				<h2 v-if="getIsLoggedIn" class="mr-10">{{ getUser.nickname }}</h2>
			</div>

			<div>
				<LoginModal v-if="!getIsLoggedIn" />
				<v-btn v-else color="primary" @click="logout()">
					Logout
				</v-btn>
				<RegisterModal v-if="!getIsLoggedIn" class="register-modal" />
			</div>
		</v-container>
	</v-app-bar>
</template>

<script>
import LoginModal from '../modal/LoginModal'
import RegisterModal from '../modal/RegisterModal'
export default {
	components: {
		LoginModal,
		RegisterModal
	},
	methods: {
		logout() {
			this.$store.dispatch('logout')
		}
	},
	computed: {
		getUser() {
			return this.$store.getters.getUser
		},
		getIsLoggedIn() {
			return this.$store.getters.getIsLoggedIn
		}
	}
}
</script>

<style lang="scss" scoped>
.register-modal {
	margin-left: 10px;
}
</style>
