const keyCodeType = {
  87: 'top',
  83: 'down',
  65: 'left',
  68: 'right',
  32: 'space'
}
const controlList = [
  { label: '炮弹频率', value: 'bulletsFrequencyVlaue' },
  { label: '敌人血量', value: 'foreHp' },
  { label: '敌人位置 X-Y', value: 'enemyX', value2: 'enemyY' },
  { label: '一次移动的距离 px', value: 'disdance' },
  { label: '控制中心宽度', value: 'controlWidth' },
]
export {
  keyCodeType,
  controlList
}