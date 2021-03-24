<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <div>123</div>
    getName: {{getName}}
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  created () {
    console.log(this.$electron, 'electron')
  },
  methods: {
    getName () {
      return this.$electron.remote.app.getName()
    }
  }
  // components: {
  //   HelloWorld
  // }
}
</script>
