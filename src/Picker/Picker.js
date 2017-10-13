import PropTypes from 'prop-types';
import React from 'react'
import { Animate, easeOutCubic, easeInOutCubic } from '../internal/Animate'

const DECELERATION_VELOCITY_RATE = 0.95

const MIN_VELOCITY_TO_KEEP_DECELERATING = 0.5
const POSITION_MAX_LENGTH = 40
const MINIUM_TRACKING_FOR_SCROLL = 0
const MINIUM_TRACKING_FOR_DRAG = 5
const DEFAULT_ANIM_DURATION = 250
const TIME_FRAME = 100

const CLIENT_ITEM_COUNT = 5

const MIN_VELOCITY_TO_START_DECELERATION = 4

function isEmptyArray(a) {
  return !a || !a.length
}

function getComputedStyle(el, key) {
  const computedStyle = window.getComputedStyle(el)
  return computedStyle[key] || ''
}

function isChildrenEqual(c1, c2, pure) {
  if (isEmptyArray(c1) && isEmptyArray(c2)) {
    return true
  }
  if (pure) {
    return c1 === c2
  }
  if (c1.length !== c2.length) {
    return false
  }
  let len = c1.length
  while (len--) {
    if (c1[len].value !== c2[len].value || c1[len].label !== c2[len].label) {
      return false
    }
  }
  return true
}

class Picker extends React.Component {
  static propTypes = {
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
  }

  static defaultProps = {
    prefixCls: 'NEUI',
    disabled: false,
    pure: false,
    itemHeight: '60',
    clientItemCount: 5,
    onValueChange() { }
  }

  constructor(props) {
    super(props)
    this.state = this.initState()
  }

  componentWillReceiveProps(nextProps) {
    if ('selectedValue' in nextProps) {
      this.setState({
        selectedValue: nextProps.selectedValue
      })
    }
  }

  componentDidMount() {
    this.init()
    this.component.addEventListener('touchstart', this.onTouchStart.bind(this), false)
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextState.selectedValue !== this.state.selectedValue || !isChildrenEqual(nextProps.children, this.props.children, this.props.pure)
  }

  componentDidUpdate(prevProps) {
    if (!isChildrenEqual(prevProps.children, this.props.children, this.props.pure)) {
      this.init()
    } else {
      this.select(this.state.selectedValue)
    }
  }

  componentWillUnmount() {
    this.component.removeEventListener('touchstart', this.onTouchStart.bind(this), false)
  }

  init() {
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
    })
    this.setDimensions()
    this.select(this.state.selectedValue)
  }

  initState() {
    let selectedValueState
    const { selectedValue, defaultSelectedValue, children } = this.props
    if (selectedValue !== undefined) {
      selectedValueState = selectedValue
    } else if (defaultSelectedValue !== undefined) {
      selectedValueState = defaultSelectedValue
    } else if (children.length) {
      selectedValueState = children[0].value
    }
    return {
      selectedValue: selectedValueState
    }
  }

  scrollTo(top, animate = true) {
    this.clearAnim()
    top = Math.round(top / this.itemHeight) * this.itemHeight
    top = Math.max(Math.min(this.maxScrollTop, top), this.minScrollTop)

    if (top === this.scrollTop) {
      this.publish(top)
      this.scrollingComplete()
      return
    }
    this.publish(top, DEFAULT_ANIM_DURATION)
  }

  selectByIndex(index) {
    if (index < 0 || index >= this.props.children.length) {
      throw new Error('Invalid prop index supplied to Picker Must > 0 and < children.length.')
    }
    // 滑动到指定位置
    this.scrollTop = this.minScrollTop + index * this.itemHeight
    this.scrollTo(this.scrollTop)
  }

  select(value) {
    const { children } = this.props
    for (let i = 0, len = children.length; i < len; i++) {
      if (children[i].value === value) {
        this.selectByIndex(i)
        return
      }
    }
    this.selectByIndex(0)
  }

  fireValueChange(selectedValue) {
    if (selectedValue !== this.state.selectedValue) {
      if (!('selectedValue' in this.props)) {
        this.setState({
          selectedValue
        })
      }
      this.props.onValueChange(selectedValue)
    }
  }

  scrollingComplete() {
    const index = Math.round((this.scrollTop - this.minScrollTop - this.itemHeight / 2) / this.itemHeight)
    const child = this.props.children[index]
    if (child) {
      this.fireValueChange(child.value)
    }
  }

  setDimensions() {
    const { component, indicator, content } = this
    const { children, clientItemCount } = this.props
    const totalItemCount = children.length

    // 根据实际高度滑动
    this.itemHeight = parseFloat(getComputedStyle(indicator, 'height'), 10) || this.props.itemHeight
    this.clientHeight = component.clientHeight

    this.minScrollTop = -this.itemHeight * (clientItemCount / 2)
    this.maxScrollTop = this.minScrollTop + this.itemHeight * totalItemCount - 0.001
  }

  onTouchStart(e) {
    e.preventDefault()
    this.component.addEventListener('touchmove', this.onTouchMove.bind(this), false)
    this.component.addEventListener('touchend', this.onTouchEnd.bind(this), false)

    if (!this.props.disabled) {
      this.doTouchStart(e.touches, e.timeStamp)
    }
  }

  onTouchMove(e) {
    if (!this.props.disabled) {
      this.doTouchMove(e.touches, e.timeStamp)
    }
  }

  onTouchEnd(e) {
    this.component.removeEventListener('touchmove', this.onTouchMove.bind(this), false)
    this.component.removeEventListener('touchend', this.onTouchEnd.bind(this), false)

    if (!this.props.disabled) {
      this.doTouchEnd(e.timeStamp)
    }
  }

  clearAnim() {
    if (this.isDecelerating) {
      Animate.stop(this.isDecelerating)
      this.isDecelerating = false
    }

    if (this.isAnimating) {
      Animate.stop(this.isAnimating)
      this.isAnimating = false
    }
  }

  doTouchStart(touches, timeStamp) {
    const touchY = touches[0].pageY
    this.clearAnim()

    Object.assign(this, {
      isDragging: false,
      isDecelerating: false,
      enableScrollY: false,
      timeStamp,
      sinitialTouchTop: touchY,
      lastTouchTop: touchY,
      lastTouchMove: timeStamp,
      positions: []
    })
  }

  addPosition(top, timeStamp) {
    const positions = this.positions
    if (positions.length > POSITION_MAX_LENGTH) {
      positions.splice(0, POSITION_MAX_LENGTH / 2)
    }
    positions.push(top, timeStamp)
  }

  doTouchMove(touches, timeStamp) {
    const currentTouchTop = touches[0].pageY

    const { isDragging, lastTouchTop, initialTouchTop, maxScrollTop, minScrollTop, positions } = this

    if (isDragging) {
      const moveY = currentTouchTop - lastTouchTop
      let scrollTop = this.scrollTop

      // 判断是否到达顶部或者底部
      if (this.enableScrollY) {
        scrollTop -= moveY
        if (scrollTop > maxScrollTop || scrollTop < minScrollTop) {
          if (scrollTop > maxScrollTop) {
            scrollTop = maxScrollTop
          } else {
            scrollTop = minScrollTop
          }
        }
      }
      // 将移动位置和时间戳信息推入 postions
      this.addPosition(scrollTop, timeStamp)
      this.publish(scrollTop)
    } else {
      const distanceY = Math.abs(currentTouchTop - initialTouchTop)
      this.enableScrollY = distanceY >= MINIUM_TRACKING_FOR_SCROLL

      this.addPosition(this.scrollTop, timeStamp)
      this.isDragging = distanceY >= MINIUM_TRACKING_FOR_DRAG
    }
    this.lastTouchTop = currentTouchTop
    this.lastTouchMove = timeStamp
  }

  doTouchEnd(timeStamp) {
    const { isDragging, scrollTop, lastTouchMove, positions } = this

    if (isDragging) {
      this.isDragging = false
      if (timeStamp - lastTouchMove <= TIME_FRAME) {
        const endPos = positions.length - 1
        let startPos = endPos
        // 根据 100ms 前的位置和最后一次位置差异进行减速动作
        for (let i = endPos; i > 0 && positions[i] > (lastTouchMove - TIME_FRAME); i -= 2) {
          startPos = i
        }
        if (startPos !== endPos) {
          const timeOffset = positions[endPos] - positions[startPos]
          const moveTop = this.scrollTop - positions[startPos - 1]
          this.decelerationVelocityY = moveTop / timeOffset * (1000 / 60)

          // 大于最小移动比限制进行减速动作
          if (Math.abs(this.decelerationVelocityY) > MIN_VELOCITY_TO_START_DECELERATION) {
            this.startDeceleration()
          }
        }
      }
    }
    if (!this.isDecelerating) {
      this.scrollTo(scrollTop)
    }

    this.positions.length = 0
  }

  setTop(top) {
    const { content } = this

    if (content) {
      content.style.webkitTransform = `translate3d(0, ${-top}px, 0)`
    }
  }

  publish(top, animationDuration) {
    const wasAnimating = this.isAnimating
    if (wasAnimating) {
      Animate.stop(wasAnimating)
      this.isAnimating = false
    }

    if (animationDuration) {
      this.scheduledTop = top

      const oldTop = this.scrollTop
      const diffTop = top - oldTop

      const step = (percent) => {
        this.scrollTop = oldTop + (diffTop * percent)
        this.setTop(this.scrollTop)
      }

      const verify = (id) => {
        return this.isAnimating === id
      }

      const completed = (renderedFramesPerSecond, animationId, wasFinished) => {
        if (animationId === this.isAnimating) {
          this.isAnimating = false
        }
        if (this.didDecelerationComplete || wasFinished) {
          this.scrollingComplete()
        }
      }

      // 使用 Animate 开启动画移动
      this.isAnimating = Animate.start(step, verify, completed, animationDuration, wasAnimating ? easeOutCubic : easeInOutCubic)
    } else {
      this.scheduledTop = this.scrollTop = top
      this.setTop(top)
    }
  }

  startDeceleration() {
    this.minDecelerationScrollTop = this.minScrollTop
    this.maxDecelerationScrollTop = this.maxScrollTop

    const step = (percent, now, render) => {
      // 每步动画操作
      this.stepThroughDeceleration(render)
    }

    const verify = () => {
      const shouldContinue = Math.abs(this.decelerationVelocityY) >= MIN_VELOCITY_TO_KEEP_DECELERATING
      if (!shouldContinue) {
        this.didDecelerationComplete = true
      }
      return shouldContinue
    }

    const completed = () => {
      this.isDecelerating = false
      if (this.scrollTop <= this.minScrollTop || this.scrollTop >= this.maxScrollTop) {
        this.scrollTo(this.scrollTop)
        return
      }
      if (this.didDecelerationComplete) {
        this.scrollingComplete()
      }
    }

    this.isDecelerating = Animate.start(step, verify, completed)
  }

  stepThroughDeceleration() {
    let scrollTop = this.scrollTop + this.decelerationVelocityY

    const scrollTopFixed = Math.max(Math.min(this.maxDecelerationScrollTop, scrollTop), this.minDecelerationScrollTop)
    if (scrollTopFixed !== scrollTop) {
      scrollTop = scrollTopFixed
      this.decelerationVelocityY = 0
    }

    if (Math.abs(this.decelerationVelocityY) <= 1) {
      if (Math.abs(scrollTop % this.itemHeight) < 1) {
        this.decelerationVelocityY = 0
      }
    } else {
      this.decelerationVelocityY *= DECELERATION_VELOCITY_RATE
    }

    this.publish(scrollTop)
  }

  render() {
    const { children, prefixCls, className } = this.props
    const { selectedValue } = this.state
    const items = children.map((item) => {
      return (
        <div className={selectedValue === item.value ? `${prefixCls}_picker_item_selected` : `${prefixCls}_picker_item`}
          key={item.value} data-value={item.value}
          >
          {item.label}
        </div>
      )
    })

    return (
      <div className={`${className || ''} ${prefixCls}_picker`} ref={(ref) => { this.component = ref }}>
        <div className={`${prefixCls}_picker_indicator`} ref={(ref) => { this.indicator = ref }} />
        <div className={`${prefixCls}_picker_content`} ref={(ref) => { this.content = ref }}>
          {items}
        </div>
      </div>
    )
  }
}

export default Picker
