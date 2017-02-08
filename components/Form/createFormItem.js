/**
 * Created by kisnows on 2016/12/26.
 */
import React from 'react'
import SPEvent from './SPEvent'
export default (argvs) => ComposedComponent => {
  console.log(argvs)
  return class extends React.Component {

    render() {
      const props = {
      }
      return <ComposedComponent {...props} />
    }
  }
}
