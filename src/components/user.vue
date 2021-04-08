<template>
  <div class="user ac fc jc" :style="{'left': `${blackX}px`, 'top': `${blackY}px`}">
    <div :class="'pipeline-' + pipelineDirection"></div>
    <span>black</span>
  </div>
</template>

<script>
export default {
  props:{ 
    
  }
}
</script>

<style lang="less" scoped>
.content {
  height: 100vh;
  margin: 0px;
  text-align: left;
  overflow: hidden;
  box-sizing: border-box;
  padding: 20px;
}
.user {
  position: absolute;
  width: 40px;
  height: 40px;
  background: black;
  color: aliceblue;
}
.bullet-level {
  position: absolute;
  width: 10px;
  height: 5px;
  background: black;
}
.bullet-vertical {
  position: absolute;
  width: 5px;
  height: 10px;
  background: black;
}
.pipeline-left {
  .bullet-level();
  left: -10px;
}
.pipeline-right {
  .bullet-level();
  left: 40px;
}
.pipeline-top {
  .bullet-vertical();
  top: -10px;
}
.pipeline-down {
  .bullet-vertical();
  top: 40px;
}
.control {
  // width: 200px;
  background: #7d8c8e;
  text-align: center;
  >div {
    margin-bottom: 20px;
    >div {
      &.input-2 {
        input {
          width: 37%;
        }
      }
    }
    input {
      width: 80%;
      text-align: center;
    }
  }
}
.control-show {
  position: absolute;
  right: 10px;
  top: 5px;
}
.barrier {
  position: absolute;
  background: dimgrey;
}
.red {
  background: red;
}
</style>