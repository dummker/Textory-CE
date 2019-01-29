import axios from "axios";

const API_BASEURL = 'localhost:8080/';

const state = () => ({
  message: '',
  type: ''
})

const mutations = {
  setMessage(state, payload) {
    state.message = payload;
  },
  setType(state, payload) {
    state.type = payload;
  }
};

const actions = {
  setSnackbar({commit}, payload){
    commit('setMessage', payload.message);
    commit('setType', payload.type);
  },
  resetSnackbar({commit}){
    commit('setMessage', '');
    commit('setType', '');
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
}