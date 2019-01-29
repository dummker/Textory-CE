import axios from "axios";

const API_BASEURL = 'localhost:8080/';

const state = () => ({
  chapters: [],
  chapterContinue: [],
  chapter: {}
})

const mutations = {
  setChapters(state, payload) {
    state.chapters = payload;
  },
  setChapter(state, payload){ 
    state.chapter = payload;
  },
  setChapterContinue(state, payload){ 
    state.chapterContinue = payload;
  }
};

const actions = {
  setChapter({commit}, payload) {
    commit('setChapter', payload);
  },
  API_GET_ALL_CHAPTERS({commit, rootState}) {
    let user = rootState.user.user;
    return axios({
      method: 'get',
      url: API_BASEURL + 'Kapitel',
      auth: {
        username: user != null ? user.userid : 'gast',
        password: user != null ? user.userid : 'gast'
      }
      })
      .then(response => {
        commit('setChapters', response.data);
      })
      .catch(error => {
        let errorMessage = JSON.parse(error.request.response)[0].message;
        return Promise.reject(errorMessage);
      })
  },
  API_GET_CHAPTER({commit, rootState}, payload) {
    let user = rootState.user.user;
    return axios({
      method: 'get',
      url: API_BASEURL + `Kapitel/${payload}`,
      auth: {
        username: user != null ? user.userid : 'gast',
        password: user != null ? user.userid : 'gast'
      }
      })
      .then(response => {
        commit('setChapter', response.data);
      })
      .catch(error => {
        let errorMessage = JSON.parse(error.request.response)[0].message;
        return Promise.reject(errorMessage);
      })
  },
  API_GET_CHAPTER_START({commit, rootState}, payload) {
    let user = rootState.user.user;
    return axios({
      method: 'get',
      url: API_BASEURL + `Kapitel/${payload}/Start`,
      auth: {
        username: user != null ? user.userid : 'gast',
        password: user != null ? user.userid : 'gast'
      }
      })
      .then(response => {
        commit('setChapter', response.data);
        return response.data;
      })
      .catch(error => {
        let errorMessage = JSON.parse(error.request.response)[0].message;
        return Promise.reject(errorMessage);
      })
  },
  API_GET_CHAPTER_SEARCH({commit,rootState}, payload) {
    let user = rootState.user.user;
    return axios({
      method: 'get',
      url: API_BASEURL + `Kapitel/Suche/${payload}`,
      auth: {
        username: user != null ? user.userid : 'gast',
        password: user != null ? user.userid : 'gast'
      }
      })
      .then(response => {
        return response.data;
      })
      .catch(error => {
        let errorMessage = JSON.parse(error.request.response)[0].message;
        return Promise.reject(errorMessage);
      })
  },
  API_GET_CHAPTER_CONTINUE({commit, rootState}, payload) {
    let user = rootState.user.user;
    return axios({
      method: 'get',
      url: API_BASEURL + `Kapitel/${payload}/Fortsetzung/`,
      auth: {
        username: user != null ? user.userid : 'gast',
        password: user != null ? user.userid : 'gast'
      }
      })
      .then(response => {
        commit('setChapterContinue', response.data);
      })
      .catch(error => {
        let errorMessage = JSON.parse(error.request.response)[0].message;
        return Promise.reject(errorMessage);
      })
  },
  API_POST_CHAPTER({commit, rootState}, payload) {
    let user = rootState.user.user;
    return axios({
      method: 'post',
      url: API_BASEURL + 'Kapitel',
      data: payload,
      auth: {
        username: user != null ? user.userid : 'gast',
        password: user != null ? user.userid : 'gast'
      }
      })
      .then(response => {
        return 'Your chapter was submitted!'
      })
      .catch(error => {
        let errorMessage = JSON.parse(error.request.response)[0].message;
        return Promise.reject(errorMessage);
      })
  },
  API_POST_CHAPTER_CONTINUE({commit, rootState}, payload) {
    let user = rootState.user.user;
    return axios({
      method: 'post',
      url: API_BASEURL + `Kapitel/${payload.continue}/Fortsetzung/`,
      data: payload,
      auth: {
        username: user != null ? user.userid : 'gast',
        password: user != null ? user.userid : 'gast'
      }
      })
      .then(response => {
        return 'Your chapter was submitted!'
      })
      .catch(error => {
        let errorMessage = JSON.parse(error.request.response)[0].message;
        return Promise.reject(errorMessage);
      })
  },
  API_DELETE_CHAPTER({commit, rootState}, payload) {
    let user = rootState.user.user;
    return axios({
      method: 'delete',
      url: API_BASEURL + `Kapitel/${payload}`,
      data: payload,
      auth: {
        username: user != null ? user.userid : 'gast',
        password: user != null ? user.userid : 'gast'
      }
      })
      .then(response => {
        return 'Your chapter was deleted!';
      })
      .catch(error => {
        let errorMessage = JSON.parse(error.request.response)[0].message;
        return Promise.reject(errorMessage);
      })
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
}