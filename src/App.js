import "./App.css";
import Navbar from "./components/layout/Navbar";
import React, { Component } from "react";
import Users from "./components/users/Users";
import axios from 'axios';

class App extends Component {
  state = {
    users: [],
    loading: false
  }

  async componentDidMount(){
    this.setState({loading:true})

    const res = await axios.get(`https://api.github.com/users?client_id=${
      process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${
      process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)

    this.setState({users: res.data, loading: false})
  }

  render() {
    return (
      <>
        <Navbar title="Github title" icon='fab fa-github'/>
        <h1>Hello world</h1>
        <div className="container">
          <Users loading={this.state.loading} users={this.state.users}/>
        </div>
      </>
    );
  }
}

export default App;
