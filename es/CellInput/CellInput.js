var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
import classNames from 'classnames';

var PropTypes = React.PropTypes;
var NUMBER_REGEXP = /^\d+$/;

var CellInput = function (_React$Component) {
  _inherits(CellInput, _React$Component);

  function CellInput(props) {
    _classCallCheck(this, CellInput);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _this.onChange = _this.onChange.bind(_this);
    _this.onFocus = _this.onFocus.bind(_this);
    _this.state = {
      value: props.value,
      activeIndex: -1
    };
    return _this;
  }

  CellInput.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.props.value) {
      this.setValueState(nextProps.value);
      this.setCellsActive(nextProps.value);
    }
  };

  CellInput.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps, nextState) {
    if (nextState.value !== this.state.value || nextState.activeIndex !== this.state.activeIndex) {
      return true;
    }
    if (nextProps.maxLength !== this.props.maxLength || nextProps.type !== this.props.type) {
      return true;
    }
    return false;
  };

  CellInput.prototype.componentDidUpdate = function componentDidUpdate() {
    this.setCellsActive(this.state.value);
  };

  CellInput.prototype.componentDidMount = function componentDidMount() {
    if (this.props.autoFocus) {
      this.setFocus();
    }
  };

  CellInput.prototype.isValidate = function isValidate(value) {
    var _props = this.props,
        type = _props.type,
        maxLength = _props.maxLength,
        validate = _props.validate;

    if (value.length > maxLength) {
      return false;
    }
    if (type === 'number') {
      return NUMBER_REGEXP.test(value);
    }
    if (validate instanceof RegExp) {
      return validate.test(value);
    } else {
      return validate(value);
    }
  };

  CellInput.prototype.isCompletion = function isCompletion() {
    var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.state.value;

    if (this.isValidate(value) && value.length === this.props.maxLength) {
      return true;
    }
    return false;
  };

  CellInput.prototype.setCellsActive = function setCellsActive() {
    var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.state.value;
    var maxLength = this.props.maxLength;

    var index = value.length;
    if (index < maxLength && index > 0) {
      this.setState({
        activeIndex: index
      });
    } else {
      this.setState({
        activeIndex: index
      });
    }
  };

  CellInput.prototype.setValueState = function setValueState(value) {
    var _this2 = this;

    var _props2 = this.props,
        maxLength = _props2.maxLength,
        onConfirm = _props2.onConfirm,
        onChange = _props2.onChange,
        onError = _props2.onError,
        errorMsg = _props2.errorMsg;

    var prevValue = this.state.value;
    if (this.isValidate(value) || value === '') {
      this.setState({
        value: value
      }, function () {
        onChange(value);
        if (_this2.isCompletion(value)) {
          _this2.props.onConfirm(_this2.state.value);
        }
      });
    } else {
      this.setState({
        value: prevValue
      }, function () {
        onError(errorMsg);
      });
    }
  };

  CellInput.prototype.setFocus = function setFocus() {
    this.Input.focus();
    this.setCellsActive(this.state.value);
  };

  CellInput.prototype.clearValue = function clearValue() {
    this.setState({
      value: ''
    });
  };

  CellInput.prototype.onChange = function onChange(e) {
    var value = e.target.value;
    this.setValueState(value);
  };

  CellInput.prototype.onFocus = function onFocus(e) {
    this.props.onFocus(e);
  };

  CellInput.prototype.createCellsEle = function createCellsEle() {
    var _state = this.state,
        value = _state.value,
        activeIndex = _state.activeIndex;
    var _props3 = this.props,
        prefixCls = _props3.prefixCls,
        maxLength = _props3.maxLength;

    var cellsEle = [];
    for (var i = 0; i < maxLength; i++) {
      var cellProps = {
        prefixCls: prefixCls,
        value: value.substr(i, 1),
        active: i === activeIndex
      };
      cellsEle[i] = React.createElement(Cell, _extends({ key: i }, cellProps));
    }
    return cellsEle;
  };

  CellInput.prototype.render = function render() {
    var _classNames,
        _this3 = this;

    var _props4 = this.props,
        prefixCls = _props4.prefixCls,
        value = _props4.value,
        type = _props4.type,
        name = _props4.name,
        maxLength = _props4.maxLength,
        className = _props4.className,
        disabled = _props4.disabled,
        required = _props4.required,
        onChange = _props4.onChange,
        onFocus = _props4.onFocus,
        validate = _props4.validate,
        errorMsg = _props4.errorMsg,
        other = _objectWithoutProperties(_props4, ['prefixCls', 'value', 'type', 'name', 'maxLength', 'className', 'disabled', 'required', 'onChange', 'onFocus', 'validate', 'errorMsg']);

    var classnames = classNames((_classNames = {}, _classNames[prefixCls + '_cell_input'] = true, _classNames[prefixCls + '_cell_input_disabled'] = disabled, _classNames[className] = className, _classNames));

    var cells = this.createCellsEle();
    return React.createElement(
      'label',
      { className: classnames },
      React.createElement('input', _extends({ disabled: disabled,
        name: name,
        value: this.state.value,
        ref: function ref(_ref) {
          _this3.Input = _ref;
        },
        onChange: this.onChange,
        onFocus: this.onFocus
      }, other)),
      React.createElement(
        'div',
        { className: prefixCls + '_cell_input_list' },
        cells
      )
    );
  };

  return CellInput;
}(React.Component);

CellInput.propTypes = {
  prefixCls: PropTypes.string,
  value: PropTypes.string || PropTypes.number,
  name: PropTypes.string,
  maxLength: PropTypes.number,
  type: PropTypes.string,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onConfirm: PropTypes.func,
  onError: PropTypes.func,
  autoFocus: PropTypes.bool,
  errorMsg: PropTypes.string,
  validate: function validate(props, propName, componentName) {
    if (!(props[propName] instanceof RegExp || props[propName] instanceof Function)) {
      throw new Error('Invalid prop `' + propName + '` supplied to' + ' `' + componentName + '`. Must be a Function or RegExp.');
    }
  }
};
CellInput.defaultProps = {
  prefixCls: 'NEUI',
  value: '',
  type: 'number',
  maxLength: 6,
  autoFocus: true,
  onChange: function onChange() {},
  onFocus: function onFocus() {},
  onConfirm: function onConfirm() {},
  onError: function onError() {},
  errorMsg: '输入信息有误',
  validate: function validate() {
    return true;
  }
};
export default CellInput;


var Cell = function Cell(props) {
  var _classNames2;

  var prefixCls = props.prefixCls,
      value = props.value,
      active = props.active;

  var classnames = classNames((_classNames2 = {}, _classNames2[prefixCls + '_cell_input_item'] = true, _classNames2.active = active, _classNames2));
  return React.createElement(
    'span',
    { className: classnames },
    props.value
  );
};