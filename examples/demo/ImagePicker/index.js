
import React, { Component } from 'react'
import { Cell } from '../../../src/Cell'
import ImagePicker from '../../../src/ImagePicker'
const data = [{
  url: 'https://zos.alipayobjects.com/rmsportal/PZUUCKTRIHWiZSY.jpeg',
  id: '2121'
}, {
  url: 'https://zos.alipayobjects.com/rmsportal/hqQWgTXdrlmVVYi.jpeg',
  id: '2122'
}]
export default class ImagePickerPage extends Component {
  state = {
    files: data,
    multiple: false
  }
  onChange = (files, type, index) => {
    console.log(files, type, index)
    this.setState({
      files
    })
  }
  onSegChange = (e) => {
    const index = e.nativeEvent.selectedSegmentIndex
    this.setState({
      multiple: index === 1
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
        <Cell>
          <Cell.Header>Gender</Cell.Header>
          <Cell.Body>
            <ImagePicker
              files={files}
              onChange={this.onChange}
              onImageClick={(index, fs) => console.log(index, fs)}
              selectable={files.length < 7}
              multiple={this.state.multiple}
            />
          </Cell.Body>
        </Cell>
        <ImagePicker
          files={files}
          onChange={this.onChange}
          onImageClick={(index, fs) => console.log(index, fs)}
          selectable={files.length < 7}
          multiple={this.state.multiple}
        />
      </section>
    )
  }
}
