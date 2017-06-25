<template>
    <div>
        <h3>Hello from Total.js and Nuxt.js</h3>
        <div class="container">
            <p>Value from server</p>
            <p>{{serverMsg}}</p>
        </div>
        <div class="container">
            <p>These values are React</p>
            <input :value="msg" @input="(e)=>{setMsg(e.target.value)}"/>
            <p>{{msg}}</p>
            <p>counter: {{counter}}</p>
            <button @click="decrease">-</button><button @click="increase">+</button>
        </div>
    </div>
</template>
<script>
    import {mapState, mapMutations} from 'vuex'
    import axios from 'axios'
    export default {
      computed: {
        ...mapState(['msg', 'counter', 'serverMsg'])
      },
      methods: {
        ...mapMutations(['setMsg', 'increase', 'decrease'])
      },
      fetch: function ({store, req}) {
        return axios.get(req.uri.protocol + '//' + req.uri.host+ '/api/hello_msg').then(function (res) {
          store.commit('setServerMsg', res.data.msg)
        }).catch(function (e) {
          console.log(e)
        })
      }
    }
</script>
<style scoped>
    .container {
        padding: 0 20px 20px 20px;
        margin: 10px;
        border-color: darkgray;
        border-style: solid;
        border-radius: 5px;
        border-width: 1px;
        display: inline-block;
        width: 50%;
    }
</style>