/**
 * Created by kisnows on 2016/9/28.
 */
import React, {Component, PropTypes} from 'react'
import classNames from 'classnames'

export default class VerifyButton extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isSending: this.props.isSending,
      text: this.props.text,
      times: this.props.times
    }
  }

  static propTypes = {
    isSending: PropTypes.bool,
    text: PropTypes.string,
    times: PropTypes.number,
    isCanSend: PropTypes.func
  }

  static defaultProps = {
    isSending: false,
    text: '发送验证码',
    times: 60,
    isCanSend: () => true
  }

  componentWillUnmount() {
    clearInterval(this.timer)
  }

  send = () => {
    const {isCanSend, handleClick} = this.props
    if (!isCanSend()) return false
    let count = 60
    handleClick()
    this.setState({
      isSending: true,
      text: '60s后重新发送'
    }, () => {
      this.timer = setInterval(() => {
        count -= 1
        if (count === 0) {
          clearInterval(this.timer)
          this.setState({
            text: this.props.text,
            isSending: false
          })
        } else {
          this.setState({
            text: `${count}s后重新发送`
          })
        }
      }, 1000)
    })
  }

  render() {
    const {className} = this.props
    const {isSending, text} = this.state
    const cls = classNames({
      ui_verify: true,
      ui_verify_sending: isSending,
      [className]: className
    })
    return (
      <button className={cls}
              onClick={(e) => {
                e.preventDefault()
                this.send()
              }}
              disabled={isSending}
      >{text}</button>
    )
  }
}
