import Vue from 'vue'
import Vuetify from 'vuetify'
import colors from 'vuetify/es5/util/colors'

Vue.use(Vuetify, {
  theme: {
    primary: '#0C0D12', // a color that is not in the material colors palette
    accent: '#1D09DB',
    secondary: '#B3B8C8',
    light: '#EBEDF5',
    info: colors.teal.lighten1,
    error: colors.deepOrange.accent4,
  }
})
