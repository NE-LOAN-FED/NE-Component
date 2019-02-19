/* tslint:disable:jsx-no-multiline-js */
import PropTypes from 'prop-types';
import * as React from 'react'
import RCDatePicker from 'rmc-date-picker/lib/DatePicker';
import PopupDatePicker from 'rmc-date-picker/lib/Popup';
import { DatePickerPropsType as BasePropsType } from './PropsTypes';
import { formatFn } from '../_utils/format';
import Icon from '../Icon'

const noop = () => { }

export interface PropsType extends BasePropsType {
  // prefixCls?: string;
  className?: string;
  use12Hours?: boolean;
  // pickerPrefixCls?: string;
  // popupPrefixCls?: string;
  onOk?: (x: any) => void;
  onVisibleChange?: (visible: boolean) => void;
  name?: string;
  errorMsg?: string;
  required?: boolean;
  shouldRsa?: boolean;
  isError?: boolean;

}
export default class DatePicker extends React.Component<PropsType, any> {
  static defaultProps = {
    mode: 'datetime',
    // prefixCls: 'am-picker',
    // pickerPrefixCls: 'am-picker-col',
    // popupPrefixCls: 'am-picker-popup',
    minuteStep: 1,
    use12Hours: false,
    required: true,
    shouldRsa: false,
    onChange: noop,
    handleFieldChange: noop,
    name: 'selectedDate'
  };

  static contextTypes = {
    antLocale: PropTypes.object,
  };

  private scrollValue: any;

  constructor (props) {
    super(props)
    this.state = {
      showDelIcon: false,
      value: this.props.value || '',
      isError: this.props.isError || false
    }
  }

  get data () {
    const {value, isError} = this.state
    const {name, errorMsg, required, shouldRsa} = this.props
    return {
      name,
      value,
      isError,
      errorMsg,
      required,
      shouldRsa
    }
  }
  componentWillReceiveProps (nextProps) {
    if (nextProps.value !== this.state.value) {
      const nextValue = typeof nextProps.value === 'undefined' ? '' : nextProps.value
      this.setState({
        value: nextValue
      })
    }
  }
  shouldComponentUpdate (nextProps, nextState) {
    return this.props.disabled !== nextProps.disabled ||
      this.state.value !== nextState.value ||
      this.state.showDelIcon !== nextState.showDelIcon ||
      this.state.isError !== nextState.isError
  }
  componentDidUpdate (preProps, preState) {
    const {handleFieldChange} = preProps
    if (preState.value !== this.state.value) {
      handleFieldChange(this.data)
    }
  }

  setScrollValue = (v: any) => {
    this.scrollValue = v;
  }

  onOk = (v: any) => {
    if (this.scrollValue !== undefined) {
      v = this.scrollValue;
    }
    if (this.props.onChange) {
      this.props.onChange(v);
    }
    if (this.props.onOk) {
      this.props.onOk(v);
    }
  }

  onVisibleChange = (visible: boolean) => {
    this.scrollValue = undefined;
    if (this.props.onVisibleChange) {
      this.props.onVisibleChange(visible);
    }
  }

  fixOnOk = (picker: any) => {
    if (picker) {
      picker.onOk = this.onOk;
    }
  }

  render() {
    // tslint:disable-next-line:no-this-assignment
    const { props } = this;
    const { children, value } = props;
    const locale = {
      okText: '确定',
      dismissText: '取消',
      extra: '请选择',
    }
    const { okText, dismissText, extra } = locale;

    const childProps = {
      extra: value ? formatFn(this, value) : this.props.extra || extra,
      children: value ? formatFn(this, value) : this.props.extra || extra,
    }

    /**
     * 注意:
     * 受控 表示 通过设置 value 属性、组件的最终状态跟 value 设置值一致。
     * 默认不设置 value 或 只设置 defaultValue 表示非受控。
     *
     * DatePickerView 对外通过 value “只支持 受控” 模式（可以使用 defaultDate 支持 非受控 模式，但不对外）
     * PickerView 对外通过 value “只支持 受控” 模式
     *
     * DatePicker / Picker 对外只有 value 属性 (没有 defaultValue)，
     * 其中 List 展示部分 “只支持 受控” 模式，
     * 弹出的 选择器部分 会随外部 value 改变而变、同时能自由滚动
     * （即不会因为传入的 value 不变而不能滚动 (不像原生 input 的受控行为)）
     *
     */

    const dataPicker = (
      <RCDatePicker
        minuteStep={props.minuteStep}
        minDate={props.minDate}
        maxDate={props.maxDate}
        mode={props.mode}
        // pickerPrefixCls={props.pickerPrefixCls}
        // prefixCls={props.prefixCls}
        defaultDate={value || new Date()}
        use12Hours={props.use12Hours}
        onValueChange={props.onValueChange}
        onScrollChange={this.setScrollValue}
      />
    );

    return (
      <PopupDatePicker
        datePicker={dataPicker}
        WrapComponent="div"
        transitionName="rmc-picker-popup-slide-fade"
        maskTransitionName="rmc-picker-popup-fade"
        {...props as any}
        // prefixCls={popupPrefixCls}
        date={value || new Date()}
        dismissText={this.props.dismissText || dismissText}
        okText={this.props.okText || okText}
        ref={this.fixOnOk}
        onVisibleChange={this.onVisibleChange}
      >
        <div className={'rmc-date-picker-content'}>
        {children &&
          React.isValidElement(children) &&
          React.cloneElement<object>(children, childProps)}
        {value ? null : <Icon type='arrow' />}
        </div>

      </PopupDatePicker>
    );
  }
}
