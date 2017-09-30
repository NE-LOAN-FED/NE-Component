import Main from './views/Main.jsx'

import maps from './maps.js'

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
        console.log('Panel')
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
  }, {
    path: 'Flow',
    getComponent(nextState, cb) {
      require.ensure([], require => {
        cb(null, require('../../src/Flow/README.md').default)
      })
    }
  }, {
    path: 'Form',
    getComponent(nextState, cb) {
      require.ensure([], require => {
        cb(null, require('../../src/Form/README.md').default)
      })
    }
  }, {
    path: 'NoticeBar',
    getComponent(nextState, cb) {
      require.ensure([], require => {
        cb(null, require('../../src/NoticeBar/README.md').default)
      })
    }
  }, {
    path: 'Introduction',
    getComponent(nextState, cb) {
      require.ensure([], require => {
        cb(null, require('../../README.md').default)
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
    path: 'Tab',
    getComponent(nextState, cb) {
      require.ensure([], require => {
        cb(null, require('../../src/Tab/README.md').default)
      })
    }
  }
  ]
}

export default routes
