<template>
  <div class="content">
    <tank
    v-if="gameStatus === 'runing'"
    ref="K"
    :name="usersData.K.name"
    :enemyPostion="enemyPostionFromK"
    @hit="hit" 
    @tankMove="tankMove"
    />
    <tank
    v-if="gameStatus === 'runing'"
    ref="Q"
    :color="usersData.Q.color"
    :position="usersData.Q.position"
    :keyCodeType="usersData.Q.keyCodeType"
    :enemyPostion="enemyPostionFormQ"
    :name="usersData.Q.name"
    @hit="hit"
    @tankMove="tankMove"
    />
    <!-- 控制中心 -->
    <div class="control" :style="{width: controls.controlWidth + 'px'}">
      <!-- <a class="control-show" @click="isShowControl = false">--</a> -->
      <h3>控制中心</h3>
      <div v-for="item in doubleControlList" :key="item.value" >
        {{item.label}}
        <div :class="item.value2 && 'fsd jc input-2'">
          <input type="number" :disabled="gameStatus === 'runing'" v-model="controls[item.value]" @change="change(item.value)">
          <input v-if="item.value2" type="number" :disabled="gameStatus === 'runing'" v-model="controls[item.value2]" @change="change(item.value2)">
        </div>
      </div>
      <button @click="startGame" v-show="gameStatus !=='runing'">{{ gameStatus === 'over' ? '重新开始' : '开始游戏'}}</button>
      <!-- <button @click="rebirth('enemy')">重生</button> -->
    </div>
  </div>
  
</template>

<script>
import tank from '../components/tank'
import { doubleControlList, usersData, initData } from '../assets/config/data/double-game'

export default {
  components: {
    tank
  },
  computed: {
  },
  mounted () {
    // initData
    this.controls = { ...this.controls, ...this.initData}
  },
  data () {
    return {
      enemyPostionFromK: [{ ...usersData.Q.position, name: usersData.Q.name}],
      enemyPostionFormQ: [{ ...usersData.K.position, name: usersData.K.name}],
      usersData,
      color: 'black',
      gameStatus: 'await',
      doubleControlList,
      disabled: false,
      initData,
      controls: {
        // 控制中心宽度
        controlWidth: 200,
        maxDie: 10,
        QHitTime: 0,
        KHitTime: 0,
        custom: 2,
      },
    }
  },
  methods: {
    colorChange () {
      this.color = this.color === 'red' ? 'black' : 'red'
    },
    hit (name) {
      console.log(name, '被击中了')
      this.controls[`${name}HitTime`] += 1
      if (this.controls[`${name}HitTime`] >= this.controls.maxDie) {
        alert(`获胜者：${name === 'Q' ? 'K' : 'Q'} ！！！`)
        this.overGame()
      }
    },
    startGame () {
      this.gameStatus = 'runing'
    },
    overGame () {
      this.controls = { ...this.controls, ...this.initData}
      this.gameStatus = 'over'
    },
    tankMove (item) {
      const name = item.name === 'Q' ? 'K' : 'Q'
      this[`enemyPostionForm${name}`] = [item]
    },
    change (type) {
      this.controls[type] = ~~this.controls[type]
      if (this.controls[type] < 0) {
        this.controls[type] = 0
      }
    },
  }
}
</script>
<style lang="less" scoped>
.control {
  position: absolute;
  right: 0px;
  height: 100vh;
  top: 0;
}
.input-2 {
  input {
        width: 41%;
      }
    }
</style>