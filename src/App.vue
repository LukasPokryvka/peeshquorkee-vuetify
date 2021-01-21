<template>
	<v-app id="inspire">
		<Header />

		<v-main class="lighten-3 main-content">
			<v-container>
				<v-row>
					<v-col cols="4">
						<Chat />
					</v-col>

					<v-col>
						<Game />
					</v-col>
				</v-row>
			</v-container>
		</v-main>
	</v-app>
</template>

<script>
import Chat from './components/chat/Chat'
import Header from './components/header/Header'
import Game from './components/game/Game'

export default {
	name: 'App',

	components: { Chat, Header, Game }
}
</script>

<style lang="scss" scoped>
.main-content {
	background-color: #ff9671;
}
</style>
