<template>
  <div>
    <!-- user -->
    <div class="user ac fc jc" :style="{'left': `${userX}px`, 'top': `${userY}px`, background: color}">
      <div :class="'pipeline-' + pipelineDirection" :style="{background: color}"></div>
      <span>{{name}}</span>
    </div>
    <!-- user炮弹 -->
    <div :class="'pipeline-' + item.direction" v-for="(item,idx) in bullets" :key="idx" :style="{'left': `${item.left}px`, 'top': `${item.top}px`, background: color}"></div>
  </div>
</template>

<script>
export default {
  props:{
    // 初始位置
    position: {
      type: Object,
      default: () => ({ userX: 20, userY: 20, pipelineDirection: 'right' })
    },
    // 炮弹和本体颜色
    color: {
      type: String,
      default: 'black'
    },
    name: {
      type: String,
      default: 'user'
    },
    // 移动和攻击
    keyCodeType: {
      type: Object,
      // WSAD space
      default: () => ({  87: 'top', 83: 'bottom', 65: 'left', 68: 'right', 32: 'fire' })
    },
    enemyPostion: {
      type: Array,
      default: () => ([])
      //[{ userX: 20, userY: 20, name: 'xxxx' }]
    }
  },
  mounted () {
    window.addEventListener('keydown', this.keyDown)
    window.addEventListener('keyup', this.keyUp)
    Object.assign(this, this.position)
  },
  data () {
    return {
      // user位置
      userX: null,
      userY: null,
      // 管道方向
      pipelineDirection: null,
      // 炮弹
      bullets: [],
      // 移动
      driveDirection: [],
      // 是否处于攻击状态
      isAttack: false,
      // 一次循环时间
      timerTimer: 10,
      // 值越小 user移动越快
      userFrequencyVlaue: 2,
      // 炮弹一次移动的px
      bulletDisdance: 1,
      bulletsFrequencyVlaue: 40,
      // timer循环次数 用来设置速度
      frequency: 0,
      // user一次移动的px
      disdance: 1,
    }
  },
  computed: {
    enemyPostionReality () {
      const postion = this.enemyPostion
      if (postion.length) {
        let list = []
        postion.forEach(({ userX, userY, name }) => {
          const ele = [
            { X: userX, Y: userY, width: 40, name },
            { X: userX, Y: userY, height: 40, name },
            { X: userX, Y: userY + 40, width: 40, name },
            { X: userX + 40, Y: userY, height: 40, name }
          ]
          list = list.concat(ele)
        })
        return list
      }
      return []
    },
    width () {
      if (!this.isShowControl) return document.body.clientWidth
      return document.body.clientWidth - 20
    },
    height () {
      return document.body.clientHeight
    },
    userfrequency () {
      return this.frequency % this.userFrequencyVlaue || this.frequency === 0
    },
    // 炮弹发射频率
    bulletsFrequency () {
      return this.frequency % this.bulletsFrequencyVlaue === 0 || this.frequency === 0
    }
  },
  methods: {
    keyDown (e) {
      const keyCode = this.keyCodeType[e.keyCode]
      // 判断边界 padding 20
      if (keyCode) {
        this.attackAndMove(keyCode)
      }
    },
    keyUp (e) {
      const keyCode = this.keyCodeType[e.keyCode]
      if (keyCode) {
        if (keyCode !== 'fire') {
          this.driveDirection = this.driveDirection.filter(item => item !== keyCode)
        } else {
          this.isAttack = false
        }
      }
    },
    attackAndMove (type) {
      if (type === 'fire') {
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
            const { userX: left, userY: top } = this
            const params = { direction: pd }
            // 炮弹初始位置
            const values = {
              right: [left + 40, top + 17.5],
              left: [left -10, top + 17.5],
              top: [left + 17.5, top - 10],
              bottom: [left + 17.5, top + 40]
            }[pd]
            params.left = values[0]
            params.top = values[1]
            this.bullets.push(params)
          }
          // 炮弹移动
          this.bullets.forEach((item, idx) => {
            const symbol = (item.direction === 'bottom' || item.direction === 'right') ? '+' : '-'
            const direction = (item.direction === 'left' || item.direction === 'right') ? 'left' : 'top'
            // 炮弹 移动
            item[direction] += +`${symbol}${this.bulletDisdance}`
            // 炮弹是否击中敌人 击中返回name
            const name =  this.bulletLostByBarrier(item, 'enemyPostionReality')
            if (name) {
              this.$emit('hit', name)
            }
            // 炮弹是否击中障碍物 （。。。）
            const flgByBarrier = false
            if (item.left >= this.width - 40 || item.left < 20 || item.top >= this.height || item.top < 0 || name || flgByBarrier) {
            // if (item.left >= this.width - 40 || item.left < 20 || item.top >= this.height || item.top < 0) {
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
          this.frequency += 1
        }, this.timerTimer)
      }
    },
    // 中弹 or 撞墙
    bulletLostByBarrier ({ top: userY, left: userX, direction }, type) {
      // 是否遇到障碍物、敌人
      let flag = ''
      this[type].forEach(({X, Y, height, width, name }) => {
        const maxHeight = height  + Y
        const maxWidth = width + X
        if (Y -5 < userY &&  maxHeight > userY && (X === userX && direction === 'left'|| X - 10 === userX && direction === 'right')) {
          flag = name ? name : 'stop'
          return true
        }
        if (X -5 < userX &&  maxWidth > userX && (Y === userY && direction ==='top' || Y - 10 === userY && direction === 'bottom')) {
          flag = name ? name : 'stop'
          return true
        }
        // userX < X < userX +40 Y ===userY +50 || Y+height ===userY
        if (userX < X && X < userX +10 && (Y ===userY +10 || Y+height ===userY)) {
          flag = name ? name : 'stop'
          return true
        }
        // userY < Y < userY + 40  X===userX + 50||  X+width === userX
        if (userY < Y &&  Y < userY + 10 && (X===userX + 10 || X+width === userX)) {
          flag = name ? name : 'stop'
          return true
        }
      })
      return flag
    },
    move (type) {
      // 改变管道方向方向
      this.pipelineDirection = type
      let symbol = (type === 'bottom' || type === 'right') ? '+' : '-'
      let direction = (type === 'left' || type === 'right') ? 'userX' : 'userY'
      // 屏幕的宽高
      const { width, height } = this // 40px user的宽高
      const value = +`${symbol}${this.disdance}`
      // const value = +`${symbol}1`
      this[direction] += value
      const { userX, userY, name } = this
      
      if (direction === 'userX' && (this[direction] > width - 80  || this[direction] < 20)) {
        this[direction] -= value
        this.$emit('tankMove', { userX, userY, name })
        return
      }
      if (direction === 'userY' && (this[direction] > height - 60  || this[direction] < 20)) {
        this[direction] -= value
        this.$emit('tankMove', { userX, userY, name })
        return
      }
      this.$emit('tankMove', { userX, userY, name })
    },
  },
  destroyed () {
    window.removeEventListener('keydown', this.keyDown)
    window.removeEventListener('keyup', this.keyUp)
  }
}
</script>

<style lang="less" scoped>
</style>