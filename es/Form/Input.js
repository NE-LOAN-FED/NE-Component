var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Created by kisnows on 2016/12/26.
 */
import React from 'react';
import classNames from 'classnames';
import Icon from '../Icon';

var PropTypes = React.PropTypes;
// TODO 完成 Input 重构
var env = process.env || process.env.NODE_ENV === 'development' ? 'DEBUG' : 'PROD';
var noop = function noop() {};

var _FieldInput = function (_React$Component) {
  _inherits(_FieldInput, _React$Component);

  function _FieldInput(props) {
    _classCallCheck(this, _FieldInput);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _initialiseProps.call(_this);

    _this.timer = null;
    _this.state = {
      showDelIcon: false,
      value: _this.props.value || '',
      isError: _this.props.isError || false
    };
    return _this;
  }

  _FieldInput.prototype.componentDidMount = function componentDidMount() {};

  _FieldInput.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.state.value) {
      var nextValue = typeof nextProps.value === 'undefined' ? '' : nextProps.value;
      this.setState({
        value: nextValue
      });
    }
  };

  _FieldInput.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps, nextState) {
    return this.props.disabled !== nextProps.disabled || this.state.value !== nextState.value || this.state.showDelIcon !== nextState.showDelIcon || this.state.isError !== nextState.isError;
  };

  _FieldInput.prototype.componentWillUpdate = function componentWillUpdate(nextProps, nextState) {};

  _FieldInput.prototype.componentDidUpdate = function componentDidUpdate(preProps, preState) {
    var handleFieldChange = preProps.handleFieldChange;

    if (this.state.value !== preState.value || this.state.isError !== preState.isError) {
      handleFieldChange(this.data);
    }
  };

  _FieldInput.prototype.componentWillUnmount = function componentWillUnmount() {
    clearTimeout(this.timer);
  };

  _FieldInput.prototype.render = function render() {
    var _classNames;

    var _state = this.state,
        showDelIcon = _state.showDelIcon,
        value = _state.value;
    var _props = this.props,
        className = _props.className,
        disabled = _props.disabled,
        name = _props.name,
        type = _props.type,
        formatter = _props.formatter;

    var formatterValue = formatter(value);
    var prefix = 'NEUI';
    var cls = classNames((_classNames = {}, _classNames[prefix + '_input'] = true, _classNames[prefix + '_input_disabled'] = disabled, _classNames[className] = className, _classNames));
    var handleDelClick = this.handleDelClick;
    return React.createElement(
      'label',
      { className: cls },
      React.createElement('input', { name: name,
        value: formatterValue,
        type: type,
        onChange: this.handleChange,
        onFocus: this.handleFocus,
        onBlur: this.handleBlur
      }),
      showDelIcon ? React.createElement(Icon, { onClick: handleDelClick, type: 'del' }) : null
    );
  };

  _createClass(_FieldInput, [{
    key: 'data',
    get: function get() {
      var _state2 = this.state,
          value = _state2.value,
          isError = _state2.isError;
      var _props2 = this.props,
          name = _props2.name,
          errorMsg = _props2.errorMsg,
          required = _props2.required,
          shouldRsa = _props2.shouldRsa;

      return {
        name: name,
        value: value,
        isError: isError,
        errorMsg: errorMsg,
        required: required,
        shouldRsa: shouldRsa
      };
    }
  }]);

  return _FieldInput;
}(React.Component);

_FieldInput.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.any,
  type: PropTypes.string,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  disabled: PropTypes.bool,
  handleFieldChange: PropTypes.func,
  shouldRsa: PropTypes.bool,
  required: PropTypes.bool,
  validate: function validate(props, propName, componentName) {
    if (!(props[propName] instanceof RegExp || props[propName] instanceof Function)) {
      throw new Error('Invalid prop `' + propName + '` supplied to' + ' `' + componentName + '`. Must be a Function or RegExp.');
    }
  },
  errorMsg: PropTypes.string,
  isError: PropTypes.bool,
  formatter: PropTypes.func,
  parser: PropTypes.func
};
_FieldInput.defaultProps = {
  type: 'text',
  isError: false,
  shouldRsa: false,
  required: true,
  validate: function validate() {
    return true;
  },
  errorMsg: '表单填写错误',
  disabled: false,
  onChange: noop,
  onFocus: noop,
  onBlur: noop,
  handleFieldChange: noop,
  formatter: function formatter(data) {
    return data;
  },
  parser: function parser(data) {
    return data;
  }
};

var _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this.handleValidate = function (e) {
    var value = e.target.value;
    var validate = _this2.props.validate;

    var isError = false;
    // TODO 考虑把校验方法提取出来，作为 props 传给 Input
    if (validate instanceof RegExp) {
      isError = !(value && validate.test(value));
    } else if (validate instanceof Function) {
      if (!value) {
        return isError = false;
      }
      var validateResult = validate(value);
      if (validateResult.then instanceof Function) {
        validateResult.then(function (result) {
          return _this2.setState({
            isError: result
          });
        });
      } else {
        isError = !validateResult;
      }
    } else {
      isError = !value;
    }
    _this2.setState({
      isError: isError
    });
  };

  this.handleChange = function (e) {
    var parser = _this2.props.parser;

    var value = e.target.value;
    var formatterE = Object.assign({}, e, {
      target: {
        value: parser(value)
      }
    });
    _this2.props.onChange(formatterE);
    _this2.handleValidate(formatterE);
    _this2.setState({
      value: formatterE.target.value,
      showDelIcon: !!formatterE.target.value.length
    });
  };

  this.handleFocus = function (e) {
    var onFocus = _this2.props.onFocus;

    onFocus(e);
    if (e.target.value.length > 0) {
      _this2.setState({
        showDelIcon: true
      });
    }
  };

  this.handleBlur = function (e) {
    // 因为要异步的使用 e, 所以需要保留 e 的引用
    e.persist();
    var _props3 = _this2.props,
        name = _props3.name,
        onBlur = _props3.onBlur;

    onBlur(e);
    // TODO 考虑做成配置项，来决定什么时候作校验
    _this2.handleValidate(e);

    // 延迟是为了当用户点击删除按钮的时候不会因为已经触发了 onBlur 事件而导致删除按钮不显示
    _this2.timer = setTimeout(function () {
      _this2.setState({
        showDelIcon: false
      });
    }, 300);
  };

  this.handleEmptied = function () {
    var e = {
      target: {
        value: ''
      }
    };
    _this2.handleChange(e);
  };

  this.handleDelClick = function () {
    _this2.handleEmptied();
    _this2.setState({
      showDelIcon: false
    });
  };
};

export default _FieldInput;