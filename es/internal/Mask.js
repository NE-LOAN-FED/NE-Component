var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { PropTypes, Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

var Mask = function (_Component) {
  _inherits(Mask, _Component);

  function Mask() {
    _classCallCheck(this, Mask);

    return _possibleConstructorReturn(this, _Component.apply(this, arguments));
  }

  Mask.prototype.render = function render() {
    var _props = this.props,
        show = _props.show,
        prefixCls = _props.prefixCls,
        backgroundColor = _props.backgroundColor,
        others = _objectWithoutProperties(_props, ['show', 'prefixCls', 'backgroundColor']);

    var style = {
      position: 'fixed',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      backgroundColor: backgroundColor || 'rgba(0,0,0,0.5)'
    };
    function FirstChild(props) {
      var childrenArray = React.Children.toArray(props.children);
      return childrenArray[0] || null;
    }
    return React.createElement(
      ReactCSSTransitionGroup,
      {
        transitionAppear: true,
        transitionAppearTimeout: 300,
        transitionEnter: false,
        transitionLeave: true,
        transitionLeaveTimeout: 300,
        transitionName: 'fade'
      },
      show ? React.createElement('div', _extends({ style: style }, others)) : null
    );
  };

  return Mask;
}(Component);

Mask.propTypes = {
  prefixCls: PropTypes.string,
  show: PropTypes.bool
};
Mask.defaultProps = {
  show: false
};


export default Mask;