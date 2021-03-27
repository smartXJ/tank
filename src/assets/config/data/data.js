const keyCodeType = {
  87: 'top',
  83: 'down',
  65: 'left',
  68: 'right',
  32: 'space'
}
const publicControlList = [
  { label: '炮弹发射频率', value: 'bulletsFrequencyVlaue' },
  { label: '敌人血量', value: 'enemyHp' },
  // { label: '敌人位置 X-Y', value: 'enemyX', value2: 'enemyY' },
  // { label: 'user一次移动的距离 px', value: 'disdance' },
  // { label: '炮弹一次移动距离 px', value: 'bulletDisdance' },
  // { label: '控制中心宽度', value: 'controlWidth' },
  // { label: '复活时间 s', value: 'rebirthTime' },
  // { label: '敌人死亡次数', value: 'enemyDeathLimit' },
]
export {
  keyCodeType,
  publicControlList
}