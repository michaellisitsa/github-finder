import "./App.css";
import Navbar from "./components/layout/Navbar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import React, { useState, Fragment } from "react";
import Users from "./components/users/Users";
import User from "./components/users/User";
import Search from "./components/users/Search";
import Alert from "./components/layout/Alert";
import Alert1 from "./components/layout/Alert1";
import About from "./components/pages/About";
import axios from "axios";
import GithubState from "./context/github/GithubState";

const App = () => {
  const [loading, setLoading] = useState(false);
  const [repos, setRepos] = useState([]);
  const [alert, setAlert] = useState(null);
  const [alert1, setAlert1] = useState(null);

  //Get users repos
  const getUserRepos = async (username) => {
    setLoading(true);
    const res = await axios.get(
      `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );

    setRepos(res.data);
    setLoading(false);
  };

  // Set alert
  const showAlert = (msg, type) => {
    setAlert({ msg, type });
    setTimeout(() => setAlert(null));
  };

  // Set alert1
  const showAlert1 = (msg, type) => {
    setAlert1({ msg, type });
    setTimeout(() => setAlert1(null));
  };

  return (
    <GithubState>
      <Router>
        <div className='App'>
          <Navbar title='Github Finder' icon='fab fa-github' />
          <div className='container'>
            <Alert alert={alert} />
            <Alert1 alert={alert1} />
            <Switch>
              <Route
                exact
                path='/'
                render={(props) => (
                  <Fragment>
                    <Search setAlert={showAlert} setAlert1={showAlert1} />
                    <Users />
                  </Fragment>
                )}
              />
              <Route exact path='/about' component={About} />
              <Route
                exact
                path='/user/:login'
                render={(props) => (
                  <User
                    {...props}
                    getUserRepos={getUserRepos}
                    repos={repos}
                    loading={loading}
                  />
                )}
              />
            </Switch>
          </div>
        </div>
      </Router>
    </GithubState>
  );
};

export default App;
