import React, { Component } from "react";

class UserItem extends Component {
  state = {
    id: "id",
    login: "michaellisitsa",
    avatar_url: "https://avatars.githubusercontent.com/u/58811856?v=4",
    html_url: "https://github.com/michaellisitsa",
  };
  render() {
    const { login, avatar_url, html_url } = this.props.user;
    return (
      <div className='card text-center'>
        <img
          src={avatar_url}
          alt=''
          className='round-img'
          style={{ width: "60px" }}
        />
        <h3>{login}</h3>
        <a href={html_url} className='btn btn-dark btn-sm my-1'>
          More
        </a>
      </div>
    );
  }
}

export default UserItem;
