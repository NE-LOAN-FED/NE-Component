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

var Dialog = function (_React$Component) {
  _inherits(Dialog, _React$Component);

  function Dialog() {
    _classCallCheck(this, Dialog);

    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
  }

  Dialog.prototype.render = function render() {
    var _classname;

    var _props = this.props,
        prefixCls = _props.prefixCls,
        confirmContent = _props.confirmContent,
        headerContent = _props.headerContent,
        onConfirm = _props.onConfirm,
        onCancel = _props.onCancel,
        cancelContent = _props.cancelContent,
        className = _props.className,
        show = _props.show,
        transitionName = _props.transitionName,
        transitionTimeOut = _props.transitionTimeOut,
        others = _objectWithoutProperties(_props, ['prefixCls', 'confirmContent', 'headerContent', 'onConfirm', 'onCancel', 'cancelContent', 'className', 'show', 'transitionName', 'transitionTimeOut']);

    var confirmEle = confirmContent ? React.createElement(
      'button',
      { onClick: onConfirm, className: prefixCls + '_dialog_confirm_button' },
      confirmContent
    ) : null;
    var cancelEle = cancelContent ? React.createElement(
      'button',
      { onClick: onCancel, className: prefixCls + '_dialog_cancel_button' },
      cancelContent
    ) : null;
    var header = headerContent ? React.createElement(
      'div',
      { className: prefixCls + '_dialog_header' },
      React.createElement(
        'h4',
        { className: prefixCls + '_dialog_header_content' },
        headerContent
      )
    ) : null;
    var content = this.props.children ? React.createElement(
      'div',
      { className: prefixCls + '_dialog_content' },
      this.props.children
    ) : null;
    var cls = classname((_classname = {}, _classname[prefixCls + '_dialog'] = true, _classname[className] = className, _classname));
    return React.createElement(
      Modal,
      { show: show, transitionName: transitionName, transitionTimeOut: transitionTimeOut },
      React.createElement(
        'div',
        _extends({ className: cls }, others),
        header,
        content,
        React.createElement(
          'div',
          { className: prefixCls + '_dialog_confirm_box' },
          cancelEle,
          confirmEle
        )
      )
    );
  };

  return Dialog;
}(React.Component);

Dialog.propTypes = {
  prefixCls: PropTypes.string,
  show: PropTypes.bool, // dialog 显示
  onConfirm: PropTypes.func, // dialog confirm 事件
  onCancel: PropTypes.func, // dialog cancel 事件
  headerContent: PropTypes.node, // 头部内容
  confirmContent: PropTypes.node, // 确认内容
  cancelContent: PropTypes.node, // 取消内容
  transitionName: PropTypes.string, // 动画的类名
  transitionTimeOut: PropTypes.number // 动画的时间
};
Dialog.defaultProps = {
  prefixCls: 'NEUI',
  show: false,
  onConfirm: noop,
  onCancel: noop,
  transitionName: 'vertialSlide',
  transitionTimeOut: 300
};


export default Dialog;