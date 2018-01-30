import React from 'react'
import ReactDOM from 'react-dom'

export interface RenderLayerPropTypes {
  show: boolean;
  render: () => JSX.Element;
  layerClickAble?: boolean;
  onLayerClick?: (e: MouseEvent) => void;
  zIndex?: string;
  className?: string;
}
class RenderLayer extends React.Component<RenderLayerPropTypes, {}> {
  layer: any
  static defaultProps = {
    show: false,
    layerClickAble: false
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
    const { show, onLayerClick } = this.props
    if (!show) {
      return
    }
    if (!onLayerClick) {
      return
    }
    onLayerClick(e)
  }

  unrenderLayer() {
    if (!this.layer) {
      return
    }

    if (this.props.layerClickAble) {
      // this.layer.style.position = 'relative'
      this.layer.removeEventListener('touchstart', this.onClick)
      this.layer.removeEventListener('click', this.onClick)
    }

    ReactDOM.unmountComponentAtNode(this.layer)
    document.body.removeChild(this.layer)
    this.layer = null
  }

  renderLayer() {
    const { show, render } = this.props
    if (show) {
      if (render) {
        if (!this.layer) {
          this.layer = document.createElement('div')
          document.body.appendChild(this.layer)
          if (this.props.layerClickAble) {
            this.layer.addEventListener('touchstart', this.onClick)
            this.layer.addEventListener('click', this.onClick)
            this.layer.style.position = 'fixed'
            this.layer.style.top = 0
            this.layer.style.bottom = 0
            this.layer.style.left = 0
            this.layer.style.right = 0
            this.layer.style.zIndex = this.props.zIndex || '999'
          }
        }

        const layerEle = render()
        ReactDOM.unstable_renderSubtreeIntoContainer(this, layerEle, this.layer)
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
