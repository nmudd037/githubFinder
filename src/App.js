import './App.css';

import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import AlertState from './components/context/alert/AlertState';
import GithubState from './components/context/github/GithubState';
import Alert from './components/layout/Alert';
import Footer from './components/layout/Footer';
import Navbar from './components/layout/Navbar';
import About from './components/pages/About';
import Home from './components/pages/Home';
import NotFound from './components/pages/NotFound';
import User from './components/users/User';

const App = () => {
  return (
    <GithubState>
      <AlertState>
        <Router>
          <div className="app">
            <Navbar />
            <div className="app-content container">
              <Alert />
              <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/about" component={About} />
                <Route path="/user/:login" component={User} />
                <Route component={NotFound} />
              </Switch>
            </div>
            <Footer />
          </div>
        </Router>
      </AlertState>
    </GithubState>
  );
};

export default App;
