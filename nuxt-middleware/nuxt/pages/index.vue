<template>
    <div>
        <h3>Hello from Total.js and Nuxt.js</h3>
        <div class="react-container">
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
    export default {
      computed: {
        ...mapState(['msg', 'counter'])
      },
      methods: {
        ...mapMutations(['setMsg', 'increase', 'decrease'])
      }
    }
</script>
<style scoped>
    .react-container {
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