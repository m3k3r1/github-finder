import { Fragment } from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Navbar from './components/layout/NavBar';
import Users from './components/users/Users';
import User from './components/users/User';
import Search from './components/users/Search';
import Alert from './components/layout/Alert';
import About from './components/pages/About';
import GitHubState from './context/github/GitHubState';
import AlertState from './context/alert/AlertState';

import './App.css';

const App = () =>  {
  return (
    <GitHubState> 
      <AlertState>
      <Router>
        <div className="App">
          <Navbar  />
          <div className="container">
            <Alert />
            <Switch>
              <Route exact path='/' render={props => (
                <Fragment>
                  <Search />
                  <Users />
                </Fragment> 
              )}></Route>
              <Route exact path='/about' component={About}></Route>
              <Route exact path='/user/:login' render={ props => (
                <User 
                  {...props}>
                </User>
              )}></Route>
            </Switch>
          </div>
        </div>
      </Router>
      </AlertState> 
    </GitHubState>
  );
}

export default App;
 