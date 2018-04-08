export default interface ModalProps {
  show: boolean, // modal 显示
  isLockScreen: boolean, // 是否添加遮罩
  isClickMaskToClose: boolean, // 是否点击遮罩关闭
  transitionName: string, // 动画的类名
  transitionTimeOut: number, // 动画的时间
  prepareStyle: object // 覆盖默认的 Modal 样式
  onClose: (e) => void, // modal close 事件
  onMaskClick: (e) => void, // 遮罩点击事件
}
