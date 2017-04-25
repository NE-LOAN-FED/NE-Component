var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
import classNames from 'classnames';
import Icon from '../Icon';

var PropTypes = React.PropTypes;
var noop = function noop() {};
// TODO 待完成,解决嵌套在 Form 组件后 checkbox 的选择问题

var _FieldCheckbox = function (_React$Component) {
  _inherits(_FieldCheckbox, _React$Component);

  function _FieldCheckbox(props) {
    _classCallCheck(this, _FieldCheckbox);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _this.handleChange = function (e) {
      _this.props.onChange(e);
      _this.setState({
        value: e.target.checked
      });
    };

    _this.state = {
      value: _this.props.value || false
    };
    return _this;
  }

  _FieldCheckbox.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.state.value) {
      var nextValue = typeof nextProps.value === 'undefined' ? false : nextProps.value;
      this.setState({
        value: nextValue
      });
    }
  };

  _FieldCheckbox.prototype.componentDidUpdate = function componentDidUpdate(preProps, preState) {
    var handleFieldChange = preProps.handleFieldChange;

    if (preState.value !== this.state.value) {
      handleFieldChange(this.data);
      console.log(this.data);
    }
  };

  _FieldCheckbox.prototype.render = function render() {
    var _classNames;

    var _props = this.props,
        className = _props.className,
        name = _props.name,
        value = _props.value,
        children = _props.children,
        onChange = _props.onChange,
        handleFieldChange = _props.handleFieldChange,
        others = _objectWithoutProperties(_props, ['className', 'name', 'value', 'children', 'onChange', 'handleFieldChange']);

    var cls = classNames((_classNames = {
      NEUI_checkbox: true,
      NEUI_checkbox_checked: this.state.value
    }, _classNames[className] = className, _classNames));
    return React.createElement(
      'div',
      { className: cls },
      React.createElement('input', _extends({ type: 'checkbox',
        name: name,
        onChange: this.handleChange,
        checked: this.state.value,
        value: value
      }, others)),
      this.state.value ? React.createElement(Icon, { type: 'tick', className: 'NEUI_checkbox_icon' }) : null,
      children
    );
  };

  _createClass(_FieldCheckbox, [{
    key: 'data',
    get: function get() {
      var value = this.state.value;
      var _props2 = this.props,
          name = _props2.name,
          shouldRsa = _props2.shouldRsa;

      return {
        name: name,
        value: value,
        shouldRsa: shouldRsa
      };
    }
  }]);

  return _FieldCheckbox;
}(React.Component);

_FieldCheckbox.propTypes = {
  name: PropTypes.string,
  value: PropTypes.bool,
  shouldRsa: PropTypes.bool,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  handleFieldChange: PropTypes.func
};
_FieldCheckbox.defaultProps = {
  required: true,
  disabled: false,
  onChange: noop,
  handleFieldChange: noop
};
export default _FieldCheckbox;