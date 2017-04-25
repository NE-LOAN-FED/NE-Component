var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
import classNames from 'classnames';
import Icon from '../Icon';

var PropTypes = React.PropTypes;
var noop = function noop() {};
/**
 * 生成一个 Value 到 Name 的 Map 对象
 * @param data Object
 * @returns {{}}
 */
function mapValueToName(data) {
  var mapValueToName = {};
  data.forEach(function (v, k) {
    mapValueToName[v.value] = data[k].name;
  });
  return mapValueToName;
}

// 渲染 option，data 格式为 [{name:'name',value:'value',disabled: false}]
function renderData(data) {
  return data.map(function (item, i) {
    return React.createElement(
      'option',
      {
        key: i,
        value: item.value,
        disabled: item.disabled
      },
      item.name
    );
  });
}

var _FieldSelect = function (_React$Component) {
  _inherits(_FieldSelect, _React$Component);

  function _FieldSelect(props) {
    _classCallCheck(this, _FieldSelect);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _this.handleChange = function (e) {
      _this.props.onChange(e);
      if (e.target.value !== _this.state.value) {
        _this.setState({
          value: e.target.value
        });
      }
    };

    var data = _this.props.data;

    var valueNameMap = mapValueToName(data);
    _this.state = {
      value: _this.props.value || '',
      valueNameMap: valueNameMap
    };
    return _this;
  }

  _FieldSelect.prototype.componentWillMount = function componentWillMount() {};

  _FieldSelect.prototype.componentDidMount = function componentDidMount() {};

  _FieldSelect.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    if (this.props.data !== nextProps.data) {
      var data = nextProps.data;
      var valueNameMap = mapValueToName(data);
      this.setState({
        valueNameMap: valueNameMap
      });
    }
    if (nextProps.value !== this.state.value) {
      var nextValue = typeof nextProps.value === 'undefined' ? '' : nextProps.value;
      this.setState({
        value: nextValue
      });
    }
  };

  _FieldSelect.prototype.componentDidUpdate = function componentDidUpdate(preProps, preState) {
    var handleFieldChange = preProps.handleFieldChange;

    if (preState.value !== this.state.value) {
      handleFieldChange(this.data);
    }
  };

  _FieldSelect.prototype.render = function render() {
    var _classNames;

    var _props = this.props,
        className = _props.className,
        name = _props.name,
        data = _props.data,
        disabled = _props.disabled,
        children = _props.children;
    var value = this.state.value;

    var cls = classNames((_classNames = {
      NEUI_select: true
    }, _classNames[className] = className, _classNames));
    var label = value ? this.state.valueNameMap[value] : '请选择';
    return React.createElement(
      'div',
      { className: cls },
      React.createElement(
        'div',
        null,
        React.createElement(
          'span',
          null,
          label
        ),
        React.createElement(Icon, { type: 'arrow' })
      ),
      React.createElement(
        'select',
        {
          name: name,
          value: value,
          onChange: this.handleChange,
          disabled: disabled
        },
        React.createElement(
          'option',
          { disabled: !!value },
          '\u8BF7\u9009\u62E9'
        ),
        data.length > 0 ? renderData(data) : children
      )
    );
  };

  _createClass(_FieldSelect, [{
    key: 'data',
    get: function get() {
      var value = this.state.value;
      var _props2 = this.props,
          name = _props2.name,
          required = _props2.required,
          shouldRsa = _props2.shouldRsa;

      return {
        name: name,
        value: value,
        required: required,
        shouldRsa: shouldRsa
      };
    }
  }]);

  return _FieldSelect;
}(React.Component);

_FieldSelect.propTypes = {
  name: PropTypes.string,
  data: PropTypes.array,
  required: PropTypes.bool,
  shouldRsa: PropTypes.bool,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  handleFieldChange: PropTypes.func,
  value: PropTypes.any
};
_FieldSelect.defaultProps = {
  data: [],
  required: true,
  shouldRsa: false,
  onChange: noop,
  handleFieldChange: noop
};
export default _FieldSelect;