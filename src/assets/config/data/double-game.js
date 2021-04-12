const soloControlList = [
  // { label: '敌人生命数量', value: 'enemyLifLimit' },
  { label: '敌人生命数量', value: 'enemyLifLimit' },
  { label: '游戏关卡', value: 'custom' },
]
const doubleControlList = [
  { label: 'K : Q', value: 'QHitTime', value2: 'KHitTime' },
  { label: '最大死亡次数', value: 'maxDie' },
  // { label: '游戏关卡', value: 'custom' },
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
const initData = {
  maxDie: 10,
  QHitTime: 0,
  KHitTime: 0
}
export {
  doubleControlList,
  soloControlList,
  customList,
  usersData,
  initData
}
