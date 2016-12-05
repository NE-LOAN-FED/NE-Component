/**
 * Created by kisnows on 2016/9/21.
 */
import React, { Component, PropTypes } from 'react'
import classNames from 'classnames'

const PanelItem = (props) => {
  const {label, className, children, ...others} = props
  const cls = classNames({
    ui_panel_item: true,
    [className]: className
  })
  return (
    <div {...others} className={cls}>
      <div className="ui_panel_label">{label}</div>
      {children}
    </div>
  )
}

const PanelContent = (props) => {
  const {className, children, ...others} = props
  const cls = classNames({
    ui_panel_content: true,
    [className]: className
  })
  return (
    <div {...others} className={cls}>
      {children}
    </div>
  )
}

const PanelButton = (props) => {
  const {className, children, onPanelButtonClick, ...others} = props
  const cls = classNames({
    ui_panel_button: true,
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
    const $panel = document.querySelector('.ui_panel')
    const $button = document.querySelector('.ui_panel .ui_panel_button')
    const degHeight = $button.offsetTop - $panel.offsetTop
    const buttonHeight = $button.offsetHeight
    this.Panel.initialHeight = $panel.offsetHeight - buttonHeight
    // 延时是因为直接取不到计算后的 padding 值
    const paddingHeight = parseInt(window.getComputedStyle($panel)['padding-top'], 10)
    $panel.style.height = degHeight + buttonHeight + 'px'
  }

  onPanelButtonClick = () => {
    if (!this.state.expansion) {
      const $panel = document.querySelector('.ui_panel')
      $panel.style.height = this.Panel.initialHeight + 'px'
      this.setState({
        expansion: true
      })
    }
  }

  render() {
    const {className, children, ...others} = this.props
    const {limit, expansion} = this.state
    const cls = classNames({
      ui_panel: true,
      ui_panel_limit: limit,
      ui_panel_expansion: expansion,
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

Panel.Item = PanelItem
Panel.Content = PanelContent
Panel.Button = PanelButton
