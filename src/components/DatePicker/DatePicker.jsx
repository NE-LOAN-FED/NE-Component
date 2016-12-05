import React, { Component, PropTypes } from 'react'
import RenderLayer from '../internal/RenderLayer'
import Picker from '../Picker'
import Icon from '../Icon'
import {
  noop,
  formatDate,
  cloneDate,
  addYears,
  addMonths,
  addDays,
  getYears,
  getMonths,
  getDays,
  getDaysInMonth
} from './DateUtils.js'
import './DatePicker.scss'

class DatePicker extends Component {
  static propTypes = {
    className: PropTypes.string,  // 添加date class
    prefixCls: PropTypes.string, // 修改date组件class前缀
    show: PropTypes.bool,       // date 显示日期选择框
    defaultSelectedDate: PropTypes.any, // 默认选中日期
    selectedDate: PropTypes.any, // 选中日期
    format: PropTypes.any,     // 格式化方式，或者格式化函数
    maxDate: PropTypes.any,    // 最大日期
    minDate: PropTypes.any,    // 最小日期
    headerContent: PropTypes.node, // 头部内容
    confirmContent: PropTypes.node, // 确认内容
    cancelContent: PropTypes.node,  // 取消内容
    onConfirm: PropTypes.func,  // date confirm 事件
    onCancel: PropTypes.func,   // date cancel 事件
    onDateChange: PropTypes.func // 日期改变触发函数
  }

  static defaultProps = {
    show: false,
    prefixCls: 'ui_date_picker',
    format: 'yyyy-MM-dd',
    headerContent: '请选择日期',
    confirmContent: '完成',
    cancelContent: '取消',
    onConfirm: noop,
    onCancel: noop,
    onDateChange: noop
  }

  constructor(props) {
    super(props)
    this.onClick = this.onClick.bind(this)
    this.onConfirm = this.onConfirm.bind(this)
    this.onCancel = this.onCancel.bind(this)
    this.onYearChange = this.onYearChange.bind(this)
    this.onMonthChange = this.onMonthChange.bind(this)
    this.onDayChange = this.onDayChange.bind(this)
    this.renderContent = this.renderContent.bind(this)
    this.state = this.initState()
  }

  componentWillReceiveProps(nextProps) {
    if ('selectedDate' in nextProps) {
      this.setState({
        selectedDate: nextProps.selectedDate
      })
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextState.show !== this.state.show || nextState.selectedDate !== this.state.selectedDate
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextState.selectedDate !== this.state.selectedDate) {
      this.setSelectedDateFormat(nextState.selectedDate)
    }
  }
  componentDidMount() {
    this.init()
  }

  initState() {
    let selectedDateState
    const {show, defaultSelectedDate, selectedDate} = this.props
    if (selectedDate) {
      selectedDateState = selectedDate
    } else if (defaultSelectedDate) {
      selectedDateState = defaultSelectedDate
    } else {
      selectedDateState = new Date()
    }
    return {
      show: false,
      selectedDate: selectedDateState
    }
  }

  init() {
    Object.assign(this, {
      liveUpdate: false,
      scratchDate: cloneDate(this.state.selectedDate),
      selectedDateFormat: null,
      years: [],
      months: [],
      days: []
    })
  }

  setSelectedDateFormat(selectedDate) {
    this.selectedDateFormat = this.formatDate(selectedDate)
  }

  formatDate(date) {
    return formatDate(date, this.props.format)
  }

  getYears() {
    let minDate = this.props.minDate
    let maxDate = this.props.maxDate
    if (!minDate || !maxDate) {
      if (!minDate) {
        minDate = addYears(this.getSelectedDate(), -30)
      }
      if (!maxDate) {
        maxDate = this.getSelectedDate()
      }
    }
    return this.formatArrayToPicker(getYears(minDate, maxDate), (i) => {
      return i + '年'
    })
  }
  getMonths(date, minDate, maxDate) {
    return this.formatArrayToPicker(getMonths(date, minDate, maxDate), (i) => {
      return i + 1 + '月'
    })
  }

  getDays(date = this.state.selectedDate, minDate, maxDate) {
    return this.formatArrayToPicker(getDays(date, minDate, maxDate), (i) => {
      return i + '日'
    })
  }

  getSelectedDate() {
    return cloneDate(this.state.selectedDate)
  }

  getSelectedYear() {
    return this.getSelectedDate().getFullYear()
  }
  getSelectedMonth() {
    return this.getSelectedDate().getMonth()
  }
  getSelectedDay() {
    return this.getSelectedDate().getDate()
  }
  formatArrayToPicker(a, extra) {
    const arr = []
    for (let i = 0, len = a.length; i < len; i++) {
      arr.push({
        value: a[i],
        label: extra(a[i])
      })
    }
    return arr
  }
  onConfirm() {
    const date = cloneDate(this.scratchDate)
    this.setState({
      show: false,
      selectedDate: date
    }, () => {
      const formatDate = this.formatDate(this.state.selectedDate)
      this.props.onConfirm(this.state.selectedDate, formatDate)
    })
  }

  onClick() {
    this.setState({
      show: true
    })
  }

  onCancel() {
    this.setState({
      show: false
    }, () => {
      this.props.onCancel()
    })
  }

  onYearChange(y) {
    const date = cloneDate(this.getSelectedDate().setFullYear(y))
    this.fireDateChange(date)
  }

  onMonthChange(m) {
    const date = cloneDate(this.getSelectedDate().setMonth(m))
    this.fireDateChange(date)
  }

  onDayChange(d) {
    const date = cloneDate(this.getSelectedDate().setDate(d))
    this.fireDateChange(date)
  }

  setDateState(date, cb) {
    const newDate = cloneDate(date)
    this.setState({
      selectedDate: newDate
    }, () => {
      const date = this.formatDate(this.state.selectedDate)
      cb(this.state.selectedDate, date)
    })
  }

  fireDateChange(d, liveUpdate = false) {
    const { onDateChange } = this.props
    this.scratchDate = cloneDate(d)

    if (liveUpdate) {
      this.setDateState(this.scratchDate, this.scratchDate)
    }
  }

  renderHeader() {
    const { prefixCls, headerContent, confirmContent, cancelContent } = this.props
    let headerEle = (
      <div className={`${prefixCls}_header`}>
        <span className={`${prefixCls}_cancel`} onClick={this.onCancel}>{cancelContent}</span>
        <h4 className={`${prefixCls}_header_content`}>
          {headerContent}
        </h4>
        <span className={`${prefixCls}_confirm`} onClick={this.onConfirm}>{confirmContent}</span>
      </div>
    )
    return headerEle
  }

  renderContent() {
    const { children, className, prefixCls, confirmContent, cancelContent, classNames } = this.props
    const contents = [{
      key: 'year',
      defaultSelectedValue: this.getSelectedYear(),
      children: this.getYears(),
      onValueChange: this.onYearChange
    }, {
      key: 'month',
      defaultSelectedValue: this.getSelectedMonth(),
      children: this.getMonths(),
      onValueChange: this.onMonthChange
    }, {
      key: 'day',
      defaultSelectedValue: this.getSelectedDay(),
      children: this.getDays(),
      onValueChange: this.onDayChange
    }]
    const content = contents.map(function (c, i) {
      return <Picker className={`${prefixCls}_content_item`} {...c}></Picker>
    })
    return (
      <div className={`${className || ''} ${prefixCls}_popup`} >
        {this.renderHeader()}
        <div className={`${prefixCls}_content`}>
          {content}
        </div>
      </div >
    )
  }

  render() {
    const { prefixCls } = this.props
    const selectedDateFormat = this.selectedDateFormat
    return (
      <div className={prefixCls} onClick={this.onClick}>
        {selectedDateFormat ? <span className={`${prefixCls}_date`}>{selectedDateFormat}</span> : <span className={`${prefixCls}_placeholder`}>请选择</span>}
        <Icon type="arrow" />
        {this.state.show ? <RenderLayer className="{prefixCls}_model" render={this.renderContent} show={true} useComponentClick={false} /> : null}
      </div>
    )
  }
}

export default DatePicker
