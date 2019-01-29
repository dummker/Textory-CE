import axios from "axios";

const API_BASEURL = 'localhost:8080/';

const state = () => ({
  user: null,
})

const mutations = {
  setUser(state, payload) {
    state.user = payload;
  },
  setUserChapters(state, payload) {
    state.user.kapitel = payload;
  },
  chapterRemoveFromUser(state, payload) {
    state.user.kapitel = payload
  },
  setUserFavorites(state, payload) {
    state.user.favoriten = payload;
  },
  addToFavorites(state, payload) {
    state.user.favoriten.push(payload);
  },
  removeFromFavorites(state, payload) {
    state.user.favoriten = state.user.favoriten.filter(favorite => favorite.kapitel.kapitelName != payload);

  }
};

const actions = {
  API_POST_USER({commit}, payload) {
    return axios({
      method: 'post',
      url: API_BASEURL + 'Users',
      data: payload,
      })
      .then(response => {
        const newUser = {
          userid: response.data.userid,
          email: response.data.email
        }
        commit('setUser', newUser);
        return 'You successfully registered your account!'
      })
      .catch(error => {
        let errorMessage = JSON.parse(error.request.response)[0].message;
        return Promise.reject(errorMessage);
      })
  },
  API_GET_ALL_USERS({commit}) {
    return axios({
      method: 'get',
      url: API_BASEURL + `Users`,
      })
      .then(response => {
       return response.data;
      })
      .catch(error => {
        return 
      })
  },
  API_GET_USER_PROFILE({commit, rootState}) {
    let user = rootState.user.user;

    return axios({
      method: 'get',
      url: API_BASEURL + 'Profil',
      auth: {
        username: user != null ? user.userid : 'gast',
        password: user != null ? user.userid : 'gast'
      }
      })
      .then(response => {
        // TODO: set User Profile
      })
      .catch(error => {
        let errorMessage = JSON.parse(error.request.response)[0].message;
        return Promise.reject(errorMessage);
      })
  },
  API_GET_USER_CHAPTERS({commit, rootState}) {
    let user = rootState.user.user;
    return axios({
      method: 'get',
      url: API_BASEURL + '/Users/Kapitel',
      auth: {
        username: user != null ? user.userid : 'gast',
        password: user != null ? user.userid : 'gast'
      }
      })
      .then(response => {
        commit('setUserChapters', response.data);
      })
      .catch(error => {
        let errorMessage = JSON.parse(error.request.response)[0].message;
        return Promise.reject(errorMessage);
      })
  },
  API_GET_FAVORITES({commit, rootState}) {
    let user = rootState.user.user;
    return axios({
      method: 'get',
      url: API_BASEURL + 'Favoriten',
      auth: {
        username: user != null ? user.userid : 'gast',
        password: user != null ? user.userid : 'gast'
      }
      })
      .then(response => {
        commit('setUserFavorites', response.data);
      })
      .catch(error => {
        let errorMessage = JSON.parse(error.request.response)[0].message;
        return Promise.reject(errorMessage);
      })
  },
  API_POST_FAVORITE({commit, rootState}, payload) {
    let user = rootState.user.user;

    return axios({
      method: 'post',
      url: API_BASEURL + `Kapitel/${payload}/Favoriten`,
      data: {},
      auth: {
        username: user != null ? user.userid : 'gast',
        password: user != null ? user.userid : 'gast'
      }
      })
      .then(response => {
        commit('addToFavorites', response.data);
        return 'You successfully added the chapter to favorites!'
      })
      .catch(error => {
        let errorMessage = JSON.parse(error.request.response)[0].message;
        return Promise.reject(errorMessage);
      })
  },
  API_DELETE_FAVORITE({commit, rootState}, payload) {
    let user = rootState.user.user;

    return axios({
      method: 'delete',
      url: API_BASEURL + `Kapitel/${payload}/Favoriten`,
      data: {},
      auth: {
        username: user != null ? user.userid : 'gast',
        password: user != null ? user.userid : 'gast'
      }
      })
      .then(response => {
        commit('removeFromFavorites', payload);
        return 'You successfully removed the chapter from favorites!'
      })
      .catch(error => {
        let errorMessage = JSON.parse(error.request.response)[0].message;
        return Promise.reject(errorMessage);
      })
  },
  API_DELETE_USER({commit, rootState}, payload) {
    let mod = rootState.mod.mod;
    if (mod) {
      return axios({
        method: 'delete',
        url: API_BASEURL + `Users/${payload}`,
        data: {},
        auth: {
          username: mod.modId,
          password: mod.modId
        }
        })
        .then(response => {
          return 'You successfully deleted the user !'
        })
        .catch(error => {
          let errorMessage = JSON.parse(error.request.response)[0].message;
          return Promise.reject(errorMessage);
        })
      } else {
        return Promise.reject('You need to be logged into your moderator account to delete a user!')
      }
  },
  // ueberprueft ob user vorhanden ist
  // wenn ja, simuliert sign in
  signIn({dispatch, commit}, payload) {
    return new Promise((resolve, reject) => {
      dispatch('API_GET_ALL_USERS')
      .then((users) => {
        const userIsRegistered = users.some(user => user.userid == payload.userid && user.email == payload.email);
        if (userIsRegistered) {
          commit('setUser', payload);
          dispatch('API_GET_FAVORITES');
          return resolve('You Successfully logged into your account!')
        } else {
          return reject('No account found with provided data!')
        }
      })
    })
  },
  setUser({commit}, payload) {
    commit('setUser', payload);
  },
  logout({commit}) {
    commit('setUser', null);
  },
  chapterRemoveFromUser({commit}, payload) {
    commit('chapterRemoveFromUser', payload);
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
}