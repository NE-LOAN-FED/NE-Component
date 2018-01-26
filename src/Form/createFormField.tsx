/**
 * Created by kisnows on 2017/2/17.
 */
import React from 'react'

export default (argvs) => ComposedComponent => {
  console.log(argvs)
  return class extends React.Component {
    render () {
      const props = {}
      return <ComposedComponent {...props} />
    }
  }
}
