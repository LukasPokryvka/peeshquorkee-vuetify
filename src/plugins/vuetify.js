import Vue from 'vue'
import Vuetify from 'vuetify/lib/framework'

Vue.use(Vuetify)

export default new Vuetify({
	theme: {
		themes: {
			light: {
				primary: '#D65DB1',
				secondary: '#845EC2',
				accent: '#FF6F91',
				info: '#FF9671',
				success: '#FFC75F',
				warning: '#F9F871'
			}
		}
	}
})
