import App from '../demo/App'
import HomeDemo from '../demo/HomeDemo'
import FormDemo from '../demo/FormDemo'


export default (
  <Route path={'/'} component={App}>
    <IndexRoute component={HomeDemo}/>
    <Route path={'form'} component={FormDemo}>
    </Route>
  </Route>
)
