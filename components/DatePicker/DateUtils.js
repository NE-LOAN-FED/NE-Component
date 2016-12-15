import isNumber from 'lodash/isNumber'
import isDate from 'lodash/isDate'
import isFunction from 'lodash/isFunction'
import isString from 'lodash/isString'

const monthList = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
const FORMAT_YEAR_CHAR = /y{1,4}/
const FORMAT_MONTH_CHAR = /M{1,2}/
const FORMAT_DAY_CHAR = /d{1,2}/
const ZERO_CHAR = 0

const toString = Object.prototype.toString

export function noop() {}

function formatNumber(number, size, trim) {
  if (size === 0 || !(isString(number) || isNumber(number))) {
    return ''
  }
  let value = '' + number
  while (value.length < size) {
    value = ZERO_CHAR + value
  }
  if (trim) {
    value = value.substr(value.length - size)
  }
  return value
}

function dateGetter(name, offset = 0, trim = false) {
  return (date, match) => {
    const size = match.length || 0
    let value = date['get' + name]()
    if (offset > 0 || value > -offset) {
      value += offset
    }
    return formatNumber(value, size, trim)
  }
}

const DATE_FORMATS = new Map([
  [FORMAT_YEAR_CHAR, dateGetter('FullYear', 0, true)],
  [FORMAT_MONTH_CHAR, dateGetter('Month', 1)],
  [FORMAT_DAY_CHAR, dateGetter('Date')]
])

export function formatDate(date, format) {
  const newDate = cloneDate(date)
  if (isString(format)) {
    return dateFilter(date, format)
  } else if (isFunction(format)) {
    return format(date)
  }
  return date
}

export function set(...times) {
  return new Date(...times)
}

function dateFilter(date, f) {
  let format = f
  for (let [key, value] of DATE_FORMATS) {
    format = format.replace(key, (s) => {
      return value(date, s)
    })
  }
  return format
}

export function cloneDate(d) {
  return typeof d === 'undefined' ? d : new Date(d)
}

export function addYears(d, years) {
  const newDate = cloneDate(d)
  newDate.setFullYear(newDate.getFullYear() + years)
  return newDate
}

export function addMonths(d, months) {
  const newDate = cloneDate(d)
  newDate.setMonth(newDate.getMonth() + months)
  return newDate
}

export function addDays(d, days) {
  const newDate = cloneDate(d)
  newDate.setDate(newDate.getDate() + days)
  return newDate
}

export function getYears(minValue, maxValue) {
  const minYear = cloneDate(minValue).getFullYear()
  const maxYear = cloneDate(maxValue).getFullYear()
  const years = []
  for (let i = minYear; i <= maxYear; i++) {
    years.push(i)
  }
  return years
}

export function getMonths(currentDate, minValue, maxValue) {
  const minDate = cloneDate(minValue)
  const maxDate = cloneDate(maxValue)
  let months = monthList
  if (!currentDate) {
    return months
  }
  const currentYear = currentDate.getFullYear()
  if (minDate && currentYear === minDate.getFullYear()) {
    months = monthList.slice(minDate.getMonth())
  }
  if (maxDate && currentYear === maxDate.getFullYear()) {
    months = monthList.slice(0, maxDate.getMonth() + 1)
  }
  return months
}

export function getDays(currentDate, minValue, maxValue) {
  const minDate = cloneDate(minValue)
  const maxDate = cloneDate(maxValue)
  const currentYear = currentDate.getFullYear()
  const currentMonth = currentDate.getMonth()
  const currentDay = currentDate.getDate()
  const daysInMonth = getDaysInMonth(currentDate)
  const days = []

  let minDay = 1
  let maxDay = daysInMonth
  if (minDate && (currentYear === minDate.getFullYear() && currentMonth === minDate.getMonth())) {
    minDay = minDate.getDate()
  }
  if (maxDate && (currentYear === maxDate.getFullYear() && currentMonth === maxDate.getMonth())) {
    maxDay = maxDate.getDate()
  }
  for (let i = minDay; i <= maxDay; i++) {
    days.push(i)
  }
  return days
}

export function getDaysInMonth(d) {
  const firstDate = new Date(d.getFullYear(), d.getMonth() + 1, 1)
  firstDate.setDate(firstDate.getDate() - 1)
  return firstDate.getDate()
}
