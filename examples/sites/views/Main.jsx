import React from 'react'
import Menu from './Menu.jsx'
import Content from './Content'
import Phone from './Phone'
import maps from '../maps.js'
import '../main.scss'
import '../styles/sushi.scss'
import '../styles/static.scss'
const list = getMapList()

export default class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      item: list[0]
    };
    this.renderContent = this.renderContent.bind(this)
  }

  componentDidMount() {
    this.renderContent()
  }

  
  componentWillReceiveProps() {
    this.renderContent()
  }

  renderContent(){
    const { query } = this.props.location
    var item = getItem(query.component, list)
    // console.log(list)
    // console.log(path)
    // debugger
    this.setState({
      item
    })

  }

  render() {
    return (
      <main className='row main'>
        <Menu />
        <Content item={this.state.item}>
            {this.props.children}
        </Content>
        <Phone />
      </main>
    )
  }
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