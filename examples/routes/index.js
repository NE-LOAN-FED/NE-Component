import App from '../demo/App'
import HomeDemo from '../demo/HomeDemo'
// import FormDemo from '../demo/FormDemo'

const routes = {
  component: App,
  path: '/',
  indexRoute: {
    component: HomeDemo
  },
  childRoutes: [{
    path: 'form',
    getComponent(nextState, cb) {
      require.ensure([], (require) => {
        cb(null, require('../demo/FormDemo').default)
      })
    }
  }]
}

export default routes
