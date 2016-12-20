import App from '../demo/App'
import HomeDemo from '../demo/HomeDemo'

const routes = {
  component: App,
  path: '/',
  childRoutes: [],
  indexRoute: {
    component: HomeDemo
  }
}

export default routes
