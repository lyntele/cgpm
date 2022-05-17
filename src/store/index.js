import Vue from 'vue'
import Vuex from 'vuex'
// 持久化存储vuex中的数据
import VuexPersistence from 'vuex-persistedstate'

Vue.use(Vuex)

const store = new Vuex.Store({
  plugins: [VuexPersistence({//带参数的写法
    storage: window.sessionStorage,//要存的地方，如果不配置，默认是localStorage
  })],
  state: {
    managerId: '',
    currentMatchData: {},
    currentMatchCerts: []
  },
  mutations: {
    SET_MANAGER_ID(state, managerId) {
      console.log('--------vuex set mutation--------')
      state.managerId = managerId
    },
    SET_CURRENTMATCH_DATA(state, matchData) {
      state.currentMatchData = matchData
    },
    SET_CURRENTMATCH_CERT(state, certsData) {
      state.currentMatchCerts = certsData
    }
  },
  actions: {
    setManagerId({commit}, managerId) {
      console.log('--------vuex set action--------')
      commit('SET_MANAGER_ID',managerId)
    },
    setCurrentMatchData({commit}, matchData) {
      commit('SET_CURRENTMATCH_DATA',matchData)
    },
    setCurrentMatchCert({commit}, certsData) {
      commit('SET_CURRENTMATCH_CERT', certsData)
    }
  }
})

export default store