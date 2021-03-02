import "./App.css";
import Navbar from "./components/layout/Navbar";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import React, { useState, Fragment } from "react";
import Users from "./components/users/Users";
import User from "./components/users/User";
import Search from "./components/users/Search";
import Alert from "./components/layout/Alert";
import Alert1 from "./components/layout/Alert1";
import About from "./components/pages/About";
import axios from 'axios';

const App = () => {
  const [users, setUsers] = useState([])
  const [user, setUser] = useState({})
  const [loading, setLoading] = useState(false)
  const [repos, setRepos] = useState([])
  const [alert, setAlert] = useState(null)
  const [alert1, setAlert1] = useState(null)

  // async componentDidMount(){
  //   setState({loading:true})

  //   const res = await axios.get(`https://api.github.com/users?client_id=${
  //     process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${
  //     process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)

  //   setState({users: res.data, loading: false})
  // }

// Search GitHub Users
const searchUsers = async text => {
  setLoading(true)
  const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${
    process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${
    process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)

  setUsers(res.data.items)
  setLoading(false)
}

// Get a single GitHub user
const getUser = async (username) => {
  setLoading(true)
    const res = await axios.get(`https://api.github.com/users/${username}?client_id=${
      process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${
      process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
  
      setUser(res.data)
      setLoading(false)
    } 

//Get users repos
const getUserRepos = async (username) => {
  setLoading(true)
    const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${
      process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${
      process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
  
      setRepos(res.data)
      setLoading(false)
    } 

// Set alert
const showAlert = (msg, type) => {
  setAlert({msg, type})
  setTimeout(() => setAlert(null))
}

// Set alert1
const showAlert1 = (msg, type) => {
  setAlert1({msg, type})
  setTimeout(() => setAlert1(null))

}

  //Clear users from state
  const clearUsers = () => {
    setUsers([])
    setLoading(false)
  }
    return (
      <Router>
        <div className="App">
        <Navbar title="Github Finder" icon='fab fa-github'/>
        <div className="container">
          <Alert alert={alert}/>
          <Alert1 alert={alert1}/>
          <Switch>
            <Route exact path="/" render={props =>
            <Fragment>
          <Search 
          searchUsers={searchUsers} 
          clearUsers={clearUsers} 
          showClear={users.length > 0 ? true: false} 
          setAlert={showAlert}
          setAlert1={showAlert1}/>
          <Users loading={loading} users={users}/>
            </Fragment>} />
            <Route exact path="/about" component={About}/>
            <Route exact path="/user/:login" render={props => (
              <User {...props} getUser={getUser} getUserRepos={getUserRepos} user={user} repos={repos} loading={loading} />
            )}/>
          </Switch>
        </div>
      </div>
      </Router>
    );
}

export default App;
