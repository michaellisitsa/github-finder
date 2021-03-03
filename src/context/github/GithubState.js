//all of our actions will go here
//eg search users, or make a request to github.
//Right now these actions are in App.js, we will move them out of there.
import React, { useReducer } from "react";
import axios from "axios";
import GithubContext from "./githubContext";
import GithubReducer from "./githubReducer";

import {
  SEARCH_USERS,
  SET_LOADING,
  CLEAR_USERS,
  GET_USER,
  GET_REPOS,
} from "../types";

// Create initial state. Basically our global state for anything that has to do with GitHub.
// Equivalent of eg. [users, setUsers] = setState([])
const GithubState = (props) => {
  const initialState = {
    users: [], // list of users, therefore array
    user: {}, // single user for the user page, therefore object
    repos: [], // list of repos for a particular user
    loading: false,
  };

  const [state, dispatch] = useReducer(GithubReducer, initialState);

  // Search users
  const searchUsers = async (text) => {
    setLoading(); // dispatches the type of set loading to the reducer
    const res = await axios.get(
      `https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );

    dispatch({
      type: SEARCH_USERS, //whenever type search users we're sending res.data payload to reducer
      payload: res.data.items, //the github api response
    });
  };

  // Get user
  const getUser = async (username) => {
    setLoading();
    const res = await axios.get(
      `https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );

    dispatch({
      type: GET_USER,
      payload: res.data,
    });
  };

  //  Get repos

  // Clear Users
  const clearUsers = () => dispatch({ type: CLEAR_USERS });

  // Set Loading
  // we have labelled type in the githubReducer which is now passed in
  const setLoading = () => dispatch({ type: SET_LOADING });

  return (
    <GithubContext.Provider
      // pass in anything applicable to the entire app
      value={{
        users: state.users, //passed from initialState, then through reducer and set to state
        user: state.user,
        repos: state.repos,
        loading: state.loading,
        searchUsers,
        clearUsers,
        getUser,
      }}
    >
      {props.children}
    </GithubContext.Provider>
  );
};

export default GithubState;
