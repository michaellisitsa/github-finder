//all of our actions will go here
//eg search users, or make a request to github.
//Right now these actions are in App.js, we will move them out of there.
import React, { useReducer } from "react";
import axios from "axios";
import AlertContext from "./alertContext";
import AlertReducer from "./alertReducer";

import { SET_ALERT, REMOVE_ALERT } from "../types";

// Create initial state. Basically our global state for anything that has to do with GitHub.
// Equivalent of eg. [users, setUsers] = setState([])
const AlertState = (props) => {
  const initialState = null;

  const [state, dispatch] = useReducer(AlertReducer, initialState);

  // Set alert
  const setAlert = (msg, type) => {
    dispatch({
      type: SET_ALERT,
      payload: { msg, type },
    });
    setTimeout(() => dispatch({ type: REMOVE_ALERT }), 3000);
  };

  return (
    <AlertContext.Provider
      // pass in anything applicable to the entire app
      value={{
        alert: state, //passed from initialState, then through reducer and set to state
        setAlert,
      }}
    >
      {props.children}
    </AlertContext.Provider>
  );
};

export default AlertState;
