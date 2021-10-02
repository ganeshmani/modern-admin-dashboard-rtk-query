import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route,
  Link
} from "react-router-dom";

import Login from './features/Auth/Login'
import Signup from './features/Auth/Signup'
import Dashboard from './components/Dashboard'
import Orders from './features/Orders'
import Users from './features/Users'
import { useAuth } from './hooks/useAuth'
function ProtectedRoute({component: Component,...props}){
  const currentUser = useAuth()
  return (
    <Route 
      {...props}
      render={(props) => currentUser && currentUser.email ? <Component {...props} /> : <Redirect to="/login"/>}
    />
  )
}

function App() {
  return (
    <Router>
      <Switch>
    <Route path="/login" component={Login} />
    {/* <Route path="/signup" component={Signup} /> */}
    <ProtectedRoute exact path="/" component={Dashboard} />
    <ProtectedRoute path="/orders" component={Orders}/>
    <ProtectedRoute path="/Users" component={Users}/>
      </Switch>
  </Router>
  );
}

export default App;
