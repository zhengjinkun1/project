import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    word:[]
  },
  mutations: {
    change(state,data){
      if(state.word.indexOf(data) == -1){
        state.word.unshift(data);
      }
    },
    remove(state){
      state.word = [];
    },
    
  },
  actions: {
  },
  modules: {
  }
})
