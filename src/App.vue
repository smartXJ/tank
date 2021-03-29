<template>
  <div id="app">
    <div class="operate">
      <a-icon class="icon icon1" @click="close" type="close" />
      <a-icon class="icon icon2 ml8" @click="min" type="minus" />
      <!-- <div @click="set">赋值</div>
      <div @click="get">获取</div> -->
    </div>
    <!-- <a-icon class="icon icon2 ml8" @click="close" type="close" /> -->
    <keep-alive>
      <router-view/>
    </keep-alive>
  </div>
</template>
<script>
export default {
  methods: {
    close () {
      window.ipcRenderer.send('open-close-dialog', 'hello')
    },
    min () {
      console.log(window, 'window.remote');
      const win = window.remote.getCurrentWindow()
      win.minimize()
    },
    get () {
      const data = window.remote.getGlobal('store').get('setting')
      console.log(data, 'data')
    },
    set () {
      window.remote.getGlobal('store').set('setting', { test: '2123'})
    }
  }
}
</script>
<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background: whitesmoke;
  .operate {
    position: absolute;
    left: 5px;
    top: 5px;
  }
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
