<template>
  <div class="fr jsd">
    <div class="content" >
      <div class="user ac fc jc" :style="{'left': `${left}px`, 'top': `${top}px`}">
        <div :class="'pipeline-' + pipelineDirection"></div>
        <span>user</span>
      </div>
      <div :class="'pipeline-' + item.type" v-for="(item,idx) in bullets" :key="idx" :style="{'left': `${item.left}px`, 'top': `${item.top}px`}"></div>
      <div class="user ac fc jc" :style="{ left: controls.enemyX + 'px', top: controls.enemyY + 'px',background: 'red' }">
        <span>{{controls.foreHp}}</span>
      </div>
    </div>
    <div class="control" :style="{width: controls.controlWidth + 'px'}">
      <h3>控制中心</h3>
      <div v-for="item in controlList" :key="item.value" >
        {{item.label}}
        <div :class="item.value2 && 'fsd jc input-2'">
          <input type="number" v-model="controls[item.value]">
          <input v-if="item.value2" type="number" v-model="controls[item.value2]">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { keyCodeType, controlList } from '../assets/config/data'
export default {
  data () {
    return {
      controlList,
      controls: {
        // 值越小 发射频率越快
        bulletsFrequencyVlaue: 25,
        // 敌人血量
        foreHp: 9,
        // 敌人位置
        enemyX: 90,
        enemyY: 20,
        // 一次移动的px
        disdance: 1,
        // 控制中心宽度
        controlWidth: 200
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
      timerTimer: 20

    }
  },
  mounted (){
    window.addEventListener('keydown', this.keyDown)
    window.addEventListener('keyup', this.keyUp)
  },
  computed: {
    width () {
      return document.body.clientWidth - this.controlWidth.controlWidth
    },
    height () {
      return document.body.clientHeight
    },
    userfrequency () {
      return true || this.frequency === 0
    },
    // 炮弹发射频率
    bulletsFrequency () {
      return this.frequency % this.controls.bulletsFrequencyVlaue === 0 || this.frequency === 0
    }
  },
  methods: {
    /**
     * @description: 
     * @param {'top','down','left','right'} type 
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
      }
      if (direction === 'top' && (this[direction] > height - 60  || this[direction] < 20)) {
        this[direction] -= value
      }
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
      if (leftV < 5 && leftV > -40 && topV < 5 && topV > -45) {
        return true
      }
      return false
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
            // 炮弹的初始位置
            if (pd === 'right') {
              params.left = left + 50
              params.top = top + 20 -5 + 2
            } else if (pd === 'left') {
              params.left = left - 20
              params.top = top + 20 -5 + 2
            } else if (pd === 'top') {
              params.top = top - 20
              params.left = left + 20 -5 + 2
            } else {
              params.top = top + 50
              params.left = left + 20 -5 + 2
            }
            this.bullets.push(params)
          }
          // 炮弹移动
          this.bullets.forEach((item, idx) => {
            const symbol = (item.type === 'down' || item.type === 'right') ? '+' : '-'
            const direction = (item.type === 'left' || item.type === 'right') ? 'left' : 'top'
            // 炮弹 移动
            item[direction] += +`${symbol}1`
            // item.left += 1 
            const flag = this.bulletLost(item)
            if (flag) this.controls.foreHp -= 1
            this.$set(this.bullets, idx, item)
            if (item.left >= this.width - 40 || item.left < 20 || item.top >= this.height || item.top < 0 || flag) {
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
      // 判断边界 width900 height200 padding 20
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
</style>