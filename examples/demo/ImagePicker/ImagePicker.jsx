
import React, { Component } from 'react'
import { Cell } from '../../../src/Cell'
import ImagePicker from '../../../src/ImagePicker'
// import ImagePicker from '../../../lib/ImagePicker'
import { Form, Input } from '../../../src/Form'
const data = [{
  url: 'https://zos.alipayobjects.com/rmsportal/PZUUCKTRIHWiZSY.jpeg',
  id: '2121'
}, {
  url: 'https://zos.alipayobjects.com/rmsportal/hqQWgTXdrlmVVYi.jpeg',
  id: '2122'
}]
export default class ImagePickerPage extends Component {
  state = {
    files: {
      value: data
    },
    multiple: false
  }
  onChange = (files, type, index) => {
    console.log(files, type, index)
    this.setState({
      files: {
        value: files
      }
    })
  }
  onSegChange = (e) => {
    const index = e.nativeEvent.selectedSegmentIndex
    this.setState({
      multiple: index === 1
    })
  }
  handleChange = (formData) => {
    this.setState({
      ...formData.data,
      isComplete: formData.isComplete
    })
  }
  render () {
    const { files } = this.state
    return (
      <section>
        <div className='page--header'>
          <h1 className='page-title'>ImagePicker</h1>
          <p className='page--desc'>图片选择器</p>
        </div>
        <Form
          onChange={this.handleChange}
        >
          <Cell className={'transferPhoto'}>
            <Cell.Header>转账凭证</Cell.Header>
            <ImagePicker
              value={files.value}
              name={'filess'}
              onChange={this.onChange}
              onImageClick={(index, fs) => console.log(index, fs)}
              selectable={files.value.length < 3}
              multiple={false}
              length={3}
            />
          </Cell>

        </Form>
      </section>
    )
  }
}
