<template>
  <div class="max fr jc ac fdc">
    <a :href="item.path" v-for="item in menus" :key="item.path">{{item.name}}</a>
        <div id="rotate" @click="close">关闭123</div>
  </div>
</template>

<script>
const menus = [
  { name: '单人游戏', path: 'solo-game' },
  { name: '双人游戏', path: 'double-game' }
]
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  data () {
    return {
      menus
    }
  },
  created () {
  },
  methods: {
    close () {
     window.ipcRenderer.send('open-close-dialog', 'hello')
    },
    getName () {
      return this.$electron.remote.app.getName()
    }
  }
  // components: {
  //   HelloWorld
  // }
}
</script>
