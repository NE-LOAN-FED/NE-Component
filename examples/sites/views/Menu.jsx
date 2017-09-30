import React from 'react'
import maps from '../maps.js'
import '../navbar.scss'
import { Link } from 'react-router'
import classname from 'classnames'

export default class Menu extends React.Component {
  constructor(props) {
    super(props)
    this.renderNavs = this.renderNavs.bind(this)
    this.renderGroup = this.renderGroup.bind(this)
  }

  isPathEqual(currentPath, defaultPath) {
    return currentPath.toLowerCase() === defaultPath.toLowerCase()
  }
  renderGroup(list) {
    const self = this
    const { pathname } = this.props
    const lis = list.map((item, index) => {
      let cls = classname({
        'nav-link': true,
        'is-active': self.isPathEqual(item.name, pathname)
      })

      return (
        <li key={index}>
          <Link className={cls} to={`${item.name}`}>
            {item.name}
          </Link>
        </li>
      )
    })

    return (
      <ul>{lis}</ul>
    )
  }

  renderNavs(maps) {
    const navs = maps.map((group, index) => (
      <li key={index}>
        <a href='#' className='nav-label' style={{ pointerEvents: 'none' }}>{group.title}</a>
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