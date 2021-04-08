<template>
  <div class="content">
    <tank
    ref="K"
    :name="usersData.K.name"
    :enemyPostion="enemyPostionFromK"
    @hit="hit" 
    @tankMove="tankMove"
    />
    <tank
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
          <input v-if="item.value2" type="number" v-model="controls[item.value2]" @change="change(item.value2)">
        </div>
      </div>
      <button @click="startGame" v-show="gameStatus !=='runing'">{{ gameStatus === 'over' ? '重新开始' : '开始游戏'}}</button>
      <!-- <button @click="rebirth('enemy')">重生</button> -->
    </div>
  </div>
  
</template>

<script>
import tank from '../components/tank'
import { doubleControlList } from '../assets/config/data/double-game'

const usersData = {
  K: {
    name: 'K'
  },
  Q: {
    name: 'Q',
    position: { userX: 200, userY: 200, pipelineDirection: 'left' },
    color: 'red',
    keyCodeType: {  38: 'top', 40: 'bottom', 37: 'left', 39: 'right', 45: 'fire' }
  }
}

export default {
  components: {
    tank
  },
  computed: {
  },
  mounted () {
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
      controls: {
        QHitTime: 0,
        KHitTime: 0,
        userHp: 2,
        // 值越小 炮弹发射频率越快
        bulletsFrequencyVlaue: 40,
        // 值越小 user移动越快
        userFrequencyVlaue: 1.5,
        // 敌人血量
        enemyHp: 9,
        // 敌人位置
        enemyX: 0,
        enemyY: 0,
        // 敌人生命次数
        enemyLifLimit: 1,
        // 敌人满血生命值
        enemyAmple: 10,
        // user一次移动的px
        disdance: 1,
        // 炮弹一次移动的px
        bulletDisdance: 1,
        // 控制中心宽度
        controlWidth: 200,
        // 复活时间 s
        rebirthTime: 3,
        // 游戏关卡
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
    },
    startGame () {
      // 控制台 不可编辑
      this.gameStatus = 'runing'
    },
    overGame () {
      this.disabled = 'over'
    },
    tankMove (item) {
      const name = item.name === 'Q' ? 'K' : 'Q'
      this[`enemyPostionForm${name}`] = [item]
    },
    change (type) {
      this.controls[type] = +this.controls[type]
      if (this.controls[type] < 1) {
        this.controls[type] = 1
      }
    },
  },
  // watch: {
  //   '$refs.K' (v, n) {
  //     console.log('K');
  //     console.log(v, n)
  //   }
  // }
}
</script>

<style>
.control {
  position: absolute;
  right: 0px;
  height: 100vh;
  top: 0;
}
</style>