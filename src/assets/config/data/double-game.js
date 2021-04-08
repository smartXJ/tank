const keyCodeType = {
  // black
  87: 'top',
  83: 'down',
  65: 'left',
  68: 'right',
  32: 'space',
  // red
  38: 'up',
  40: 'dowwn',
  37: 'left',
  39: 'right',
  45: 'zero',
  // start game
  13: 'enter',
}
const soloControlList = [
  // { label: '敌人生命数量', value: 'enemyLifLimit' },
  { label: '敌人生命数量', value: 'enemyLifLimit' },
  { label: '游戏关卡', value: 'custom' },
]
const doubleControlList = [
  { label: 'K : Q', value: 'QHitTime', value2: 'KHitTime' },
  // { label: '敌人生命数量', value: 'enemyLifLimit' },
  { label: '敌人生命数量', value: 'enemyLifLimit' },
  { label: '游戏关卡', value: 'custom' },
]
const customList = [
  {
    custom: 1,
    // 开始参数
    deploy: {
      enemyLifLimit: 1,
      // enemyAmple: 4
    },
    // 过关奖励
    award: {
      userHp: 2,
      // bulletsFrequencyVlaue: 1, // 炮弹发射频率
    },
  },
  {
    custom: 2,
    deploy: {
      enemyLifLimit: 3,
      enemyX: 510,
      enemyY: 30
    },
    award: {
      bulletsFrequencyVlaue: 1, // 炮弹发射频率
    },
    // 障碍物
    barriers: [
      { X: 100, Y: 0, width: 200 },
      { X: 300, Y: 0, height: 100 },
      { X: 100, Y: 100, width: 200 },
      { X: 300, Y: 0, height: 100 },
      { X: 300, Y: 0, width: 200 }
    ],
  },
]
export {
  doubleControlList,
  soloControlList,
  customList,
  keyCodeType
}
