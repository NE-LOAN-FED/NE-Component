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
  Icon,
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

const logger = new Logger('DEBUG', 'Home')


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


  render() {
    const {msg, showToast, showModal, showAlert, formData, phone, gender} = this.state
    const {isComplete} = formData

    const Links = ['form', 'button', 'cells', 'panel', 'picker', 'modal', 'collapse', 'icon']
    return (
      <section className='page-home'>
        <Toast content={msg}
               show={showToast}
               onClose={this.closeToast}
        />
        <div className="page--header">
          <h1 className="page-title">NE-RC</h1>
          <p className="page--desc">NE-RC 是由大数据风控-前端小组开发的一套基于 React 的组件，风格和交互上遵循之前部门的内部规范。开发的目的是为了给内部移动端项目提供统一用户体验输出。</p>
        </div>
        <Cells>
          {
            Links.map((v, k) => {
              return <Cell key={k}>
                <CellBody><Link to={'/' + v}>{v.toUpperCase()}</Link></CellBody>
                <CellFooter><Icon type={'arrow'}/></CellFooter>
              </Cell>
            })
          }
        </Cells>
      </section>
    )
  }
}
export default Home
