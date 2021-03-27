const soloControlList = [
  { label: 'user血量', value: 'userHp' },
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
      // enemyLifLimit: 3,
      enemyX: 510,
      enemyY: 30
    },
    award: {
      bulletsFrequencyVlaue: 1, // 炮弹发射频率
    },
    // 障碍物
    barriers: [
      { X: 500, Y: 0, height: 510 }
    ],
  },
]
export {
  soloControlList,
  customList
}
