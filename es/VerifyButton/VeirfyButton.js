function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Created by hzyuanqi1 on 2016/9/28.
 */
import React from 'react';
import classNames from 'classnames';

var PropTypes = React.PropTypes;

var VerifyButton = function (_React$Component) {
  _inherits(VerifyButton, _React$Component);

  function VerifyButton(props) {
    _classCallCheck(this, VerifyButton);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _this.send = function () {
      var _this$props = _this.props,
          isCanSend = _this$props.isCanSend,
          handleClick = _this$props.handleClick;

      if (!isCanSend()) return false;
      var count = 60;
      handleClick();
      _this.setState({
        isSending: true,
        text: '60s后重发'
      }, function () {
        _this.timer = setInterval(function () {
          count -= 1;
          if (count === 0) {
            clearInterval(_this.timer);
            _this.setState({
              text: _this.props.text,
              isSending: false
            });
          } else {
            _this.setState({
              text: count + 's\u540E\u91CD\u53D1'
            });
          }
        }, 1000);
      });
    };

    _this.state = {
      isSending: _this.props.isSending,
      text: _this.props.text,
      times: _this.props.times
    };
    return _this;
  }

  VerifyButton.prototype.getIsSending = function getIsSending() {
    return this.state.isSending;
  };

  VerifyButton.prototype.componentWillUnmount = function componentWillUnmount() {
    clearInterval(this.timer);
  };

  VerifyButton.prototype.render = function render() {
    var _classNames,
        _this2 = this;

    var className = this.props.className;
    var _state = this.state,
        isSending = _state.isSending,
        text = _state.text;

    var cls = classNames((_classNames = {
      NEUI_verify: true,
      NEUI_verify_sending: isSending
    }, _classNames[className] = className, _classNames));
    return React.createElement(
      'button',
      { className: cls,
        onClick: function onClick(e) {
          e.preventDefault();
          _this2.send();
        },
        disabled: isSending
      },
      text
    );
  };

  return VerifyButton;
}(React.Component);

VerifyButton.propTypes = {
  isSending: PropTypes.bool,
  text: PropTypes.string,
  times: PropTypes.number,
  isCanSend: PropTypes.func
};
VerifyButton.defaultProps = {
  isSending: false,
  text: '发送验证码',
  times: 60,
  isCanSend: function isCanSend() {
    return true;
  },
  handleClick: function handleClick() {}
};
export default VerifyButton;