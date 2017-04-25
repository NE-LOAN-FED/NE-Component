function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
var PropTypes = React.PropTypes;
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import RenderLayer from '../internal/RenderLayer';
import Mask from '../internal/Mask';
import classname from 'classnames';

var noop = function noop() {};

var Modal = function (_React$Component) {
  _inherits(Modal, _React$Component);

  function Modal(props) {
    _classCallCheck(this, Modal);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _this.renderContent = _this.renderContent.bind(_this);
    return _this;
  }

  Modal.prototype.renderContent = function renderContent() {
    var _props = this.props,
        children = _props.children,
        show = _props.show,
        isLockScreen = _props.isLockScreen,
        onClickAway = _props.onClickAway,
        prepareStyle = _props.prepareStyle,
        transitionName = _props.transitionName,
        transitionTimeOut = _props.transitionTimeOut;

    var style = {
      position: 'fixed',
      top: 0,
      left: show ? 0 : '-10000px',
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 900,
      transition: show ? '0ms left 0ms' : '0ms left ' + transitionTimeOut + 'ms'
    };
    return React.createElement(
      'div',
      { style: Object.assign(style, prepareStyle) },
      React.createElement(
        ReactCSSTransitionGroup,
        {
          component: 'div',
          transitionAppear: true,
          transitionAppearTimeout: transitionTimeOut,
          transitionEnter: true,
          transitionEnterTimeout: transitionTimeOut,
          transitionLeave: true,
          transitionLeaveTimeout: transitionTimeOut,
          transitionName: transitionName
        },
        show && children
      ),
      isLockScreen && React.createElement(Mask, { show: show, onClick: onClickAway })
    );
  };

  Modal.prototype.render = function render() {
    return React.createElement(RenderLayer, { render: this.renderContent, show: true });
  };

  return Modal;
}(React.Component);

Modal.propTypes = {
  show: PropTypes.bool, //  是否展示 Modal
  isLockScreen: PropTypes.bool, //  是否锁屏
  onClickAway: PropTypes.func, //  点击遮罩层的回掉
  prepareStyle: PropTypes.object, // 需要覆盖的样式
  transitionName: PropTypes.string, // 动画的类名
  transitionTimeOut: PropTypes.number // 动画的时间
};
Modal.defaultProps = {
  show: false,
  isLockScreen: true,
  onClickAway: noop,
  prepareStyle: {},
  transitionName: 'vertialSlide',
  transitionTimeOut: 300
};


export default Modal;