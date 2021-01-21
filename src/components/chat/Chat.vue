<template>
	<v-sheet rounded="lg" height="60vh" class="chat">
		<transition-group name="messages" tag="ul">
			<ChatMessage
				v-for="message in receivedMessages"
				:key="message.id"
				:message="message"
				:userEmail="getUser.email"
			/>
		</transition-group>

		<ChatInput @send-message="send($event)" />
	</v-sheet>
</template>

<script>
import ChatMessage from './ChatMessage'
import ChatInput from './ChatInput'

import SockJS from 'sockjs-client'
import Stomp from 'webstomp-client'
import { Base64 } from 'js-base64'

import { formatTimestamp } from '../../utilities/timeUtilities'

let stompClient = null
export default {
	components: {
		ChatMessage,
		ChatInput
	},
	data: () => ({
		receivedMessages: [],
		connected: false,
		user: {},
		oldestTimestamp: null,
		firstMessage: true
	}),
	methods: {
		connect() {
			const socket = new SockJS('http://192.168.100.24:42069/chat')
			stompClient = Stomp.over(socket)
			stompClient.connect({}, this.connectCallback, e => {
				console.log(e)
			})
		},
		connectCallback(frame) {
			this.connected = true
			console.log(frame)
			stompClient.subscribe('/topic/chat', tick => {
				console.log(tick)
				const msg = JSON.parse(tick.body)

				this.receivedMessages.push({
					id:
						this.receivedMessages.length > 0
							? this.receivedMessages.reduce(
									(max, msg) => (msg.id > max ? msg.id : max),
									this.receivedMessages[0].id
							  ) + 1
							: 1,
					content: Base64.decode(msg.content),
					email: msg.email,
					timestamp: formatTimestamp(msg.timestamp),
					avatar: msg.avatar,
					nickname: msg.nickname,
					displayHeader: false,
					firstMessage: this.firstMessage ? true : false
				})

				this.firstMessage = false
				this.oldestTimestamp = this.receivedMessages[0].timestamp
				this.formatHeaders()
			})
		},
		send(message) {
			if (stompClient && stompClient.connected) {
				const msg = {
					message: Base64.encode(message),
					nickname: this.getUser.nickname,
					email: this.getUser.email,
					avatar: this.getUser.avatar
				}
				console.log(JSON.stringify(msg))
				stompClient.send('/app/incomingMessage', JSON.stringify(msg), {})
			}
		},
		formatHeaders() {
			this.receivedMessages.forEach((msg, index) => {
				if (index === 0) {
					this.receivedMessages[index].displayHeader = true
				} else if (msg.email !== this.receivedMessages[index - 1].email) {
					this.receivedMessages[index].displayHeader = true
				} else {
					if (!this.receivedMessages[index].firstMessage) {
						this.receivedMessages[index].displayHeader = false
					}
				}
			})
		}
	},
	computed: {
		getUser() {
			return this.$store.getters.getUser
		}
	},
	created() {
		this.connect()
	}
}
</script>

<style lang="scss" scoped>
.chat {
	padding: 0.5rem;
	display: flex;
	flex-flow: column;
}

ul {
	height: 100%;
	padding: 0;
	overflow: scroll;
	overflow-x: hidden;
}

ul::-webkit-scrollbar {
	width: 5px;
}
ul::-webkit-scrollbar-thumb {
	border-radius: 20px;
	border: 3px solid #d65db1;
}

// animations
.messages-enter-active,
.messages-leave-active {
	transition: all 0.15s;
}

.messages-enter-from,
.messages-leave-to {
	opacity: 0;
	transform: scale(0.75);
}
</style>
