var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Created by hzyuanqi1 on 2016/9/8.
 */
import React from 'react';
import classNames from 'classnames';

var Button = function (_React$Component) {
  _inherits(Button, _React$Component);

  function Button() {
    _classCallCheck(this, Button);

    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
  }

  Button.prototype.render = function render() {
    var _classNames;

    var _props = this.props,
        role = _props.role,
        type = _props.type,
        size = _props.size,
        disabled = _props.disabled,
        style = _props.style,
        className = _props.className,
        children = _props.children,
        others = _objectWithoutProperties(_props, ['role', 'type', 'size', 'disabled', 'style', 'className', 'children']);

    var cls = classNames((_classNames = {
      NEUI_button: true,
      NEUI_button_style_normal: style === 'normal',
      NEUI_button_style_rightAngle: style === 'rightAngle',
      NEUI_button_primary: role === 'primary',
      NEUI_button_secondary: role === 'secondary',
      NEUI_button_small: size === 'small',
      NEUI_button_disabled: disabled
    }, _classNames[className] = className, _classNames));
    return React.createElement(
      'button',
      _extends({ className: cls,
        disabled: disabled,
        type: type
      }, others),
      children
    );
  };

  return Button;
}(React.Component);

Button.propTypes = {
  disabled: React.PropTypes.bool,
  role: React.PropTypes.oneOf(['primary', 'secondary']),
  type: React.PropTypes.oneOf(['button', 'submit']),
  size: React.PropTypes.oneOf(['normal', 'small']),
  style: React.PropTypes.oneOf(['normal', 'rightAngle'])
};
Button.defaultProps = {
  disabled: false,
  role: 'primary',
  type: 'button',
  size: 'normal',
  style: 'normal',
  children: '确定'
};
export default Button;