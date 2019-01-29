import axios from "axios";

const API_BASEURL = 'localhost:8080/';

const state = () => ({
  categories: [],
  category: ''
})

const mutations = {
  setCategories(state, payload) {
    state.categories = payload;
  },
  setCategory(state, payload) {
    state.category = payload;
  },
};

const actions = {
  setCategories({commit}, payload){
    commit('setCategories', payload);
  },
  API_GET_CATEGORIES_ALL({commit, rootState}) {
    let user = rootState.user.user;
    return axios({
      method: 'get',
      url: API_BASEURL + 'Kategorie',
      auth: {
        username: user != null ? user.userid : 'gast',
        password: user != null ? user.userid : 'gast'
      }
      })
      .then(response => {
        commit('setCategories', response.data);
      })
      .catch(error => {
        let errorMessage = JSON.parse(error.request.response)[0].message;
        return Promise.reject(errorMessage);
      })
  },
  API_POST_CATEGORY({commit, rootState}, payload) {
    let mod = rootState.mod.mod;
    if (mod) {
    return axios({
      method: 'post',
      url: API_BASEURL + 'Kategorie',
      data: payload,
      auth: {
        username: mod.modId,
        password: mod.modId
      }
      })
      .then(response => {
        return 'You successfully added a new category!'
      })
      .catch(error => {
        let errorMessage = JSON.parse(error.request.response)[0].message;
        return Promise.reject(errorMessage);
      })
    }
  },
  API_DELETE_CATEGORY({commit, rootState}, payload) {
    let mod = rootState.mod.mod;
    if (mod) {
    return axios({
      method: 'delete',
      url: API_BASEURL + `Kategorie/${payload}`,
      auth: {
        username: mod.modId,
        password: mod.modId
      }
      })
      .then(response => {
        return 'You successfully deleted a category!'
      })
      .catch(error => {
        let errorMessage = JSON.parse(error.request.response)[0].message;
        return Promise.reject(errorMessage);
      })
    } else {
      Promise.reject('You need to log into your mod account to delete a category!');
    }
  },
  setCategory({commit}, payload) {
    commit('setCategory', payload);
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
}