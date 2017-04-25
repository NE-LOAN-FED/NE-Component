function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
import RenderLayer from '../internal/RenderLayer';
import Icon from '../Icon';
import Modal from '../Modal';

var PropTypes = React.PropTypes;

var noop = function noop() {};

var Toast = function (_React$Component) {
  _inherits(Toast, _React$Component);

  function Toast(props) {
    _classCallCheck(this, Toast);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _this.close = _this.close.bind(_this);
    _this.state = {
      show: props.show
    };
    _this.autoClose(props.timeout);
    return _this;
  }

  Toast.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    if (nextProps.show !== this.state.show) {
      if (nextProps.show) {
        this.show();
        this.autoClose(nextProps.timeout);
      } else {
        this.close();
      }
    }
  };

  Toast.prototype.componentWillUnmount = function componentWillUnmount() {
    clearTimeout(this.timer);
  };

  Toast.prototype.autoClose = function autoClose() {
    var _this2 = this;

    var timeout = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

    if (timeout >= 0) {
      this.timer = setTimeout(function () {
        _this2.close();
      }, timeout);
    }
  };

  Toast.prototype.show = function show() {
    this.setState({
      show: true
    });
  };

  Toast.prototype.close = function close() {
    var onClose = this.props.onClose;

    if (this.state.show) {
      this.setState({
        show: false
      }, function () {
        onClose();
      });
    }
  };

  Toast.prototype.render = function render() {
    var _props = this.props,
        prefixCls = _props.prefixCls,
        content = _props.content,
        icon = _props.icon,
        show = _props.show,
        transitionName = _props.transitionName,
        className = _props.className,
        isLockScreen = _props.isLockScreen;

    return React.createElement(
      Modal,
      { show: show, transitionName: transitionName, isLockScreen: isLockScreen },
      React.createElement(
        'div',
        { className: prefixCls + '_toast ' + (className || '') },
        icon !== '' ? React.createElement(
          'div',
          { className: prefixCls + '_toast_icon' },
          React.createElement(Icon, { type: icon })
        ) : null,
        React.createElement(
          'span',
          null,
          content
        )
      )
    );
  };

  return Toast;
}(React.Component);

Toast.propTypes = {
  prefixCls: PropTypes.string,
  className: PropTypes.string, // 添加toast class
  show: PropTypes.bool, // Toast是否显示
  content: PropTypes.string,
  icon: PropTypes.string,
  onClose: PropTypes.func, // 点击onClose 触发函数
  timeout: PropTypes.number, // 设置 Toast 指定时间隐藏， -1 不自动隐藏
  isLockScreen: PropTypes.bool, //  是否锁屏
  transitionName: PropTypes.string, // 动画的类名
  transitionTimeOut: PropTypes.number // 动画的时间
};
Toast.defaultProps = {
  prefixCls: 'NEUI',
  show: false,
  timeout: 2000,
  icon: '',
  onClose: noop,
  isLockScreen: false,
  transitionName: 'fade',
  transitionTimeOut: 300
};


export default Toast;