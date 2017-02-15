import React from 'react'
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

const PropTypes = React.PropTypes

class DatePicker extends React.Component {
  static propTypes = {
    prefixCls: PropTypes.string, // 修改date组件class前缀
    className: PropTypes.string,  // 添加date class
    show: PropTypes.bool,       // date 显示日期选择框
    defaultDate: PropTypes.any, // 默认选中日期
    date: PropTypes.any, // 选中日期
    type: PropTypes.oneOf(['YMD', 'YM']),
    format: PropTypes.any,     // 格式化方式，或者格式化函数
    maxDate: PropTypes.any,    // 最大日期
    minDate: PropTypes.any,    // 最小日期
    headerContent: PropTypes.node, // 头部内容
    confirmContent: PropTypes.node, // 确认内容
    cancelContent: PropTypes.node,  // 取消内容
    onConfirm: PropTypes.func,  // date confirm 事件
    onCancel: PropTypes.func,   // date cancel 事件
    onDateChange: PropTypes.func, // 日期改变触发函数
    disabled: PropTypes.bool     // 是否可以修改日期
  }

  static defaultProps = {
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
    this.init()
    this.state = this.initState()
  }
  componentWillReceiveProps(nextProps) {
    if ('date' in nextProps && nextProps.date) {
      this.setState({
        selectedDate: cloneDate(nextProps.date)
      })
    }
    if ('show' in nextProps) {
      this.setState({
        show: nextProps.show
      })
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.show !== nextState.show || this.state.selectedDate.getTime() !== cloneDate(nextState.selectedDate).getTime()) {
      return true
    }
    return false
  }

  initState() {
    let selectedDateState
    const {show, defaultDate, date} = this.props
    if (date) {
      selectedDateState = cloneDate(date)
      this.selectedDateFormat = this.formatDate(selectedDateState)
    } else if (defaultDate) {
      selectedDateState = cloneDate(defaultDate)
      this.selectedDateFormat = this.formatDate(selectedDateState)
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
      selectedDateFormat: null,
      years: [],
      months: [],
      days: []
    })
  }

  setSelectedDateFormat(selectedDate = this.state.selectedDate) {
    this.selectedDateFormat = this.formatDate(selectedDate)
  }

  formatDate(date) {
    let format = this.props.format
    if (this.props.type === 'YM') {
      format = 'yyyy-MM'
    }
    return formatDate(date, format)
  }

  getYears() {
    let minDate = this.props.minDate
    let maxDate = this.props.maxDate
    if (!minDate || !maxDate) {
      if (!minDate) {
        minDate = addYears(this.getSelectedDate(), -30)
      }
      if (!maxDate) {
        maxDate = addYears(this.getSelectedDate(), 30)
      }
    }
    return this.formatArrayToPicker(getYears(minDate, maxDate), (i) => {
      return i + '年'
    })
  }
  getMonths() {
    const { minDate, maxDate } = this.props
    return this.formatArrayToPicker(getMonths(this.state.selectedDate, minDate, maxDate), (i) => {
      return i + 1 + '月'
    })
  }

  getDays() {
    const { minDate, maxDate } = this.props
    return this.formatArrayToPicker(getDays(this.state.selectedDate, minDate, maxDate), (i) => {
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
    this.setSelectedDateFormat()
    this.setState({
      show: false
    }, () => {
      this.props.onConfirm(this.state.selectedDate, this.selectedDateFormat)
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

  fireDateChange(date = this.state.selectedDate, cb = noop) {
    const newDate = cloneDate(date)
    this.setState({
      selectedDate: newDate
    }, () => {
      cb(this.state.selectedDate)
    })
  }

  renderHeader() {
    const { prefixCls, headerContent, confirmContent, cancelContent } = this.props
    let headerEle = (
      <div className={`${prefixCls}_date_picker_header`}>
        <span className={`${prefixCls}_date_picker_cancel`} onClick={this.onCancel}>{cancelContent}</span>
        <h4 className={`${prefixCls}_date_picker_header_content`}>
          {headerContent}
        </h4>
        <span className={`${prefixCls}_date_picker_confirm`} onClick={this.onConfirm}>{confirmContent}</span>
      </div>
    )
    return headerEle
  }

  getContent() {
    const contents = [{
      key: 'year',
      selectedValue: this.getSelectedYear(),
      children: this.getYears(),
      onValueChange: this.onYearChange
    }, {
      key: 'month',
      selectedValue: this.getSelectedMonth(),
      children: this.getMonths(),
      onValueChange: this.onMonthChange
    }]
    switch (this.props.type) {
      case 'YM':
        break
      default:
        contents.push({
          key: 'day',
          selectedValue: this.getSelectedDay(),
          children: this.getDays(),
          onValueChange: this.onDayChange
        })
    }
    return contents
  }

  renderContent() {
    const { children, className, prefixCls, confirmContent, cancelContent, classNames } = this.props
    const content = this.getContent().map(function (c, i) {
      return <Picker className={`${prefixCls}_date_picker_content_item`} {...c}></Picker>
    })
    return (
      <div className={`${className || ''} ${prefixCls}_date_picker_popup`} >
        {this.renderHeader()}
        <div className={`${prefixCls}_date_picker_content`}>
          {content}
        </div>
      </div >
    )
  }

  render() {
    const { prefixCls } = this.props
    const selectedDateFormat = this.selectedDateFormat
    return (
      <div className={`${prefixCls}_date_picker`} onClick={this.onClick}>
        {selectedDateFormat ? <span className={`${prefixCls}_date_picker_date`}>{selectedDateFormat}</span> : <span className={`${prefixCls}_date_picker_placeholder`}>请选择</span>}
        <Icon type="arrow" />
        {this.state.show ? <RenderLayer className={`${prefixCls}_date_modal`} render={this.renderContent} show={true} maskClosable={false}/> : null}
      </div>
    )
  }
}

export default DatePicker
