var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Created by hzyuanqi1 on 2016/9/12.
 */
import React from 'react';
import classNames from 'classnames';
var PropTypes = React.PropTypes;

var Cell = function (_React$Component) {
  _inherits(Cell, _React$Component);

  function Cell() {
    _classCallCheck(this, Cell);

    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
  }

  Cell.prototype.render = function render() {
    var _classNames;

    var _props = this.props,
        className = _props.className,
        children = _props.children,
        tip = _props.tip,
        warning = _props.warning,
        others = _objectWithoutProperties(_props, ['className', 'children', 'tip', 'warning']);

    var Component = this.props.href ? 'a' : this.props.htmlFor === 'undefined' ? 'div' : 'label';
    var cls = classNames((_classNames = {
      NEUI_cell: true,
      NEUI_cell_tip: tip,
      NEUI_cell_warning: warning
    }, _classNames[className] = className, _classNames));
    return React.createElement(
      Component,
      _extends({ className: cls }, others),
      children
    );
  };

  return Cell;
}(React.Component);

Cell.propTypes = {
  tip: PropTypes.bool,
  warning: PropTypes.bool
};
Cell.defaultProps = {
  tip: false,
  warning: false
};
export default Cell;