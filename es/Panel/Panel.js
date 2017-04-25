var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

/**
 * Created by hzyuanqi1 on 2016/9/21.
 */
import React from 'react';
import classNames from 'classnames';
import ReactDOM from 'react-dom';

var PanelTitle = function PanelTitle(props) {
  var children = props.children;

  return React.createElement(
    'h3',
    { className: 'NEUI_panel_title' },
    children
  );
};

var PanelItem = function PanelItem(props) {
  var _classNames;

  var label = props.label,
      className = props.className,
      children = props.children,
      others = _objectWithoutProperties(props, ['label', 'className', 'children']);

  var cls = classNames((_classNames = {
    NEUI_panel_item: true
  }, _classNames[className] = className, _classNames));
  return React.createElement(
    'div',
    _extends({}, others, { className: cls }),
    React.createElement(
      'div',
      { className: 'NEUI_panel_label' },
      label
    ),
    children
  );
};

var PanelContent = function PanelContent(props) {
  var _classNames2;

  var className = props.className,
      children = props.children,
      others = _objectWithoutProperties(props, ['className', 'children']);

  var cls = classNames((_classNames2 = {
    NEUI_panel_content: true
  }, _classNames2[className] = className, _classNames2));
  return React.createElement(
    'div',
    _extends({}, others, { className: cls }),
    children
  );
};

var PanelDriver = function PanelDriver() {
  return React.createElement('div', { className: 'NEUI_panel_driver' });
};

var PanelButton = function PanelButton(props) {
  var _classNames3;

  var className = props.className,
      children = props.children,
      onPanelButtonClick = props.onPanelButtonClick,
      others = _objectWithoutProperties(props, ['className', 'children', 'onPanelButtonClick']);

  var cls = classNames((_classNames3 = {
    NEUI_panel_button: true
  }, _classNames3[className] = className, _classNames3));
  return React.createElement(
    'div',
    _extends({}, others, { className: cls, onClick: onPanelButtonClick }),
    children
  );
};

var Panel = function (_React$Component) {
  _inherits(Panel, _React$Component);

  function Panel(props) {
    _classCallCheck(this, Panel);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _this.initHeight = function () {
      // TODO 拿到当前 panel
      var $panel = ReactDOM.findDOMNode(_this);
      var $button = $panel.querySelector('.NEUI_panel_button');
      var degHeight = $button.offsetTop - $panel.offsetTop;
      var buttonHeight = $button.offsetHeight;
      _this.Panel.initialHeight = $panel.offsetHeight - buttonHeight;
      // 延时是因为直接取不到计算后的 padding 值
      var paddingHeight = parseInt(window.getComputedStyle($panel)['padding-top'], 10);
      $panel.style.height = degHeight + buttonHeight + 'px';
    };

    _this.onPanelButtonClick = function () {
      if (!_this.state.expansion) {
        var $panel = ReactDOM.findDOMNode(_this);
        $panel.style.height = _this.Panel.initialHeight + 'px';
        _this.setState({
          expansion: true
        });
      }
    };

    _this.state = {
      limit: false,
      expansion: false
    };
    _this.Panel = {};
    return _this;
  }

  Panel.prototype.componentWillMount = function componentWillMount() {
    var _this2 = this;

    this.props.children.map(function (el) {
      if (el.type === PanelButton) {
        _this2.setState({
          limit: true
        });
      }
    });
  };

  Panel.prototype.componentDidMount = function componentDidMount() {
    var _this3 = this;

    if (this.state.limit) {
      setTimeout(function () {
        _this3.initHeight();
      });
    }
  };

  Panel.prototype.render = function render() {
    var _classNames4;

    var _props = this.props,
        className = _props.className,
        children = _props.children,
        others = _objectWithoutProperties(_props, ['className', 'children']);

    var _state = this.state,
        limit = _state.limit,
        expansion = _state.expansion;

    var cls = classNames((_classNames4 = {
      NEUI_panel: true,
      NEUI_panel_limit: limit,
      NEUI_panel_expansion: expansion
    }, _classNames4[className] = className, _classNames4));
    var onPanelButtonClick = this.onPanelButtonClick;
    return React.createElement(
      'div',
      _extends({ className: cls }, others),
      children.map(function (el, i) {
        if (el.type === PanelButton) {
          return React.cloneElement(el, {
            key: i,
            onPanelButtonClick: onPanelButtonClick
          });
        } else {
          return el;
        }
      })
    );
  };

  return Panel;
}(React.Component);

Panel.propTypes = {};
Panel.defaultProps = {};
export default Panel;

Panel.Title = PanelTitle;
Panel.Item = PanelItem;
Panel.Content = PanelContent;
Panel.Driver = PanelDriver;
Panel.Button = PanelButton;