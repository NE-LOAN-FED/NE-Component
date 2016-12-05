/* eslint-disable */

import React, {Component, PropTypes} from 'react'
import {unstable_renderSubtreeIntoContainer, unmountComponentAtNode} from 'react-dom'

class RenderLayer extends Component {
  static propTypes = {
    render: PropTypes.func,
    show: PropTypes.bool,
    bodyOverHidden: PropTypes.bool,
    className: PropTypes.string,
    clickComponent: PropTypes.func,
    useClickComponent: PropTypes.bool,
    zIndex: PropTypes.string
  }

  static defaultProps = {
    show: false,
    useClickComponent: true,
    bodyOverHidden: true
  }

  constructor(props) {
    super(props)
    this.onClick = this.onClick.bind(this)
  }
  componentDidMount() {
    this.renderLayer()
  }

  componentDidUpdate() {
    this.renderLayer()
  }

  componentWillUnmount() {
    this.unrenderLayer()
  }

  onClick(e) {
    const { show, clickComponent } = this.props
    if (!show) {
      return
    }
    if (!clickComponent) {
      return
    }
    clickComponent(e)
  }
  setBodyOver(isHidden = false) {
    document.body.style.overflow = isHidden ? 'hidden' : ''
  }

  unrenderLayer() {
    if (!this.layer) {
      return
    }

    if (this.props.useClickComponent) {
      this.layer.style.position = 'relative'
      this.layer.removeEventListener('touchstart', this.onClick)
      this.layer.removeEventListener('click', this.onClick)
    }

    unmountComponentAtNode(this.layer)
    document.body.removeChild(this.layer)
    this.props.bodyOverHidden && this.setBodyOver(false)
    this.layer = null
  }

  renderLayer() {
    const { show, render, className, bodyOverHidden, unique, key } = this.props
    if (show) {
      if (render) {
        if (!this.layer) {
          this.layer = document.createElement('div')
          document.body.appendChild(this.layer)
          if (this.props.useClickComponent) {
            this.layer.addEventListener('touchstart', this.onClick)
            this.layer.addEventListener('click', this.onClick)
          }
          this.layer.style.position = 'fixed'
          this.layer.style.top = 0
          this.layer.style.left = 0
          this.layer.style.height = '100%'
          this.layer.style.width = '100%'
          this.layer.style.zIndex = this.props.zIndex || '999'
          this.layer.className = className || ''
        }

        const layerElem = render()
        this.layerElem = unstable_renderSubtreeIntoContainer(this, layerElem, this.layer)
        bodyOverHidden && this.setBodyOver(true)
      }
    } else {
      this.unrenderLayer()
    }
  }

  render() {
    return null
  }
}

export default RenderLayer
