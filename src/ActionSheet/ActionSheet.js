/**
 * Created by hzyuanqi1 on 2017/5/26.
 */
import React from 'react'
const PropTypes = React.PropTypes
import classname from 'classnames'
import Modal from '../Modal'
const noop = () => { }

export default class ActionSheet extends React.Component {
  static propTypes = {
    prefixCls: PropTypes.string,
    show: PropTypes.bool,       // 显示
    onMaskClick: PropTypes.func,  // 遮罩点击事件
    menus: PropTypes.array,   // 内容列表
    onMenuChange: PropTypes.func, // 选项点击事件
    autoClose: PropTypes.bool,  // 点击一个选项后，是否自动关闭
    showCancel: PropTypes.bool,  // 显示底部取消
    cancelText: PropTypes.string, // 取消文本
    transitionName: PropTypes.string, // 动画的类名
    transitionTimeOut: PropTypes.number // 动画的时间
  }

  static defaultProps = {
    prefixCls: 'NEUI',
    show: false,
    onMaskClick: noop,
    onMenuChange: noop,
    autoClose: true,
    showCancel: false,
    cancelText: '取消',
    transitionName: 'verticalSlideBT',
    transitionTimeOut: 300,
    menus: []
  }

  constructor (props) {
    super(props)
    this.state = {
      open: props.show || false
    }
  }

  componentWillReceiveProps(props) {
    this.setState({
      open: props.show
    })
  }

  onMenuClick = (key) => {
    const { autoClose, onMenuChange } = this.props
    if (autoClose) {
      this.setState({
        open: false
      })
    }
    onMenuChange && onMenuChange(key)
  }

  render () {
    const {
      prefixCls, menus, className, showCancel, cancelText, onMaskClick, transitionName, transitionTimeOut, ...others
    } = this.props
    const {
      open
    } = this.state
    const cls = classname({
      [`${prefixCls}_action__sheet`]: true,
      [className]: className
    })
    return (
      <Modal show={open} transitionName={transitionName} transitionTimeOut={transitionTimeOut} onClickAway={onMaskClick}>
        <ul className={cls}>
          {menus.map((el, index) => {
            return <li key={index} onClick={() => this.onMenuClick(index)}>{el}</li>
          })}
          {showCancel &&
          <li className={`${prefixCls}_action_cancel`} key={-1} onClick={() => this.onMenuClick(-1)}>{cancelText}</li>
          }
        </ul>
      </Modal>
    )
  }
}
