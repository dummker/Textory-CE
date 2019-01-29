import axios from "axios";

const API_BASEURL = 'localhost:8080/';

const state = () => ({
  worlds: [],
  world: {}
})

const mutations = {
  setWorlds(state, payload) {
    state.worlds = payload;
  },
  setWorld(state, payload){ 
    state.world = payload;
  },
  setWorldChapterStart(state, payload) {
    state.world.startkapitel = payload;
  },
  setWorldChapterAll(state, payload) {
    state.world.kapitel = payload;
  }
};

const actions = {
  API_GET_ALL_WORLDS({commit, rootState}) {
    let user = rootState.user.user;
    return axios({
      method: 'get',
      url: API_BASEURL + 'Welt',
      auth: {
        username: user != null ? user.userid : 'gast',
        password: user != null ? user.userid : 'gast'
      }
      })
      .then(response => {
        commit('setWorlds', response.data);
      })
      .catch(error => {
        let errorMessage = JSON.parse(error.request.response)[0].message;
        return Promise.reject(errorMessage);
      })
  },
  API_GET_WORLD({commit, rootState}, payload) {
    let user = rootState.user.user;
    return axios({
      method: 'get',
      url: API_BASEURL + `Welt/${payload}`,
      auth: {
        username: user != null ? user.userid : 'gast',
        password: user != null ? user.userid : 'gast'
      }
      })
      .then(response => {
        commit('setWorld', response.data);
      })
      .catch(error => {
        let errorMessage = JSON.parse(error.request.response)[0].message;
        return Promise.reject(errorMessage);
      })
  },
  API_GET_WORLD_STARTCHAPTER({commit, rootState}, payload) {
    let user = rootState.user.user;
    return axios({
      method: 'get',
      url: API_BASEURL + `Welt/${payload}/Startkapitel`,
      auth: {
        username: user != null ? user.userid : 'gast',
        password: user != null ? user.userid : 'gast'
      }
      })
      .then(response => {
        commit('setWorldChapterStart', response.data);
      })
      .catch(error => {
        let errorMessage = JSON.parse(error.request.response)[0].message;
        return Promise.reject(errorMessage);
      })
  },
  API_GET_WORLD_CHAPTERS_ALL({commit, rootState}, payload) {
    let user = rootState.user.user;
    return axios({
      method: 'get',
      url: API_BASEURL + `Welt/${payload}/Kapitel`,
      auth: {
        username: user != null ? user.userid : 'gast',
        password: user != null ? user.userid : 'gast'
      }
      })
      .then(response => {
        commit('setWorldChapterAll', response.data);
      })
      .catch(error => {
        let errorMessage = JSON.parse(error.request.response)[0].message;
        return Promise.reject(errorMessage);
      })
  },
  setWorld({commit}, payload) {
    commit('setWorld', payload);
  },
  API_POST_WORLD({commit, rootState}, payload) {
    let user = rootState.user.user;

    return axios({
      method: 'post',
      url: API_BASEURL + 'Welt',
      data: payload,
      auth: {
        username: user != null ? user.userid : 'gast',
        password: user != null ? user.userid : 'gast'
      }
      })
      .then(response => {
        return 'Your world was submitted!'
      })
      .catch(error => {
        let errorMessage = JSON.parse(error.request.response)[0].message;
        return Promise.reject(errorMessage);
      })
  },
  API_DELETE_WORLD({commit, rootState}, payload) {
    let mod = rootState.mod.mod;
    if (mod) {
      return axios({
        method: 'delete',
        url: API_BASEURL + `Welt/${payload}`,
        data: payload,
        auth: {
          username: mod.modId,
          password: mod.modId
        }
        })
        .then(response => {
          return 'World was deleted!';
        })
        .catch(error => {
          let errorMessage = JSON.parse(error.request.response)[0].message;
          return Promise.reject(errorMessage);
        })
      } else {
        return Promise.reject('You need to be logged in as a Moderator to delete a world!');
      }
    }

};

export default {
  namespaced: true,
  state,
  mutations,
  actions
}