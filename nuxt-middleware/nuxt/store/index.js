import Vuex from 'vuex'

const store = function () {
  return new Vuex.Store({
    state: {
      msg: '',
      counter: 0,
      serverMsg: ''
    },
    mutations: {
      setMsg: function (state, msg){
        state.msg = msg
      },
      increase: function (state) {
        state.counter += 1
      },
      decrease: function (state) {
        state.counter -= 1
      },
      setServerMsg: function (state, msg) {
        state.serverMsg = msg
      }
    }
  })
}

export default store