<template>
  <!-- <div class="max flex" @mouseover="over" @mouseout="out" > -->
  <div class="max flex" >
    <!-- <div>1</div>
    <div>2</div>
    <div>3</div>
    <div>4</div> -->
    <div id="rotate">xxxxy</div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        message: 'This is an about page',
        point: 0,
        time: 2
      }
    },
    methods: {
      over () {
        const obj = document.getElementById('rotate')
        if (!this.timer) {
          let point = 0
          this.timer = () => setInterval(() => {
            obj.style.transform = `rotate(${point}deg)`
            point += 1
          }, 2)
        }
        this.timer()
      },
      out () {
        console.log('退出');
        clearInterval(this.timer)
      }
    }
  }
</script>
<style scoped lang="less">
.flex {
  display: flex;
  justify-content: center;
  align-items: center;
}
.max {
  div{
    height: 100vh;
    height: 50px;
    background-color: red;
  }
}
</style>