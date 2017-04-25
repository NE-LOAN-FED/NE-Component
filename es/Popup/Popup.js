function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
import classNames from 'classnames';
import RenderLayer from '../internal/RenderLayer';

var PropTypes = React.PropTypes;

var noop = function noop() {};

var Popup = function (_React$Component) {
  _inherits(Popup, _React$Component);

  function Popup(props) {
    _classCallCheck(this, Popup);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _this.onMaskClose = _this.onMaskClose.bind(_this);
    _this.renderContent = _this.renderContent.bind(_this);
    _this.state = {
      show: props.show
    };
    return _this;
  }

  Popup.prototype.componentWillReceiveProps = function componentWillReceiveProps(newProps) {
    if (newProps.show !== this.props.show) {
      this.setState({
        show: newProps.show
      });
    }
  };

  Popup.prototype.onMaskClose = function onMaskClose() {
    this.setState({
      show: false
    });
    this.props.onMaskClose();
  };

  Popup.prototype.renderContent = function renderContent() {
    var _classNames;

    var _props = this.props,
        prefixCls = _props.prefixCls,
        className = _props.className,
        type = _props.type,
        children = _props.children;

    var classnames = classNames((_classNames = {}, _classNames[prefixCls + '_popup'] = true, _classNames[className] = !!className, _classNames[prefixCls + '_popup_' + type] = true, _classNames));
    return React.createElement(
      'div',
      { className: classnames },
      children
    );
  };

  Popup.prototype.render = function render() {
    var _props2 = this.props,
        prefixCls = _props2.prefixCls,
        maskClosable = _props2.maskClosable,
        onMaskClose = _props2.onMaskClose;


    return React.createElement(RenderLayer, { className: prefixCls + '_popup_modal', render: this.renderContent, show: this.state.show, maskClosable: maskClosable, onMaskClose: this.onMaskClose });
  };

  return Popup;
}(React.Component);

Popup.propTypes = {
  prefixCls: PropTypes.string,
  className: PropTypes.string, // 添加 popup class
  show: PropTypes.bool, // popup 显示
  type: PropTypes.oneOf(['bottom', 'top']), // popup 位置，默认底部
  maskClosable: PropTypes.bool, // 点击遮罩是否可以关闭,默认可以关闭
  onMaskClose: PropTypes.func // 遮罩关闭回调函数
};
Popup.defaultProps = {
  prefixCls: 'NEUI',
  show: false,
  type: 'bottom',
  maskClosable: true,
  onMaskClose: function onMaskClose() {}
};


export default Popup;