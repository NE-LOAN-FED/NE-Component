import Main from './views/Main.jsx'

import maps from './maps.js'
const childRoutes = []
maps.forEach((group) => {
  group.list.forEach((item) => {
    childRoutes.push({
      path: item.name,
      getComponent(nextState, cb) {
        require.ensure([], require => {
          cb(null, require(`../../src/${item.name}/README.md`).default)
        }, item.name)
      }
    })
  })
})
console.log(childRoutes)
const routes = {
  component: Main,
  path: '/',
  childRoutes: [{
    path: 'Toast',
    getComponent(nextState, cb) {
      require.ensure([], require => {
        cb(null, require('../../src/Toast/README.md').default)
      })
    }
  }, {
    path: 'ActionSheet',
    getComponent(nextState, cb) {
      require.ensure([], require => {
        cb(null, require('../../src/ActionSheet/README.md').default)
      })
    }
  }, {
    path: 'Panel',
    getComponent(nextState, cb) {
      require.ensure([], require => {
        cb(null, require('../../src/Panel/README.md').default)
      })
    }
  }, {
    path: 'Cell',
    getComponent(nextState, cb) {
      require.ensure([], require => {
        cb(null, require('../../src/Cell/README.md').default)
      })
    }
  }, {
    path: 'Modal',
    getComponent(nextState, cb) {
      require.ensure([], require => {
        cb(null, require('../../src/Modal/README.md').default)
      })
    }
  }, {
    path: 'Collapse',
    getComponent(nextState, cb) {
      require.ensure([], require => {
        cb(null, require('../../src/Collapse/README.md').default)
      })
    }
  }, {
    path: 'Icon',
    getComponent(nextState, cb) {
      require.ensure([], require => {
        cb(null, require('../../src/Icon/README.md').default)
      })
    }
  }, {
    path: 'Button',
    getComponent(nextState, cb) {
      require.ensure([], require => {
        cb(null, require('../../src/Button/README.md').default)
      })
    }
  }
  ]
}

export default routes