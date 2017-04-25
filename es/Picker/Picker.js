function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
import { Animate, easeOutCubic, easeInOutCubic } from '../internal/Animate';

var PropTypes = React.PropTypes;

var DECELERATION_VELOCITY_RATE = 0.95;

var MIN_VELOCITY_TO_KEEP_DECELERATING = 0.5;
var POSITION_MAX_LENGTH = 40;
var MINIUM_TRACKING_FOR_SCROLL = 0;
var MINIUM_TRACKING_FOR_DRAG = 5;
var DEFAULT_ANIM_DURATION = 250;
var TIME_FRAME = 100;

var CLIENT_ITEM_COUNT = 5;

var MIN_VELOCITY_TO_START_DECELERATION = 4;

function isEmptyArray(a) {
  return !a || !a.length;
}

function getComputedStyle(el, key) {
  var computedStyle = window.getComputedStyle(el);
  return computedStyle[key] || '';
}

function isChildrenEqual(c1, c2, pure) {
  if (isEmptyArray(c1) && isEmptyArray(c2)) {
    return true;
  }
  if (pure) {
    return c1 === c2;
  }
  if (c1.length !== c2.length) {
    return false;
  }
  var len = c1.length;
  while (len--) {
    if (c1[len].value !== c2[len].value || c1[len].label !== c2[len].label) {
      return false;
    }
  }
  return true;
}

var Picker = function (_React$Component) {
  _inherits(Picker, _React$Component);

  function Picker(props) {
    _classCallCheck(this, Picker);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _this.state = _this.initState();
    return _this;
  }

  Picker.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    if ('selectedValue' in nextProps) {
      this.setState({
        selectedValue: nextProps.selectedValue
      });
    }
  };

  Picker.prototype.componentDidMount = function componentDidMount() {
    this.init();
    this.component.addEventListener('touchstart', this.onTouchStart.bind(this), false);
  };

  Picker.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps, nextState) {
    return nextState.selectedValue !== this.state.selectedValue || !isChildrenEqual(nextProps.children, this.props.children, this.props.pure);
  };

  Picker.prototype.componentDidUpdate = function componentDidUpdate(prevProps) {
    if (!isChildrenEqual(prevProps.children, this.props.children, this.props.pure)) {
      this.init();
    } else {
      this.select(this.state.selectedValue);
    }
  };

  Picker.prototype.componentWillUnmount = function componentWillUnmount() {
    this.component.removeEventListener('touchstart', this.onTouchStart.bind(this), false);
  };

  Picker.prototype.init = function init() {
    Object.assign(this, {
      isAnimating: false,
      isDragging: false,
      isDecelerating: false,
      enableScrollY: false,
      initialTouchTop: 0,
      clientHeight: 0,
      itemHeight: 0,
      scrollTop: 0,
      minScrollTop: 0,
      maxScrollTop: 0,
      lastTouchTop: 0,
      lastTouchMove: 0,
      minDecelerationScrollTop: 0,
      maxDecelerationScrollTop: 0,
      decelerationVelocityY: 0,
      positions: []
    });
    this.setDimensions();
    this.select(this.state.selectedValue);
  };

  Picker.prototype.initState = function initState() {
    var selectedValueState = void 0;
    var _props = this.props,
        selectedValue = _props.selectedValue,
        defaultSelectedValue = _props.defaultSelectedValue,
        children = _props.children;

    if (selectedValue !== undefined) {
      selectedValueState = selectedValue;
    } else if (defaultSelectedValue !== undefined) {
      selectedValueState = defaultSelectedValue;
    } else if (children.length) {
      selectedValueState = children[0].value;
    }
    return {
      selectedValue: selectedValueState
    };
  };

  Picker.prototype.scrollTo = function scrollTo(top) {
    var animate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

    this.clearAnim();
    top = Math.round(top / this.itemHeight) * this.itemHeight;
    top = Math.max(Math.min(this.maxScrollTop, top), this.minScrollTop);

    if (top === this.scrollTop) {
      this.publish(top);
      this.scrollingComplete();
      return;
    }
    this.publish(top, DEFAULT_ANIM_DURATION);
  };

  Picker.prototype.selectByIndex = function selectByIndex(index) {
    if (index < 0 || index >= this.props.children.length) {
      throw new Error('Invalid prop index supplied to Picker Must > 0 and < children.length.');
    }
    // 滑动到指定位置
    this.scrollTop = this.minScrollTop + index * this.itemHeight;
    this.scrollTo(this.scrollTop);
  };

  Picker.prototype.select = function select(value) {
    var children = this.props.children;

    for (var i = 0, len = children.length; i < len; i++) {
      if (children[i].value === value) {
        this.selectByIndex(i);
        return;
      }
    }
    this.selectByIndex(0);
  };

  Picker.prototype.fireValueChange = function fireValueChange(selectedValue) {
    if (selectedValue !== this.state.selectedValue) {
      if (!('selectedValue' in this.props)) {
        this.setState({
          selectedValue: selectedValue
        });
      }
      this.props.onValueChange(selectedValue);
    }
  };

  Picker.prototype.scrollingComplete = function scrollingComplete() {
    var index = Math.round((this.scrollTop - this.minScrollTop - this.itemHeight / 2) / this.itemHeight);
    var child = this.props.children[index];
    if (child) {
      this.fireValueChange(child.value);
    }
  };

  Picker.prototype.setDimensions = function setDimensions() {
    var component = this.component,
        indicator = this.indicator,
        content = this.content;
    var _props2 = this.props,
        children = _props2.children,
        clientItemCount = _props2.clientItemCount;

    var totalItemCount = children.length;

    // 根据实际高度滑动
    this.itemHeight = parseFloat(getComputedStyle(indicator, 'height'), 10) || this.props.itemHeight;
    this.clientHeight = component.clientHeight;

    this.minScrollTop = -this.itemHeight * (clientItemCount / 2);
    this.maxScrollTop = this.minScrollTop + this.itemHeight * totalItemCount - 0.001;
  };

  Picker.prototype.onTouchStart = function onTouchStart(e) {
    e.preventDefault();
    this.component.addEventListener('touchmove', this.onTouchMove.bind(this), false);
    this.component.addEventListener('touchend', this.onTouchEnd.bind(this), false);

    if (!this.props.disabled) {
      this.doTouchStart(e.touches, e.timeStamp);
    }
  };

  Picker.prototype.onTouchMove = function onTouchMove(e) {
    if (!this.props.disabled) {
      this.doTouchMove(e.touches, e.timeStamp);
    }
  };

  Picker.prototype.onTouchEnd = function onTouchEnd(e) {
    this.component.removeEventListener('touchmove', this.onTouchMove.bind(this), false);
    this.component.removeEventListener('touchend', this.onTouchEnd.bind(this), false);

    if (!this.props.disabled) {
      this.doTouchEnd(e.timeStamp);
    }
  };

  Picker.prototype.clearAnim = function clearAnim() {
    if (this.isDecelerating) {
      Animate.stop(this.isDecelerating);
      this.isDecelerating = false;
    }

    if (this.isAnimating) {
      Animate.stop(this.isAnimating);
      this.isAnimating = false;
    }
  };

  Picker.prototype.doTouchStart = function doTouchStart(touches, timeStamp) {
    var touchY = touches[0].pageY;
    this.clearAnim();

    Object.assign(this, {
      isDragging: false,
      isDecelerating: false,
      enableScrollY: false,
      timeStamp: timeStamp,
      sinitialTouchTop: touchY,
      lastTouchTop: touchY,
      lastTouchMove: timeStamp,
      positions: []
    });
  };

  Picker.prototype.addPosition = function addPosition(top, timeStamp) {
    var positions = this.positions;
    if (positions.length > POSITION_MAX_LENGTH) {
      positions.splice(0, POSITION_MAX_LENGTH / 2);
    }
    positions.push(top, timeStamp);
  };

  Picker.prototype.doTouchMove = function doTouchMove(touches, timeStamp) {
    var currentTouchTop = touches[0].pageY;

    var isDragging = this.isDragging,
        lastTouchTop = this.lastTouchTop,
        initialTouchTop = this.initialTouchTop,
        maxScrollTop = this.maxScrollTop,
        minScrollTop = this.minScrollTop,
        positions = this.positions;


    if (isDragging) {
      var moveY = currentTouchTop - lastTouchTop;
      var scrollTop = this.scrollTop;

      // 判断是否到达顶部或者底部
      if (this.enableScrollY) {
        scrollTop -= moveY;
        if (scrollTop > maxScrollTop || scrollTop < minScrollTop) {
          if (scrollTop > maxScrollTop) {
            scrollTop = maxScrollTop;
          } else {
            scrollTop = minScrollTop;
          }
        }
      }
      // 将移动位置和时间戳信息推入 postions
      this.addPosition(scrollTop, timeStamp);
      this.publish(scrollTop);
    } else {
      var distanceY = Math.abs(currentTouchTop - initialTouchTop);
      this.enableScrollY = distanceY >= MINIUM_TRACKING_FOR_SCROLL;

      this.addPosition(this.scrollTop, timeStamp);
      this.isDragging = distanceY >= MINIUM_TRACKING_FOR_DRAG;
    }
    this.lastTouchTop = currentTouchTop;
    this.lastTouchMove = timeStamp;
  };

  Picker.prototype.doTouchEnd = function doTouchEnd(timeStamp) {
    var isDragging = this.isDragging,
        scrollTop = this.scrollTop,
        lastTouchMove = this.lastTouchMove,
        positions = this.positions;


    if (isDragging) {
      this.isDragging = false;
      if (timeStamp - lastTouchMove <= TIME_FRAME) {
        var endPos = positions.length - 1;
        var startPos = endPos;
        // 根据 100ms 前的位置和最后一次位置差异进行减速动作
        for (var i = endPos; i > 0 && positions[i] > lastTouchMove - TIME_FRAME; i -= 2) {
          startPos = i;
        }
        if (startPos !== endPos) {
          var timeOffset = positions[endPos] - positions[startPos];
          var moveTop = this.scrollTop - positions[startPos - 1];
          this.decelerationVelocityY = moveTop / timeOffset * (1000 / 60);

          // 大于最小移动比限制进行减速动作
          if (Math.abs(this.decelerationVelocityY) > MIN_VELOCITY_TO_START_DECELERATION) {
            this.startDeceleration();
          }
        }
      }
    }
    if (!this.isDecelerating) {
      this.scrollTo(scrollTop);
    }

    this.positions.length = 0;
  };

  Picker.prototype.setTop = function setTop(top) {
    var content = this.content;


    if (content) {
      content.style.webkitTransform = 'translate3d(0, ' + -top + 'px, 0)';
    }
  };

  Picker.prototype.publish = function publish(top, animationDuration) {
    var _this2 = this;

    var wasAnimating = this.isAnimating;
    if (wasAnimating) {
      Animate.stop(wasAnimating);
      this.isAnimating = false;
    }

    if (animationDuration) {
      this.scheduledTop = top;

      var oldTop = this.scrollTop;
      var diffTop = top - oldTop;

      var step = function step(percent) {
        _this2.scrollTop = oldTop + diffTop * percent;
        _this2.setTop(_this2.scrollTop);
      };

      var verify = function verify(id) {
        return _this2.isAnimating === id;
      };

      var completed = function completed(renderedFramesPerSecond, animationId, wasFinished) {
        if (animationId === _this2.isAnimating) {
          _this2.isAnimating = false;
        }
        if (_this2.didDecelerationComplete || wasFinished) {
          _this2.scrollingComplete();
        }
      };

      // 使用 Animate 开启动画移动
      this.isAnimating = Animate.start(step, verify, completed, animationDuration, wasAnimating ? easeOutCubic : easeInOutCubic);
    } else {
      this.scheduledTop = this.scrollTop = top;
      this.setTop(top);
    }
  };

  Picker.prototype.startDeceleration = function startDeceleration() {
    var _this3 = this;

    this.minDecelerationScrollTop = this.minScrollTop;
    this.maxDecelerationScrollTop = this.maxScrollTop;

    var step = function step(percent, now, render) {
      // 每步动画操作
      _this3.stepThroughDeceleration(render);
    };

    var verify = function verify() {
      var shouldContinue = Math.abs(_this3.decelerationVelocityY) >= MIN_VELOCITY_TO_KEEP_DECELERATING;
      if (!shouldContinue) {
        _this3.didDecelerationComplete = true;
      }
      return shouldContinue;
    };

    var completed = function completed() {
      _this3.isDecelerating = false;
      if (_this3.scrollTop <= _this3.minScrollTop || _this3.scrollTop >= _this3.maxScrollTop) {
        _this3.scrollTo(_this3.scrollTop);
        return;
      }
      if (_this3.didDecelerationComplete) {
        _this3.scrollingComplete();
      }
    };

    this.isDecelerating = Animate.start(step, verify, completed);
  };

  Picker.prototype.stepThroughDeceleration = function stepThroughDeceleration() {
    var scrollTop = this.scrollTop + this.decelerationVelocityY;

    var scrollTopFixed = Math.max(Math.min(this.maxDecelerationScrollTop, scrollTop), this.minDecelerationScrollTop);
    if (scrollTopFixed !== scrollTop) {
      scrollTop = scrollTopFixed;
      this.decelerationVelocityY = 0;
    }

    if (Math.abs(this.decelerationVelocityY) <= 1) {
      if (Math.abs(scrollTop % this.itemHeight) < 1) {
        this.decelerationVelocityY = 0;
      }
    } else {
      this.decelerationVelocityY *= DECELERATION_VELOCITY_RATE;
    }

    this.publish(scrollTop);
  };

  Picker.prototype.render = function render() {
    var _this4 = this;

    var _props3 = this.props,
        children = _props3.children,
        prefixCls = _props3.prefixCls,
        className = _props3.className;
    var selectedValue = this.state.selectedValue;

    var items = children.map(function (item) {
      return React.createElement(
        'div',
        { className: selectedValue === item.value ? prefixCls + '_picker_item_selected' : prefixCls + '_picker_item',
          key: item.value, 'data-value': item.value
        },
        item.label
      );
    });

    return React.createElement(
      'div',
      { className: (className || '') + ' ' + prefixCls + '_picker', ref: function ref(_ref3) {
          _this4.component = _ref3;
        } },
      React.createElement('div', { className: prefixCls + '_picker_indicator', ref: function ref(_ref) {
          _this4.indicator = _ref;
        } }),
      React.createElement(
        'div',
        { className: prefixCls + '_picker_content', ref: function ref(_ref2) {
            _this4.content = _ref2;
          } },
        items
      )
    );
  };

  return Picker;
}(React.Component);

Picker.propTypes = {
  prefixCls: PropTypes.string,
  defaultSelectedValue: PropTypes.any,
  selectedValue: PropTypes.any,
  children: PropTypes.array,
  className: PropTypes.string,
  pure: PropTypes.bool,
  itemHeight: PropTypes.any,
  clientItemCount: PropTypes.any,
  disabled: PropTypes.bool,
  onValueChange: PropTypes.func
};
Picker.defaultProps = {
  prefixCls: 'NEUI',
  disabled: false,
  pure: false,
  itemHeight: '60',
  clientItemCount: 5,
  onValueChange: function onValueChange() {}
};


export default Picker;