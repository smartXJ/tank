<template>
  <div class="fr jsd">
    <div class="content" >
      <a class="control-show" @click="isShowControl = true" v-show="!isShowControl">口</a>
      <div class="user ac fc jc" :style="{'left': `${left}px`, 'top': `${top}px`}">
        <div :class="'pipeline-' + pipelineDirection"></div>
        <span>user</span>
      </div>
      <div :class="'pipeline-' + item.type" v-for="(item,idx) in bullets" :key="idx" :style="{'left': `${item.left}px`, 'top': `${item.top}px`}"></div>
      <div class="user ac fc jc" :style="{ left: controls.enemyX + 'px', top: controls.enemyY + 'px',background: 'red' }" v-show="isenemyBeing">
        <span>{{controls.enemyHp}}</span>
      </div>
    </div>
    <!-- 控制中心 -->
    <div class="control" :style="{width: controls.controlWidth + 'px'}" v-show="isShowControl">
      <a class="control-show" @click="isShowControl = false">--</a>
      <h3>控制中心</h3>
      <div v-for="item in controlList" :key="item.value" >
        {{item.label}}
        <div :class="item.value2 && 'fsd jc input-2'">
          <input type="number" v-model="controls[item.value]" @change="change(item.value)">
          <input v-if="item.value2" type="number" v-model="controls[item.value2]" @change="change(item.value2)">
        </div>
      </div>
      <button @click="startGame" v-show="gameStatus !=='runing'">{{ gameStatus === 'over' ? '重新开始' : '开始游戏'}}</button>
      <!-- <button @click="rebirth('enemy')">重生</button> -->
    </div>
    <!-- 障碍物 -->
    <div class="barrier" v-for="(item,idx) in barriers" :key="idx" :style="{ width: (item.width || 5) + 'px', height: (item.height || 5) + 'px', top: item.Y + 'px', left: item.X + 'px' }" />
  </div>
</template>

<script>
import { keyCodeType, publicControlList } from '../assets/config/data/data'
import { soloControlList, customList } from '../assets/config/data/solo-game'
const controlList = soloControlList.concat(publicControlList)
export default {
  data () {
    return {
      // 关卡信息
      customList,
      controlList,
      // 障碍物
      barriers: [],
      controls: {
        userHp: 10,
        // 值越小 发射频率越快
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
      left: 20,
      top: 20,
      // 炮弹
      bullets: [],
      driveDirection: [],
      keyCodeType,
      // 是否处于攻击状态
      isAttack: false,
      // timer循环次数 用来设置速度
      frequency: 0,
      // 管道方向
      pipelineDirection: 'right',
      // 一次循环时间
      timerTimer: 10,
      // 是否显示敌人
      isenemyBeing: false,
      // 是否展示控制中心
      isShowControl: true,
      // 游戏状态 await runing over
      gameStatus: 'await',

    }
  },
  mounted (){
    window.addEventListener('keydown', this.keyDown)
    window.addEventListener('keyup', this.keyUp)
    // 若有缓存
    // ...
  },
  computed: {
    width () {
      if (!this.isShowControl) return document.body.clientWidth
      return document.body.clientWidth - this.controls.controlWidth
    },
    height () {
      return document.body.clientHeight
    },
    userfrequency () {
      return this.frequency % this.controls.userFrequencyVlaue || this.frequency === 0
    },
    // 炮弹发射频率
    bulletsFrequency () {
      return this.frequency % this.controls.bulletsFrequencyVlaue === 0 || this.frequency === 0
    }
  },
  methods: {
    basicDeploy () {
      const { deploy, barriers } = this.customList.find(item => item.custom === this.controls.custom)
      this.barriers = barriers || []
      // 默认
      this.controls.enemyLifLimit = 1
      Object.keys(deploy).forEach(item => {
        this.controls[item] = deploy[item]
      })
      // const { enemyLifLimit } = this.controls
      // this.controls.enemyLifLimit = ell || enemyLifLimit
    },
    startGame () {
      // 关闭控制台
      // this.isShowControl = false
      // 显示敌人
      // this.isenemyBeing = true
      if (this.controls.custom === 1) {
        alert('使用 WASD 进行移动，空格 进行攻击')
      }
      this.gameStatus = 'runing'
      // 获取基本数据
      this.basicDeploy()
      // 如果没有设置初始位置
      if (!this.controls.enemyX) {
        this.rebirth('enemy')
      } else {
        this.isenemyBeing = true
      }
    },
    gameWin () {
      alert('通关！！')
      this.gameStatus = 'await'
      // 停止攻击
      this.isAttack = false
      const { bulletsFrequencyVlaue:bfv } = this.customList.find(item => item.custom === this.controls.custom).award
      const { bulletsFrequencyVlaue } = this.controls
      this.controls.bulletsFrequencyVlaue = bfv ? bulletsFrequencyVlaue + bfv : bulletsFrequencyVlaue
      if (this.controls.custom >= this.customList.length) {
        // 通完全部关卡
        alert('完成全部关卡')
      } else {
        // 获取奖励
        const { award } = this.customList.find(item => item.custom === this.controls.custom)
        Object.keys(award).forEach(item => {
          if (item.type === '-') {
            this.controls[item] = this.controls[item] - award[item]
          } else {
            this.controls[item] = this.controls[item] + award[item]
          }
        })
        this.controls.custom += 1
      }
    },
    // input 发生改变
    change (type) {
      this.controls[type] = +this.controls[type]
      if (this.controls[type] < 1) {
        this.controls[type] = 1
      }
    },
    /**
     * @description: 
     * @param { String } type 移动方向 top down left right
     */    
    move (type) {
      // 改变管道方向方向
      this.pipelineDirection = type
      let symbol = (type === 'down' || type === 'right') ? '+' : '-'
      let direction = (type === 'left' || type === 'right') ? 'left' : 'top'
      // 屏幕的宽高
      const { width, height } = this // 40px user的宽高
      const value = +`${symbol}${this.controls.disdance}`
      this[direction] += value

      if (direction === 'left' && (this[direction] > width - 80  || this[direction] < 20)) {
        this[direction] -= value
        return
      }
      if (direction === 'top' && (this[direction] > height - 60  || this[direction] < 20)) {
        this[direction] -= value
        return
      }
      const { left: userX, top: userY } = this
      // 是否遇到障碍物
      this.barriers.forEach(({X, Y, height, width}) => {
        // const maxHeight = height ? height + 50 + Y : height + 5 + Y
        // const maxWidth = width ? width + 40 + X : width + 5 + X
        const maxHeight = height + 10 + Y + 10
        const maxWidth = width + X + 10
        const driveDirection = this.driveDirection
        if (Y -50 < userY &&  maxHeight > userY && (X === userX-10 && driveDirection.includes('left')|| X=== userX + 50 && driveDirection.includes('right'))) {
          this[direction] -= value
          return
        }
        if (X -40 < userX &&  maxWidth > userX && (Y === userY-10 && driveDirection.includes('top') || Y === userY+50 && driveDirection.includes('down'))) {
          this[direction] -= value
          return
        }
        // userX < X < userX +40 Y ===userY +50 || Y+height ===userY
        if (userX < X && X < userX +40 && (Y ===userY +50 || Y+height ===userY)) {
          this[direction] -= value
          return
        }
        // userY < Y < userY + 40  X===userX + 50||  X+width === userX
        if (userY < Y &&  Y < userY + 40 && (X===userX + 50 || X+width === userX)) {
          this[direction] -= value
          return
        }
        // 下
        // if (X -40 < userX &&  maxWidth > userX && Y === userY+50 && driveDirection.includes('down')) {
        //   this[direction] -= value
        // }
      })
      // this[direction] += flag ? value : 0

    },
    // 炮弹攻击敌人 item为炮弹
    /**
     * @description: 
     * @param { left, top , type} item
     * @return Boolean
     */    
    bulletLost ({ left, top }) {
      const { enemyX, enemyY } = this.controls
      const leftV = enemyX - left
      const topV = enemyY - top
      // 是否击中敌人
      if (leftV < 5 && leftV > -40 && topV < 5 && topV > -45) {
        return true
      }
      return false
    },
    // 被炮弹击中
    hitTatget (role) {
      this.controls[`${role}Hp`] -= 1
      // 死亡时
      if (this.controls[`${role}Hp`] === 0) {
        this.controls[`${role}X`] = 0
        this.controls[`${role}Y`] = 0
        if (role === 'enemy') {
          this.isenemyBeing = false
          this.controls.enemyLifLimit -= 1
          // 游戏是否结束
          if (this.controls.enemyLifLimit) {
            // 重生复活
            this.rebirth(role)
          } else {
            this.gameWin()
          }
        } else {
          this.startGame = 'over'
          // alert('game over')
        }
      }
    },
    rebirth (role) {
      const time = this.controls.rebirthTime * 1000
      setTimeout(() => {
        const x = Math.round(Math.random()* (this.width -80)) + 20
        const y = Math.round(Math.random()* (this.height -80)) + 20
        console.log(this.height -80, 'hei')
        this.controls[`${role}X`] = x
        this.controls[`${role}Y`] = y
        // 重生
        this[`is${role}Being`] = true
        // 回复血量
        this.controls[`${role}Hp`] = this.controls[`${role}Ample`] || 10
      }, time)
    },
    bulletLostByBarrier ({ top: userY, left: userX, type }) {
      // 是否遇到障碍物
      let flag = false
      this.barriers.forEach(({X, Y, height, width}) => {
        const maxHeight = height  + Y
        const maxWidth = width + X
        if (Y -5 < userY &&  maxHeight > userY && (X === userX && type === 'left'|| X - 10 === userX && type === 'right')) {
          flag = true
          return true
        }
        if (X -5 < userX &&  maxWidth > userX && (Y === userY && type ==='top' || Y - 10 === userY && type === 'down')) {
          flag = true
          return true
        }
        // userX < X < userX +40 Y ===userY +50 || Y+height ===userY
        if (userX < X && X < userX +10 && (Y ===userY +10 || Y+height ===userY)) {
          flag = true
          return true
        }
        // userY < Y < userY + 40  X===userX + 50||  X+width === userX
        if (userY < Y &&  Y < userY + 10 && (X===userX + 10 || X+width === userX)) {
          flag = true
          return true
        }
      })
      return flag
    },
    attack (type) {
      if (type === 'space') {
        // 开启攻击
        this.isAttack = true
      } else {
        if (!this.driveDirection.includes(type)) {
          this.driveDirection.push(type)
        }
      }
      if (!this.timer) {
        this.timer = setInterval(() => {
          if (this.isAttack && this.bulletsFrequency) {
            const pd = this.pipelineDirection
            const { left, top } = this
            let params = {
              type: pd
            }
            // 开炮炮弹的初始位置
            if (pd === 'right') {
              params.left = left + 40
              params.top = top + 20 -5 + 2
            } else if (pd === 'left') {
              params.left = left - 10
              params.top = top + 20 -5 + 2
            } else if (pd === 'top') {
              params.top = top - 10
              params.left = left + 20 -5 + 2
            } else {
              params.top = top + 40
              params.left = left + 20 -5 + 2
            }
            this.bullets.push(params)
          }
          // 炮弹移动
          this.bullets.forEach((item, idx) => {
            const symbol = (item.type === 'down' || item.type === 'right') ? '+' : '-'
            const direction = (item.type === 'left' || item.type === 'right') ? 'left' : 'top'
            // 炮弹 移动
            item[direction] += +`${symbol}${this.controls.bulletDisdance}`
            // 炮弹是否击中敌人
            const flag = this.bulletLost(item)
            // 炮弹是否击中障碍物
            let flgByBarrier = false
            if (flag) {
              this.hitTatget('enemy')
            } else {
              flgByBarrier = this.bulletLostByBarrier(item)
              // console.log(flgByBarrier, 'flgByBarrier');
            }

            // this.$set(this.bullets, idx, item)
            if (item.left >= this.width - 40 || item.left < 20 || item.top >= this.height || item.top < 0 || flag || flgByBarrier) {
              this.$set(this.bullets, idx, null)
            }
          })
          // user 移动
          if (this.userfrequency) {
            this.driveDirection.forEach(item => {
              this.move(item)
            })
          }
          // 过滤掉 离开页面的炮弹
          this.bullets = this.bullets.filter(item => item)
          // user不移动 没有炮弹去掉timer
          if (!this.bullets.length && !this.driveDirection.length) {
            clearInterval(this.timer)
            this.timer = null
            // this.frequency = 0
          }
          this.frequency += 1
        }, this.timerTimer)
      }
    },
    keyDown (e) {
      const keyCode = this.keyCodeType[e.keyCode]
      // 判断边界 padding 20
      if (keyCode) {
        this.attack(keyCode)
      }
    },
    keyUp (e) {
      const keyCode = this.keyCodeType[e.keyCode]
      if (keyCode) {
        if (keyCode !== 'space') {
          this.driveDirection = this.driveDirection.filter(item => item !== keyCode)
        } else {
          this.isAttack = false
        }
      }
    }
  },
  destroyed () {
    window.removeEventListener('keydown', this.keyDown)
    window.removeEventListener('keyup', this.keyUp)
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
</style>