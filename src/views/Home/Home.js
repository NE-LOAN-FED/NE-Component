/**
 * Created by kisnows on 2016/9/13.
 */
import React, {Component, PropTypes} from 'react'
import {Cells} from '../../components/Cell'
import Button from '../../components/Button'
import Alert from '../../components/Alert'

class Home extends React.Component {

  componentDidMount() {
    this.props.init()
    console.log(this.props.location.query)
  }

  goToLoan = () => {
    const {canLoan} = this.props.pageData
    if (!canLoan) {
      this.props.showToast(lang.noMoreAmountErrorMsg)
    }
  }

  handleIconClick = () => {
    this.showAlert()
  }

  showAlert = () => {
    this.props.showAlert(true)
  }
  hideAlert = () => {
    this.props.showAlert(false)
  }

  render() {
    return (
      <section className='page_home'>
        <Alert confirmContent={'我知道'}
               onConfirm={this.hideAlert}
               children={'测试测试'}
        />
        <Header/>
        <Cells>
        </Cells>
        {
          isNotPreloan ? <Button onClick={this.goToLoan} disabled={!!isBadCredit}>我要去哪</Button> : null
        }
      </section>
    )
  }
}
