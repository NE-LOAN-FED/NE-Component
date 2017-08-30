import React from 'react'
import Menu from './Menu.jsx'
import Content from './Content'
import Phone from './Phone'
import maps from '../maps.js'
import classnames from 'classnames'
import '../main.scss'
import '../styles/sushi.scss'
import '../styles/static.scss'
const list = getMapList()

export default class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      item: list[0],
      navbarShow: false,
      pathname: getPathname(this.props.location.pathname, list)
    };
    this.renderContent = this.renderContent.bind(this)
  }

  componentDidMount() {
    this.renderContent()
  }


  componentWillReceiveProps(nextProps) {
    this.renderContent()
    this.setState({
      pathname: getPathname(nextProps.location.pathname, list)
    })
  }

  renderContent() {
    const { query } = this.props.location
    var item = getItem(query.component, list)
    // console.log(list)
    // console.log(path)
    // debugger
    this.setState({
      item
    })

  }

  handleToggleBar() {
    let navbarShow = this.state.navbarShow
    this.setState({
      navbarShow: !navbarShow
    })
  }

  render() {
    const mainCls = classnames({
      row: true,
      main: true,
      'slide-in-left': this.state.navbarShow
    })
    return (
      <main className={mainCls}>
        <Menu />
        <Content item={this.state.item}>
          <div className='navbar-toggle-container'>
            <button className='navbar-toggle' onClick={this.handleToggleBar.bind(this)}>
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
          {this.props.children}
        </Content>
        <Phone pathname={this.state.pathname} />
      </main>
    )
  }
}

function getPathname(pathname = '', list) {
  for (var i = 0; i < list.length; i++) {
    var item = list[i]

    if (item.path.toLowerCase() === pathname.toLowerCase()) {
      return item.name.toLowerCase()
    }
  }

  return list[0].name.toLowerCase()
}
function getItem(str = '', list) {
  for (var i = 0; i < list.length; i++) {
    var item = list[i]

    if (item.name.toLowerCase() === str.toLowerCase()) {
      return item
    }
  }

  return list[0]
}

function getMapList() {
  var list = []

  maps.forEach((group) => {
    group.list.forEach((item) => {
      list.push(item)
    })
  })

  return list
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}