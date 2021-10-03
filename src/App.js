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
  const permissions = props.permissions
  return (
    <Route 
      {...props}
      render={(props) => {
        if(currentUser && currentUser.email){
          return (permissions.includes(currentUser.role) ? <Component {...props} /> : <Redirect to="/"/>)
        }
        else{
          return (<Redirect to="/login"/>)
        }
       
      }}
    />
  )
}

function App() {
  return (
    <Router>
      <Switch>
    <Route path="/login" component={Login} />
    {/* <Route path="/signup" component={Signup} /> */}
    <ProtectedRoute exact path="/" component={Dashboard} permissions={['admin','user']} />
    <ProtectedRoute path="/orders" component={Orders} permissions={['admin','user']}/>
    <ProtectedRoute path="/Users" component={Users} permissions={['admin']}/>
      </Switch>
  </Router>
  );
}

export default App;
