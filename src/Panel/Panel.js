/**
 * Created by hzyuanqi1 on 2016/9/21.
 */
import React from 'react'
import classNames from 'classnames'
import ReactDOM from 'react-dom'

const PanelTitle = (props) => {
  const { children } = props
  return (
    <h3 className='NEUI_panel_title'>{children}</h3>
  )
}

const PanelItem = (props) => {
  const { label, className, children, ...others } = props
  const cls = classNames({
    NEUI_panel_item: true,
    [className]: className
  })
  return (
    <div {...others} className={cls}>
      <div className='NEUI_panel_label'>{label}</div>
      {children}
    </div>
  )
}

const PanelContent = (props) => {
  const { className, children, ...others } = props
  const cls = classNames({
    NEUI_panel_content: true,
    [className]: className
  })
  return (
    <div {...others} className={cls}>
      {children}
    </div>
  )
}

const PanelDriver = () => {
  return (
    <div className='NEUI_panel_driver' />
  )
}

const PanelButton = (props) => {
  const { className, children, onPanelButtonClick, ...others } = props
  const cls = classNames({
    NEUI_panel_button: true,
    [className]: className
  })
  return (
    <div {...others} className={cls} onClick={onPanelButtonClick}>
      {children}
    </div>
  )
}

export default class Panel extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      limit: false,
      expansion: false
    }
    this.Panel = {}
  }

  static propTypes = {}

  static defaultProps = {}

  componentWillMount() {
    this.props.children.map((el) => {
      if (el.type === PanelButton) {
        this.setState({
          limit: true
        })
      }
    })
  }

  componentDidMount() {
    if (this.state.limit) {
      setTimeout(() => {
        this.initHeight()
      })
    }
  }

  initHeight = () => {
    // TODO 拿到当前 panel
    const $panel = ReactDOM.findDOMNode(this)
    const $button = $panel.querySelector('.NEUI_panel_button')
    const degHeight = $button.offsetTop - $panel.offsetTop
    const buttonHeight = $button.offsetHeight
    this.Panel.initialHeight = $panel.offsetHeight - buttonHeight
    // 延时是因为直接取不到计算后的 padding 值
    const paddingHeight = parseInt(window.getComputedStyle($panel)['padding-top'], 10)
    $panel.style.height = degHeight + buttonHeight + 'px'
  }

  onPanelButtonClick = () => {
    if (!this.state.expansion) {
      const $panel = ReactDOM.findDOMNode(this)
      $panel.style.height = this.Panel.initialHeight + 'px'
      this.setState({
        expansion: true
      })
    }
  }

  render() {
    const { className, children, ...others } = this.props
    const { limit, expansion } = this.state
    const cls = classNames({
      NEUI_panel: true,
      NEUI_panel_limit: limit,
      NEUI_panel_expansion: expansion,
      [className]: className
    })
    const onPanelButtonClick = this.onPanelButtonClick
    return (
      <div className={cls} {...others}>
        {children.map((el, i) => {
          if (el.type === PanelButton) {
            return React.cloneElement(el, {
              key: i,
              onPanelButtonClick
            })
          } else {
            return el
          }
        })}
      </div>
    )
  }
}
Panel.Title = PanelTitle
Panel.Item = PanelItem
Panel.Content = PanelContent
Panel.Driver = PanelDriver
Panel.Button = PanelButton
