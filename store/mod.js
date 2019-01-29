import axios from "axios";

const API_BASEURL = 'localhost:8080/';


const state = () => ({
  mod: null
})

const mutations = {
  setMod(state, payload) {
    state.mod = payload;
  },
};

const actions = {
  API_POST_MOD({commit}, payload) {
    return axios({
      method: 'post',
      url: API_BASEURL + 'Moderator',
      data: payload,
      })
      .then(response => {
        commit('setMod', response.data);
        return 'You successfully registered your mod account!'
      })
      .catch(error => {
        let errorMessage = JSON.parse(error.request.response)[0].message;
        return Promise.reject(errorMessage);
      })
  },
  signIn({commit}, payload) {
    return axios({
      method: 'get',
      url: API_BASEURL + `Moderator/${payload.modId}`,
      })
      .then(response => {
        commit('setMod', response.data);
        return 'You successfully signed into your mod account!'
      })
      .catch(error => {
        let errorMessage = JSON.parse(error.request.response)[0].message;
        return Promise.reject(errorMessage);
      })
  },
  logout({commit}) {
    commit('setMod', null);
  }
  
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
}