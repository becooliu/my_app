import { createStore } from 'vuex'

export default createStore({
  state: {
    isLogin: false
  },
  mutations: {
    setLoginStatus(state, value) {
      //设置登录成功后的state 状态
      state.isLogin = value
    },
    setLogoutStatus(state) {
      /***
       * value 为bool 值
      */
      state.isLogin = false
    }
  },
  actions: {
  },
  modules: {
  }
})
