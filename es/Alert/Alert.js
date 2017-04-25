var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
var PropTypes = React.PropTypes;
import classname from 'classnames';
import Modal from '../Modal';
var noop = function noop() {};

var Alert = function (_React$Component) {
  _inherits(Alert, _React$Component);

  function Alert() {
    _classCallCheck(this, Alert);

    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
  }

  Alert.prototype.render = function render() {
    var _classname;

    var _props = this.props,
        prefixCls = _props.prefixCls,
        className = _props.className,
        children = _props.children,
        onClose = _props.onClose,
        show = _props.show,
        transitionName = _props.transitionName,
        transitionTimeOut = _props.transitionTimeOut,
        others = _objectWithoutProperties(_props, ['prefixCls', 'className', 'children', 'onClose', 'show', 'transitionName', 'transitionTimeOut']);

    var cls = classname((_classname = {}, _classname[prefixCls + '_modal'] = true, _classname[className] = className, _classname));
    return React.createElement(
      Modal,
      { show: show, transitionName: transitionName, transitionTimeOut: transitionTimeOut },
      React.createElement(
        'div',
        _extends({ className: cls }, others),
        React.createElement(
          'div',
          { className: prefixCls + '_modal_body' },
          children || null
        ),
        React.createElement(
          'div',
          { className: prefixCls + '_modal_close', onClick: onClose },
          React.createElement('i', { className: prefixCls + '_modal_icon ' + prefixCls + '_modal_icon_close' })
        )
      )
    );
  };

  return Alert;
}(React.Component);

Alert.propTypes = {
  prefixCls: PropTypes.string,
  show: PropTypes.bool, // modal 显示
  onClose: PropTypes.func, // modal close 事件
  transitionName: PropTypes.string, // 动画的类名
  transitionTimeOut: PropTypes.number // 动画的时间
};
Alert.defaultProps = {
  prefixCls: 'NEUI',
  show: false,
  onClose: noop,
  transitionName: 'vertialSlide',
  transitionTimeOut: 300
};
export default Alert;