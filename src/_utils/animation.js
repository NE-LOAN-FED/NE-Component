/**
 * Created by kisnows on 2017/2/20.
 * based on:
 *  ant-design/components/_util/openAnimation
 *  https://github.com/ant-design/ant-design
 */
import cssAnimation from 'css-animation'

function animate(node, show, done) {
  let height
  return cssAnimation(node, 'NEUI-collapse', {
    start() {
      if (!show) {
        node.style.height = `${node.offsetHeight}px`
      } else {
        height = node.offsetHeight
        node.style.height = 0
      }
    },
    active() {
      node.style.height = `${show ? height : 0}px`
    },
    end() {
      node.style.height = ''
      done()
    }
  })
}

const animation = {
  enter(node, done) {
    return animate(node, true, done)
  },
  leave(node, done) {
    return animate(node, false, done)
  },
  appear(node, done) {
    return animate(node, true, done)
  }
}

export default animation
