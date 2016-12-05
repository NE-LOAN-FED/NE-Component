/**
 * Created by kisnows on 2016/9/13.
 */
import React from 'react'
import classNames from 'classnames'

export default class Icon extends React.Component {

  static propTypes = {
    type: React.PropTypes.oneOf(['tip', 'loading', 'del', 'arrow', 'tick', 'camera', 'wait']).isRequired,
    size: React.PropTypes.string
  }

  static defaultProps = {
    type: 'tip',
    size: 'normal'
  }

  render() {
    const {className, type, size, ...others} = this.props
    const cls = classNames({
      ui_icon: true,
      ui_icon_tip: type === 'tip',
      ui_icon_loading: type === 'loading',
      ui_icon_del: type === 'del',
      ui_icon_arrow: type === 'arrow',
      ui_icon_tick: type === 'tick',
      ui_icon_camera: type === 'camera',
      ui_icon_wait: type === 'wait',
      ui_icon_normal: size === 'normal',
      [className]: className
    })
    return (
      <i className={cls} {...others} />
    )
  }
}
