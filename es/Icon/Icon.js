var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Created by hzyuanqi1 on 2016/9/13.
 */
import React from 'react';
import classNames from 'classnames';

var PropTypes = React.PropTypes;

var Icon = function (_React$Component) {
  _inherits(Icon, _React$Component);

  function Icon() {
    _classCallCheck(this, Icon);

    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
  }

  Icon.prototype.render = function render() {
    var _classNames;

    // TODO 抽离出所有项目通用的 Icon，类似 提示、警告、完成、失败等
    var _props = this.props,
        prefixCls = _props.prefixCls,
        className = _props.className,
        type = _props.type,
        others = _objectWithoutProperties(_props, ['prefixCls', 'className', 'type']);

    var cls = classNames((_classNames = {}, _classNames[prefixCls + '_icon'] = true, _classNames[prefixCls + '_icon_' + type] = true, _classNames[className] = className, _classNames));
    return React.createElement('i', _extends({ className: cls }, others));
  };

  return Icon;
}(React.Component);

Icon.propTypes = {
  prefixCls: PropTypes.string,
  type: PropTypes.oneOf(['tip', 'loading', 'del', 'arrow', 'tick', 'wait', 'close', 'wait', 'warning', 'success'])
};
Icon.defaultProps = {
  prefixCls: 'NEUI',
  type: 'tip'
};
export default Icon;