import Vue from 'vue'
import Vuex from 'vuex'
import chapters from './chapters'
import user from './user'
import snackbar from './snackbar'
import worlds from './worlds'
import categories from './categories'
import mod from './mod'

Vue.use(Vuex)

export default () => {
  return new Vuex.Store({
    actions: {
      async nuxtServerInit ({ commit, dispatch }, pageContext) {
        dispatch('chapters/API_GET_ALL_CHAPTERS');
      }
    },
    modules: {
      chapters,
      user,
      snackbar,
      worlds,
      categories,
      mod
    }
  })
}