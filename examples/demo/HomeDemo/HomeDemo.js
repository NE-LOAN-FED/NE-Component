/**
 * Created by kisnows on 2016/9/13.
 */
import React, {Component, PropTypes} from 'react'
import {Link} from 'react-router'
import {
  Form,
  FormCell,
  Input,
  Select,
  CheckBox,
  Cells,
  Cell,
  CellHeader,
  CellBody,
  CellFooter,
  Panel,
  DatePicker,
  Picker,
  Modal,
  Alert,
  VerifyButton,
  Toast,
  Button,
  Collapse
} from '../../../components'

import Logger from '../../../utils/log'
import lang from '../../utils/lang'
import validate from '../../utils/validate'
const logger = new Logger('DEBUG', 'HomeDemo')

const questions = [
  {
    q: 'Q：客服电话是多少？',
    a: 'A：客服热线：400-0881188  服务时间：工作日09:30-12:00 ;13:30-18:00'
  }, {
    q: 'Q：申请的条件是什么？',
    a: 'A：年龄在18-60周岁的在职员工。'
  }, {
    q: 'Q：申请借款需要哪些材料？',
    a: 'A：只需要储蓄卡和身份证。'
  }
]

const collapseListData = questions.map((v, k) => {
  const obj = {
    title: v.q,
    content: v.a
  }
  return obj
})

class Home extends React.Component {
  constructor() {
    super()
    this.state = {
      phone: '',
      formData: {},
      msg: '',
      showToast: false,
      showModal: false,
      showAlert: false
    }
  }

  comonentWillMount() {
    logger.info('WillMount')
  }

  componentDidMount() {
    logger.info('DidMount', this.state)
  }

  componentWillUpdate(nextProps, nextState) {
    logger.log('componentWillUpdate', nextState)
  }

  componentDidUpdate() {
    logger.info('DidUpdate', this.state)
  }

  handleSubmit = (isValidate, state, pureData) => {
    if (!isValidate) {
      this.setState({
        showToast: true,
        msg: state.errorMsgList[0]
      })
    } else {
      this.setState({
        showToast: true,
        msg: '正在提交'
      })
    }
    logger.log(`form submit, isValidate:${isValidate}, state:${state}, pureData:${pureData}`)
  }
  handleChange = (formData) => {
    logger.log('form change', formData)
    this.setState({
      formData
    })
  }
  handleFieldChange = (fieldData) => {
    logger.log('field change', fieldData)
  }
  closeToast = () => {
    this.setState({
      showToast: false
    })
  }
  closeModal = () => {
    this.setState({
      showModal: false
    })
  }
  closeAlert = () => {
    this.setState({
      showAlert: false
    })
  }

  handleAlertConfirm = () => {
    logger.log('You click confirm')
    this.setState({
      showAlert: false,
      showToast: true,
      msg: 'HaHa'
    })
  }

  handleAlertCancel = () => {
    this.setState({
      showAlert: false,
      showToast: true,
      msg: 'This is mean nothing to you.'
    })
  }
  openModal = () => {
    this.setState({
      showModal: true
    })
  }
  openAlert = () => {
    this.setState({
      showAlert: true
    })
  }
  handleCollapseListChange = (openListIdCollection) => {
    console.log(openListIdCollection)
  }

  render() {
    const {msg, showToast, showModal, showAlert, formData, phone, gender} = this.state
    const {isComplete} = formData
    const genderData = [{
      name: '男',
      value: 0,
      disabled: true
    }, {
      name: '女',
      value: 1
    }]
    return (
      <section className='page_home'>
        <Toast content={msg}
               show={showToast}
               onClose={this.closeToast}
        />
        <ul>
          <li>
            <Link to="/alert">Alert</Link>
          </li>
          <li>
            <Link to="/form">Form</Link>
          </li>
        </ul>
        <h1>Button</h1>
        <h2>Normal Button</h2>
        <Button size={'small'}>Small Button</Button><Button size={'small'} disabled={true}>Small Button</Button>
        <Button>Button</Button>
        <Button role={'secondary'}>Button</Button>
        <Button disabled={true}>Button</Button>
        <h2>Right Angle Button</h2>
        <Button style={'rightAngle'}>Button</Button>
        <Button style={'rightAngle'} role={'secondary'}>Button</Button>
        <Button style={'rightAngle'} disabled={true}>Button</Button>

        <h1>Cells</h1>
        <Cells>
          <Cell>
            <CellHeader>Header</CellHeader>
            <CellBody>Body</CellBody>
            <CellFooter>Footer</CellFooter>
          </Cell>
          <Cell>
            <CellHeader>Header</CellHeader>
            <CellBody>Body</CellBody>
            <CellFooter>Footer</CellFooter>
          </Cell>
        </Cells>
        <h1>Form</h1>
        <Form
          onSubmit={this.handleSubmit}
          onFieldChange={this.handleFieldChange}
          onChange={this.handleChange}
          ref={(ref) => {
            this['$Form'] = ref
          } }
        >
          <FormCell>
            <CellHeader>Name</CellHeader>
            <Input type='text'
                   name='name'
                   errorMsg={lang.nameErrorMsg}
                   validate={validate.name}
            />
          </FormCell>
          <FormCell>
            <CellHeader>Phone</CellHeader>
            <Input type='tel'
                   name='phone'
                   validate={validate.phone}
                   errorMsg={lang.phoneErrorMsg}
            />
          </FormCell>
          <FormCell>
            <CellHeader>Verify Code</CellHeader>
            <Input type='number'
                   name='verifyCode'
                   errorMsg={lang.smsCodeErrorMsg}
                   validate={/\d{4}/}
            />
            <CellFooter><VerifyButton/></CellFooter>
          </FormCell>
          <FormCell>
            <CellHeader>Gender</CellHeader>
            <Select name='gender'
                    data={genderData}
                    required={false}
            />
          </FormCell>
          <FormCell>
            <CellBody><label htmlFor="is">Is yourself?</label></CellBody>
            <CellFooter><CheckBox name='is' id="is"/></CellFooter>
          </FormCell>
          <Button type="submit" disabled={!isComplete}>提交</Button>
        </Form>
        <h1>Panel</h1>
        <Panel className="panel">
          <Panel.Title>还款详情</Panel.Title>
          <Panel.Item label="还款银行卡">
            <Panel.Content>Content</Panel.Content>
          </Panel.Item>
          <Panel.Item label="初始还款计划">
            <Panel.Content><a href="javascript:">查看</a></Panel.Content>
          </Panel.Item>
          <Panel.Button>查看更多</Panel.Button>
          <Panel.Driver />
          <Panel.Title>借款详情</Panel.Title>
          <Panel.Item label="借款编号">
            <Panel.Content>Content</Panel.Content>
          </Panel.Item>
          <Panel.Item label="借款金额">
            <Panel.Content>Content</Panel.Content>
          </Panel.Item>
        </Panel>
        <h1>Picker</h1>
        <Cell>
          <CellHeader>DatePicker</CellHeader>
          <CellBody>
            <DatePicker/>
          </CellBody>
        </Cell>
        <h1>Modal</h1>
        <Button onClick={this.openModal}>Click to open a Modal</Button>
        <Modal show={showModal}
               onClose={this.closeModal}
        >
          <h2>This is a Modal.</h2>
        </Modal>
        <h1>Alert</h1>
        <Button onClick={this.openAlert}>Click to open a Alert</Button>
        <Alert headerContent={'Question'}
               show={showAlert}
               confirmContent={'Yes'}
               cancelContent={'No'}
               onConfirm={this.handleAlertConfirm}
               onCancel={this.handleAlertCancel}
        >
          Are you a beautiful girl?
        </Alert>
        <h1>CollapseList</h1>
        <h2>Normal</h2>
        <Collapse listCollection={collapseListData}
                  onListChange={this.handleCollapseListChange}
        />
        <h2>Accordion</h2>
        <Collapse listCollection={collapseListData}
                  accordion={true}
                  onListChange={this.handleCollapseListChange}
        />
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
      </section>
    )
  }
}
export default Home
