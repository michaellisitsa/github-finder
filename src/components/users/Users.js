import React, { Component } from "react";
import UserItem from "./UserItem";
class Users extends Component {
  state = {
    users: [
      {
        id: "1",
        login: "michaellisitsa",
        avatar_url: "https://avatars.githubusercontent.com/u/58811856?v=4",
        html_url: "https://github.com/michaellisitsa",
      },
      {
        id: "2",
        login: "defunkt",
        avatar_url: "https://avatars.githubusercontent.com/u/2?v=4",
        html_url: "https://github.com/defunkt",
      },
    ],
  };
  render() {
    return (
      <div style={userStyle}>
        {this.state.users.map((user) => (
          <UserItem key={user.id} user={user} />
        ))}
      </div>
    );
  }
}

const userStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gridGap: "1rem",
};

export default Users;
