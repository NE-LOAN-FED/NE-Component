import App from '../views/App'
import changeTitle from '../utils/changeTitle'
import Home from '../views/Home'

const routes = {
  component: App,
  path: '/',
  childRoutes: [],
  indexRoute: {
    component: Home
  }
}

export default routes
