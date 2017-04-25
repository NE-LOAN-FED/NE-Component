import isNumber from 'lodash/isNumber';
import isFunction from 'lodash/isFunction';
import isString from 'lodash/isString';

var monthList = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
var FORMAT_YEAR_CHAR = /y{1,4}/;
var FORMAT_MONTH_CHAR = /M{1,2}/;
var FORMAT_DAY_CHAR = /d{1,2}/;
var ZERO_CHAR = 0;

var toString = Object.prototype.toString;

export function noop() {}

// 获取固定 size 的 number。 trim 设置为 true 则长度超过 size 部分去除
function formatNumber(number, size) {
  var trim = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

  if (size === 0 || !(isString(number) || isNumber(number))) {
    return '';
  }
  var value = '' + number;
  while (value.length < size) {
    value = ZERO_CHAR + value;
  }
  if (trim) {
    value = value.substr(value.length - size);
  }
  return value;
}

function dateGetter(name) {
  var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var trim = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

  return function (date, match) {
    var size = match.length || 0;
    var value = date['get' + name]();
    if (offset > 0 || value > -offset) {
      value += offset;
    }
    return formatNumber(value, size, trim);
  };
}

var DATE_FORMATS = new Map([[FORMAT_YEAR_CHAR, dateGetter('FullYear', 0, true)], [FORMAT_MONTH_CHAR, dateGetter('Month', 1)], [FORMAT_DAY_CHAR, dateGetter('Date')]]);

export function formatDate(date, format) {
  var newDate = cloneDate(date);
  if (isString(format)) {
    return dateFilter(date, format);
  } else if (isFunction(format)) {
    return format(date);
  }
  return date;
}

export function set() {
  for (var _len = arguments.length, times = Array(_len), _key = 0; _key < _len; _key++) {
    times[_key] = arguments[_key];
  }

  return new (Function.prototype.bind.apply(Date, [null].concat(times)))();
}

function dateFilter(date, f) {
  var format = f;

  var _loop = function _loop() {
    if (_isArray) {
      if (_i >= _iterator.length) return 'break';
      _ref = _iterator[_i++];
    } else {
      _i = _iterator.next();
      if (_i.done) return 'break';
      _ref = _i.value;
    }

    var _ref2 = _ref,
        key = _ref2[0],
        value = _ref2[1];

    format = format.replace(key, function (s) {
      return value(date, s);
    });
  };

  for (var _iterator = DATE_FORMATS, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
    var _ref;

    var _ret = _loop();

    if (_ret === 'break') break;
  }
  return format;
}

export function cloneDate(d) {
  return typeof d === 'undefined' ? d : new Date(d);
}

export function addYears(d, years) {
  var newDate = cloneDate(d);
  newDate.setFullYear(newDate.getFullYear() + years);
  return newDate;
}

export function addMonths(d, months) {
  var newDate = cloneDate(d);
  newDate.setMonth(newDate.getMonth() + months);
  return newDate;
}

export function addDays(d, days) {
  var newDate = cloneDate(d);
  newDate.setDate(newDate.getDate() + days);
  return newDate;
}

export function getYears(minValue, maxValue) {
  var minYear = cloneDate(minValue).getFullYear();
  var maxYear = cloneDate(maxValue).getFullYear();
  var years = [];
  for (var i = minYear; i <= maxYear; i++) {
    years.push(i);
  }
  return years;
}

export function getMonths(currentDate, minValue, maxValue) {
  var minDate = cloneDate(minValue);
  var maxDate = cloneDate(maxValue);
  var months = monthList;
  if (!currentDate) {
    return months;
  }
  var currentYear = currentDate.getFullYear();
  if (minDate && currentYear === minDate.getFullYear()) {
    months = monthList.slice(minDate.getMonth());
  }
  if (maxDate && currentYear === maxDate.getFullYear()) {
    months = monthList.slice(0, maxDate.getMonth() + 1);
  }
  return months;
}

export function getDays(currentDate, minValue, maxValue) {
  var minDate = cloneDate(minValue);
  var maxDate = cloneDate(maxValue);
  var currentYear = currentDate.getFullYear();
  var currentMonth = currentDate.getMonth();
  var currentDay = currentDate.getDate();
  var daysInMonth = getDaysInMonth(currentDate);
  var days = [];

  var minDay = 1;
  var maxDay = daysInMonth;
  if (minDate && currentYear === minDate.getFullYear() && currentMonth === minDate.getMonth()) {
    minDay = minDate.getDate();
  }
  if (maxDate && currentYear === maxDate.getFullYear() && currentMonth === maxDate.getMonth()) {
    maxDay = maxDate.getDate();
  }
  for (var i = minDay; i <= maxDay; i++) {
    days.push(i);
  }
  return days;
}

export function getDaysInMonth(d) {
  var firstDate = new Date(d.getFullYear(), d.getMonth() + 1, 1);
  firstDate.setDate(firstDate.getDate() - 1);
  return firstDate.getDate();
}