var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
import RenderLayer from '../internal/RenderLayer';
import Picker from '../Picker';
import Icon from '../Icon';
import { noop, formatDate as _formatDate, cloneDate, addYears, addMonths, addDays, getYears as _getYears, getMonths as _getMonths, getDays as _getDays, getDaysInMonth } from './DateUtils.js';

var PropTypes = React.PropTypes;

var DatePicker = function (_React$Component) {
  _inherits(DatePicker, _React$Component);

  function DatePicker(props) {
    _classCallCheck(this, DatePicker);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _this.onClick = _this.onClick.bind(_this);
    _this.onConfirm = _this.onConfirm.bind(_this);
    _this.onCancel = _this.onCancel.bind(_this);
    _this.onYearChange = _this.onYearChange.bind(_this);
    _this.onMonthChange = _this.onMonthChange.bind(_this);
    _this.onDayChange = _this.onDayChange.bind(_this);
    _this.renderContent = _this.renderContent.bind(_this);
    _this.init();
    _this.state = _this.initState();
    return _this;
  }

  DatePicker.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    if ('date' in nextProps && nextProps.date) {
      this.setState({
        selectedDate: cloneDate(nextProps.date)
      });
    }
    if ('show' in nextProps) {
      this.setState({
        show: nextProps.show
      });
    }
  };

  DatePicker.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps, nextState) {
    if (this.state.show !== nextState.show || this.state.selectedDate.getTime() !== cloneDate(nextState.selectedDate).getTime()) {
      return true;
    }
    return false;
  };

  DatePicker.prototype.initState = function initState() {
    var selectedDateState = void 0;
    var _props = this.props,
        show = _props.show,
        defaultDate = _props.defaultDate,
        date = _props.date;

    if (date) {
      selectedDateState = cloneDate(date);
      this.selectedDateFormat = this.formatDate(selectedDateState);
    } else if (defaultDate) {
      selectedDateState = cloneDate(defaultDate);
      this.selectedDateFormat = this.formatDate(selectedDateState);
    } else {
      selectedDateState = new Date();
    }
    return {
      show: false,
      selectedDate: selectedDateState
    };
  };

  DatePicker.prototype.init = function init() {
    Object.assign(this, {
      liveUpdate: false,
      selectedDateFormat: null,
      years: [],
      months: [],
      days: []
    });
  };

  DatePicker.prototype.setSelectedDateFormat = function setSelectedDateFormat() {
    var selectedDate = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.state.selectedDate;

    this.selectedDateFormat = this.formatDate(selectedDate);
  };

  DatePicker.prototype.formatDate = function formatDate(date) {
    var format = this.props.format;
    if (this.props.type === 'YM') {
      format = 'yyyy-MM';
    }
    return _formatDate(date, format);
  };

  DatePicker.prototype.getYears = function getYears() {
    var minDate = this.props.minDate;
    var maxDate = this.props.maxDate;
    if (!minDate || !maxDate) {
      if (!minDate) {
        minDate = addYears(this.getSelectedDate(), -30);
      }
      if (!maxDate) {
        maxDate = addYears(this.getSelectedDate(), 30);
      }
    }
    return this.formatArrayToPicker(_getYears(minDate, maxDate), function (i) {
      return i + '年';
    });
  };

  DatePicker.prototype.getMonths = function getMonths() {
    var _props2 = this.props,
        minDate = _props2.minDate,
        maxDate = _props2.maxDate;

    return this.formatArrayToPicker(_getMonths(this.state.selectedDate, minDate, maxDate), function (i) {
      return i + 1 + '月';
    });
  };

  DatePicker.prototype.getDays = function getDays() {
    var _props3 = this.props,
        minDate = _props3.minDate,
        maxDate = _props3.maxDate;

    return this.formatArrayToPicker(_getDays(this.state.selectedDate, minDate, maxDate), function (i) {
      return i + '日';
    });
  };

  DatePicker.prototype.getSelectedDate = function getSelectedDate() {
    return cloneDate(this.state.selectedDate);
  };

  DatePicker.prototype.getSelectedYear = function getSelectedYear() {
    return this.getSelectedDate().getFullYear();
  };

  DatePicker.prototype.getSelectedMonth = function getSelectedMonth() {
    return this.getSelectedDate().getMonth();
  };

  DatePicker.prototype.getSelectedDay = function getSelectedDay() {
    return this.getSelectedDate().getDate();
  };

  DatePicker.prototype.formatArrayToPicker = function formatArrayToPicker(a, extra) {
    var arr = [];
    for (var i = 0, len = a.length; i < len; i++) {
      arr.push({
        value: a[i],
        label: extra(a[i])
      });
    }
    return arr;
  };

  DatePicker.prototype.onConfirm = function onConfirm() {
    var _this2 = this;

    this.setSelectedDateFormat();
    this.setState({
      show: false
    }, function () {
      _this2.props.onConfirm(_this2.state.selectedDate, _this2.selectedDateFormat);
    });
  };

  DatePicker.prototype.onClick = function onClick() {
    this.setState({
      show: true
    });
  };

  DatePicker.prototype.onCancel = function onCancel() {
    var _this3 = this;

    this.setState({
      show: false
    }, function () {
      _this3.props.onCancel();
    });
  };

  DatePicker.prototype.onYearChange = function onYearChange(y) {
    var date = cloneDate(this.getSelectedDate().setFullYear(y));
    this.fireDateChange(date);
  };

  DatePicker.prototype.onMonthChange = function onMonthChange(m) {
    var date = cloneDate(this.getSelectedDate().setMonth(m));
    this.fireDateChange(date);
  };

  DatePicker.prototype.onDayChange = function onDayChange(d) {
    var date = cloneDate(this.getSelectedDate().setDate(d));
    this.fireDateChange(date);
  };

  DatePicker.prototype.fireDateChange = function fireDateChange() {
    var _this4 = this;

    var date = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.state.selectedDate;
    var cb = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : noop;

    var newDate = cloneDate(date);
    this.setState({
      selectedDate: newDate
    }, function () {
      cb(_this4.state.selectedDate);
    });
  };

  DatePicker.prototype.renderHeader = function renderHeader() {
    var _props4 = this.props,
        prefixCls = _props4.prefixCls,
        headerContent = _props4.headerContent,
        confirmContent = _props4.confirmContent,
        cancelContent = _props4.cancelContent;

    var headerEle = React.createElement(
      'div',
      { className: prefixCls + '_date_picker_header' },
      React.createElement(
        'span',
        { className: prefixCls + '_date_picker_cancel', onClick: this.onCancel },
        cancelContent
      ),
      React.createElement(
        'h4',
        { className: prefixCls + '_date_picker_header_content' },
        headerContent
      ),
      React.createElement(
        'span',
        { className: prefixCls + '_date_picker_confirm', onClick: this.onConfirm },
        confirmContent
      )
    );
    return headerEle;
  };

  DatePicker.prototype.getContent = function getContent() {
    var contents = [{
      key: 'year',
      selectedValue: this.getSelectedYear(),
      children: this.getYears(),
      onValueChange: this.onYearChange
    }, {
      key: 'month',
      selectedValue: this.getSelectedMonth(),
      children: this.getMonths(),
      onValueChange: this.onMonthChange
    }];
    // 根据 type 选择显示是否包含天
    switch (this.props.type) {
      case 'YM':
        break;
      default:
        contents.push({
          key: 'day',
          selectedValue: this.getSelectedDay(),
          children: this.getDays(),
          onValueChange: this.onDayChange
        });
    }
    return contents;
  };

  DatePicker.prototype.renderContent = function renderContent() {
    var _props5 = this.props,
        children = _props5.children,
        className = _props5.className,
        prefixCls = _props5.prefixCls,
        confirmContent = _props5.confirmContent,
        cancelContent = _props5.cancelContent,
        classNames = _props5.classNames;

    var content = this.getContent().map(function (c, i) {
      return React.createElement(Picker, _extends({ className: prefixCls + '_date_picker_content_item' }, c));
    });
    return React.createElement(
      'div',
      { className: (className || '') + ' ' + prefixCls + '_date_picker_popup' },
      this.renderHeader(),
      React.createElement(
        'div',
        { className: prefixCls + '_date_picker_content' },
        content
      )
    );
  };

  DatePicker.prototype.render = function render() {
    var prefixCls = this.props.prefixCls;

    var selectedDateFormat = this.selectedDateFormat;
    return React.createElement(
      'div',
      { className: prefixCls + '_date_picker', onClick: this.onClick },
      selectedDateFormat ? React.createElement(
        'span',
        { className: prefixCls + '_date_picker_date' },
        selectedDateFormat
      ) : React.createElement(
        'span',
        { className: prefixCls + '_date_picker_placeholder' },
        '\u8BF7\u9009\u62E9'
      ),
      React.createElement(Icon, { type: 'arrow' }),
      this.state.show ? React.createElement(RenderLayer, { className: prefixCls + '_date_modal', render: this.renderContent, show: true, maskClosable: false }) : null
    );
  };

  return DatePicker;
}(React.Component);

DatePicker.propTypes = {
  prefixCls: PropTypes.string, // 修改date组件class前缀
  className: PropTypes.string, // 添加date class
  show: PropTypes.bool, // date 显示日期选择框
  defaultDate: PropTypes.any, // 默认选中日期
  date: PropTypes.any, // 选中日期
  type: PropTypes.oneOf(['YMD', 'YM']),
  format: PropTypes.any, // 格式化方式，或者格式化函数
  maxDate: PropTypes.any, // 最大日期
  minDate: PropTypes.any, // 最小日期
  headerContent: PropTypes.node, // 头部内容
  confirmContent: PropTypes.node, // 确认内容
  cancelContent: PropTypes.node, // 取消内容
  onConfirm: PropTypes.func, // date confirm 事件
  onCancel: PropTypes.func, // date cancel 事件
  onDateChange: PropTypes.func, // 日期改变触发函数
  disabled: PropTypes.bool // 是否可以修改日期
};
DatePicker.defaultProps = {
  prefixCls: 'NEUI',
  show: false,
  type: 'YMD',
  format: 'yyyy-MM-dd',
  headerContent: '请选择日期',
  confirmContent: '完成',
  cancelContent: '取消',
  onConfirm: noop,
  onCancel: noop,
  onDateChange: noop,
  disabled: false
};


export default DatePicker;