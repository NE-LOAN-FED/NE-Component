function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Created by kisnows on 2017/2/20.
 */
import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import ReactTransitionGroup from 'react-addons-transition-group';
// TODO 完善动画组件，以解决 ReactCssTransitionGroup 不好实现自适应高度过度动画的问题

var Animate = function (_React$Component) {
  _inherits(Animate, _React$Component);

  function Animate() {
    _classCallCheck(this, Animate);

    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
  }

  return Animate;
}(React.Component);

export default Animate;