<template>
  <div class="max fr jc ac fdc">
    <a :href="item.path" v-for="item in menus" :key="item.path">{{item.name}}</a>
  </div>
</template>

<script>
const menus = [
  { name: '单人游戏', path: '/solo-game' },
  { name: '双人游戏', path: '/double-game' },
  { name: 'demo', path: '/demo' }
]

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
    }
  }
}
</script>

<style lang="less" scoped>
.max {
  a {
    line-height: 30px;
  }
}
</style>
