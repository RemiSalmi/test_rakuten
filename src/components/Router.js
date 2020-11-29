import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from '../pages/Home'
import Settings from '../pages/Settings'

 
function Router() {
  return (
    <BrowserRouter>
      <Switch>
          <Route path="/" component={Home} exact/>
          <Route path="/settings" component={Settings} exact/>
      </Switch>
    </BrowserRouter>
  );
};
 
export default Router;