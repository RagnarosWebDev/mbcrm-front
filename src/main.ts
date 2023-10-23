import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import router from './router'
import 'vue-toastification/dist/index.css'
import Toast from 'vue-toastification'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { createVuetify } from 'vuetify'
import 'vuetify/_styles.scss'
import 'vuetify-datetime-picker/dist/index.js'
import { aliases, mdi } from 'vuetify/iconsets/mdi-svg'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

const app = createApp(App)
app.use(Toast)
app.use(router)
app.use(pinia)
app.use(
  createVuetify({
    components,
    directives,
    theme: {
      defaultTheme: 'dark',
    },
    icons: {
      defaultSet: 'mdi',
      aliases,
      sets: {
        mdi,
      },
    },
  }),
)
app.mount('#app')
