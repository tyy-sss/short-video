import { createStore } from 'vuex'

export default createStore({
  state: {
    userData:{}
  },
  getters: {
    userData:state => userData,

  },
  mutations: {
    setUserData()
    {

    }
  },
  actions: {

  },
  modules: {
  }
})
