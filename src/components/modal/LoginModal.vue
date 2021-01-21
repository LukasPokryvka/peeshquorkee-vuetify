<template>
	<v-dialog max-width="290" class="p-4" v-model="dialog">
		<template v-slot:activator="{ on, attrs }">
			<v-btn color="secondary" dark v-bind="attrs" v-on="on">
				Login
			</v-btn>
		</template>
		<v-card>
			<v-card-title class="headline">
				Login
			</v-card-title>
			<v-form v-model="valid" class="login-form" @keyup.native.enter="login()">
				<v-row>
					<v-text-field
						v-model="email"
						:rules="emailRules"
						label="E-mail"
						required
					></v-text-field>
				</v-row>
				<v-row>
					<v-text-field
						v-model="password"
						:rules="passwordRules"
						label="Password"
						required
						type="password"
					></v-text-field>
				</v-row>
			</v-form>
			<v-card-actions class="login-button d-flex justify-center mt-2">
				<v-btn color="secondary" @click="login()">
					Login
				</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script>
import axios from 'axios'
import md5 from 'md5'

export default {
	data() {
		return {
			dialog: false,
			valid: false,
			email: '',
			emailRules: [
				v => !!v || 'E-mail is required',
				v =>
					/^(([^<>()[\]\\.,;:\s@']+(\.[^<>()\\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
						v
					) || 'E-mail must be valid'
			],
			password: '',
			passwordRules: [
				v => !!v || 'Password is required',
				v => v.length <= 12 || 'Password must be less than 12 characters',
				v => v.length > 4 || 'Password must be more than 4 characters'
			],
			notRegistered: false
		}
	},
	methods: {
		login() {
			this.notRegistered = false

			if (this.valid) {
				axios
					.post('http://192.168.100.24:42069/userLogin', {
						email: this.email,
						password: md5(this.password)
					})
					.then(res => {
						console.log(res)
						if (res.data.user === 'Not Registered') {
							this.notRegistered = true
						} else {
							this.$store.dispatch('loginUser', res.data)
						}
						this.dialog = false
					})
			}
		}
	}
}
</script>

<style lang="scss" scoped>
.login-form {
	padding: 0 1rem;
}

.v-dialog > .v-card > .v-card__title {
	padding: 0 0 1rem 0;
}

.v-card {
	padding: 1rem;
}

.v-dialog > .v-card > .v-card__actions {
	padding: 8px 0 0 0;
}
</style>
