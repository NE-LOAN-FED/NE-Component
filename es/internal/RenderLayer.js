function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
import ReactDOM from 'react-dom';

var PropTypes = React.PropTypes;

var RenderLayer = function (_React$Component) {
  _inherits(RenderLayer, _React$Component);

  function RenderLayer(props) {
    _classCallCheck(this, RenderLayer);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _this.onClick = _this.onClick.bind(_this);
    return _this;
  }

  RenderLayer.prototype.componentDidMount = function componentDidMount() {
    this.renderLayer();
  };

  RenderLayer.prototype.componentDidUpdate = function componentDidUpdate() {
    this.renderLayer();
  };

  RenderLayer.prototype.componentWillUnmount = function componentWillUnmount() {
    this.unrenderLayer();
  };

  RenderLayer.prototype.onClick = function onClick(e) {
    var _props = this.props,
        show = _props.show,
        onLayerClick = _props.onLayerClick;

    if (!show) {
      return;
    }
    if (!onLayerClick) {
      return;
    }
    onLayerClick(e);
  };

  RenderLayer.prototype.unrenderLayer = function unrenderLayer() {
    if (!this.layer) {
      return;
    }

    if (this.props.layerClickAble) {
      // this.layer.style.position = 'relative'
      this.layer.removeEventListener('touchstart', this.onClick);
      this.layer.removeEventListener('click', this.onClick);
    }

    ReactDOM.unmountComponentAtNode(this.layer);
    document.body.removeChild(this.layer);
    this.layer = null;
  };

  RenderLayer.prototype.renderLayer = function renderLayer() {
    var _props2 = this.props,
        show = _props2.show,
        render = _props2.render;

    if (show) {
      if (render) {
        if (!this.layer) {
          this.layer = document.createElement('div');
          document.body.appendChild(this.layer);
          if (this.props.layerClickAble) {
            this.layer.addEventListener('touchstart', this.onClick);
            this.layer.addEventListener('click', this.onClick);
            this.layer.style.position = 'fixed';
            this.layer.style.top = 0;
            this.layer.style.bottom = 0;
            this.layer.style.left = 0;
            this.layer.style.right = 0;
            this.layer.style.zIndex = this.props.zIndex || '999';
          }
        }

        var layerEle = render();
        this.layerEle = ReactDOM.unstable_renderSubtreeIntoContainer(this, layerEle, this.layer);
      }
    } else {
      this.unrenderLayer();
    }
  };

  RenderLayer.prototype.render = function render() {
    return null;
  };

  return RenderLayer;
}(React.Component);

RenderLayer.propTypes = {
  show: PropTypes.bool,
  render: PropTypes.func,
  layerClickAble: PropTypes.bool,
  onLayerClick: PropTypes.func,
  zIndex: PropTypes.string
};
RenderLayer.defaultProps = {
  show: false,
  layerClickAble: false
};


export default RenderLayer;