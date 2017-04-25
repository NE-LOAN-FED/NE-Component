function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import classNames from 'classnames';
import Icon from '../Icon';

var NoticeBar = function (_Component) {
  _inherits(NoticeBar, _Component);

  function NoticeBar(props) {
    _classCallCheck(this, NoticeBar);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.state = {};
    _this.handleClose = _this.handleClose.bind(_this);
    return _this;
  }

  NoticeBar.prototype.handleClose = function handleClose() {
    this.props.onClose();
    var el = findDOMNode(this);
    el.parentNode.removeChild(el);
  };

  NoticeBar.prototype.render = function render() {
    var _classNames;

    var _props = this.props,
        type = _props.type,
        icon = _props.icon,
        prefixCls = _props.prefixCls,
        className = _props.className,
        children = _props.children,
        others = _objectWithoutProperties(_props, ['type', 'icon', 'prefixCls', 'className', 'children']);

    var cls = classNames((_classNames = {}, _classNames[className] = className, _classNames[prefixCls + '_notice_bar'] = true, _classNames));
    var iconEle = void 0;

    switch (type) {
      case 'link':
        iconEle = React.createElement(
          'div',
          { className: 'tail-icon' },
          React.createElement(Icon, { type: 'arrow' })
        );
        break;
      case 'closable':
        iconEle = React.createElement(
          'div',
          {
            className: 'tail-icon',
            onClick: this.handleClose },
          React.createElement(Icon, { type: 'close' })
        );
        break;
      default:
        iconEle = null;
    }

    return React.createElement(
      'div',
      { className: cls,
        onClick: this.props.onClick
      },
      icon ? React.createElement(
        'div',
        { className: 'head-icon' },
        icon
      ) : null,
      React.createElement(
        'div',
        { className: 'content' },
        children
      ),
      iconEle
    );
  };

  return NoticeBar;
}(Component);

NoticeBar.propTypes = {
  prefixCls: PropTypes.string,
  onClose: PropTypes.func,
  onClick: PropTypes.func,
  children: PropTypes.string,
  icon: PropTypes.element,
  type: PropTypes.oneOf(['link', 'closable', ''])
};
NoticeBar.defaultProps = {
  prefixCls: 'NEUI',
  type: '',
  icon: null,
  onClose: function onClose() {},
  onClick: function onClick() {}
};
export default NoticeBar;