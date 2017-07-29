import React from 'react'
import maps from '../maps.js'
import '../navbar.scss'
import { Link } from 'react-router'

export default class Menu extends React.Component {
  constructor(props) {
    super(props)
    this.renderNavs = this.renderNavs.bind(this)
    this.renderGroup = this.renderGroup.bind(this)
  }
  renderLi() {

  }

  renderGroup(list) {
    const lis = list.map((item, index) => (
      <li key={index}>
        <Link className='nav-link' to={`${item.name}`}>
          {item.name}
        </Link>
      </li>
    ))

    return (
      <ul>{lis}</ul>
    )
  }

  renderNavs(maps) {
    const navs = maps.map((group, index) => (
      <li key={index}>
        <a href='#' className='nav-label'>{group.title}</a>
        {this.renderGroup(group.list)}
      </li>
    ))

    return navs
  }

  render() {
    return (
      <section className='col-2 is-scrollable navbar'>
        <nav className='nav'>
          <ul>
            {this.renderNavs(maps)}
          </ul>
        </nav>
      </section>
    )
  }
}