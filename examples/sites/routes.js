import Main from './views/Main.jsx'

import maps from './maps.js'

const routes = {
  component: Main,
  path: '/',
  indexRoute: {
    path: 'Introduction',
    component: require('../../README.md').default
  },
  childRoutes: [{
    path: 'Toast',
    component: require('../../src/Toast/README.md').default
    // getComponent(nextState, cb) {
    //   require.ensure([], require => {
    //     cb(null, require('../../src/Toast/README.md').default)
    //   })
    // }
  }, {
    path: 'ActionSheet',
    component: require('../../src/ActionSheet/README.md').default
    // getComponent(nextState, cb) {
    //   require.ensure([], require => {
    //     cb(null, require('../../src/ActionSheet/README.md').default)
    //   })
    // }
  }, {
    path: 'Panel',
    component: require('../../src/Panel/README.md').default
    // getComponent(nextState, cb) {
    //   require.ensure([], require => {
    //     console.log('Panel')
    //     cb(null, require('../../src/Panel/README.md').default)
    //   })
    // }
  }, {
    path: 'Cell',
    component: require('../../src/Cell/README.md').default
    // getComponent(nextState, cb) {
    //   require.ensure([], require => {
    //     cb(null, require('../../src/Cell/README.md').default)
    //   })
    // }
  }, {
    path: 'Modal',
    component: require('../../src/Modal/README.md').default
    // getComponent(nextState, cb) {
    //   require.ensure([], require => {
    //     cb(null, require('../../src/Modal/README.md').default)
    //   })
    // }
  }, {
    path: 'Collapse',
    component: require('../../src/Collapse/README.md').default
    // getComponent(nextState, cb) {
    //   require.ensure([], require => {
    //     cb(null, require('../../src/Collapse/README.md').default)
    //   })
    // }
  }, {
    path: 'Icon',
    component: require('../../src/Icon/README.md').default
    // getComponent(nextState, cb) {
    //   require.ensure([], require => {
    //     cb(null, require('../../src/Icon/README.md').default)
    //   })
    // }
  }, {
    path: 'Button',
    component: require('../../src/Button/README.md').default
    // getComponent(nextState, cb) {
    //   require.ensure([], require => {
    //     cb(null, require('../../src/Button/README.md').default)
    //   })
    // }
  }, {
    path: 'Flow',
    component: require('../../src/Flow/README.md').default
    // getComponent(nextState, cb) {
    //   require.ensure([], require => {
    //     cb(null, require('../../src/Flow/README.md').default)
    //   })
    // }
  }, {
    path: 'Form',
    component: require('../../src/Form/README.md').default
    // getComponent(nextState, cb) {
    //   require.ensure([], require => {
    //     cb(null, require('../../src/Form/README.md').default)
    //   })
    // }
  }, {
    path: 'NoticeBar',
    component: require('../../src/NoticeBar/README.md').default
    // getComponent(nextState, cb) {
    //   require.ensure([], require => {
    //     cb(null, require('../../src/NoticeBar/README.md').default)
    //   })
    // }
  }, {
    path: 'Introduction',
    component: require('../../README.md').default
    // getComponent(nextState, cb) {
    //   require.ensure([], require => {
    //     cb(null, require('../../README.md').default)
    //   })
    // }
  }, {
    path: 'ActionSheet',
    component: require('../../src/ActionSheet/README.md').default
    // getComponent(nextState, cb) {
    //   require.ensure([], require => {
    //     cb(null, require('../../src/ActionSheet/README.md').default)
    //   })
    // }
  }, {
    path: 'Tab',
    component: require('../../src/Tab/README.md').default
    // getComponent(nextState, cb) {
    //   require.ensure([], require => {
    //     cb(null, require('../../src/Tab/README.md').default)
    //   })
    // }
  }, {
    path: 'picker',
    component: require('../../src/Picker/README.md').default
  }
  ]
}

export default routes
