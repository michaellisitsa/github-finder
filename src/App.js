import "./App.css";
import Navbar from "./components/layout/Navbar";
import React, { Component } from "react";
import Users from "./components/users/Users";
class App extends Component {
  render() {
    return (
      <>
        <Navbar title="Github title" icon='fab fa-github'/>
        <h1>Hello world</h1>
        <div className="container">
          <Users />
        </div>
      </>
    );
  }
}

export default App;
