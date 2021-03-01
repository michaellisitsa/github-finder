import "./App.css";
import Navbar from "./components/layout/Navbar";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import React, { Component, Fragment } from "react";
import Users from "./components/users/Users";
import User from "./components/users/User";
import Search from "./components/users/Search";
import Alert from "./components/layout/Alert";
import Alert1 from "./components/layout/Alert1";
import About from "./components/pages/About";
import axios from 'axios';

class App extends Component {
  state = {
    users: [],
    user: {},
    loading: false,
    alert: null,
    alert1: null,
  }

  // async componentDidMount(){
  //   this.setState({loading:true})

  //   const res = await axios.get(`https://api.github.com/users?client_id=${
  //     process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${
  //     process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)

  //   this.setState({users: res.data, loading: false})
  // }

// Search GitHub Users
searchUsers = async text => {
  this.setState({loading:true})
  const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${
    process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${
    process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)

  this.setState({users: res.data.items, loading: false})
}

// Get a single GitHub user
getUser = async (username) => {
  this.setState({loading:true})
    const res = await axios.get(`https://api.github.com/users/${username}?client_id=${
      process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${
      process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
  
    this.setState({user: res.data, loading: false})
} 

// Set alert
setAlert = (msg, type) => {
  this.setState({alert: {msg, type}})
  setTimeout(() => this.setState({alert: null}), 2000)
}

// Set alert1
setAlert1 = (msg, type) => {
  this.setState({alert1: {msg, type}})
  setTimeout(() => this.setState({alert1: null}), 3000)

}

  //Clear users from state
  clearUsers = () => this.setState({users:[],loading: false})
  render() {
    const { loading, user, users } = this.state
    return (
      <Router>
        <div className="App">
        <Navbar title="Github Finder" icon='fab fa-github'/>
        <div className="container">
          <Alert alert={this.state.alert}/>
          <Alert1 alert={this.state.alert1}/>
          <Switch>
            <Route exact path="/" render={props =>
            <Fragment>
          <Search 
          searchUsers={this.searchUsers} 
          clearUsers={this.clearUsers} 
          showClear={users.length > 0 ? true: false} 
          setAlert={this.setAlert}
          setAlert1={this.setAlert1}/>
          <Users loading={loading} users={users}/>
            </Fragment>} />
            <Route exact path="/about" component={About}/>
            <Route exact path="/user/:login" render={props => (
              <User {...props} getUser={this.getUser} user={user} loading={loading} />
            )}/>
          </Switch>
        </div>
      </div>
      </Router>
    );
  }
}

export default App;
