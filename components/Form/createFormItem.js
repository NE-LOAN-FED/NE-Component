/**
 * Created by kisnows on 2016/12/26.
 */
import React from "react"
import SPEvent from './SPEvent'
export default ({FieldChange, FieldBlur, other}) => ComposedComponent => {
  return class extends React.Component {

    componentDidMount() {
      this.spEvent = new SPEvent()
    }

    render() {
      const spEvent = this.spEvent
      // data 里面至少包含 name 和 value
      const handleFieldChange = (data) => {
        FieldChange(data)
        spEvent.dispatch('FIELD_CHANGE', data)
      }
      const handleFieldBlur = (data) => {
        FieldBlur(data)
        spEvent.dispatch('FIELD_BLUR', data)
      }
      const props = {
        handleFieldChange,
        handleFieldBlur
      }
      return <ComposedComponent {...props} {...other}/>
    }
  }
}
