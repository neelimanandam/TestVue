import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify)

const opts = {
  icons: {
    iconfont: 'faSvg'
  },
  theme: {
    themes: {
      light: {
        primary: '#f58426',
        secondary: '#b0bec5',
        anchor: '#8c9eff',
      },
    },
  }
}

export default new Vuetify(opts)